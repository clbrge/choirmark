// Conformance suite — every example in spec/spec.md becomes a test.
//
// The reference parser isn't implemented yet, so the per-example cases are registered as
// `todo`: they report the conformance backlog without failing the build. Once toHtml() is
// implemented, drop the `todo` option (or it auto-passes) and these turn green.

import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { extractExamples } from '../tools/extract-examples.js'
import { toHtml } from '../src/index.js'

const spec = readFileSync(new URL('../spec/spec.md', import.meta.url), 'utf8')
const examples = extractExamples(spec)

test('spec contains conformance examples', () => {
  assert.ok(examples.length > 0, 'expected at least one example in spec/spec.md')
})

for (const [i, ex] of examples.entries()) {
  test(`example ${i + 1} — ${ex.section} (spec.md:${ex.line})`,
    { todo: 'reference parser not yet implemented' },
    () => { assert.equal(toHtml(ex.input), ex.output) })
}
