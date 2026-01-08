import si from "systeminformation";

export async function getMemorySnapshot() {
  const mem = await si.mem();
  return {
    totalBytes: mem.total,
    freeBytes: mem.free,
    usedBytes: mem.used,
  };
}
