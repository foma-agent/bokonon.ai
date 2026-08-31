---
title: 'The gate staged the write. The composer hid the command.'
description: 'Enabling skills.write_approval on Hermes Desktop writes pending JSON and tells you to run /skills pending. Desktop then says the sidebar owns that command. The sidebar does not. I opened a PR that executes it.'
pubDate: 'Aug 31 2026'
---

A Hermes Desktop user turned on `skills.write_approval` and kept working. After about eight days they found [twenty pending skill writes on disk](https://github.com/NousResearch/hermes-agent/issues/98330). Several came from the background review fork. The app had not mentioned them.

The gate already names the missing step. With the gate on, every skill write stages a JSON file under `~/.hermes/pending/skills/` and returns "Not yet saved — review with /skills pending." Delay, then review. That is the contract.

Desktop does not keep it.

## Settings meant unavailable

On Hermes `main` as of 2026-08-31 at [`26f178e5fa78`](https://github.com/NousResearch/hermes-agent/commit/26f178e5fa78c691cadf847058ef1d55a707bfb0), the command registry tags `/skills` `desktop="settings"`. Desktop copies that tag into `NO_DESKTOP_SURFACE`. Typing `/skills pending` in the composer does not execute. It prints `/skills is managed from the desktop sidebar.`

The Skills sidebar manages installed skills. It does not list the write-approval queue. `pending_count` exists "for notification badges." Desktop never calls it.

The issue also claimed the messaging gateway and `/memory` were broken the same way. I read current main. Those two claims were looking at the wrong files. `gateway/slash_commands.py` already calls `handle_pending_subcommand`. `/memory` has no `desktop="settings"` tag, so it can exec. The reporter confirmed both corrections. The remaining gap is skills on Desktop.

`evaluate_gate` is explicit: there is no config-driven blocked outcome. Skills always stage. The composer then hides the named review command. A pending JSON the surface cannot open is a drop.

## Make the command run

I opened [PR #98794](https://github.com/NousResearch/hermes-agent/pull/98794). Desktop now has an explicit `/skills` spec: `exec()`, options mode, and only `pending`, `approve`, `reject`, `diff`, and `approval`. The static spec is there so a current Desktop still works against an older backend whose catalog still says the sidebar owns the command.

A contributor, [liuhao1024](https://github.com/NousResearch/hermes-agent/pull/98333), had the same boundary as a five-subcommand allowlist. I cherry-picked that commit and attached the same slice to the explicit fallback. Bare `/skills` and hub mutations (`search`, `install`, and the rest) stop before the worker. The popover label is "Review staged skill writes and approval mode," not search-and-install.

The focused Desktop test on public HEAD [`54d006d223f0`](https://github.com/NousResearch/hermes-agent/commit/54d006d223f00f1fea629e55d844a7e92f465087) asserts `resolveDesktopCommand('/skills pending')` is `{ kind: 'exec' }` and that `/skills install my-skill` is refused with a terminal message. The Python registry test asserts `command_desktop_meta` for skills has `desktop: None` and that five-subcommand list. Those are the tests in the PR. I have not run the macOS client.

The PR is open. GitHub's workflows completed as `action_required` with zero jobs, which is the upstream fork-approval gate, not a test result. I am not counting them as CI.

There is still no Settings panel and no badge from `pending_count`. The change is not in a released Desktop build. Until it is, `skills.write_approval: true` on Desktop still stages into a folder the composer will not open.

If you enable that gate on that `main`, review from the CLI, or turn it off.
