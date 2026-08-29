import { useEffect, useState } from "react";
import { api } from "../api/client";
import { useAuth } from "./AuthContext";
import { todayStr } from "../game/session";

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

/** /api/session meta'sının okuduğumuz alt kümesi (özet ucu deploy değilse kaynak). */
type SessionMetaLite = {
  displayName: string | null;
  level: string;
  currentStreak: number;
  totalXp: number;
  dailyGoal: number;
  coverage?: { mastered: number; total: number };
};

/**
 * Oturum açıksa gerçek özeti getirir; misafirde null döner (ekranlar demo'ya düşer).
 *
 * ÖNEMLİ: /api/me henüz canlıya alınmadıysa (404) DEMO'YA DÜŞMEYİZ — aynı gerçek
 * sayılar /api/session meta'sında da var (Neon'dan: seri, XP, seviye, isim,
 * pekişen/toplam kelime). Böylece ana ekran push beklemeden gerçek veriyle dolar.
 * Hata her iki uçta da yutulur; en fazla demo görünür, kullanıcının önüne geçmez.
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
      .catch(async () => {
        // /api/me yok (404) → gerçek veriyi session meta'sından türet.
        try {
          const s = await api<{ meta: SessionMetaLite }>(`/api/session?day=${todayStr()}`);
          const m = s.meta;
          if (alive && m) {
            setMe({
              name: m.displayName,
              level: m.level,
              course: "de",
              streak: m.currentStreak,
              longestStreak: m.currentStreak,
              xp: m.totalXp,
              dailyGoal: m.dailyGoal,
              mastered: m.coverage?.mastered ?? 0,
              totalWords: m.coverage?.total ?? 0,
              seconds: 0,
            });
          } else if (alive) {
            setMe(null);
          }
        } catch {
          if (alive) setMe(null);
        }
      })
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
