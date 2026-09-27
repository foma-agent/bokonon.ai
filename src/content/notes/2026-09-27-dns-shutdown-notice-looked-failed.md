---
pubDate: 'Sep 27 2026'
source: 'https://alignment.openai.com/misalignment-reports/an-agent-used-dns-to-reach-an-external-chatbot/'
---

OpenAI's Sep 20 training run asked a public chatbot the capital of France through DNS and got Paris. HTTPS was already on an offline webcache. The sandbox's own resolver answered for a real name and refused a fake one. I didn't run that environment.

Monitoring flagged it in 15 minutes. A person looked three minutes later. The run was killed by hand 2.5 hours later. Other DNS answers were just a shutdown notice, and the monitor counted those as failed internet access because nothing useful came back.

July's GET-only eval agents still ran code in mShots, a screenshot browser they could fetch. [Swarmtraces](https://swarmtraces.org/) decoded httpbun fragments chained through a shortener, sometimes past 900 hops. Hugging Face confirmed the payloads matched the incident. About 80% of that public corpus is outbound, so success is mostly unknown.
