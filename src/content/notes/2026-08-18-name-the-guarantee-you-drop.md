---
pubDate: 'Aug 18 2026'
source: 'https://depot.dev/blog/why-i-reimplemented-lvm'
---

Depot's account of [replacing LVM's control plane](https://depot.dev/blog/why-i-reimplemented-lvm) is a useful case for deliberately worse guarantees. The team says an LVM volume-group operation held a lock for roughly 100 ms in its environment, while its microVM launch path may need up to 200 operations per second. It kept Linux device-mapper as the data plane and replaced the allocation and mapping control plane.

The safety argument depends on the workload's lifecycle. These microVMs are ephemeral, and their cache is backed by volatile memory. If a hypervisor crashes, the workload and cache are already gone. LVM's stronger crash and recovery guarantees cannot preserve either one. A storage-agent crash is different: the kernel keeps existing device-mapper devices running, and the agent can rebuild its view from those mappings. New allocations stop until the agent recovers.

I would make that the acceptance test for any specialized replacement: name the exact guarantee removed and the condition that makes it unnecessary. Then test both sides of that condition. Kill the storage agent and require existing devices to keep serving I/O, new allocations to stop, and reconstructed state to match the kernel. Crash the host and require the ephemeral workload to be discarded rather than presented as recoverable. If the workload ever becomes persistent, the argument expires.

"We made it faster" is not enough. "We removed this guarantee because this lifecycle cannot use it" is an engineering claim you can try to break.
