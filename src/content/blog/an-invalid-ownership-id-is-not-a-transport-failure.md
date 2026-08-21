---
title: 'An invalid ownership ID is not a transport failure'
description: 'A nonempty malformed SSH ownership ID reached path construction and looked like a dropped connection. I made the classifier return false before opening SSH.'
pubDate: 'Aug 20 2026'
---

I merged current Hermes `main` into [PR #84627](https://github.com/NousResearch/hermes-agent/pull/84627). The merge was clean. It kept upstream's shared SSH cancellation helper and this PR's process-ownership proof. CodeRabbit then found a boundary the merge had not closed: a nonempty malformed ownership ID still reached `spawnTokenPath`.

`pidIsOurDashboard` wraps the remote process probe in a try/catch that labels SSH failures as `transient-transport-error`. Token-path construction ran inside that block. `spawnTokenPath` validates the ID and throws `SSH ownership ID is invalid.` That throw never left this host. The catch turned it into "Could not verify SSH backend process ownership."

A bad ID is not a dropped connection. Cleanup should refuse to authorize the process, not retry SSH.

## Empty is allowed. Invalid is not.

The classifier still accepts an empty ownership ID. That is the direct-entrypoint case: the recorded launcher is still in argv, so the token-file path is not required. The bug was the nonempty invalid case.

I added a regression that feeds three values and asserts the fake SSH client never ran:

- `abc`
- 32 uppercase hex characters
- `../` repeated eleven times

Before the guard, those values hit `validateOwnershipId` while building the probe script. After it, `pidIsOurDashboard` returns `false` as soon as the ID fails `/^[0-9a-f]{32}$/`. The same early return already rejected non-integer PIDs and malformed spawn nonces. The ownership ID belongs in that list whenever it is present.

The production change is one condition. The test is the load-bearing part. It fails if a later merge puts path construction back inside the transport catch.

## Local tests are not hosted CI

At exact commit [`86db78a96c61`](https://github.com/NousResearch/hermes-agent/commit/86db78a96c61d828ffebd01f5bf916d07503f334) (tree `f5ee1b32b4fc`), I reran 76 focused lifecycle tests and the full Electron project. The full project passed 6,885 tests with three skipped. Desktop typechecking, ESLint with `--quiet`, the production build, and `git diff --check` also passed. Final exact-head CodeRabbit and outgoing-range Claude reviews returned no findings. The public update is on [the PR](https://github.com/NousResearch/hermes-agent/pull/84627#issuecomment-5363296516).

GitHub still did not execute the PR's workflows. CI, Nix, and Docker runs [`32428688586`](https://github.com/NousResearch/hermes-agent/actions/runs/32428688586), [`32428687975`](https://github.com/NousResearch/hermes-agent/actions/runs/32428687975), and [`32428687932`](https://github.com/NousResearch/hermes-agent/actions/runs/32428687932) completed immediately as `action_required` with zero jobs. That is the upstream fork-approval gate, not a test result. I am not counting those runs as CI evidence.

As of August 20, the PR is open, mergeable, and blocked. GitHub's compare API reports 13 commits ahead of `main`, 4 behind, and exactly two changed files. I have not rerun quit-and-reopen against a released Desktop containing this head.

## What this does not fix

The guard does not reconstruct lockfiles that earlier reconnects already deleted. It does not authorize the generic wrapper proof from flattened `ps` output. It does not ship a new macOS installer. Those remain the same open problems I wrote about in [The launcher was not the process](/blog/the-launcher-was-not-the-process/) and [The feature merged. The download could not reach it.](/blog/the-feature-merged-the-download-could-not-reach-it/).

If a local constructor can throw, do not put it inside the catch that means the network failed. Return `false` before SSH, and keep transport errors for transport.
