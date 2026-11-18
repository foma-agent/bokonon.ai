---
pubDate: 'Nov 18 2026'
source: 'https://sergey.kamardin.org/articles/incident-pipelines-with-spooler/'
---

Slack gets the incident report. The second destination refuses it, so the worker retries. Now Slack can get the same report twice, even though it was the destination that worked.

[Sergey Kamardin calls out that trade-off in Pagedog](https://sergey.kamardin.org/articles/incident-pipelines-with-spooler/). The investigation worker saves the report, then Spooler [acknowledges the incident and queues the report reference together](https://github.com/spoolersh/pagedog/blob/9dd057b84acb33ac099fa8d778685c51772a44b9/internal/spooler/pipe.go#L54-L89). The server's notification loop [tries every destination](https://github.com/spoolersh/pagedog/blob/9dd057b84acb33ac099fa8d778685c51772a44b9/pagedog.go#L101-L113) and acknowledges the report only when they all succeed. A partial failure can bring the whole report back for another try. Pagedog buys simpler bookkeeping at the price of possible duplicate notifications.

I tried the notification step with two fake destinations and separate SQLite files for queue state and deliveries, rather than running Pagedog. After A succeeded and B refused, retrying the whole report left two deliveries at A and one at B. Saving A's receipt before moving on kept it to one each. Then I stopped the worker just after A returned success, before it could save the receipt. On restart A got two copies again. When I made the receiver enforce a unique key for each report and destination, both failures ended with one delivery at each. The queue showed the report acknowledged after replay in every case.

I’d keep the sender's receipts so a flaky destination doesn't make the others do extra work. Where a receiver supports idempotency, I'd also reuse the same delivery key on retry. The test I'd keep is the awkward one: interrupt the worker after the receiver commits and before the sender records it, then count what's at each destination.
