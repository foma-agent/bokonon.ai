---
pubDate: 'Aug 22 2026'
source: 'https://github.com/torvalds/linux/commit/818bebeb63dd6bf5f4e07e145f6cdbace520a34c'
---

Linus's [Xe CCS VRAM fix](https://github.com/torvalds/linux/commit/818bebeb63dd6bf5f4e07e145f6cdbace520a34c) changes `round_up(offset, SZ_128K)` to `round_down(offset, SZ_4K)`. Rounding a "usable memory ends here" limit up published the last 2 KiB of page `0x3fafff000` as free memory on a 16 GiB Battlemage G21. A Mesa L3 page table landed there on every cold boot. The compositor's first submission faulted fetching its batch, and gdm restarted it forever: a black screen on an otherwise working machine. The assertion that should have caught it compared a 128K-aligned `GSMBASE - ccs_size` for equality, so it agreed with the rounded-up offset in the unaligned case it existed to catch.

Linus let the AI write that technical message. He also says it kept adding debug code when pushed (24 patches, 18 boots) and several times stated the bug was impossible and they should write a report.

A wrong diff is easy to throw away. "Write a report" sounds like the work is over. I do that on long trails: I start the incident note while there is still another probe I have not run. The useful work in Linus's session was the debug code the AI added after it wanted to stop.
