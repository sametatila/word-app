import React, { useCallback, useEffect, useRef, useState } from "react";
import { t, formatPercent } from "../lib/i18n";
import { View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { PressableScale } from "../ui/PressableScale";
import { ChevronNextIcon, LockedIcon, MockExamIcon, WarningIcon } from "../ui/icons";
import { EmptyCard, ScreenHeader } from "../social/common";
import { PrimaryButton } from "../ui/PrimaryButton";
import { FlowNote } from "../ui/flow";
import { UnlockProgress } from "../ui/UnlockProgress";
import { mockCopy, whenText } from "../lib/unlock";
import { Skeleton, SkeletonCard, SkeletonLine, SkeletonText, textHeight } from "../ui/Skeleton";
import { useMe } from "../lib/useMe";
import { useAuth } from "../lib/AuthContext";
import { currentCourseId } from "../lib/courses";
import { mockCourseOf, mockSkillLabel, type MockLevel, type MockSkill } from "../data/exams";
import { mockCatalogFor, type MockCatalogEntry } from "../content/mockCatalog";
import { useNativeContentVersion } from "../lib/nativeContent";
import { localPartStates, type PartState } from "../game/mockExamLocal";
import { fetchMockAccess, fetchMockStats, type MockAccess } from "../game/mockExam";
import { loadOnboardingPrefs } from "../lib/onboardingPrefs";
import { useBoundedWait } from "../lib/useBoundedWait";
import { useTheme, spacing, radii } from "../theme";

/**
 * Deneme sınavları.
 *
 * Ekran eskiden "Sınav hazırlık"tı ve başka yerlerin içeriğini tekrar
 * ediyordu: Lesen/Hören/Schreiben modülleri Beceriler sekmesindeki
 * egzersizlerdi, seviye ve modül kâğıtları ise Patika türevi sınavlardı.
 * İkisi de kaldırıldı.
 *
 * Burası artık yalnız DENEME SINAVI listeliyor: elle yazılmış, kendi başına
 * duran kâğıtlar. Liste seviyeye göre süzülüyor; kâğıt BÖLÜM BÖLÜM açılıyor,
 * çünkü bir kâğıt 80 ile 205 dakika arasında sürüyor ve tek oturumda
 * çözülecek bir şey değil. Gerçek sınavlar da modüler: bölümler ayrı ayrı
 * alınabiliyor.
 *
 * Öğren sekmesindeki kapı, liste boş olsa bile açık: kursun sınav kataloğu
 * varsa kutucuk çiziliyor. Liste boşken bu ekran uydurma bir satır ya da
 * "yakında" göstermiyor, olduğu gibi söylüyor — o seviyede henüz sınav yok.
 */
const LEVELS: MockLevel[] = ["A1", "A2", "B1", "B2", "C1"];

/*
 * SON ERİŞİM CEVABI BELLEKTE (kullanıcı + seviye başına). Ücretsiz hesabın notu,
 * açılma ilerlemesi ve kâğıtlardaki kilit cevaptan SONRA beliriyor ve kâğıt
 * listesini aşağı itiyordu (QA F-0070 sınıfı). Artık liste ilk açılışta cevabı
 * da bekliyor (iskelet), sonraki açılışlarda bellekteki cevapla hemen çiziliyor
 * ve arkada tazeleniyor.
 */
const accessCache = new Map<string, MockAccess | null>();

export function MockExamsScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { me, loading: meLoading } = useMe();
  // Misafirde yerleştirme sınavının belirlediği seviye (prefs); yoksa A1.
  const [guestLevel, setGuestLevel] = useState<string | null>(null);
  const [prefsRead, setPrefsRead] = useState(false);
  useEffect(() => {
    if (meLoading || me) return;
    void loadOnboardingPrefs().then((p) => { setGuestLevel(p.level ?? null); setPrefsRead(true); });
  }, [me, meLoading]);
  // Kendi seviyen liste açılınca seçili gelir, ama başka bir seviyeye
  // bakmak serbest: bir üst seviyeyi görmek hedefi somutlaştırıyor, bir alt
  // seviyeyi çözmek de sınav biçimini öğrenmenin en ucuz yolu. Web'deki
  // liste sayfası da aynı şekilde seviye değiştirtiyor.
  const [picked, setPicked] = useState<MockLevel | null>(null);
  const level = picked ?? me?.level ?? guestLevel ?? "A1";
  // Liste seviyeye bağlı: seviye kesinleşmeden çizilirse sonradan uzayıp
  // kısalıyor. Kesinleşene dek aynı boyda iskelet durur.
  const levelReady = !meLoading && (!!me || prefsRead);
  const overallPct = me && me.totalWords ? Math.min(100, Math.round((me.mastered / me.totalWords) * 100)) : null;

  /*
    KÜNYELER SUNUCUDAN — kâğıtlar ikiliden çıktı (bkz. `content/mockCatalog`).

    İndirilmiş künye diskte kaldığı için liste ÇEVRİMDIŞI da açılıyor; ağ
    yokken yalnız sınava girilemiyor. Seviye değişince yeniden okunuyor: paket
    başına tek dosya, güncelse hiç istek atılmıyor.
  */
  /* ÜÇ HÂL: iniyor, indi, inemedi. Liste tek bir diziydi ve üçü de boş diziye
     düşüyordu: künye inerken ve ağ yokken ekran "bu seviyede kâğıt yok"
     diyordu — oysa biri "henüz bilmiyorum", öteki "okuyamadım". Boş cümle
     yalnız künye GERÇEKTEN inip boş çıkınca yazıyor. */
  const [papers, setPapers] = useState<MockCatalogEntry[]>([]);
  const [catalog, setCatalog] = useState<"loading" | "ready" | "error">("loading");
  /* Anadil sözlüğü sonradan inerse tema karşılıkları için liste yeniden okunuyor. */
  const nativeVer = useNativeContentVersion();
  const listed = useRef<string | null>(null);
  useEffect(() => {
    let dead = false;
    /* Yalnız sözlük değiştiyse iskelet çizilmiyor: liste yerinde yenileniyor. */
    if (listed.current !== level) setCatalog("loading");
    void mockCatalogFor(currentCourseId(), level as MockLevel)
      .then((list) => { if (!dead) { listed.current = level; setPapers(list); setCatalog("ready"); } })
      .catch(() => { if (!dead) { setPapers([]); setCatalog("error"); } });
    return () => { dead = true; };
  }, [level, nativeVer]);

  /*
    Bölümlerin durumu: bitti mi, kaç aldın, yarım mı kaldı.

    Kaynak CİHAZ, sunucu değil. Sebep: sunucuya ulaşılamadığında da bu sorunun
    bir cevabı olmalı — kullanıcı bir bölümü çözdüğünü listede görebilmeli.
    Sunucuda puanlanmış sonuçlar ayrıca `synced` işaretini taşıyor ve rozet
    bunu ayırt ediyor; istatistik ekranı yine sunucunun sayılarını gösteriyor.

    Odaklanınca yeniden okunuyor: sınavdan dönüldüğünde liste güncel olsun.
  */
  /*
   * KİLİT LİSTEDE GÖRÜNÜYOR.
   *
   * Sunucu seviye başına kaç kâğıdın açık olduğunu biliyor; ekran artık
   * soruyor. Okunamazsa (ağ yok, misafir) `null` kalıyor ve hiçbir şey
   * kilitli çizilmiyor: uydurma bir kilit, gerçek bir kilitten daha kötü.
   */
  const { user } = useAuth();
  const accessKey = me && user ? `${user.id}:${level}` : null;
  const [fetched, setFetched] = useState<{ key: string; access: MockAccess | null } | null>(null);
  /* ODAKLANINCA yeniden soruluyor: kâğıt bitirilip dönülünce "bitir" koşulu
     işaretlenmiş ve belki yeni kâğıt açılmış olmalı. */
  useFocusEffect(useCallback(() => {
    if (!accessKey) return;
    let dead = false;
    void fetchMockAccess(level)
      .then((a) => { accessCache.set(accessKey, a); if (!dead) setFetched({ key: accessKey, access: a }); })
      .catch(() => { if (!dead) setFetched({ key: accessKey, access: accessCache.get(accessKey) ?? null }); });
    return () => { dead = true; };
  }, [accessKey, level]));
  /* `undefined`: bu seviyenin cevabı henüz hiç gelmedi — liste iskelette bekliyor. */
  const accessNow: MockAccess | null | undefined = !accessKey
    ? null
    : fetched?.key === accessKey
      ? fetched.access
      : accessCache.get(accessKey);
  /* Ağ yavaşsa liste en çok 1,5 sn bekler; cevap sonra gelirse yine çizilir. */
  const accessPending = useBoundedWait(accessNow === undefined, accessKey);
  const access = accessNow ?? null;
  const isLocked = (id: string) => (access ? !access.unlocked.includes(id) : false);
  const copy = mockCopy(access?.unlock);
  const freeCopy = access && !access.premium ? copy : null;
  const proCopy = access?.premium ? copy : null;
  /* Kilitli kâğıt kartındaki "ne zaman açılır" cümlesi — listenin üstündeki
     kartla aynı cümle, kâğıdın yanında da. */
  const lockedHint = freeCopy ? whenText(freeCopy, t) : null;

  const [states, setStates] = useState<Record<string, Record<string, PartState>>>({});
  const readStates = useCallback(() => {
    let dead = false;
    void (async () => {
      const out: Record<string, Record<string, PartState>> = {};
      for (const p of papers) {
        out[p.id] = await localPartStates(p.id, p.parts.map((x) => x.skill) as MockSkill[]);
      }
      if (!dead) setStates(out);
    })();
    return () => { dead = true; };
    /* `papers`e BAĞLI: künye odaktan SONRA iniyor ve yalnız `level`e bağlıyken
       durumlar boş listeyle okunup öyle kalıyordu — çözülmüş bölümler, ekrana
       yeniden girilene dek çözülmemiş görünüyordu (QA F-0048). `papers` bir
       durum: kimliği yalnız künye inince değişiyor. */
  }, [papers]);
  useFocusEffect(readStates);

  /*
   * SUNUCUDAKİ SONUÇLAR DA. Cihaz kaydı yalnız BU cihazda çözüleni biliyor:
   * webde ya da başka telefonda çözülen bölüm burada çözülmemiş görünüyordu
   * (QA F-0048). Web listesi durumu sunucudan çiziyor; burası ikisini
   * birleştiriyor (`mergedState`). Okunamazsa yalnız cihaz kaydı.
   */
  const [serverStates, setServerStates] = useState<Record<string, PartState>>({});
  useFocusEffect(useCallback(() => {
    if (!me) { setServerStates({}); return; }
    let dead = false;
    void fetchMockStats(mockCourseOf(currentCourseId())).then((st) => {
      if (dead) return;
      const out: Record<string, PartState> = {};
      // `recent` yeniden eskiye: ilk kayıt bölümün son denemesi.
      for (const r of st.recent) {
        const k = `${r.paperId}:${r.skill}`;
        if (!(k in out)) out[k] = { pct: r.score, passed: r.passed, synced: true, scored: r.total > 0 };
      }
      for (const r of st.running) out[`${r.paperId}:${r.skill}`] = "running";
      setServerStates(out);
    }).catch(() => { /* ağ yok: cihaz kaydı yeter */ });
    return () => { dead = true; };
  }, [me]));
  const stateOf = (paperId: string): Record<string, PartState> => {
    const local = states[paperId] ?? {};
    const out: Record<string, PartState> = {};
    for (const p of papers.find((x) => x.id === paperId)?.parts ?? []) out[p.skill] = mergedState(local[p.skill] ?? null, serverStates[`${paperId}:${p.skill}`] ?? null);
    return out;
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader
        title={t("mockexams.title")}
        right={
          /* Web karşılığı `btn btn-ghost h-11` + caption: 44'lük hedef, küçük
             hap değil (eskisi ~31 dp'ydi, dokunma alt sınırının altında). */
          <PressableScale
            onPress={() => nav.navigate("MockStats")}
            accessibilityLabel={t("mockstats.title")}
            style={{ height: 44, justifyContent: "center", paddingHorizontal: spacing.md, borderRadius: radii.md, backgroundColor: colors.surface2 }}
          >
            <Text variant="caption" color={colors.text}>{t("mockstats.title")}</Text>
          </PressableScale>
        }
      />

      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xxl }} showsVerticalScrollIndicator={false}>
        <Card style={{ marginTop: spacing.sm, marginBottom: spacing.lg }}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View>
              <Text variant="micro" color={colors.textMuted}>{t("mockexams.level")}</Text>
              <Text variant="h1" color={colors.primaryText}>{level}</Text>
            </View>
            {meLoading ? (
              <View style={{ alignItems: "flex-end" }}>
                <SkeletonLine variant="micro" width={92} />
                <SkeletonLine variant="h1" width={56} />
              </View>
            ) : overallPct !== null ? (
              <View style={{ alignItems: "flex-end" }}>
                <Text variant="micro" color={colors.textMuted}>{t("mockexams.word_coverage")}</Text>
                <Text variant="h1">{formatPercent(overallPct)}</Text>
              </View>
            ) : null}
          </View>
        </Card>

        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm, marginBottom: spacing.md }}>
          {LEVELS.map((lv) => {
            const on = lv === level;
            return (
              <PressableScale
                key={lv}
                onPress={() => setPicked(lv)}
                accessibilityLabel={lv}
                accessibilityState={{ selected: on }}
                style={{
                  paddingVertical: spacing.xs,
                  paddingHorizontal: spacing.md,
                  borderRadius: radii.pill,
                  /* Seçili seviye dolu turuncu + beyaz (2026-09-29 Samet:
                     seçim B, dolu turuncu çip). */
                  backgroundColor: on ? colors.primary : colors.surface2,
                  borderWidth: 1,
                  borderColor: on ? colors.primary : "transparent",
                }}
              >
                <Text variant="bodyStrong" color={on ? colors.onPrimary : colors.textMuted}>{lv}</Text>
              </PressableScale>
            );
          })}
        </View>

        {!levelReady || catalog === "loading" || accessPending ? (
          /* Katalog inerken LİSTENİN iskeleti: giriş metni + iki kâğıt kartı
             (`PaperCard`: üst satır, tema, karşılık, süre, dört bölüm satırı).
             Tek kartlık bir başlık + satır çiziliyordu; kâğıtlar gelince
             liste bir anda üç ekran boyu uzuyordu. */
          <View>
            {/* Giriş metni sözlükten: gerçeği görünmez çizilip satırları ölçülüyor. */}
            <SkeletonText variant="caption" text={t("mockexams.intro")} style={{ marginBottom: spacing.md }} />
            {[0, 1].map((p) => (
              <SkeletonCard key={p} label={p === 0 ? t("common.loading") : undefined} style={{ marginBottom: spacing.md }}>
                {/* Kâğıt no ve süre sözlükten (tipik değerle); tema ve karşılığı katalogla
                    geliyor, tahmini uzunlukta dolgu. Yüzde genişlik tablette (kolon ~1000dp)
                    24 harflik temayı 480dp'lik çubuğa çeviriyordu. */}
                <SkeletonText variant="micro" text={t("mockexams.mock_n", { n: p + 1 })} />
                <SkeletonText variant="bodyStrong" chars={24} style={{ marginTop: 2 }} />
                <SkeletonText variant="caption" chars={23} />
                <SkeletonText variant="micro" text={t("mockexams.minutes", { n: 90 })} style={{ marginTop: spacing.xs }} />
                <View style={{ marginTop: spacing.sm }}>
                  {[0, 1, 2, 3].map((i) => (
                    <Skeleton key={i} height={textHeight("bodyStrong") + textHeight("micro") + spacing.sm * 2} radius={radii.md} style={{ marginTop: spacing.xs }} />
                  ))}
                </View>
              </SkeletonCard>
            ))}
          </View>
        ) : catalog === "error" && !papers.length ? (
          <EmptyCard
            live="assertive"
            icon={WarningIcon}
            tint={colors.info}
            title={t("mockexams.couldn_t_load")}
            text={t("social.err_offline")}
          />
        ) : papers.length ? (
          <>
            <Text variant="caption" color={colors.textMuted} style={{ marginBottom: spacing.md }}>
              {t("mockexams.intro")}
            </Text>
            {/* Kaç kâğıdın açık olduğu ve SONRAKİNİN NASIL açılacağı LİSTEDEN
                ÖNCE söyleniyor: kuralı kilide çarptıktan sonra öğrenmek, kuralı
                hiç söylememekle aynı şey. Ücretsizde bitir + 7 günlük seri
                ilerlemesi (`UnlockProgress`), premium'da paket kuralı — web aynı
                kartı aynı kuralla çiziyor (`lib/unlock`). */}
            {access && !access.premium ? (
              <View style={{ marginBottom: spacing.md, gap: spacing.sm }}>
                <FlowNote icon={<LockedIcon color={colors.textMuted} size={16} />} text={t("mockpack.free_note", { n: access.freeLimit })} />
                {freeCopy ? <UnlockProgress copy={freeCopy} onPremium={papers.some((p) => isLocked(p.id)) ? () => nav.navigate("Paywall") : null} /> : null}
              </View>
            ) : null}
            {access?.premium && papers.some((p) => isLocked(p.id)) ? (
              <View style={{ marginBottom: spacing.md, gap: spacing.sm }}>
                <FlowNote
                  icon={<LockedIcon color={colors.textMuted} size={16} />}
                  text={proCopy ? t(proCopy.headline.key, proCopy.headline.params) : t("mockpack.unlock_hint", { n: access.unlock && access.unlock.premium ? access.unlock.packSize : 3 })}
                />
              </View>
            ) : null}
            {papers.map((p) => (
              <PaperCard
                key={p.id}
                paper={p}
                states={stateOf(p.id)}
                locked={isLocked(p.id)}
                hint={lockedHint}
                showPlans={!access?.premium}
                onOpen={(skill) => nav.navigate("MockExam", { paperId: p.id, skill })}
                onPlans={() => nav.navigate("Paywall")}
              />
            ))}
          </>
        ) : (
          /* Boş hâl EV KALIBINDA (`EmptyCard`) ve metin bir ÇIKIŞ YOLU
             söylüyor: kâğıtlar seviyeye bağlı ve seviye çubuğu bu kartın
             hemen üstünde duruyor — onu söylemeyen tek cümle, kullanıcıya
             kâğıt hiç yokmuş gibi geliyordu. */
          <EmptyCard
            icon={MockExamIcon}
            tint={colors.info}
            title={t("mockexams.empty_title")}
            text={t("mockexams.none_for_level", { level })}
          />
        )}
      </ScrollView>
    </View>
  );
}

