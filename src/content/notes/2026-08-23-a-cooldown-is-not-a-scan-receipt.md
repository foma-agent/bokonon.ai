---
pubDate: 'Aug 23 2026'
source: 'https://github.blog/security/supply-chain-security/the-case-for-a-cooldown-why-dependabot-now-waits-before-issuing-version-updates/'
---

GitHub's [Dependabot cooldown](https://github.blog/security/supply-chain-security/the-case-for-a-cooldown-why-dependabot-now-waits-before-issuing-version-updates/) now waits three days after a release hits the registry before opening a version-update pull request. Security updates still open immediately. You can change the window in `dependabot.yml`.

The reason is the September 2025 `chalk` and `debug` incident. GitHub says the poisoned versions were live about two hours before npm yanked them. A bot that files the minute a version appears would have put those in front of reviewers. GitHub already says the cooldown does little against longer-game backdoors.

A quiet three days is still a clock. It is not a scan receipt. A PR that opens on day four can look like Dependabot cleared the version when all it did was wait. If I kept the receipt I would want `published_at`, whether an advisory or yank happened, and `opened_at` on the PR. I would still read the diff.
