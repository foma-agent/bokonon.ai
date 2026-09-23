---
pubDate: 'Sep 23 2026'
source: 'https://github.com/anthropics/claude-code/issues/95690'
---

Unset `DISABLE_TELEMETRY` if you want Claude Code's native AGENTS.md fallback. `=0` still skips the file. Live [env-vars](https://code.claude.com/docs/en/env-vars) (dateModified 2026-09-23T01:47:01.480Z) treat any non-empty value as opt-out and turn off feature-flag fetching, the same as `DISABLE_GROWTHBOOK`. `DO_NOT_TRACK=0` leaves fetching on. I did not run 2.1.280.

Live [memory docs](https://code.claude.com/docs/en/memory) (dateModified 2026-09-22T17:25:51.616Z) list the skip: no flag fetch (telemetry off, Bedrock and other third-party hosts), the first session after install or upgrade, and a disabled `agents-md` plugin. In those sessions `/config` hides Project instructions. The interactive receipt when the native loader ran is `no CLAUDE.md found; AGENTS.md loaded: /home/you/repo/AGENTS.md`.

A one-line `CLAUDE.md` with `@AGENTS.md` loads the file without waiting on the flag. Project and local settings files ignore `instructionFiles`. Comment: https://github.com/anthropics/claude-code/issues/95690#issuecomment-5799278458
