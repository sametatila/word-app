import React from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { t } from "../lib/i18n";
import { EmptyCard, type IconCmp } from "../social/common";
import { LockIcon } from "./icons";

/**
 * MİSAFİRE "HESAP OLUŞTUR" KARTI (mağaza ön inceleme B24).
 *
 * Sosyal, Premium, hatırlatmalar ve yapay zekâ hesap istiyor; misafir o
 * yüzeylere geldiğinde boş bir ekran ya da "giriş gerekli" duvarı değil, neyin
 * NEDEN hesap istediğini söyleyen tek bir kart görüyor. Kartın eylemi giriş
 * ekranı; orada başlık misafir ilerlemesinin hesaba taşınacağını söylüyor.
 *
 * Tek bileşen: altı yüzeyde altı ayrı kart, altı ayrı düğme metni ve altı ayrı
 * gezinme demek olurdu (girişsiz kullanıcının kartı `EmptyCard` ile aynı kalıp).
 */
export function GuestAccountCard({ title, text, icon = LockIcon, tint }: { title: string; text: string; icon?: IconCmp; tint?: string }) {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return <EmptyCard icon={icon} tint={tint} title={title} text={text} action={t("guest.create_account")} onAction={() => nav.navigate("Auth")} />;
}
