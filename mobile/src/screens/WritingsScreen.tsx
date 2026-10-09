import React, { useEffect, useState } from "react";
import { t, formatDay } from "../lib/i18n";
import { View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { PressableScale } from "../ui/PressableScale";
import { AssessmentCard, type AssessmentResult } from "../ui/AssessmentCard";
import { hitSlopFor } from "../ui/touch";
import { AiNotice } from "../ui/AiNotice";
import { ChevronNextIcon, MyWritingsIcon } from "../ui/icons";
import { ConfirmDialog } from "../ui/ConfirmDialog";
import { Skeleton, SkeletonCard, SkeletonLine, SkeletonTile, textHeight } from "../ui/Skeleton";
import { useAuth } from "../lib/AuthContext";
import { fetchWritings, deleteWriting, type Writing } from "../game/writings";
import { useTheme, spacing, radii, type Palette } from "../theme";
import { CardGrid } from "../ui/CardGrid";
import { EmptyCard, ScreenHeader } from "../social/common";
import { GuestAccountCard } from "../ui/GuestAccountCard";
import { scoreBand } from "../lib/learningRules";

/** Tür -> sözlük anahtarı. */
/*
 * DÖRT TÜR. Liste yalnız `writing` ve `speaking` biliyordu; `sentence`
 * (cümle kurma turunun değerlendirmesi) ve `chat` (sohbet) satırları
 * ham anahtarlarıyla ("sentence") çiziliyordu - kullanıcı ne olduğunu
 * anlamıyordu. Web dördünü de adlandırıyor (`writings-card`).
 */
const KIND_KEY: Record<string, string> = {
  writing: "exam.sec_writing",
  sentence: "writ.kind_sentence",
  speaking: "exam.sec_speaking",
  chat: "writ.kind_chat",
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

/**
 * Kayıttaki değerlendirme, `AssessmentCard`ın beklediği biçimde. Eski satırlarda
 * alanlar eksik olabiliyor (`errors` yok); kart çökmesin, puan yoksa hiç çizilmesin.
 */
function assessmentOf(w: Writing): AssessmentResult | null {
  const r = w.result as Partial<AssessmentResult> | null;
  if (!r || typeof r.score?.overall !== "number") return null;
  return { ...r, score: r.score, errors: Array.isArray(r.errors) ? r.errors : [] };
}

/*
 * KART AÇILINCA DEĞERLENDİRMENİN KENDİSİ (QA F-0068). Dokunmak yalnız
 * "Bildir / Sil" satırını açıyordu: metnin tamamı ve yapay zekânın geri
 * bildirimi (hatalar, düzeltilmiş metin, övgü, ipucu) hiçbir yerde
 * görünmüyordu, yani arşiv yalnız bir puan listesiydi. Web kartı açılınca
 * aynı `AssessmentCard`ı çiziyor; burada da o.
 *
 * Dokunulan yer yalnız ÜST KISIM: açılan geri bildirim okunurken ona
 * dokunmak kartı kapatmasın. Alt satır ne olacağını söylüyor ("Geri
 * bildirimi gör" / "Gizle") — kartın açıldığı tahmin edilmek zorunda değil.
 *
 * PUANSIZ KAYIT AÇIKÇA SÖYLENİYOR: puan kutusunda "…" duruyordu ve bir
 * yüklenme sanılıyordu. Kutuda yazı simgesi, başlığın altında "Puan
 * bekliyor"; açılınca metnin tamamı ve ne olacağı (puanlanınca bildirim).
 *
 * GÜN TEK YERDE ve uygulamanın biçiminde ("9 Eki", QA F-0067): başlık
 * satırında ISO gün ("2026-10-09") vardı, kartın altında bir kez daha.
 */
function WritingCard({ w, colors, onDelete }: { w: Writing; colors: Palette; onDelete: (w: Writing) => void }) {
  const [open, setOpen] = useState(false);
  const result = assessmentOf(w);
  const score = result?.score.overall ?? null;
  const tone = scoreTone(score, colors);
  const kind = t(KIND_KEY[w.kind] ?? "") || w.kind;
  return (
    <Card padded style={{ marginBottom: spacing.md }}>
      <PressableScale
        onPress={() => setOpen((o) => !o)}
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        accessibilityLabel={`${kind}, ${w.level}, ${formatDay(w.day)}. ${score === null ? t("writ.pending_label") : score}`}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
          <View style={{ width: 48, height: 48, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: score === null ? colors.surface2 : scoreFill(score, colors) + "22" }}>
            {score === null ? <MyWritingsIcon size={22} color={colors.textMuted} /> : <Text variant="h3" color={tone}>{score}</Text>}
          </View>
          <View style={{ flex: 1 }}>
            {/* GÜN de yazıyor: "ne zaman yazmıştım" sorusunun cevabı listede
                olmalı, yoksa satırlar birbirinden ayırt edilemiyor (web aynı
                üçlüyü gösteriyor: tür · seviye · gün). */}
            <Text variant="bodyStrong">{kind} · {w.level} · {formatDay(w.day)}</Text>
            {score === null ? <Text variant="caption" color={colors.streakText}>{t("writ.pending_label")}</Text> : null}
            {/* Açıkken önizleme yok: metnin tamamı aşağıda (puanlıysa
                hataları vurgulanmış hâliyle) duruyor. */}
            {open ? null : <Text variant="caption" color={colors.textMuted} numberOfLines={2}>{w.answer}</Text>}
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-end", gap: spacing.xs, marginTop: spacing.sm }}>
          <Text variant="micro" color={colors.primaryText}>{open ? t("writ.hide") : score === null ? t("writ.see_text") : t("writ.see_feedback")}</Text>
          <View style={{ transform: [{ rotate: open ? "-90deg" : "90deg" }] }}><ChevronNextIcon size={14} color={colors.primaryText} /></View>
        </View>
      </PressableScale>
      {open ? (
        <View style={{ marginTop: spacing.md, gap: spacing.sm }}>
          {result ? (
            <AssessmentCard answer={w.answer} result={result} reportRef={String(w.id)} />
          ) : (
            <>
              <Text variant="body">{w.answer}</Text>
              <Text variant="caption" color={colors.textMuted}>{t("writ.pending_body")}</Text>
            </>
          )}
          {/* SİL — uç aylardır duruyor ve web kartı kullanıyordu; mobilde kendi
              yazısını silmenin hiçbir yolu yoktu. Açılan kartta duruyor ki
              listede yanlışlıkla dokunulmasın. */}
          <PressableScale onPress={() => onDelete(w)} hitSlop={hitSlopFor(0, 18)} accessibilityRole="button" accessibilityLabel={t("common.delete")} style={{ alignSelf: "flex-start" }}>
            <Text variant="micro" color={colors.dangerText}>{t("common.delete")}</Text>
          </PressableScale>
        </View>
      ) : null}
    </Card>
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
  const [pendingDelete, setPendingDelete] = useState<Writing | null>(null);
  function askDelete(w: Writing) { setPendingDelete(w); }
  function reallyDelete() {
    const w = pendingDelete;
    setPendingDelete(null);
    if (!w) return;
    /* Satır ÖNCE gidiyor, sunucu sonra: silme başarısızsa liste bir
       sonraki açılışta zaten doğruyu gösterir ve kullanıcı beklemiyor. */
    setItems((list) => (list ?? []).filter((x) => x.id !== w.id));
    void deleteWriting(w.id).catch(() => {});
  }
  const [phase, setPhase] = useState<"loading" | "ready" | "error">("loading");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!user) { setPhase("error"); return; }
    /* Misafirin yapay zekâ değerlendirmesi yok, arşiv hep boş: istek atılmıyor. */
    if (user.guest) { setItems([]); setPhase("ready"); return; }
    let alive = true;
    setPhase("loading");
    fetchWritings().then((it) => { if (alive) { setItems(it); setPhase("ready"); } }).catch(() => { if (alive) setPhase("error"); });
    return () => { alive = false; };
  }, [user, attempt]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      {/* ALT BAŞLIK: listenin ne topladığını ve metinlerin yalnız kullanıcıya
          görünür olduğunu söylüyor (web `writings-card` `writ.sub`). */}
      <ScreenHeader title={t("writings.my_writing")} subtitle={t("writ.sub")} />
      {phase === "loading" ? (
        /* İSKELETİN EKRAN OKUYUCU KARŞILIĞI: yükleme yalnız görseldeydi, sesli
           okuyucu boş bir ekran duyuruyordu. Web aynı iskelete `aria-busy` ve
           etiket koyuyor. */
        <ScrollView accessibilityRole="progressbar" accessibilityLabel={t("writ.loading")} contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: insets.bottom + spacing.xxl }} showsVerticalScrollIndicator={false}>
          {/* Gerçek dalın sırası: yapay zekâ notu, sonra `CardGrid` içinde
              kayıt kartları. Not ve ızgara eksikti: geniş ekranda iki sütuna
              açılan liste iskelette tek sütundu, kartlar notun yüksekliği
              kadar yukarıdan başlıyordu. */}
          <Skeleton height={spacing.sm * 2 + textHeight("micro")} radius={radii.md} style={{ marginBottom: spacing.md }} />
          <CardGrid>
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
          </CardGrid>
        </ScrollView>
      ) : phase === "error" || (items && items.length === 0) ? (
        /* YÜKLENEMEDİ ile BOŞ AYRI ŞEY. İkisine de "henüz değerlendirilmiş
           yazın yok" yazılıyordu: ağı kopan kullanıcıya, yazdığı metinlerin
           yok olduğu söyleniyordu. */
        /* Kart üstte (Yapabildiklerim ve sosyal ekranlar gibi), ortada değil. */
        <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.sm }}>
          {/*
            BOŞ HÂL BİR ÇIKIŞ YOLU VERİYOR. Eskiden tek cümle vardı ve
            kullanıcı "nereye gideceğim" sorusuyla baş başa kalıyordu; web
            aynı yerde başlık + ne olduğunu anlatan bir paragraf + yazma
            alıştırmalarına götüren düğme gösteriyor (`writings-card`).
            Hata hâli ayrı kalıyor: ağı kopan kullanıcıya "yazın yok"
            denmiyor.
          */}
          {/* Kabuk EL YAPIMI DEĞİL. Bu ekran kendi karosunu (80 px, `xl`
              yarıçap, yumuşak zemin) ve kendi düğmesini kuruyordu; web aynı
              yerde `EmptyCard` çiziyor (`writings-card`) ve ev kalıbı da o
              (52 px dolu karo). İki hâl aynı kapta: duyuru yalnız hata
              hâlinde — "yazın yok" bir hata değil. */}
          {/* MİSAFİR: "henüz yazın yok, yazmaya git" sözü tutmuyordu — misafirin
              yazısı değerlendirilmiyor ve buraya hiç düşmüyor. */}
          {user?.guest ? (
            <GuestAccountCard icon={MyWritingsIcon} tint={colors.info} title={t("guest.writings_title")} text={t("guest.writings_body")} />
          ) : phase === "error" ? (
            <EmptyCard
              live="assertive"
              icon={MyWritingsIcon}
              tint={colors.info}
              title={t("writings.my_writing")}
              text={t("writings.couldn_t_load_writings")}
              action={user ? t("common.try_again") : undefined}
              onAction={user ? () => setAttempt((n) => n + 1) : undefined}
            />
          ) : (
            <EmptyCard
              icon={MyWritingsIcon}
              tint={colors.info}
              title={t("writ.empty_title")}
              text={t("writ.empty_sub")}
              action={t("writ.go_to_writing")}
              onAction={() => nav.navigate("Tabs", { screen: "Skills" })}
            />
          )}
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: insets.bottom + spacing.xxl }} showsVerticalScrollIndicator={false}>
          <AiNotice variant="output" style={{ marginBottom: spacing.md }} />
          <CardGrid>
            {(items ?? []).map((w) => <WritingCard key={w.id} w={w} colors={colors} onDelete={askDelete} />)}
          </CardGrid>
        </ScrollView>
      )}
      <ConfirmDialog
        visible={!!pendingDelete}
        title={t("writ.delete_confirm")}
        confirmLabel={t("common.delete")}
        cancelLabel={t("common.discard")}
        destructive
        onConfirm={reallyDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </View>
  );
}
