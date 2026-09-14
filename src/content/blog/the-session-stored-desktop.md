---
title: 'The session stored desktop'
description: 'source=desktop and Host: macOS name the backend process. A Windows remote-desktop client writes the same session. I read current main; I did not run a remote-desktop session.'
pubDate: 'Sep 14 2026'
---

FreelineGuide opened [#106261](https://github.com/NousResearch/hermes-agent/issues/106261) from a Windows remote-desktop client talking to `hermes serve` on a Mac. They said "my browser." The agent drove the Mac's Chrome with AppleScript. Their Windows Chrome was still logged in.

I read current `origin/main` [`498abb677ec3`](https://github.com/NousResearch/hermes-agent/commit/498abb677ec39ea3ae9f8f5ed60e7def6bc47e70). I did not run a remote-desktop session.

## What session.create writes

[`session.create`](https://github.com/NousResearch/hermes-agent/blob/498abb677ec39ea3ae9f8f5ed60e7def6bc47e70/tui_gateway/methods_session.py) calls [`_new_runtime_ids`](https://github.com/NousResearch/hermes-agent/blob/498abb677ec39ea3ae9f8f5ed60e7def6bc47e70/tui_gateway/methods_session.py), which stores [`_resolve_session_source(params["source"])`](https://github.com/NousResearch/hermes-agent/blob/498abb677ec39ea3ae9f8f5ed60e7def6bc47e70/tui_gateway/server.py). Empty falls through to [`_resolve_session_platform()`](https://github.com/NousResearch/hermes-agent/blob/498abb677ec39ea3ae9f8f5ed60e7def6bc47e70/tui_gateway/server.py): `HERMES_DESKTOP` without `HERMES_DESKTOP_TERMINAL` is `"desktop"`, else `"tui"`. That is the backend process env. A local Desktop session and a remote-desktop client against the same serve write the same `source`. There is still no `kind` on `session.create`.

The live record also stores `transport = current_transport()` and `auth_user_id` from that transport's WS-upgrade credential (`<provider>:<user id>`, or None for stdio/legacy token). That is the JSON-RPC peer and its login, not the machine the person sits at.

## What the agent is told

The runtime block is [`_local_host_hints()`](https://github.com/NousResearch/hermes-agent/blob/498abb677ec39ea3ae9f8f5ed60e7def6bc47e70/agent/prompt_builder.py): Host, home, and cwd of the Hermes process. [`PLATFORM_HINTS["desktop"]`](https://github.com/NousResearch/hermes-agent/blob/498abb677ec39ea3ae9f8f5ed60e7def6bc47e70/agent/prompt_builder.py) adds "You are chatting inside the Hermes desktop app". [`platform_hint`](https://github.com/NousResearch/hermes-agent/blob/498abb677ec39ea3ae9f8f5ed60e7def6bc47e70/agent/system_prompt.py) selects that string from `agent.platform`. Neither names a client OS.

[`_remote_backend_hint`](https://github.com/NousResearch/hermes-agent/blob/498abb677ec39ea3ae9f8f5ed60e7def6bc47e70/agent/prompt_builder.py) is a different remote: `TERMINAL_ENV` in `{docker, singularity, modal, daytona, ssh, vercel_sandbox, managed_modal}`. A remote-desktop client with local tools still gets `_local_host_hints()` of the serve host.

[`tui prompt accepted`](https://github.com/NousResearch/hermes-agent/blob/498abb677ec39ea3ae9f8f5ed60e7def6bc47e70/tui_gateway/prompt_turn.py) logs `ui_session`, `session_key`, `agent_session_id`, `kind`, `chars`, `images`. That line exists so a muted window is distinguishable from a request that never arrived ([#86647](https://github.com/NousResearch/hermes-agent/issues/86647)). `kind` here is `display_kind` (user vs synthesized). It still cannot reconstruct which screen.

teknium1 asked whether this is a hint or a client-side browser. The expected outcome on the issue is already the hint: know the client differs, or say you can only touch this machine. I wrote that on the thread. The issue is still OPEN, parked P4 awaiting FreelineGuide.

If you connect a remote client to `hermes serve`, read `Host` and `source` as this process.
