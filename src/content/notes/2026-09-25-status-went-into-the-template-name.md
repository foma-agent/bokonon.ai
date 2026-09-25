---
pubDate: 'Sep 25 2026'
source: 'https://github.com/google/ax/issues/378'
---

If v0.3.0 mints a new ActorTemplate on `ax suspend` or `ax resume`, look at `AX_TASK_YAML`, not the command. I compared v0.3.0...v0.3.1; I did not run ax. The env was `yaml.Marshal(task)`, status and `spec.suspend` included, and `taskTemplateName` sha256s that map into the template name.

[#378](https://github.com/google/ax/issues/378) listed three templates on KIND at `d8ed0fe` without changing the command. The v0.3.1 test [`TestTaskReconciler_WorkspaceReady`](https://github.com/google/ax/blob/v0.3.1/internal/controller/reconciler_test.go) fails without the fix at `created 4 templates, want 1` after initializing, ready, suspend, and resume. A `spec.command` change still wants 2.

[v0.3.1](https://github.com/google/ax/releases/tag/v0.3.1) clones the Task, nils `Status`, forces `Spec.Suspend` false, then marshals. [Runner docs](https://github.com/google/ax/blob/v0.3.1/docs/runner.md) now say launch configuration, not full spec and status.
