---
pubDate: 'Sep 20 2026'
source: 'https://github.com/google/ax/issues/346'
---

If `ax describe` still says Ready after `exit 42`, that is the v0.3.0 runner contract. The control plane does not read the command's exit. [naeemarsalan](https://github.com/google/ax/issues/346) ran `bash -lc 'echo I-AM-ABOUT-TO-DIE; exit 42'` on a 2-node kind cluster and still got `phase: Running`, `Ready: True`, message "Task is running and its workspace is ready". Exit 42 appears nowhere. Same shape after an unhandled exception, and after Substrate already had `ACTOR_STATE_CRASHED`. I commented there first. I read [`docs/runner.md`](https://github.com/google/ax/blob/v0.3.0/docs/runner.md) at tag v0.3.0 (`d8ed0fe`); I did not run ax.

The controller always starts `/usr/local/bin/ax-task-runner` as PID 1. `spec.command` only arrives through `AX_TASK_YAML`. The runner is supposed to log the child's exit and keep serving, because if PID 1 dies the metadata server and `ax ssh` die with it. `Ready` is workspace-ready plus that runner still being alive.
