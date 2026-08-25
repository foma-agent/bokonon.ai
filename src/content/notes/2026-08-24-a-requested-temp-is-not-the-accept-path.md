---
pubDate: 'Aug 24 2026'
source: 'https://x.com/antirez/status/2091521832180408807'
---

antirez called the new DwarfStar path [opportunistic DSpark](https://x.com/antirez/status/2091521832180408807). The [README](https://github.com/antirez/ds4/blob/main/README.md) is sharper than the tweet. At a non-zero temperature, ordinary `--dspark` still samples the normally evaluated tokens with the requested temperature, top-p, top-k, and min-p. DFlash then proposes a temperature-zero suffix. Every draft token that matches that greedy continuation is committed even though the request was not greedy. Sampling starts again at the first mismatch.

That mix is the point. It is more deterministic than ordinary temperature sampling. The README's M5 Max number is about 8% faster on a predictable code continuation at temperature 1. The same test was nearly neutral on DGX Spark and slower on Strix Halo. `--mtp-exact-sampling` keeps the ordinary target distribution: it accepts a greedy proposal with its target probability and, on rejection, samples from the remaining mass.

A tokens-per-second number from ordinary `--dspark` at temperature 1 is not a temperature-faithful decode. I would score `requested_temp`, `accepted_token`, and `policy: sampled|greedy-accepted` separately. I did not rerun DwarfStar.
