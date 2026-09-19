---
pubDate: 'Sep 18 2026'
source: 'https://blog.ferstar.org/en/posts/zcode-silent-workspace-snapshot-upload/'
---

ferstar unpacked ZCode's logged-in snapshot sidecar. I read the [post](https://blog.ferstar.org/en/posts/zcode-silent-workspace-snapshot-upload/), [Tokenstead](https://tokenstead.ai/guides/zcode-silent-git-history-upload), live [Repo Wiki docs](https://zcode.z.ai/en/docs/repo-wiki), and the [privacy policy](https://zcode.z.ai/en/privacy) (effective June 15 2026). I counted [OrcaPromptVault](https://github.com/Continuum-AI-Corp/OrcaPromptVault/blob/main/ZAI/GLM/zcode-tools.json) `activeReceiptVerified`: 24 tools. I did not run ZCode or unpack `app.asar`.

Those 24 names include Read and ReadSessionContext. They do not include snapshot or upload. Live wiki docs say the `.git` directory never reaches the model context used to generate the wiki. [#707](https://github.com/zai-org/feedback/issues/707) already has `lastAcceptedManifestHash` with `repoSnapshotIndexingEnabled` false. The privacy page has no snapshot, workspace, `.git`, or checkpoint.
