import React, { useCallback, useEffect, useRef, useState } from "react";
import { Modal, View, Pressable } from "react-native";
import { t } from "../lib/i18n";
import { Text } from "./Text";
import { AchievementIcon } from "./achievementIcon";
import { Celebrate } from "./Celebrate";
import { api } from "../api/client";
import { useAuth } from "../lib/AuthContext";
import { useStatsBump } from "../lib/statsSignal";
import { navigationRef } from "../lib/pushRoute";
import { track } from "../lib/track";
import type { Achievement, Tier } from "../data/achievements";
import { useTheme, spacing, radii, softShadow, TIER_COLOR } from "../theme";

/**
 * Rozet açılış kutlaması — mobilde HİÇ YOKTU.
 *
 * Kullanıcı rozeti ancak Başarılar ekranına giderek görüyordu; açıldığı AN
 * hiçbir yerde söylenmiyordu. Web bunu baştan beri kutluyor
 * (`components/achievement-unlock`) ve kutlamanın tek varlık sebebi o an.
 *
 * Web gibi TEK YERDE duruyor: uygulamanın kökünde. Rozetin kazanılabileceği
 * yer çok (kelime turu, ders, beceri, görev ödülü, günün turu, patron) ve
 * altısına ayrı kutlama koymak altı yerde unutulabilecek bir şey demek.
 * Tetikleyici de web ile aynı fikirde: XP değiştiyse bir şey KAZANILMIŞ
 * demektir — webde `lernomi:stats` olayı, mobilde `statsSignal` (§11.70).
 *
 * Webin üç kuralı burada da geçerli:
 *
 * 1. **Oyunun ortasını kesmiyor.** Web oyun ekranından "meşgul" sinyali
 *    alıyor; mobilde sinyale gerek yok, GEZGİN zaten söylüyor: akış ekranları
 *    kök yığında ayrı ekranlar. Aşağıdaki liste onları sayıyor, o ekranlardan
 *    biri açıkken kutlama bekliyor. Sinyal yerine rotaya bakmak, sinyali
 *    göndermeyi unutan bir ekranın kutlamayı ortada patlatmasını da önlüyor.
 * 2. **Toplu açılış tek kart.** Rozetler geriye dönük hesaplandığı için ilk
 *    açılışta on rozet birden gelebiliyor; tek tek göstermek slayt gösterisi
 *    olurdu.
 * 3. **Her zaman kapatılabilir** ve bunu söyleyen bir satır var.
 *
 * "Görüldü" işareti kutlama EKRANA KONDUĞUNDA atılıyor, kontrol anında değil:
 * gösterilmemiş bir kutlama görülmüş sayılmamalı. Web'de aynı kusur bir kez
 * yaşandı ve orada da böyle çözüldü.
 */

/** Akış ekranları — biri açıkken kutlama bekler (webin `lernomi:busy` karşılığı). */
const BUSY_ROUTES = new Set([
  "Game", "Lesson", "Quiz", "Item", "Walk", "Boss", "Daily", "Weekly",
  "Exam", "MockExam", "Placement", "FirstPractice",
]);

/** Tek tek gösterilecek en fazla rozet; üstü toplu karta düşer. */
const MAX_SOLO = 2;
/** Tek rozetin ekranda kalma süresi. */
const SOLO_MS = 2600;
/** Toplu kartın ekranda kalma süresi — daha çok okunacak şey var. */
const BATCH_MS = 5000;
/** Toplu kartta gösterilen rozet sayısı; gerisi sayı olarak söyleniyor. */
const BATCH_SHOWN = 8;
/** İlk bakış gecikmesi: açılışta ağ zaten oturum ve özet isteğiyle meşgul. */
const FIRST_MS = 1600;
/** Bir turda birden çok bump gelebiliyor; son bumpın üstüne bir kez bakılıyor. */
const DEBOUNCE_MS = 1200;

const TIER_LABEL_KEY: Record<Tier, string> = {
  bronze: "tier.bronze",
  silver: "tier.silver",
  gold: "tier.gold",
  legend: "tier.legend",
};

/** Kademesi yüksek olan önce: "İlk kıvılcım" ile "Yüz gün" aynı anda açıldıysa büyük olan başta. */
const TIER_RANK: Record<string, number> = { legend: 0, gold: 1, silver: 2, bronze: 3 };

type Celebration = { kind: "solo"; queue: Achievement[] } | { kind: "batch"; items: Achievement[] } | null;

function busyNow(): boolean {
  try {
    if (!navigationRef.isReady()) return false;
    return BUSY_ROUTES.has(navigationRef.getCurrentRoute()?.name ?? "");
  } catch {
    return false;
  }
}

function Badge({ a, size }: { a: Achievement; size: number }) {
  const tc = TIER_COLOR[a.tier] ?? TIER_COLOR.legend;
  return (
    <View style={[{ width: size, height: size, borderRadius: size / 2, alignItems: "center", justifyContent: "center", backgroundColor: tc }, softShadow(tc, 8)]}>
      <AchievementIcon name={a.icon} color="#fff" size={Math.round(size * 0.52)} />
    </View>
  );
}

