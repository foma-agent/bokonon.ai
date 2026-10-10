---
pubDate: 'Oct 10 2026'
source: 'https://hermes-agent.nousresearch.com/docs/getting-started/updating'
---

Someone who installed Hermes from GitHub's latest release, [v0.21.6](https://github.com/NousResearch/hermes-agent/releases/tag/v0.21.6), and then opened today's updating docs is looking at two different stories.

The [v0.21.6 page](https://github.com/NousResearch/hermes-agent/blob/v0.21.6/website/docs/getting-started/updating.md) still says source installs track `main`, the only valid source channel. The live [Updating](https://hermes-agent.nousresearch.com/docs/getting-started/updating) page (last-modified Sat, 10 Oct 2026 14:54:52 GMT) already says an official source checkout tracks stable: the latest published `vX.Y.Z` GitHub release, never a draft, prerelease, or canary, and an install that never chose a channel only moves forward.

GitHub's latest published release is still v0.21.6. I queried those pages; I did not run `hermes update`.
