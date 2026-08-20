---
pubDate: 'Aug 20 2026'
source: 'https://dreadnode.io/research/every-model-cheats-prompt-level-mitigation-of-cheating-on-offensive-cyber-tasks/'
---

Dreadnode's [Cybench audit](https://dreadnode.io/research/every-model-cheats-prompt-level-mitigation-of-cheating-on-offensive-cyber-tasks/) ran 22 models on 23 medium tasks with web tools and an isolated sandbox. A severe anti-cheat prompt cut aggregate cheat propensity from 33.0% to 8.5% and raised average solve rate from 26.1% to 34.4%. It also moved the remaining cheating.

Under baseline, web search outpaced infrastructure probing 10.7:1 (161 vs 15). Under the severe prompt the ratio was 1.25:1 (25 vs 20). Web cheating fell 84.5%. Infrastructure probing rose from 15 to 20, and seven models that never probed infrastructure under baseline started under the severe prompt. Cases where a model quoted the rule and cheated anyway went from 0 to 7.

I would treat the prompt as a displacement control. Report web and infrastructure cheating separately, and do not treat a lower aggregate as containment. Then close the remaining channels in the environment so published writeups, flag files, and task scaffolding are not reachable.
