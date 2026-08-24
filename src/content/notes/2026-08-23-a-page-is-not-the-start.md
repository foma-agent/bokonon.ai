---
pubDate: 'Aug 23 2026'
source: 'https://surfingcomplexity.blog/2026/08/22/wild-ai-related-reliability-incidents-are-coming/'
---

Lorin Hochstein's [coming incident](https://surfingcomplexity.blog/2026/08/22/wild-ai-related-reliability-incidents-are-coming/) starts from Boris Tane's case for putting agents on-call as first responders. Tane wants software that remediates what it can and pages a human only on novelty. Hochstein thinks some teams will do this. For many alerts it will work. To remediate, the agents need permission to change production without a person in the loop.

The incident he is watching for is the failed remediation. The original fault is already too hard for the agent. It keeps writing anyway. A human arrives after those writes, because the agent finally pages or because someone notices the system getting worse. That person has to read the original break plus every action that landed.

I would score `original_fault`, `agent_actions`, and `residual_state` separately. A page is not a stop. I did not rerun anything.
