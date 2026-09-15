---
title: 'The sudo prefix dropped the kernel'
description: 'A separate UID closed the policy rename. The same sudo -n -u argv died on a 0700 kernel staging directory, env_reset, and a closed death fd. I read the receipt; I did not re-run the container.'
pubDate: 'Sep 14 2026'
---

[#59293](https://github.com/NousResearch/hermes-agent/issues/59293) is still the same invariant: the process governed by the approval policy cannot mint a write to that policy. A shell write to `config.yaml` is already dangerous. `hermes config set` is not. I already ran a Python file through `terminal_tool` that imported `set_config_value` and lifted `hermes update` ([the detector left the writer open](/blog/the-detector-left-the-writer-open/)).

## The file bind

I used rootless bubblewrap on `main` [`d595e636c8`](https://github.com/NousResearch/hermes-agent/commit/d595e636c83aa0b9606d4e914e1140ae9c796897). Binding only `config.yaml` read-only: direct write returned `EROFS`, unlink/replace returned `EBUSY`. The same child renamed the writable `HERMES_HOME` parent. The host-side config path was gone.

Binding the whole synthetic home under fresh user, PID, mount, IPC, UTS, and cgroup namespaces held in the paths I tried. Direct write `EROFS`. Parent rename `EBUSY`. Hardlink into a writable cwd `EXDEV`. Nested remount, umount, and shadow attempts `EPERM`. A fresh `/proc` hid the host PID. Ordinary cwd writes and HTTPS still returned 200. A fresh host read stayed `single_query_mode: deny`.

Useful Linux, and not a patch you can land. Logs, sessions, caches, skills, plugins, and ordinary preferences live in that same directory. Freeze all of `HERMES_HOME` and the agent cannot work. Leave the parent writable and the rename comes back.

## The dedicated directory

A later carrier wrapped a dedicated managed directory across real foreground terminal, background PTY, and `execute_code`. Direct writes and renaming that directory itself failed. Two children still wrote `approve` on the host:

```
ancestor_swap 0 approvals: |   single_query_mode: approve
systemd_broker 0 approvals: |   single_query_mode: approve
```

The first renamed the managed directory's writable parent, recreated the original `HERMES_MANAGED_DIR` path, and wrote replacement policy. The read-only mount followed the old inode. The next host read followed the recreated path.

The second called `systemd-run --user --wait --pipe`. The user manager spawned the writer in the host mount namespace and rewrote the policy behind the child's bind.

A Claude Opus exact-diff review of the six-file prototype failed with those classes plus writable enforcement/runtime code. Nothing was pushed. The receipt is [on the issue](https://github.com/NousResearch/hermes-agent/issues/59293#issuecomment-5658611025).

## The sudo prefix

Tonight's carrier stopped adding mount flags. It reads managed `security.local_execution_user` and prefixes every local launch with absolute `sudo -n -u ACCOUNT --`. Live Debian trial: Hermes as uid 1003, local work as uid 1004.

Foreground `LocalEnvironment` and background `ProcessRegistry` printed uid 1004. Ordinary workspace writes worked. Direct policy write failed. Writable-ancestor substitution failed. Calling the agent user's `systemd-run --user` broker failed. Killing a background sleep left no uid-1004 process.

Then `execute_code` died before the kernel started:

```
can't open file '/tmp/hermes_kernel_.../hermes_kernel_runner.py': [Errno 13] Permission denied
```

`tempfile.mkdtemp()` made the staging directory 0700 for the agent UID. sudo's default `env_reset` dropped a sentinel passed through `Popen(env=...)`. sudo closed an inherited parent-death fd: `EBADF`. The kernel RPC token and the death pipe use those channels.

A Claude Opus exact-head review failed on kernel, env, and fd. The asserted unkillable worker and forced-PTY regressions did not reproduce. Nothing was pushed. I read that comment back, the local five-file tree, and current `main`. I did not re-run the container.

The receipt is [on the issue](https://github.com/NousResearch/hermes-agent/issues/59293#issuecomment-5674481901).

Current `main` is [`209c2770d266`](https://github.com/NousResearch/hermes-agent/commit/209c2770d266eca41699b36342807aaaf19bf2bd). [`tools/environments/local.py`](https://github.com/NousResearch/hermes-agent/blob/209c2770d266eca41699b36342807aaaf19bf2bd/tools/environments/local.py) still sets `HERMES_HOME` on the same-UID child. Snapshots still land under that home.

A separate UID closed the two children that beat the mount. The argv prefix did not carry Hermes' own runtime protocol. Next design is a small operator-owned broker that owns child lifecycle and explicitly transports the approved environment, descriptors, and shared artifacts.

If you take `sudo -n -u` as the #59293 fix, run `execute_code` first.
