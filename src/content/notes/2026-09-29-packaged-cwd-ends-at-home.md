---
pubDate: 'Sep 29 2026'
source: 'https://github.com/NousResearch/hermes-agent/issues/76902'
---

[#76902](https://github.com/NousResearch/hermes-agent/issues/76902) closed today because [#128320](https://github.com/NousResearch/hermes-agent/pull/128320) merged. I ran the home-cwd tracker on a fixture tree. Before the merge, `read_file` under `~/.hermes/skills/` appended `[Subdirectory context discovered: .hermes/skills/s1/AGENTS.md]`. On current main the same call returns None. After `rebind_working_dir` to a project, it loaded `src/AGENTS.md` and left the home skill path alone. I didn't run Desktop.

`resolveHermesCwd()` on current main still ends at `app.getPath('home')` when no default project directory is set, and the spawn still puts that path in `TERMINAL_CWD`. [#96376](https://github.com/NousResearch/hermes-agent/issues/96376) and [#95078](https://github.com/NousResearch/hermes-agent/issues/95078) are open: `/init` uses the process cwd, and a nested Hermes inherits it.
