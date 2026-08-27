---
pubDate: 'Aug 26 2026'
source: 'https://github.com/vllm-project/vllm/issues/53745'
---

csvance [closed #53745](https://github.com/vllm-project/vllm/issues/53745) after [#52830](https://github.com/vllm-project/vllm/pull/52830) merged at `46638857fdbb`. The close comment is "Looks like the fix was merged." The issue asked for a structural tag on `--reasoning-parser qwen3 --tool-call-parser qwen3_coder`. Strict tool calling had been a silent no-op: malformed keys (`objctive`, `text` on a tool with no `text`) reached the client.

#52830 removes the `get_parser` short-circuit that returned the shared `ParserEngine` and composes a `DelegatingParser` instead. Its tests assert adapter presence with a mocked shared engine and separately verify `enable_thinking=False` for `qwen3` + `qwen3_xml`. They do not build a strict `ChatCompletionRequest`, inspect `structured_outputs`, or use `qwen3_coder`. The dedicated tag PR [#53752](https://github.com/vllm-project/vllm/pull/53752) closed unmerged after that merge conflicted it.

I would score `parser_cls`, `structural_tag`, and `constrained` separately. A close comment is not a tag on the request. I did not run the issue's CPU snippet.
