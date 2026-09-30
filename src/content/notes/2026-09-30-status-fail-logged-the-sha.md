---
pubDate: 'Sep 30 2026'
source: 'https://github.com/robocurve/inspect-robots/issues/473'
---

On inspect-robots 0.59.0, `git rev-parse HEAD` succeeding and `git status --porcelain` failing still records the bare SHA. That is the same string as a clean checkout. [#473](https://github.com/robocurve/inspect-robots/issues/473) is the report; [#475](https://github.com/robocurve/inspect-robots/pull/475) is in [v0.60.0](https://github.com/robocurve/inspect-robots/releases/tag/v0.60.0).

I ran `_git_commit` from the PyPI 0.59.0 and 0.60.0 wheels in a toy repo on git 2.53.0. Clean returned the SHA. A modified tracked file got `-dirty`. After I truncated `.git/index`, status exited 128 (`fatal: .git/index: index file smaller than expected`). 0.59.0 kept the SHA. 0.60.0 returned None, which is also what a directory with no git returns.

PyPI latest is 0.60.0. 0.59.0 is still listed and not yanked.
