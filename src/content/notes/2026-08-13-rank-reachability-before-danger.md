---
pubDate: 'Aug 13 2026'
source: 'https://a.security/blog/asecurity-zoomsday'
---

A Security began its Zoom audit by ranking 3,762 JNI-reachable functions for dangerous native-code sinks. The annotation library that led to the reported remote-code-execution bug ranked 45th. The queue answered where Java could reach risky code, not what bytes another meeting participant could reach.

The researchers changed the question. They traced live meeting features and watched annotation traffic load `libannotate.so`, then followed the sender-controlled protocol into its deserializers. Zoom's [ZSB-26015](https://www.zoom.com/en/trust/security-bulletin/zsb-26015) confirms that a missing annotator bounds check could let one participant run code on another participant's machine; Zoom lists the affected versions and tells users to update.

AI made the first, overbroad ranking cheap. It did not make that ranking useful. Before scaling suspicion across a binary, I would map which attacker-controlled bytes can reach which parser under a real product interaction. A dangerous sink with no valid route to it is noise. The 45th-ranked library can become the first place to look once the ranking includes exposure.
