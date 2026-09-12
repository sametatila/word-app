import React, { useState } from "react";
import { t } from "../lib/i18n";
import { View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { ArrowBackIcon } from "../ui/icons";
import { MascotAvatar } from "../ui/Avatar";
import { HATS, GLASSES, MUSTACHES, HAT_COLORS } from "../ui/avatarParts";
import { saveAvatar, useAvatar, DEFAULT_AVATAR, type AvatarConfig } from "../lib/avatar";
import { useTheme, spacing, radii, softShadow, type Palette } from "../theme";

/**
 * Bir aksesuar seçeneği — o aksesuarı taşıyan mini avatar önizlemesi + seçili
 * çerçeve.
 *
 * SEÇİLİLİK YALNIZ ÇERÇEVEYLE anlatılıyordu: ekran okuyucu bu karoları adsız
 * düğmeler olarak okuyor, hangisinin seçili olduğunu hiç söylemiyordu. Rol ve
 * durum verilince en azından "seçili" duyuluyor; ad da grubun adı ve sıra
 * numarasından kuruluyor (aksesuarların kendi adları yok, uydurulmadı).
 */
function OptTile({ preview, selected, onPress, colors, label }: { preview: AvatarConfig; selected: boolean; onPress: () => void; colors: Palette; label: string }) {
  return (
    <PressableScale
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      accessibilityLabel={label}
      onPress={onPress}
      style={{ padding: 4, borderRadius: radii.lg, borderWidth: 2, borderColor: selected ? colors.primary : "transparent" }}
    >
      <MascotAvatar config={preview} size={54} />
    </PressableScale>
  );
}

function Group({ title, colors, children }: { title: string; colors: Palette; children: React.ReactNode }) {
  return (
    <View style={{ marginTop: spacing.lg }}>
      <Text variant="caption" color={colors.textMuted} style={{ marginBottom: spacing.sm, marginLeft: 4 }}>{title}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: spacing.sm, paddingRight: spacing.lg }}>
        {children}
      </ScrollView>
    </View>
  );
}

/**
 * Avatar düzenleme — Erdi maskotuna şapka (renkli), gözlük, bıyık ekleme. Canlı
 * önizleme; seçim yerelde saklanır ve header/profilde anında görünür (Replicate
 * sanatı sonra). Profil kimlik avatarına veya "Avatarını düzenle"ye dokununca açılır.
 */
export function AvatarScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<{ goBack: () => void }>();
  /*
    TASLAK ile KAYITLI ayrı duruyor — webdeki düzenleme ekranıyla aynı sebep.

    Ekran kayıtlı avatarı bir kez okuyup duruma kopyalıyordu; okuma eşzamansız
    ve sunucudan gelen avatarın cihaza yazılmasıyla yarışıyor. Başka bir
    cihazda avatarını seçmiş biri boş maskot görüp üzerine yazabiliyordu.

    Kayıtlı değer artık reaktif; taslak yalnız kullanıcı bir şeye dokununca
    doluyor ve o andan sonra kazanıyor.
  */
  const stored = useAvatar();
  const [draft, setDraft] = useState<AvatarConfig | null>(null);
  const cfg = draft ?? stored ?? DEFAULT_AVATAR;
  const setCfg = (patch: Partial<AvatarConfig>) => setDraft({ ...cfg, ...patch });

  const none = (over: Partial<AvatarConfig>): AvatarConfig => ({ ...DEFAULT_AVATAR, hatColor: cfg.hatColor, ...over });

  async function save() { await saveAvatar(cfg); nav.goBack(); }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
        <PressableScale hitSlop={4} onPress={() => nav.goBack()} accessibilityLabel={t("common.back")} style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
          <ArrowBackIcon color={colors.text} size={24} />
        </PressableScale>
        <Text accessibilityRole="header" variant="h2">{t("avatar.your_avatar")}</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xxl }} showsVerticalScrollIndicator={false}>
        {/* canlı önizleme */}
        <View style={{ alignItems: "center", marginVertical: spacing.lg }}>
          <View style={softShadow(colors.primary, 12)}><MascotAvatar config={cfg} size={140} /></View>
        </View>

        <Group title={t("avatar.hat")} colors={colors}>
          <OptTile preview={none({ hat: null })} selected={cfg.hat === null} label={t("avatar.no_hat")} onPress={() => setCfg({ hat: null })} colors={colors} />
          {HATS.map((h, i) => (
            <OptTile key={h} label={`${t("avatar.hat")} ${i + 1}`} preview={none({ hat: h })} selected={cfg.hat === h} onPress={() => setCfg({ hat: h })} colors={colors} />
          ))}
        </Group>

        {cfg.hat ? (
          <View style={{ marginTop: spacing.lg }}>
            <Text variant="caption" color={colors.textMuted} style={{ marginBottom: spacing.sm, marginLeft: 4 }}>{t("avatar.hat_color")}</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
              {HAT_COLORS.map((col) => {
                const sel = cfg.hatColor === col;
                return (
                  <PressableScale hitSlop={4} key={col} onPress={() => setCfg({ hatColor: col })} style={{ width: 44, height: 44, borderRadius: radii.lg, backgroundColor: col, borderWidth: 3, borderColor: sel ? colors.text : "transparent" }} />
                );
              })}
            </View>
          </View>
        ) : null}

        <Group title={t("avatar.glasses")} colors={colors}>
          <OptTile preview={none({ glasses: null })} selected={cfg.glasses === null} label={t("avatar.no_glasses")} onPress={() => setCfg({ glasses: null })} colors={colors} />
          {GLASSES.map((g, i) => (
            <OptTile key={g} label={`${t("avatar.glasses")} ${i + 1}`} preview={none({ glasses: g })} selected={cfg.glasses === g} onPress={() => setCfg({ glasses: g })} colors={colors} />
          ))}
        </Group>

        <Group title={t("avatar.mustache")} colors={colors}>
          <OptTile preview={none({ mustache: null })} selected={cfg.mustache === null} label={t("avatar.no_mustache")} onPress={() => setCfg({ mustache: null })} colors={colors} />
          {MUSTACHES.map((m, i) => (
            <OptTile key={m} label={`${t("avatar.mustache")} ${i + 1}`} preview={none({ mustache: m })} selected={cfg.mustache === m} onPress={() => setCfg({ mustache: m })} colors={colors} />
          ))}
        </Group>

        <PressableScale onPress={save} style={[{ borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: 16, alignItems: "center", marginTop: spacing.xxl }, softShadow(colors.primary, 10)]}>
          <Text variant="h3" color={colors.onPrimary}>{t("common.save")}</Text>
        </PressableScale>
      </ScrollView>
    </View>
  );
}
