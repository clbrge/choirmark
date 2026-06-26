# ChoirMark Specification

**Version:** 0.1.0-draft · **Status:** early draft, incomplete — syntax is not yet frozen.

> Licensed CC BY-SA 4.0 (see `spec/LICENSE`). The reference implementation is MIT.

## 1. Introduction

ChoirMark is an open format for *documents* — letters, reports, decks — as opposed to web
pages. It keeps a document's **content and meaning** separate from its **presentation**: the
source carries what each part *is* (a date, a sender, a slide title), and a theme decides how
it *looks*.

A ChoirMark document is a [CommonMark](https://spec.commonmark.org/) document extended with a
named profile of constructs for assigning **roles** to content. This specification defines
those extensions and the canonical rendering to the HTML pivot; it does not restate CommonMark,
which it includes by normative reference. It also does **not** define how roles are *inferred* from
unmarked content (loose → resolved), nor how a document is themed, paginated, or judged — those are
engine concerns, downstream of this specification.

This is a draft skeleton. Sections marked _TODO_ are not yet written.

## 2. How to read this spec

The specification is also the conformance suite. Throughout, examples are given as an input
and the HTML it must produce, separated by a single `.`:

````example
# Notice of Termination
.
<h1>Notice of Termination</h1>
````

The block above is one such example: it asserts that ChoirMark, inheriting CommonMark, renders
an ATX heading as an `<h1>`. `tools/extract-examples.js` lifts every example into
`test/spec.test.js`, so the spec and any implementation cannot drift. An implementation in any
language can run the same examples by parsing this file.

## 3. Documents and classes

A ChoirMark document belongs to a **class** — `letter`, `folio` (reports), or `deck` — which fixes
the available roles (how they *look* is a theme's job, downstream). _TODO: class declaration, front
matter._

## 4. Block constructs

ChoirMark inherits all CommonMark block structure. It adds **fenced divs** for assigning a
role to a block of content: a fence of three or more colons, optionally with a role name,
wrapping the content.

````example
::: date
March 3, 2026
:::
.
<div data-role="date">March 3, 2026</div>
````

_TODO: nested divs, attribute syntax `{.role #id key=val}`, structural auto-roles (construct → role),
the closed role vocabulary per class._

## 5. Inline constructs

ChoirMark inherits all CommonMark inline structure. It adds **bracketed spans** —
`[text]{.role}` — for assigning a role to a run of inline content. _TODO: examples, attribute
syntax, precedence._

## 6. Roles

Roles are a **closed vocabulary** per class — an implementation rejects unknown roles rather
than guessing. _TODO: enumerate the role set for each class; structural auto-roles; cardinality
and interaction constraints._

## 7. Rendering — the HTML pivot

ChoirMark renders to HTML, with roles emitted as `data-role` attributes that a theme's CSS
targets. _TODO: the canonical mapping from document model to HTML; escaping; whitespace._

## 8. Conformance

A conforming implementation produces, for every example in this specification, output that
matches byte-for-byte after _TODO: normalization rules_. _TODO: optional vs required
constructs; versioning._
