import React, { useEffect, useState } from "react";
import { kindIcon, kindFill } from "../ui/unitKind";
import { formatPercent, t } from "../lib/i18n";
import { View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { Text } from "../ui/Text";
import { Bar } from "../ui/Bar";
import { Card } from "../ui/Card";
import { PressableScale } from "../ui/PressableScale";
import { CheckIcon, ChevronNextIcon, LockedIcon } from "../ui/icons";
import { KIND_KEY, type ItemKind } from "../data/unit";
import { useTheme, spacing, radii, softShadow } from "../theme";
import { useLearningPath } from "../lib/useLearningPath";
import { usePremiumStatus } from "../lib/premium";
import { useAuth } from "../lib/AuthContext";
import { useAiDeclined } from "../lib/useAiDeclined";
import { conversationLocked, pathWritingSpent } from "../lib/unlock";
import { PathQuota } from "../ui/PathQuota";
import { ScreenHeader } from "../social/common";
import { haptic } from "../lib/haptics";


/**
 * Ünite gövdesi — hem kendi ekranı hem de Patika'nın yatay tablette açtığı
 * SAĞ PANEL olarak çiziliyor.
 *
 * Ayrılmasının sebebi: yatay tablette ünite listesi 1100dp'lik kabın yarısını
 * kullanıyor, öteki yarısı boştu ve seçilen üniteyi görmek için ayrı bir ekrana
 * gidip geri gelmek gerekiyordu. Aynı gövde iki yerde çiziliyor, davranış
 * ayrışmasın diye kopyalanmadı.
 *
 * `embedded` yalnız KABUĞU değiştiriyor: panelde geri düğmesi yok (geri
 * gidilecek yer yok) ve üst güvenli alan payı yok (onu Patika zaten vermiş).
 * Adımların açılması, ilerleme ölçütü ve yönlendirme iki yerde de aynı.
 */
export type UnitPaneProps = RootStackParams["Unit"] & { embedded?: boolean };

export function UnitPane({ index, level, theme: gelenTheme, items: gelenItems, embedded = false }: UnitPaneProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  /*
    CANLI VERİ, AÇILIŞ ANININ KOPYASI DEĞİL. Adımlar gezinme parametresinden
    okunuyordu: bir beceriyi bitirip geri dönen öğrenci, sunucu kaydı almış
    olsa da adımı "bitmemiş" görüyordu ve ekran onu hiç tazelemiyordu. Artık
    patika deposundan (her odakta tazelenen) okunuyor; depo henüz dolmadıysa
    parametre yedek.
  */
  const { data: canli } = useLearningPath();
  const canliUnit = canli && canli.level === level ? canli.units.find((u) => u.index === index) : undefined;
  const theme = canliUnit?.theme ?? gelenTheme;
  const topics = canliUnit?.topics ?? [];
  // İçeriği olmayan (oynanamaz) slotlar listede hiç görünmez: "Yakında" rozeti yerine
  // ünite yalnız gerçekten yapılabilecek adımları gösterir; ilerleme yüzdesi de onlara göre.
  const raw = (canliUnit?.items ?? gelenItems ?? [])
    .filter((i) => i.playable || i.kind === "conversation")
    .map((i) => ({ id: i.id, kind: i.kind as ItemKind, title: i.title, done: i.done, playable: i.playable, open: i.open !== false, attempted: i.attempted ?? i.done, ref: i.ref ?? null, result: i.result ?? null }));
  /*
    "Şimdi" = ilk açık ve HENÜZ DENENMEMİŞ adım — bitmemiş ilk adım değil.

    Eskisi `!i.done` idi: bir beceriden geçer not alamayan öğrencide "şimdi"
    hep aynı adımı gösteriyordu. Artık deneme sırayı ilerletiyor; geçilmemiş
    adım listede açık kalıyor, istenirse tekrar edilebiliyor.
  */
  const acik = raw.filter((i) => i.open);
  const currentId = (acik.find((i) => !i.attempted) ?? acik.find((i) => !i.done))?.id;
  const items = raw.map((i) => ({ ...i, current: i.id === currentId }));
  /*
    İLERLEME = OYNANABİLİR HER ADIM — Patika kartı, adım şeridi ve sunucunun
    `total`ı ile aynı küme. Dil bilgisi/tekrar/ünite quizi artık kayıt
    tutuyor (`POST /api/immersion/item`); tutmadıkları dönemde sayımdan
    düşülüyorlardı ve ekran 13 adım gösterip 10 üzerinden sayıyordu.
  */
  /*
    YAPAY ZEKÂ HAKKI (2026-09-25): Konuşma adımı hakkı yoksa KİLİTLİ (dokununca
    adım ekranı kilidi ve nasıl açılacağını gösteriyor); Yazma adımı kilitlenmiyor,
    hakkı yoksa rozet taşıyor. Misafir ve izni reddeden kullanıcıda kilit yok.
  */
  const { user } = useAuth();
  const guest = !user || Boolean(user.guest);
  const { status: premium } = usePremiumStatus();
  const aiDeclined = useAiDeclined(!guest);
  const convLocked = (ref: string | null) => Boolean(ref) && conversationLocked(premium?.unlock, ref!, level, { guest, aiDeclined });
  const writeSpent = (id: string) => pathWritingSpent(premium?.unlock, id, level, guest);

  /*
    KİLİTLİ ADIMA DOKUNUŞ CEVAPSIZ KALMIYOR (QA F-0026). Kapalı adım hiçbir
    şey yapmıyordu: kilit simgesi küçük ve soluk, ekran okuyucu kartı
    "dokunulabilir" diye okuyordu, öğrenci üç kez dokunup bozuk sandı.
    Artık kartın altında kısa bir satır nedenini ve sıradaki adımın adını
    söylüyor (birkaç saniye sonra kalkıyor); kart "kilitli" diye okunuyor.
    Web `immersion/unit-pane` aynı satır.
  */
  const [lockedTap, setLockedTap] = useState<string | null>(null);
  useEffect(() => {
    if (!lockedTap) return;
    const id = setTimeout(() => setLockedTap(null), 4000);
    return () => clearTimeout(id);
  }, [lockedTap]);
  const currentTitle = items.find((i) => i.current)?.title ?? null;

  const counted = items.filter((i) => i.playable);
  const done = counted.filter((i) => i.done).length;
  const pct = counted.length ? Math.round((done / counted.length) * 100) : 0;

  function openItem(it: (typeof items)[number]) {
    // Kapalı adım açılmaz: kullanıcı sıradakine geçebilir ama daha sonrakine
    // geçemez — pencere ilerledikçe kendiliğinden kayar.
    if (!it.open) { haptic("tap"); setLockedTap(it.id); return; }
    if (it.kind === "conversation") { if (it.ref) nav.navigate("Conversation", { id: it.ref, result: it.result, done: it.done }); return; }
    if (!it.playable) return;
    // Gramer de ünite kimliğinden TÜRETİLİYOR (immersionQuiz.deriveGrammar),
    // yani egzersiz havuzunda karşılığı yok. Item ekranına gönderilirse
    // "açılamıyor" der; quiz oynatıcısı ise türetilmiş soruyu zaten çiziyor.
    if (it.kind === "quiz" || it.kind === "unitQuiz" || it.kind === "grammar") {
      nav.navigate("Quiz", { itemId: it.id, level, unitIndex: index, kind: it.kind, theme, result: it.result });
      return;
    }
    nav.navigate("Item", { id: it.ref ?? it.id, kind: it.kind, title: it.title, result: it.result });
  }

  return (
    // Gömülüyken zemin BOYANMIYOR: panelin kendi yüzeyi görünsün, üstüne ekran
    // zemini basılıp kap görünmez hâle gelmesin.
    <View style={{ flex: 1, backgroundColor: embedded ? "transparent" : colors.bg }}>
      <ScreenHeader
        eyebrow={t("unit.header", { level, unit: t("common.unit"), n: index })}
        title={theme}
        subtitle={topics.length ? topics.join(" · ") : undefined}
        back={!embedded}
        inset={!embedded}
      />

      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: (embedded ? 0 : insets.bottom) + spacing.xxl }} showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: spacing.sm, marginBottom: 6 }}>
          <Bar pct={pct} tint={colors.success} size="hero" />
        </View>
        <Text variant="caption" color={colors.textMuted} style={{ marginBottom: spacing.lg }}>{t("unit.steps_done", { n: done, total: counted.length })}</Text>
        <PathQuota level={level} />

        <View style={{ gap: spacing.md }}>
          {items.map((it) => {
            const tint = kindFill(it.kind);
            const Icon = kindIcon(it.kind) ?? kindIcon("conversation")!;
            const aiLock = !it.done && it.kind === "conversation" && convLocked(it.ref);
            const aiSpent = !it.done && it.kind === "write" && writeSpent(it.ref ?? it.id);
            return (
              <View key={it.id} style={{ gap: spacing.xs }}>
              <PressableScale
                onPress={() => openItem(it)}
                accessibilityRole="button"
                accessibilityState={{ disabled: !it.open }}
                accessibilityHint={it.open ? undefined : t("unit.locked")}
              >
                <Card padded style={{ opacity: it.open ? 1 : 0.55, flexDirection: "row", alignItems: "center", gap: spacing.md, borderWidth: 1, borderColor: colors.hairline }}>
                  <View style={[{ width: 46, height: 46, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: tint }, softShadow(tint, 6)]}>
                    <Icon color="#fff" size={22} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text variant="micro" color={colors.textMuted}>{t(KIND_KEY[it.kind] ?? "") || it.kind}</Text>
                    <Text variant="bodyStrong" numberOfLines={1}>{it.title}</Text>
                    {aiLock || aiSpent ? (
                      <Text variant="micro" color={colors.textMuted}>{t(aiLock ? "unlock.locked_conv" : "unlock.spent_write")}</Text>
                    ) : null}
                  </View>
                  {/* ADIMIN YÜZDESİ (2026-10-07): denenmiş adımda son sonuç, Beceriler listesindeki çiple
                      aynı görünüm — geçtiyse yeşil, geçemediyse turuncu. */}
                  {it.result && !aiLock ? (
                    <View style={{ paddingHorizontal: spacing.sm, paddingVertical: 3, borderRadius: radii.sm, backgroundColor: (it.done ? colors.success : colors.streak) + "22" }}>
                      <Text variant="micro" color={it.done ? colors.successText : colors.streakText}>{formatPercent(it.result.pct)}</Text>
                    </View>
                  ) : null}
                  {aiLock ? (
                    <LockedIcon color={colors.textMuted} size={18} />
                  ) : it.done ? (
                    <View style={{ width: 26, height: 26, borderRadius: 13, backgroundColor: colors.successSoft, alignItems: "center", justifyContent: "center" }}>
                      <CheckIcon color={colors.successText} size={16} />
                    </View>
                  ) : it.current ? (
                    <View style={{ backgroundColor: colors.primarySoft, borderRadius: radii.pill, paddingHorizontal: 10, paddingVertical: spacing.xs }}>
                      <Text variant="micro" color={colors.primaryText}>{t("unit.now")}</Text>
                    </View>
                  ) : it.open && it.playable ? (
                    <ChevronNextIcon color={colors.textFaint} size={20} />
                  ) : (
                    <LockedIcon color={colors.textFaint} size={18} />
                  )}
                </Card>
              </PressableScale>
              {lockedTap === it.id ? (
                <View accessibilityLiveRegion="polite" style={{ flexDirection: "row", alignItems: "center", gap: spacing.xs, paddingHorizontal: spacing.sm }}>
                  <LockedIcon color={colors.textMuted} size={14} />
                  <Text variant="caption" color={colors.textMuted} style={{ flex: 1 }}>
                    {currentTitle ? t("unit.locked_step", { title: currentTitle }) : t("unit.locked")}
                  </Text>
                </View>
              ) : null}
              </View>
            );
          })}
        </View>

      </ScrollView>
    </View>
  );
}

/** Kendi ekranı — route parametrelerini gövdeye devrediyor (telefon ve dikey yol). */
export function UnitScreen() {
  const { params } = useRoute<RouteProp<RootStackParams, "Unit">>();
  return <UnitPane {...params} />;
}
