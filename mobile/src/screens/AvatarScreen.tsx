import React, { useEffect, useMemo, useState } from "react";
import { t, currentLang } from "../lib/i18n";
import { View, ScrollView, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { LockIcon, XIcon, RefreshIcon, CheckIcon } from "../ui/icons";
import { PrimaryButton } from "../ui/PrimaryButton";
import { AvatarStage, derivedAvatar, MascotAvatar } from "../ui/Avatar";
import { useAuth } from "../lib/AuthContext";
import { HATS, GLASSES, MUSTACHES, HAT_COLORS } from "../ui/avatarParts";
import { saveAvatar, useAvatar, DEFAULT_AVATAR, AVATAR_BGS, AVATAR_RARITY, EXTRA_SLOTS, type AvatarConfig, type ExtraSlot } from "../lib/avatar";
import { PART_UNLOCKS } from "../lib/avatarUnlocks";
import { useAvatarCatalog } from "../lib/avatarCatalog";
import type { CatalogPart } from "../lib/avatarLayers";
import { api } from "../api/client";
import { useTheme, spacing, radii, cardShadow, type Palette } from "../theme";

/**
 * AVATAR DÜZENLEYİCİ (2026-09-28, taslak F2; `docs/plan/profil-ayarlar-topluluk.md`).
 *
 * Üstte büyük sahne (profildekiyle aynı `AvatarStage`), altında kâğıt: yuva
 * sekmeleri, parça kartları, renklenen parçada renk satırı, altta Kaydet.
 *
 * İKİ KİP. 3B katalog kapalıyken (bugün) yuvalar arka plan, şapka, gözlük ve
 * bıyık; kartlar parçayı taşıyan mini 2B avatar. Katalog açılınca
 * (`AVATAR_3D_BASE`) boyun, yüz, küpe ve sırt da gelir; kartlar kataloğun
 * ikonları, adları ve nadirlik renkleriyle çizilir. Kilitli parça gizlenmez:
 * dokununca nasıl açılacağı yazar (görünmeyen bir ödül kimseyi peşinden
 * koşturmaz). Web `avatar-editor` ile aynı düzen.
 */
type Slot = "bg" | "hat" | "glasses" | "mustache" | ExtraSlot;
const SLOT_LABEL: Record<Slot, string> = {
  bg: "avatar.slot_bg",
  hat: "avatar.hat",
  glasses: "avatar.glasses",
  mustache: "avatar.mustache",
  neck: "avatar.slot_neck",
  face: "avatar.slot_face",
  ear: "avatar.slot_ear",
  back: "avatar.slot_back",
};
const RARITY = AVATAR_RARITY;

type Tile = { key: string; label: string; selected: boolean; locked: boolean; hint?: string; rarity?: string; icon?: string; preview?: AvatarConfig; swatch?: { from: string; to: string }; none?: boolean; apply: () => void };

export function AvatarScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<{ goBack: () => void }>();
  const catalog = useAvatarCatalog();
  /*
    TASLAK ile KAYITLI ayrı duruyor: kayıtlı değer reaktif, taslak yalnız
    kullanıcı bir şeye dokununca doluyor ve o andan sonra kazanıyor (başka
    cihazda seçilmiş avatarın üzerine boş maskot yazılmasın).
  */
  const stored = useAvatar();
  const [draft, setDraft] = useState<AvatarConfig | null>(null);
  const { user } = useAuth();
  const cfg = draft ?? stored ?? derivedAvatar(user?.id ?? "");
  const setCfg = (patch: Partial<AvatarConfig>) => setDraft({ ...cfg, ...patch });
  const [slot, setSlot] = useState<Slot>("hat");
  const [hint, setHint] = useState<string | null>(null);

  /*
    KAZANILMIŞ ROZETLER ve PARÇALAR. Kilit yalnız GÖSTERİM için; kaydı sunucu
    eliyor. İstek düşerse liste boş kalıyor ve kilitli olan kilitli görünüyor.
  */
  const [unlocked, setUnlocked] = useState<Set<string>>(new Set());
  const [owned, setOwned] = useState<Set<string>>(new Set());
  useEffect(() => {
    let alive = true;
    void api<Partial<{ rows: { id: string; unlocked: boolean }[] }>>("/api/achievements")
      .then((d) => { if (alive) setUnlocked(new Set((d.rows ?? []).filter((r) => r.unlocked).map((r) => r.id))); })
      .catch(() => {});
    if (user && !user.guest) {
      void api<Partial<{ items: { id: string }[] }>>("/api/avatar/items")
        .then((d) => { if (alive) setOwned(new Set((d.items ?? []).map((i) => i.id))); })
        .catch(() => {});
    }
    return () => { alive = false; };
  }, [user]);
  const badgeLocked = (id: string | null) => {
    const rozet = id ? PART_UNLOCKS[id] : undefined;
    return !!rozet && !unlocked.has(rozet);
  };

  const slots: Slot[] = catalog ? ["bg", "hat", "glasses", "mustache", ...EXTRA_SLOTS] : ["bg", "hat", "glasses", "mustache"];
  const none = (over: Partial<AvatarConfig>): AvatarConfig => ({ ...DEFAULT_AVATAR, hatColor: cfg.hatColor, bg: cfg.bg, ...over });
  const lang = currentLang();

  const tiles: Tile[] = useMemo(() => {
    const pick = (s: Slot, id: string | null, color?: string | null) => {
      if (s === "bg") return setCfg({ bg: id });
      if (s === "hat") return setCfg({ hat: id });
      if (s === "glasses") return setCfg({ glasses: id });
      if (s === "mustache") return setCfg({ mustache: id });
      const extra = { ...cfg.extra };
      if (id) extra[s] = { id, color: color ?? null }; else delete extra[s];
      return setCfg({ extra });
    };
    const current = (s: Slot): string | null => (s === "bg" ? cfg.bg : s === "hat" ? cfg.hat : s === "glasses" ? cfg.glasses : s === "mustache" ? cfg.mustache : cfg.extra[s]?.id ?? null);
    if (catalog) {
      const parts: CatalogPart[] = catalog.cat.parcalar.filter((p) => p.slot === slot);
      const list: Tile[] = slot === "bg" ? [] : [{ key: "none", label: t("avatar.none"), selected: !current(slot), locked: false, none: true, apply: () => pick(slot, null) }];
      for (const p of parts) {
        const byBadge = badgeLocked(p.id);
        const locked = (p.nadir !== "common" && !owned.has(p.id)) || byBadge;
        list.push({ key: p.id, label: p.adlar[lang] ?? p.ad, selected: current(slot) === p.id || (slot === "bg" && !cfg.bg && p.id === "bg_orange"), locked, hint: t(byBadge ? "avatar.locked_hint" : "avatar.locked_earn"), rarity: p.nadir, icon: `${catalog.base}/${p.ikon}`, apply: () => pick(slot, p.id, slot === "hat" ? cfg.hatColor : p.renkler[0] ?? null) });
      }
      return list;
    }
    if (slot === "bg") {
      return AVATAR_BGS.map((b) => ({ key: b.id, label: "", selected: (cfg.bg ?? "bg_orange") === b.id, locked: false, swatch: b, apply: () => pick("bg", b.id) }));
    }
    const ids = slot === "hat" ? HATS : slot === "glasses" ? GLASSES : MUSTACHES;
    return [
      { key: "none", label: t(slot === "hat" ? "avatar.no_hat" : slot === "glasses" ? "avatar.no_glasses" : "avatar.no_mustache"), selected: !current(slot), locked: false, preview: none({ [slot]: null }), apply: () => pick(slot, null) },
      ...ids.map((id, i) => ({ key: id, label: `${t(SLOT_LABEL[slot])} ${i + 1}`, selected: current(slot) === id, locked: badgeLocked(id), hint: t("avatar.locked_hint"), preview: none({ [slot]: id }), apply: () => pick(slot, id) })),
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catalog, slot, cfg, owned, unlocked, lang]);

  const colorable = slot === "hat" && !!cfg.hat && (!catalog || (catalog.cat.parcalar.find((p) => p.id === cfg.hat)?.renkler.length ?? 0) > 0);

  /* Kayıt eşzamansız: bitene kadar düğme meşgul, ikinci dokunuş ikinci kayıt açmıyor. */
  const [saving, setSaving] = useState(false);
  async function save() {
    if (saving) return;
    setSaving(true);
    try { await saveAvatar(cfg); nav.goBack(); } finally { setSaving(false); }
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <AvatarStage config={cfg} height={260 + insets.top}>
        <View style={{ position: "absolute", top: insets.top + spacing.sm, left: spacing.lg, right: spacing.lg, flexDirection: "row", alignItems: "center" }}>
          <StageButton label={t("common.close")} onPress={() => nav.goBack()}><XIcon color={colors.text} size={20} /></StageButton>
          <Text accessibilityRole="header" variant="h3" color="#fff" style={{ flex: 1, textAlign: "center", textShadowColor: "rgba(0,0,0,0.35)", textShadowRadius: 6 }}>{t("avatar.your_avatar")}</Text>
          <StageButton label={t("avatar.reset")} onPress={() => setDraft(null)}><RefreshIcon color={colors.text} size={20} /></StageButton>
        </View>
      </AvatarStage>

      <View style={{ flex: 1, marginTop: -22, borderTopLeftRadius: radii.xl, borderTopRightRadius: radii.xl, backgroundColor: colors.bg }}>
        {/* YUVA SEKMELERİ */}
        <ScrollView accessibilityRole="tablist" horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: spacing.xs, paddingHorizontal: spacing.md, paddingTop: spacing.md, paddingBottom: spacing.sm }} style={{ flexGrow: 0 }}>
          {slots.map((s) => {
            const on = s === slot;
            return (
              <PressableScale key={s} accessibilityRole="tab" accessibilityState={{ selected: on }} onPress={() => { setSlot(s); setHint(null); }} style={{ paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: radii.md, backgroundColor: on ? colors.primarySoft : colors.surface2 }}>
                <Text variant="bodyStrong" color={on ? colors.onPrimarySoft : colors.textMuted}>{t(SLOT_LABEL[s])}</Text>
              </PressableScale>
            );
          })}
        </ScrollView>

        <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.md, paddingBottom: spacing.lg }} showsVerticalScrollIndicator={false}>
          {colorable ? (
            <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm, paddingHorizontal: spacing.xs, paddingBottom: spacing.md }}>
              <Text variant="caption" color={colors.textMuted}>{t("avatar.hat_color")}</Text>
              {HAT_COLORS.map((col) => {
                const sel = cfg.hatColor === col;
                return <PressableScale key={col} hitSlop={4} accessibilityRole="radio" accessibilityState={{ selected: sel }} accessibilityLabel={`${t("avatar.hat_color")} ${col}`} onPress={() => setCfg({ hatColor: col })} style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: col, borderWidth: 3, borderColor: sel ? colors.text : colors.bg }} />;
              })}
            </View>
          ) : null}

          <View accessibilityRole="radiogroup" style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
            {tiles.map((tile) => (
              <OptCard key={tile.key} tile={tile} colors={colors} onLocked={() => setHint(tile.hint ?? t("avatar.locked_earn"))} />
            ))}
          </View>
        </ScrollView>

        <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: insets.bottom + spacing.md, borderTopWidth: 1, borderTopColor: colors.hairline, gap: spacing.sm }}>
          {hint ? <Text accessibilityLiveRegion="polite" variant="caption" color={colors.textMuted}>{hint}</Text> : null}
          <PrimaryButton label={t("common.save")} onPress={save} busy={saving} />
        </View>
      </View>
    </View>
  );
}

