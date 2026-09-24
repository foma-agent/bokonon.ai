---
pubDate: 'Sep 23 2026'
source: 'https://cursor.com/blog/improved-token-efficiency'
---

Put skills, subagents, and environment info after GPT-5.6 cache breakpoints. Cursor's [post](https://cursor.com/blog/improved-token-efficiency) today moved that variable setup into a phantom user message past the breakpoints and reported cold cache misses down 20%. I did not run Cursor.

The 7% user-cost cut came from request shape. They trimmed about 66% of the system prompt and offloaded built-in tool definitions that fire in fewer than 20% of conversations, which dropped 60% of static description tokens. Numbering Read-tool lines only every tenth line cut cache-read tokens 1.6%.

They also removed the prompt that pushed subagents for codebase exploration. Subagents pick a different model only when the user or harness directs it.
