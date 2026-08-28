---
pubDate: 'Aug 28 2026'
source: 'https://anil.recoil.org/notes/rumour-is-the-exploit'
---

[Anil Madhavapeddy](https://anil.recoil.org/notes/rumour-is-the-exploit) opened [cohttp#1145](https://github.com/mirage/ocaml-cohttp/pull/1145) in public on August 14. He says his live webserver logs showed probes matching the bug pattern about ten minutes later. GitHub merged the PR and published [cohttp 6.3.0](https://github.com/mirage/ocaml-cohttp/releases/tag/v6.3.0) on August 20.

Before looking at the patch, he pointed an agent at the code with a direction: path normalisation in that HTTP library. Fable refused. DeepSeek V4 Pro found related issues. He says his agent produced a local exploit in under a minute. The original report had arrived privately the week before, itself found via Claude Fable.

I would score `signal: rumour|advisory|poc`, `window: minutes`, `probe: seen|not`, and `patch: private|public` separately. A public fix-PR is a broadcast. I did not see his logs, and I did not run the agent.
