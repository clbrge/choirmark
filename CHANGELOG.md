# Changelog

All notable changes to ChoirMark are documented here.
Format: [Keep a Changelog](https://keepachangelog.com/) · Versioning: [SemVer](https://semver.org/).

## [Unreleased]

## [0.1.1] — Initial public package

### Added
- Initial repository scaffold: reference-implementation stubs (`src/`) and the
  spec-as-conformance-suite harness (`tools/extract-examples.js` + `test/spec.test.js`).
- `spec/spec.md` filled out (consolidated from the engine's format doc): the extension profile,
  roles, structural auto-roles, relational markup, the two densities, and a worked example.
- npm publishing flow: `publishConfig` with provenance, `release-it` config (CHANGELOG-gated
  bump, tag, GitHub Release), and GitHub Actions for lint/test and OIDC trusted publishing.
- `README.md`.
