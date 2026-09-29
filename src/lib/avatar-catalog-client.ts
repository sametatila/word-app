"use client";

import { createContext, createElement, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { AvatarCatalog } from "@/lib/avatar-layers";
import { apiFetch } from "@/lib/api-fetch";

/**
 * Nomi 3B avatar kataloğu (web) — TEK ÇİZİM 3B (2026-09-29).
 *
 * Katalog SAYFAYLA geliyor: uygulama düzeni ve davet sayfası sunucuda
 * `katalog.json`u okuyup `AvatarCatalogProvider` ile veriyor
 * (`lib/avatar-items` `avatarCatalogSeed`). Önceden istemci kataloğu iki
 * istekle (`/api/config`, `katalog.json`) sonradan indiriyordu ve o arada
 * eski 2B maskot çiziliyordu: hızlı yenilemede görünüyordu. 2B yol silindi.
 *
 * Sağlayıcının dışında (yok denecek kadar az) eski yol yedek olarak duruyor:
 * katalog gelene kadar avatar yerinde boş bir daire çizilir, 2B değil.
 * Mobil karşılığı `lib/avatarCatalog` (cihazda saklanan kopya).
 */
/** `active`: envanterde gösterilen parçalar (`avatarActive`; null = kısıt yok). */
export type AvatarCatalogState = { base: string; cat: AvatarCatalog; active: ReadonlySet<string> | null };
type Seed = { base: string; cat: AvatarCatalog; active: string[] | null } | null;

const Ctx = createContext<AvatarCatalogState | null>(null);

/** Sunucunun verdiği katalogla alt ağacı besler (ilk karede hazır). */
export function AvatarCatalogProvider({ seed, children }: { seed: Seed; children: ReactNode }) {
  const value = useMemo(() => (seed ? { base: seed.base, cat: seed.cat, active: seed.active ? new Set(seed.active) : null } : null), [seed]);
  return createElement(Ctx.Provider, { value }, children);
}

let state: AvatarCatalogState | null = null;
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
    /* katalog gelmezse avatar yerinde boş daire */
  }
}

export function useAvatarCatalog(): AvatarCatalogState | null {
  const seeded = useContext(Ctx);
  const [, bump] = useState(0);
  useEffect(() => {
    if (seeded) return;
    const f = () => bump((x) => x + 1);
    subs.add(f);
    void load();
    return () => { subs.delete(f); };
  }, [seeded]);
  return seeded ?? state;
}
