"use client";

import { useEffect, useState } from "react";
import type { AvatarCatalog } from "@/lib/avatar-layers";
import { apiFetch } from "@/lib/api-fetch";

/**
 * Nomi 3B avatar kataloğu — mobil `lib/avatarCatalog` ile aynı akış.
 *
 * Sunucu `/api/config` › `avatar3d` ile kökü söylüyor; boşsa (bugün) katalog
 * yok ve avatarlar 2B maskotla çiziliyor. Doluysa `katalog.json` bir kez
 * iniyor ve katmanlar o kökten okunuyor. Sayfa başına bir istek.
 */
/** `active`: envanterde gösterilen parçalar (`/api/config` › `avatarActive`; null = kısıt yok). */
type State = { base: string; cat: AvatarCatalog; active: ReadonlySet<string> | null } | null;
let state: State = null;
let started = false;
const subs = new Set<() => void>();

async function load() {
  if (started) return;
  started = true;
  try {
    const cfg = (await (await apiFetch("/api/config")).json()) as { avatar3d?: unknown; avatarActive?: unknown };
    const base = typeof cfg.avatar3d === "string" && /^https?:\/\//.test(cfg.avatar3d) ? cfg.avatar3d : null;
    if (!base) return;
    const res = await fetch(`${base}/katalog.json`, { signal: AbortSignal.timeout(10_000) });
    if (!res.ok) return;
    const cat = (await res.json()) as AvatarCatalog;
    if (!Array.isArray(cat?.parcalar)) return;
    const active = Array.isArray(cfg.avatarActive) ? new Set(cfg.avatarActive.filter((x): x is string => typeof x === "string")) : null;
    state = { base, cat, active };
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
