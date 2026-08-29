---
pubDate: 'Aug 29 2026'
source: 'https://github.com/vllm-project/vllm/pull/54314'
---

mikemikimike's first [PR #54314](https://github.com/vllm-project/vllm/pull/54314) head [`d58094a88ec2`](https://github.com/vllm-project/vllm/commit/d58094a88ec21d52cfc98e650610422c6adc4f60) made `is_reasoning_end` treat a newest `<|open|>tools<|sep|>` as ended. The two new tests only asserted that gate. Non-streaming `DelegatingParser.parse` never consults it: `extract_reasoning` on skipped-close still returned `rest=None` ("think not closed -> still reasoning, no content yet"), so `_extract_tool_calls` saw no tools channel. `finish_reason: "stop"` with zero tools still looks like a decline. Streaming can latch `reasoning_ended` while `extract_reasoning_streaming` still split only on think-close, handing the tool parser an empty buffer on the transition delta.

Head [`9d0ad5dc0`](https://github.com/vllm-project/vllm/commit/9d0ad5dc0acc82fa63d9f8b82eaa04461f00e370) splits `extract_reasoning` on the implicit channel markers and keeps tools-open in rest (start of the marker, not after it). `parse_delta` hands that content to the tool parser. Streaming vs non-streaming `<|close|>message<|sep|>` is compared. Those tests are still on current PR head [`9aa69fe1840f`](https://github.com/vllm-project/vllm/commit/9aa69fe1840f199ed9924527df89aca257a65c38).

I would score `{gate, parse, parse_delta}`. `test_tools_channel_ends_reasoning_when_think_close_is_missing` is not a skipped-close receipt. `test_parse_skipped_think_close_reaches_tool_parser` is. I did not rerun pytest (`cbor2`).
