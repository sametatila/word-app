import React, { useCallback, useMemo, useState } from "react";
import { t } from "../lib/i18n";
import { View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { PressableScale } from "../ui/PressableScale";
import { ArrowBackIcon, CheckIcon } from "../ui/icons";
import { SkeletonBar, SkeletonCard, SkeletonLine, SkeletonTile } from "../ui/Skeleton";
import { useAuth } from "../lib/AuthContext";
import { fetchCando, type CandoData, type CandoItem } from "../game/cando";
import { useTheme, spacing, radii, type Palette } from "../theme";
import { CardGrid } from "../ui/CardGrid";
import { EmptyCard } from "../social/common";

const LEVELS = ["A1", "A2", "B1", "B2", "C1"];
/**
 * Beceri KODU -> sözlük anahtarı — web `CANDO_SKILL_LABEL_KEYS` ile aynı beş
 * satır (`check:parity` karşılaştırıyor).
 *
 * Eşleme uzun adlarla ("reading", "listening") yazılıydı, oysa `/api/cando`
 * beceriyi CEFR koduyla gönderiyor (`RD`, `LS`, `WR`, `SPK`, `GR` - bkz.
 * `lib/cando` `CandoSkill`). Yani arama HER SATIRDA boşa düşüyor ve ifadenin
 * altında çeviri yerine ham kod ("RD") yazıyordu.
 */
const SKILL_KEY: Record<string, string> = { RD: "skills.reading", LS: "skills.listening", WR: "skills.writing", SPK: "skills.speaking", GR: "skills.grammar" };

function Row({ it, colors }: { it: CandoItem; colors: Palette }) {
  const tint = it.state === "proven" ? colors.success : it.state === "progressing" ? colors.primary : colors.textFaint;
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: 10 }}>
      {/* DURUM EKRAN OKUYUCUYA DA SÖYLENİYOR. Daire rengi ve içindeki sayı
          göreni bilgilendiriyor, ekran okuyucu kullanıcısına hiçbir şey
          söylemiyordu. Web aynı bilgiyi ipucu metniyle veriyor. */}
      <View accessibilityLabel={t(it.state === "proven" ? "cando.proven" : it.state === "progressing" ? "cando.progressing" : "cando.not_yet")} style={{ width: 26, height: 26, borderRadius: 13, alignItems: "center", justifyContent: "center", backgroundColor: it.state === "proven" ? colors.successSoft : colors.surface2 }}>
        {it.state === "proven" ? <CheckIcon color={colors.successText} size={15} /> : <Text variant="micro" color={tint}>{it.total ? `${it.done}/${it.total}` : ""}</Text>}
      </View>
      <View style={{ flex: 1 }}>
        <Text variant="body" color={it.state === "none" ? colors.textMuted : colors.text}>{it.cando.tr}</Text>
        <Text variant="micro" color={colors.textFaint}>{t(SKILL_KEY[it.cando.skill] ?? "") || it.cando.skill}</Text>
      </View>
    </View>
  );
}

