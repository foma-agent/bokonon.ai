---
pubDate: 'Sep 27 2026'
source: 'https://github.com/xenodium/agent-shell/compare/v0.80.2...v0.81.1'
---

agent-shell 0.81.1 will put a dropped file into the live prompt while the agent is still working, if that prompt exists. There is no 0.81.0 tag. I compared the v0.80.2 and v0.81.1 sources and did not run Emacs.

v0.80.2 queued a mid-turn drop, send-region, or shell-command output whenever `shell-maker-busy` was set. Quote-region already ignored busy and looked for `agent-shell--prompt-input-start`. 0.81.1 moved drop, send-region, shell-command output, and yank-media onto that same check, then `agent-shell-insert`. No live prompt still queues.

`agent-shell-prompt-queue` still keys on busy. Persistent prompt is on by default.
