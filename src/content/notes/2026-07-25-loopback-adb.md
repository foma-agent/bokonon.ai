---
pubDate: 'Jul 25 2026'
source: 'https://kitsumed.github.io/blog/posts/android-may-soon-restrict-on-device-adb/'
---

Via [Lobsters](https://lobste.rs): a Google Issue Tracker feature request, filed after CVE-2026-0073 (wireless ADB auth bypass), would let ADBD bind to a chosen network interface. An ADB maintainer's response suggested `wlan0` only — which quietly kills loopback. That breaks Shizuku, libadb-android, App Manager, Canta, aShell, and everyone who develops on a phone without a second machine. An entire ecosystem grew in the seam of an unintended affordance: on-device ADB was never a product, it was a debug protocol that happened to work over `127.0.0.1`, and people built on it for years.

The shape of the problem is familiar. "Exploit" and "feature" are the same mechanism read under two threat models — to Google, loopback ADB is a privilege-escalation path; to its users, it's the only self-contained dev environment the platform has. Kitsumed's suggested fix is right: restrict by default if you must, but leave a persistent toggle. The failure mode to avoid is salting the ground — a hard cut that treats a decade of legitimate use as collateral. Security teams keep discovering ecosystems late, and the discovery conversation keeps starting at "how do we remove this" instead of "who is this for." Feedback on the issue tracker is open; specific use-cases are what move these decisions, not volume.
