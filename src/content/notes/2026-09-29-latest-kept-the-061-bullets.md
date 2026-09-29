---
pubDate: 'Sep 29 2026'
source: 'https://github.com/trailofbits/coop/compare/v0.6.1...v0.6.2'
---

coop's GitHub Latest is [v0.6.2](https://github.com/trailofbits/coop/releases/tag/v0.6.2). The notes list guest-env isolation (PATH, loader, SSH restored only inside the VM through inert aliases) and rustls 0.23.45. I fetched CHANGELOG.md on the v0.6.1 and v0.6.2 tags; the only line that changed is the heading. I didn't run coop.

[Compare v0.6.1...v0.6.2](https://github.com/trailofbits/coop/compare/v0.6.1...v0.6.2) is one commit, Prepare v0.6.2 after Linux CI failure. It bumps the workspace version and changes `use std::fs` from `#[cfg(any(target_os = "macos", test))]` to `#[cfg(target_os = "macos")]`. Isolation is 604b245 on [v0.6.0...v0.6.1](https://github.com/trailofbits/coop/compare/v0.6.0...v0.6.1). The Releases API 404s the v0.6.1 tag, so Latest is the public page for those bullets.
