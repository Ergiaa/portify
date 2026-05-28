type SyncFn = (name: "tiktok" | "instagram" | "youtube") => Promise<void>

let _syncFn: SyncFn | null = null

export function registerSync(fn: SyncFn): void {
  _syncFn = fn
}

export function getSyncFn(): SyncFn | null {
  return _syncFn
}
