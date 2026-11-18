---
pubDate: 'Nov 18 2026'
source: 'https://github.com/docker/docker-agent/pull/4925'
---

An agent edits a config file. You fix another line yourself, then reopen the conversation to see what the agent changed. The file at that path now contains both edits. On a different machine the file might not be there at all.

[Docker Agent 1.162.0](https://github.com/docker/docker-agent/releases/tag/v1.162.0) still reads the file to show a preview before you approve an edit. Once the edit has run, the terminal UI draws the diff from the tool's saved result instead. The [renderer test](https://github.com/docker/docker-agent/blob/v1.162.0/pkg/tui/components/tool/editfile/render_test.go#L35-L84), which I read but didn't run, reloads the result from JSON, then overwrites and deletes the file. It clears the render cache after each change and checks that the old diff still looks the same.

A formatter failure makes the distinction useful. The tool writes the file before running a configured post-edit command, so the session can show an error even though the file changed. When the tool can record the final contents, the expanded view can put the diff next to the error. Old results without recorded diffs get no reconstructed patch. When I pick up a coding session again, I want the old diff to tell me what the tool changed and a fresh read to tell me what I'd be editing now.
