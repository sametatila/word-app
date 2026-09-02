import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { ArrowBackIcon } from "../ui/icons";
import { Avatar } from "../ui/Avatar";
import { HATS, GLASSES, MUSTACHES, HAT_COLORS } from "../ui/avatarParts";
import { getAvatar, saveAvatar, DEFAULT_AVATAR, type AvatarConfig } from "../lib/avatar";
import { useTheme, spacing, radii, softShadow, type Palette } from "../theme";

/** Bir aksesuar seçeneği — o aksesuarı taşıyan mini avatar önizlemesi + seçili çerçeve. */
function OptTile({ preview, selected, onPress, colors }: { preview: AvatarConfig; selected: boolean; onPress: () => void; colors: Palette }) {
  return (
    <PressableScale onPress={onPress} style={{ padding: 4, borderRadius: radii.lg, borderWidth: 2, borderColor: selected ? colors.primary : "transparent" }}>
      <Avatar size={54} config={preview} />
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
  const [cfg, setCfg] = useState<AvatarConfig>(DEFAULT_AVATAR);
  useEffect(() => { void getAvatar().then(setCfg); }, []);

  const none = (over: Partial<AvatarConfig>): AvatarConfig => ({ ...DEFAULT_AVATAR, hatColor: cfg.hatColor, ...over });

  async function save() { await saveAvatar(cfg); nav.goBack(); }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
        <PressableScale hitSlop={4} onPress={() => nav.goBack()} accessibilityLabel="Geri" style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
          <ArrowBackIcon color={colors.text} size={24} />
        </PressableScale>
        <Text variant="h2">Avatarın</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xxl }} showsVerticalScrollIndicator={false}>
        {/* canlı önizleme */}
        <View style={{ alignItems: "center", marginVertical: spacing.lg }}>
          <View style={softShadow(colors.primary, 12)}><Avatar size={140} config={cfg} /></View>
        </View>

        <Group title="ŞAPKA" colors={colors}>
          <OptTile preview={none({ hat: null })} selected={cfg.hat === null} onPress={() => setCfg((c) => ({ ...c, hat: null }))} colors={colors} />
          {HATS.map((h) => (
            <OptTile key={h} preview={none({ hat: h })} selected={cfg.hat === h} onPress={() => setCfg((c) => ({ ...c, hat: h }))} colors={colors} />
          ))}
        </Group>

        {cfg.hat ? (
          <View style={{ marginTop: spacing.lg }}>
            <Text variant="caption" color={colors.textMuted} style={{ marginBottom: spacing.sm, marginLeft: 4 }}>ŞAPKA RENGİ</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
              {HAT_COLORS.map((col) => {
                const sel = cfg.hatColor === col;
                return (
                  <PressableScale hitSlop={4} key={col} onPress={() => setCfg((c) => ({ ...c, hatColor: col }))} style={{ width: 44, height: 44, borderRadius: 20, backgroundColor: col, borderWidth: 3, borderColor: sel ? colors.text : "transparent" }} />
                );
              })}
            </View>
          </View>
        ) : null}

        <Group title="GÖZLÜK" colors={colors}>
          <OptTile preview={none({ glasses: null })} selected={cfg.glasses === null} onPress={() => setCfg((c) => ({ ...c, glasses: null }))} colors={colors} />
          {GLASSES.map((g) => (
            <OptTile key={g} preview={none({ glasses: g })} selected={cfg.glasses === g} onPress={() => setCfg((c) => ({ ...c, glasses: g }))} colors={colors} />
          ))}
        </Group>

        <Group title="BIYIK" colors={colors}>
          <OptTile preview={none({ mustache: null })} selected={cfg.mustache === null} onPress={() => setCfg((c) => ({ ...c, mustache: null }))} colors={colors} />
          {MUSTACHES.map((m) => (
            <OptTile key={m} preview={none({ mustache: m })} selected={cfg.mustache === m} onPress={() => setCfg((c) => ({ ...c, mustache: m }))} colors={colors} />
          ))}
        </Group>

        <PressableScale onPress={save} style={[{ borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: 16, alignItems: "center", marginTop: spacing.xxl }, softShadow(colors.primary, 10)]}>
          <Text variant="h3" color="#fff">Kaydet</Text>
        </PressableScale>
      </ScrollView>
    </View>
  );
}
