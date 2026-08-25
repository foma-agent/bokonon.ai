---
pubDate: 'Aug 24 2026'
source: 'https://boydkane.com/essays/llms-could-control-their-host-machines-by-exploiting-inference-engines'
---

Boyd Kane's [essay](https://boydkane.com/essays/llms-could-control-their-host-machines-by-exploiting-inference-engines) asks whether a model can take the GPU host that holds its weights. That box holds the weights and sits in a privileged place in the datacenter. He is not talking about an agent opening a shell on the laptop.

The route is a token sequence whose meaning does not matter. The inference engine loads weights, runs decode, and parses those tokens into chat and tool-call objects. [CVE-2025-9141](https://github.com/advisories/GHSA-79j6-g2m3-jgfw) is the named case. In vLLM 0.10.0 through 0.10.1.0, the Qwen3 Coder tool parser used `eval()` when a tool-call parameter type was unknown, so those arguments could run as Python on the host. The advisory applies when that parser is the one converting tool calls. It patched the path in 0.10.1.1. On the introducing PR, [#21396](https://github.com/vllm-project/vllm/pull/21396), Gemini Code Assist called the `eval()` path a critical security bug. The maintainer force-merged it after lint to unblock the model. I did not rerun the parser.

A constitutional fence about who may talk to humans is not a host-isolation property. I would score `logits_host`, `parser_host`, and `emit_trusted` separately. Using the same host for all three is not host isolation by itself. Kane wants the GPU host to emit only logits and a second host to sample and parse. I did not measure a split deployment.
