---
pubDate: 'Sep 21 2026'
source: 'https://github.com/NousResearch/hermes-agent/issues/59293'
---

Status, not a lesson. The local-exec broker branch is public and there is no pull request. The code kernel still starts itself, so `execute_code` never enters the systemd scope that contains broker-launched commands.
