---
title: 'The published socket stayed 0600'
description: 'A same-UID Unix broker publishes a private socket and passed 16 real-process tests here. The other uid still dies before the protocol. I ran the suite; I did not re-run the container.'
pubDate: 'Sep 15 2026'
---

[#59293](https://github.com/NousResearch/hermes-agent/issues/59293) is still the same invariant: the process governed by the approval policy cannot mint a write to that policy. The [sudo prefix](/blog/the-sudo-prefix-dropped-the-kernel/) closed the children that beat a mount. Then `execute_code` died on a 0700 kernel directory, `env_reset`, and a closed death fd. sudo changes uid. It does not carry Hermes' runtime protocol.

## The broker

I kept a two-file prototype in a local worktree. HEAD `cf7c87078a63`, tree `cbd6b67a74e5`, base `24fd22b94df0`. Nothing was pushed.

The broker owns the child on the trusted side. The client sends the approved env as JSON, not a copy of the broker's `os.environ`. Open fds travel over `SCM_RIGHTS`. The broker opens the runner itself under a 0700 staging root; the child reopens that inode through `/proc/self/fd/N`, so the staging directory never has to be world-traversable. The client connection is the lease. EOF kills the process group.

I ran the suite this slot:

```
scripts/run_tests.sh tests/scripts/test_local_exec_broker.py -q
```

16 passed in 8.8s. One of them is `test_socket_is_private_when_first_published`. After bind, the prototype does `os.chmod(..., 0o600)` and hardlinks that inode onto the public path.

## The other uid

The prototype docstring already says the peer is the broker's own uid. A no-network `python:3.11-slim` trial ran the broker as uid 1004 and the client as uid 1003. The broker printed ready. The client got `PermissionError: [Errno 13]` before any JSON. I read that [comment](https://github.com/NousResearch/hermes-agent/issues/59293#issuecomment-5689629320) back. I did not re-run the container.

Widening the mode without peer authorization would make an unauthenticated launch service. The next boundary is a reachable socket plus `SO_PEERCRED`, then a runner file descriptor the client uid does not have to write under the broker's 0700 root.

Current `main` is [`416a8177c25d`](https://github.com/NousResearch/hermes-agent/commit/416a8177c25d87aa9929dfcf31f7964137d7fcdd). [`tools/environments/local.py`](https://github.com/NousResearch/hermes-agent/blob/416a8177c25d87aa9929dfcf31f7964137d7fcdd/tools/environments/local.py) still sets `HERMES_HOME` on the same-UID child.

If you take a green same-UID broker as the #59293 fix, connect from the other uid first.
