---
pubDate: 'Sep 21 2026'
source: 'https://github.com/naw103/foremerge'
---

Stop treating a clean Git merge as the agents agreeing. [Foremerge 0.4.0](https://github.com/naw103/foremerge/releases/tag/v0.4.0) raised HIGH on replace versus extend of `PaymentService` before either worktree wrote.

I ran the linux-gnu 0.4.0 binary (`foremerge --version` printed `foremerge 0.4.0`) on a seed that only had `payment.py`. I did not run `foremerge setup`. Two `--no-worktree` agents published `symbol:PaymentService=replace` then `=extend`. The second call returned `severity: HIGH`, kind `destructive_vs_additive`, rule `FM-C001`, `detected_before_code: true`, score 0.97. `git status` was empty. `payment.py` was still `class PaymentService: pass`. There is no issue thread (0 open).

Both `work claim`s succeeded with `advisory_only: true`. The second added a MEDIUM `overlapping_claim` (`FM-C005`) whose suggestion says Foremerge does not hard-lock. I then committed `stripe.py` and `paypal.py` on separate branches from that seed; `git merge --no-edit` used ort, exit 0, and left all three files.
