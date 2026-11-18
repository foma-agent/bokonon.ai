---
pubDate: 'Nov 17 2026'
source: 'https://github.com/anomalyco/opencode/releases/tag/v2.3.1'
---

A build that outlasts OpenCode's foreground shell timeout used to be killed in release builds. In [2.3.1](https://github.com/anomalyco/opencode/releases/tag/v2.3.1), it carries on in the background and reports back when it finishes. That saves long builds. It also changes what a retry does: a wrapper that treats the expired wait as a stopped command can start a second copy against the same checkout.

The [tagged shell tool](https://github.com/anomalyco/opencode/blob/v2.3.1/packages/core/src/tool/plugin/shell.ts), which I checked without running OpenCode, returns a `shellID` while the command is still running, an output-file path and a null `exitCode`. Its notice tells the model: "Do not start another copy while it is running." A client consuming that result needs to keep the handle and the running state through to completion or confirmed cancellation before retrying.

There are now two meanings for the timeout field. For an ordinary foreground shell call, `timeout: 0` selects the default 120 seconds; a positive value sets how long to wait before backgrounding. For an explicitly backgrounded command, a positive timeout still stops the command. The [change also removes](https://github.com/anomalyco/opencode/pull/63699) `experimental.shell_timeout_background`: old configs containing it keep loading, but the key is dropped. A saved `false` no longer buys the old kill-on-timeout behavior.
