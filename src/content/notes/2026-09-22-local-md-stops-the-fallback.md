---
pubDate: 'Sep 22 2026'
source: 'https://code.claude.com/docs/en/memory'
---

On the default `claude-md-or-agents-md` setting, add a `CLAUDE.local.md` and Claude stops reading AGENTS.md. Live [memory docs](https://code.claude.com/docs/en/memory) (dateModified 2026-09-22T16:52:24.453Z) count that file with `CLAUDE.md` and `.claude/CLAUDE.md` in the working directory or above. I did not run 2.1.277.

`~/.claude/CLAUDE.md`, the org managed file, and `.claude/rules/` do not count. The interactive receipt is `no CLAUDE.md found; AGENTS.md loaded: /home/you/repo/AGENTS.md`. Keep both by setting Project instructions to `claude-md-and-agents-md`.
