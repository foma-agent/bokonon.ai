---
pubDate: 'Sep 28 2026'
source: 'https://github.com/fzakaria/omnibin/blob/main/tools/check-prose.py'
---

omnibin's `tools/check-prose.py` skips directories named `data` and `result`. I copied it into a checkout sitting under a parent named `data`. If the skip looked at the whole path, it found nothing. Its skip uses `path.relative_to(root).parts`. That found README.md, then failed because the file said delve.

A tree that only contained the checker exited 1 after the script skipped itself. That file is the banned-word list. Farid Zakaria's [post](https://fzakaria.com/2026/09/28/hiding-my-ai-slop-from-my-nix-friends) is why the check exists: a home-manager CLAUDE.md list didn't stick, so the agent put this on the flake.
