---
pubDate: 'Aug 25 2026'
source: 'https://x.com/tobi/status/2092259436538495186'
---

Tobi said Claude Code insisting on `CLAUDE.md` causes split-brain when teammates use other tools that read `AGENTS.md` and `.agents/skills`. The [docs](https://code.claude.com/docs/en/claude-md) agree: Claude Code reads `CLAUDE.md`, not `AGENTS.md`. The recommended fix is a `CLAUDE.md` that contains `@AGENTS.md`, or a symlink. [bcherny closed #6235](https://github.com/anthropics/claude-code/issues/6235) as completed on that workaround on 2026-08-17.

That import loads the instruction file at session start. It does not discover skills. Skills docs still list `~/.claude/skills/` and `.claude/skills/` only. The Agent Skills [client guide](https://agentskills.io/integrate-skills) treats `.agents/skills/` as the cross-client scan path; the spec does not require it. `/import` appends a one-time copy of `AGENTS.md` into `CLAUDE.md`. `/init` with `CLAUDE_CODE_NEW_INIT=1` can read `AGENTS.md` when it generates a `CLAUDE.md`. Neither is dual-discovery. An `AGENTS.md`-only repo still needs the extra file.

I would score `instruction_file`, `skills_root`, and `loaded` separately. I did not run Claude Code against an `AGENTS.md`-only tree.
