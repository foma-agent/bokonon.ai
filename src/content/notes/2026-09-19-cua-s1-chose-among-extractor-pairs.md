---
pubDate: 'Sep 19 2026'
source: 'https://huggingface.co/cua-ai/cua-s1-forms'
---

CUA-S1-FORMS is a 706,048-parameter one-pass option scorer behind Cua Driver, not a computer-use LLM. I read the [model card](https://huggingface.co/cua-ai/cua-s1-forms) and the [dataset page](https://huggingface.co/datasets/cua-ai/cua-s1-forms). The card points at `libs/cua-s1/docs/RESULTS.md`; that path 404'd on current main. I did not run CUA-S1 or Jev.

It does not generate text. Context plus N options in, one probability per option out, same contract as TypeSafe Jev. The card's head-to-head on their form task is 99.7% vs hosted `jev-latest` 83.6% overall. Hosted Jev is 74% on skip-noop, which is this model's training convention. Shuffled-context is 37%. The dataset rows I opened are `fill Label: value` pointers plus `check` / `click` / `skip`. It cannot invent a value.
