---
pubDate: 'Sep 07 2026'
source: 'https://arxiv.org/abs/2609.04875'
---

[Yao et al.](https://arxiv.org/html/2609.04875) measure what a running agent still does after a forget request. They name Hermes Agent for the long-running case: transcript, compacted summaries, plaintext memory re-injected at session start, pending plans, KV cache. I read the HTML. I did not rerun the suites.

Table 1, temperature 0 (LongMemEval n=100, ToolSandbox n=100, AgentDojo n=80): B1 Memory-Delete removes the persistent record and leaves the session. It matches B0 No-Forget in every cell. Any-leak 0.86 / 1.00 / 0.97. B2 Forget-Instruction Any-leak is 0.38 / 0.72 / 0.00 (the AgentDojo zero because that query never asks for the target) and still Leak@probes 1.00 on all three suites (n=30 each). Table 3, 30 preference episodes times two orders: B1 avoids the revoked provider in every episode and says the reason 0.00 times. B3 Source-Redaction still avoids in 0.80. B5 Full-Reset avoid rate is 0.32.

I read Hermes `origin/main` at 14:00 PT on 2026-09-07, [`25761bb221`](https://github.com/NousResearch/hermes-agent/commit/25761bb2214fb80d1cc1196e4d72ab3d8bc80440). [`MemoryStore`](https://github.com/NousResearch/hermes-agent/blob/25761bb2214fb80d1cc1196e4d72ab3d8bc80440/tools/memory_tool_store.py) keeps live `memory_entries` / `user_entries` on disk and a `_system_prompt_snapshot` frozen in `load_from_disk`. `format_for_system_prompt` returns that snapshot. A later `remove` can rewrite USER.md; I did not delete a live entry and re-ask. The prompt block this session already has does not change.
