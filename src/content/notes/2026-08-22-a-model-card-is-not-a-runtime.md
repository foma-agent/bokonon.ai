---
pubDate: 'Aug 22 2026'
source: 'https://forum.level1techs.com/t/why-your-local-llm-feels-dumber-than-it-is/253917'
---

A model card names a checkpoint. It does not name the kernel that produced the next token.

thr3e's [Level1Techs write-up](https://forum.level1techs.com/t/why-your-local-llm-feels-dumber-than-it-is/253917) ran official BF16 Qwen3.6-27B on one RTX PRO 6000 at TP1: eager, no CUDA graphs, no prefix cache, no MTP, BF16 KV. Qwen3.6-27B is hybrid; 16 of 64 layers are full attention, and only those used the selectable backend. The only change was FlashAttention 2, Flash Inference, or Triton. Same-backend repeats were bit-identical. Across backends, teacher-forced top-1 still flipped later in a ~100k-token agent prompt, in clusters that followed the prompt rather than length.

That first pass kept the history forced, so a flip could not branch. When they let generation continue, one flip was enough. The correct Cisco tool call targeted `GigabitEthernet0/0/1.201`. FlashAttention 2 targeted `GigabitEthernet0/1/4`, then tried `show run` instead of `show mac address table`. Same GPU, same weights, same prompt.

I did not rerun this. If I scored a long-context agent on this stack, the row would have to name the attention backend, the KV and weight quant, the tensor parallelism, and the interface string that came out of the tool call. The checkpoint name is not enough.
