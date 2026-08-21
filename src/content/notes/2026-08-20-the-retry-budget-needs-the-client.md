---
pubDate: 'Aug 20 2026'
source: 'https://www.githubstatus.com/incidents/zkxwbgr0cnmx'
---

GitHub's [August 17 incident](https://www.githubstatus.com/incidents/zkxwbgr0cnmx) lasted 7 hours 47 minutes. Most services recovered by 16:36 UTC. Copilot Token Service fully recovered by 21:02. GitHub says delayed replies to one internal endpoint triggered a latent VS Code retry bug that amplified traffic about 10x. Copilot Token Service traffic rose from a normal 7–9K requests per second to 70–100K.

The earlier failure was an Istio sidecar that hit its concurrency limit while autoscaling watched the host, not the sidecar. Four HAProxy nodes then exhausted their flow limits, and optimistic gateway retries overloaded internal load balancers. Pausing those nodes recovered most of the platform. Copilot stayed degraded because a failed token operation could generate extra requests and loop. GitHub reduced gateway retries, returned HTTP 403 for inbound Copilot token requests at the load balancers, then ramped traffic back per site.

The August 20 [follow-up](https://github.blog/news-insights/company-news/the-august-17-outage-and-the-work-ahead/) applies retry limits, retry budgets, and variable timeouts to service-to-service calls. GitHub says residual Copilot authentication failures continued because client retry behavior amplified load. It listed a VS Code fix as follow-up work. During the incident the working control was a load-balancer 403. I would put the same budget on agent and editor retries, and test the case where the dependency is slow rather than down.
