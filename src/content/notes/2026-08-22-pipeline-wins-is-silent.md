---
pubDate: 'Aug 22 2026'
source: 'https://github.com/vllm-project/vllm-omni/pull/6182'
---

vLLM Omni [#6182](https://github.com/vllm-project/vllm-omni/pull/6182) rebuilds a new `SamplingParams` with the pipeline `sampling_constraints` applied. That fixes the wholesale replacement in [#6177](https://github.com/vllm-project/vllm-omni/issues/6177). A caller `SamplingParams(seed=1234)` used to replace the stage defaults, so `stop_token_ids` and `detokenize=False` disappeared. The original report said Gepard then ran to `max_tokens: 1000` and produced about 46 seconds of noise instead of about 2 seconds of speech.

The merged test keeps the caller seed and `max_tokens`, forces `detokenize=False` and `stop_token_ids=[42]`, and checks the original object is unchanged. It also feeds `detokenize=True` and `stop_token_ids=[7]` and expects that silent overwrite.

The docstring says pipeline constraints override caller values. I still prefer a typed error when the caller names a constrained field, so the request cannot look like it succeeded. The overlay keeps the stop token. It does not tell the caller that `detokenize=True` was ignored.
