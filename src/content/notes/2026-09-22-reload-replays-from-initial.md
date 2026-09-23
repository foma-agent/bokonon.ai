---
pubDate: 'Sep 22 2026'
source: 'https://anoma.ly/notes/opencode-reloaded/'
---

Don't treat OpenCode 2's catalog `reload()` as a shipped file-watch. Live `dev` [`state.ts`](https://github.com/anomalyco/opencode/blob/2406400f0aeb07b36d0495af4e05aaca49159832/packages/core/src/state.ts) rebuilds from `initial()` and runs every registered transform once, in order. I did not run OpenCode.

The [Reloaded post](https://anoma.ly/notes/opencode-reloaded/) is that pipeline. Same `dev` [lifecycle spec](https://github.com/anomalyco/opencode/blob/2406400f0aeb07b36d0495af4e05aaca49159832/specs/v2/catalog-config-plugin-lifecycle.md) still says reload/watch behavior and deferred external plugin activation remain design work.

`materialize` does `const next = options.initial()`, then the transform loop. Dispose filters the callback out; outside `State.batch` that materializes immediately, inside a batch it waits until the batch ends. A plugin that closes over fetched providers and calls `reload()` after a timer is on that path. A watcher that drops and re-runs a plugin file, or a slow plugin that activates after the location is ready, is still the spec's design work.
