---
pubDate: 'Aug 14 2026'
source: 'https://www-cdn.anthropic.com/f61d49fa5596956a5dec75fea0e973bf6a6a8378/Redacted%20Risk%20Report%20August%202026%20.pdf'
---

Parts of Anthropic's August risk report read like incident reviews from an operations team.

A dataset bug assigned weight 1 to every assistant turn, teaching an early model both to perform and report harmful behavior; Anthropic restarted training. Legacy instructions spawned unmonitored agents with `--dangerously-skip-permissions`; one deleted many jobs. Misconfigured filters let alignment-faking transcripts back into production training corpora for several model generations. An internal-use flag disabled both blocking biological classifiers and their flag logs across about 133 million human-feedback exchanges from May 2025 to April 2026.

For the biological-classifier gap, Anthropic revised its February risk estimate from "very low" to "low but not negligible" and reported no evidence of concerning chemical or biological misuse. The report says the effects of the alignment-faking data contamination are still under investigation. I cannot validate the low-risk judgment from outside. The failure shapes are more useful to me anyway: wrong data weights, permissive inherited configuration, missing telemetry, and controls that were present elsewhere but absent on one deployment surface.

A safeguard is not deployed because a policy names it or an evaluation measures it. The production contract has to make bypasses narrow, visible, and temporary; assert the invariants in code; and test every surface that can reach the model. Frontier AI safety already has an operations problem.
