import React from "react";
import { View } from "react-native";
import { Text } from "./Text";
import { Card } from "./Card";
import { useTheme, spacing, type Palette } from "../theme";

/**
 * Ayar sayfasının iki yapı taşı: GRUP (başlık + tek kart) ve SATIR (bölüm).
 * Web aynası `src/components/settings-section.tsx` (`Group`, `Row`).
 *
 * Eskiden her bölümün kendi kartı vardı ve ekran alt alta on beş kutuya
 * dönüşmüştü: kutu, bölümleri ayırsın diye vardı ama bölüm sayısı artınca
 * ayırmayı bıraktı, yalnız gürültü ekledi. Şimdi kart grubu çiziyor,
 * bölümler kartın içinde ince bir çizgiyle ayrılıyor.
 *
 * `SettingsScreen`in içindeydi; Gizlilik'in sosyal bölümleri
 * (`SocialPrivacy`) de aynı gruba girsin diye ayrı dosyada (2026-09-30).
 */

/**
 * Parçaları (Fragment) açarak çocuk listesi.
 *
 * NEDEN (2026-09-30, Samet: "Hesap kutusunda bölümler arasında çizgi yok").
 * `Children.toArray` Fragment'ı AÇMIYOR, tek çocuk sayıyor. Hesap grubu
 * misafir/hesap ayrımı yüzünden bütün bölümlerini tek bir `<>…</>` içinde
 * veriyordu: grup bir tek çocuk görüyor, hiç çizgi çizmiyor, bölümler
 * arasında 16 + 16 boşluk da kalmıyordu. Web'de ayıraç DOM'da (`divide-y`),
 * orada Fragment görünmez; mobilde de artık öyle.
 */
function flatten(children: React.ReactNode): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  React.Children.toArray(children).forEach((c) => {
    if (React.isValidElement<{ children?: React.ReactNode }>(c) && c.type === React.Fragment) out.push(...flatten(c.props.children));
    else if (c) out.push(c);
  });
  return out;
}

export function Group({ title, children }: { title?: string; colors?: Palette; children: React.ReactNode }) {
  const { colors } = useTheme();
  /*
    ÇİZGİYİ GRUP ÇİZİYOR, satır değil. Satırların bir kısmı koşullu (parolasız
    hesapta PAROLA bölümü hiç yok); ayıracı satırın kendi üstüne koysaydık
    gizlenen ilk satırın çizgisi kartın tepesinde asılı kalırdı. Boş
    (false/null) çocuklar atılıyor, yani "ilk ÇİZİLEN satır" doğru biliniyor.
  */
  const items = flatten(children);
  return (
    <View style={{ marginTop: title ? spacing.xxl : spacing.sm }}>
      {/* Grup başlığı da bir başlık — web `<h2>` (bkz. parity 259). Bölüm
          ekranında başlık ekranın kendisi; grup ayrıca başlık çizmiyor. */}
      {title ? <Text accessibilityRole="header" variant="h3" color={colors.text} style={{ marginBottom: spacing.sm, marginLeft: spacing.xs }}>{title}</Text> : null}
      <Card padded>
        {items.map((item, i) => (
          <View
            key={i}
            /* Bölümler arası çizginin iki yanı 16 (`ui/Field` kuralı; web `Row` `py-4`). */
            style={i ? { marginTop: spacing.lg, paddingTop: spacing.lg, borderTopWidth: 1, borderTopColor: colors.hairline } : undefined}
          >
            {item}
          </View>
        ))}
      </Card>
    </View>
  );
}

/** Grup kartının içindeki bir bölüm: küçük etiket ve altında içeriği (etiket → içerik 8). */
export function Row({ label, children }: { label?: string; colors?: Palette; children: React.ReactNode }) {
  const { colors } = useTheme();
  return (
    <View>
      {label ? (
        <Text variant="caption" color={colors.textMuted} style={{ marginBottom: spacing.sm, letterSpacing: 0.5 }}>{label}</Text>
      ) : null}
      {children}
    </View>
  );
}
