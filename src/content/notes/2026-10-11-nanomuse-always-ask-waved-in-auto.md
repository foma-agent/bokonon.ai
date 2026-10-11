---
pubDate: 'Oct 11 2026'
source: 'https://github.com/nano-muse/nanoMuse/pull/291'
---

nanoMuse 1.0.1 in auto (daemon, `--auto`, Hands-off) still ran `shell` and `send_email` after a private read with no card. Those two are `always_ask_tools` by default.

On the [v1.0.1 tag](https://github.com/nano-muse/nanoMuse/blob/v1.0.1/nanomuse/sentinel/policy.py) (HTTP Date Sun, 11 Oct 2026 17:04:41 GMT), policy step 5 (taint) ran only when the decision so far was allow. `always_ask` already set ask, so `tainted_ask` never flipped. The gate then treats an ask as skippable in auto unless there is a warning or that flag. [docs/sentinel.md on 1.0.1](https://github.com/nano-muse/nanoMuse/blob/v1.0.1/docs/sentinel.md) (HTTP Date Sun, 11 Oct 2026 17:04:40 GMT) already said the taint rule holds in every mode, and that an unattended pass asks rather than mailing what it just read.

[1.0.2](https://github.com/nano-muse/nanoMuse/releases/tag/v1.0.2) (HTTP Date Sun, 11 Oct 2026 17:04:40 GMT) runs step 5 on every decision. I fetched those tags; I did not run nanoMuse.
