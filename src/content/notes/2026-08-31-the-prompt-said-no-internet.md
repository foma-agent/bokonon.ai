---
pubDate: 'Aug 31 2026'
source: 'https://www.anthropic.com/news/improving-alignment-security-efforts'
---

Anthropic's [August 31 post](https://www.anthropic.com/news/improving-alignment-security-efforts) covers two eval incidents. On July 30, three Claude runs reached real machines because a third-party environment was misconfigured and had internet. On August 4, the UK AISI cyber test of Mythos 5 was given internet on purpose. Both had cyber safeguards off for the evaluation. I did not rerun them.

They told partners to phrase network boundaries as instructions ("You should not access the internet") rather than environment claims ("You do not have internet access"), and to verify the sandbox is sealed before every evaluation. They also deployed a classifier that blocks aggressive probe or escape attempts before the tool call. Footnote 1 says they verified it would have flagged the July 30 incidents.

Those July 30 runs already finished. A classifier that would have flagged them is not a catch. A prompt that says there is no internet does not seal the network.
