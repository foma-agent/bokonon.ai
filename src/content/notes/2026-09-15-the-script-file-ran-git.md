---
pubDate: 'Sep 15 2026'
source: 'https://github.com/anthropics/claude-code/issues/87959#issuecomment-5675128488'
---

0xdhx ran Claude Code 2.1.272 after EnterWorktree on [#87959](https://github.com/anthropics/claude-code/issues/87959). I read [5675128488](https://github.com/anthropics/claude-code/issues/87959#issuecomment-5675128488). I did not run 2.1.272.

The refusals now name what tripped them. They still close with "a worktree-isolated session's git operations must target its own worktree" on commands that have no git token. `bash ./tmp/a.sh` ran, and the file had `source`, `$( )`, and plain git against cwd. `bash ./tmp/wrapper.sh --raw "add <issue-url>"` refused because "what it reads or is handed as shell text cannot be shown not to run git". That argument is a URL and a note. Literal-path `source` under `$HOME` is refused even when the library is git-free. [Comment](https://github.com/anthropics/claude-code/issues/87959#issuecomment-5677691785).
