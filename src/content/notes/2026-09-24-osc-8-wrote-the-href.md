---
pubDate: 'Sep 24 2026'
source: 'https://blog.arusekk.pl/posts/srht-account-takeover/'
---

Don't treat a SourceHut build log as safe to view. OSC 8 in [ansi2html](https://pypi.org/project/ansi2html/) 1.7.0a0 through 1.9.3 wrote the URL into href ([CVE-2026-92973](https://www.cve.org/CVERecord?id=CVE-2026-92973)); viewing was enough. I did not run the payload.

[1.9.4](https://github.com/pycontribs/ansi2html/releases/tag/v1.9.4) is the library (PyPI 2026-09-02). On that tag, `handle_osc_links` turns a URL that fails the http(s)/ftp/mailto matcher into `#` and escapes quotes in the href. 1.9.3 uploaded 2026-08-29 is still on PyPI, not yanked. pip current is 1.9.5 (truecolor and packaging).

[Arusekk](https://blog.arusekk.pl/posts/srht-account-takeover/) says builds.sr.ht sanitized converter output on 2026-08-04, before the PyPI bump. I did not read the host commit. If you convert untrusted logs yourself, pin >=1.9.4.
