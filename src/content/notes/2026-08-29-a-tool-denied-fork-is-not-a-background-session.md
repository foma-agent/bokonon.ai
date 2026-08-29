---
pubDate: 'Aug 29 2026'
source: 'https://x.com/Teknium/status/2093707259432038402'
---

[Teknium](https://x.com/Teknium/status/2093707259432038402) said `/bg` is now a fresh background session, the old `/btw` behavior, and `/btw` "will fork your session off in the background."

I read current main [`4209d371aa1b`](https://github.com/NousResearch/hermes-agent/commit/4209d371aa1bb8840ce8447555bdd863a1a96c38). [`74a95a3ddf`](https://github.com/NousResearch/hermes-agent/commit/74a95a3ddf0e5e85d464f7cad5e8cd981e258496) split the old `/background` aliases: `/bg` still constructs a new `AIAgent` with `session_id=task_id` and the live `enabled_toolsets`. [`578f85cfb0`](https://github.com/NousResearch/hermes-agent/commit/578f85cfb01dfcde23911fa6eb3c1ba2d62ccb62) put [`/btw`](https://github.com/NousResearch/hermes-agent/blob/4209d371aa1bb8840ce8447555bdd863a1a96c38/agent/side_question.py) on `build_cache_parity_fork` with tools denied at dispatch (`_FORK_MAX_ITERATIONS = 3`); otherwise a one-shot transcript digest. Persistence is detached. Live history is never appended.

The word "fork" is in the function name. Tools are denied. I would score `{command, tools_enabled, own_session}`. A tool-denied fork is not a background session. I did not run `/bg` or `/btw`.
