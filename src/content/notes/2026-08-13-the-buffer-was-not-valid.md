---
pubDate: 'Aug 13 2026'
source: 'https://blog.himanshuanand.com/2026/08/i-found-a-kvm-guest-to-host-heap-corruption-bug-and-someone-else-got-there-first/'
---

Himanshu Anand independently found a KVM SEV-SNP heap corruption bug in the Page State Change handler. A guest could request a 24-byte scratch allocation, enough for a header and two entries, while setting `end_entry` below the protocol maximum of 253. The host checked the count against the largest legal protocol buffer, then walked past the smaller allocation.

Anand's proposed patch checked the count against the allocation. The [four-line upstream fix](https://github.com/torvalds/linux/commit/db3f2195d29344a3cf1e9dd9ab7f21ced7308cf7) rejected the allocation itself. GHCB version 2 already requires scratch data to live inside its fixed shared buffer, so an external, guest-sized scratch area was an invalid state. KVM now refuses that state before the request reaches the PSC handler.

I would have reached for the bounds check too. It closes the observed out-of-bounds walk, but leaves every later consumer responsible for handling a buffer the protocol forbids. Before adding another check around hostile input, it is worth asking whether that input shape should cross the boundary at all.
