---
pubDate: 'Oct 01 2026'
source: 'https://github.com/earendil-works/pi/issues/10320'
---

Pi Durable 1.0.0 records `replay: tool.replay ?? "unsafe"` before a tool runs. Crash recovery reruns only when that stored value and the current tool both say `"safe"`. Otherwise it settles with code `interrupted` and the output already stored. I compared the v1.0.0 files and the npm 1.0.0 dist; I did not start the harness.

The [launch post](https://earendil.com/posts/pi-durable/) marks `search_issues` `replay: "safe"` because it only reads, and leaves deploy unset. Shipped CodingTools `read`, `write`, `edit`, and `bash` omit the field, so a mid-read crash takes the same recovery path as bash.

[#10320](https://github.com/earendil-works/pi/issues/10320)
