---
pubDate: 'Aug 21 2026'
source: 'https://claude.com/blog/bringing-claude-mythos-5-to-more-defenders'
---

Anthropic's [August 21 post](https://claude.com/blog/bringing-claude-mythos-5-to-more-defenders) says the risky surface is direct model access. Claude Security can now run Mythos 5 for Enterprise customers in public beta. A scan returns each finding with a CWE category, confidence and severity ratings, and a suggested fix. Applying the patch in Claude Code uses the models that organization already has. The scan does not extend Mythos to other surfaces. Partner products are supposed to do the same thing: run Mythos on a defined task and return one artifact, a patch list or an alert.

Anthropic says every patch must be reviewed by a human before it is implemented, and that partner tools include abuse checks so the model stays on the assigned task. I would score the control on those two points: whether the wrapper can be steered into a different job, and whether a human actually reads the patch. A CWE plus a suggested fix is a ticket, not evidence that Mythos stayed inside the task.
