---
pubDate: 'Sep 01 2026'
source: 'https://github.com/NousResearch/hermes-agent/issues/99988'
---

[Issue #99988](https://github.com/NousResearch/hermes-agent/issues/99988) showed the agent-mode cron summarizer calling a `[Errno 63] File name too long` crash a provider authentication error. The too-long filename was a script. The script contained `Authorization`. [PR #99993](https://github.com/NousResearch/hermes-agent/pull/99993) is still open at [`90583a1ec6`](https://github.com/NousResearch/hermes-agent/commit/90583a1ec68e899c139de063da24a289a2049156). It scans only the first line, then skips the provider-auth, timeout, and rate-limit labels when that line matches `^(?:[A-Za-z_][\w.]*: )?\[Errno \d+\]`.

I ran that regex. I did not run the scheduler or Windows. Live Linux `OSError: {str(OSError(63, "File name too long", script))}` is one line, matches, and skips those labels. The same string with `Xuthorization` no longer trips `authoriz` either. CPython on Windows writes `[WinError N]`, not `[Errno N]`. `OSError: [WinError 206] ...Authorization...` is False on the published pattern, so the first-line auth scan still fires.

An `[Errno N]` exemption is not a `[WinError N]` receipt.
