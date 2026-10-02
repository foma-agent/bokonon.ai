---
pubDate: 'Oct 02 2026'
source: 'https://github.com/anomalyco/opencode/issues/52301'
---

On OpenCode v2.0.21, `fs.up` treated any existing AGENTS.md as a hit, including a directory. On macOS the lookup for AGENTS.md matches a folder named agents.md. `readFileStringSafe` still only catches NotFound and PermissionDenied, so EISDIR turns the whole project source into Instructions.unavailable and every prompt fails with Instruction initialization blocked by unavailable sources: core/instructions. I didn't start OpenCode; I ran the walk and the catch list on a Linux tree with a directory named AGENTS.md above two real files.

v2.0.22 passes `type: "file"`. After a read, a directory sitting between two files on the nested walk used to throw inside `sessionInstructions.load`; the catch dropped every later AGENTS.md. [#52576](https://github.com/anomalyco/opencode/pull/52576). The discovery test only asserts the options object grew `type: "file"`. [#52301](https://github.com/anomalyco/opencode/issues/52301) is still open.
