import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, Modal, ScrollView, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { t, dateLocale } from "../lib/i18n";
import { Text } from "./Text";
import { PressableScale } from "./PressableScale";
import { CheckIcon, MicIcon, SparkIcon } from "./icons";
import { SkeletonLine } from "./Skeleton";
import { openLegal } from "../lib/legal";
import {
  decideAiConsent,
  fetchAiConsent,
  registerAiConsentHost,
  type AiConsentProcessor,
  type AiConsentPurpose,
} from "../lib/aiConsent";
import { useTheme, spacing, radii, softShadow, type Palette, ds } from "../theme";
import { ContentColumn } from "./ContentColumn";

/**
 * Yapay zekâ işleme rızası ekranı — web `components/ai-consent-dialog`in karşılığı.
 *
 * Apple'ın 5.1.2(i) retlerinde istenen dört şey sırayla ekranda: NE gönderiliyor,
 * KİME (sağlayıcılar adıyla, gizlilik politikasının tablosundan), göndermeden
 * ÖNCE izin, ve politikaya bağlantı. Play'in belirgin açıklama kuralı da aynı
 * şeyi istiyor: olumlu bir eylemle onay, başka açıklamalarla paketlenmemiş.
 *
 * İKİ DÜĞME BİLEREK AYNI AĞIRLIKTA DEĞİL AMA İKİSİ DE AÇIK. Bu bir sistem izni
 * öncesi ekranı değil (orada tek "Devam" düğmesi beklenir); bir VERİ PAYLAŞIMI
 * rızası ve reddetmek kabul etmek kadar kolay olmalı. "Yapay zekâ olmadan
 * devam et" kararı kaydediliyor ve ekran bir daha kendiliğinden açılmıyor.
 *
 * Donanım geri tuşu ya da dışarı çıkış karar YAZMIYOR: kullanıcı okumadan
 * kapattıysa ne evet ne hayır dedi; bir sonraki yapay zekâ çağrısında yeniden
 * sorulur.
 */
function copyOf(purpose: AiConsentPurpose) {
  return purpose === "ai_text"
    ? {
        title: t("aiconsent.text_title"),
        lead: t("aiconsent.text_lead"),
        points: [t("aiconsent.text_what"), t("aiconsent.text_why"), t("aiconsent.text_without"), t("aiconsent.change_later")],
        decline: t("aiconsent.decline_text"),
      }
    : {
        title: t("aiconsent.voice_title"),
        lead: t("aiconsent.voice_lead"),
        points: [t("aiconsent.voice_what"), t("aiconsent.voice_without"), t("aiconsent.change_later")],
        decline: t("aiconsent.decline_voice"),
      };
}

function Point({ text, colors }: { text: string; colors: Palette }) {
  return (
    <View style={{ flexDirection: "row", gap: spacing.md, alignItems: "flex-start" }}>
      <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: colors.primarySoft, alignItems: "center", justifyContent: "center", marginTop: 2 }}>
        <CheckIcon color={colors.primaryText} size={14} />
      </View>
      <Text variant="body" style={{ flex: 1 }}>{text}</Text>
    </View>
  );
}

/**
 * Sağlayıcı listesi — mikrofon açıklama ekranı da aynı bileşeni kullanıyor ki
 * iki ekran alıcıları aynı biçimde saysın.
 */
export function ProcessorList({ processors, failed, colors }: { processors: AiConsentProcessor[] | null; failed: boolean; colors: Palette }) {
  return (
    <View style={{ backgroundColor: colors.surface2, borderRadius: radii.lg, padding: spacing.md, gap: spacing.sm }}>
      <Text variant="micro" color={colors.textMuted} style={{ letterSpacing: 0.5 }}>{t("aiconsent.providers").toLocaleUpperCase(dateLocale())}</Text>
      {failed ? (
        <Text variant="caption" color={colors.dangerText} accessibilityLiveRegion="polite">{t("aiconsent.load_failed")}</Text>
      ) : processors === null ? (
        [0, 1, 2].map((i) => (
          <View key={i}>
            <SkeletonLine variant="bodyStrong" width="40%" />
            <SkeletonLine variant="caption" width="75%" />
          </View>
        ))
      ) : (
        processors.map((p) => (
          <View key={p.name} accessible accessibilityLabel={`${p.name}, ${p.purpose}, ${p.region}`}>
            <Text variant="bodyStrong">{p.name}</Text>
            <Text variant="caption" color={colors.textMuted}>{p.purpose} · {p.region}</Text>
          </View>
        ))
      )}
    </View>
  );
}

