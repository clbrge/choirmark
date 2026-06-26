# ChoirMark

An open format for documents — content carries the meaning, themes carry the look. Like
[CommonMark](https://commonmark.org), but for whole documents.

ChoirMark is CommonMark plus a small extension profile (fenced divs `::: role`, bracketed spans
`[text]{.role}`, attributes) and a closed role vocabulary. A `.cmk` file describes *what* each part
of a document is; a theme decides *how* it looks.

See [`spec/spec.md`](spec/spec.md) for the format. The spec is also the conformance suite: every
`example` block in it becomes a test (see `tools/extract-examples.js`).

## Status

Early. The specification skeleton and the reference-implementation surface are in place; the parser
is **not implemented yet** — `parse()` and `toHtml()` currently throw. Track progress in
[`CHANGELOG.md`](CHANGELOG.md).

## Install

```bash
npm install choirmark
```

Requires Node ≥ 20.

## Usage

```js
import { parse, toHtml } from 'choirmark'

const doc = parse(source)   // .cmk source → document model
const html = toHtml(source) // .cmk source → role-tagged HTML pivot
```

## License

MIT. See [`LICENSE`](LICENSE).

[choirmark.org](https://choirmark.org)
