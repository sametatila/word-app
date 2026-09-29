import React from "react";
import { View, useWindowDimensions } from "react-native";
import { Text } from "./Text";
import { t } from "../lib/i18n";
import { PressableScale } from "./PressableScale";
import { SpeakerIcon } from "./icons";
import { useTheme, spacing, radii } from "../theme";
import { isOwnVoice, voicesFor, resolveVoice, type VoiceId } from "../lib/voices";
import { courseOrDefault } from "../lib/courses";
import { speakWithVoice } from "../lib/tts";
import { SkeletonCard, SkeletonLine, SkeletonTile } from "./Skeleton";
import { useLayout } from "../lib/useLayout";

/**
 * Ses seçimi — web VoicePicker'ın mobil karşılığı. Kurs başına iki ses
 * (Katja/Conrad ya da Leni/Jan); kart seçer, hoparlör dinletir (seçmez).
 */
// Kurs id'sine göre örnek cümle. Yeni bir kurs eklendiğinde buraya da bir
// satır gerekiyor; eksikse kursun kendi diline düşmek yerine sessizce Almanca
// cümle okunmasın diye aşağıda açıkça ele alınıyor.
export const SAMPLE: Record<string, string> = {
  "gsw-zh": "De nöi Vertrag gilt für alli Bschäftigte.",
  /* Almanca ve İngilizce örnek KELİME KATMANINDAN (iki örnek cümle, 2026-09-23): Defne ve Aras'ın önceden
     üretilmiş sesi yalnız orada var. Eski cümle ("Der neue Vertrag…") tabloda yoktu; önizleme karakterin
     kendi sesini değil Edge karşılığını çalardı — seçimi yanlış duyurmanın ta kendisi. Değiştirilirse yeni
     cümle kelime tablosunda olmalı: `scripts/tts-own-coverage.ts` bunu denetliyor. */
  de: "Bei gutem Wetter frühstücken wir auf der Terrasse.",
  en: "Good friends are always there for each other.",
};

export function VoicePicker({
  course,
  value,
  onChange,
}: {
  course: string;
  value: VoiceId;
  onChange: (v: VoiceId) => void;
}) {
  const { colors } = useTheme();
  const options = voicesFor(course);
  const selected = resolveVoice(course, value);
  const sample = SAMPLE[courseOrDefault(course).id] ?? SAMPLE.de;

  return (
    <View style={{ flexDirection: "row", gap: spacing.sm }}>
      {options.map((v) => {
        const on = v.id === selected;
        return (
          <PressableScale
            key={v.id}
            accessibilityRole="radio"
            accessibilityState={{ selected: on }}
            onPress={() => onChange(v.id)}
            style={{
              flex: 1,
              padding: spacing.md,
              borderRadius: radii.lg,
              borderWidth: 1,
              /* Büyük karo: seçiliyken dolgu yok, turuncu kenar + turuncu
                 başlık (2026-09-29 Samet: seçim B, dolu turuncu çip). */
              borderColor: on ? colors.primary : colors.border,
              backgroundColor: colors.surface,
              gap: spacing.xs,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <Text variant="bodyStrong" color={on ? colors.primaryText : colors.text}>{v.label}</Text>
              <PressableScale
                /* Etiket KODA GÖMÜLÜ TÜRKÇEYDİ: arayüzü İngilizce ya da
                   Almanca olan kullanıcının ekran okuyucusu da "… sesini
                   dinle" diyordu. Web aynı düğmeye sözlükten etiket veriyor
                   (`voice-picker` `aria-label`); anahtar ortak tabana taşındı. */
                accessibilityLabel={t("voice.listen_to", { name: v.label })}
                hitSlop={8}
                onPress={() => speakWithVoice(sample, v.id, isOwnVoice(v.id))}
                style={{ padding: spacing.xs }}
              >
                <SpeakerIcon color={colors.primaryText} size={20} />
              </PressableScale>
            </View>
            <Text variant="caption" color={colors.textMuted}>{t(v.gender === "female" ? "voices.female" : "voices.male")}</Text>
            <Text variant="caption" color={colors.textFaint}>{t(v.noteKey)}</Text>
          </PressableScale>
        );
      })}
    </View>
  );
}

/**
 * Seçicinin yeri — kurs bilinmeden.
 *
 * Katalog KURSA bağlı ve kurs `/api/me` ile geliyor. Ayarlar ekranı bugüne
 * kadar kurs inmeden seçiciyi çiziyordu, yani İngilizce öğrenen biri bir an
 * Almanca sesleri görüyor ve birine basarsa yanlış kursun tercihini
 * yazdırıyordu. Parçalar gerçek kartın aynısı: iki kart yan yana, başlık +
 * hoparlör, altında iki sönük satır.
 */
export function VoicePickerSkeleton() {
  const { colors } = useTheme();
  /* NOT SATIRI GENİŞLİĞE GÖRE. Not ~37 karakter; telefonda kart metni ~133dp
     ve not iki satıra kırılıyor, tablette (~300dp) tek satır. İskelet hep
     tek satır çiziyordu, telefonda kart 20dp kısa kalıyordu. Genişlik
     Ayarlar'ın kabından: kolon − kaydırma (2×16) − grup kartı (2×16), iki
     kart arası 8, kart dolgusu 2×12 + kenarlık. */
  const { contentWidth } = useLayout();
  const row = Math.min(useWindowDimensions().width, contentWidth) - 64;
  const noteWidth = (row - spacing.sm) / 2 - 2 * spacing.md - 2;
  const noteLines = Math.max(1, Math.ceil((t("voices.defne_note").length * 6.9) / Math.max(1, noteWidth)));
  /* Kart gerçeğinin ÖLÇÜSÜNDE: `SkeletonCard` `lg` dolgulu (gerçeği `md`) ve
     hoparlör `xs` dolgusuz 20 px idi (gerçeği 28) — kart iki yandan 8, başlık
     satırı 5 px farklıydı. */
  return (
    <View style={{ flexDirection: "row", gap: spacing.sm }}>
      {[0, 1].map((i) => (
        <SkeletonCard key={i} padded={false} style={{ flex: 1, gap: spacing.xs, padding: spacing.md, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface }}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <SkeletonLine variant="bodyStrong" width="52%" />
            <SkeletonTile size={20} radius={10} style={{ margin: spacing.xs }} />
          </View>
          <SkeletonLine variant="caption" width="40%" />
          <View>
            {Array.from({ length: noteLines }, (_, j) => (
              <SkeletonLine key={j} variant="caption" width={j === noteLines - 1 && noteLines > 1 ? "50%" : "88%"} />
            ))}
          </View>
        </SkeletonCard>
      ))}
    </View>
  );
}
