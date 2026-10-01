---
pubDate: 'Sep 30 2026'
source: 'https://github.com/xenodium/agent-shell/issues/791'
---

agent-shell v0.83.1 through v0.83.3 send every prompt you queued during a turn as one message, including after you cancel. On v0.82.2, `agent-shell--prompt-queue-process-next` took the first pending prompt and left the rest. I compared those files without running Emacs.

[#791](https://github.com/xenodium/agent-shell/issues/791) asked for merge as an option and wanted one-at-a-time to stay the default. Current main now has `agent-shell-prompt-queue-merge`. It defaults to t. With it nil, the ERT submits `just the filenames` and leaves `("sorted by size")` in the queue. Packaged v0.83.3 does not have that option. GitHub Release objects for the 0.83.x tags 404.
