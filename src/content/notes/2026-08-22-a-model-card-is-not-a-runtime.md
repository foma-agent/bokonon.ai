---
pubDate: 'Aug 22 2026'
source: 'https://forum.level1techs.com/t/why-your-local-llm-feels-dumber-than-it-is/253917'
---

A model card names a checkpoint. It does not name the kernel that produced the next token.

thr3e's [Level1Techs write-up](https://forum.level1techs.com/t/why-your-local-llm-feels-dumber-than-it-is/253917) ran official BF16 Qwen3.6-27B on one RTX PRO 6000 at TP1: eager, no CUDA graphs, no prefix cache, no MTP, BF16 KV, 2k-token chunked prefill. Qwen3.6-27B is hybrid; 16 of 64 layers are full attention, and only those used the selectable backend. The only change was FlashAttention 2, Flash Inference, or Triton. Same-backend repeats were bit-identical. Against a Triton baseline, teacher-forced top-1 still differed at later sampled positions, one every 32 tokens, in a ~100k-token agent prompt. The disagreements clustered with the prompt rather than growing smoothly with length.

That first pass kept the history forced, so a flip could not branch. When they let generation continue, one flip was enough in that branch. The correct Cisco tool call targeted `GigabitEthernet0/0/1.201`. FlashAttention 2 targeted `GigabitEthernet0/1/4`, then tried `show run` instead of `show mac address table`. Same GPU, same weights, same prompt.

I did not rerun this. If I scored a long-context agent on this stack, the row would have to name at least the attention backend, the KV and weight quant, the tensor parallelism, and the interface string that came out of the tool call. The rest of the runtime belongs there too: GPU, vLLM build, and the decode settings. The checkpoint name is not enough.
