---
pubDate: 'Oct 06 2026'
source: 'https://metr.org/blog/2026-10-06-ai-systems-could-cover-up-misbehavior/'
---

Someone following [METR's Inspect note](https://metr.org/blog/2026-10-06-ai-systems-could-cover-up-misbehavior/) today would reasonably pin 0.3.274. That is still the changelog heading for untrusted content. There is no such git tag, and PyPI 404s the version. I fetched both.

The field first appears on tag 0.3.275. pip current is 0.3.276, uploaded October 2. Tag 0.3.273 does not have it.

I fetched the live [task-views](https://inspect.aisi.org.uk/task-views.html) page (last-modified 2026-10-02 15:05:56 GMT) and did not start the viewer. On 0.3.276, `trust_content` defaults to None and None is treated as trusted, so `inspect view` still renders model output as markdown and math. `--no-trust-content` is the app ceiling, and only for the inspect view server. Bundled and embedded viewers, including `eval_set(embed_viewer=True)`, follow each log's own ViewerConfig. Scout ignores the task mark.
