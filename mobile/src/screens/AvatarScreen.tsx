import React, { useEffect, useState } from "react";
import { t } from "../lib/i18n";
import { View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { PressableScale } from "../ui/PressableScale";
import { LockIcon } from "../ui/icons";
import { PrimaryButton } from "../ui/PrimaryButton";
import { ScreenHeader, SectionTitle } from "../social/common";
import { derivedAvatar, MascotAvatar } from "../ui/Avatar";
import { useAuth } from "../lib/AuthContext";
import { HATS, GLASSES, MUSTACHES, HAT_COLORS } from "../ui/avatarParts";
import { saveAvatar, useAvatar, DEFAULT_AVATAR, type AvatarConfig } from "../lib/avatar";
import { PART_UNLOCKS } from "../lib/avatarUnlocks";
import { api } from "../api/client";
import { useTheme, spacing, radii, softShadow, type Palette, ds } from "../theme";

/**
 * Bir aksesuar seçeneği — o aksesuarı taşıyan mini avatar önizlemesi + seçili
 * çerçeve.
 *
 * SEÇİLİLİK YALNIZ ÇERÇEVEYLE anlatılıyordu: ekran okuyucu bu karoları adsız
 * düğmeler olarak okuyor, hangisinin seçili olduğunu hiç söylemiyordu. Rol ve
 * durum verilince en azından "seçili" duyuluyor; ad da grubun adı ve sıra
 * numarasından kuruluyor (aksesuarların kendi adları yok, uydurulmadı).
 */
function OptTile({ preview, selected, onPress, colors, label, locked = false, lockHint = "" }: { preview: AvatarConfig; selected: boolean; onPress: () => void; colors: Palette; label: string; locked?: boolean; lockHint?: string }) {
  /* KİLİTLİ olan gizlenmiyor, kilitli çiziliyor: görünmeyen bir ödül kimseyi
     peşinden koşturmaz. Erişilebilirlik adı nasıl açılacağını da söylüyor —
     yalnız `disabled` verilseydi ekran okuyucu "neden?" sorusunu cevapsız
     bırakırdı (web `avatar-editor` `Opt` ile aynı). */
  return (
    /* KİLİT ROZETİ BASILABİLİR ALANIN DIŞINDA, üstüne bindirilmiş bir kardeş.
       İçeride olsaydı dokunma hedefi ölçüsü (`check:hit`) onu hedef sanardı —
       oysa hedef 54 piksellik karonun kendisi; rozet yalnız işaret ve
       dokunmayı hiç almıyor (`pointerEvents="none"`). */
    <View>
      <PressableScale
        accessibilityRole="radio"
        accessibilityState={{ selected, disabled: locked }}
        accessibilityLabel={locked ? `${label} — ${lockHint}` : label}
        onPress={locked ? undefined : onPress}
        style={{ padding: spacing.xs, borderRadius: radii.lg, borderWidth: 2, borderColor: selected ? colors.primary : "transparent", opacity: locked ? 0.35 : 1 }}
      >
        <MascotAvatar config={preview} size={ds(54)} />
      </PressableScale>
      {locked ? (
        <View pointerEvents="none" style={{ position: "absolute", right: 2, bottom: 2, width: 20, height: 20, borderRadius: 10, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
          <LockIcon color={colors.textMuted} size={12} />
        </View>
      ) : null}
    </View>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View>
      <SectionTitle title={title} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: spacing.sm, paddingRight: spacing.lg }}>
        {children}
      </ScrollView>
    </View>
  );
}

/**
 * Avatar düzenleme — Nomi maskotuna şapka (renkli), gözlük, bıyık ekleme. Canlı
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
  /* Hiç seçmemiş kişi listelerde kimliğinden türeyen maskotla görünüyor;
     ekran da ondan başlıyor (web `avatar-editor` ile aynı). */
  const { user } = useAuth();
  const cfg = draft ?? stored ?? derivedAvatar(user?.id ?? "");
  const setCfg = (patch: Partial<AvatarConfig>) => setDraft({ ...cfg, ...patch });

  /*
    KAZANILMIŞ ROZETLER. Kilit yalnız GÖSTERİM için; kaydı sunucu eliyor
    (`api/profile`, `lib/avatar-unlocks`). İstek düşerse liste boş kalıyor ve
    kilitli aksesuarlar kilitli görünüyor — açık görünüp kaydedilmemekten iyi.
  */
  const [unlocked, setUnlocked] = useState<Set<string>>(new Set());
  useEffect(() => {
    let alive = true;
    void api<Partial<{ rows: { id: string; unlocked: boolean }[] }>>("/api/achievements")
      .then((d) => { if (alive) setUnlocked(new Set((d.rows ?? []).filter((r) => r.unlocked).map((r) => r.id))); })
      .catch(() => { /* kilitli kalsın */ });
    return () => { alive = false; };
  }, []);
  const kilitli = (id: string | null) => {
    const rozet = id ? PART_UNLOCKS[id] : undefined;
    return !!rozet && !unlocked.has(rozet);
  };

  const none = (over: Partial<AvatarConfig>): AvatarConfig => ({ ...DEFAULT_AVATAR, hatColor: cfg.hatColor, ...over });

  /* Kayıt eşzamansız: bitene kadar düğme meşgul, ikinci dokunuş ikinci kayıt açmıyor. */
  const [saving, setSaving] = useState(false);
  async function save() {
    if (saving) return;
    setSaving(true);
    try { await saveAvatar(cfg); nav.goBack(); } finally { setSaving(false); }
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title={t("avatar.your_avatar")} />

      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xxl }} showsVerticalScrollIndicator={false}>
        {/* canlı önizleme */}
        <View style={{ alignItems: "center", marginVertical: spacing.lg }}>
          <View style={softShadow(colors.primary, 12)}><MascotAvatar config={cfg} size={ds(140)} /></View>
        </View>

        <Group title={t("avatar.hat")}>
          <OptTile preview={none({ hat: null })} selected={cfg.hat === null} label={t("avatar.no_hat")} onPress={() => setCfg({ hat: null })} colors={colors} />
          {HATS.map((h, i) => (
            <OptTile key={h} label={`${t("avatar.hat")} ${i + 1}`} preview={none({ hat: h })} selected={cfg.hat === h} locked={kilitli(h)} lockHint={t("avatar.locked_hint")} onPress={() => setCfg({ hat: h })} colors={colors} />
          ))}
        </Group>

        {cfg.hat ? (
          <View>
            <SectionTitle title={t("avatar.hat_color")} />
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

        <Group title={t("avatar.glasses")}>
          <OptTile preview={none({ glasses: null })} selected={cfg.glasses === null} label={t("avatar.no_glasses")} onPress={() => setCfg({ glasses: null })} colors={colors} />
          {GLASSES.map((g, i) => (
            <OptTile key={g} label={`${t("avatar.glasses")} ${i + 1}`} preview={none({ glasses: g })} selected={cfg.glasses === g} locked={kilitli(g)} lockHint={t("avatar.locked_hint")} onPress={() => setCfg({ glasses: g })} colors={colors} />
          ))}
        </Group>

        <Group title={t("avatar.mustache")}>
          <OptTile preview={none({ mustache: null })} selected={cfg.mustache === null} label={t("avatar.no_mustache")} onPress={() => setCfg({ mustache: null })} colors={colors} />
          {MUSTACHES.map((m, i) => (
            <OptTile key={m} label={`${t("avatar.mustache")} ${i + 1}`} preview={none({ mustache: m })} selected={cfg.mustache === m} locked={kilitli(m)} lockHint={t("avatar.locked_hint")} onPress={() => setCfg({ mustache: m })} colors={colors} />
          ))}
        </Group>

        <PrimaryButton label={t("common.save")} onPress={save} busy={saving} style={{ marginTop: spacing.xxl }} />
      </ScrollView>
    </View>
  );
}
