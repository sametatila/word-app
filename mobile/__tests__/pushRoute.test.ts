/// <reference types="node" />
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { routeFromPush } from "../src/lib/pushRoute";

/**
 * Bildirim adresleri — TEK kaynak SUNUCU, çeviren taraf mobil.
 *
 * NEDEN TEST: sunucu push gövdesine bir web adresi koyuyor (`url`) ve aynı
 * gövde hem tarayıcıya hem uygulamaya gidiyor. Mobil o adresi ekrana çevirmek
 * zorunda; çeviremezse bildirim hiç kırılmıyor, sessizce ANA EKRANI açıyor.
 * Sessiz olduğu için gözle de, derlemeyle de, öteki kapılarla da görünmüyordu:
 * `/learn/weekly` aylarca sekmelere düşüyordu çünkü `/learn` öneki onu yutuyor.
 *
 * Test sunucu kaynağını tarıyor, yani listeyi elle güncellemek gerekmiyor:
 * sunucuya yeni bir adres eklendiği anda burası onu da sınıyor.
 */
const REPO = path.join(__dirname, "..", "..");
const oku = (p: string) => readFileSync(path.join(REPO, p), "utf8");

/** Sunucunun push gövdelerine koyduğu bütün adresler. */
function serverUrls(): string[] {
  const files = ["src/lib/push.ts", ...readdirSync(path.join(REPO, "src/lib/social")).filter((f) => f.endsWith(".ts")).map((f) => `src/lib/social/${f}`)];
  const urls = new Set<string>();
  for (const f of files) {
    for (const m of oku(f).matchAll(/\burl:\s*"([^"]+)"/g)) urls.add(m[1]);
  }
  return [...urls].sort();
}

describe("bildirim adresi -> ekran", () => {
  const urls = serverUrls();

  it("sunucu gerçekten adres gönderiyor", () => {
    // Tarama boşa düşerse test her şeyi geçirir; o yüzden sayı da sınanıyor.
    expect(urls.length).toBeGreaterThanOrEqual(6);
  });

  it("her adresin bir ekranı var", () => {
    const yok = urls.filter((u) => routeFromPush(u) === null);
    expect(yok).toEqual([]);
  });

  /*
   * ANA EKRANA DÜŞEN ADRESLER. `Tabs` geçerli bir cevap ama yalnız `/learn`
   * için: alt yolu olan bir adres sekmelere düşerse bildirimin çağırdığı yer
   * bir dokunuş uzakta kalıyor demektir.
   */
  it("alt yolu olan adres sekmelere düşmüyor", () => {
    const dusen = urls.filter((u) => u.split("?")[0] !== "/learn" && routeFromPush(u)?.name === "Tabs" && !u.startsWith("/friends"));
    expect(dusen).toEqual([]);
  });

  it("haftalık sınav hatırlatması sınav ekranını açıyor", () => {
    expect(routeFromPush("/learn/weekly")).toEqual({ name: "Weekly" });
    expect(routeFromPush("/learn/daily")).toEqual({ name: "Daily" });
    expect(routeFromPush("/learn")).toEqual({ name: "Tabs" });
  });

  it("arkadaş sekmeleri ve takma adlar", () => {
    expect(routeFromPush("/friends?tab=feed")).toEqual({ name: "Tabs", params: { screen: "Friends", params: { tab: "feed" } } });
    expect(routeFromPush("/friends?tab=quests")).toEqual({ name: "Tabs", params: { screen: "Friends", params: { tab: "friends" } } });
    expect(routeFromPush("/friends?tab=olmayan")).toEqual({ name: "Tabs", params: { screen: "Friends", params: undefined } });
  });

  it("tanınmayan adres ve boş adres ekran döndürmüyor", () => {
    expect(routeFromPush("")).toBeNull();
    expect(routeFromPush("/settings/billing")).toBeNull();
    expect(routeFromPush("/u/")).toBeNull();
  });

  it("kullanıcı adı çözülüyor", () => {
    expect(routeFromPush("/u/ay%C5%9Fe")).toEqual({ name: "User", params: { username: "ayşe" } });
  });
});
