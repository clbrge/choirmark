// Parse a ChoirMark (.cmk) source string into a document model.
//
// ChoirMark is CommonMark plus a named extension profile (fenced divs `::: role`, bracketed
// spans `[text]{.role}`, attributes) and a closed role vocabulary. See spec/spec.md.

export function parse (source) {
  // TODO: implement per spec/spec.md — CommonMark core, the extension profile, role assignment.
  throw new Error('choirmark.parse: not yet implemented — see spec/spec.md')
}
