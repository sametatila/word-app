import React, { useEffect, useState } from "react";
import { t as tx } from "../lib/i18n";
import { View, TextInput, ScrollView, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { PressableScale } from "../ui/PressableScale";
import { ConfirmDialog } from "../ui/ConfirmDialog";
import { ArrowBackIcon, CheckIcon, XIcon } from "../ui/icons";
import { useAuth } from "../lib/AuthContext";
import { listAccounts, deleteAccount } from "../lib/auth";
import { googleSignIn } from "../lib/googleAuth";
import { Skeleton } from "../ui/Skeleton";
import { useTheme, spacing, radii, softShadow, type Palette } from "../theme";

/** Silinecekler — t() çağrı anında okunsun diye fonksiyon (dil modül yüklenirken hazır değil). */
function losses(): string[] {
  return [
    tx("deleteaccount.kelime_ilerlemen_serilerin_xp_ve_b"),
    tx("deleteaccount.yazilarin_konusma_kayitlarin_ve_de"),
    tx("deleteaccount.arkadasliklarin_ve_gelen_kutun"),
    tx("deleteaccount.hesabin_ve_e_posta_adresin"),
  ];
}

function LossRow({ text, colors }: { text: string; colors: Palette }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: 8 }}>
      <View style={{ width: 28, height: 28, borderRadius: radii.sm, alignItems: "center", justifyContent: "center", backgroundColor: colors.dangerSoft }}>
        <XIcon color={colors.danger} size={16} />
      </View>
      <Text variant="body" style={{ flex: 1 }}>{text}</Text>
    </View>
  );
}

/**
 * Hesap silme (Play "hesap silme" zorunluluğu, App Store 5.1.1(v)) — Ayarlar › Hesap › Hesabı sil.
 * Web'deki /account/delete ile aynı uç ve aynı kurallar: parola hesabı parolasını
 * yazar, Google hesabı taze oturum ister (eskiyse burada yeniden Google girişi
 * yaptırılır). Silme sunucuda tüm veriyi temizler; cihazdaki tercihler de silinir.
 */
