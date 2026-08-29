import { useEffect, useState } from "react";
import { api } from "../api/client";
import { useAuth } from "./AuthContext";
import { useMe } from "./useMe";
import { buildLocalPatika } from "../game/immersionTrack";
import { getDoneItems } from "../game/lessonProgress";

/** Patika (immersion) hub'ı — gerçek track, kullanıcının ilerlemesiyle. */
export type PatikaItem = { id: string; kind: string; title: string; titleTr: string | null; playable: boolean; done: boolean; ref?: string | null };
export type PatikaUnit = {
  id: string;
  index: number;
  group: number;
  theme: string;
  locked: boolean;
  complete: boolean;
  done: number;
  total: number;
  lessonsDone: number;
  lessonsTotal: number;
  items: PatikaItem[];
};
export type Patika = { level: string; units: PatikaUnit[]; currentIndex: number; doneUnits: number; totalUnits: number };

/**
 * Patika'yı getirir. Önce /api/immersion (gerçek gating + beceri içeriği);
 * canlı değilse (404) CİHAZDA kurulan track'e düşer — gerçek seviye (profil),
 * gerçek ~25 ünite, gerçek ders içeriği, yerel ders ilerlemesi. Böylece push
 * beklemeden doğru yapı görünür; sahte A1/4-ünite demosu kalkar.
 */
export function usePatika(): { data: Patika | null; loading: boolean; source: "api" | "local" | null } {
  const { user } = useAuth();
  const { me } = useMe();
  const [data, setData] = useState<Patika | null>(null);
  const [source, setSource] = useState<"api" | "local" | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) { setData(null); setSource(null); return; }
    let alive = true;
    setLoading(true);
    api<Patika>("/api/immersion")
      .then((d) => {
        if (!alive) return;
        if (d?.units?.length) { setData(d); setSource("api"); }
        else throw new Error("empty");
      })
      .catch(async () => {
        // /api/immersion canlı değil → cihazda kur. Seviye gelene kadar bekle
        // ki A2 kullanıcıya A1 gösterilmesin.
        if (!alive) return;
        if (!me?.level) { setData(null); setSource(null); return; }
        const level = /^[ABC][12]$/.test(me.level) ? me.level : "A1";
        const done = await getDoneItems();
        if (alive) { setData(buildLocalPatika(level, done)); setSource("local"); }
      })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [user, me?.level]);

  return { data, loading, source };
}
