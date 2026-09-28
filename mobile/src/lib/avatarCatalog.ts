import { useEffect, useState } from "react";
import { fetchServerConfig } from "./serverConfig";
import type { AvatarCatalog } from "./avatarLayers";

/**
 * Nomi 3B avatar kataloğu — web `lib/avatar-catalog-client` ile aynı akış.
 *
 * Sunucu `/api/config` › `avatar3d` ile kökü söylüyor; boşsa (bugün) katalog
 * yok ve avatarlar 2B maskotla çiziliyor. Doluysa `katalog.json` bir kez
 * iniyor ve katmanlar o kökten okunuyor. Süreç başına bir istek.
 */
type State = { base: string; cat: AvatarCatalog } | null;
let state: State = null;
let started = false;
const subs = new Set<() => void>();

async function load() {
  if (started) return;
  started = true;
  try {
    const cfg = await fetchServerConfig();
    if (!cfg.avatar3d) return;
    const res = await fetch(`${cfg.avatar3d}/katalog.json`, { signal: AbortSignal.timeout(10_000) });
    if (!res.ok) return;
    const cat = (await res.json()) as AvatarCatalog;
    if (!Array.isArray(cat?.parcalar)) return;
    state = { base: cfg.avatar3d, cat };
    subs.forEach((f) => f());
  } catch {
    /* katalog yoksa 2B maskot */
  }
}

export function useAvatarCatalog(): State {
  const [, bump] = useState(0);
  useEffect(() => {
    const f = () => bump((x) => x + 1);
    subs.add(f);
    void load();
    return () => { subs.delete(f); };
  }, []);
  return state;
}
