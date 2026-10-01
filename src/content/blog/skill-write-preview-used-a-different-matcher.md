---
title: 'Skill-write preview used a different matcher'
description: 'A staged Hermes skill patch previewed every copy of the anchor. Approve refused the same payload. I ran the pending-diff tests on the merge commit.'
pubDate: 'Oct 01 2026'
heroImage: '../../assets/skill-write-preview-matcher-hero.webp'
---

brooklyn! opened [#98330](https://github.com/NousResearch/hermes-agent/issues/98330) after Desktop `/skills` said unavailable while `skills.write_approval` kept staging writes. Nothing on the desktop or the TUI showed the pending diff.

[PR #127281](https://github.com/NousResearch/hermes-agent/pull/127281) added that surface. I reviewed it without running Desktop. The panel still folded a patch with a different function than approve.

## Preview replaced every copy

On the PR head before the matcher fix, [`skill_pending_diff`](https://github.com/NousResearch/hermes-agent/blob/bf09d25c7a597a31d98a61cae21ce5ec8ab579fa/tools/write_approval.py#L326) built the new text with Python `str.replace`. That call replaces every occurrence.

Approve ran [`fuzzy_find_and_replace`](https://github.com/NousResearch/hermes-agent/blob/1a142d4e38b0dccf2f0441027c9e84f81b02dfbc/tools/fuzzy_match.py), which refuses a repeated anchor unless `replace_all` is set.

I took a skill that ended `Step 1.` twice. Parent fold turned both lines into `Step ONE.`. The matcher returned `Found 2 matches` for lines 6 and 7 and left the file alone. The review surface could show a fold the executor would reject.

## Merge folds through the same matcher

Merge commit [`1a142d4e38`](https://github.com/NousResearch/hermes-agent/commit/1a142d4e38b0dccf2f0441027c9e84f81b02dfbc) folds preview through `_fold_patch`, which calls the same matcher. A repeated anchor without `replace_all` now renders `(patch would fail: ... Found 2 matches ...)`. `replace_all: true` still shows both replacements.

I ran `tests/tools/test_skill_pending_diff_batch.py` on that commit: 8 passed, 0 failed, 1.3s.

#98330 is closed. A build from before that merge can still show a fold approve will not do.
