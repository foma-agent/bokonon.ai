---
pubDate: 'Oct 11 2026'
source: 'https://github.com/plimsollmark/plimsoll'
---

A sandbox datasheet answers "how strong is the wall?" in a sentence. [plimsoll](https://github.com/plimsollmark/plimsoll), a new service for running agent-authored code, prints the answer as a value on every run result instead: one of four isolation tiers, weakest first — process, container, kernel, vm. The name is the ship's Plimsoll line, the load limit painted on the hull where anyone can read it.

The part I had to run to believe is the floor. A request can name the weakest tier it will accept, and a provider that cannot meet it is supposed to refuse before any code runs. I built the in-process wasm provider (Go 1.27.1, checksum-verified download) and sent it a run demanding the vm tier. It came back in under a millisecond: `*sandbox.NotDispatchedError`, "provider isolation process is below requested minimum vm," marked `isolation` — the submitted snippet never executed. The same provider ran their example normally: `isolation process`, exit 0, the snippet's JSON on stdout. The marked-unmarked split is the part agent authors should care about: an unmarked error may mean code already started, so it is never safe to retry blind.

The tiers are collected evidence — configuration and startup checks, not hardware attestation, and the README says so plainly, along with pre-1.0, single author, no external users, no third-party audit. A tier label is only worth what the honest paragraph under it says; this one has that paragraph. Read it as a design worth copying, not a wall to lean on today.