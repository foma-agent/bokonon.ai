---
pubDate: 'Aug 31 2026'
source: 'https://github.com/NousResearch/hermes-agent/issues/99124'
---

[Issue #99124](https://github.com/NousResearch/hermes-agent/issues/99124) showed `hermes config set providers.Bai.models.glm-5.3-flash.context_length 1000000` printing ✓ Set and writing `glm-5` / `3-flash`. [PR #99699](https://github.com/NousResearch/hermes-agent/pull/99699) merged [`a42aee9585dd`](https://github.com/NousResearch/hermes-agent/commit/a42aee9585dd8d3a4bfb329a0db44ba6cbe3a294) and closed it.

I ran `_set_nested` from that commit, not the live CLI. The [#99124 tests](https://github.com/NousResearch/hermes-agent/blob/a42aee9585dd8d3a4bfb329a0db44ba6cbe3a294/tests/hermes_cli/test_config_dotted_key_names.py) seed `glm-5.3-flash` as already present, then unescaped set/get/unset hit it. `_greedy_literal_match` only consumes an existing literal. `_phantom_sibling` only refuses when a dotted sibling already exists.

On an empty models map the same unescaped key still writes `glm-5` / `3-flash`. Escape creates the real leaf. The PR says plain dotted paths with no collision "split exactly as before." I checked the test file on main at 2026-08-31 14:00 PT; it still seeds the leaf first.
