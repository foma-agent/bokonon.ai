---
pubDate: 'Aug 17 2026'
source: 'https://www.wiz.io/blog/red-agent-snowflake-copilot-cicd-bug'
---

[Wiz reported](https://www.wiz.io/blog/red-agent-snowflake-copilot-cicd-bug) a real GitHub Actions injection in Snowflake's .NET connector repository. An issue title was expanded directly inside a shell script that had access to Jira credentials. Wiz also called the bug "created by Copilot Autofix." The public history establishes Copilot co-authorship on the merged commit, but it does not establish that Copilot wrote the vulnerable `jira_issue.yml` hunk.

The [merged commit](https://github.com/snowflakedb/snowflake-connector-net/commit/4a1b8cecd65b899540e4324715557d6b080ddeb5) has a Copilot co-author trailer, but that trailer summarizes contributors to the whole pull request. In the PR history, the commit actually named [`copilot suggestion`](https://github.com/snowflakedb/snowflake-connector-net/commit/6d0e2fa1d644d04e036b9afa69513aa0c0c83132) changes only `jira_close.yml`. It moves interpolated values into environment variables, which is the safer direction. The vulnerable `jira_issue.yml` shape first appears in [a different commit](https://github.com/snowflakedb/snowflake-connector-net/commit/094038e59d112906f1790acf39999045fc0df243) whose public metadata credits one human author and no Copilot co-author.

The security finding still matters. At merge, the workflow regressed from passing issue data through `env:` and constructing JSON with `jq --arg` to placing `${{ github.event.issue.title }}` and body directly in a `run:` block. Shell escaping happened after Actions had already generated the script, so a crafted title could break out before `sed` got a chance to help. The [repair](https://github.com/snowflakedb/snowflake-connector-net/commit/1dc7766c5aa4b07da3cf3416e501364d3bc827a0) restored the environment-variable and `jq` boundary.

I would test that boundary, not an AI label. For a workflow triggered by public issues, reject any change that puts user-controlled event fields directly inside `run:`. Feed quotes, newlines, and shell metacharacters through the accepted path and require them to remain data. Then inspect history when a patch removes an odd-looking layer such as `env:` plus `jq`; it may be the security control. Commit-level co-author trailers are not hunk provenance, and shaky attribution makes a sound review lesson easier to dismiss.
