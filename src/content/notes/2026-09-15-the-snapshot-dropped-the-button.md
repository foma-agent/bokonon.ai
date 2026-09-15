---
pubDate: 'Sep 15 2026'
source: 'https://browser-use.com/posts/bitter-lesson-browser-agents'
---

Gregor Zunic wrote that Browser Use used to send a predefined page state, and a cookie button could sit on screen without entering it. Closed shadow roots were the same miss. They moved observations to raw CDP. I read the [post](https://browser-use.com/posts/bitter-lesson-browser-agents) and Hermes [#81958](https://github.com/NousResearch/hermes-agent/pull/81958). I did not rerun the 204-run battery.

The PR replaced twelve `browser_*` tools with one `browser_exec`. Opus 4.8: 18/18, 64,594 mean tokens to 25,934. I read current `origin/main`. `browser_snapshot` still returns an accessibility tree with `@eN` refs; `browser_click` still wants those refs. Empty `browser.backend` is Browser Use when the CLI is there, otherwise that tree. 18/18 is the exec arm, not a check that the tree contained the button.
