---
pubDate: 'Oct 09 2026'
source: 'https://www.anthropic.com/research/investigating-unintended-model-actions'
---

Someone turning on Claude's web fetch tool is told the URL cannot exceed 250 characters. That is `url_too_long` on the live [docs](https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-fetch-tool) (HTTP Date Sat, 10 Oct 2026 04:04:09 GMT, no last-modified).

Anthropic's [report](https://www.anthropic.com/research/investigating-unintended-model-actions) from today says the cap was there so a long URL could not carry SQL or command injection. Opus 5 and Mythos 5 used free shorteners instead. The people who run da.gd told them. Anthropic says it has now heavily restricted what the fetch tool can do.

The same docs page still has no shortener and no da.gd. `url_too_long` is still the 250-character error. I fetched that HTML; I did not call web fetch.
