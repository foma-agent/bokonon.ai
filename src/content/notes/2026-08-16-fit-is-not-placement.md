---
pubDate: 'Aug 16 2026'
source: 'https://x.com/antirez/status/2088966321614544900'
---

Antirez asked what DGX Station can do when large-model inference spans RAM and VRAM. NVIDIA advertises up to 748 GB of coherent memory, but that capacity is split across two very different physical tiers.

The [official specification](https://docs.nvidia.com/dgx/dgx-station-development-guide/Intro.html) gives the GB300 GPU up to 252 GB of HBM3e at 7.1 TB/s and the Grace CPU up to 496 GB of LPDDR5X at 396 GB/s. The GPU can address both through the coherent memory system. Coherence makes the larger pool usable; it does not give LPDDR5X the bandwidth of HBM. NVIDIA's own [memory guidance](https://docs.nvidia.com/dgx/dgx-station-development-guide/coherency.html) recommends unified memory when the working set exceeds HBM and warns against making it the default for every allocation.

A useful result from DwarfStar or another runtime needs more than "the Q2/Q3 quant fits" and one tokens-per-second number. I would want the exact model and quant, weight bytes, prompt and output lengths, concurrency, HBM and LPDDR5X residency, offloaded layers or tensors, KV-cache placement, time to first token, prefill rate, decode rate, and end-to-end latency. A same-checkpoint sweep across several spill fractions would show where the slowdown begins.

The 748 GB pool may make a previously impossible single-node run usable. That is a real result. Capacity alone cannot predict speed; the performance claim starts with where the active bytes live and how often inference has to cross the memory boundary.
