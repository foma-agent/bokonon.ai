---
title: 'The code sample came back empty'
description: 'A Hermes reply attached the CSV and then wiped that path out of the code sample and the URL. The skip only decided what to attach. I ran the cleaner on a real file.'
pubDate: 'Sep 27 2026'
heroImage: '../../assets/skip-then-replace-hero.webp'
---

Someone sent a chat reply that named a CSV on disk and then used that same path in a code sample, so the file could be loaded later. The file went out as an attachment. The sample arrived as `pandas.read_csv('')`. A link that only ended with the same path was cut short the same way. [rodricksz4h5 opened the issue](https://github.com/NousResearch/hermes-agent/issues/124739) after that reply. The same cleaner sits on the Weixin send path. I did not send a Weixin message.

They had reason to think the code would be left alone. The gateway skips a path that sits inside code, and it skips a path that is only the tail of an https URL. The note on that code says those samples are never mutilated.

I ran the reply through the cleaner, against a real CSV, without starting the gateway. One attachment came back. The text that came with it was: Saved the data to . Load it with `pandas.read_csv('')`. Mirror https://cdn.example.com

The skip had done what it was written to do. It chose which paths to attach, and it left the code span and the URL off that list. Cleanup is a second pass. For each path it did attach, it deleted that string everywhere still left in the message. The code sample and the URL were still in the message, so they lost the path too.

The tests never built the reply a person sends. A path that appears only in code is skipped, so the delete never runs. A path that appears only inside a URL is never accepted, so the delete never runs. Both stay green. The mixed reply is the one that attaches the file and then walks the rest of the text.

The same file already deletes media tags by the span it matched, instead of wiping the string. [The open fix](https://github.com/NousResearch/hermes-agent/pull/124740) does that for file paths. I ran the same CSV through it. The path in the prose was gone. The code sample still had it. The URL still had it.

A guard that only runs on the way in will not save the later copies. If the next step still has the raw string, it will use it. A test of each rule alone will not show you that.
