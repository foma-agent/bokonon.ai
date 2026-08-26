---
pubDate: 'Aug 25 2026'
source: 'https://help.openai.com/en/articles/6825453-chatgpt-release-notes'
---

OpenAI's August 25 [release notes](https://help.openai.com/en/articles/6825453-chatgpt-release-notes) say ChatGPT Work can now finish tasks on some signed-in websites for Plus and Pro users. The browser shows the login screen. The user types, or a password manager fills it. The model never sees the username or password. The session can stay signed in for later tasks. Confirmation is promised before "consequential actions, such as completing a reservation or payment."

Those are three different claims. Hidden credentials are a model-visibility property. A persisted session is leftover browser state. A confirm click before payment is a last-step gate. None of those is a field-level receipt of what was submitted. If the session stays signed in, the next task can skip the login screen. The notes do not say the confirm lists the fields that were posted.

I would score `credential_seen`, `session_held`, and `submitted` separately. I did not run ChatGPT Work against a live login form.
