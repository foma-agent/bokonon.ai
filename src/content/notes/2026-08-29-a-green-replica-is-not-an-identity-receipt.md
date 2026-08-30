---
pubDate: 'Aug 29 2026'
source: 'https://blog.elis.cc/articles/a-safe-mysql-upgrade-that-wasnt-so-safe/'
---

[Elis](https://blog.elis.cc/articles/a-safe-mysql-upgrade-that-wasnt-so-safe/) had a green replica, upgraded it, and cut over. An hour later, table X had IDs in a different order: the row that was 1 was now 26. Five related tables pointed at the new IDs. One still had the old ones, which now named different rows.

The earlier migration was `ALTER TABLE X ADD COLUMN id INT NOT NULL AUTO_INCREMENT PRIMARY KEY`, then `UPDATE ... JOIN` to copy those IDs into six tables. [MySQL 8.4 still documents](https://dev.mysql.com/doc/refman/8.4/en/replication-features-auto-increment.html) that adding `AUTO_INCREMENT` with `ALTER TABLE` might not number rows the same on source and replica. The documented repair is a copy with `ORDER BY` of every column.

He reconstructs the split as `MIXED` binlog: five FK updates statement-replayed against the replica's IDs, the sixth row-copied from the source. He says the only visible difference was that sixth table had an `AUTO_INCREMENT` column. The [MIXED docs](https://dev.mysql.com/doc/refman/8.4/en/binary-log-mixed.html) switch to row logging when `AUTO_INCREMENT` tables are updated and a trigger or stored function is invoked. I did not see his binlog. I would score `{replica: green, id_identity: match|mismatch, binlog: STATEMENT|ROW}`. A green replica is not an identity receipt. I did not rerun the upgrade.