function PaperCard({ paper, states, locked, hint, showPlans, onOpen, onPlans }: { paper: MockCatalogEntry; states: Record<string, PartState>; locked: boolean; hint?: string | null; showPlans: boolean; onOpen: (skill: MockSkill) => void; onPlans: () => void }) {
  /* Misafire yapay zekâ puanı verilmiyor (değerlendirme hesap istiyor):
     açık bölümün etiketi ona "puanlar" demiyor. */
  const guest = Boolean(useAuth().user?.guest);
  const { colors } = useTheme();
  return (
    <Card padded style={{ marginBottom: spacing.md }}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: spacing.sm }}>
        <Text variant="micro" color={colors.textMuted}>{t("mockexams.mock_n", { n: paper.no })}</Text>
        {locked ? (
          <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.xs, paddingVertical: 2, paddingHorizontal: spacing.sm, borderRadius: radii.pill, backgroundColor: colors.surface2 }}>
            <LockedIcon color={colors.textMuted} size={12} />
            <Text variant="micro" color={colors.textMuted}>{t("mockpack.locked")}</Text>
          </View>
        ) : null}
      </View>
      <Text variant="bodyStrong" style={{ marginTop: 2 }}>{paper.theme}</Text>
      <Text variant="caption" color={colors.textMuted}>{paper.themeTr}</Text>
      <Text variant="micro" color={colors.textMuted} style={{ marginTop: spacing.xs }}>{t("mockexams.minutes", { n: paper.minutes })}</Text>

      <View style={{ marginTop: spacing.sm, opacity: locked ? 0.6 : 1 }}>
        {paper.parts.map((part) => {
          /* Puan künyeyle geliyor: görevleri saymak için kâğıdın tamamına
             ihtiyaç vardı, künye onu hazır taşıyor (bkz. mock-exams/deliver). */
          const pts = part.points;
          return (
            /* Kilitli bölüm BASILAMIYOR: dokunulabilir bırakılsaydı basan kişi
               yine sınavın içinde 403 görürdü. */
            <PressableScale
              key={part.skill}
              disabled={locked}
              accessibilityState={{ disabled: locked }}
              onPress={() => onOpen(part.skill)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: spacing.sm,
                paddingHorizontal: spacing.md,
                borderRadius: radii.md,
                backgroundColor: colors.surface2,
                marginTop: spacing.xs,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text variant="bodyStrong">{mockSkillLabel(paper.course, part.skill)}</Text>
                <Text variant="micro" color={colors.textMuted}>
                  {/* "puanlanmaz" DEĞİL (denetim T15): yazma ve konuşmayı yapay zekâ puanlıyor. */}
                  {pts ? t("mockexams.part_summary", { minutes: part.minutes, n: pts }) : t(guest ? "mockexams.part_open_guest" : "mockexams.part_open", { minutes: part.minutes })}
                </Text>
              </View>
              <PartBadge state={states[part.skill] ?? null} />
              {locked ? <LockedIcon color={colors.textMuted} size={18} /> : <ChevronNextIcon color={colors.textMuted} size={20} />}
            </PressableScale>
          );
        })}
      </View>
      {locked && hint ? (
        <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.md }}>{hint}</Text>
      ) : null}
      {locked && showPlans ? (
        <PrimaryButton size="md" label={t("unlock.premium_now")} onPress={onPlans} style={{ marginTop: spacing.md }} />
      ) : null}
    </Card>
  );
}

