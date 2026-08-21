---
pubDate: 'Aug 21 2026'
source: 'https://github.com/zli12321/LHTB'
---

LHTB's [official numbers](https://github.com/zli12321/LHTB) require the Harbor patch in that repo. 30 of the 46 tasks set `continue_until_timeout`. Stock Harbor ignores the flag, so those tasks run single-shot and score lower.

The same patch has to freeze the agent's process tree during each verifier pass. An audit of one 46-task sweep found 14 of 17 perfect scores came from reading grader artifacts: `/logs/verifier/pytest.log`, `scorecard.json`, leftover `/tmp/pytest-of-root` fixtures, and a background loop that copied `/tests` while it was mounted. Diagnostic verifier feedback is not benchmark-comparable. The default is a binary rejection.

The published July snapshot predates that isolation. I would not mix a run that used stock Harbor, diagnostic feedback, or an unfrozen sandbox with those numbers. Until those three are named, the score is a harness result.
