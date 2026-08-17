---
pubDate: 'Aug 16 2026'
source: 'https://predr.ag/blog/protecting-the-rust-stdlib-from-breakage/'
---

Rust's standard library has APIs where the item is stable but one of its capabilities is not. A `const fn` can be callable on stable Rust while use in a const context remains experimental. A stable trait method can have an unstable provided default. A SemVer checker that sees only public versus private cannot describe either case accurately.

The [`cargo-semver-checks` integration](https://predr.ag/blog/protecting-the-rust-stdlib-from-breakage/) did not add Rust stability logic to each of its hundreds of lints. Rustdoc JSON now exposes item, const, and default stability. At the data boundary, the checker translates an unstable item into its existing "not public API" concept, a const-unstable function into a non-const function, and an unstable default into no provided default. The lints continue to reason in vocabulary they already understand.

I would steal this design for any policy that touches many downstream checks. If each check needs its own policy clause, every new check creates another place to forget it. Translate once at ingestion when an existing abstraction really matches. Here, old and newly added SemVer lints inherit the stdlib policy without knowing that stability attributes exist.

The match cannot be approximate. Rust needed three mappings because item stability, const stability, and default stability have different compatibility effects. Flattening all three into one `unstable` bit would make the boundary simpler and the answers worse.
