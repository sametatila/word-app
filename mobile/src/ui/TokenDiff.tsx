import React from "react";
import { Text as RNText, View } from "react-native";
import { t } from "../lib/i18n";
import { useTheme } from "../theme";
import type { TokenMark } from "../lib/sentenceMatch";

/**
 * Fark vurgusu — web `components/feedback/diff-text` karşılığı.
 *
 * Cümle hakemi kelime kelime işaret üretiyor (`missing`, `extra`, `moved`,
 * `typo`) ve web bunu çeviri turunda, sınav oynatıcısında ve yazma
 * değerlendirmesinde çiziyor. Mobil hakem sonucunu kullanmaya başladı ama
 * farkı GÖSTERMİYORDU: öğrenci "yanlış" görüyor, nerede yanlış olduğunu
 * görmüyordu.
 *
 * BİÇİM RN'İN VERDİĞİ KADAR. Web noktalı alt çizgi kullanıyor; React Native'de
 * `textDecorationStyle` yalnız iOS'ta işliyor, Android'de yok sayılıyor. O
 * yüzden ayrım biçimle değil BİÇİM ÇİFTİYLE kuruluyor: eksik kelime düz alt
 * çizgi, yazım hatası alt çizgi + eğik. İkisi de renkten bağımsız ayrışıyor,
 * yani renk körlüğünde de okunuyor.
 *
 * Erişilebilirlik: kap `accessibilityLabel` ile düz metin açıklaması taşıyor
 * ("Kino eksik" gibi), işaretli parçalar ekran okuyucudan gizli.
 */
export type MarkedToken = { text: string; mark: TokenMark };

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

/** Doğru cümle, farkla işaretli. */
export function TokenDiff({ tokens }: { tokens: MarkedToken[] }) {
  const { colors } = useTheme();
  return (
    <RNText accessibilityLabel={plainOf(tokens)} style={{ fontWeight: "700", color: colors.text }}>
      {tokens.map((tk, i) => (
        <RNText
          key={i}
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          style={[
            tk.mark === "missing" ? { textDecorationLine: "underline" as const } : null,
            tk.mark === "typo" ? { textDecorationLine: "underline" as const, fontStyle: "italic" as const } : null,
            tk.mark === "moved" ? { backgroundColor: colors.surface2 } : null,
          ]}
        >
          {tk.mark === "moved" ? "↔" : ""}
          {tk.text}
          {i < tokens.length - 1 ? " " : ""}
        </RNText>
      ))}
    </RNText>
  );
}

/** Öğrencinin cümlesi: fazla kelime üstü çizili, yer değiştirmiş/yazım işaretli. */
export function TypedTokens({ tokens }: { tokens: MarkedToken[] }) {
  const { colors } = useTheme();
  return (
    <RNText accessibilityLabel={plainOf(tokens)} style={{ color: colors.textMuted }}>
      {tokens.map((tk, i) => (
        <RNText
          key={i}
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          style={[
            tk.mark === "extra" ? { textDecorationLine: "line-through" as const, color: colors.textFaint } : null,
            tk.mark === "typo" ? { textDecorationLine: "underline" as const, fontStyle: "italic" as const } : null,
          ]}
        >
          {tk.text}
          {i < tokens.length - 1 ? " " : ""}
        </RNText>
      ))}
    </RNText>
  );
}

/** Çeviri turunun geri bildirim satırı: hüküm cümlesi + iki fark satırı. */
export function SentenceFeedback({ verdictKey, target, typed, showTyped }: { verdictKey: string; target: MarkedToken[]; typed: MarkedToken[]; showTyped: boolean }) {
  const { colors } = useTheme();
  return (
    <View>
      <RNText style={{ color: colors.text, fontSize: 15, lineHeight: 21 }}>
        {t(verdictKey)}{" "}
        <TokenDiff tokens={target} />
      </RNText>
      {showTyped ? (
        <RNText style={{ marginTop: 4, color: colors.textMuted, fontSize: 13, lineHeight: 18 }}>
          {t("rounds.you_wrote")} <TypedTokens tokens={typed} />
        </RNText>
      ) : null}
    </View>
  );
}
