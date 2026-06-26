// Extract conformance examples from a ChoirMark spec file.
//
// An example is a fenced block whose info string is `example`, using a fence of FOUR OR MORE
// backticks (so a 3-backtick code fence inside the input can't terminate it). The input and
// the expected HTML output are separated by a line containing only a single dot:
//
//   ````example
//   <cmk input>
//   .
//   <expected html>
//   ````
//
// Returns [{ input, output, section, line }]. The spec doubles as the test suite: every
// example here becomes a case in test/spec.test.js, so the spec and the implementation
// cannot drift. Run directly to print a summary.

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

export function extractExamples (specText) {
  const lines = specText.split('\n')
  const examples = []
  let section = ''
  for (let i = 0; i < lines.length; i++) {
    const heading = lines[i].match(/^#{1,6}\s+(.*?)\s*$/)
    if (heading) { section = heading[1]; continue }
    const open = lines[i].match(/^(`{4,})\s*example\s*$/)
    if (!open) continue
    const fence = open[1]
    const startLine = i + 1
    const body = []
    i++
    while (i < lines.length && lines[i] !== fence) { body.push(lines[i]); i++ }
    const sep = body.indexOf('.')
    if (sep === -1) continue // malformed example (no separator) — skip
    examples.push({
      input: body.slice(0, sep).join('\n'),
      output: body.slice(sep + 1).join('\n'),
      section,
      line: startLine
    })
  }
  return examples
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const file = process.argv[2] || 'spec/spec.md'
  const examples = extractExamples(readFileSync(file, 'utf8'))
  console.log(`${examples.length} example(s) in ${file}`)
  for (const e of examples) console.log(`  spec.md:${e.line}  [${e.section}]`)
}
