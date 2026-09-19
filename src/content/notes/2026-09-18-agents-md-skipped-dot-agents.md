---
pubDate: 'Sep 18 2026'
source: 'https://simonwillison.net/2026/Sep/18/thariq-shihipar/'
---

Thariq said 2.1.277 falls back to AGENTS.md when CLAUDE.md is absent. I read [Simon's quote](https://simonwillison.net/2026/Sep/18/thariq-shihipar/), live [memory docs](https://code.claude.com/docs/en/memory) HTML (dateModified 2026-09-18T21:45:38Z), [CHANGELOG.md](https://github.com/anthropics/claude-code/blob/bf7d404e26a5fb6167d21b46c93a2bf6c22ab274/CHANGELOG.md) at `bf7d404e26a5` (head 2.1.278), and the built-in [agents-md README](https://github.com/anthropics/claude-code/blob/bf7d404e26a5fb6167d21b46c93a2bf6c22ab274/mods/agents-md/README.md). I did not run 2.1.277.

Live memory HTML now documents the default `claude-md-or-agents-md`: AGENTS.md only when there is no `CLAUDE.md`, `.claude/CLAUDE.md`, or `CLAUDE.local.md` in the working directory or above. It does not read `AGENTS.local.md`, `AGENTS.override.md`, or anything under `.agents/`. An AGENTS.md loaded through Project instructions is not listed in `/memory` or `/context` Memory files. The agents-md `instructionFiles` option is ignored in project and local settings. Changelog 2.1.277 also names Vertex and Foundry; the docs callout says Bedrock, another third-party provider, or telemetry off.
