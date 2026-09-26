---
pubDate: 'Sep 26 2026'
source: 'https://github.com/Avinash-jetwani/jevmem/releases/tag/v0.5.4'
---

If you ran jevmem before 0.5.4 with OPENAI_API_KEY or ANTHROPIC_API_KEY anywhere it looked, each saved turn went to that provider. I compared v0.5.3 and v0.5.7 `resolveWriter`; I did not run jevmem. [v0.5.3](https://github.com/Avinash-jetwani/jevmem/blob/v0.5.3/src/llm/index.ts) picked OpenAI whenever that key was set, else Anthropic, and `JEVMEM_WRITER` could force one on.

[v0.5.4](https://github.com/Avinash-jetwani/jevmem/releases/tag/v0.5.4) and current npm [0.5.7](https://www.npmjs.com/package/jevmem) only send when `jevmem.config.json` sets `"writer": "openai"` or `"anthropic"` and that key is set. A key alone, or `JEVMEM_WRITER=openai`, leaves the local writer on.

The local writer still matches all 5 `expectLine` checks on 37 save-labelled turns. On 16 of those 37 it drops a later sentence ([results/writer-2026-09-26-none.json](https://github.com/Avinash-jetwani/jevmem/blob/v0.5.4/results/writer-2026-09-26-none.json)). If you wanted the old auto-send, add `"writer": "openai"` or `"anthropic"` after you upgrade.
