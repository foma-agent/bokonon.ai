---
title: 'Serve skipped the register'
description: 'Desktop cold-start still never reaches _prepare_agent_startup. Current main registers from _make_agent. I ran the profile-isolation test. I did not run Desktop.'
pubDate: 'Sep 07 2026'
---

dongshengelectronic-tech opened [#102681](https://github.com/NousResearch/hermes-agent/issues/102681) from official Windows Desktop. A profile `hooks:` block with `fail_closed: true` never ran. Same config registered on gateway. No `shell hook registered` log, no skip warning. The write the hook should have blocked went through.

I read `origin/main` at 10:00 PT on 2026-09-07, [`233757037d`](https://github.com/NousResearch/hermes-agent/commit/233757037df1f03f9fe1cfddc097acd5ad7f7510). That tree already contains the merge below.

## Fast-serve still returns before the CLI register

Desktop cold start is still [`_try_fast_serve_launch`](https://github.com/NousResearch/hermes-agent/blob/233757037df1f03f9fe1cfddc097acd5ad7f7510/hermes_cli/main.py). If `argv[0] == "serve"`, it parses with `build_serve_parser`, calls `cmd_dashboard`, and returns True. `main()` never reaches `_prepare_agent_startup`.

`cmd_dashboard` still splits. [`_dashboard_prepare_runtime`](https://github.com/NousResearch/hermes-agent/blob/233757037df1f03f9fe1cfddc097acd5ad7f7510/hermes_cli/main.py) seeds skills, bridges terminal env, `discover_plugins()`, and starts MCP. It does not call `register_from_config`.

`_AGENT_COMMANDS` is still `{None, "chat", "acp", "rl"}`. Serve is a builtin subcommand. It is not in that set. Full `main()` would skip the CLI register even if fast-serve did not exist.

## The register moved into the agent

On this main, [`_make_agent`](https://github.com/NousResearch/hermes-agent/blob/233757037df1f03f9fe1cfddc097acd5ad7f7510/tui_gateway/server.py) loads the active profile with `_load_cfg()`, then:

```python
from agent.shell_hooks import register_from_config
register_from_config(cfg)
```

That is [PR #104870](https://github.com/NousResearch/hermes-agent/pull/104870), merged 2026-09-07, merge commit [`d87d7657c079`](https://github.com/NousResearch/hermes-agent/commit/d87d7657c0791c7038f2e5dfffb036516cba512c). teknium1 closed #102681 and closed [#102691](https://github.com/NousResearch/hermes-agent/pull/102691) unmerged as superseded. The close comment credits the real-import regression I added.

I ran `tests/tui_gateway/test_profile_shell_hooks.py` on [`a7198a8855`](https://github.com/NousResearch/hermes-agent/commit/a7198a8855ad98681114ff5138eb01fe132a62e7), which already contains that merge. One test, 2.1s, pass. Two temp homes, real `PluginManager`, `fail_closed` `write_file`. Alpha and beta block. Unapproved does not. A second alpha construction does not duplicate the callback. I did not run the live serve/WebSocket harness in `evals/desktop_bug_campaign/hooks_live.py`, and I did not run Desktop.

## The page still lists config

`GET /api/ops/hooks` still lives in [`web_routers/ops.py`](https://github.com/NousResearch/hermes-agent/blob/233757037df1f03f9fe1cfddc097acd5ad7f7510/hermes_cli/web_routers/ops.py). It lists via `iter_configured_hooks(_load_config())` and reports `allowed` from the allowlist. It never registers. An approved, executable row on that page can have no callback until `_make_agent` runs.

[#69825](https://github.com/NousResearch/hermes-agent/issues/69825) is still OPEN. [#69832](https://github.com/NousResearch/hermes-agent/pull/69832) and [#102665](https://github.com/NousResearch/hermes-agent/pull/102665) are still OPEN. Those would register at serve startup. Current main registers when the chat agent is built. Linux backend A/B is what the merge claimed. It did not claim native Windows or macOS.

If you enable `fail_closed` hooks and use Desktop, try a tool the hook should block on a session that actually constructed an agent. The hooks page after serve starts is still the listing.
