import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { t, dateLocale, formatPercent } from "../lib/i18n";
import { Screen } from "../ui/Screen";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { PressableScale } from "../ui/PressableScale";
import { AppHeader } from "../ui/AppHeader";
import { Skeleton, SkeletonCard, SkeletonLine, textHeight } from "../ui/Skeleton";
import { ReadIcon, ListenIcon, WriteIcon, MicIcon, GrammarIcon, ChevronRightIcon, CheckIcon, LockIcon } from "../ui/icons";
import { FlowNote } from "../ui/flow";
import { fetchSkillAccess, gatedMetaKind, gateNote, isSkillLocked, levelGate, type SkillAccess } from "../lib/skillAccess";
import { refreshPremium, usePremiumStatus } from "../lib/premium";
import { tieredCopy } from "../lib/unlock";
import { UnlockProgress } from "../ui/UnlockProgress";
import { useMe } from "../lib/useMe";
import { ensureSkills, listOwnSkillMeta, type SkillMeta, type SkillKey } from "../data/skills";
import { getDoneItems, getItemScores, syncItemProgress } from "../game/lessonProgress";
import { loadOnboardingPrefs } from "../lib/onboardingPrefs";
import { useTheme, spacing, radii, type Palette } from "../theme";

const LEVELS = ["A1", "A2", "B1", "B2", "C1"] as const;

type Kind = "read" | "listen" | "write" | "speak" | "grammar";
/**
 * BEŞ beceri (2026-09): konuşma ve dil bilgisi Beceriler kütüphanesiyle geldi.
 * Konuşma oynatıcısı ItemScreen'de (söyleyiş drilli cihaz tanıyıcısıyla,
 * monolog metin üzerinden rubrikle), dil bilgisi anlatım + soru.
 */
const SKILLS: { key: SkillKey; kind: Kind; label: string; icon: (p: { color: string; size: number }) => React.ReactElement; tint: keyof Palette }[] = [
  { key: "reading", kind: "read", label: "skills.reading", icon: ReadIcon, tint: "info" },
  { key: "listening", kind: "listen", label: "skills.listening", icon: ListenIcon, tint: "accent" },
  { key: "writing", kind: "write", label: "skills.writing", icon: WriteIcon, tint: "success" },
  { key: "speaking", kind: "speak", label: "skills.speaking", icon: MicIcon, tint: "primary" },
  { key: "grammar", kind: "grammar", label: "skills.grammar", icon: GrammarIcon, tint: "streak" },
];

function ExerciseRow({ ex, tint, done, score, isNext, onPress, colors, last, locked = false }: { ex: SkillMeta; tint: string; done: boolean; score?: number; isNext: boolean; onPress: () => void; colors: Palette; last: boolean; locked?: boolean }) {
  return (
    /* SATIRIN ADI DURUMU DA SÖYLÜYOR. Nokta, onay simgesi ve puan rozeti
       durumu yalnız RENKLE ve simgeyle anlatıyordu; satırın adı ise başlık +
       süreydi. Yani hangi alıştırmanın bitmiş olduğu TalkBack kullanan biri
       için hiç okunamıyordu. Web aynı turda onay simgesine ad verdi. */
    <PressableScale onPress={onPress} accessibilityLabel={`${ex.title}, ${t("skills.dk", { n: ex.minutes })}${done ? `, ${t("common.completed")}` : ""}${locked ? `, ${t("gate.premium_only")}` : ""}`} style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: spacing.md, borderBottomWidth: last ? 0 : 1, borderBottomColor: colors.hairline, opacity: locked ? 0.6 : 1 }}>
      <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: done ? colors.success : tint }} />
      <View style={{ flex: 1 }}>
        <Text variant="bodyStrong" numberOfLines={1}>{ex.title}</Text>
        <Text variant="caption" color={colors.textMuted}>
          {/* Madde sayısı da yazıyor: öğrenci açmadan önce ne kadar iş
              olduğunu görüyor. Web listesi baştan beri yazıyor. */}
          {t(`genre.${ex.genre}`)} · {t("skills.dk", { n: ex.minutes })} · {t("skills.n_items_short", { n: ex.items })}
          {isNext ? <Text variant="caption" color={tint}> · {t("skills.next").toLowerCase()}</Text> : null}
        </Text>
      </View>
      {/* PUAN ROZETİ — web listesi baştan beri gösteriyor: "bitti" ile "iyi
          bitti" aynı şey değil ve tekrar çalışma kararı buna bakıyor.
          EŞİĞİN ALTI KEHRİBAR, KIRMIZI DEĞİL. Rozet web'den alınmıştı ama
          anlamsal jetonu yanlış seçilmişti: "%50 aldım" bir HATA değil, henüz
          eşiği geçmemiş bir deneme. Web aynı rozeti alev (kehribar) tonunda
          çiziyor (`skills/page.tsx`); kırmızı tehlikeye ayrılmış. */}
      {score !== undefined ? (
        <View style={{ paddingHorizontal: spacing.sm, paddingVertical: 3, borderRadius: radii.sm, backgroundColor: (done ? colors.success : colors.streak) + "22" }}>
          <Text variant="micro" color={done ? colors.successText : colors.streakText}>{formatPercent(score)}</Text>
        </View>
      ) : null}
      {locked ? <LockIcon color={colors.textMuted} size={18} /> : done ? <CheckIcon color={colors.successText} size={18} /> : <ChevronRightIcon color={colors.textFaint} size={20} />}
    </PressableScale>
  );
}

