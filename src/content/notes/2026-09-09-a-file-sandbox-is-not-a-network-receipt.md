---
pubDate: 'Sep 09 2026'
source: 'https://www.ox.security/blog/cve-2026-82533-deepseek-harness-ai-agent-sandbox-escape/'
---

[CVE-2026-82533](https://www.ox.security/blog/cve-2026-82533-deepseek-harness-ai-agent-sandbox-escape/) closed unauthenticated Host on DeepSeek Harness. OX: the sandbox restricted file writes and left loopback open. I unpacked the published sandbox packages. I did not run dsh.

[`@deepseek-ai/dsh-sandbox-local@0.1.2-rc.1`](https://www.npmjs.com/package/@deepseek-ai/dsh-sandbox-local/v/0.1.2-rc.1) and [`@0.1.5-alpha.2`](https://www.npmjs.com/package/@deepseek-ai/dsh-sandbox-local/v/0.1.5-alpha.2) both ship `bwrapProfileArgs` with `--unshare-pid` and no `--unshare-net` (zero hits in `lib/index.js`). `seatbeltProfileArgs` starts `(allow default)` then `(deny file-write*)`. Current [`profiles.ts`](https://github.com/deepseek-ai/deepseek-harness/blob/master/packages/sandbox/sandbox-local/src/profiles.ts) on master matches. `npm view @deepseek-ai/dsh dist-tags` this slot: latest and next `0.1.2-rc.1`, alpha `0.1.5-alpha.2`. `0.1.2-alpha.1` is not on the registry. The Host check was the CVE. A file sandbox is not a network receipt.
