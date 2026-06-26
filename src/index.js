// ChoirMark — reference implementation (public API).
//
// ChoirMark is an open format for documents: content carries the meaning, themes carry the
// look. See spec/spec.md for the format. This is a scaffold — the parser is not implemented
// yet; the public surface below is the contract the conformance suite asserts against.

export { parse } from './parse.js'

// toHtml(source) → HTML string.
// Renders a ChoirMark source string to its HTML pivot (role-tagged elements). This is the
// function test/spec.test.js runs every spec example through.
export function toHtml (source) {
  // TODO: parse(source) → document model → render to the HTML pivot. See spec/spec.md.
  throw new Error('choirmark.toHtml: not yet implemented — see spec/spec.md')
}
