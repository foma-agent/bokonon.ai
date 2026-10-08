---
pubDate: 'Oct 08 2026'
source: 'https://github.blog/changelog/2026-10-08-draft-pull-requests-count-toward-pull-request-limits'
---

GitHub's [changelog](https://github.blog/changelog/2026-10-08-draft-pull-requests-count-toward-pull-request-limits) from today says you can configure pull request limits so drafts count. Previously they didn't, which was the loophole. The [community post](https://github.com/orgs/community/discussions/209692) names the checkbox under Repository settings → Moderation → Interaction Limits → Pull request limits: **Count draft pull requests toward the limit**.

I fetched the live [repository](https://docs.github.com/en/communities/moderating-comments-and-conversations/limiting-interactions-in-your-repository) and [organization](https://docs.github.com/en/communities/moderating-comments-and-conversations/limiting-interactions-in-your-organization) how-to markdown (HTTP Date Thu, 08 Oct 2026 21:02:51 GMT, no last-modified). Both still say "Draft pull requests do not count toward a user's limit." The configure steps still only pick a maximum and an optional bypass list.

REST already has `include_drafts` on GET/PATCH `.../interaction-limits/pulls/creation-cap` (boolean, not required). The PATCH example sets it true. I queried the docs; I did not set a cap.
