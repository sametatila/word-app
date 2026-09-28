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
export type HubTab = "league" | "friends" | "feed";

/** Topluluk sekmesi (2026-09-28): Lig · Arkadaşlar · Akış; ilk açılan Lig. */
export const HUB_TABS: { key: HubTab; label: string }[] = [
  { key: "league", label: "leaderboard.league" },
  { key: "friends", label: "social.tab_friends" },
  { key: "feed", label: "friends.tab_feed" },
];

/** Eski adresler (bildirimler, kayıtlı bağlantılar) hâlâ çalışsın: "Bul" Arkadaşlar'da. */
const ALIAS: Record<string, HubTab> = { quests: "friends", requests: "friends", find: "friends" };

export function hubTab(raw: string | undefined): HubTab {
  if (!raw) return "league";
  if (HUB_TABS.some((t) => t.key === raw)) return raw as HubTab;
  return ALIAS[raw] ?? "league";
}
