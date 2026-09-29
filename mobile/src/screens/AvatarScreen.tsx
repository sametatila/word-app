import React, { useEffect, useMemo, useRef, useState } from "react";
import { t, currentLang } from "../lib/i18n";
import { Animated, Easing, View, ScrollView, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { CheckIcon, CloseIcon, LockedIcon, UndoIcon } from "../ui/icons";
import { PrimaryButton } from "../ui/PrimaryButton";
import { AvatarStage, derivedAvatar } from "../ui/Avatar";
import { useAuth } from "../lib/AuthContext";
import { saveAvatar, useAvatar, AVATAR_RARITY, EXTRA_SLOTS, type AvatarConfig, type ExtraSlot } from "../lib/avatar";
import { useAvatarCatalog } from "../lib/avatarCatalog";
import { partIcon, type CatalogPart } from "../lib/avatarLayers";
import { api } from "../api/client";
import { useTheme, spacing, radii, cardShadow, motion, type Palette } from "../theme";
import { haptic } from "../lib/haptics";
import { reduceMotion } from "../lib/reduceMotion";

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

type Tile = { key: string; label: string; selected: boolean; locked: boolean; hint?: string; rarity?: string; icon?: string; none?: boolean; apply: () => void };

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
    KİLİTLER SUNUCUDAN: bu kullanıcı için kilitli parçalar ve her birinin nasıl
    açılacağı, kullanıcının dilinde (`/api/avatar/items` › `locked`; tanım
    web `lib/avatar-unlocks`ta, istemcide kopyası yok). Kilit yalnız GÖSTERİM
    için; kaydı sunucu eliyor. Misafir ve istek düşerse boş kalır: sunucu
    kaydederken yine eler.
  */
  const [locked, setLocked] = useState<Record<string, string>>({});
  useEffect(() => {
    let alive = true;
    if (user && !user.guest) {
      void api<Partial<{ locked: Record<string, string> }>>("/api/avatar/items")
        .then((d) => { if (alive && d.locked) setLocked(d.locked); })
        .catch(() => {});
    }
    return () => { alive = false; };
  }, [user]);

  const slots: Slot[] = ["bg", "hat", "glasses", "mustache", ...EXTRA_SLOTS];
  const lang = currentLang();

  /*
    SEÇİM HİSSİ: parça seçilince sahnedeki avatar küçük bir sıçrama yapıyor
    (ölçek 1→1.06→1, toplam `motion.short`) ve hafif bir dokunuş titreşimi
    (`haptic("tap")`; titreşim ve ses kendi ayarlarına bağlı). Parça küçük
    bir ikonda seçiliyor, değişiklik büyük sahnede oluyor; sıçrama gözü
    sahneye çekiyor. "Hareketi azalt"ta sıçrama yok, titreşim kalıyor.
  */
  const bounce = useRef(new Animated.Value(1)).current;
  const hop = () => {
    haptic("tap");
    if (reduceMotion()) return;
    bounce.stopAnimation();
    bounce.setValue(1);
    const half = motion.short / 2;
    const ease = Easing.bezier(...motion.ease);
    Animated.sequence([
      Animated.timing(bounce, { toValue: 1.06, duration: half, easing: ease, useNativeDriver: true }),
      Animated.timing(bounce, { toValue: 1, duration: half, easing: ease, useNativeDriver: true }),
    ]).start();
  };

  const tiles: Tile[] = useMemo(() => {
    const pick = (s: Slot, id: string | null, color?: string | null) => {
      hop();
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
      /* Envanter (web ile aynı): yalnız panelde açık parçalar; takılı olan her zaman görünür. */
      const parts: CatalogPart[] = catalog.cat.parcalar.filter((p) => p.slot === slot && (!catalog.active || catalog.active.has(p.id) || current(slot) === p.id));
      const list: Tile[] = slot === "bg" ? [] : [{ key: "none", label: t("avatar.none"), selected: !current(slot), locked: false, none: true, apply: () => pick(slot, null) }];
      /* Karo, yuvanın şu anki rengini gösterir; başka parçaya geçince renk
         korunur (parça o rengi taşıyorsa). */
      const slotColor = slot === "hat" ? cfg.hatColor : slot === "bg" || slot === "glasses" || slot === "mustache" ? null : cfg.extra[slot]?.color ?? null;
      for (const p of parts) {
        const col = slot === "hat" ? cfg.hatColor : slotColor && p.renkler.includes(slotColor) ? slotColor : p.renkler[0] ?? null;
        list.push({ key: p.id, label: p.adlar[lang] ?? p.ad, selected: current(slot) === p.id || (slot === "bg" && !cfg.bg && p.id === "bg_orange"), locked: p.id in locked, hint: locked[p.id], rarity: p.nadir, icon: `${catalog.base}/${partIcon(p, col)}`, apply: () => pick(slot, p.id, col) });
      }
      return list;
    }
    /* TEK ÇİZİM 3B: katalog yoksa karo yok (eski 2B parça listesi silindi). */
    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catalog, slot, cfg, locked, lang]);

  /* RENK: seçili parça renkleniyorsa renk şeridi (web `avatar-editor` ile aynı
     kural). Şapka rengi `hatColor`da, yeni yuvalarınki `extra[yuva].color`da. */
  const cur = slot === "bg" ? cfg.bg : slot === "hat" ? cfg.hat : slot === "glasses" ? cfg.glasses : slot === "mustache" ? cfg.mustache : cfg.extra[slot]?.id ?? null;
  const selPart = catalog ? catalog.cat.parcalar.find((p) => p.id === cur) : undefined;
  const palette: string[] = selPart?.renkler ?? [];
  const colorNow = slot === "hat" ? cfg.hatColor : slot !== "bg" && slot !== "glasses" && slot !== "mustache" ? cfg.extra[slot]?.color ?? palette[0] : null;
  const setColor = (col: string) => (slot === "hat" ? setCfg({ hatColor: col }) : slot !== "bg" && slot !== "glasses" && slot !== "mustache" && cfg.extra[slot] ? setCfg({ extra: { ...cfg.extra, [slot]: { ...cfg.extra[slot]!, color: col } } }) : undefined);
  const colorable = palette.length > 0 && colorNow !== null;

  /* Kayıt eşzamansız: bitene kadar düğme meşgul, ikinci dokunuş ikinci kayıt açmıyor. */
  const [saving, setSaving] = useState(false);
  async function save() {
    if (saving) return;
    setSaving(true);
    try { await saveAvatar(cfg); nav.goBack(); } finally { setSaving(false); }
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <AvatarStage config={cfg} height={260 + insets.top} inset={22} figureScale={bounce}>
        <View style={{ position: "absolute", top: insets.top + spacing.sm, left: spacing.lg, right: spacing.lg, flexDirection: "row", alignItems: "center" }}>
          <StageButton label={t("common.close")} onPress={() => nav.goBack()}><CloseIcon color={colors.text} size={20} /></StageButton>
          {/* Başlık GÖRÜNMÜYOR (web ile aynı): sahnenin üstünde hap uzun şapka
              ve balonların üstüne biniyordu. Ekran okuyucu için yerinde. */}
          <View style={{ flex: 1 }}>
            <Text accessibilityRole="header" variant="h3" style={{ position: "absolute", width: 1, height: 1, opacity: 0 }}>{t("avatar.your_avatar")}</Text>
          </View>
          <StageButton label={t("avatar.reset")} onPress={() => setDraft(null)}><UndoIcon color={colors.text} size={20} /></StageButton>
        </View>
      </AvatarStage>

      <View style={{ flex: 1, marginTop: -22, borderTopLeftRadius: radii.xl, borderTopRightRadius: radii.xl, backgroundColor: colors.bg }}>
        {/* YUVA SEKMELERİ */}
        <ScrollView accessibilityRole="tablist" horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: spacing.xs, paddingHorizontal: spacing.md, paddingTop: spacing.md, paddingBottom: spacing.sm }} style={{ flexGrow: 0 }}>
          {slots.map((s) => {
            const on = s === slot;
            return (
              <PressableScale key={s} accessibilityRole="tab" accessibilityState={{ selected: on }} onPress={() => { setSlot(s); setHint(null); }} style={{ paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: radii.md, backgroundColor: on ? colors.primary : colors.surface2 }}>
                {/* Yuva sekmesi küçük seçim: dolu turuncu + beyaz (2026-09-29 Samet: seçim B). */}
                <Text variant="bodyStrong" color={on ? colors.onPrimary : colors.textMuted}>{t(SLOT_LABEL[s])}</Text>
              </PressableScale>
            );
          })}
        </ScrollView>

        <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.md, paddingBottom: spacing.lg }} showsVerticalScrollIndicator={false}>
          {colorable ? (
            <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm, paddingHorizontal: spacing.xs, paddingBottom: spacing.md }}>
              <Text variant="caption" color={colors.textMuted}>{t("avatar.color")}</Text>
              {palette.map((col) => {
                const sel = colorNow === col;
                return <PressableScale key={col} hitSlop={4} accessibilityRole="radio" accessibilityState={{ selected: sel }} accessibilityLabel={`${t("avatar.color")} ${col}`} onPress={() => setColor(col)} style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: col, borderWidth: 3, borderColor: sel ? colors.text : colors.bg }} />;
              })}
            </View>
          ) : null}

          <View accessibilityRole="radiogroup" style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
            {tiles.map((tile) => (
              <OptCard key={tile.key} tile={tile} colors={colors} onLocked={() => setHint(tile.hint ?? null)} />
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
        accessibilityLabel={tile.locked ? `${tile.label} — ${tile.hint ?? ""}` : tile.label || t("avatar.slot_bg")}
        onPress={tile.locked ? onLocked : tile.apply}
        style={[{ alignItems: "center", gap: 6, padding: spacing.sm, borderRadius: radii.lg, borderWidth: 1, borderColor: tile.selected ? colors.primary : edge, backgroundColor: colors.surface }, tile.selected ? cardShadow(colors, 6) : null]}
      >
        <View style={{ width: 64, height: 64, alignItems: "center", justifyContent: "center", opacity: tile.locked ? 0.35 : 1 }}>
          {tile.icon ? <Image source={{ uri: tile.icon }} style={{ width: 60, height: 60 }} resizeMode="contain" />
            : <View style={{ width: 44, height: 44, borderRadius: 22, borderWidth: 1.5, borderStyle: "dashed", borderColor: colors.border }} />}
        </View>
        {tile.label ? <Text variant="micro" color={colors.textMuted} numberOfLines={1}>{tile.label}</Text> : null}
      </PressableScale>
      {tile.locked ? (
        <View pointerEvents="none" style={{ position: "absolute", right: 6, top: 6, width: 20, height: 20, borderRadius: 10, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
          <LockedIcon color={colors.textMuted} size={12} />
        </View>
      ) : tile.selected ? (
        <View pointerEvents="none" style={{ position: "absolute", right: 6, top: 6, width: 20, height: 20, borderRadius: 10, alignItems: "center", justifyContent: "center", backgroundColor: colors.primary }}>
          <CheckIcon color={colors.onPrimary} size={12} />
        </View>
      ) : null}
    </View>
  );
}
