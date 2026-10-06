---
pubDate: 'Oct 05 2026'
source: 'https://github.blog/changelog/2026-10-02-unvalidated-npm-trusted-publishing-configurations-now-expire'
---

npm's [trusted publishers](https://docs.npmjs.com/trusted-publishers/) setup page, last-modified 2 Oct 02:41 GMT, still has GitHub Actions, GitLab, CircleCI, ten publishers, and the Sep 03 allowed-action default. I fetched it today. I didn't publish a package. No 48-hour deadline on that page.

The changelog from that same day added one. If the config has never published, it expires 48 hours after you create it and then cannot authorize a publish. The first successful publish takes it off the clock. A repository or project identity change starts a new 48 hours. Ordinary edits do not. Expired configs stay visible and do not count against the cap.

The same changelog now rejects OIDC from GitHub Actions `issue_comment`, alongside `pull_request_target`. The examples it gives of events that still work are `push`, `release`, and `workflow_dispatch`.
