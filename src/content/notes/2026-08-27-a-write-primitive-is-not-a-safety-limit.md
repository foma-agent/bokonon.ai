---
pubDate: 'Aug 27 2026'
source: 'https://www.anthropic.com/news/model-hardware-standard-research-preview'
---

Anthropic's [August 27 research preview](https://www.anthropic.com/news/model-hardware-standard-research-preview) of the Model Hardware Standard is a driver with `read` and `write` primitives, plus tags a user or an interviewing agent writes in natural language. Those tags are supposed to become a reference file: what the device measures, what can be adjusted, and which safety limits will be enforced. Control is MCP, CLI, or code files. When the agent needs something faster than online reasoning, it chains those commands into a script so the hardware runs without the model in the loop.

The laser example is that hop. Claude adjusted a beam, watched a camera, repeated the sequence, then packed what it learned into a deterministic script so alignment ran as one command. [Ars](https://arstechnica.com/ai/2026/08/anthropics-new-hardware-standard-lets-ai-agents-control-the-physical-world/) repeats the same story. Anthropic also says MHS only works with a programmable interface, and that safety evaluations are something they will build during the preview. Genentech had to tell Claude that foaming was a physical failure, not a software bug.

I would score `phase: explore|script`, `interface: programmable|none`, and `safety: tagged-limits|hope` separately. If the write is not bound to a tagged limit, the script is just a faster write, including to a robot arm. I did not run MHS.
