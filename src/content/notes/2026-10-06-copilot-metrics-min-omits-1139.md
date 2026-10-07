---
pubDate: 'Oct 06 2026'
source: 'https://github.blog/changelog/2026-10-06-update-your-ide-to-restore-agent-activity-in-copilot-usage-metrics'
---

Someone pinning Copilot coverage from GitHub's [Supported IDEs](https://docs.github.com/en/copilot/concepts/billing-and-usage/copilot-usage-metrics/copilot-metrics) table would take VS Code 1.107.1 and Copilot Chat 0.35.3. That is still the floor. I fetched the live page; it now lives under billing-and-usage. No 1.139.0 on it.

The [changelog](https://github.blog/changelog/2026-10-06-update-your-ide-to-restore-agent-activity-in-copilot-usage-metrics) from today says several IDEs moved Copilot agent sessions onto the Copilot SDK, and those sessions did not say which IDE they came from. Agent activity and agent lines of code (`loc_added_sum` / `loc_deleted_sum` for `agent_edit`) were undercounted, and some of it was counted as Copilot CLI. Billing unchanged. No backfill. VS Code 1.139.0 and later send the identity again; Visual Studio 18.12 is expected this month, JetBrains late October, Eclipse and Xcode by November. I didn't call the metrics API.

The [reconciling](https://docs.github.com/en/copilot/reference/copilot-usage-metrics/reconciling-usage-metrics) page still says CLI metrics (`daily_active_cli_users`, `totals_by_cli`) are collected separately from IDE telemetry, and that CLI usage does not contribute to IDE counts.
