/**
 * Sosyal merkezin sekme kimliği ve adres çözümü.
 *
 * AYRI DOSYADA VE BU BİR ONARIM. `hubTab` `components/social/friends-hub`
 * içinde duruyordu ve o dosya `"use client"`; sunucuda çizilen arkadaşlar
 * sayfası ise onu DOĞRUDAN çağırıyordu. Next bunu yasaklıyor ("Attempted to
 * call hubTab() from the server but hubTab is on the client") ve çağrı
 * fırlatıyordu. Sayfanın `try/catch`i hatayı yutup "Arkadaşlar yüklenemedi"
 * kartını çiziyordu — yani sekme, veritabanı ya da ağ ile hiç ilgisi olmayan
 * bir sebeple HERKESTE, HER SEFERİNDE kırıktı.
 *
 * Buradaki iki şey de saf veri: istemci de sunucu da okuyabilir.
 */
export type HubTab = "friends" | "feed" | "find";

export const HUB_TABS: { key: HubTab; label: string }[] = [
  { key: "friends", label: "social.tab_friends" },
  { key: "feed", label: "friends.tab_feed" },
  { key: "find", label: "friends.tab_find" },
];

/** Eski adresler (bildirimler, kayıtlı bağlantılar) hâlâ çalışsın. */
const ALIAS: Record<string, HubTab> = { quests: "friends", requests: "friends" };

export function hubTab(raw: string | undefined): HubTab {
  if (!raw) return "friends";
  if (HUB_TABS.some((t) => t.key === raw)) return raw as HubTab;
  return ALIAS[raw] ?? "friends";
}
