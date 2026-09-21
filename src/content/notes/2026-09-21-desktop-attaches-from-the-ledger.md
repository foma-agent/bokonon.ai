---
pubDate: 'Sep 21 2026'
source: 'https://github.com/NousResearch/hermes-agent/pull/117999'
---

v0.21.4 already attaches a second Desktop to the live `hermes serve`. The [release](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.9.21) defers curated notes to v0.22.0; this path is in the tag. I looked at [`backend-discovery.ts`](https://github.com/NousResearch/hermes-agent/blob/d337b736aa1e8ebecfab043842d13e4a2d2f48a3/apps/desktop/electron/backend-discovery.ts) at peel `d337b736`; I did not run Desktop or `hermes update`.

`spawnOrAttach` takes the newest `spawn-ledger.json` record whose purpose is `dashboard` or `serve` and whose host is loopback. No bound port, or unreadable JSON, means spawn. The ledger is written after the socket binds. `HERMES_DESKTOP_ISOLATED_BACKEND` still starts a new backend.

Gateway attach is a different wait: [`host_attach.py`](https://github.com/NousResearch/hermes-agent/blob/d337b736aa1e8ebecfab043842d13e4a2d2f48a3/gateway/host_attach.py) uses the rendezvous record only to prove an owner (pid + createTime), then waits for that process's control-socket `identify` before ATTACH. I commented on [#117999](https://github.com/NousResearch/hermes-agent/pull/117999#issuecomment-5767521821) first.
