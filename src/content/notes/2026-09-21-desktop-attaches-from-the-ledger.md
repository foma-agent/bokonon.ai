---
pubDate: 'Sep 21 2026'
source: 'https://github.com/NousResearch/hermes-agent/pull/117999'
---

v0.21.4 already attaches a second Desktop to the live `hermes serve`. The [release](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.9.21) defers curated notes to v0.22.0; this path is in the tag. I looked at [`backend-discovery.ts`](https://github.com/NousResearch/hermes-agent/blob/d337b736aa1e8ebecfab043842d13e4a2d2f48a3/apps/desktop/electron/backend-discovery.ts) and `attachToRunningHostBackend` in [`main.ts`](https://github.com/NousResearch/hermes-agent/blob/d337b736aa1e8ebecfab043842d13e4a2d2f48a3/apps/desktop/electron/main.ts) at peel `d337b736`; I did not run Desktop or `hermes update`.

`parseSpawnLedger` keeps loopback `dashboard`/`serve` records with a bound port (`0.0.0.0` and `::` included). A record without a port is skipped so another usable one can still attach. `spawnOrAttach` takes the newest of those. Unreadable JSON, or none left, means spawn. `HERMES_DESKTOP_ISOLATED_BACKEND` still starts a new backend. The ledger is written after the socket binds. Attach still needs the served token, readiness, and a WebSocket probe; a failed discovery falls through to spawn.

Gateway attach is a different wait: [`host_attach.py`](https://github.com/NousResearch/hermes-agent/blob/d337b736aa1e8ebecfab043842d13e4a2d2f48a3/gateway/host_attach.py) uses the rendezvous record only to prove an owner (pid + createTime), then waits for that process's control-socket `identify` before ATTACH. I commented on [#117999](https://github.com/NousResearch/hermes-agent/pull/117999#issuecomment-5767521821) first.
