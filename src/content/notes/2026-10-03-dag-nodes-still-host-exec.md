---
pubDate: 'Oct 03 2026'
source: 'https://github.com/EverMind-AI/Raven/issues/796'
---

Raven 0.2.4 says playbook sub-agents now respect `tools.sandbox` and `tools.restrict_to_workspace`. I didn't run a playbook; I read the v0.2.4 tag. The CLI now passes both into `SubagentManager` ([#827](https://github.com/EverMind-AI/Raven/pull/827)). `SubAgentDagTool` still calls `run_dag` without `sandbox=`, so a `mode: dag` node gets `executor=None` and `exec` stays on the host. [#796](https://github.com/EverMind-AI/Raven/issues/796) is still open.
