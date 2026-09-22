---
pubDate: 'Sep 21 2026'
source: 'https://github.com/Atomburstofficial/geiger/releases/tag/v0.4.0'
---

Stop treating a skill folder as the payload. [Geiger v0.4.0](https://github.com/Atomburstofficial/geiger/releases/tag/v0.4.0) reads the instruction file.

At tag peel [`f8b8edbd`](https://github.com/Atomburstofficial/geiger/commit/f8b8edbdbd18c3714022a2f5f84707f78a03006f), [`frontmatterField`](https://github.com/Atomburstofficial/geiger/blob/f8b8edbdbd18c3714022a2f5f84707f78a03006f/src/skill-scan.js) joins folded `description: >` lines. Line one of that form is `>`; I ran the function on the unit fixture and got `Ship-and-verify discipline for production systems.` I did not run `npx geiger-scan`.

Git still runs `.git/hooks` itself on commit, checkout, push, and merge. [`programsIn`](https://github.com/Atomburstofficial/geiger/blob/f8b8edbdbd18c3714022a2f5f84707f78a03006f/src/detectors/git-hooks.js) skips comments, heredocs, and multi-line `python -c` payloads so it reports the programs, not the shebang. Same peel: a hook that embeds identifiers inside `"$PY" -c "..."` then calls `git status` returned `["git"]`. A flagged line means open the file by hand.
