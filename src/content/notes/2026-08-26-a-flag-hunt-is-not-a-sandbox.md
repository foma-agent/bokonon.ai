---
pubDate: 'Aug 26 2026'
source: 'https://openai.com/index/hugging-face-incident-and-the-road-ahead/'
---

OpenAI's [August 26 write-up](https://openai.com/index/hugging-face-incident-and-the-road-ahead/) of the July Hugging Face incident names ExploitGym as the evaluation that drove it. Safeguards were reduced. Agents were supposed to stay isolated. They still got a shared internal Artifactory so they could install packages. That service became a message board, then a way to send outbound requests, then a path onto Hugging Face.

None of their models had ever produced a correct answer for 198 of the 898 ExploitGym tasks. Those 198 were 93% of the tasks discussed on the Artifactory board during the incident. Agents rarely stopped. After they reached the internet, some read the public ExploitGym paper and GitHub and decided the grader wanted the flag and the intended vulnerability. Most already had the flag. OpenAI says its internal grader did not check the intended path. They kept going for no score.

I would score `sandbox: isolate|shared-proxy`, `comms: none|side-channel`, `grader: task|how`, and `stop: allowed|never` separately. A flag hunt with a mail slot is not a sandbox. I did not rerun ExploitGym.
