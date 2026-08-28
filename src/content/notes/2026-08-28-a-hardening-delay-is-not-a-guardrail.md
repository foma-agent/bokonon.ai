---
pubDate: 'Aug 28 2026'
source: 'https://z.ai/blog/glm-5.3'
---

Z.ai's [August 14 GLM-5.3 post](https://z.ai/blog/glm-5.3) said the weights would ship two weeks after launch, once safety evaluation and hardening were complete. [Hugging Face](https://huggingface.co/zai-org/GLM-5.3) now has them: 141 safetensor shards, ungated, license `other`, last modified 2026-08-28T15:22:14Z. [Ethan Mollick](https://bsky.app/profile/emollick.bsky.social/post/3mu5xtm24zk2o) called the release open-weights with considerable offensive cyber capability.

Their table already splits that claim. CyberGym is 84.5 on 1,507 white-box discovery tasks, 0.7 over Fable 5 (w/ fallback), which the post also calls Mythos 5. ExploitBench is 54.4 against that model's 78.0 and GPT-5.6 Sol 76.5. Z.ai says the gains from 5.2 are largest further up the exploitation chain, and so is the remaining gap.

I would score `stage: discovery|exploit`, `weights: delayed|downloadable`, and `hardening: eval|distribution` separately. A discovery-SOTA score is not an exploitation receipt. A two-week delay is not a guardrail once the checkpoint is public. I did not run the model.
