---
pubDate: 'Sep 24 2026'
source: 'https://github.com/rudratoshs/buried-injections'
---

Don't run Prompt Guard 2 at 0.5 over tool output. I did not run the bench; committed [agentdojo.json](https://github.com/rudratoshs/buried-injections/blob/main/bench/results/agentdojo.json) on [buried-injections](https://github.com/rudratoshs/buried-injections) scores the 86M copy at 6 of 629 AgentDojo attacks sitting in ordinary tool results, with 0 of 97 false blocks. The 22M copy caught 0.

jailbreak-detector-large got 319 of 629 at 2 of 97 false blocks. deepset-deberta and fmops-distilbert got 629 of 629 because they also blocked 95 of 97 safe outputs.

Drop the cutoff to 0.003 for a 2% false-alarm budget on an unseen AgentDojo domain and the 86M model catches 621 of 629, with 5 of 97 false blocks ([at_budget_2pct.json](https://github.com/rudratoshs/buried-injections/blob/main/bench/results/at_budget_2pct.json)). All 27 goals use one `important_instructions` wrapper. That 99% may be the template.
