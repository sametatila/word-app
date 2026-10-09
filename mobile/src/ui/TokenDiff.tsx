import React from "react";
import { Text as RNText, View } from "react-native";
import { t } from "../lib/i18n";
import { useTheme, soft, spacing } from "../theme";
import { Text } from "./Text";
import { diffLines, type DiffLine, type DiffLineKind, type TokenMark } from "../lib/sentenceMatch";

/**
 * Fark vurgusu — web `components/feedback/diff-text` karşılığı.
 *
 * Cümle hakemi kelime kelime işaret üretiyor (`missing`, `extra`, `moved`,
 * `typo`) ve web bunu çeviri turunda, sınav oynatıcısında ve yazma
 * değerlendirmesinde çiziyor. Mobil hakem sonucunu kullanmaya başladı ama
 * farkı GÖSTERMİYORDU: öğrenci "yanlış" görüyor, nerede yanlış olduğunu
 * görmüyordu.
 *
 * BİÇİM RN'İN VERDİĞİ KADAR: `textDecorationStyle` yalnız iOS'ta işliyor. Ayrım
 * bu yüzden RENK + ETİKET ile kuruluyor: işaretli kelimenin rengi, katmanın
 * "Farklar" satırındaki etiketin rengiyle aynı ve etiket işaretin adını yazıyor
 * (renk körlüğünde de okunuyor).
 *
 * Erişilebilirlik: kap `accessibilityLabel` ile düz metin açıklaması taşıyor
 * ("Kino eksik" gibi), işaretli parçalar ekran okuyucudan gizli.
 */
export type MarkedToken = { text: string; mark: TokenMark; typed?: string };

const TITLE_KEYS: Record<TokenMark, string | undefined> = {
  same: undefined,
  missing: "diff.missing",
  extra: "diff.extra",
  moved: "diff.moved",
  typo: "diff.typo",
};

function plainOf(tokens: MarkedToken[]): string {
  return tokens
    .map((k) => (k.mark === "same" ? k.text : `${k.text} (${t(TITLE_KEYS[k.mark]!)})`))
    .join(" ");
}

/**
 * CÜMLEDEKİ İŞARET RENGİ = FARK LİSTESİNDEKİ ETİKET RENGİ.
 *
 * Sonuç katmanında "↔" ve açıklamasız alt çizgi vardı: öğrenci kelimenin NEDEN
 * işaretli olduğunu okuyamıyordu. Artık her işaretin bir rengi var ve aynı
 * renk katmanın "Farklar" satırındaki etikette tekrar ediyor (eksik = kırmızı,
 * sıra = mavi, yazım = sarı, fazla = üstü çizili soluk). Renk tek taşıyıcı
 * değil: etiketin metni ve alt çizgi/üstü çizgi biçimi de aynı şeyi söylüyor.
 */
export function markTone(mark: TokenMark, colors: ReturnType<typeof useTheme>["colors"]): { fg: string; soft: string } {
  switch (mark) {
    case "missing": return { fg: colors.dangerText, soft: colors.dangerSoft };
    case "moved": return { fg: colors.infoText, soft: soft(colors.info) };
    case "typo": return { fg: colors.streakText, soft: soft(colors.streak) };
    case "extra": return { fg: colors.textMuted, soft: colors.surface2 };
    default: return { fg: colors.text, soft: colors.surface2 };
  }
}

/** Doğru cümle, işaretli; cümle sonu noktalaması (`tail`) son kelimeye yapışık. */
export function MarkedSentence({ tokens, tail = "", strong = true }: { tokens: MarkedToken[]; tail?: string; strong?: boolean }) {
  const { colors } = useTheme();
  return (
    <RNText accessibilityLabel={plainOf(tokens) + tail} style={{ fontWeight: strong ? "800" : "500", color: strong ? colors.text : colors.textMuted }}>
      {tokens.map((tk, i) => {
        const tone = markTone(tk.mark, colors);
        /* Ara boşluk ve cümle sonu noktası İŞARETİN DIŞINDA: içeride kalınca
           alt çizgi boşluğa ve noktaya da uzanıyordu. */
        return (
          <RNText key={i} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
            <RNText style={tk.mark === "same" ? null : { color: tone.fg, textDecorationLine: tk.mark === "extra" ? ("line-through" as const) : ("underline" as const) }}>
              {tk.text}
            </RNText>
            {i < tokens.length - 1 ? " " : tail}
          </RNText>
        );
      })}
    </RNText>
  );
}

