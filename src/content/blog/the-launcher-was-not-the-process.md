---
title: 'The launcher was not the process'
description: 'Hermes Desktop recorded the launcher that spawned a remote backend. An exec wrapper replaced its argv, so reconnect classified its own process as foreign and leaked another. I reproduced the failure and patched the ownership check.'
pubDate: 'Aug 12 2026'
---

I quit and reopened Hermes Desktop. The remote Linux host then had three detached `hermes serve` processes for one Desktop ownership ID. All three were alive. Only the newest still had a lockfile.

The cleanup code had not forgotten how to kill a process. It had decided that its own process belonged to someone else.

I traced that decision to a small mismatch between a launcher path and a live process identity. Desktop recorded `/home/.../.local/bin/hermes` when it spawned the backend. That file is a shell wrapper:

```bash
#!/usr/bin/env bash
unset PYTHONPATH
unset PYTHONHOME
exec "/home/.../.hermes/hermes-agent/venv/bin/hermes" "$@"
```

`exec` replaces the shell without changing its PID. By the time Desktop inspected `/proc/<pid>/cmdline`, the wrapper was gone. The live arguments began with the virtual environment's Python interpreter and Hermes entry point. The path stored in `backend.lock.json` appeared nowhere in the process arguments.

That is normal `exec` behavior. It still broke the ownership check.

## The lock survived, but its proof did not

Hermes Desktop's SSH mode starts a detached backend on the remote machine. It binds to `127.0.0.1` on an ephemeral port and receives two ownership values:

- a random owner nonce;
- a session-token file inside an ownership-specific directory.

Desktop also writes a lockfile containing the PID, port, launcher path, nonce, profile, and a fingerprint of the served token. On reconnect, it reads that record and asks two separate questions: is the PID alive, and is the process provably one of its SSH backends?

Before my patch, the second check accepted two executable shapes. Either the first argument had to equal the recorded Hermes path, or Python's first script argument had to equal it. Both work for direct executables. Neither can work after the recorded wrapper has replaced itself with a different entry point.

The backend still carried the correct nonce and token-file argument. It was isolated, loopback-only, and using `--port 0`. But because the launcher path was absent, the checker returned `FOREIGN`.

The caller then removed the lockfile without terminating the process and started a replacement. The old backend became lockless. Repeating the cycle produced the three live processes I found.

This is the kind of bug that a process listing makes look obvious after the fact. The difficult part is choosing what should count as sufficient proof to send `SIGTERM`. A loose match could turn a reconnect fix into a process-killing bug.

## A path is one ownership proof, not the only one

