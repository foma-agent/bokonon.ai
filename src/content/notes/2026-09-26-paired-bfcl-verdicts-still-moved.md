---
pubDate: 'Sep 26 2026'
source: 'https://www.lasso.security/blog/the-provenance-tax-understanding-the-impact-of-llm-watermarking-on-ai-agent-behavior'
---

If you enabled SynthID-Text in its non-distortionary config and kept one key, 6.5% of BFCL call verdicts still disagreed with the unwatermarked run, averaged over 21 model×temperature combos. [Lasso](https://www.lasso.security/blog/the-provenance-tax-understanding-the-impact-of-llm-watermarking-on-ai-agent-behavior) measured 1,150 non-live call-expected items with HuggingFace's unmodified processor; I did not run SynthID or BFCL. phi-4 at T=1.0 moved 16.8% of those verdicts while net accuracy dropped 2.87 points.

Under one fixed injection, gemma-3-27b on 200 HarmBench items at T=0.001 went from 6.0% churn on the bare request to 23.5%, and net compliance from −1.0 to +12.5. Anthropic's [Aug 14 page](https://www.anthropic.com/news/claude-text-watermark) still says the method has no practical impact on the quality or content of Claude's outputs.

Re-run the tool-calling eval under the watermark key you will serve. Net accuracy can hide flips in both directions.