/** Harf düzeyinde fark (yazım): doğrusunda eksik harf, yazılanda fazla harf işaretli. */
export function CharMarked({ segs, side }: { segs: { text: string; kind: "same" | "missing" | "extra" }[]; side: "target" | "typed" }) {
  const { colors } = useTheme();
  return (
    <RNText style={{ fontWeight: side === "target" ? "800" : "500", color: side === "target" ? colors.text : colors.textMuted }}>
      {segs.map((sg, i) =>
        sg.kind === "same" ? (
          <RNText key={i}>{sg.text}</RNText>
        ) : side === "target" && sg.kind === "missing" ? (
          <RNText key={i} style={{ color: colors.dangerText, textDecorationLine: "underline" }}>{sg.text}</RNText>
        ) : side === "typed" && sg.kind === "extra" ? (
          <RNText key={i} style={{ color: colors.textFaint, textDecorationLine: "line-through" }}>{sg.text}</RNText>
        ) : null,
      )}
    </RNText>
  );
}

/** Satır türünün etiketi ve rengi: biçim yazımın sarısı, başka kelime eksiğin kırmızısı. */
const LINE_CHIP: Record<DiffLineKind, { key: string; tone: Exclude<TokenMark, "same"> }> = {
  missing: { key: "diff.missing", tone: "missing" },
  typo: { key: "diff.typo", tone: "typo" },
  form: { key: "diff.chip_form", tone: "typo" },
  word: { key: "diff.chip_word", tone: "missing" },
  moved: { key: "diff.chip_moved", tone: "moved" },
  extra: { key: "diff.extra", tone: "extra" },
};

/** Küçük etiket — farkın ya da hata tipinin adı. */
export function MarkTag({ label, fg, bg }: { label: string; fg: string; bg: string }) {
  return (
    <View style={{ backgroundColor: bg, borderRadius: 6, paddingHorizontal: 6, paddingVertical: 1, alignSelf: "flex-start" }}>
      <Text variant="micro" color={fg} style={{ textTransform: "uppercase", letterSpacing: 1 }}>{label}</Text>
    </View>
  );
}

/**
 * Farklar, düz dille ve satır satır: "herunterfahren yazılmamış", "Kinno →
 * Kino", "Tag → Tage", "fahren fazla". Satırlar hakemin eşlemesinden
 * (`diffLines`): aynı yerdeki eksik ve fazla kelime tek satır — biçim farkı
 * "biçim", başka kelime "kelime" etiketiyle (QA F-0020). Sıra hedef cümlenin
 * sırası, fazlalar sonda. Konuşmadaki üretim adımı `DiffLineList`i doğrudan
 * çiziyor. Web `components/feedback/marked` aynı iki bileşen.
 */
export function DiffLines({ target, typed }: { target: MarkedToken[]; typed: MarkedToken[] }) {
  return <DiffLineList lines={diffLines(target, typed)} />;
}

export function DiffLineList({ lines }: { lines: DiffLine[] }) {
  const { colors } = useTheme();
  if (!lines.length) return null;
  const text = (l: DiffLine) =>
    l.kind === "missing"
      ? t("diff.line_missing", { word: l.word })
      : l.kind === "moved"
        ? t("diff.line_moved", { word: l.word })
        : l.kind === "extra"
          ? t("diff.line_extra", { word: l.word })
          : l.typed
            ? t("diff.line_typo", { typed: l.typed, word: l.word })
            : l.word;
  return (
    <View style={{ gap: spacing.xs }}>
      {lines.map((l, i) => {
        const tone = markTone(LINE_CHIP[l.kind].tone, colors);
        return (
          <View key={i} style={{ flexDirection: "row", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
            <MarkTag label={t(LINE_CHIP[l.kind].key)} fg={tone.fg} bg={tone.soft} />
            <Text variant="caption" color={colors.text}>{text(l)}</Text>
          </View>
        );
      })}
    </View>
  );
}
