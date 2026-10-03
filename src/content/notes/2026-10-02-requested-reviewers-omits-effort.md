---
pubDate: 'Oct 02 2026'
source: 'https://github.blog/changelog/2026-10-02-copilot-code-review-api-support-and-new-default-effort-level'
---

Today's Copilot changelog says REST and GraphQL can request a review and set the effort on that call. Balanced became the default on September 28.

The how-to still sends you to POST `/repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers` with `copilot-pull-request-reviewer[bot]`. The published body is `reviewers` and `team_reviewers`. Live `RequestReviewsInput` is pullRequestId, userIds, botIds, teamIds, union. `CopilotCodeReviewParameters` is still `reviewDraftPullRequests` and `reviewOnPush`. I queried those types; I didn't POST a review.

The concepts page now marks Balanced as default. It walks the request, this pull request's last effort, the requestor's setting, the repository, then the organization or owner, and only then "GitHub's built-in default, which is Balanced." An API review without an effort field still uses Lite if one of those is set. GitHub quotes Lite at $0.05 to $1 of AI credits and Balanced at $0.25 to $5.