export function DeleteAccountScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { user, signOut } = useAuth();

  const [hasPassword, setHasPassword] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [needsFresh, setNeedsFresh] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let alive = true;
    listAccounts().then((accs) => { if (alive) setHasPassword(accs.some((a) => a.providerId === "credential")); });
    return () => { alive = false; };
  }, []);

  const ready = agree && hasPassword !== null && (!hasPassword || password.length > 0) && !busy;

  async function finishDeleted() {
    setDone(true);
    // Cihazdaki tercihler (avatar, ses, hatırlatma, onboarding) da gider — temiz başlangıç.
    try { await AsyncStorage.clear(); } catch { /* yut */ }
    await signOut();
    setTimeout(() => nav.reset({ index: 0, routes: [{ name: "Onboarding" }] }), 1600);
  }

  async function run() {
    setConfirm(false);
    if (busy) return;
    setBusy(true);
    setError(null);
    const r = await deleteAccount(hasPassword ? password : undefined);
    setBusy(false);
    if (r.ok) { await finishDeleted(); return; }
    if (r.code === "FRESH") { setNeedsFresh(true); return; }
    setError(r.message);
  }

  /** Google hesabı, oturum eski: yeniden giriş yap ve silmeyi tekrar dene. */
  async function reauthAndRetry() {
    setBusy(true);
    setError(null);
    const g = await googleSignIn();
    if (!g.ok) { setBusy(false); if (g.code !== "CANCELLED") setError(g.message); return; }
    const r = await deleteAccount();
    setBusy(false);
    if (r.ok) { await finishDeleted(); return; }
    setError(r.message);
  }

  const pad = { paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg } as const;

  if (done) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, alignItems: "center", justifyContent: "center", padding: spacing.xl, gap: spacing.md }}>
        <View style={{ width: 72, height: 72, borderRadius: 36, backgroundColor: colors.successSoft, alignItems: "center", justifyContent: "center" }}>
          <CheckIcon color={colors.success} size={34} />
        </View>
        <Text variant="h2" style={{ textAlign: "center" }}>{tx("deleteaccount.hesabin_silindi")}</Text>
        <Text variant="body" color={colors.textMuted} style={{ textAlign: "center" }}>{tx("deleteaccount.verilerin_kaldirildi_seni_tanimak_guzeldi")}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingBottom: spacing.sm, ...pad }}>
        <PressableScale hitSlop={4} onPress={() => nav.goBack()} accessibilityLabel={tx("common.geri")} style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
          <ArrowBackIcon color={colors.text} size={24} />
        </PressableScale>
        <Text variant="h2">{tx("deleteaccount.hesabi_sil")}</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xxl }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <Text variant="body" color={colors.textMuted} style={{ marginTop: spacing.sm, lineHeight: 22 }}>
          {tx("deleteaccount.hesap_ve_ona_bagli_her_sey_kalici", { hesap: user?.email ? tx("deleteaccount.eposta_hesabi", { eposta: user.email }) : tx("deleteaccount.hesabin") })}
        </Text>

        <Card padded style={{ marginTop: spacing.lg, paddingVertical: spacing.sm }}>
          {losses().map((text) => <LossRow key={text} text={text} colors={colors} />)}
        </Card>

        <Card padded style={{ marginTop: spacing.md, backgroundColor: colors.surface2, borderColor: "transparent" }}>
          {/* Abonelik iptal yolu mağazaya göre değişir: Play Store › Ödemeler ve abonelikler,
              App Store'da Ayarlar › Apple Hesabı › Abonelikler. Yanlışını göstermek
              kullanıcıyı hiç var olmayan bir ekrana yolluyor. */}
          <Text variant="caption" color={colors.textMuted} style={{ lineHeight: 20 }}>
            {tx(Platform.OS === "ios" ? "deleteaccount.subscription_cancel_appstore" : "deleteaccount.subscription_cancel_play")}
          </Text>
        </Card>

        {needsFresh ? (
          <Card padded style={{ marginTop: spacing.lg, gap: spacing.sm }}>
            <Text variant="h3">{tx("deleteaccount.once_yeniden_giris_yap")}</Text>
            <Text variant="caption" color={colors.textMuted} style={{ lineHeight: 20 }}>{tx("deleteaccount.guvenlik_icin_hesap_silme_son_24")}</Text>
            <PressableScale onPress={reauthAndRetry} disabled={busy} style={[{ borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: 14, alignItems: "center", marginTop: spacing.xs }, softShadow(colors.primary, 8)]}>
              <Text variant="bodyStrong" color="#fff">{busy ? "..." : tx("deleteaccount.google_ile_yeniden_gir_ve_sil")}</Text>
            </PressableScale>
          </Card>
        ) : (
          <>
            {hasPassword ? (
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder={tx("deleteaccount.parolan")}
                placeholderTextColor={colors.textFaint}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="password"
                accessibilityLabel={tx("deleteaccount.parola")}
                style={{ marginTop: spacing.lg, backgroundColor: colors.surface, borderRadius: radii.md, borderWidth: 1.5, borderColor: colors.border, paddingHorizontal: spacing.lg, paddingVertical: 13, color: colors.text, fontSize: 16 }}
              />
            ) : hasPassword === false ? (
              <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.lg }}>{tx("deleteaccount.google_ile_girdigin_icin_parola_gerekmiyor")}</Text>
            ) : (
              // Hesabın parolası var mı okunana dek alan yerini tutar: sonra
              // beliren kutu onay kutucuğunu ve sil düğmesini aşağı itmesin.
              <Skeleton height={48} radius={radii.md} style={{ marginTop: spacing.lg }} />
            )}

            <PressableScale onPress={() => setAgree((a) => !a)} accessibilityRole="checkbox" accessibilityState={{ checked: agree }} style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: spacing.md, marginTop: spacing.sm }}>
              <View style={{ width: 26, height: 26, borderRadius: radii.sm, borderWidth: 2, borderColor: agree ? colors.danger : colors.border, backgroundColor: agree ? colors.danger : "transparent", alignItems: "center", justifyContent: "center" }}>
                {agree ? <CheckIcon color="#fff" size={16} /> : null}
              </View>
              <Text variant="body" style={{ flex: 1 }}>{tx("deleteaccount.verilerimin_kalici_olarak_silinecegini_anlad")}</Text>
            </PressableScale>

            {error ? <Text variant="bodyStrong" color={colors.danger} style={{ marginTop: spacing.sm }}>{error}</Text> : null}

            <PressableScale onPress={() => setConfirm(true)} disabled={!ready} accessibilityState={{ disabled: !ready }} style={[{ borderRadius: radii.lg, backgroundColor: ready ? colors.danger : colors.surface2, paddingVertical: 16, alignItems: "center", marginTop: spacing.lg }, ready ? softShadow(colors.danger, 10) : {}]}>
              <Text variant="h3" color={ready ? "#fff" : colors.textFaint}>{busy ? tx("deleteaccount.siliniyor") : tx("deleteaccount.hesabimi_kalici_olarak_sil")}</Text>
            </PressableScale>
            <PressableScale onPress={() => nav.goBack()} style={{ paddingVertical: spacing.lg, alignItems: "center" }}>
              <Text variant="bodyStrong" color={colors.textMuted}>{tx("common.vazgec")}</Text>
            </PressableScale>
          </>
        )}
      </ScrollView>

      <ConfirmDialog
        visible={confirm}
        title={tx("deleteaccount.son_kez_soruyoruz")}
        message={tx("deleteaccount.hesabin_ve_tum_verilerin_silinecek")}
        confirmLabel={tx("deleteaccount.evet_sil")}
        cancelLabel={tx("common.vazgec")}
        destructive
        onConfirm={run}
        onCancel={() => setConfirm(false)}
      />
    </View>
  );
}
