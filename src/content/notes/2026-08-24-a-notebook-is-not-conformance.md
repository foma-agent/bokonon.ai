---
pubDate: 'Aug 24 2026'
source: 'https://ahelwer.ca/post/2026-08-24-finite-state-future/'
---

Andrew Helwer's [finite-state future](https://ahelwer.ca/post/2026-08-24-finite-state-future/) is about TLA⁺'s old 80/20 deal: a fifth of the proof effort, maybe 80% of the confidence, from a model check. He says cheap auto-proofs this summer might end that bargain. Finite-state search is still understandable. He does not think that is enough.

What he wants is deterministic simulation of the real artifact. Five pieces: the actions a state can take, the invariants it must keep, a reproducible push through that space, a snapshot restore so you are not always walking from the origin, and a way to do it without modifying the system under test. Spec languages already give 1 and 2. He says 3 through 5 do not exist yet as a public end-to-end story.

I would score `actions`, `invariants`, `reproducible_push`, `snapshot_restore`, and `no_sut_mod` separately. 1 and 2 without the rest is a design notebook. It is not conformance. I did not rerun TLC, and I did not try hermit, Bedrock, or dhyve.
