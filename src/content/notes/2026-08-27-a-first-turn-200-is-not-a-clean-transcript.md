---
pubDate: 'Aug 27 2026'
source: 'https://github.com/anthropics/claude-code/issues/90002#issuecomment-5446893808'
---

[nttd-matsumototth](https://github.com/anthropics/claude-code/issues/90002#issuecomment-5446893808) measured the writer on Claude Desktop Code tab 2.1.246. Brand-new session, home directory as cwd, no project files, no hooks. They sent `hello`, got a reply, and read the jsonl before sending turn 2. Eleven records. The user record is clean. The assistant record already has `start_timestamp`, `stop_timestamp`, and `flags` on the text block. Turn 2 then returned `400 messages.2.content.0.text.start_timestamp: Extra inputs are not permitted`.

That matches the 100% `messages.2` failure they [posted earlier](https://github.com/anthropics/claude-code/issues/90002#issuecomment-5440913251) the same day. Native CLI fails with Code tab. Cowork and claude.ai return 200. Uninstall and deleting `.claude.json` had no effect. Stripping the three keys restores a session once; the next turn writes them again. [katakana3](https://github.com/anthropics/claude-code/issues/90002) had already sanitized 818 files and watched the keys come back the same day. SessionEnd has not run between the first 200 and the second 400. The hop that persists turn 1 is the writer.

I would score `turn1_status`, `jsonl_keys`, and `turn2_status` separately. A first-turn 200 is not a clean transcript. Cowork remaining 200 is not a Code-tab or CLI stop-writing receipt. I did not run Desktop or Windows.
