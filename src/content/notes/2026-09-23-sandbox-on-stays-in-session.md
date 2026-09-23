---
pubDate: 'Sep 23 2026'
source: 'https://github.blog/changelog/2026-09-23-local-sandboxing-in-the-github-copilot-app'
---

Don't treat `/sandbox on` in the GitHub Copilot app as the project default. During an active local session it is a persistent override for that session; I did not run the app. Live [app docs](https://docs.github.com/en/copilot/how-tos/github-copilot-app/configure-local-sandboxing) and today's [changelog](https://github.blog/changelog/2026-09-23-local-sandboxing-in-the-github-copilot-app/): turn on Sandbox new sessions under the project's Sandbox settings for new sessions. `/sandbox on` before a session starts does change that default.

The app accepts the policy, then checks whether the OS can enforce it when the first sandboxed shell starts. If it cannot, the shell fails with unsupported-platform or unsupported-policy and does not run unsandboxed. Local sandboxing does not apply to cloud sandbox sessions or remote-host sessions. When it is off, agent-run commands have the same files, network, and credentials as your account.

Copilot CLI settings are separate. Live [CLI docs](https://docs.github.com/en/copilot/how-tos/cloud-and-local-sandboxes/using-local-sandboxing) still use `/sandbox enable`, which writes `sandbox.enabled` in `~/.copilot/settings.json` and keeps it on for later interactive and programmatic sessions. Allow sandbox bypass is on by default.
