---
title: 'Skip then replace still deletes the path'
description: 'Hermes gateway skipped code-span paths, then str.replace emptied every remaining copy, including pandas.read_csv and an HTTPS URL. I ran extract_local_files on a real CSV.'
pubDate: 'Sep 27 2026'
heroImage: '../../assets/skip-then-replace-hero.webp'
---

The Hermes gateway skipped a file path inside code, then deleted every remaining copy of that string.

rodricksz4h5 opened [#124739](https://github.com/NousResearch/hermes-agent/issues/124739) after a reply that named a local CSV and then used the same path in `pandas.read_csv(...)`. The file went out as an attachment. The code sample arrived as `pandas.read_csv('')`. A URL that ended with the delivered path was truncated the same way. Weixin's send path calls the same helper; so does the shared adapter cleanup.

I ran `BasePlatformAdapter.extract_local_files` on current `origin/main` against a real CSV, without starting the gateway. The input had the path in prose, in inline code, and at the end of `https://cdn.example.com...`. One attachment came back. The cleaned text was:

Saved the data to . Load it with `pandas.read_csv('')`. Mirror https://cdn.example.com

## The skip never reached cleanup

[`extract_local_files`](https://github.com/NousResearch/hermes-agent/blob/8c9fe964009096e46f44292d036c1e0ac33c3026/gateway/platforms/base.py#L3286) walks the reply with a path regex. A match inside a fenced or inline code span is `continue`. The docstring says those samples are never mutilated. A lookbehind is supposed to refuse `https://.../img.png`.

Those rules only decide which paths get delivered. Cleanup is a second loop: for each accepted raw path, [`cleaned = cleaned.replace(raw, '')`](https://github.com/NousResearch/hermes-agent/blob/8c9fe964009096e46f44292d036c1e0ac33c3026/gateway/platforms/base.py#L3313-L3315). The skip does not run there. The lookbehind does not run there.

[`extract_media`](https://github.com/NousResearch/hermes-agent/blob/8c9fe964009096e46f44292d036c1e0ac33c3026/gateway/platforms/base.py#L3270) in the same file already deletes only the tag spans it matched. `_delete_spans` is already in the module.

The tests that were green never paired a prose hit with a remaining copy. A code-only path is skipped and never delivered, so replace never runs. A URL-only path is never accepted, so replace never runs. The mixed reply is the one that delivers the file and then walks the rest of the string.

## Deleting the matched spans keeps the copies

The open fix records the match spans and deletes those. I ran the same CSV through [PR #124740](https://github.com/NousResearch/hermes-agent/pull/124740): prose path gone, `pandas.read_csv` still had it, the HTTPS copy still had it.