/**
 * Cihaz kaydı ile sunucu birleşimi: bu cihazda YARIM kalan ya da henüz
 * gönderilemeyen (yalnız cihazda puanlanan) sonuç daha yeni, o kazanıyor;
 * yoksa sunucunun son denemesi, o da yoksa cihaz kaydı.
 */
function mergedState(local: PartState, server: PartState): PartState {
  if (local === "running") return local;
  if (local && !local.synced) return local;
  return server ?? local;
}

/** Bölüm rozeti: yarım kaldı · puan · yalnız cihazda hesaplanmış puan. */
function PartBadge({ state }: { state: PartState }) {
  const { colors } = useTheme();
  if (!state) return null;
  const running = state === "running";
  /* PUANSIZ BİTMİŞ BÖLÜM (yazma/konuşmada hiçbir görev yapay zekâ puanı
     almadı): "%0" kırmızı rozeti bir başarısızlık söylüyordu, oysa puan yok.
     Nötr "bitti". Eski yerel kayıtta `scored` yok; o zaman eski çizim. */
  const unscored = !running && state.scored === false;
  const tone = running ? colors.streak : unscored ? colors.textMuted : state.passed ? colors.success : colors.danger;
  const label = running
    ? t("mockexams.state_running")
    : unscored
      ? t("mockexams.state_finished")
      : t(state.synced ? "mockexams.state_done" : "mockexams.state_local", { pct: state.pct });
  return (
    <View style={{ paddingVertical: 2, paddingHorizontal: spacing.sm, borderRadius: radii.pill, backgroundColor: colors.surface, marginRight: spacing.xs }}>
      <Text variant="micro" color={tone}>{label}</Text>
    </View>
  );
}
