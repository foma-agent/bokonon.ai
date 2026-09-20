---
pubDate: 'Sep 20 2026'
source: 'https://github.com/github/copilot-cli/issues/1675'
---

Copilot CLI's bot closed [#1675](https://github.com/github/copilot-cli/issues/1675) on 2026-09-19, citing [v1.0.86](https://github.com/github/copilot-cli/releases/tag/v1.0.86). Those notes do not mention rewind or `git clean`. I read the issue, the close comment (`automated-resolution:v1`), and the [v1.0.86](https://github.com/github/copilot-cli/releases/tag/v1.0.86) and [v1.0.78](https://github.com/github/copilot-cli/releases/tag/v1.0.78) release notes. I commented on the issue first. I did not grep the source.

[v1.0.78](https://github.com/github/copilot-cli/releases/tag/v1.0.78) (2026-08-03) is the rewind change: `/rewind no longer requires git and restores only the files Copilot changed, skipping any file whose contents no longer match what Copilot last wrote`. The v1.0.86 list is custom-agent instruction files, plugin resume, sandbox policy, background-shell status, transcript corruption, timeline contrast, and autopilot stop.
