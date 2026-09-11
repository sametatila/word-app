import React, { useEffect, useState } from "react";
import { t } from "../lib/i18n";
import { Alert, View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { PressableScale } from "../ui/PressableScale";
import { ReportSheet } from "../ui/ReportSheet";
import { AiNotice } from "../ui/AiNotice";
import { ArrowBackIcon, WriteIcon } from "../ui/icons";
import { SkeletonCard, SkeletonLine, SkeletonTile } from "../ui/Skeleton";
import { useAuth } from "../lib/AuthContext";
import { fetchWritings, deleteWriting, type Writing } from "../game/writings";
import { useTheme, spacing, radii, softShadow, type Palette } from "../theme";
import { CardGrid } from "../ui/CardGrid";
import { scoreBand } from "../lib/learningRules";

/** Tür -> sözlük anahtarı. */
/*
 * DÖRT TÜR. Liste yalnız `writing` ve `speaking` biliyordu; `sentence`
 * (cümle kurma turunun değerlendirmesi) ve `roleplay` (rol yapma) satırları
 * ham anahtarlarıyla ("sentence") çiziliyordu - kullanıcı ne olduğunu
 * anlamıyordu. Web dördünü de adlandırıyor (`writings-card`).
 */
const KIND_KEY: Record<string, string> = {
  writing: "exam.sec_writing",
  sentence: "writ.kind_sentence",
  speaking: "exam.sec_speaking",
  roleplay: "writ.kind_roleplay",
};

/**
 * Puan kutusunun YAZI rengi.
 *
 * Dolgu renkleri (`success`/`streak`/`danger`) kendi %13 tintlerinin üstünde
 * okunmuyordu: ölçüm açık temada 3.06 / 2.54 / 3.58 - kehribar büyük yazı
 * eşiği 3.0'ı bile tutmuyor. Metin varyantları aynı yerde 4.43 / 4.36 / 4.93.
 * Kutunun ZEMİNİ dolgu renginden kalmaya devam ediyor (aşağıda `+ "22"`);
 * ayrım zaten bunun için var.
 */
function scoreTone(score: number | null, colors: Palette): string {
  if (score === null) return colors.textMuted;
  const band = scoreBand(score);
  return band === "good" ? colors.successText : band === "mid" ? colors.streakText : colors.dangerText;
}

/** Puan kutusunun ZEMİNİ - dolgu ailesinin tam parlaklığı. */
function scoreFill(score: number | null, colors: Palette): string {
  if (score === null) return colors.surface2;
  const band = scoreBand(score);
  return band === "good" ? colors.success : band === "mid" ? colors.streak : colors.danger;
}

function WritingCard({ w, colors, onReport, onDelete }: { w: Writing; colors: Palette; onReport: (w: Writing) => void; onDelete: (w: Writing) => void }) {
  const [open, setOpen] = useState(false);
  const score = w.result?.score?.overall ?? null;
  const tone = scoreTone(score, colors);
  return (
    <PressableScale onPress={() => setOpen((o) => !o)}>
      <Card padded style={{ marginBottom: spacing.md }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
          <View style={{ width: 48, height: 48, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: score === null ? colors.surface2 : scoreFill(score, colors) + "22" }}>
            <Text variant="h3" color={tone}>{score ?? "…"}</Text>
          </View>
          <View style={{ flex: 1 }}>
            {/* GÜN de yazıyor: "ne zaman yazmıştım" sorusunun cevabı listede
                olmalı, yoksa satırlar birbirinden ayırt edilemiyor (web aynı
                üçlüyü gösteriyor: tür · seviye · gün). */}
            <Text variant="bodyStrong">{t(KIND_KEY[w.kind] ?? "") || w.kind} · {w.level} · {w.day}</Text>
            <Text variant="caption" color={colors.textMuted} numberOfLines={open ? undefined : 2}>{w.answer}</Text>
          </View>
        </View>
        {open && score === null ? <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.sm }}>{t("writings.to_be_graded")}</Text> : null}
        {/* SİL — uç aylardır duruyor ve web kartı kullanıyordu; mobilde kendi
            yazısını silmenin hiçbir yolu yoktu. Açılan kartta duruyor ki
            listede yanlışlıkla dokunulmasın. */}
        {open ? (
          <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.lg, marginTop: spacing.sm }}>
            {score !== null ? (
              <PressableScale onPress={() => onReport(w)} hitSlop={8} accessibilityLabel={t("writings.report_this_feedback")}>
                <Text variant="micro" color={colors.textFaint}>{t("writings.report_this_feedback")}</Text>
              </PressableScale>
            ) : null}
            <PressableScale onPress={() => onDelete(w)} hitSlop={8} accessibilityLabel={t("common.delete")}>
              <Text variant="micro" color={colors.dangerText}>{t("common.delete")}</Text>
            </PressableScale>
          </View>
        ) : null}
        <Text variant="micro" color={colors.textFaint} style={{ marginTop: spacing.sm }}>{w.day}</Text>
      </Card>
    </PressableScale>
  );
}

