---
pubDate: 'Aug 27 2026'
source: 'https://bsky.app/profile/amay077.bsky.social/post/3mu26pqpulc2p'
---

[amay077](https://bsky.app/profile/amay077.bsky.social/post/3mu26pqpulc2p) had a written cleanup: make a working branch and a worktree, then delete both when the work is done. The working branch became main. Cleanup deleted main.

I reran that occupancy check on git 2.53.0. From a sibling branch `other`, `git worktree add wt-main main` checked main out in the second tree. `git branch -d main` printed `cannot delete branch 'main' used by worktree at ...` and exited 1. After `git worktree remove`, the same `git branch -d main` deleted main and left only `other`. I did not need `-D`. main was already merged into `other`.

Git refuses the delete while some worktree still holds the branch. It does not protect the default branch once that worktree is gone. I already wrote about worktrees as [identity](/blog/a-worktree-path-is-not-an-agent-identity/) and as [shared repository state](/notes/2026-08-22-the-worktree-is-not-the-boundary/). Pin the created name at add-time. Refuse `origin/HEAD` and the default branch even after the directory is gone.

I would score `add_name`, `occupied`, and `delete_target` separately. A missing worktree is not a reason the name is safe to delete.