function StageButton({ label, onPress, children }: { label: string; onPress: () => void; children: React.ReactNode }) {
  const { colors } = useTheme();
  return (
    <PressableScale hitSlop={4} onPress={onPress} accessibilityLabel={label} style={{ width: 44, height: 44, borderRadius: 22, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface }}>
      {children}
    </PressableScale>
  );
}

/**
 * Parça kartı — önizleme (mini avatar, katalog ikonu ya da arka plan rengi),
 * altta adı; nadirlik kenar rengi; seçiliyse ✓. Kilitli kart soluk ve kilitli;
 * dokununca açılış ipucu (rozet işareti dokunmayı almıyor).
 */
function OptCard({ tile, colors, onLocked }: { tile: Tile; colors: Palette; onLocked: () => void }) {
  const edge = tile.rarity ? RARITY[tile.rarity] ?? colors.border : colors.border;
  return (
    <View style={{ width: "31.5%" }}>
      <PressableScale
        accessibilityRole="radio"
        accessibilityState={{ selected: tile.selected, disabled: tile.locked }}
        accessibilityLabel={tile.locked ? `${tile.label} — ${tile.hint ?? t("avatar.locked_earn")}` : tile.label || t("avatar.slot_bg")}
        onPress={tile.locked ? onLocked : tile.apply}
        style={[{ alignItems: "center", gap: 6, padding: spacing.sm, borderRadius: radii.lg, borderWidth: tile.selected ? 2.5 : 1.5, borderColor: tile.selected ? colors.primary : edge, backgroundColor: colors.surface }, tile.selected ? cardShadow(colors, 6) : null]}
      >
        <View style={{ width: 64, height: 64, alignItems: "center", justifyContent: "center", opacity: tile.locked ? 0.35 : 1 }}>
          {tile.preview ? <MascotAvatar config={tile.preview} size={60} />
            : tile.icon ? <Image source={{ uri: tile.icon }} style={{ width: 60, height: 60 }} resizeMode="contain" />
            : tile.swatch ? <View style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: tile.swatch.to, borderWidth: 6, borderColor: tile.swatch.from }} />
            : <View style={{ width: 44, height: 44, borderRadius: 22, borderWidth: 2, borderStyle: "dashed", borderColor: colors.border }} />}
        </View>
        {tile.label ? <Text variant="micro" color={colors.textMuted} numberOfLines={1}>{tile.label}</Text> : null}
      </PressableScale>
      {tile.locked ? (
        <View pointerEvents="none" style={{ position: "absolute", right: 6, top: 6, width: 20, height: 20, borderRadius: 10, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
          <LockIcon color={colors.textMuted} size={12} />
        </View>
      ) : tile.selected ? (
        <View pointerEvents="none" style={{ position: "absolute", right: 6, top: 6, width: 20, height: 20, borderRadius: 10, alignItems: "center", justifyContent: "center", backgroundColor: colors.primary }}>
          <CheckIcon color={colors.onPrimary} size={12} />
        </View>
      ) : null}
    </View>
  );
}
