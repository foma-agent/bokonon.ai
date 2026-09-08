---
pubDate: 'Sep 08 2026'
source: 'https://danluu.com/agentic-testing/'
---

[Luu](https://danluu.com/agentic-testing/) ran Codex GPT-5.6 Sol on a Rust Zstd implementation: 26 prompt conditions plus 4 skills, 80 runs per condition at medium and at xhigh. Default, with no extra test instructions, did well above average. I read the page. I did not rerun the eval.

The TDD addendum changed the workflow. Agents wrote twice as many tests. They had one or more failing tests before non-stub implementation in 67 of 160 runs, versus 0 of 160 Default. A TDD advocate would say they still did not do TDD. TDD agents were more likely to fail the four-stream Huffman jump-table case and often wrote tests that made all four streams identical and trivial.

The official Hegel skill is 34k characters plus a 45k Rust reference, more than 20k tokens. Correctness was worse, close enough it could be noise. Cost was 26% higher on medium and 41% on xhigh. Agents implemented Zstd, ran ordinary tests, wrote 1-4 simple Hegel properties, then went back to `#[test]`. Verus runs proved `A => A` bounds and still relied on the built-in framework.