export function CandoScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<{ goBack: () => void }>();
  const { user } = useAuth();
  const [data, setData] = useState<CandoData | null>(null);
  const [phase, setPhase] = useState<"loading" | "ready" | "error">("loading");
  /* Tekrar deneme sayaci: artinca yukleme etkisi yeniden kosuyor. Kalip
     `AchievementsScreen`/`ExamScreen` ile ayni. */
  const [attempt, setAttempt] = useState(0);

  /*
   * EKRANA HER DÖNÜŞTE TAZE.
   *
   * Veri bir kez, `user` değişince yükleniyordu. Ama bu ekranın içeriğini
   * DEĞİŞTİREN şey ders ve alıştırma bitirmek: kullanıcı bir konuşmayı
   * tamamlayıp buraya dönünce eski listeyi görüyordu ve yenileme yolu yoktu
   * (çekerek yenileme de yok). Webin karşılığı sunucu bileşeni ve
   * `force-dynamic`, yani oraya her gidişte taze geliyor.
   *
   * `useFocusEffect` bu depoda zaten kullanılan kalıp (`SkillsScreen`,
   * `MockExamsScreen`): sekme/ekran öne gelince yeniden çekiyor.
   */
  useFocusEffect(
    useCallback(() => {
      if (!user) { setPhase("error"); return; }
      let alive = true;
      setPhase("loading");
      fetchCando().then((d) => { if (alive) { setData(d); setPhase("ready"); } }).catch(() => { if (alive) setPhase("error"); });
      return () => { alive = false; };
    }, [user, attempt]),
  );

  const byLevel = useMemo(() => {
    const g: Record<string, CandoItem[]> = {};
    for (const it of data?.items ?? []) (g[it.cando.level] ??= []).push(it);
    return g;
  }, [data]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
        <PressableScale hitSlop={4} onPress={() => nav.goBack()} accessibilityLabel={t("common.back")} style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
          <ArrowBackIcon color={colors.text} size={24} />
        </PressableScale>
        <Text variant="h2">{t("cando.what_i_can_do")}</Text>
      </View>
      {phase === "loading" ? (
        // İçeriğin şekli: seviye özeti kartı + iki grup listesi (spinner değil).
        <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xxl }} showsVerticalScrollIndicator={false}>
          {/* Etiket EN ÜSTTEKİ karta: `SkeletonCard` "meşgul" diyor (§152),
              neyin yüklendiğini söyleyen etiket burada. Web aynı kartta
              `aria-label={t("cando.loading")}` taşıyor. */}
          <SkeletonCard label={t("cando.loading")} style={{ marginTop: spacing.sm, marginBottom: spacing.lg }}>
            {[0, 1].map((i) => (
              <View key={i} style={{ marginBottom: spacing.sm }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}>
                  <SkeletonLine variant="bodyStrong" width={28} />
                  <SkeletonLine variant="caption" width={78} />
                </View>
                <SkeletonBar height={7} />
              </View>
            ))}
          </SkeletonCard>
          {[0, 1].map((g) => (
            <View key={g} style={{ marginBottom: spacing.lg }}>
              <SkeletonLine variant="caption" width={26} style={{ marginBottom: spacing.xs, marginLeft: 4 }} />
              <SkeletonCard padded>
                {[0, 1, 2, 3].map((i) => (
                  <View key={i} style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: 10 }}>
                    <SkeletonTile size={26} radius={13} />
                    <View style={{ flex: 1 }}>
                      <SkeletonLine variant="body" width="80%" />
                      <SkeletonLine variant="micro" width="30%" />
                    </View>
                  </View>
                ))}
              </SkeletonCard>
            </View>
          ))}
        </ScrollView>
      ) : phase === "ready" && !(data?.items ?? []).length ? (
        /*
          BOŞ DURUM — ekran bomboş açılıyordu.
          Veri gelip de içi boşsa (henüz ders/alıştırma bitirilmemiş) iki
          süzgeç de hiçbir şey döndürüyor ve kullanıcı yalnız başlığı görüyordu:
          bir şeyin yüklenmediğini mi, yapacak bir şey olmadığını mı
          anlayamıyor. Web aynı durumda `EmptyCard` gösteriyor (`cando-card`)
          ve metni bu; anahtar mobil sözlükte de duruyordu, kullanılmıyordu.
        */
        <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.sm }}>
          <EmptyCard
            icon={CheckIcon}
            tint={colors.success}
            title={t("cando.what_i_can_do")}
            text={t("cando.sign_in_and_finish_lessons_and")}
          />
        </View>
      ) : phase === "error" ? (
        /*
          HATA DALI YANLIŞ SEBEBİ SÖYLÜYORDU. İstek düştüğünde ekran BOŞ
          DURUM metnini yazıyordu ("giriş yapıp dersleri bitir") — ağı kopan
          kullanıcıya yanlış sebep, üstelik tekrar deneme yolu da yoktu ve
          bu ekranda çekerek yenileme de yok, yani tek çıkış ekrandan
          çıkmaktı. Webde aynı kusur vardı (`cando-card` tek kartla iki
          durumu karşılıyordu) ve ikisi birlikte düzeltildi.

          Duyuru da eklendi: ekranı kaplayan bir hata metni canlı bölge
          değilse TalkBack kullanan biri hiçbir şey duymuyor.
        */
        <View accessibilityLiveRegion="assertive" style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: spacing.lg, paddingHorizontal: spacing.xl }}>
          <Text variant="h2" style={{ textAlign: "center" }}>{t("cando.couldn_t_load")}</Text>
          <Text variant="body" color={colors.textMuted} style={{ textAlign: "center" }}>{t("cando.rule")}</Text>
          <PressableScale onPress={() => setAttempt((n) => n + 1)} style={{ paddingHorizontal: 18, paddingVertical: 12, borderRadius: radii.md, borderWidth: 1.5, borderColor: colors.border }}>
            <Text variant="bodyStrong" color={colors.primaryText}>{t("common.try_again")}</Text>
          </PressableScale>
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xxl }} showsVerticalScrollIndicator={false}>
          {/*
            KANIT KURALI. "Kanıtlı" ne demek yalnız webde yazıyordu
            (`cando-card`): mobilde kullanıcı tikin ne zaman geleceğini
            bilmeden listeye bakıyordu. Ölçüt görünmeyince liste bir aynadan
            çok bir bilmeceye benziyor.
          */}
          <Text variant="micro" color={colors.textMuted} style={{ marginTop: spacing.sm }}>
            {t("cando.rule")} {t("cando.n_proven", { n: (data?.items ?? []).filter((i) => i.state === "proven").length })}.
          </Text>

          {/* seviye özeti */}
          <Card style={{ marginTop: spacing.sm, marginBottom: spacing.lg }}>
            {LEVELS.filter((lv) => data?.byLevel?.[lv]?.total).map((lv) => {
              const b = data!.byLevel[lv]; const pct = b.total ? Math.round((b.proven / b.total) * 100) : 0;
              return (
                <View key={lv} style={{ marginBottom: spacing.sm }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}>
                    <Text variant="bodyStrong">{lv}</Text>
                    <Text variant="caption" color={colors.textMuted}>{t("cando.proven_of_total", { proven: b.proven, total: b.total })}</Text>
                  </View>
                  <View style={{ height: 7, borderRadius: 4, backgroundColor: colors.surface2, overflow: "hidden" }}>
                    <View style={{ height: "100%", width: `${Math.max(2, pct)}%`, backgroundColor: colors.success, borderRadius: 4 }} />
                  </View>
                </View>
              );
            })}
          </Card>
          <CardGrid minItemWidth={440}>
          {LEVELS.filter((lv) => byLevel[lv]?.length).map((lv) => (
            <View key={lv} style={{ marginBottom: spacing.lg }}>
              <Text variant="caption" color={colors.textMuted} style={{ marginBottom: spacing.xs, marginLeft: 4 }}>{lv}</Text>
              <Card padded>
                {byLevel[lv].map((it, i) => (
                  <View key={it.cando.id}>
                    {i > 0 ? <View style={{ height: 1, backgroundColor: colors.hairline }} /> : null}
                    <Row it={it} colors={colors} />
                  </View>
                ))}
              </Card>
            </View>
          ))}
          </CardGrid>
        </ScrollView>
      )}
    </View>
  );
}
