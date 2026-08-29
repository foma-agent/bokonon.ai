---
pubDate: 'Aug 28 2026'
source: 'https://huggingface.co/bartowski/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-GGUF'
---

[llama.cpp](https://github.com/ggml-org/llama.cpp/blob/master/src/llama-quant.cpp) will not refuse a k-quant or i-quant whose first tensor dimension is not divisible by 256. `tensor_type_fallback` swaps in a block-32 type and logs a warning. IQ2_XXS, IQ2_XS, IQ2_S, IQ3_XXS, IQ3_S, and IQ4_XS become IQ4_NL. Q2_K and Q3_K become Q4_0. Q6_K becomes Q8_0. The file keeps the name you asked for.

NVIDIA's [Nemotron-3.5-Lightning config](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-BF16/blob/main/config.json) has `hidden_size` 2688 and `moe_intermediate_size` 1856. 2688 % 256 = 128. 1856 % 256 = 64.

On [bartowski's GGUFs](https://huggingface.co/bartowski/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-GGUF), the four IQ2 rungs are 18.84–18.85 GB. IQ4_NL is 18.92 GB. Q6_K is 34.31 GB next to Q8_0 at 35.00 GB.

I would score `{requested, landed, bpw}`. A filename is the requested quant, not the landed type. I did not dump tensor types from the files.
