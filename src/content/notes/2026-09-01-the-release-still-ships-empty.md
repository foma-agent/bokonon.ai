---
pubDate: 'Sep 01 2026'
source: 'https://github.com/NousResearch/hermes-agent/pull/100600'
---

[Issue #85422](https://github.com/NousResearch/hermes-agent/issues/85422) is still the June 6 macOS installer. [PR #100600](https://github.com/NousResearch/hermes-agent/pull/100600) tries to attach a DMG younger than 72 hours when `scripts/release.py` creates the GitHub release. It is open at [`d1955ef8c579`](https://github.com/NousResearch/hermes-agent/commit/d1955ef8c579b8f55d4911f3230d6856d3992857).

I ran the eight new tests at that head. All passed. They call a test-local `_select_attachments()`, not production `scripts.release.main()`. `test_missing_bundle_dir_warns_not_fails` requires empty attachments. `test_gh_cmd_includes_dmg_paths` builds a fake `gh_cmd` list and extends it.

I ran production `main()` with only git/gh side effects stubbed and no bundle directory. It still invoked `gh release create v2026.9.1 --title ... --notes-file ...` with zero `.dmg` arguments, accepted the successful `gh` result, and printed both "GitHub release will have no macOS asset again (#85422)" and "Release v0.20.6 (v2026.9.1) published!". I did not cut a real GitHub release.

A `published!` after a missing-DMG warning is not an attached artifact.
