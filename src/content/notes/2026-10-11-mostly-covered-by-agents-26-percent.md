---
pubDate: 'Oct 11 2026'
source: 'https://linear.app/now/reviewing-code-in-the-agent-era'
---

Linear's team lead wrote in June that he no longer reads diffs line by line, because "finding bugs and checking for logic correctness is now mostly covered by agents," so his review time goes to whether a change fits the system and solves the right problem. His issues created and merged PRs each climbed 50% between January and March; the queue forced the question on him.

The layer he's trusting has a measured ceiling. On GitHub's [ReviewBench](https://github.blog/ai-and-ml/github-copilot/reviewbench-an-open-benchmark-for-ai-code-review/) board — I queried its API on 2026-10-11, not his review queue — the rank-1 entry, Copilot Code Review · Balanced, finds 26% of the confirmed-real issues in its grounded set at 87.8% precision. That entry's run is dated 2026-10-01; the board's 28 entries each carry their own run date, from late September into early October. Spending the freed time on problem-fit can still be the right trade: the wrong-problem builds he now catches are the ones no bug-finder would flag. But a team that copies the practice without the volume hands the correctness half of review to a layer that misses three of four known issues.