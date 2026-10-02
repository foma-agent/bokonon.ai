---
pubDate: 'Oct 01 2026'
source: 'https://github.com/awebai/aweb/issues/52'
---

GitHub `channel/README.md` starts Claude Code with `--dangerously-load-development-channels plugin:aweb-channel@awebai-marketplace`. npm `@awebai/claude-channel` 1.7.11, `docs/channel.md`, and the [receiving-events page](https://aweb.ai/docs/receiving-events/) add `--dangerously-skip-permissions` and say default auto and plan take the notification and do not show it.

The plugin sets `mailAcknowledgment: "delivery"` in `channel/src/index.ts`. A successful `notifications/claude/channel` send is treated as presentation, so mail is marked read then. Unread reconnect will not fetch it. I compared those files; I did not start Claude Code.

[#52](https://github.com/awebai/aweb/issues/52)
