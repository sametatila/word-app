import React from "react";
import { kindIcon, kindTint } from "../ui/unitKind";
import { t } from "../lib/i18n";
import { View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { PressableScale } from "../ui/PressableScale";
import { ArrowBackIcon, ChevronRightIcon, CheckIcon, LockIcon } from "../ui/icons";
import { KIND_KEY, type ItemKind } from "../data/unit";
import { useTheme, spacing, radii, softShadow } from "../theme";


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

export function UnitPane({ index, level, theme, items: gelenItems, embedded = false }: UnitPaneProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  // İçeriği olmayan (oynanamaz) slotlar listede hiç görünmez: "Yakında" rozeti yerine
  // ünite yalnız gerçekten yapılabilecek adımları gösterir; ilerleme yüzdesi de onlara göre.
  const raw = (gelenItems ?? [])
    .filter((i) => i.playable || i.kind === "lesson")
    .map((i) => ({ id: i.id, kind: i.kind as ItemKind, title: i.title, done: i.done, playable: i.playable, open: i.open !== false, attempted: i.attempted ?? i.done, ref: i.ref ?? null }));
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
    İLERLEME YALNIZ KAYIT TUTAN ADIMLARA GÖRE — web ile aynı ölçüt.

    Quiz ve kontrol noktası ünite brief'inden türetilen pratik: oynanabilir
    ama madde başına "bitti" kaydı tutmuyorlar (v1). Paydaya katılınca ünite
    hiçbir zaman %100 görünmüyordu — mobilde tavan 10/12 idi, webde aynı
    ünite 10/10 diyordu. Sunucu da (immersion/state) sayıma yalnız ders ve
    beceriyi alıyor; mobil ölçütü ona hizalandı.
  */
  const counted = items.filter(
    (i) => i.kind === "lesson" || i.kind === "read" || i.kind === "listen" || i.kind === "write",
  );
  const done = counted.filter((i) => i.done).length;
  const pct = counted.length ? Math.round((done / counted.length) * 100) : 0;

  function openItem(it: (typeof items)[number]) {
    // Kapalı adım açılmaz: kullanıcı sıradakine geçebilir ama daha sonrakine
    // geçemez — pencere ilerledikçe kendiliğinden kayar.
    if (!it.open) return;
    if (it.kind === "lesson") { if (it.ref) nav.navigate("Lesson", { id: it.ref }); return; }
    if (!it.playable) return;
    // Gramer de ünite kimliğinden TÜRETİLİYOR (immersionQuiz.deriveGrammar),
    // yani egzersiz havuzunda karşılığı yok. Item ekranına gönderilirse
    // "açılamıyor" der; quiz oynatıcısı ise türetilmiş soruyu zaten çiziyor.
    if (it.kind === "quiz" || it.kind === "checkpoint" || it.kind === "grammar") {
      nav.navigate("Quiz", { itemId: it.id, level, unitIndex: index, kind: it.kind, theme });
      return;
    }
    nav.navigate("Item", { id: it.ref ?? it.id, kind: it.kind, title: it.title });
  }

  return (
    // Gömülüyken zemin BOYANMIYOR: panelin kendi yüzeyi görünsün, üstüne ekran
    // zemini basılıp kap görünmez hâle gelmesin.
    <View style={{ flex: 1, backgroundColor: embedded ? "transparent" : colors.bg }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingTop: (embedded ? 0 : insets.top) + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
        {!embedded && (
          <PressableScale hitSlop={4} onPress={() => nav.goBack()} accessibilityLabel={t("common.back")} style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
            <ArrowBackIcon color={colors.text} size={24} />
          </PressableScale>
        )}
        <View style={{ flex: 1 }}>
          <Text variant="micro" color={colors.textMuted}>{t("unit.header", { level, unit: t("common.unit"), n: index })}</Text>
          <Text variant="h2">{theme}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: (embedded ? 0 : insets.bottom) + spacing.xxl }} showsVerticalScrollIndicator={false}>
        <View style={{ height: 10, borderRadius: 5, backgroundColor: colors.surface2, overflow: "hidden", marginTop: spacing.sm, marginBottom: 6 }}>
          <View style={{ height: "100%", width: `${pct}%`, backgroundColor: colors.success, borderRadius: 5 }} />
        </View>
        <Text variant="caption" color={colors.textMuted} style={{ marginBottom: spacing.lg }}>{t("unit.steps_done", { n: done, total: counted.length })}</Text>

        <View style={{ gap: spacing.md }}>
          {items.map((it) => {
            const tint = colors[kindTint(it.kind)] as string;
            const Icon = kindIcon(it.kind) ?? kindIcon("lesson")!;
            return (
              <PressableScale key={it.id} onPress={() => openItem(it)}>
                <Card padded style={{ opacity: it.open ? 1 : 0.55, flexDirection: "row", alignItems: "center", gap: spacing.md, borderWidth: it.current ? 2 : 1, borderColor: it.current ? colors.primary : colors.hairline }}>
                  <View style={[{ width: 46, height: 46, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: tint }, softShadow(tint, 6)]}>
                    <Icon color="#fff" size={22} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text variant="micro" color={colors.textMuted}>{t(KIND_KEY[it.kind] ?? "") || it.kind}</Text>
                    <Text variant="bodyStrong" numberOfLines={1}>{it.title}</Text>
                  </View>
                  {it.done ? (
                    <View style={{ width: 26, height: 26, borderRadius: 13, backgroundColor: colors.successSoft, alignItems: "center", justifyContent: "center" }}>
                      <CheckIcon color={colors.success} size={16} />
                    </View>
                  ) : it.current ? (
                    <View style={{ backgroundColor: colors.primarySoft, borderRadius: radii.pill, paddingHorizontal: 10, paddingVertical: 4 }}>
                      <Text variant="micro" color={colors.primary}>{t("unit.now")}</Text>
                    </View>
                  ) : it.open && it.playable ? (
                    <ChevronRightIcon color={colors.textFaint} size={20} />
                  ) : (
                    <LockIcon color={colors.textFaint} size={18} />
                  )}
                </Card>
              </PressableScale>
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
