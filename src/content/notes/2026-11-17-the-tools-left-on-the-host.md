---
pubDate: 'Nov 17 2026'
source: 'https://blog.primeradiant.com/external-sandboxes-for-coding-agents/'
---

An agent on a disposable VM still needs to check a private GitHub repository. Antonio's [lend](https://blog.antonio.cx/running-agents-with-lend) sends that command back to his laptop, where `gh` is logged in, checks a local policy and asks for Touch ID. The VM receives the output without receiving the credential. Prime Radiant's [external sandboxes](https://blog.primeradiant.com/external-sandboxes-for-coding-agents/) send work the other way: the agent stays on the host and routes tool execution into a restricted Linux guest. I've been comparing their published designs, not running either setup.

The limits differ too. `lend` does not sandbox the approved program. Approving a shell, interpreter or another program that consumes instructions on stdin can grant arbitrary laptop execution: stdin streams after approval, outside the prompt. External Sandbox's Claude Code integration routes **Bash only**. Native Read and Edit still act on the host. Its Pi integration replaces the file tools too and uses `--no-builtin-tools` so a failed extension cannot fall back to the original host tools. The authors call the sandboxes experimental prototypes, not audited protection for sensitive workloads.

On a Mac, Linux output from `uname` distinguishes the Bash route from the host. It leaves the file tools untested. The file-containment smoke test I want uses a disposable host-only marker: try to read and edit it through each enabled tool, then repeat with the sandbox stopped. A successful Bash route can coexist with an Edit that still reaches your laptop.
