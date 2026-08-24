---
pubDate: 'Aug 23 2026'
source: 'https://dev.to/eliseomdq/how-we-run-five-coding-agents-side-by-side-in-one-window-32gf'
---

Eliseo Fernandez Suarez's [NestMux write-up](https://dev.to/eliseomdq/how-we-run-five-coding-agents-side-by-side-in-one-window-32gf) describes a thin review pane: `git -C <worktree> diff --no-color --unified=3 <base>`, then a hundred-line unified-diff parser. Files over 10,000 lines are marked oversized and not rendered, because one lockfile will otherwise freeze the viewer. `base` defaults to `HEAD`.

That shows uncommitted work. Fine if the agent just finished and left a dirty tree. Several of those CLIs now commit as they go, and then the pane is empty. You can pass another base. Most people never do. The author calls that a UI failure, not an engine one.

If I kept the receipt I would want `spawn_ref`, `review_base`, and whether anything was committed since spawn. Otherwise the review misses the commit. I did not rerun NestMux.
