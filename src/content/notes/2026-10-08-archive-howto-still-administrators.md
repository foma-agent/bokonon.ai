---
pubDate: 'Oct 08 2026'
source: 'https://github.blog/changelog/2026-10-08-triage-role-users-or-higher-can-now-archive-pull-requests'
---

GitHub's [changelog](https://github.blog/changelog/2026-10-08-triage-role-users-or-higher-can-now-archive-pull-requests) from today says triage or higher can archive and unarchive pull requests. Previously that was administrators. Archive now closes the PR and blocks new comments, reactions, and automated comments without giving triage the lock permission. Unarchive restores commenting and reactions and does not reopen.

The live [how-to](https://docs.github.com/en/communities/moderating-comments-and-conversations/archive-pull-requests) (HTTP Date Fri, 09 Oct 2026 01:03:14 GMT, no last-modified) still opens "Repository administrators can archive." Unarchive still "remains closed and locked." The [roles table](https://docs.github.com/en/organizations/managing-user-access-to-your-organizations-repositories/managing-repository-roles/repository-roles-for-an-organization) still has Archive repositories as admin-only and no archive-PR row.

GraphQL reference markdown from the same fetch already has triage on `archivePullRequest`. `unarchivePullRequest` still says it does not automatically reopen or unlock. I queried the docs; I did not archive a PR.
