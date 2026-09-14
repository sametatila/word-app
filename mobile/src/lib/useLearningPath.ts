import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { api } from "../api/client";
import { useAuth } from "./AuthContext";
import { useMe } from "./useMe";
import { buildLocalLearningPath, refIndex } from "../game/immersionTrack";
import { getDoneItems } from "../game/lessonProgress";

/** Pratik adım — içeriği ünitenin derslerinden türetilen, kaydı öğe kimliğiyle tutulan. */
export const isPracticeKind = (kind: string): boolean => kind === "grammar" || kind === "quiz" || kind === "checkpoint";

/** Patika (immersion) hub'ı — gerçek track, kullanıcının ilerlemesiyle. */
export type LearningPathItem = {
  id: string;
  kind: string;
  title: string;
  titleTr: string | null;
  playable: boolean;
  /** Skor eşiğini geçti mi. */
  done: boolean;
  /** Bir kez oynandı mı — puanı yetmese bile (sunucu yolu). */
  attempted?: boolean;
  /**
   * Açılabilir mi: biten + denenen + SIRADAKİ tek öğe.
   *
   * Kapı ustalığa değil ilerlemeye bağlı — bir beceriden geçer not alamayan
   * öğrenci orada sonsuza dek takılmamalı. Sunucu hesaplar; yerel patikada
   * ilerleme bilgisi olmadığı için hepsi açık (bkz. buildLocalLearningPath).
   * Alan yoksa (eski sunucu) açık sayılır — kilitli göstermek daha kötü.
   */
  open?: boolean;
  ref?: string | null;
};

/** Öğe şu an açılabilir mi — alan yoksa açık sayılır. */
export const itemOpen = (i: LearningPathItem): boolean => i.open !== false;
export type LearningPathUnit = {
  id: string;
  index: number;
  group: number;
  theme: string;
  /** Temanın modülü (0 tabanlı) — Patika kartları bununla gruplanıyor. */
  moduleIndex: number;
  /** Derslerin başlıkları (hedef dilde) — kartı ayırt eden ad. */
  topics: string[];
  locked: boolean;
  complete: boolean;
  done: number;
  total: number;
  lessonsDone: number;
  lessonsTotal: number;
  items: LearningPathItem[];
};
export type LearningPath = { level: string; units: LearningPathUnit[]; currentIndex: number; doneUnits: number; totalUnits: number };

/**
 * PATİKA TEK KAYNAKTAN, ODAĞA GELİNCE TAZE.
 *
 * Eskiden her ekran kendi isteğini atıyordu ve istek yalnız kullanıcı ya da
 * seviye değişince yenileniyordu. Patika sekmesi sürekli ayakta kaldığı için
 * bir adımı bitirip geri dönen öğrenci ESKİ durumu görüyordu: sunucu kaydı
 * almıştı ama ekran "tamamlanmadı" diyordu. Ünite ekranı da veriyi gezinme
 * parametresi olarak, açıldığı andaki kopyadan okuyordu — o da hiç
 * tazelenmiyordu.
 *
 * Artık tek bir depo var: hangi ekran odaklanırsa istek atılıyor, sonuç
 * iki ekrana birden yayılıyor. Aynı anda ikinci istek atılmıyor.
 */
type PathState = { data: LearningPath | null; source: "api" | "local" | null; loading: boolean };
let pathState: PathState = { data: null, source: null, loading: false };
const dinleyiciler = new Set<(s: PathState) => void>();
let bekleyen: Promise<void> | null = null;

function yay(next: Partial<PathState>) {
  pathState = { ...pathState, ...next };
  for (const d of dinleyiciler) d(pathState);
}

/**
 * Sunucudan gelen patikaya CİHAZDAKİ işaretleri ekler.
 *
 * Pratik adım (tekrar, kontrol noktası, dil bilgisi) çevrimdışı bitirildiyse
 * sonucu kuyrukta bekliyor; sunucu onu henüz bilmiyor. Ekran o arada adımı
 * bitmemiş gösterirse öğrenci aynı şeyi ikinci kez yapar.
 */
function yerelIsaretleriEkle(d: LearningPath, done: Set<string>): LearningPath {
  return {
    ...d,
    units: d.units.map((u) => {
      const items = u.items.map((it) => (isPracticeKind(it.kind) && done.has(it.id) && !it.done ? { ...it, done: true, attempted: true, open: true } : it));
      const sayilan = items.filter((i) => i.playable);
      const bitti = sayilan.filter((i) => i.done).length;
      return { ...u, items, done: Math.max(u.done, bitti), complete: u.complete || (sayilan.length > 0 && bitti === sayilan.length) };
    }),
  };
}

async function yukle(level: string | undefined): Promise<void> {
  yay({ loading: true });
  try {
    const d = await api<LearningPath>("/api/immersion");
    if (!d?.units?.length) throw new Error("empty");
    // /api/immersion item ref taşımıyor → oynatıcıya gidebilmek için pakete
    // gömülü aynı-kaynak track'ten ref doldur (item id'leri birebir eşleşir).
    const idx = refIndex(d.level);
    const enriched: LearningPath = {
      ...d,
      units: d.units.map((u) => ({
        ...u,
        // Eski sunucu bu iki alanı göndermiyordu: yerel kurulumdan tamamlanıyor.
        moduleIndex: u.moduleIndex ?? Math.floor(((u.index - 1) * 4) / 10),
        topics: u.topics ?? [],
        items: u.items.map((it) => ({ ...it, ref: it.ref ?? idx.get(it.id) ?? null })),
      })),
    };
    yay({ data: yerelIsaretleriEkle(enriched, await getDoneItems()), source: "api" });
  } catch {
    // /api/immersion canlı değil → cihazda kur. Seviye gelene kadar bekle
    // ki A2 kullanıcıya A1 gösterilmesin.
    if (!level) { if (!pathState.data) yay({ data: null, source: null }); return; }
    const lv = /^[ABC][12]$/.test(level) ? level : "A1";
    const done = await getDoneItems();
    yay({ data: buildLocalLearningPath(lv, done), source: "local" });
  } finally {
    yay({ loading: false });
  }
}

/** Patikayı yeniden ister — adım bitince ya da ekran odağa gelince. */
export function refreshLearningPath(level?: string): Promise<void> {
  if (!bekleyen) bekleyen = yukle(level).finally(() => { bekleyen = null; });
  return bekleyen;
}

/** Oturum kapanınca eski kullanıcının patikası bir sonrakine görünmesin. */
export function clearLearningPath(): void {
  yay({ data: null, source: null, loading: false });
}

/**
 * Patika'yı getirir. Önce /api/immersion (gerçek gating + beceri içeriği);
 * canlı değilse (404) CİHAZDA kurulan track'e düşer — gerçek seviye (profil),
 * gerçek ~25 ünite, gerçek ders içeriği, yerel ders ilerlemesi.
 *
 * Ekran her odağa geldiğinde tazeleniyor (bkz. yukarıdaki depo notu).
 */
export function useLearningPath(): { data: LearningPath | null; loading: boolean; source: "api" | "local" | null } {
  const { user } = useAuth();
  const { me } = useMe();
  const [state, setState] = useState<PathState>(pathState);
  const level = me?.level;

  useEffect(() => {
    dinleyiciler.add(setState);
    setState(pathState);
    return () => { dinleyiciler.delete(setState); };
  }, []);

  useEffect(() => {
    if (!user) clearLearningPath();
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      if (user) void refreshLearningPath(level);
    }, [user, level]),
  );

  return { data: user ? state.data : null, loading: state.loading, source: user ? state.source : null };
}