export function AiConsentSheet({ purpose, onDone }: { purpose: AiConsentPurpose | null; onDone: (granted: boolean) => void }) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [processors, setProcessors] = useState<AiConsentProcessor[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [busy, setBusy] = useState<"allow" | "decline" | null>(null);
  const [saveFailed, setSaveFailed] = useState(false);

  const load = useCallback((p: AiConsentPurpose) => {
    setProcessors(null);
    setFailed(false);
    fetchAiConsent()
      .then((info) => setProcessors(info.processors[p] ?? []))
      .catch(() => setFailed(true));
  }, []);

  useEffect(() => {
    if (!purpose) return;
    setSaveFailed(false);
    setBusy(null);
    load(purpose);
  }, [purpose, load]);

  if (!purpose) return null;
  const copy = copyOf(purpose);
  /* İzin, alıcılar GÖRÜLMEDEN verilemez: liste yüklenmediyse onay düğmesi
     kapalı. Reddetmek her durumda mümkün. */
  const canAllow = !!processors && !failed && busy === null;

  async function allow() {
    if (!purpose || !canAllow) return;
    setBusy("allow");
    setSaveFailed(false);
    try {
      await decideAiConsent(purpose, true);
      onDone(true);
    } catch {
      setSaveFailed(true);
      setBusy(null);
    }
  }

  async function decline() {
    if (!purpose || busy) return;
    setBusy("decline");
    /* Ret yazılamazsa da isteğin cevabı "hayır": veri gitmiyor. Yazılamadığı
       için ekran bir sonraki çağrıda yeniden sorabilir — yanlış yön değil. */
    try { await decideAiConsent(purpose, false); } catch { /* yut */ }
    onDone(false);
  }

  const Icon = purpose === "ai_text" ? SparkIcon : MicIcon;
  return (
    <Modal visible animationType="slide" statusBarTranslucent onRequestClose={() => onDone(false)}>
      <View accessibilityViewIsModal accessibilityRole="alert" accessibilityLabel={copy.title} style={{ flex: 1, backgroundColor: colors.bg }}>
        {/* Modal gezginin DIŞINDA: ekranlarla aynı kolon burada elle veriliyor. */}
        <ContentColumn>
        <ScrollView contentContainerStyle={{ paddingTop: insets.top + spacing.xxl, paddingHorizontal: spacing.xl, paddingBottom: spacing.xl, gap: spacing.lg }} showsVerticalScrollIndicator={false}>
          <View style={[{ width: ds(72), height: ds(72), borderRadius: radii.xl, alignItems: "center", justifyContent: "center", backgroundColor: colors.primary, alignSelf: "center" }, softShadow(colors.primary, 12)]}>
            <Icon color={colors.onPrimary} size={36} />
          </View>
          <Text accessibilityRole="header" variant="display" style={{ textAlign: "center" }}>{copy.title}</Text>
          <Text variant="body" color={colors.textMuted} style={{ textAlign: "center" }}>{copy.lead}</Text>
          <ProcessorList processors={processors} failed={failed} colors={colors} />
          {failed ? (
            <PressableScale onPress={() => load(purpose)} accessibilityRole="button" style={{ alignSelf: "center", paddingVertical: spacing.sm, paddingHorizontal: spacing.lg }}>
              <Text variant="bodyStrong" color={colors.primaryText}>{t("common.try_again")}</Text>
            </PressableScale>
          ) : null}
          <View style={{ gap: spacing.md }}>
            {copy.points.map((p) => <Point key={p} text={p} colors={colors} />)}
          </View>
          <PressableScale onPress={() => openLegal("privacy")} hitSlop={6} accessibilityRole="link" style={{ alignSelf: "center", paddingVertical: spacing.sm }}>
            <Text variant="bodyStrong" color={colors.primaryText}>{t("micdisclosure.read_privacy_policy")}</Text>
          </PressableScale>
        </ScrollView>
        <View style={{ paddingHorizontal: spacing.xl, paddingBottom: insets.bottom + spacing.lg, paddingTop: spacing.sm, gap: spacing.sm }}>
          {saveFailed ? <Text variant="caption" color={colors.dangerText} accessibilityLiveRegion="assertive" style={{ textAlign: "center" }}>{t("aiconsent.save_failed")}</Text> : null}
          <PressableScale onPress={allow} disabled={!canAllow} accessibilityRole="button" accessibilityState={{ disabled: !canAllow }} style={[{ borderRadius: radii.lg, backgroundColor: canAllow ? colors.primary : colors.surface2, paddingVertical: spacing.lg, alignItems: "center" }, canAllow ? softShadow(colors.primary, 10) : {}]}>
            {busy === "allow" ? <ActivityIndicator color={colors.onPrimary} /> : <Text variant="h3" color={canAllow ? colors.onPrimary : colors.textFaint}>{t("aiconsent.allow")}</Text>}
          </PressableScale>
          <PressableScale onPress={decline} disabled={busy !== null} accessibilityRole="button" style={{ borderRadius: radii.lg, borderWidth: 1, borderColor: colors.border, paddingVertical: spacing.md, alignItems: "center" }}>
            {busy === "decline" ? <ActivityIndicator color={colors.textMuted} /> : <Text variant="bodyStrong" color={colors.text}>{copy.decline}</Text>}
          </PressableScale>
        </View>
        </ContentColumn>
      </View>
    </Modal>
  );
}

/**
 * Kökte TEK ekran. API istemcisi 403 aldığında `requestAiConsent` üzerinden
 * buraya geliyor; aynı anda iki istek gelirse ikisi aynı cevabı bekliyor
 * (bkz. `lib/aiConsent`).
 */
export function AiConsentHost() {
  const [purpose, setPurpose] = useState<AiConsentPurpose | null>(null);
  const resolver = useRef<((granted: boolean) => void) | null>(null);

  useEffect(() => {
    registerAiConsentHost((p) => new Promise<boolean>((resolve) => {
      /* İstekler `requestAiConsent` içinde sıraya giriyor, yani burada
         normalde açık bir soru yok. Yine de varsa (kök yeniden bağlandı)
         cevapsız asılı kalmasın: "hayır" sayılır, karar yazılmaz. */
      resolver.current?.(false);
      resolver.current = resolve;
      setPurpose(p);
    }));
    return () => {
      registerAiConsentHost(null);
      resolver.current?.(false);
      resolver.current = null;
    };
  }, []);

  return (
    <AiConsentSheet
      purpose={purpose}
      onDone={(granted) => {
        resolver.current?.(granted);
        resolver.current = null;
        setPurpose(null);
      }}
    />
  );
}