export function WritingsScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { user } = useAuth();
  const [items, setItems] = useState<Writing[] | null>(null);

  /* Silme ONAY İSTİYOR: geri alınamaz ve kullanıcının kendi ürettiği metin.
     Web de aynı soruyu soruyor (`writ.delete_confirm`). */
  function askDelete(w: Writing) {
    Alert.alert(t("writ.delete_confirm"), undefined, [
      { text: t("common.discard"), style: "cancel" },
      {
        text: t("common.delete"),
        style: "destructive",
        onPress: () => {
          /* Satır ÖNCE gidiyor, sunucu sonra: silme başarısızsa liste bir
             sonraki açılışta zaten doğruyu gösterir ve kullanıcı beklemiyor. */
          setItems((list) => (list ?? []).filter((x) => x.id !== w.id));
          void deleteWriting(w.id).catch(() => {});
        },
      },
    ]);
  }
  const [phase, setPhase] = useState<"loading" | "ready" | "error">("loading");
  const [report, setReport] = useState<Writing | null>(null); // "Bildir" açık olan değerlendirme
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!user) { setPhase("error"); return; }
    let alive = true;
    setPhase("loading");
    fetchWritings().then((it) => { if (alive) { setItems(it); setPhase("ready"); } }).catch(() => { if (alive) setPhase("error"); });
    return () => { alive = false; };
  }, [user, attempt]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
        <PressableScale hitSlop={4} onPress={() => nav.goBack()} accessibilityLabel={t("common.back")} style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
          <ArrowBackIcon color={colors.text} size={24} />
        </PressableScale>
        {/* ALT BAŞLIK: listenin ne topladığını ve metinlerin yalnız kullanıcıya
            görünür olduğunu söylüyor. Web kartın altında baştan beri yazıyor
            (`writings-card` `writ.sub`); mobilde yalnız başlık vardı, yani
            "bunlar kime görünüyor" sorusu ekranda hiç cevaplanmıyordu. */}
        <View style={{ flex: 1 }}>
          <Text variant="h2">{t("writings.my_writing")}</Text>
          <Text variant="micro" color={colors.textMuted} style={{ lineHeight: 17 }} numberOfLines={2}>{t("writ.sub")}</Text>
        </View>
      </View>
      {phase === "loading" ? (
        /* İSKELETİN EKRAN OKUYUCU KARŞILIĞI: yükleme yalnız görseldeydi, sesli
           okuyucu boş bir ekran duyuruyordu. Web aynı iskelete `aria-busy` ve
           etiket koyuyor. */
        <ScrollView accessibilityRole="progressbar" accessibilityLabel={t("writ.loading")} contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: insets.bottom + spacing.xxl }} showsVerticalScrollIndicator={false}>
          {[0, 1, 2, 3].map((i) => (
            <SkeletonCard key={i} style={{ marginBottom: spacing.md }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
                <SkeletonTile size={48} />
                <View style={{ flex: 1 }}>
                  <SkeletonLine variant="bodyStrong" width="45%" />
                  <SkeletonLine variant="caption" width="100%" />
                  <SkeletonLine variant="caption" width="70%" />
                </View>
              </View>
              <SkeletonLine variant="micro" width={72} style={{ marginTop: spacing.sm }} />
            </SkeletonCard>
          ))}
        </ScrollView>
      ) : phase === "error" || (items && items.length === 0) ? (
        /* YÜKLENEMEDİ ile BOŞ AYRI ŞEY. İkisine de "henüz değerlendirilmiş
           yazın yok" yazılıyordu: ağı kopan kullanıcıya, yazdığı metinlerin
           yok olduğu söyleniyordu. */
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: spacing.lg, paddingHorizontal: spacing.xl }}>
          <View style={{ width: 80, height: 80, borderRadius: radii.xl, backgroundColor: colors.primarySoft, alignItems: "center", justifyContent: "center" }}><WriteIcon color={colors.primary} size={36} /></View>
          {/*
            BOŞ HÂL BİR ÇIKIŞ YOLU VERİYOR. Eskiden tek cümle vardı ve
            kullanıcı "nereye gideceğim" sorusuyla baş başa kalıyordu; web
            aynı yerde başlık + ne olduğunu anlatan bir paragraf + yazma
            alıştırmalarına götüren düğme gösteriyor (`writings-card`).
            Hata hâli ayrı kalıyor: ağı kopan kullanıcıya "yazın yok"
            denmiyor.
          */}
          {phase === "error" ? (
            /* Duyuru ORTAK KABA degil bu metne: kap bos hali de tasiyor ve
               "yazin yok" bir hata degil, duyurulmasi gerekmiyor. */
            <Text accessibilityLiveRegion="assertive" variant="body" color={colors.textMuted} style={{ textAlign: "center" }}>{t("writings.couldn_t_load_writings")}</Text>
          ) : (
            <>
              <Text variant="h3" style={{ textAlign: "center" }}>{t("writ.empty_title")}</Text>
              <Text variant="caption" color={colors.textMuted} style={{ textAlign: "center", lineHeight: 20 }}>{t("writ.empty_sub")}</Text>
              <PressableScale onPress={() => nav.navigate("Tabs", { screen: "Skills" })} style={[{ backgroundColor: colors.primary, borderRadius: radii.lg, paddingHorizontal: spacing.xl, paddingVertical: 13 }, softShadow(colors.primary, 8)]}>
                <Text variant="bodyStrong" color={colors.onPrimary}>{t("writ.go_to_writing")}</Text>
              </PressableScale>
            </>
          )}
          {phase === "error" && user ? (
            <PressableScale onPress={() => setAttempt((n) => n + 1)} style={{ paddingHorizontal: 18, paddingVertical: 10, borderRadius: radii.md, borderWidth: 1.5, borderColor: colors.border }}>
              <Text variant="bodyStrong" color={colors.primaryText}>{t("common.try_again")}</Text>
            </PressableScale>
          ) : null}
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: insets.bottom + spacing.xxl }} showsVerticalScrollIndicator={false}>
          <AiNotice variant="output" style={{ marginBottom: spacing.md }} />
          <CardGrid minItemWidth={420}>
            {(items ?? []).map((w) => <WritingCard key={w.id} w={w} colors={colors} onReport={setReport} onDelete={askDelete} />)}
          </CardGrid>
        </ScrollView>
      )}
      <ReportSheet visible={!!report} kind="assessment" refId={report ? String(report.id) : ""} content={report ? JSON.stringify(report.result ?? {}) : ""} onClose={() => setReport(null)} />
    </View>
  );
}
