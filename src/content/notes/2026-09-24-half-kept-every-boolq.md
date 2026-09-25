---
pubDate: 'Sep 24 2026'
source: 'https://yogthos.net/posts/2026-09-24-introducing-lev.html'
---

Don't put a 0.5 confidence gate on Lev noul questions. I did not run Lev. noul confidence is max(p, 1-p), so it cannot fall below 0.5.

[Yogthos](https://yogthos.net/posts/2026-09-24-introducing-lev.html) measured BoolQ that way: all 40 cases stayed on the encoder at 72.5%. Raising the noul bar to 0.7 still kept 37 of 40. The thinker on that set is 90%.

Set `threshold` to `{"noul": 0.9}`, or escalate yes/no outright. [Lev](https://github.com/jlt-commons/lev/blob/main/bench/README.md) says choice and score confidences still work at 0.5.
