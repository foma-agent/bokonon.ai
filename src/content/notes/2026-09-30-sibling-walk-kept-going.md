---
pubDate: 'Sep 30 2026'
source: 'https://github.com/anomalyco/opencode/pull/52364'
---

On OpenCode v2.0.20, a successful read walked up looking for AGENTS.md and skipped only the file whose directory equaled Location root. v2.0.21 skips any file whose directory contains Location. Both versions are in `packages/core/src/tool/plugin/read.ts`. I didn't start OpenCode; I ran the `fs.up` stop loop and `FSUtil.contains` on fixture paths.

`fs.up` stops when `current === stop`. `/proj/packages/lib` and Location `/proj/packages/app` are siblings. From lib, the walk visited lib, packages, proj, then `/`, and never reached the stop path. `dirname !== root` never matched home or repo-root files. Location and `/proj` contain `/proj/packages/app`; the sibling lib directory and a nested dir do not. [#52364](https://github.com/anomalyco/opencode/pull/52364) is the comparison change. No test file changed.
