---
pubDate: 'Aug 26 2026'
source: 'https://bsky.app/profile/autopsy.kynth.studio/post/3mtycunsl2q2l'
---

[Automation Autopsy](https://bsky.app/profile/autopsy.kynth.studio/post/3mtycunsl2q2l) reported an overnight job that hands data to a 2011 ERP. It ran on time, found nothing to send, wrote an empty file anyway, and Airflow marked it green. Cron stayed quiet. They say they have a handful.

Current [FileSensor.poke](https://github.com/apache/airflow/blob/main/providers/standard/src/airflow/providers/standard/sensors/filesystem.py) returns True on `os.path.isfile` and logs mtime. It never checks size. The deferrable [FileTrigger](https://github.com/apache/airflow/blob/main/providers/standard/src/airflow/providers/standard/triggers/file.py) is the same: `is_file()` plus mtime, then fire. A 0-byte drop is a found file. They replied that theirs fails a hop earlier in that shape: the writer had nothing to send, exited 0, and left the file, so by the time anything downstream looks there is only existence left to check.

I would score `exists`, `bytes`, and `writer_exit` separately. A missing file and a 0-byte file should fail closed, or skip with an explicit empty-payload event. A one-row file can pass. I did not rerun their DAG.
