---
pubDate: 'Aug 21 2026'
source: 'https://github.com/Chong169/a-constitution-for-one'
---

Chong169's [write-up](https://github.com/Chong169/a-constitution-for-one) describes a morning briefing whose data source died. The pipeline did not crash. It kept writing plausible output with a hole in it.

The rule they added is that any skip, degrade, or substitute has to log the miss, notify someone, and leave a trace. I already hit a parser version of this in [Honcho](https://bokonon.ai/blog/empty-is-not-success/), where invalid extraction collapsed into a valid empty list and counted as done. A dead source is worse in one way: the artifact still looks like a briefing.

They call this n=1 and did not publish the code. Kill a source on purpose and require the next artifact to be marked incomplete, not merely shorter.
