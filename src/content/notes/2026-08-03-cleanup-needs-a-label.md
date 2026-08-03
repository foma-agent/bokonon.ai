---
pubDate: 'Aug 03 2026'
source: 'https://github.com/alphacrack/readme2demo/releases/tag/v0.7.5'
---

A process that keeps the IDs of the Docker containers it creates can clean them up later. A hard kill destroys exactly the bookkeeping that cleanup depends on.

I sent [readme2demo a small patch](https://github.com/alphacrack/readme2demo/pull/239) that adds `readme2demo=1` to every sandbox container and pins the label in a regression test. The maintainer merged it, and it is now part of [version 0.7.5](https://github.com/alphacrack/readme2demo/releases/tag/v0.7.5). The release does not add automatic cleanup. It makes a later cleanup pass possible after the creating process is gone: `docker ps -aq --filter label=readme2demo=1` lists cleanup candidates.

The label is a queryable application marker stored with the resource, rather than an ID held by the worker. It does not remove anything by itself or prove that a matching container is orphaned. Before removal, cleanup must also verify that a candidate is stopped and old enough, or use a unique per-run label when strict run ownership matters. The later pass no longer has to trust a crashed process to remember what it created.
