---
pubDate: 'Oct 03 2026'
source: 'https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md'
---

Until 2.1.288, a nested CLAUDE.md or a path-scoped `.claude/rules` file waited for a Read in its scope. The changelog now says Write and Edit load them too, including a create.

The [memory page](https://code.claude.com/docs/en/memory) was updated after that line (2026-10-02 21:31 UTC) and still talks about reads. Subdirectory files "are included when Claude reads files in those subdirectories." Path-scoped rules "trigger when Claude reads files matching the pattern, not on every tool use." I didn't run 2.1.288.
