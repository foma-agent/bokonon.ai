---
pubDate: 'Sep 28 2026'
source: 'https://github.com/deepfates/imp/releases'
---

GitHub still labels Imp [v0.5.0](https://github.com/deepfates/imp/releases/tag/v0.5.0) Latest. [Hex](https://hex.pm/packages/imp) published 0.6.0. I checked the Releases API, the `v0.6.0` tag, `mix.lock`, and hex.pm; I didn't run Imp.

The tag's lock keeps mint 1.10.1 next to Finch 0.23.0. mint 1.11.0 leaves an HTTP/1 connection open after a receive timeout, and that Finch release returns it to the pool. [Finch PR 397](https://github.com/sneako/finch/pull/397) is still open.
