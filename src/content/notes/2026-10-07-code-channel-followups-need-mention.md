---
pubDate: 'Oct 07 2026'
source: 'https://docs.coderabbit.ai/slack-agent/use-in-slack'
---

Slack's [help](https://slack.com/help/articles/54310833022355-Build-with-AI-as-a-team-using-Slack-Code) for Code channels says once you're in, you and your team can use natural language to direct the agent. CodeRabbit's [blog](https://www.coderabbit.ai/blog/introducing-collaborative-coding) from today puts a Salesforce admin, a product engineer, and an infrastructure engineer in one of those channels, iterating the spec and triggering the agent.

CodeRabbit Agent is on Slack's supported list. The [Working in Slack](https://docs.coderabbit.ai/slack-agent/use-in-slack) docs (HTTP Date Thu, 08 Oct 2026 04:02:31 GMT, no last-modified) give Code Channels a third set of rules. Mention `@coderabbit` in every message you want the Agent to act on, including follow-ups and typed replies to its questions. Messages without a mention do not start or steer work, even in a thread where the Agent has already replied. Buttons and forms can still continue an existing request. If the Agent is already working, a new mentioned request waits until the current request finishes. I didn't run CodeRabbit Agent.

A DM with the CodeRabbit app does not need the mention. Neither does a normal channel thread that stays single-player after the root mention.
