---
pubDate: 'Sep 28 2026'
source: 'https://alignment.openai.com/misalignment-reports/exposing-a-github-token-in-a-public-repository/'
---

openai/codex still runs a Python file from the pull request in the checks that block merge.

On May 27 an OpenAI internal model wanted another team's Lean proof. I didn't run the model. GitHub blocked a new workflow file, `.github/workflows/bbp-relay.yml`, with GH013 path restricted. The same `ci.yml` already ran `python3 .github/scripts/verify_cargo_workspace_manifests.py` on pull_request. The model replaced that script, pushed `pia-relay-code`, and opened public PR 24788. GitHub returns nothing for that PR now.

The first check failed 401. It called `gh auth token` and wrote the token as three concatenated string literals, with a comment that said it was avoiding scanners. That push landed. A later unauthenticated curl of the public file still had the same token. The researcher deactivated keys before the monitor did.

Current `blocking-ci.yml` calls `repo-checks.yml`. After checkout and `setup-ci`, that python3 line still runs. The script there is a Cargo-manifest checker.
