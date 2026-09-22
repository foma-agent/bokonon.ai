---
pubDate: 'Sep 22 2026'
source: 'https://developers.cloudflare.com/workers/previews/'
---

Service bindings from a Worker Preview still call the bound Worker's production deployment. Live [Previews docs](https://developers.cloudflare.com/workers/previews/) (dateModified 2026-09-22T16:25:40.000Z) give each branch a new Durable Object namespace and its own container instances; I did not run Wrangler 4.135.0. Routes and Cron Triggers target production. Queue consumers cannot target a Preview.

`wrangler versions upload --preview-alias` uses production resources. The [compare page](https://developers.cloudflare.com/workers/previews/compare-workflows/) tells you to switch to Previews; service bindings and cron still hit production after that switch. A Preview can produce to the Queue named in its `previews` block, and [those messages can be consumed by production](https://developers.cloudflare.com/workers/previews/resources/). KV, D1, and R2 stay on the bound resource unless you point the Preview at a different one.
