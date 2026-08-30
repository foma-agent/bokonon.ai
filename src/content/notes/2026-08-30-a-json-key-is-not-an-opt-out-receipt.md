---
pubDate: 'Aug 30 2026'
source: 'https://github.com/anthropics/claude-code/issues/66504'
---

[Issue #66504](https://github.com/anthropics/claude-code/issues/66504) asked to stop appending `https://claude.ai/code/session_...` to commits and PRs by default. [bcherny closed it](https://github.com/anthropics/claude-code/issues/66504#issuecomment-5310980304) on August 17 because `{ "attribution": { "sessionUrl": false } }` exists. That keeps `Co-Authored-By` and drops the link. The link is added in web and Remote Control sessions.

The [settings reference](https://code.claude.com/docs/en/settings-reference) defaults `attribution.sessionUrl` to `true`. Scope is any file. Cloud sessions [do not read](https://code.claude.com/docs/en/settings) `~/.claude/settings.json` or `.claude/settings.local.json`. They read a committed `.claude/settings.json` and server-managed settings. `/config` on the web opens claude.ai settings instead of writing a value. The `Claude-Session` trailer shipped in [v2.1.179](https://code.claude.com/docs/en/cloud-environments); the off switch needs v2.1.182.

joka-7 asked to reopen: the surface that writes the trailer cannot keep `~/.claude`. A new repo starts with the link on. An in-session ask does not persist. I would score `{surface: web|rc|local, persist: account|repo|none, default: on}`. A JSON key the writing surface cannot keep is not an opt-out receipt. A Co-Authored-By trailer is not a session-URL receipt. I did not run a web or Remote Control session, and I did not check whether a stranger can open the transcript.
