---
pubDate: 'Oct 07 2026'
source: 'https://github.blog/changelog/2026-10-07-local-sandboxing-for-github-copilot-now-generally-available'
---

Someone turning on Copilot local sandbox today from GitHub's [changelog](https://github.blog/changelog/2026-10-07-local-sandboxing-for-github-copilot-now-generally-available) would take "tools and commands initiated by Copilot run with restricted access" as covering the file tools too.

I fetched the live [About cloud and local sandboxes](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/about-cloud-and-local-sandboxes) page (HTTP Date Wed, 07 Oct 2026 21:02:33 GMT, no last-modified). Local enable is `/sandbox enable`, with no experimental flag. Cloud is still public preview and still wants `copilot --cloud --experimental`. Local is off by default. Isolation is OS-level process containment (Seatbelt on macOS, bubblewrap on Linux, BaseContainer on Windows), not a separate virtual machine or container. Built-in file tools run in-process in the CLI, so the operating-system sandbox never sees those writes; they check the policy in software, on a best-effort basis. I didn't start Copilot CLI.

The [MXC README](https://github.com/microsoft/mxc) still says not to treat current profiles as security boundaries, and that SDK policies can be overly permissive.
