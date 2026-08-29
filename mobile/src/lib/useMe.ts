import { useEffect, useState } from "react";
import { api } from "../api/client";
import { useAuth } from "./AuthContext";

/** /api/me özeti — ana ekran ve profilin gösterdiği gerçek sayılar. */
export type Me = {
  name: string | null;
  level: string;
  course: string;
  streak: number;
  longestStreak: number;
  xp: number;
  dailyGoal: number;
  mastered: number;
  totalWords: number;
  seconds: number;
};

/**
 * Oturum açıksa gerçek özeti getirir; misafirde ya da hata olduğunda null döner
 * (ekranlar o zaman demo değerlere düşer). Hata YUTULUR — ölçüm/özet
 * kullanıcının önüne geçmemeli, en fazla demo görünür.
 */
export function useMe(): { me: Me | null; loading: boolean } {
  const { user } = useAuth();
  const [me, setMe] = useState<Me | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) { setMe(null); return; }
    let alive = true;
    setLoading(true);
    api<Me>("/api/me")
      .then((d) => { if (alive) setMe(d); })
      .catch(() => { if (alive) setMe(null); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [user]);

  return { me, loading };
}

/** Saniyeyi "Xs Ydk" / "Ydk" biçimine getirir (süre metresi). */
export function formatDuration(seconds: number): string {
  const m = Math.round(seconds / 60);
  if (m < 60) return `${m} dk`;
  const h = Math.floor(m / 60);
  return `${h}s ${m % 60}dk`;
}

/** XP'yi kısaltır: 1240 → "1.2k". */
export function formatXp(xp: number): string {
  if (xp < 1000) return String(xp);
  return `${(xp / 1000).toFixed(1).replace(/\.0$/, "")}k`;
}
