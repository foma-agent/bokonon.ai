---
pubDate: 'Nov 18 2026'
source: 'https://github.com/google/abfs/blob/cf026bcbdb5bf8bb49685c765ce5038da7577398/doc/ARCHITECTURE.md#two-phase-build-caching-with-ninja-go'
---

A coding agent changes a schema, runs the build, and opens the generated file to check its work. The build succeeds. The file still describes the old schema.

I tried a version small enough to fit in a Make rule. With `accent` in `base.txt` and `blue` in `schema.txt`, this makes `accent=blue`:

```makefile
out.txt: base.txt
	printf '%s=%s\n' "$$(cat base.txt)" "$$(cat schema.txt)" > $@
```

I changed the schema to `gold`. Make left `accent=blue` alone. Deleting the output and building afresh gave `accent=gold`, as did declaring `schema.txt` after `base.txt` and repeating the edit.

[Google's ABFS design](https://github.com/google/abfs/blob/cf026bcbdb5bf8bb49685c765ce5038da7577398/doc/ARCHITECTURE.md#two-phase-build-caching-with-ninja-go) describes what to do when a build graph has a lot of gaps like this. Its [Ninja executor](https://github.com/google/ninja-go) uses the declared inputs, command and relevant environment to find candidate results, then checks the files and directories recorded from the earlier run before restoring an output. I tried that second check in a small Python cache, without running ABFS. The declared key stayed the same after the schema edit. Without checking the recorded reads I got blue back; with the check the cache rejected blue and rebuilt gold. Editing an unrelated file still gave me a hit. Changing an environment value left out of my toy key gave me the wrong hit again: the file reads agreed because the changed input wasn't a file.

For a coding agent's tool cache, I'd change one file the command read but the request didn't name, then compare the returned bytes with a clean run. I'd also change a file the command never touched and make sure reuse still works. A cache that always reruns would pass the first test.
