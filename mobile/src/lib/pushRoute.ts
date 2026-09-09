import { createNavigationContainerRef } from "@react-navigation/native";
import type { RootStackParams } from "../navigation/RootStack";

/**
 * Bildirime dokunulunca nereye gidilecek.
 *
 * Sunucu bildirimi WEB adresiyle üretiyor (`/friends?tab=requests`, `/learn`,
 * `/leaderboard`, `/u/<kullanıcı>`) — tek bir push gövdesi hem tarayıcıya hem
 * uygulamaya gidiyor ve iki taraf da aynı yeri açmalı. Burası o adresi mobil
 * ekrana çeviriyor. Tanınmayan adres uygulamayı açmakla yetiniyor: bilinmeyen
 * bir yola atlamaktansa ana ekranda kalmak iyidir.
 */
export const navigationRef = createNavigationContainerRef<RootStackParams>();

/** Arkadaş ekranının sekmeleri — adresteki `?tab=` yalnız bunlardan biri olabilir.
    Eski adresler (`quests`, `requests`) artık arkadaş sekmesinin başında. */
const FRIEND_TABS = ["friends", "feed", "find"] as const;
const ALIAS: Record<string, FriendTab> = { quests: "friends", requests: "friends" };
type FriendTab = (typeof FRIEND_TABS)[number];
function friendTab(v: string | null): FriendTab | undefined {
  if (!v) return undefined;
  return (FRIEND_TABS as readonly string[]).includes(v) ? (v as FriendTab) : ALIAS[v];
}

export function navigateFromPush(url: string): void {
  if (!url || !navigationRef.isReady()) return;
  const [path, query = ""] = url.split("?");
  const tab = new URLSearchParams(query).get("tab");
  try {
    if (path.startsWith("/u/")) {
      const username = decodeURIComponent(path.slice(3));
      if (username) navigationRef.navigate("User", { username });
      return;
    }
    if (path.startsWith("/friends")) {
      const known = friendTab(tab);
      navigationRef.navigate("Tabs", { screen: "Friends", params: known ? { tab: known } : undefined });
      return;
    }
    if (path.startsWith("/leaderboard")) {
      navigationRef.navigate("Leaderboard");
      return;
    }
    if (path.startsWith("/inbox")) {
      navigationRef.navigate("Inbox");
      return;
    }
    if (path.startsWith("/learn")) {
      navigationRef.navigate("Tabs");
    }
  } catch {
    /* gezgin hazır değilse dokunuş uygulamayı açmakla kalır */
  }
}
