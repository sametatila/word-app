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
  /** Tamamlandı mı (beceride skor ≥ eşik) — yalnız playable item için anlamlı. */
  done: boolean;
  /** Bir kez oynandı mı — puanı yetmese bile. */
  attempted: boolean;
  /**
   * Şu an açılabilir mi.
   *
   * Kapı USTALIĞA değil İLERLEMEYE bağlı: biten ve denenen her öğe açık, artı
   * SIRADAKİ tek öğe. Daha sonrakiler kapalı — yani öğrenci ilerledikçe pencere
   * kendiliğinden kayıyor.
   *
   * Önceden yalnız `done` (skor ≥ 70) sayılıyordu ve patikada tek bir "sıradaki"
   * bağlantısı vardı: bir beceriden 70 alamayan öğrenci o beceride SONSUZA DEK
   * takılıyordu, çünkü hiçbir şey onu "bitmiş" yapmıyordu. Bir egzersizi
   * anlayıp geçememek, sıradakini hiç görememek anlamına gelmemeli.
   */
  open: boolean;
};

export type UnitState = {
  unit: ImmersionUnit;
  /** Önceki ünite tamamlanmadıysa kilitli. */
  locked: boolean;
  /** Tüm oynanabilir item'lar bitti mi. */
  complete: boolean;
  /** Biten oynanabilir item sayısı (dersler + zenginleştirme, gösterim için). */
  done: number;
  /** Toplam oynanabilir item sayısı (gösterim için). */
  total: number;
  /** Biten ders item'ı — GATING ölçütü (iskelet). */
  lessonsDone: number;
  /** Toplam ders item'ı (iskelet). */
  lessonsTotal: number;
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
  /**
   * "Denendi" — kayıt var ama puan yetmemiş olabilir. Kapı bunu kullanıyor;
   * `*Done` ise ünite tamamlanması ve gösterimde kalıyor.
   *
   * İsteğe bağlı: eski çağıranlar (testler, eski adaptör) vermezse davranış
   * bitmiş-öğeye düşer, yani eski hâl.
   */
  lessonAttempted?: (ref: string) => boolean;
  skillAttempted?: (ref: string) => boolean;
};

function itemDone(it: ImmersionItem, c: Completion): boolean {
  if (it.ref === null) return false;
  if (it.kind === "lesson") return c.lessonDone(it.ref);
  if (it.kind === "read" || it.kind === "listen" || it.kind === "write") return c.skillDone(it.ref);
  return false; // grammar/quiz/checkpoint bugün ref taşımaz (placeholder)
}

function itemAttempted(it: ImmersionItem, c: Completion): boolean {
  if (it.ref === null) return false;
  if (it.kind === "lesson") return c.lessonAttempted?.(it.ref) ?? false;
  if (it.kind === "read" || it.kind === "listen" || it.kind === "write") return c.skillAttempted?.(it.ref) ?? false;
  return false;
}

export function buildTrackState(track: ImmersionTrack, c: Completion): TrackState {
  const units: UnitState[] = [];
  let prevComplete = true; // ilk ünite daima kilitsiz
  let currentIndex = -1;

  for (const unit of track.units) {
    const locked = !prevComplete;
    const items: ItemState[] = unit.items.map((item) => {
      const done = itemDone(item, c);
      return {
        item,
        playable: item.ref !== null,
        done,
        attempted: done || itemAttempted(item, c),
        open: false,
      };
    });
    // Kayan pencere: biten/denenen her öğe açık, artı ilk denenmemiş olan.
    // Yer tutucular (içeriği olmayan) ne açılır ne de sırayı harcar — yoksa
    // henüz yazılmamış bir gramer adımı patikayı kapatırdı.
    let siradakiVerildi = false;
    for (const s of items) {
      if (locked || !s.playable) continue;
      /*
        PRATİK ÖĞELER SIRAYI HARCAMAZ — yer tutucularla aynı gerekçe.

        Gramer/quiz/kontrol noktası ilerleme kaydı TUTMUYOR (itemDone ve
        itemAttempted onlara daima false döndürür; bkz. yukarısı). Pencerenin
        "sıradaki" yuvasını almalarına izin verilince pencere orada park
        ediyordu: quiz açılıyor, arkasındaki kontrol noktası sonsuza kadar
        kapalı kalıyordu — çünkü quiz'in denenmiş sayılmasının bir yolu yok.
        Ölçüldü: ünitenin tüm dersi ve becerisi bitmiş kullanıcıda bile
        kontrol noktası HİÇBİR ünitede açılmıyordu (gramer yazılmış ünitede
        quiz de açılmıyordu).

        Doğrusu: bunlar kapı değil pratik. Ünitedeki bütün kayıt tutan adımlar
        denendiyse (yani pencere hâlâ kimseye verilmediyse) açılırlar; bir
        adım eksikse kapalı kalırlar. Sırayı ise hiç harcamazlar.
      */
      const kayitTutar =
        s.item.kind === "lesson" || s.item.kind === "read" || s.item.kind === "listen" || s.item.kind === "write";
      if (!kayitTutar) { s.open = !siradakiVerildi; continue; }
      if (s.attempted) { s.open = true; continue; }
      if (!siradakiVerildi) { s.open = true; siradakiVerildi = true; }
    }
    const playable = items.filter((i) => i.playable);
    // total/done = TAMAMLANABİLİR item'lar (ders + beceri). quiz/checkpoint
    // ünite brief'inden türetilen PRATİK: oynanabilir ama done-takibi yok (v1),
    // sayıma girmez — yoksa asla-biten-olmayan bir item done===total'ı bozardı.
    const completable = playable.filter(
      (i) => i.item.kind === "lesson" || i.item.kind === "read" || i.item.kind === "listen" || i.item.kind === "write",
    );
    const total = completable.length;
    const done = completable.filter((i) => i.done).length;
    const lessons = completable.filter((i) => i.item.kind === "lesson");
    const lessonsTotal = lessons.length;
    const lessonsDone = lessons.filter((i) => i.done).length;
    // GATING İSKELETE (DERSLERE) BAĞLI — sahibin "lesson = iskelet" kararı.
    // Beceri/gramer/quiz item'ları OPSİYONEL zenginleştirme: ünite açılışını
    // bloklamaz. Gerekçe: bu içerik seyrek ve temaya göre yeniden kuruluyor
    // (bkz. plan §İçerik stratejisi); onları kapı yapmak, tematik olarak
    // rastgele/eksik içeriği zorunlu kılardı. Temalı içerik oturunca kural
    // "tüm item'lar" haline sıkılaştırılabilir. Dersi olmayan ünite (de'de
    // olmaz) tüm-oynanabilir ölçütüne düşer — boş ünite sonrasını kilitlemesin.
    const complete = lessonsTotal > 0 ? lessonsDone === lessonsTotal : total === 0 || done === total;
    units.push({ unit, locked, complete, done, total, lessonsDone, lessonsTotal, items });
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
