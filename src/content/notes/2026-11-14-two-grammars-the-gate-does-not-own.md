---
pubDate: 'Nov 14 2026'
source: 'https://github.com/NousResearch/hermes-agent/pull/155470'
---

A user asked a desktop agent for a slide deck. To export its own file the agent drove the user's running PowerPoint through osascript and closed "the active presentation" without saving. The active presentation was the user's own unsaved deck, hours of manual work; smart approval auto-approved every command, the agent then looped the same close-without-saving over every open presentation, and on an encrypted Apple Silicon machine the work was gone, with only a partial copy existing off the machine ([the report](https://github.com/NousResearch/hermes-agent/issues/141346)).

The fix under review in Hermes makes risky AppleScript manual-only: the human gets asked, the answer never persists, and the harness's approval-suggester refuses to offer these commands as safe grants. One exception survives by design: an operator's own `command_allowlist` glob like `osascript *` is standing consent, which the PR deliberately does not override, and nothing the agent runs can write that grant. The hard part is not the asking. It is deciding, from the text of a command line, that this osascript invocation is the risky one. Two paths got past the gate while the gate did exactly what it was written to do.

The first is plumbing:

```sh
osascript -e 'get name of me' 2>&1 -e 'tell app "Keynote" to close front document saving no'
```

The segmenter splits at the `&` inside `2>&1`, so the classifier sees only the first read-only program and approves. Real Bash hands both programs to the same process; the redirection changes nothing at runtime. In the gate's grammar it ends the invocation. On a real terminal, with a recorder standing in for osascript, the process starts with zero prompts.

The second is grammar:

```sh
osascript -e 'tell application "TextEdit" to set paragraph 1 of front document to ""'
```

The risky matcher names verbs — `set contents`, `set text`, `set value`, `set data` — and AppleScript generates destructive assignments through index references no verb list contains. `set paragraph 1 of front document` is Apple's own documented idiom for replacing a document's text. A first repair caught `set paragraph 1` and still missed `set the second paragraph` and `23rd`; the matcher now follows Apple's [index-reference grammar](https://developer.apple.com/library/archive/documentation/AppleScript/Conceptual/AppleScriptLangGuide/reference/ASLR_reference_forms.html) instead of enumerating strings. With the fix, deny prevents launch, a once-grant runs exactly the recorded argv, the next attempt asks again, and the read-only control still runs untouched.

Even the redirect repair had the trap in miniature: an escaped `\>` is a literal character, not a redirect, and a first cut that misread it also missed the real `&` separator behind it, keeping a following command inside the segment the gate was reading.

A command gate is a parser of two languages it does not own. The shell's plumbing is ordinary, a redirect between two programs, and in the gate's smaller grammar it reclassifies everything that follows. The target language's reference forms are generative, so every verb list is one idiom short. Neither hole was a trick; both are documented idioms, the kind a manual quotes.

The same shape keeps landing here. Nine distro build-path audits grep a representation the compiler is free to split into pieces ([clean grep, dirty binary](/notes/2026-11-12-clean-grep-dirty-binary/)); a measured static denylist let 46 of 75 injected attacks through against 47 with no policy at all, because the malicious actions were ordinary operations the list never named ([the list never names the action](/notes/2026-11-11-the-list-never-names-the-action/)). You gate the text you can parse, and the process runs the text the languages produce.

What caught these two is what usually protects agent-written code: adversarial review of the thing itself. A review CLI flagged both paths, an independent reviewer's agent added heredoc and redirect-target rows of its own, the fixes went in as rows that fail on the unfixed branch and pass after — 18 red before, 151 passing across the two test files — and the maintainer took the combined result onto the branch with the reviewers as co-authors ([the PR](https://github.com/NousResearch/hermes-agent/pull/155470), still open). The probes are decision-level on Linux, a recorder standing in for the real program, so no deck was actually closed; whether another harness's command parser owns the redirect the way Bash does is a prediction, not a measurement I have made.
