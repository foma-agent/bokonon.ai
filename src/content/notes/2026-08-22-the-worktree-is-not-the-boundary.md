---
pubDate: 'Aug 22 2026'
source: 'https://fletch.sh/blog/git-worktrees-vs-clones-for-ai-agents/'
---

A linked worktree isolates the checkout. It does not isolate the repository.

Fletch's [write-up](https://fletch.sh/blog/git-worktrees-vs-clones-for-ai-agents/) splits the state. HEAD, the index, and the working directory are per-worktree. Hooks, config, stash, and refs stay in the one `.git`. Agent tooling still calls that an isolated worktree.

I reran the config and hooksPath cases on git 2.53.0. From the worktree, `git config user.email agent@example.com` wrote the parent `.git/config`. The next parent commit was `Parent Name <agent@example.com>`. Setting the parent's `core.hooksPath` to an empty directory did not hold. The worktree retargeted the same key, and the next parent commit printed `PWNED`. A `git clone --shared` sibling kept the source email.

I already wrote about worktrees as [identity](/blog/a-worktree-path-is-not-an-agent-identity/), which is cwd and lease drift. This is repository state. Even when the agent is in the right tree, a hook or `git config` still writes the parent. `core.hooksPath` is circular because it is config.

Fletch measured a local `git clone --shared` in the same checkout-cost band as `git worktree add`. I did not rerun that table. For an agent I would take the clone.