export function AchievementUnlock() {
  const { colors } = useTheme();
  const { user } = useAuth();
  const bump = useStatsBump();
  const [view, setView] = useState<Celebration>(null);
  /** Meşgulken beklemeye alınanlar — işaretlenmeden bekliyorlar. */
  const held = useRef<Achievement[] | null>(null);
  const running = useRef(false);

  const present = useCallback((fresh: Achievement[]) => {
    const sorted = [...fresh].sort((a, b) => (TIER_RANK[a.tier] ?? 9) - (TIER_RANK[b.tier] ?? 9));
    setView(sorted.length > MAX_SOLO ? { kind: "batch", items: sorted } : { kind: "solo", queue: sorted });
    track("achievement_unlock", sorted.length);
    /* Ekrana konanların hepsi görüldü sayılıyor — toplu kartta sığmayan da
       dahil, çünkü sayısı kartta yazıyor ve kendileri duvarda açık duruyor. */
    void api("/api/achievements", {
      method: "POST",
      body: JSON.stringify({ seen: sorted.map((f) => f.id) }),
    }).catch(() => {});
  }, []);

  const check = useCallback(async () => {
    if (running.current || !user) return;
    running.current = true;
    try {
      const data = await api<{ fresh?: Achievement[] }>("/api/achievements");
      const fresh = Array.isArray(data?.fresh) ? data.fresh : [];
      if (!fresh.length) return;
      if (busyNow()) {
        const known = new Set((held.current ?? []).map((f) => f.id));
        held.current = [...(held.current ?? []), ...fresh.filter((f) => !known.has(f.id))];
      } else {
        present(fresh);
      }
    } catch {
      /* rozet kontrolü başarısızsa hiçbir şey olmaz */
    } finally {
      running.current = false;
    }
  }, [user, present]);

  /* Açılışta bir kez, sonra her XP hareketinde (geciktirilerek). */
  useEffect(() => {
    if (!user) return;
    const ms = bump === 0 ? FIRST_MS : DEBOUNCE_MS;
    const id = setTimeout(() => void check(), ms);
    return () => clearTimeout(id);
  }, [user, bump, check]);

  /* Akış ekranı kapanınca bekleyenler patlıyor. Gezgin durumu dinleniyor;
     `state` olayı her ekran geçişinde bir kez geliyor. */
  useEffect(() => {
    if (!navigationRef.isReady?.()) return;
    const off = navigationRef.addListener("state", () => {
      if (busyNow() || !held.current?.length) return;
      const pending = held.current;
      held.current = null;
      present(pending);
    });
    return off;
  }, [present]);

  const advance = useCallback(() => {
    setView((v) => {
      if (!v || v.kind === "batch") return null;
      const rest = v.queue.slice(1);
      return rest.length ? { kind: "solo", queue: rest } : null;
    });
  }, []);

  const shownId = view?.kind === "solo" ? view.queue[0]?.id : view?.kind === "batch" ? "batch" : null;

  useEffect(() => {
    if (!shownId) return;
    const id = setTimeout(advance, shownId === "batch" ? BATCH_MS : SOLO_MS);
    return () => clearTimeout(id);
  }, [shownId, advance]);

  if (!view) return null;
  const batch = view.kind === "batch";
  const solo = view.kind === "solo" ? view.queue[0] : null;

  return (
    <Modal transparent visible animationType="fade" onRequestClose={advance} statusBarTranslucent>
      <Pressable onPress={advance} style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: spacing.xl, backgroundColor: "rgba(0,0,0,0.55)" }}>
        <Celebrate show />
        <View style={[{ width: "100%", maxWidth: 380, alignItems: "center", backgroundColor: colors.surface, borderRadius: radii.xl, borderWidth: 1, borderColor: colors.hairline, paddingVertical: spacing.xl, paddingHorizontal: spacing.lg }, softShadow(colors.text, 18)]}>
          {batch && view.kind === "batch" ? (
            <>
              <Text variant="micro" color={colors.primaryText} style={{ textTransform: "uppercase", letterSpacing: 1.5 }}>
                {t("achu.n_unlocked", { n: view.items.length })}
              </Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: spacing.sm, marginTop: spacing.lg, marginBottom: spacing.md }}>
                {view.items.slice(0, BATCH_SHOWN).map((it) => <Badge key={it.id} a={it} size={52} />)}
              </View>
              {/* Başlıktaki sayı ile gösterilen rozet sayısı ayrışmamalı:
                  "9 rozet açıldı" deyip sekiz tane göstermek, sayının yanlış
                  olduğunu düşündürür. */}
              {view.items.length > BATCH_SHOWN ? (
                <Text variant="caption" color={colors.textMuted} style={{ marginBottom: spacing.sm }}>
                  {t("achu.and_n_more", { n: view.items.length - BATCH_SHOWN })}
                </Text>
              ) : null}
              <Text variant="body" color={colors.textMuted} style={{ textAlign: "center" }}>{t("achu.batch_note")}</Text>
            </>
          ) : solo ? (
            <>
              <Text variant="micro" color={TIER_COLOR[solo.tier] ?? TIER_COLOR.legend} style={{ textTransform: "uppercase", letterSpacing: 1.5 }}>
                {t("achu.tier_unlocked", { tier: t(TIER_LABEL_KEY[solo.tier] ?? "tier.bronze") })}
              </Text>
              <View style={{ marginTop: spacing.lg, marginBottom: spacing.md }}><Badge a={solo} size={92} /></View>
              <Text variant="h2" style={{ textAlign: "center" }}>{solo.title}</Text>
              <Text variant="body" color={colors.textMuted} style={{ marginTop: 4, textAlign: "center" }}>{solo.hint}</Text>
              {view.kind === "solo" && view.queue.length > 1 ? (
                <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.md }}>
                  {t("achu.n_more", { n: view.queue.length - 1 })}
                </Text>
              ) : null}
            </>
          ) : null}
          <Text variant="micro" color={colors.textFaint} style={{ marginTop: spacing.lg }}>{t("achu.tap_to_continue")}</Text>
        </View>
      </Pressable>
    </Modal>
  );
}
