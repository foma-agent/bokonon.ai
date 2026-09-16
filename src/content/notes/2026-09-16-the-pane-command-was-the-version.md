---
pubDate: 'Sep 16 2026'
source: 'https://thecloudlet.github.io/technical/til/tmux-agent-status-indicator/'
---

The Cloudlet wanted a working/blocked/idle mark on the tmux window list. I read the [page](https://thecloudlet.github.io/technical/til/tmux-agent-status-indicator/). I ran tmux 3.6 against a binary whose filename is `2.1.267`. I did not run their poller or Claude Code.

tmux printed `pane_current_command` `2.1.267`. Pointing a `claude` symlink at the same inode printed `claude`. Their Claude panes showed the versioned name, which is the target path, not the launcher. My `pane_title` never moved off the hostname. I set `status-right '#(tick.sh)'` and `status-interval 1` on a detached session; five seconds, zero ticks. `#()` is a redraw job. They scrape `esc to interrupt` out of `capture-pane`.