/**
 * Beceriler sekmesi — Patika'nın YANINDAKİ serbest çalışma yüzeyi.
 *
 * Yalnız kütüphane egzersizlerini listeler (`listOwnSkillMeta`: `unit` alanı
 * boş olanlar); Patika'nın egzersizleri burada bir daha görünmez. Seviye
 * sekmeleri, beş beceri bölümü, "bitti" işaretleri (cihazdaki tamamlama
 * kümesi) ve tek bir "sıradaki" önerisi: tamamlanma oranı en düşük becerinin
 * ilk bitmemiş egzersizi. Seviyedeki her şey bittiyse öneri bir üst seviye.
 */
export function SkillsScreen() {
  const { colors } = useTheme();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { me, loading: meLoading } = useMe();
  const [guestLevel, setGuestLevel] = useState<string | null>(null);
  const [prefsRead, setPrefsRead] = useState(false);
  const [level, setLevel] = useState<string | null>(null);
  const [done, setDone] = useState<Set<string>>(() => new Set());
  /* Egzersiz başına puan — web listesi de rozet olarak gösteriyor. */
  const [scores, setScores] = useState<Record<string, number>>({});
  /* Premium kilidi (yazma + B1+ konuşma; bkz. lib/skillAccess). Liste bugüne
     kadar her şeyi açık çiziyordu. Odaklanmada tazelenir: değerlendirme hak
     düşürdüyse dönünce not güncel olsun. */
  const [access, setAccess] = useState<SkillAccess | null>(null);
  /* Seçili beceri: null iken önerinin becerisi (en geride kalan). Seviye
     değişince seçim korunuyor — "B1'in dil bilgisine bakayım" doğal bir akış. */
  const [picked, setPicked] = useState<SkillKey | null>(null);
  const [hideDone, setHideDone] = useState(false);
  useEffect(() => {
    if (meLoading || me) return;
    void loadOnboardingPrefs().then((p) => { setGuestLevel(p.level ?? null); setPrefsRead(true); });
  }, [me, meLoading]);
  // Tamamlanma kümesi her odaklanmada tazelenir: egzersizden dönünce nokta yeşile dönsün.
  useFocusEffect(useCallback(() => {
    let alive = true;
    /* SUNUCU DURUMU DA OKUNUYOR. Yerel küme yalnız BU cihazda bitirilenleri
       biliyordu: webde ya da başka bir telefonda çalışılan egzersizler
       Android'de hiç bitmemiş görünüyor ve "sıradaki" önerisi baştan
       başlıyordu. Önce yerel (anında çizilsin), sonra sunucu. */
    const oku = () => Promise.all([getDoneItems(), getItemScores()]).then(([s, p]) => {
      if (alive) { setDone(new Set(s)); setScores({ ...p }); }
    });
    void oku().then(() => syncItemProgress()).then(oku);
    void fetchSkillAccess().then((a) => { if (alive) setAccess(a); });
    void refreshPremium();
    return () => { alive = false; };
  }, []));
  const { status: premiumStatus } = usePremiumStatus();
  const activeLevel = level ?? me?.level ?? guestLevel ?? "A1";
  // Seviye bilinmeden liste çizilmez: A1 listesini gösterip A2'ye atlamak
  // ekranı boyundan boyuna değiştiriyordu (kayan konteynerlerin kaynağı).
  const levelReady = !!level || (!meLoading && (!!me || prefsRead));

  /*
    SEVİYE PAKETİ İNMEDEN LİSTE ÇİZİLMEZ. Egzersizler ikilide değil, seviye
    paketi hâlinde iniyor (bkz. `data/skills`). Güncel paket için istek hiç
    atılmıyor.

    KÜMEYLE BİRLİKTE HANGİ SEVİYEYE AİT OLDUĞU DA TUTULUYOR — iki ayrı hata
    bunun eksikliğindendi:

      1. Paket inene kadar küme boş, yani `hasExercises` false: ekran bir an
         "bu kursta egzersiz yok" kartını gösteriyor, saniyesinde liste
         geliyordu. Yükleniyor ile boş aynı şeye bakıyordu.
      2. Seviye değişince eski seviyenin listesi ekranda kalıyordu; A1'den
         B1'e basan biri kısa süre A1 egzersizlerini görüyordu.

    Kümenin seviyesi `activeLevel` değilse ekran HENÜZ hazır değil: iskelet
    çiziliyor. Boş durum kartı ancak paket gerçekten inip boş çıkınca
    görünüyor.
  */
  const [pool, setPool] = useState<{ level: string; items: Record<string, SkillMeta[]>; ok: boolean } | null>(null);
  useEffect(() => {
    let dead = false;
    void ensureSkills(activeLevel).then((ok) => {
      if (dead) return;
      const items: Record<string, SkillMeta[]> = {};
      for (const s of SKILLS) items[s.key] = listOwnSkillMeta(activeLevel, s.key);
      setPool({ level: activeLevel, items, ok });
    });
    return () => { dead = true; };
  }, [activeLevel]);
  const pools = pool?.level === activeLevel ? pool.items : null;
  const poolsReady = pools !== null;
  /* Paket inemediyse (ağ yok ve diskte kopya yok) "egzersiz yok" değil
     "indirilemedi" deniyor: `ensureSkills` bu ikisini ayırt ediyor. */
  const packFailed = poolsReady && pool?.ok === false;

  const lists = useMemo(
    () => SKILLS.map((s) => {
      const items = pools?.[s.key] ?? [];
      const next = items.find((e) => !done.has(e.id) && !isSkillLocked(e, access)) ?? null;
      const finished = items.filter((e) => done.has(e.id)).length;
      return { ...s, items, next, finished, ratio: items.length ? finished / items.length : 1 };
    }),
    [pools, done, access],
  );
  const hasExercises = lists.some((l) => l.items.length > 0);
  const totalCount = lists.reduce((n, l) => n + l.items.length, 0);
  const doneCount = lists.reduce((n, l) => n + l.finished, 0);
  const suggestion = lists.filter((l) => l.next).sort((a, b) => a.ratio - b.ratio)[0] ?? null;
  const nextLevel = LEVELS[LEVELS.indexOf(activeLevel as (typeof LEVELS)[number]) + 1] ?? null;
  const visible = lists.filter((l) => l.items.length > 0);
  const current = visible.find((l) => l.key === picked) ?? visible.find((l) => l.key === suggestion?.key) ?? visible[0] ?? null;

  function open(ex: SkillMeta, kind: Kind) {
    // Kilitli satır planlara gidiyor; açılsaydı öğrenci yazıp gönderirken 403 görürdü.
    if (isSkillLocked(ex, access)) { nav.navigate("Paywall"); return; }
    nav.navigate("Item", { id: ex.id, kind, title: ex.title, from: "skills" });
  }

  return (
    <Screen>
      <AppHeader title={t("skills.skills")} subtitle={t("skills.aciklama")} />

      {/* SEVİYE SEKMELERİ İSKELETTEN AYRI. Liste paketle birlikte iniyor ama
          sekmeler seviye bilinir bilinmez gerçek: aksi hâlde B1'e basan biri
          bastığı sekmelerin iskelete dönüştüğünü görüyordu. */}
      {!levelReady ? (
        <>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: spacing.lg, marginBottom: spacing.sm, marginLeft: spacing.xs }}>
            <SkeletonLine variant="caption" width={54} />
          </View>
          <View style={{ flexDirection: "row", gap: spacing.sm, marginBottom: spacing.lg }}>
            {LEVELS.map((l) => <Skeleton key={l} height={20 + 3 + textHeight("bodyStrong")} radius={radii.md} style={{ flex: 1 }} />)}
          </View>
        </>
      ) : (
        <>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: spacing.lg, marginBottom: spacing.sm, marginLeft: spacing.xs }}>
            <Text variant="caption" color={colors.textMuted} style={{ letterSpacing: 0.5 }}>{t("skills.level")}</Text>
            {hasExercises ? <Text variant="caption" color={colors.textMuted}>{t("skills.done_of", { done: doneCount, total: totalCount })}</Text> : null}
          </View>
          <View style={{ flexDirection: "row", gap: spacing.sm, marginBottom: spacing.lg }} accessibilityRole="tablist">
            {LEVELS.map((l) => {
              const active = activeLevel === l;
              return (
                <PressableScale key={l} onPress={() => setLevel(l)} accessibilityRole="tab" accessibilityState={{ selected: active }} style={{ flex: 1, paddingVertical: 10, borderRadius: radii.md, alignItems: "center", borderWidth: 1.5, borderColor: active ? colors.primary : colors.border, backgroundColor: active ? colors.primarySoft : colors.surface }}>
                  <Text variant="bodyStrong" color={active ? colors.primaryText : colors.textMuted}>{l}</Text>
                </PressableScale>
              );
            })}
          </View>
        </>
      )}

      {!levelReady || !poolsReady ? (
        /* İskelet yüklenmiş ekranın SIRASIYLA ve KAPLARIYLA: öneri kartı, beş
           karo, liste. Karonun yüksekliği elle hesaplanıyordu ve öneri
           kartının yeri yoktu; içerik gelince her şey aşağı kayıyordu. Artık
           kaplar gerçeğinkiyle aynı (dolgu, kenarlık, boşluk), yükseklik
           içlerinden çıkıyor. Web `skills/loading.tsx` aynı sırayı çiziyor. */
        <>
          <View style={{ marginBottom: spacing.lg }}>
            <SkeletonCard padded style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
              <Skeleton height={40} width={40} radius={radii.md} />
              <View style={{ flex: 1 }}>
                <SkeletonLine variant="micro" width="35%" />
                <SkeletonLine variant="bodyStrong" width="60%" />
                <SkeletonLine variant="caption" width="80%" />
              </View>
            </SkeletonCard>
          </View>
          <View style={{ flexDirection: "row", gap: 6, marginBottom: spacing.lg }}>
            {SKILLS.map((s) => (
              <View key={s.key} style={{ flex: 1, minWidth: 0, alignItems: "center", gap: spacing.xs, paddingTop: 10, paddingBottom: spacing.sm, paddingHorizontal: 2, borderRadius: radii.md, borderWidth: 1.5, borderColor: colors.border, backgroundColor: colors.surface }}>
                <Skeleton height={20} width={20} radius={6} />
                <SkeletonLine variant="caption" width="70%" />
                <SkeletonLine variant="micro" width="40%" style={{ marginTop: "auto" }} />
                <Skeleton height={4} width="80%" radius={2} />
              </View>
            ))}
          </View>
          <View style={{ marginBottom: spacing.xl }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm, marginBottom: spacing.sm, marginLeft: spacing.xs }}>
              <Skeleton height={18} width={18} radius={9} />
              <SkeletonLine variant="h3" width={92} />
              <SkeletonLine variant="caption" width={40} />
            </View>
            <SkeletonCard padded style={{ paddingVertical: spacing.xs }}>
              {[0, 1, 2, 3, 4].map((i) => (
                <View key={i} style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: spacing.md, borderBottomWidth: i === 4 ? 0 : 1, borderBottomColor: colors.hairline }}>
                  <Skeleton height={8} width={8} radius={4} />
                  <View style={{ flex: 1 }}>
                    <SkeletonLine variant="bodyStrong" width="70%" />
                    <SkeletonLine variant="caption" width="40%" />
                  </View>
                  <Skeleton height={20} width={20} radius={10} />
                </View>
              ))}
            </SkeletonCard>
          </View>
        </>
      ) : (
        <>
          {!hasExercises ? (
            <Card padded accessibilityLiveRegion={packFailed ? "assertive" : "polite"}>
              <Text variant="body" color={colors.textMuted}>
                {packFailed ? `${t("content.couldn_t_load")} ${t("social.err_offline")}` : t("skills.this_course_has_no_reading")}
              </Text>
            </Card>
          ) : null}

          {/* Tek öneri: en geride kalan becerinin sıradaki egzersizi; hepsi
              bittiyse bir üst seviye. Öğrenci "ne çalışsam" diye listeyi taramasın. */}
          {suggestion?.next ? (
            <PressableScale onPress={() => open(suggestion.next!, suggestion.kind)} style={{ marginBottom: spacing.lg }}>
              <Card padded style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
                <View style={{ width: 40, height: 40, borderRadius: radii.md, backgroundColor: colors.surface2, alignItems: "center", justifyContent: "center" }}>
                  <suggestion.icon color={colors[suggestion.tint] as string} size={20} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text variant="micro" color={colors[suggestion.tint] as string}>{t("skills.next").toLocaleUpperCase(dateLocale())} · {t(suggestion.label).toLocaleUpperCase(dateLocale())}</Text>
                  <Text variant="bodyStrong" numberOfLines={1}>{suggestion.next.title}</Text>
                  <Text variant="caption" color={colors.textMuted} numberOfLines={2}>
                    {suggestion.ratio === 0
                      ? t("skills.next_start", { skill: t(suggestion.label) })
                      : t("skills.next_behind", { skill: t(suggestion.label), pct: Math.round(suggestion.ratio * 100) })}
                  </Text>
                </View>
                <ChevronRightIcon color={colors.textFaint} size={20} />
              </Card>
            </PressableScale>
          ) : hasExercises && nextLevel ? (
            <PressableScale onPress={() => setLevel(nextLevel)} style={{ marginBottom: spacing.lg }}>
              <Card padded style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
                <View style={{ flex: 1 }}>
                  <Text variant="micro" color={colors.successText}>{t("skills.level_done").toLocaleUpperCase(dateLocale())}</Text>
                  <Text variant="caption" color={colors.textMuted} style={{ marginTop: 2 }}>{t("skills.level_done_body", { level: activeLevel, next: nextLevel })}</Text>
                </View>
                <ChevronRightIcon color={colors.textFaint} size={20} />
              </Card>
            </PressableScale>
          ) : null}

          {/*
            BECERİ KAROLARI (2026-09-25). Kütüphane hücre başına yirmiye çıktı;
            beş bölüm alt alta bir seviyede 100 satır ediyordu ve dil bilgisine
            inmek için dört listeyi geçmek gerekiyordu. Beş karo bir bakışta
            beş becerinin ilerlemesini gösteriyor, liste yalnız seçili
            becerininki. Web aynı düzeni çiziyor (`skill-browser`). Seçili karo
            seviye sekmesinin dilini konuşuyor; simge becerinin rengini taşıyor.
          */}
          {current ? (
            <>
              <View style={{ flexDirection: "row", gap: 6, marginBottom: spacing.lg }} accessibilityRole="tablist">
                {visible.map((s) => {
                  const active = s.key === current.key;
                  const tint = colors[s.tint] as string;
                  const pct = Math.round((s.finished / s.items.length) * 100);
                  return (
                    <PressableScale
                      key={s.key}
                      onPress={() => setPicked(s.key)}
                      accessibilityRole="tab"
                      accessibilityState={{ selected: active }}
                      accessibilityLabel={`${t(s.label)}, ${s.finished}/${s.items.length}`}
                      style={{ flex: 1, minWidth: 0, alignItems: "center", gap: spacing.xs, paddingTop: 10, paddingBottom: spacing.sm, paddingHorizontal: 2, borderRadius: radii.md, borderWidth: 1.5, borderColor: active ? colors.primary : colors.border, backgroundColor: active ? colors.primarySoft : colors.surface }}
                    >
                      <s.icon color={tint} size={20} />
                      {/* Tek satır ve SIĞMAZSA KÜÇÜL — sekme çubuğunun kalıbı
                          (`TabBar`). İki satıra izin veriliyordu; büyük yazı
                          ayarında tek sözcük sütuna sığmayınca harfinden
                          bölünüyordu („Dinlem / e“). Sayaç dibe yaslı. */}
                      <Text variant="caption" numberOfLines={1} adjustsFontSizeToFit color={active ? colors.primaryText : colors.text} style={{ textAlign: "center" }}>{t(s.label)}</Text>
                      <Text variant="micro" color={colors.textMuted} style={{ marginTop: "auto" }}>{s.finished}/{s.items.length}</Text>
                      <View style={{ width: "80%", height: 4, borderRadius: 2, backgroundColor: colors.surface2, overflow: "hidden" }}>
                        <View style={{ width: `${pct}%`, height: "100%", borderRadius: 2, backgroundColor: tint }} />
                      </View>
                    </PressableScale>
                  );
                })}
              </View>

              {(() => {
                const tint = colors[current.tint] as string;
                const kind = current.items[0] ? gatedMetaKind(current.items[0]) : null;
                /* HAK SEVİYE BAŞINA (2026-09-25): not ve ilerleme listenin
                   seviyesinden. Kilit açma durumu varsa (kalan hak, bir sonraki
                   hakkın koşulları) o çiziliyor; yoksa eski kapı notu. */
                const lvUnlock = premiumStatus?.unlock?.levels[activeLevel];
                const copy = kind && lvUnlock ? tieredCopy(kind === "writing" ? lvUnlock.skillWriting : lvUnlock.skillSpeaking, kind === "writing" ? "skill_write" : "skill_speak") : null;
                const note = kind && access && !copy ? gateNote(levelGate(access, activeLevel, kind)) : null;
                const rows = hideDone ? current.items.filter((e) => !done.has(e.id)) : current.items;
                return (
                  <View style={{ marginBottom: spacing.xl }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm, marginBottom: spacing.sm, marginLeft: spacing.xs }}>
                      <current.icon color={tint} size={18} />
                      <Text variant="h3">{t(current.label)}</Text>
                      <Text variant="caption" color={colors.textMuted}>{current.finished}/{current.items.length}</Text>
                      {/* Bitenleri gizle: yirmi satırın çoğu bittiğinde sıradakini
                          bulmak için kaydırmak gerekmesin. Biten yoksa anahtar yok. */}
                      {current.finished ? (
                        <PressableScale onPress={() => setHideDone((v) => !v)} accessibilityRole="button" accessibilityState={{ selected: hideDone }} style={{ marginLeft: "auto", paddingVertical: spacing.xs }}>
                          <Text variant="caption" color={colors.primaryText}>{hideDone ? t("skills.show_done", { n: current.finished }) : t("skills.hide_done")}</Text>
                        </PressableScale>
                      ) : null}
                    </View>
                    {/* Kuralı kilide çarpmadan ÖNCE söyle (web aynı notu çiziyor). */}
                    {copy ? (
                      <View style={{ marginBottom: spacing.sm }}>
                        {copy.spent ? (
                          <UnlockProgress copy={copy} onPremium={() => nav.navigate("Paywall")} />
                        ) : (
                          <FlowNote icon={<LockIcon color={colors.textMuted} size={16} />} text={t(copy.headline.key, copy.headline.params)} />
                        )}
                      </View>
                    ) : null}
                    {note ? (
                      <View style={{ marginBottom: spacing.sm }}>
                        <FlowNote icon={<LockIcon color={colors.textMuted} size={16} />} text={`${t("skills.ai_quota")} · ${t(note.key, { n: note.n })}`} />
                      </View>
                    ) : null}
                    {rows.length ? (
                      <Card padded style={{ paddingVertical: spacing.xs }}>
                        {rows.map((ex, i) => (
                          <ExerciseRow key={ex.id} ex={ex} tint={tint} done={done.has(ex.id)} score={scores[ex.id]} isNext={current.next?.id === ex.id} last={i === rows.length - 1} colors={colors} onPress={() => open(ex, current.kind)} locked={isSkillLocked(ex, access)} />
                        ))}
                      </Card>
                    ) : (
                      <Card padded>
                        <Text variant="body" color={colors.textMuted}>{t("skills.all_done_hidden", { n: current.finished })}</Text>
                      </Card>
                    )}
                  </View>
                );
              })()}
            </>
          ) : null}
        </>
      )}
    </Screen>
  );
}
