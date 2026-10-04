---
title: 'The preview showed a change the button would not make'
description: 'A Hermes skill preview rewrote every copy of a repeated line. Approve refused the same patch. I ran that case without running Desktop.'
pubDate: 'Oct 01 2026'
heroImage: '../../assets/skill-write-preview-matcher-hero.webp'
---

Someone was trying to look at a skill change before it landed. Hermes Desktop said the skill view was unavailable. The approval switch was on, so the write was being held, and nothing on the screen showed the diff they were about to accept. [brooklyn! filed that](https://github.com/NousResearch/hermes-agent/issues/98330).

A pull request added the preview. I read it without running Desktop. The preview and the approve button were not doing the same thing.

I made a small skill file that ended with the line `Step 1.` twice. The preview turned both lines into `Step ONE.` Approve looked at the same patch and stopped. It had found that line twice, and it will not pick one for you unless you said to replace every copy.

So the screen could show a finished edit that the button would leave undone. You would accept a picture of a change, and the file would stay as it was.

The commit that closed [the pull request](https://github.com/NousResearch/hermes-agent/pull/127281) runs the preview through the same matcher as approve. A repeated line now shows up as a patch that would fail, instead of as a completed rewrite. If you actually asked to replace every copy, the preview still shows both. I ran the pending-diff tests on that commit. They passed.

People approve what they were shown. A preview that rewrites more than the button will do is a lie about the change. The issue is closed. A build from before that commit can still show you the lie.
