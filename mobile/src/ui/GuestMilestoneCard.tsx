import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { t } from "../lib/i18n";
import { useAuth } from "../lib/AuthContext";
import { track } from "../lib/track";
import { GuestAccountCard } from "./GuestAccountCard";
import { FlameIcon, SparkIcon, TrophyIcon } from "./icons";

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

const COPY: Record<GuestMilestone, { title: string; body: string; icon: typeof SparkIcon }> = {
  first_conversation: { title: "guest.ms_first_conversation_title", body: "guest.ms_first_conversation_body", icon: SparkIcon },
  streak_3: { title: "guest.ms_streak_title", body: "guest.ms_streak_body", icon: FlameIcon },
  exam_passed: { title: "guest.ms_exam_title", body: "guest.ms_exam_body", icon: TrophyIcon },
};

export function GuestMilestoneCard({ milestone, when = true }: { milestone: GuestMilestone; when?: boolean }) {
  const guest = Boolean(useAuth().user?.guest);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!guest || !when) return;
    let alive = true;
    (async () => {
      let seen: string[] = [];
      try { seen = JSON.parse((await AsyncStorage.getItem(GUEST_MILESTONES_KEY)) ?? "[]") as string[]; } catch { /* bozuk kayıt: görülmemiş say */ }
      if (!Array.isArray(seen) || seen.includes(milestone)) return;
      try { await AsyncStorage.setItem(GUEST_MILESTONES_KEY, JSON.stringify([...seen, milestone])); } catch { /* depo kapalı: yine göster */ }
      if (!alive) return;
      setShow(true);
      track("guest_nudge", 0, milestone);
    })();
    return () => { alive = false; };
  }, [guest, when, milestone]);

  if (!guest || !show) return null;
  const c = COPY[milestone];
  return <GuestAccountCard icon={c.icon} title={t(c.title)} text={t(c.body)} />;
}
