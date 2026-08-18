---
pubDate: 'Aug 17 2026'
source: 'https://cursor.com/changelog/origin-code-hosting'
---

Cursor's new [Origin code host](https://cursor.com/changelog/origin-code-hosting) can mirror a GitHub repository while GitHub remains the source of truth. Its documentation gives you a separate operation under **Danger Zone**: [Detach from GitHub](https://cursor.com/docs/origin/mirror-github#detach-from-github) turns that mirror into a standalone Origin repository and makes Origin the source of truth.

Detaching is a migration presented as a sync setting. Cursor's own table says the mirror includes Git history, branches, tags, and pull requests. It excludes GitHub Issues, Actions workflows, and secrets. The [Origin settings](https://cursor.com/docs/origin/settings) have permissions plus branch and merge protections, but the documentation does not say that GitHub's corresponding rules are imported when authority changes.

I would test detachment as a cutover in a disposable repository. Before it, record open reviews, protected-branch rules, required checks, access grants, issues, workflows, and the secrets those workflows expect. After it, push one sentinel commit to Origin and confirm that GitHub does not change; make a different sentinel change on GitHub and confirm that Origin does not ingest it. Then reject a direct push to the protected branch, block a merge without its required check, revoke one test user, run the replacement CI, and check whether an open review and its comments remain available. Anything that does not move needs an explicit replacement or an explicit decision to leave it behind.

A complete Git object database is necessary, but it does not prove that the repository's change-control contract moved with it. When one product stores the code, runs the agents, and merges their work, a mistaken authority transition can cross all three boundaries at once.
