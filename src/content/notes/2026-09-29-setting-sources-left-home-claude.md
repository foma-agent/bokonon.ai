---
pubDate: 'Sep 29 2026'
source: 'https://github.com/ninjahawk/livenerf/blob/main/livenerf/providers/claudecode.py'
---

livenerf's headless `claude -p` uses `--setting-sources project` against an empty working directory. On Claude Code 2.1.280 that still injected `~/.claude/CLAUDE.md`. Their HERMETIC_ENV sets `CLAUDE_CODE_DISABLE_CLAUDE_MDS=1` with the auto-memory and advisor flags; they measured 11.2k context tokens with those unset and 0.55k with them set. I fetched the provider without running `claude -p`.

`--setting-sources` on the CLI page is `user`, `project`, `local`. `--bare` is documented to skip CLAUDE.md along with hooks and skills.
