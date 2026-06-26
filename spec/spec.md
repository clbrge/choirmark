# ChoirMark Specification

**Version:** 0.1.0-draft · **Status:** early draft — the syntax is not yet frozen.

> Licensed CC BY-SA 4.0 (see `spec/LICENSE`). The reference implementation is MIT.

## 1. Introduction

ChoirMark is an open format for **documents** — letters, reports, decks — as opposed to web pages. It
keeps a document's **content and meaning** separate from its **presentation**: the source carries what
each part *is* (a date, a sender, a slide title), and a theme decides how it *looks*.

A ChoirMark document is a [CommonMark](https://spec.commonmark.org/) document extended with a fixed,
named profile of constructs for assigning **roles** to content (§4). The profile is adopted
explicitly — nothing outside it is ChoirMark. This specification defines the extensions and the
canonical rendering to the HTML pivot; it includes CommonMark by normative reference rather than
restating it. It does **not** define how roles are *inferred* from unmarked content (loose →
resolved), nor how a document is themed, paginated, or judged — those are engine concerns, downstream
of this specification (§2).

This is a draft. Sections marked _TODO_ are not yet complete.

## 2. Scope — the HTML pivot

ChoirMark owns exactly one transformation: a **resolved** `.cmk` document → a **canonical, role-tagged
HTML pivot**. That transformation is deterministic, theme-free, and judgment-free — the same way
CommonMark stops at HTML and says nothing about CSS or whether a page looks good.

```
resolved .cmk ──[ChoirMark]──▶ role-tagged HTML ──[engine]──▶ themed forme ──▶ gate ──▶ PDF
                                ▲ the pivot = the border ▲
```

The role-tagged HTML is **normative**: `::: date` → `<div data-role="date">…</div>` is fixed by this
spec, so every implementation and every theme can rely on it. A consuming engine (such as Aldina)
reads the pivot; nothing reaches back across the border.

**In scope (ChoirMark):** the syntax, the role vocabulary and classes (the frozen interface), the
structural auto-roles, and the resolved-`.cmk` → HTML mapping with its conformance examples.

**Out of scope (the engine):** inferring roles for *unmarked* content, applying a theme, the quality
gate, repair, and projection to PDF. The litmus: if a step needs a **theme** or a **judgment**, it is
downstream of the border.

A theme may only *style existing roles* — it can never invent one. A new role or class is a **spec**
change, never a theme feature; that is what keeps the interface frozen.

## 3. How to read this spec

The specification is also the conformance suite. Throughout, examples are given as an input and the
HTML it must produce, separated by a single `.`:

````example
# Notice of Termination
.
<h1>Notice of Termination</h1>
````

The block above is one such example: ChoirMark, inheriting CommonMark, renders an ATX heading as an
`<h1>`. `tools/extract-examples.js` lifts every example into `test/spec.test.js`, so the spec and any
implementation cannot drift; an implementation in any language can run the same examples by parsing
this file.

## 4. The extension profile

ChoirMark is CommonMark with exactly the following extensions ON; everything else — notably raw
HTML/TeX — is OFF. The names follow Pandoc's Markdown extension vocabulary:

`````
+yaml_metadata_block     front matter (document type, page/title fields)
+fenced_divs             ::: block role / structure
+bracketed_spans         [text]{.role} inline role
+header_attributes       # Heading {#id .class}
+fenced_code_attributes  ```lang {#id}
+link_attributes         [x](u){…} and image attributes ![cap](src){#fig:x}
+implicit_figures        ![caption](src) → a figure
+pipe_tables             tables
+table_captions          : caption {#tbl:x}
+footnotes               text[^id] / [^id]: …
+citations               [@key]
-raw_html                NO escape hatch — content cannot bypass the role system
-raw_tex
-markdown_in_html_blocks
`````

Cross-references (`[@fig:x]`, `[@sec:x]`, `[@ch:x]`, `[@tbl:x]`) use a `@`-prefix whose target is a
`#fig:` / `#sec:` / `#tbl:` label, distinct from a bibliographic citation `[@key]` (a key with no
reserved prefix). Whether an implementation parses with Pandoc or its own reader is an implementation
detail — **the syntax above is the contract.**

## 5. Documents and classes

A ChoirMark document belongs to a **class** — `letter`, `folio` (reports), or `deck` — which fixes the
available roles. (How those roles *look* is a theme's job, downstream.) _TODO: class declaration in
front matter; the per-class role vocabulary._

## 6. Roles

A **role** is a class name drawn from the document class's closed vocabulary. There are two forms:

| scope | syntax | → HTML pivot |
|-------|--------|--------------|
| block (multi-line) | `::: <role>` … `:::` | `<div data-role="<role>">…</div>` |
| span / single line | `[text]{.<role>}` | `<span data-role="<role>">text</span>` |

````example
::: date
March 3, 2026
:::
.
<div data-role="date">March 3, 2026</div>
````

Rules:

- A role on a div/span **must** be a known role for the class. An unknown role is an **error**, not a
  silently-dropped annotation (no silent fallback).
- Roles are single-valued: one role per block/span.
- The shorthand `::: sender-block` ≡ `::: {.sender-block}`.

_TODO: nested divs; the full attribute syntax `{.role #id key=val}`; the enumerated role vocabulary per
class; cardinality and interaction constraints._

## 7. Structural auto-roles

Markdown structure that already *implies* a role is never tagged — the construct **is** the role. The
mapping is per-class; representative:

| construct | letter | deck | folio |
|-----------|--------|------|-------|
| `-` / `1.` list | `list` | `bullet-group` / `numbered-steps` | `list` |
| fenced code block | — | `code-block` | `code-block` |
| `>` blockquote | — | `pull-quote` | `pull-quote` |
| pipe table | — | `metrics-table` | `table` |
| `![cap](src)` | — | `visual` | `figure` |
| `[^id]` footnote | — | — | `footnote` |
| `#`…`######` heading | — (rare) | `slide-title` | `section` / `chapter` / `part` (by level × variant) |

Only blocks *not* covered by structure take an explicit `:::` / `{.}` tag — for letters that's the
envelope/closing roles (`sender-block`, `recipient-block`, `date`, `subject`, `signature-block`, …).

## 8. Relational markup (folio)

The author writes labels, references, and citations; the implementation derives the numbers, table of
contents, index, and bibliography:

- **labelled float** — `![caption](src){#fig:arch}` · table `: caption {#tbl:x}`
- **cross-reference** — `[@fig:arch]`, `[@sec:method]`, `[@ch:background]` → "Figure 2", "§1.1",
  "Chapter 3"
- **citation** — `[@smith2020]` → a generated bibliography placeholder `::: refs` (≡ `::: {#refs}`)
- **footnote** — `text[^pivot]` + `[^pivot]: …`

## 9. Two densities

The same syntax supports two densities:

- **Minimal** (authoring) — tag only the ambiguous blocks; let structure and patterns carry the rest.
- **Resolved** — every block carries an explicit role; the inference is *frozen* and
  author-correctable (a mis-tag is a one-line fix, `::: recipient-block` → `::: sender-block`).

Both are valid ChoirMark, but the **normative** transformation — the part this spec defines and
conformance-tests — is **resolved `.cmk` → HTML pivot**: explicit roles plus the deterministic
structural auto-roles of §7. Turning *minimal* into *resolved* by guessing roles for unmarked prose is
**inference**, an engine concern (§2), not part of the standard.

## 10. Worked example — a complaint letter (resolved)

```text
---
type: complaint
format: us-letter
window: us-10-left
---

::: sender-block
Marcus Feld
14 Rosewood Court
Denver, CO 80205
:::

[June 25, 2026]{.date}

::: recipient-block
Customer Relations Department
Crestline Appliances
2200 Industrial Parkway
Columbus, OH 43215
:::

[RE: Defective dishwasher — Order #CA-558129]{.subject}

::: salutation
Dear Customer Relations,
:::

I am writing to formally complain about a Crestline Model 700 dishwasher...

1. It fails to drain completely, leaving standing water;
2. The upper rack derailed within the first week;
3. The control panel intermittently loses power.

::: closing
Sincerely,
:::

::: signature-block
Marcus Feld
:::

::: enclosures
Enc.: Copy of receipt; Warranty card
:::
```

Every semantic block is tagged; the body paragraphs and the numbered list stay plain (their role is
structural, §7). ChoirMark renders this deterministically to the pivot — `::: role` → `<div
data-role>` — and there it stops.

## 11. Conformance

A conforming implementation produces, for every example in this specification, output that matches the
expected HTML after normalization. _TODO: normalization rules (whitespace, attribute order); the
canonical document-model → HTML mapping (escaping, block vs inline); required vs optional constructs;
versioning._
