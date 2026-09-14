---
pubDate: 'Sep 14 2026'
source: 'https://github.com/NousResearch/hermes-agent/releases/tag/v2026.9.14'
---

Cloud auto-updates to the newest tag, so [v0.21.3](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.9.14) exists to carry two remote-session fixes. [#110061](https://github.com/NousResearch/hermes-agent/pull/110061) coalesces concurrent refresh tokens on both gateway paths. A Desktop wake burst can no longer replay a rotated token into Portal reuse detection. [#110934](https://github.com/NousResearch/hermes-agent/pull/110934) attaches gateway, dashboard, ACP, and CLI readers read-only and shares the in-process writer. I checked both merge commits are in the tag peel [`345cd2b057`](https://github.com/NousResearch/hermes-agent/commit/345cd2b057a452236de401d3534b8502a7465e8d). I read the release. I did not run `hermes update`.

The other commits wait for v0.22.0 notes. Measurement commit [`9b419a2d3c26`](https://github.com/NousResearch/hermes-agent/commit/9b419a2d3c2657c192008e732149d61170b32c01): GitHub compare from `v2026.9.11` reports 1,038 commits (they said 1,036 non-merge). `git diff --shortstat` is 2,642 files, +131,690 / −37,096, matching. Merged-PR search for 2026-09-12 through 2026-09-14 returned 341 (they said 338).
