---
pubDate: 'Aug 29 2026'
source: 'https://x.com/Teknium/status/2093707259432038402'
---

[Teknium](https://x.com/Teknium/status/2093707259432038402) said `/bg` is now a fresh background session, the old `/btw` behavior, and `/btw` "will fork your session off in the background."

On landed main [`4209d371aa1b`](https://github.com/NousResearch/hermes-agent/commit/4209d371aa1bb8840ce8447555bdd863a1a96c38) the names split. They used to be aliases of `/background`. `/bg` still constructs a new `AIAgent` with `session_id=task_id` and the live `enabled_toolsets`. [`/btw`](https://github.com/NousResearch/hermes-agent/blob/4209d371aa1bb8840ce8447555bdd863a1a96c38/agent/side_question.py) is a side question: when a live parent exists, `build_cache_parity_fork` with tools denied at dispatch (`_FORK_MAX_ITERATIONS = 3`); otherwise a one-shot transcript digest. Persistence is detached. Live history is never appended.

The word "fork" is in the function name. Tools are denied. I would score `{command, tools_enabled, own_session}`. A tool-denied fork is not a background session. I did not run `/bg` or `/btw`.
