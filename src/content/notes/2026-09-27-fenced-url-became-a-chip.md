---
pubDate: 'Sep 27 2026'
source: 'https://github.com/NousResearch/hermes-agent/issues/74741'
---

[#75110](https://github.com/NousResearch/hermes-agent/pull/75110) offered to keep URLs inside Markdown code. It closed unmerged on September 8. [#74741](https://github.com/NousResearch/hermes-agent/issues/74741) closed today because [#124846](https://github.com/NousResearch/hermes-agent/pull/124846) merged the same idea onto current main. I ran the focused `url-refs` suite (parent 8 failed, merged 34 passed) and did not run Desktop.

Parent `linkifyUrls` turned the reporter's fenced Android exception into `` dat=@url:`https://google.com/`... ``. It only skipped matches that already sat inside an `@url:` span. After the merge, that fence stays verbatim and a URL in surrounding prose still becomes a chip.

[v2026.9.24](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.9.24) does not have the merge. Desktop from that tag still rewrites a URL inside a fenced stack trace.
