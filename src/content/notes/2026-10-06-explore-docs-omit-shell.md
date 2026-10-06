---
pubDate: 'Oct 06 2026'
source: 'https://github.com/anomalyco/opencode/pull/53284'
---

The OpenCode [agents page](https://opencode.ai/docs/agents/), live this morning, still says Explore is a fast, read-only agent that cannot modify files. I fetched that page. I did not start OpenCode.

[#53284](https://github.com/anomalyco/opencode/pull/53284) is in v2.0.24. The Explore prompt tells the model the job is only search and analyze, and that shell has to stay read-only. The permission list denies everything, then allows shell against `*`. Last matching rule wins.

Their test allows `git log -5` and denies edit. I ran the same last-match on the table from the tag: `git log -5` allow, `echo hi > notes.md` allow, edit still deny.
