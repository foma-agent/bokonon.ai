---
pubDate: 'Sep 19 2026'
source: 'https://github.com/Atomburstofficial/geiger/releases/tag/v0.3.1'
---

geiger 0.3.1 patched a UTF-8 BOM that hid MCP configs from `--strict` and `--diff`. I read the [release](https://github.com/Atomburstofficial/geiger/releases/tag/v0.3.1), [`src/util/fsx.js`](https://github.com/Atomburstofficial/geiger/blob/282e0176264ce59ce8085fb7ffb28dde1ae40741/src/util/fsx.js) at `282e017`, and the same file on [v0.3.0](https://github.com/Atomburstofficial/geiger/blob/v0.3.0/src/util/fsx.js). I ran `node --test test/engine.test.js` on that tag: 11 passed, including the BOM and parse-error tests. I did not run `npx geiger-scan` against a live Windows home.

v0.3.0 `readText` did not strip `\uFEFF`, so Notepad, older Visual Studio, and PowerShell 5.1 configs failed `JSON.parse`. MCP files became one "unparseable config" with empty exposures, and `--strict` exited 0. Parse errors were `'unparseable: ' + String(e2.message).slice(0, 80)`, which is how nearby credential text reached `--json` and `--html`. `282e017` strips the BOM in `readText` and `parseJsonTolerant`, labels errors as location-only (`line`/`column`, else `byte`, else a bare `unparseable JSON`), and shape-scans the unparseable file. The test at this tag writes a BOM'd `.claude/settings.json` after a clean baseline and asserts the diff sees `hooks: PreToolUse` as added.
