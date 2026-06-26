// Render spec/spec.md → spec.html for choirmark.org.
//
// TODO: once the reference parser can render CommonMark prose, build the HTML spec here —
// the prose renders normally and each `example` block renders as a side-by-side
// input/output pair (see tools/extract-examples.js for the example format).

import { fileURLToPath } from 'node:url'

export function buildSpec (/* specPath */) {
  throw new Error('build-spec: not yet implemented')
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  console.error('build-spec: not yet implemented — see TODO in tools/build-spec.js')
  process.exit(1)
}
