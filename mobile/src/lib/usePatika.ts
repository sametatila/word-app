import { useEffect, useState } from "react";
import { api } from "../api/client";
import { useAuth } from "./AuthContext";

/** Patika (immersion) hub'ı — gerçek track, kullanıcının ilerlemesiyle. */
export type PatikaItem = { id: string; kind: string; title: string; titleTr: string | null; playable: boolean; done: boolean };
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

/** Oturum açıksa gerçek Patika'yı getirir; misafir/hata → null (demo'ya düşülür). */
export function usePatika(): { data: Patika | null; loading: boolean } {
  const { user } = useAuth();
  const [data, setData] = useState<Patika | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) { setData(null); return; }
    let alive = true;
    setLoading(true);
    api<Patika>("/api/immersion")
      .then((d) => { if (alive && d?.units) setData(d); })
      .catch(() => { if (alive) setData(null); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [user]);

  return { data, loading };
}
