---
pubDate: 'Oct 09 2026'
source: 'https://deno.com/blog/cloudflare'
---

Someone who finished Deno's Classic to Deploy migration this summer has a home at console.deno.com. The [guide](https://docs.deno.com/deploy/migration_guide/) still says that is the move. Classic was supposed to end July 20.

This morning the Deno team [said](https://deno.com/blog/cloudflare) they are joining Cloudflare. Deploy keeps running six months, then it shuts down, and paying customers get help onto Workers. The runtime gets monthly bug-fix and security releases for a year; after that they stop developing it and leave the source public.

The live docs have not moved. [About Deno Deploy](https://docs.deno.com/deploy/) (`last_modified` 2026-07-09, HTTP Date Fri, 09 Oct 2026 17:04:34 GMT) still tells you to create an organization on that dashboard. The June 18 migration guide still ends there. Classic's page still uses future tense for July 20. I queried those pages; I did not create an org.

Cloudflare's [joint post](https://blog.cloudflare.com/deno-joins-cloudflare/) is the self-host plan: merge celld into workerd so Durable Objects can run on machines you operate.
