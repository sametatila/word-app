import React, { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { t } from "../lib/i18n";
import { useAuth } from "../lib/AuthContext";
import { track } from "../lib/track";
import { GuestAccountCard } from "./GuestAccountCard";
import { AchievementsIcon, ConversationIcon, StreakIcon } from "./icons";

/**
 * MİSAFİRE KİLOMETRE TAŞINDA HESAP ÇAĞRISI — her taşta BİR KEZ.
 *
 * Çağrı eskiden hep aynı yerlerde duruyordu (Öğren satırı, Profil kartı,
 * kilitli özellikler): kullanıcı onu kaybedecek bir şeyi yokken görüyordu.
 * Hesap açtıran an, kaybedilecek bir şeyin OLDUĞU an — ilk konuşma bitti, seri
 * üç güne çıktı, ilk sınav geçildi. Her sonuç ekranına koymak ise çağrıyı
 * gürültüye çevirirdi; bu yüzden her taş cihazda bir kez gösteriliyor.
 *
 * Gösterildiği an ölçülüyor (`guest_nudge`, kind = taş); hesaba geçiş
 * `guest_upgrade` ile yazılıyor, huni ikisinden okunuyor.
 */
export type GuestMilestone = "first_conversation" | "streak_3" | "exam_passed";

/** Misafire özgü cihaz anahtarı; misafir silinince tüm depo zaten temizleniyor. */
const GUEST_MILESTONES_KEY = "lernomi:guest-milestones";

const COPY: Record<GuestMilestone, { title: string; body: string; icon: typeof ConversationIcon }> = {
  first_conversation: { title: "guest.ms_first_conversation_title", body: "guest.ms_first_conversation_body", icon: ConversationIcon },
  streak_3: { title: "guest.ms_streak_title", body: "guest.ms_streak_body", icon: StreakIcon },
  exam_passed: { title: "guest.ms_exam_title", body: "guest.ms_exam_body", icon: AchievementsIcon },
};

/*
 * GÖRÜLENLER BELLEKTE (misafir başına). Kart depo okunduktan SONRA beliriyordu:
 * sonuç ekranı çizildikten bir an sonra araya girip altındaki kartları ve
 * notları aşağı itiyordu (QA F-0070 sınıfı). Liste oturum belli olunca okunuyor
 * (`App` → `primeGuestMilestones`); kart böylece ilk çizimde karar veriyor.
 * Kimlik tutuluyor: misafir silinip yenisi açılınca depo temizleniyor, eski
 * liste yeni misafire taşınmasın. Bellek hazır değilse eski yol (depodan oku).
 */
let seenCache: { uid: string; seen: string[] } | null = null;

async function readSeen(): Promise<string[]> {
  try {
    const v = JSON.parse((await AsyncStorage.getItem(GUEST_MILESTONES_KEY)) ?? "[]") as unknown;
    return Array.isArray(v) ? (v as string[]) : [];
  } catch { return []; /* bozuk kayıt: görülmemiş say */ }
}

export async function primeGuestMilestones(uid: string): Promise<void> {
  const seen = await readSeen();
  seenCache = { uid, seen };
}

export function GuestMilestoneCard({ milestone, when = true }: { milestone: GuestMilestone; when?: boolean }) {
  const user = useAuth().user;
  const guest = Boolean(user?.guest);
  const uid = user?.id ?? null;
  /* Bellek hazırsa karar İLK ÇİZİMDE: kart sonradan araya girmiyor. */
  const [show, setShow] = useState(() => Boolean(guest && when && uid && seenCache?.uid === uid && !seenCache.seen.includes(milestone)));
  const marked = useRef(false);

  useEffect(() => {
    if (!guest || !when || !uid || marked.current) return;
    let alive = true;
    (async () => {
      const cached = seenCache?.uid === uid ? seenCache.seen : null;
      const seen = show ? (cached ?? []) : (cached ?? (await readSeen()));
      if (!show && seen.includes(milestone)) return;
      marked.current = true;
      const next = seen.includes(milestone) ? seen : [...seen, milestone];
      seenCache = { uid, seen: next };
      try { await AsyncStorage.setItem(GUEST_MILESTONES_KEY, JSON.stringify(next)); } catch { /* depo kapalı: yine göster */ }
      if (!alive && !show) return;
      if (!show) setShow(true);
      track("guest_nudge", 0, milestone);
    })();
    return () => { alive = false; };
  }, [guest, when, uid, milestone, show]);

  if (!guest || !show) return null;
  const c = COPY[milestone];
  return <GuestAccountCard icon={c.icon} title={t(c.title)} text={t(c.body)} />;
}
