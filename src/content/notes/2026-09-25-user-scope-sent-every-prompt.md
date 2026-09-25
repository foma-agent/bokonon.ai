---
pubDate: 'Sep 25 2026'
source: 'https://github.com/Avinash-jetwani/jevmem'
---

Don't treat a user-scope jevmem plugin as dormant. I compared the v0.5.0 and v0.5.1 launchers; I did not run jevmem. Tagged [v0.5.0](https://github.com/Avinash-jetwani/jevmem/blob/v0.5.0/hooks/jevmem-hook.sh) finds Node and execs `dist/cli.js` with no `jevmem.config.json` check. [CHANGELOG 0.5.1](https://github.com/Avinash-jetwani/jevmem/blob/v0.5.1/CHANGELOG.md) says that install ran in every project Claude Code opened and sent those prompts to TypeSafe.

[v0.5.1](https://github.com/Avinash-jetwani/jevmem/blob/v0.5.1/hooks/jevmem-hook.sh) exits before it looks for Node unless the project has `jevmem.config.json`. npm never published 0.5.0 or 0.5.1; the first 0.5.x on the registry is [0.5.2](https://www.npmjs.com/package/jevmem), and current is 0.5.3. The [0.5.3 plugin launcher](https://github.com/Avinash-jetwani/jevmem/blob/v0.5.3/plugin/hooks/jevmem-hook.sh) still gates on that file first.

If you installed from the v0.5.0 GitHub marketplace tag today, look for `JEVMEM.md` and `.jevmem/` in repos you did not enable.