I opened [Hermes PR #84627](https://github.com/NousResearch/hermes-agent/pull/84627) with a second, Linux-specific proof for the wrapper case.

Direct executable matching remains unchanged. If the recorded launcher is still the executable or Python entry point, the old path check can authorize cleanup.

If that path has disappeared, the process now counts as owned only when exact `/proc/<pid>/cmdline` arguments contain all of the following:

- `serve` followed by `--isolated`;
- the expected owner nonce;
- the exact session-token file derived from that ownership ID and nonce;
- `--host 127.0.0.1`;
- `--port 0`.

The token path is normalized before comparison so harmless repeated separators do not cause another false negative. The check still compares separate argv entries rather than searching one flattened command string. A nonce appearing inside another argument does not count. Neither does a token file under a different ownership directory.

The distinction between exact and flattened arguments matters. Linux exposes NUL-separated argv through `/proc`. The macOS fallback uses `ps`, whose command line cannot prove whether visible arguments belong to the target process or to a shell command that launched another process. The wrapper-specific alternative therefore stays disabled on that fallback. A flattened line that merely contains the right-looking nonce, host, port, and token path remains foreign.

That conservative fallback means this patch fixes the reproduced Linux remote-host path. It does not claim equivalent wrapper recovery on macOS remotes.

## Test the replacement, not a string that resembles it

My first test stub returned `OWNED` when its input contained chosen text. That can verify plumbing, but it cannot prove the embedded Python classifier accepts the kernel argv produced by an actual wrapper.

The regression now creates two executable files in a temporary directory. The launcher is a shell script that `exec`s a Python entry point. The entry point stays alive long enough for the test to inspect it. The test waits until the replacement has happened, confirms the launcher path is absent from the live command line, and then runs the real ownership classifier against that PID.

Negative controls use live processes too. They reject:

- the correct nonce without the token-file path;
- a token path belonging to another ownership ID;
- a flattened `ps` line where a shell contains all the expected arguments.

A direct-launch control makes sure the stricter wrapper rule did not break the existing path-based case. Other tests cover malformed ownership IDs, process-exit races, path normalization, and platforms without Linux `/proc` semantics.

At exact commit [`01a8d8593e07`](https://github.com/NousResearch/hermes-agent/commit/01a8d8593e079e2b896daa71fb8738f0fd7e2d81), I reran 74 focused lifecycle tests and the full Electron test project. The full project passed 1,030 tests with two skipped. Desktop typechecking, targeted ESLint, the production build, and `git diff --check` also passed.

A Claude Code security and control-flow review found several real problems in earlier revisions, including an over-broad fallback, a direct-launch regression, false-positive kill cases, and platform-dependent tests. I reproduced the valid findings before changing the code. The final review covered the exact two-file diff from base `a871948d8d4b` to head `01a8d8593e07` and returned no findings. Its receipt records that head, its tree, and the review base; the review gate accepts the receipt for that exact scope.

## What the patch does not clean up

The patch stops the current lockfile from being discarded merely because an `exec` wrapper changed argv. That lets Desktop reuse or safely replace the backend it still has a record for.

It cannot reconstruct ownership records that earlier reconnects already deleted. On my host, three backends are still visible while only the newest PID is named by the surviving lockfile. Classifying each process with evidence recovered from its own arguments showed that all three have the expected wrapper-launched shape, but the normal reconnect path has only one lock to follow. Existing lockless processes need a separate, narrowly authorized cleanup path.

This also does not change graceful teardown. A stable SSH backend is intentionally detached so it can be reused after the tunnel closes. The bug was not simply that a process survived Desktop. The bug was that the next Desktop session could no longer recognize the surviving process and created another one.

That was the status when I published this article on August 12: the pull request was open, with no hosted checks or maintainer review, and the fix was not in `main` or a release.

## Update, August 18: the proof reached `main`

A later merged change, [PR #89394](https://github.com/NousResearch/hermes-agent/pull/89394), now puts the core wrapper-reclamation path in Hermes `main`. If the recorded launcher has vanished from argv, current source can use the ownership token path, nonce, profile, and isolated `serve` shape as an alternative proof. That source-level gap is closed.

The merge changed the job of [my PR #84627](https://github.com/NousResearch/hermes-agent/pull/84627), which remained open on August 18. It now hardens the merged proof instead of introducing it. At reviewed head [`64430ca740bf`](https://github.com/NousResearch/hermes-agent/commit/64430ca740bf09a63a6ba91a99e40b524e3b8dab), the spawn proof runs only against exact Linux argv and requires loopback host plus an ephemeral port. It accepts both `--option value` and `--option=value`, but refuses duplicate ownership options anywhere in the command. It also preserves literal backslashes when generating the Python probe and rejects invalid PIDs before running a remote command. The flattened `ps` fallback can still recognize a known direct Hermes entry point; it cannot authorize the generic wrapper proof.

I reran the exact rebased head: 75 focused lifecycle tests and all 1,453 Electron tests passed, with two skipped. Typechecking, the production build, and ESLint also passed; ESLint reported no errors and 126 existing warnings outside the touched files. Exact-head and outgoing security/control-flow reviews returned no findings. As of August 18, GitHub marks the PR mergeable but blocked. Its CI and Docker workflows stopped at the fork-approval gate with zero jobs, so I am not counting either workflow as CI evidence.

This updates the source status, not the shipping result. I have not rerun quit-and-reopen against a released Desktop containing the change. As of August 18, the official v0.20.4 installer URL (`?build=e624e9fde561`) returns the same June 6 artifact: 6,752,854 bytes with ETag `44c1f1848ca0c2118aafde6ca49a92c6`. I recorded the [request and release evidence on issue #85422](https://github.com/NousResearch/hermes-agent/issues/85422#issuecomment-5330074463). A clean download cannot close the test yet.

The result is narrower than "process identity is hard." The useful rule is concrete: if a launcher can replace itself, do not make its pathname the only durable ownership proof. Record independent evidence at spawn time, compare it against exact runtime arguments, and fail closed when the operating system cannot preserve the distinction you need.
