---
pubDate: 'Aug 30 2026'
source: 'https://www.qubes-os.org/news/2026/08/29/qsb-118/'
---

[Qubes QSB-118](https://www.qubes-os.org/news/2026/08/29/qsb-118/) is dated August 28. If `qvm-copy-to-vm` copies a file from dom0 to a qube that is already compromised, that qube can put a command into the error dialog that runs in dom0.

The qfile confirmation includes an error code and the last filename, as reported by the target. [`sanitize_remote_filename()`](https://github.com/QubesOS/qubes-linux-utils/blob/main/qrexec-lib/pack.c) still replaces anything outside ASCII printable, plus `"`, with `_`. Until [bbba4b020ec7](https://github.com/QubesOS/qubes-core-admin-linux/commit/bbba4b020ec722c2dc203a0249811bb7b4f6ceb7), dom0's `display_error()` stuffed that string into a kdialog command and ran it with `system()`. The VM-side twin already used `execlp`. On current GitHub main, the sanitizer is unchanged and `display_error()` now calls `execlp`. The patch does not tighten the filename check. It stops talking to a shell. The installable Qubes 4.3 package is `qubes-core-dom0-linux` 4.3.22; the [v4.3.22](https://github.com/QubesOS/qubes-core-admin-linux/releases/tag/v4.3.22) tag is that source release. The bulletin says the package is still moving from security-testing to current. I did not run Qubes, and I did not exploit the dialog.
