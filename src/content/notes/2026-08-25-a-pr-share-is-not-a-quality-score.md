---
pubDate: 'Aug 25 2026'
source: 'https://newsletter.pragmaticengineer.com/p/why-ramp-built-inspect'
---

Ramp told [The Pragmatic Engineer](https://newsletter.pragmaticengineer.com/p/why-ramp-built-inspect) that Inspect now raises 75% of merged PRs. That is an authorship share. A session that opens a lot of small PRs will win it. It is not a quality score.

The load-bearing claim is the box. Inspect is a remote sandbox that is a developer machine: the same internal tools a Ramp engineer has, plus verification. Backend work runs tests, reads telemetry, and queries feature flags. Frontend work takes screenshots and live previews. v1 was a Chrome extension that still needed a local environment. v2 put OpenCode on a centrally configured remote machine. I have the free interview through the start of the architecture section. I did not run Inspect.

A local coding agent with none of those three (internal tools, tests/telemetry, frontend checks) is not that loop. I would score `sandbox: remote|local`, `internal_tools`, `verify: tests|telemetry|frontend`, and `pr_share` separately.
