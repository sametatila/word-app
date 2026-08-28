import type { ImmersionItem, ImmersionTrack, ImmersionUnit } from "./types";

/**
 * Gating / ilerleme durumu — SAF katman (bkz. docs/plan/immersion.md §Gating).
 *
 * Depolamadan bağımsız: tamamlanma bilgisini yüklem (predicate) olarak alır,
 * böylece Faz 3 adaptörü userLessons/userSkills satırlarını buraya çevirir ve
 * bu dosya DB'yi hiç tanımaz — test edilebilir kalır.
 *
 * Kural: yer tutucu (ref=null) item'lar OYNANAMAZ ve gating'i BLOKLAMAZ
 * (grammar/quiz/checkpoint içeriği henüz yok; boş içerikle kapı açmak/kapamak
 * yanlış olurdu). Bir ünite, oynanabilir item'larının hepsi bitince tamamlanır;
 * sonraki ünite ancak o zaman açılır. İçerik dolup checkpoint gerçek olunca
 * aynı mantık onları da kapsar (o zaman ref taşıyacaklar).
 */

export type ItemState = {
  item: ImmersionItem;
  /** İçerik kurulu mu (ref var). Placeholder ise false — "yakında". */
  playable: boolean;
  /** Tamamlandı mı — yalnız playable item için anlamlı. */
  done: boolean;
};

export type UnitState = {
  unit: ImmersionUnit;
  /** Önceki ünite tamamlanmadıysa kilitli. */
  locked: boolean;
  /** Tüm oynanabilir item'lar bitti mi. */
  complete: boolean;
  /** Biten oynanabilir item sayısı. */
  done: number;
  /** Toplam oynanabilir item sayısı. */
  total: number;
  items: ItemState[];
};

export type TrackState = {
  track: ImmersionTrack;
  units: UnitState[];
  /** "Şu an buradasın": ilk kilitsiz-ve-tamamlanmamış ünitenin index'i. */
  currentIndex: number;
};

/** Tamamlanma yüklemi — Faz 3 userLessons/userSkills'ten türetir. */
export type Completion = {
  lessonDone: (ref: string) => boolean;
  skillDone: (ref: string) => boolean;
};

function itemDone(it: ImmersionItem, c: Completion): boolean {
  if (it.ref === null) return false;
  if (it.kind === "lesson") return c.lessonDone(it.ref);
  if (it.kind === "read" || it.kind === "listen" || it.kind === "write") return c.skillDone(it.ref);
  return false; // grammar/quiz/checkpoint bugün ref taşımaz (placeholder)
}

export function buildTrackState(track: ImmersionTrack, c: Completion): TrackState {
  const units: UnitState[] = [];
  let prevComplete = true; // ilk ünite daima kilitsiz
  let currentIndex = -1;

  for (const unit of track.units) {
    const items: ItemState[] = unit.items.map((item) => ({
      item,
      playable: item.ref !== null,
      done: itemDone(item, c),
    }));
    const total = items.filter((i) => i.playable).length;
    const done = items.filter((i) => i.playable && i.done).length;
    // Oynanabilir item yoksa ünite kapı olamaz → geçişli (pass-through) sayılır,
    // yoksa boş bir ünite sonraki her şeyi kilitlerdi. de'de olmaz (her ünitede
    // 4 ders), ama kısmi/boş seviyelerde güvenlik valfi.
    const complete = total === 0 || done === total;
    const locked = !prevComplete;
    units.push({ unit, locked, complete, done, total, items });
    if (!locked && !complete && currentIndex < 0) currentIndex = unit.index;
    prevComplete = complete;
  }

  if (currentIndex < 0) currentIndex = track.units.at(-1)?.index ?? 1;
  return { track, units, currentIndex };
}

/** Bir grubun (sayfa) tamamı bitti mi — grup→grup pagination kapısı. */
export function groupComplete(state: TrackState, group: number): boolean {
  const inGroup = state.units.filter((u) => u.unit.group === group);
  return inGroup.length > 0 && inGroup.every((u) => u.complete);
}
