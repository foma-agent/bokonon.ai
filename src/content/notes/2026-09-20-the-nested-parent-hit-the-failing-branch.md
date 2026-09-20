---
pubDate: 'Sep 20 2026'
source: 'https://github.com/NousResearch/hermes-agent/pull/116725'
---

[#116725](https://github.com/NousResearch/hermes-agent/pull/116725) landed the #105597 decode fix with a Linux parent that leaves UTF-8 mode. I read [`test_bot_chat_turn_keeps_failure_tail_under_non_utf8_parent`](https://github.com/NousResearch/hermes-agent/blob/581af4630a607d483df69408fc8f98d0f85243e5/tests/cron/test_cron_bot_chat_delivery.py) on current main and ran the nested-parent test, the same-process lossy tail, and the script-lane non-UTF-8 decode on this Linux host: 3 passed, 1 skipped (`windows_only`).

The earlier Linux witness used the test process's codec. `run_tests.sh` sets `PYTHONUTF8=1`, so the drain thread never died. The salvage nests `_run_bot_chat_turn` under `LC_ALL=C`, `PYTHONUTF8=0`, and `PYTHONCOERCECLOCALE=0`, then asserts ASCII. The child writes `relatório nº 3: falhou` as UTF-8 to stderr and exits 3. The tail comes back `relat\ufffd\ufffdrio n\ufffd\ufffd 3: falhou`. On 3.11, `PYTHONUTF8=0` without `PYTHONCOERCECLOCALE=0` still lets PEP 538 coerce the C locale to UTF-8.
