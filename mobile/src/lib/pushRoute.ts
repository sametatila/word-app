import { track } from "./track";
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
 *
 * Eşleme `__tests__/pushRoute.test.ts` ile bağlı: test sunucu kaynağındaki
 * bütün `url:` değerlerini tarıyor ve her birinin buradan bir ekran
 * döndürdüğünü doğruluyor. Sunucuya karşılığı olmayan bir adres eklenirse
 * bildirim sessizce ana ekrana düşmüyor, test kırılıyor.
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

/**
 * `/learn` ALT YOLLARI — kendi ekranı olanlar.
 *
 * Eskiden `/learn` ile başlayan her adres sekmelere gidiyordu ve haftalık
 * sınav hatırlatması bunun tek gerçek kurbanıydı: sunucu `/learn/weekly`
 * gönderiyor (bkz. `lib/push` haftalık tur), webde sınav sayfası açılıyor,
 * mobilde ana ekran açılıyordu — bildirimin çağırdığı şey bir dokunuş daha
 * uzaktı. Kardeş yollar da aynı sınıftan olduğu için birlikte eşlendi.
 *
 */
const LEARN_SUB = {
  weekly: "Weekly",
  daily: "Daily",
  practice: "Practice",
  walk: "Walk",
  challenge: "Challenge",
} as const satisfies Record<string, keyof RootStackParams>;

export type PushRoute = { name: keyof RootStackParams; params?: object };

/** Adresten ekran — gezgine dokunmaz, o yüzden testten doğrudan çağrılabilir. */
export function routeFromPush(url: string): PushRoute | null {
  if (!url) return null;
  const [path, query = ""] = url.split("?");
  const tab = new URLSearchParams(query).get("tab");
  if (path.startsWith("/u/")) {
    const username = decodeURIComponent(path.slice(3));
    return username ? { name: "User", params: { username } } : null;
  }
  if (path.startsWith("/friends")) {
    const known = friendTab(tab);
    return { name: "Tabs", params: { screen: "Friends", params: known ? { tab: known } : undefined } };
  }
  if (path.startsWith("/leaderboard")) return { name: "Leaderboard" };
  if (path.startsWith("/inbox")) return { name: "Inbox" };
  if (path.startsWith("/learn")) {
    const sub = path.slice("/learn/".length).split("/")[0];
    return { name: sub in LEARN_SUB ? LEARN_SUB[sub as keyof typeof LEARN_SUB] : "Tabs" };
  }
  return null;
}

/**
 * UYGULAMA İÇİ adres → ekran. `routeFromPush`tan AYRI, çünkü iki farklı küme:
 * o sunucunun BİLDİRİMDE gönderdiği adresleri çeviriyor, bu ise sunucunun
 * yanıt gövdesinde verdiği yönlendirmeleri (`nextStep.href`).
 *
 * Dört biçim var ve hepsi `lib/proficiency-data` `nextStep`ten geliyor:
 * `/learn/game`, `/immersion`, `/immersion/skill/<id>`, `/lessons/<id>`.
 * `check:parity` sunucunun ürettiği biçimlerle burayı eşliyor — yeni bir
 * biçim eklenirse mobil onu sessizce yutmasın (tanınmayan adres `null`
 * dönüyor ve çağıran düğmeyi hiç çizmiyor).
 */
export function routeFromHref(href: string): PushRoute | null {
  if (!href) return null;
  const path = href.split("?")[0];
  if (path === "/learn/game") return { name: "Game" };
  if (path.startsWith("/immersion/skill/")) {
    const id = decodeURIComponent(path.slice("/immersion/skill/".length));
    return id ? { name: "Item", params: { id, kind: "skill", title: "" } } : null;
  }
  if (path.startsWith("/immersion")) return { name: "Tabs", params: { screen: "Path" } };
  if (path.startsWith("/lessons/")) {
    const id = decodeURIComponent(path.slice("/lessons/".length));
    return id ? { name: "Lesson", params: { id } } : null;
  }
  return null;
}

/**
 * Gezgin hazır olmadan gelen bildirim dokunuşu.
 *
 * SOĞUK AÇILIŞ YARIŞI - derin bağlantı yolunun ÖĞRENDİĞİ ama buraya
 * taşınmayan ders. Uygulama KAPALIYKEN bildirime dokunulup açıldığında
 * (`getInitialNotification`) gezgin henüz kurulmamış oluyor ve `isReady()`
 * koruması rotayı SESSİZCE DÜŞÜRÜYORDU: kullanıcı bildirime dokunuyor,
 * uygulama açılıyor ve ana ekranda kalıyor - yani bildirimin çağırdığı yer
 * bir dokunuş daha uzakta. Bildirimden açılışın en sık hâli tam bu.
 *
 * `App.tsx` `NavigationContainer.onReady` içinde boşaltılıyor
 * (`flushPendingPush`), derin bağlantıdaki `pending` ile aynı kalıp.
 */
let bekleyen: PushRoute | null = null;

function git(route: PushRoute): void {
  try {
    /* Ekran adı çalışma zamanında seçiliyor; `navigate`in aşırı yüklemeleri
       sabit ada bağlı, o yüzden tek bir gevşek imzayla çağrılıyor. Adlar
       `LEARN_SUB`ta `keyof RootStackParams` ile zaten sınanıyor. */
    (navigationRef.navigate as (name: string, params?: object) => void)(route.name, route.params);
  } catch {
    /* gezgin bir şekilde hazır değilse dokunuş uygulamayı açmakla kalır */
  }
}

export function navigateFromPush(url: string): void {
  /* Bildirimden açılış ölçülüyor: "kaç kişi bildirimden dönüyor" sorusu
     web tarafında baştan beri cevaplı, Androidde hiç sayılmıyordu. Ölçüm
     gezginin hazır olmasını BEKLEMİYOR: dokunuş olmuştur. */
  track("push_open");
  const route = routeFromPush(url);
  if (!route) return;
  if (!navigationRef.isReady()) { bekleyen = route; return; }
  git(route);
}

/** Gezgin hazır olduğunda bekleyen dokunuşu işler (bkz. `bekleyen`). */
export function flushPendingPush(): void {
  const route = bekleyen;
  bekleyen = null;
  if (route && navigationRef.isReady()) git(route);
}
