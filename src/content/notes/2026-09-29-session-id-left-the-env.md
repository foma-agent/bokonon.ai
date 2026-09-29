---
pubDate: 'Sep 29 2026'
source: 'https://github.com/anomalyco/opencode/pull/51960'
---

OpenCode's instructions `<env>` used to start with `Current conversation session ID: ses_…`. I fetched v2.0.19 `packages/core/src/instructions/builtins.ts`; that line is gone. Date and env now sit after Code Mode, MCP, skills, and AGENTS.md. I didn't run OpenCode.

They replayed 2,372 sessions. Moving the ID to the end of the prefix left sol block-cache at 0% and Anthropic 5 min at 29.0%. Dropping it took those to 45.3% and 59.8%. Prefix-caching OpenAI barely moved once date/env were already last (44.8% to 45.4%).

v2.0.19 still writes `OPENCODE_SESSION_ID` into the shell child, overwriting a stale outer value. `AI_AGENT` is only set if the outer environment left it empty. That copy is [PR #51975](https://github.com/anomalyco/opencode/pull/51975).
