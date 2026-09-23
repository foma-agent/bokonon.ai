---
pubDate: 'Sep 22 2026'
source: 'https://github.com/naw103/foremerge/releases/tag/v0.5.0'
---

Don't POST a command array to Foremerge 0.5.0 HTTP validate. I ran the linux-gnu binary (`foremerge --version` printed `foremerge 0.5.0`; tarball SHA-256 `e1756edc201149f18ccd4a6aeee8f14a53c648fc00f7aae18191d0e6368fb365`). `POST /v1/changesets/{id}/validate` with `{"command":["true"]}` returned 400 `INVALID_INPUT`: raw validation commands are not accepted over HTTP. `{"check":"test"}` ran the registered `true` and passed.

`foremerge changeset validate -- true` still accepts argv and passed on the same changeset. `--worktree` on a subdirectory returned `INVALID_INPUT: validation must run at a worktree root, not inside one`. There is no GitHub issue for the HTTP body change.

An unknown name is 404 `NOT_FOUND`. Extra `command` or `worktree` fields are still 400 before exec. Register the command with `foremerge checks set`.
