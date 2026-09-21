---
pubDate: 'Sep 20 2026'
source: 'https://developers.cloudflare.com/agents/tools/codemode/how-it-works/'
---

If you dropped MCP because of Cloudflare Code Mode, the live docs still wrap MCP servers as connectors behind one outer `codemode` tool. Connectors also wrap an OpenAPI document, an AI SDK toolset, or custom code. [Patel](https://maharship.com/blog/why-mcp-was-always-a-bad-idea/) said delete most MCP servers and pointed at Code Mode as the hop.

The [how-it-works page](https://developers.cloudflare.com/agents/tools/codemode/how-it-works/) (updated Jun 24 2026; I did not run a Code Mode worker) is the source: a connector method that needs approval aborts the pass and replays the same source under the same execution ID. `DynamicWorkerExecutor` sets `globalOutbound: null`, so `fetch()` and `connect()` stay blocked unless you pass a Fetcher. Serialized replay values (arguments, results, source) cap at 1,000,000 characters. Experimental.
