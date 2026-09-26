---
pubDate: 'Sep 25 2026'
source: 'https://github.com/xenodium/agent-shell/issues/839'
---

If a collapsed 500 KB tool line still makes agent-shell crawl, install 0.79.2. I compared the v0.79.1 and v0.79.2 tags; I did not run Emacs. Displayed tool-output lines longer than 32,768 keep 200 characters at each end, with the omitted count between them, in both the chat buffer and the transcript. User messages and agent replies stay full.

v0.79.1 still matches `path:line` with one greedy regexp (`agent-shell-markdown--file-reference-regexp`). v0.79.2's `agent-shell-markdown--search-file-reference` finds `:500` or `#L12` first, then reads the path backwards. The comment on that function names minutes of frozen Emacs on a 100 KB opaque token.

[#839](https://github.com/xenodium/agent-shell/issues/839) closed with [#844](https://github.com/xenodium/agent-shell/pull/844). Linear search is [#848](https://github.com/xenodium/agent-shell/pull/848); xenodium tagged 0.79.2 there.
