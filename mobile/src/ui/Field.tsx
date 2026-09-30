import React from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";
import { Text } from "./Text";
import { useTheme, spacing } from "../theme";

/**
 * KUTU İÇİ YERLEŞİM KURALI (2026-09-30, Samet: ayar kutularında boşluklar
 * dağınıktı). Mobil dp = web px; web aynası `src/components/field.tsx`.
 *
 * - Kutu (ayar grubu kartı): her yandan 16 (`Card padded`). Bölümler arası
 *   ayıracın iki yanı 16 (`SettingsScreen` `Group`).
 * - Etiket → denetim: 8. Denetim → yardım/hata satırı: 8.
 * - Art arda alan blokları (ve blok → düğme satırı): 12.
 * - Kutu içi liste (anahtar, bağlı hesap, oturum satırları): satırın dikey
 *   payı 12; ilk satırın üstü ve son satırın altı 0 (bölümün 16'sı ya da
 *   etiketin 8'i zaten orada); satırlar arası ince çizginin iki yanı 12.
 *
 * Neden: satırlar kendi payını yazıyordu (6, 10, 12; ilk satırda da üstte 12)
 * ve kutunun kenarında 28'e çıkıyordu; bağlı hesaplarda çizginin üstü 8 altı
 * 12'ydi. Sayılar artık burada.
 */
export const FIELD = {
  /** Etiket → denetim. */
  label: spacing.sm,
  /** Denetim → yardım/hata satırı. */
  help: spacing.sm,
  /** Art arda alan blokları arası. */
  stack: spacing.md,
  /** Kutu içi listede satırın dikey payı (çizginin iki yanı). */
  row: spacing.md,
} as const;

/** Tek alan bloğu: isteğe bağlı etiket, denetim, altında yardım ya da hata. */
export function Field({
  label,
  help,
  error,
  children,
  style,
}: {
  /** Bölümün `Row` etiketi varsa verilmez (aynı ad iki kez yazılmasın). */
  label?: string;
  help?: React.ReactNode;
  error?: string | null;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  const { colors } = useTheme();
  return (
    <View style={style}>
      {label ? <Text variant="caption" color={colors.textMuted} style={{ marginBottom: FIELD.label }}>{label}</Text> : null}
      {children}
      {help ? <Text variant="caption" color={colors.textMuted} style={{ marginTop: FIELD.help }}>{help}</Text> : null}
      {error ? <Text accessibilityLiveRegion="polite" variant="caption" color={colors.dangerText} style={{ marginTop: FIELD.help }}>{error}</Text> : null}
    </View>
  );
}

/**
 * BASILABİLİR satırlı kutu içi liste için kap: satır payı (`FIELD.row`, üst
 * çizgi ilk satır hariç) satırın İÇİNDE kalıyor ki dokunma alanı küçülmesin;
 * ilk üst ve son alt pay bu eksi payla kapanıyor. Görünen sonuç `InsetList`
 * ile aynı.
 */
export const insetEdge: ViewStyle = { marginVertical: -FIELD.row };

/**
 * Kutu içi liste: çocuklar arasında ince çizgi, paylar kuraldaki gibi. Satırlar
 * kendi dikey payını YAZMAZ; boş (false/null) çocuk sayılmıyor, gizlenen
 * satır ortada asılı çizgi bırakmıyor (web `.inset-list`).
 */
export function InsetList({ children, style }: { children: React.ReactNode; style?: StyleProp<ViewStyle> }) {
  const { colors } = useTheme();
  const items = React.Children.toArray(children).filter(Boolean);
  return (
    <View style={style}>
      {items.map((item, i) => (
        <View
          key={i}
          style={{
            paddingTop: i ? FIELD.row : 0,
            paddingBottom: i === items.length - 1 ? 0 : FIELD.row,
            borderTopWidth: i ? 1 : 0,
            borderTopColor: colors.hairline,
          }}
        >
          {item}
        </View>
      ))}
    </View>
  );
}
