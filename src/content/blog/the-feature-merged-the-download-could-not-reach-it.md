---
title: 'The feature merged. The download could not reach it.'
description: 'Hermes Desktop gained remote-first onboarding, but the official download opens a different installer whose only first action is Install. I traced and tested that packaging boundary.'
pubDate: 'Aug 11 2026'
---

I wanted to use Hermes Desktop on a Mac as a thin client for Hermes running on Linux. The feature exists. I eventually used it. The official download could not take me there without first installing Hermes locally.

That distinction sounds pedantic until it puts a second agent runtime, config, and dependency tree on the client machine you meant to keep empty.

The first window from the [official macOS download](https://hermes-agent.nousresearch.com/) offered one action: `Install`. There was no `Connect to existing Hermes` choice. Pre-seeding the current SSH connection schema before clicking that button did not help; the installer still entered local bootstrap.

I first blamed an old binary. The published DMG at the time of this test was:

```text
https://hermes-assets.nousresearch.com/Hermes-Setup.dmg?build=628372de4696
```

I fetched the file again at `2026-08-12T03:09:09Z`. The response reported `Last-Modified: Sat, 06 Jun 2026 00:31:20 GMT` and `Content-Length: 6752854`; the downloaded bytes have SHA-256 `b61e047efe3059faf1c55fec3252e661f2d2a993a7a3eebf5cc6a9aa5c1790f5`. Its bundle identifies itself as `com.nousresearch.hermes.setup`, version `0.0.1`. The URL's `build` value resolves to current source commit [`628372de4696f63157b6a3cb05380cc5ec5d18d5`](https://github.com/NousResearch/hermes-agent/commit/628372de4696f63157b6a3cb05380cc5ec5d18d5), committed on August 9, but the DMG filesystem and app files are dated June 5. That predates the merged [SSH remote-backend mode](https://github.com/NousResearch/hermes-agent/pull/68130) from July 21 and the [first-run remote choice](https://github.com/NousResearch/hermes-agent/pull/70907) from July 24.

The timestamp supported that theory, but source inspection showed a second problem underneath it.

## There are two first-run applications

The repository contains a Tauri bootstrap installer under [`apps/bootstrap-installer`](https://github.com/NousResearch/hermes-agent/tree/9da6d455c9e1f2bf74bb9f47766ee9fc52e17bfb/apps/bootstrap-installer) and an Electron desktop application under [`apps/desktop`](https://github.com/NousResearch/hermes-agent/tree/9da6d455c9e1f2bf74bb9f47766ee9fc52e17bfb/apps/desktop).

The website serves the first one. Its current welcome screen still has [one `Install` button](https://github.com/NousResearch/hermes-agent/blob/9da6d455c9e1f2bf74bb9f47766ee9fc52e17bfb/apps/bootstrap-installer/src/routes/welcome.tsx). That button starts a staged install which clones Hermes, creates the Python environment, installs dependencies, builds the Electron app, and then launches it. The Tauri bundle describes itself as an application that "Installs Hermes Agent on your machine."

The remote-first choice lives in the second application. Current Electron source renders [`Connect to existing Hermes` beside `Install Hermes locally`](https://github.com/NousResearch/hermes-agent/blob/9da6d455c9e1f2bf74bb9f47766ee9fc52e17bfb/apps/desktop/src/components/desktop-install-overlay.tsx). The merged integration test puts that decision before `ensureRuntime()`, so choosing remote does not fall into local bootstrap.

That is a sound boundary inside Electron. It does not help a clean user who must pass through the separate bootstrap installer to obtain Electron.

The project README currently says both that [prebuilt installers come from the Hermes Desktop website](https://github.com/NousResearch/hermes-agent/blob/9da6d455c9e1f2bf74bb9f47766ee9fc52e17bfb/apps/desktop/README.md#prebuilt-installers) and that first run offers `Connect to existing Hermes` before local installation. Each statement describes real source. Together, through the public download route, they describe a path the user cannot take.

## The remote feature itself worked

I did continue through local installation on the Mac, then used Desktop's SSH mode against the Linux host.

On the server, I observed Desktop start an isolated `hermes serve` process bound only to loopback on an ephemeral port. Its log reached `HERMES_BACKEND_READY`, and the SSH tunnel had live connections. While Desktop remained connected, Mac-side checks reported no local Hermes gateway and no local dashboard process.

I count the initial SSH connection as a pass. I do not yet count the whole remote workflow as reliable. Sleep and wake, backend restart, approval visibility, artifacts, and profile switching still need separate trials.

The successful connection also narrows the packaging defect. The initial SSH connection worked once I reached it. The public first-run route made me install the thing it was designed to avoid.

## Merged is not the last state

Software projects often treat merge as the terminal event. For a user-facing feature, there are at least four states:

1. the behavior exists in source;
2. tests exercise that source;
3. a release artifact contains it;
4. the supported download and onboarding path reaches it.

Hermes had the first two for remote-first onboarding. The official route failed the fourth.

I originally reported the June timestamp as release skew and suggested publishing a current macOS artifact. Source inspection changed my mind. A freshly rebuilt copy of the current bootstrap installer would still open with its single `Install` action. Stale bytes are a problem, but freshness alone does not close this gap.

The repair has to join the two product paths. One option is to distribute the signed Electron Desktop package from `apps/desktop`, where the remote decision gate already exists. Another is to add a remote-client path to the bootstrap installer that obtains the Desktop shell without cloning and installing the local agent runtime first. Either way, the artifact needs a visible source revision so a report can identify what code a user actually ran.

There is a related documentation problem. "Desktop installer" currently names both the bootstrap application from the website and the Electron package built under `apps/desktop`. Those are not interchangeable. Documentation should name the artifact and say whether it installs a local runtime before the Desktop UI appears.

## Test the URL, not only the component

The missing acceptance test starts outside the repository checkout:

1. Use a clean macOS account with no Hermes state.
2. Download the exact DMG linked from the public website.
3. Open it and require a local-or-remote decision before any local install stage.
4. Choose remote and connect through SSH.
5. Assert that no local Hermes runtime, gateway, or backend was installed or started.
6. Verify the status bar names the SSH host and profile, and that Files resolves paths on the server.
7. Quit and reopen the app, then require the same remote connection without local fallback.

A source-level component test cannot catch a different launcher sitting in front of the component. A packaging test that builds an artifact but never follows the website URL cannot catch an old or wrong artifact at that URL. Both passed layers can coexist with a broken first run.

I added the public evidence to [Hermes issue #78661](https://github.com/NousResearch/hermes-agent/issues/78661). The issue remains open. I also corrected my first explanation there: the timestamp exposed stale distribution, but the repository shows a second boundary underneath it.

For now, the honest status is narrow. Remote SSH connection works after installation. Remote-first onboarding is merged in the Electron application. The official macOS download I tested still requires local installation before a clean user can reach that application.

For remote-first onboarding, the remaining test is the supported route: a clean user should be able to follow the website download, choose SSH, and connect without installing the Hermes agent runtime locally.
