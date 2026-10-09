/**
 * HER UCUN BİR ÇAĞIRANI VAR MI.
 *
 * NEDEN VAR: bir uç yazılıp istemciye hiç bağlanmadığında kimse fark etmiyor.
 * Derleme geçiyor, lint geçiyor, tipler tutuyor; uç sessizce çürüyor ve
 * yaptığı iş HİÇ yapılmıyor. Bu depoda ölçüldüğünde iki gerçek örnek çıktı:
 * `/api/plan` (istemcisi bir parite turunda kaldırılmıştı; uç 2026-09-26'da
 * silindi) ve `/api/premium/consume` (tur başına kotayı sayan tek yer; çağıran
 * olmadığı için sayaç hiç artmıyordu).
 *
 * Kural: `src/app/api/**\/route.ts` altındaki her uç ya web/mobil kaynağında
 * çağrılıyor olacak ya da aşağıdaki listede SEBEBİYLE yazılı olacak. Liste
 * yalnız KISALABİLİR: bir ucu listeye eklemek, onu bağlamamayı belgelemektir.
 *
 *   node scripts/check-endpoints.mjs          # döküm
 *   node scripts/check-endpoints.mjs --check  # listede olmayan çağıransız uç varsa hata (CI)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

/**
 * Çağıranı REPODA OLMAYAN uçlar — sebebiyle.
 *
 * Çoğu dışarıdan çağrılıyor (bizim kodumuz onları çağırmaz, çağırmamalı):
 * mağaza, Apple, systemd timer'ları.
 */
const ALLOW = {
  "/api/auth/apple/notifications": "Apple sunucudan sunucuya bildirim gönderiyor; bizim kodumuz çağırmaz",
  "/api/cron/reminders": "systemd timer + /opt/lernomi/cron-call.sh (repo dışı, bkz. AGENTS.md)",
  "/api/cron/streak-alert": "systemd timer (lernomi-cron-streak, saatlik 17-21 UTC)",
  "/api/cron/summary": "systemd timer",
  "/api/cron/weekly-reminder": "systemd timer (lernomi-cron-weekly, pazar 15-19 UTC)",
  "/api/premium/consume": "tur başına kotayı sayan uç, çağıranı yok (web-parity §11.24)",
  "/api/cron/assess": "systemd timer (lernomi-cron-assess, her gün 04:15 UTC)",
  "/api/cron/alerts": "systemd timer (lernomi-cron-alerts, 10 dakikada bir) — uyarı motoru",
  "/api/cron/lifetime": "systemd timer (lernomi-cron-lifetime, saatte bir; /opt/lernomi/lifetime-job.sh, tur bitince kendini kapatır) — ömür boyu Premium, test kullanıcıları",
  "/api/premium/webhook/[[...provider]]": "mağaza (Play/RevenueCat) sunucudan sunucuya çağırıyor",
};

/** Bütün uç yolları. */
function routes(dir = path.join(ROOT, "src", "app", "api"), out = []) {
  for (const entry of fs.readdirSync(dir)) {
    const p = path.join(dir, entry);
    if (fs.statSync(p).isDirectory()) routes(p, out);
    else if (entry === "route.ts") {
      out.push("/" + path.relative(path.join(ROOT, "src", "app"), dir).split(path.sep).join("/"));
    }
  }
  return out;
}

/**
 * Kaynak dosyaları. İki şey hariç: uç dosyalarının KENDİSİ (uç kendini
 * çağırmış sayılmaz) ve BU BETİK (`ALLOW` listesindeki yollar kaynakta
 * geçtiği için her ucu "çağrılıyor" yapardı).
 */
/*
 * UÇ DOSYASININ YOLU ÇAĞIRAN DEĞİLDİR.
 *
 * `src/app/api/cron/summary/route.ts` dizgisi `/api/cron/summary` önekini
 * İÇERİYOR; yani bir kapının o dosyayı `read()` etmesi, uç çağrılıyormuş gibi
 * görünüyordu. 2026-09-12'de tam bu oldu: `check:parity` 274 özet cron'unun
 * gövdesini okumaya başladı ve `check:endpoints` "listede olup artık çağrılan
 * uç" dedi — oysa çağıran hâlâ systemd timer'ı.
 *
 * Yol biçimi taramadan ÖNCE düşürülüyor. Gerçek çağıran `fetch("/api/…")`
 * yazıyor ve ondan etkilenmiyor; ölçü zayıflamıyor.
 */
const ROUTE_PATH = /\b(?:mobile\/)?src\/app\/api\/[\w[\]./-]*route\.ts\b/g;

/*
 * UÇ YOLUNU GÜNLÜKTE ARAYAN KOD DA ÇAĞIRAN DEĞİLDİR (2026-10-02).
 *
 * Uyarı motoru (`lib/alerts`) nginx erişim günlüğünü okuyup yola göre sayıyor
 * (`r.path.startsWith("/api/premium/webhook")`): mağaza bildirimleri düşüyor
 * mu, hesap silme 5xx veriyor mu. Bu bir İZLEME, çağrı değil; tarama onu
 * çağıran sayınca mağazanın çağırdığı webhook ucu "web çağırıyor" görünüp
 * CI'yı düşürdü. Bu dosyalar taramaya girmiyor; ölçü zayıflamıyor çünkü
 * içlerinde `fetch` yok (dosya değişip `fetch` eklenirse aşağıda hata).
 */
const LOG_READERS = new Set([
  "src/lib/alerts.ts",
  "scripts/test-admin.ts", // uyarı motorunun testi: sahte günlük satırları, çağrı yok
]);

function sources(dirs, out = []) {
  for (const d of dirs) {
    const abs = path.join(ROOT, d);
    if (!fs.existsSync(abs)) continue;
    const walk = (dir) => {
      for (const entry of fs.readdirSync(dir)) {
        const p = path.join(dir, entry);
        if (entry === "node_modules") continue;
        if (fs.statSync(p).isDirectory()) walk(p);
        else if (
          /\.(ts|tsx|js|mjs)$/.test(entry) &&
          !(p.includes(`${path.sep}api${path.sep}`) && entry === "route.ts") &&
          p !== fileURLToPath(import.meta.url)
        ) {
          const rel = path.relative(ROOT, p).split(path.sep).join("/");
          if (LOG_READERS.has(rel)) {
            if (/\bfetch\(/.test(fs.readFileSync(p, "utf8"))) throw new Error(`${rel}: günlük okuyucu listesinde ama fetch çağırıyor; listeden çıkar`);
            continue;
          }
          /* YORUMLAR ATILIYOR. Uç yolları yorumlarda da geçiyor (ör. `/api/stt`
             kendi yorumunda `/api/premium/consume`a atıf yapıyor) ve yorumdaki
             bir atıf çağıran DEĞİL. Yorumlar sayılırsa denetim her ucu
             "çağrılıyor" sanar ve hiçbir şey söylemez. */
          out.push(
            fs
              .readFileSync(p, "utf8")
              .replace(/\/\*[\s\S]*?\*\//g, " ")
              .replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1")
              .replace(ROUTE_PATH, " "),
          );
        }
      }
    };
    walk(abs);
  }
  return out;
}

/**
 * WEB CAGIRIYOR AMA MOBIL CAGIRMIYOR — sebebiyle.
 *
 * `ALLOW` "her ucun BIR cagirani var mi" diye soruyor; bu liste onun parite
 * hâli: "her ucun IKI cagirani var mi". Bir uc yalniz webden cagriliyorsa ya
 * bunun bir sebebi vardir (yonetim panosu, cron, magaza, tarayiciya ozel
 * tasima) ya da Android'de o yuzey HIC YOK - ve ikincisi sessizce oluyor.
 * Olculdugunde iki gercek ornek cikti: `/api/errors` (zayif noktalar karti,
 * web-parity 11.135'te kapatildi) ve `/api/growth` (asagida).
 *
 * Liste yalniz KISALABILIR: bir ucu buraya eklemek, mobilde karsiligi
 * olmadigini BELGELEMEKTIR.
 */
/* YONTEM DUZEYINDE. Ayni ucun bir YONTEMI tek platformda kalabiliyor ve bu,
   ucun tamamen tek platformda kalmasi kadar sessiz: `GET /api/skills` webde
   okunuyordu, mobilde okunmuyordu ve Android'de beceri ilerlemesi cihaza
   hapsolmustu (web-parity 11.144). Yol duzeyindeki liste bunu goremedi cunku
   mobil ayni yolu POST icin zaten aniyordu. */
const WEB_ONLY_METHOD = {
  "DELETE /api/push/subscribe": "TARAYICI push aboneligi; mobil FCM (/api/push/device)",
  "PUT /api/push/subscribe": "TARAYICI push aboneligi",
  "POST /api/push/subscribe": "TARAYICI push aboneligi",
  "POST /api/session": "tur ORTASI ilerleme damgasi; mobil ilerlemeyi cevaplarla birlikte /api/answers'a yaziyor",
  "GET /api/premium/referral": "mobil ayni kodu /api/premium/status icinden aliyor",
  "POST /api/admin/legal": "yonetim panosu",
  "POST /api/admin/premium": "yonetim panosu",
  "POST /api/admin/moderation": "yonetim panosu",
  "GET /api/admin/moderation/export": "yonetim panosu (icerik geri bildirimi CSV'si)",
  "POST /api/admin/app": "yonetim panosu",
  "POST /api/admin/avatar": "yonetim panosu (avatar envanteri)",
  "POST /api/admin/social": "yonetim panosu (sosyal medya takvimi)",
  "POST /api/admin/users": "yonetim panosu",
  "POST /api/admin/content": "yonetim panosu",
};

const WEB_ONLY = {
  "/api/admin/legal": "yonetim panosu — mobilde yok, olmayacak",
  "/api/admin/premium": "yonetim panosu — mobilde yok, olmayacak",
  "/api/admin/moderation": "yonetim panosu — mobilde yok, olmayacak",
  "/api/admin/moderation/export": "yonetim panosu CSV'si — mobilde yok, olmayacak",
  "/api/admin/app": "yonetim panosu — mobilde yok, olmayacak",
  "/api/admin/avatar": "yonetim panosu (avatar envanteri) — mobilde yok, olmayacak",
  "/api/admin/social": "yonetim panosu (sosyal medya takvimi) — mobilde yok, olmayacak",
  "/api/admin/users": "yonetim panosu — mobilde yok, olmayacak",
  "/api/admin/content": "yonetim panosu — mobilde yok, olmayacak",
  "/api/push/subscribe": "TARAYICI push aboneligi; mobil FCM ile /api/push/device cagiriyor",
};

/**
 * MOBIL CAGIRIYOR AMA WEB CAGIRMIYOR — sebebiyle.
 *
 * `WEB_ONLY`in AYNA YARISI ve BASTAN BERI EKSIKTI: olcum yalnizca bir yone
 * bakiyordu. Oysa sorunun ters yonu de aynı derecede sessiz - mobilde bir
 * yuzey var, webde hic yok ve kimse fark etmiyor. Android bu projede en
 * ileride olan taraf, yani asimetrinin PAHALI yonu tam olarak bu.
 *
 * Bugunku kayitlarin hepsi ayni sebebin turevi: web sayfayi SUNUCUDA ciziyor
 * ve veriyi kendi sunucu modulunden dogrudan okuyor (`lib/immersion/build`,
 * `lib/session`, `lib/premium/access` gibi); mobil ayni veriyi HTTP ile
 * almak zorunda. Yani bunlar "webde eksik yuzey" degil, tasima farki.
 *
 * Liste yalniz KISALABILIR: bir ucu buraya eklemek, webde karsiligi
 * olmadigini BELGELEMEKTIR.
 */
const MOBIL_ONLY = {
  "/api/avatar/items": "avatar kilitleri; web ayni bilgiyi sayfa sunucusunda okuyor (profile/avatar/page, lockedAvatarParts)",
  "/api/account/apple-code": "Apple girisinin native kod takasi; webde akis tarayicida tamamlaniyor",
  "/api/account/guest": "misafir verisini silme; misafir modu yalniz mobilde, web hesap istiyor (magaza on inceleme B24)",
  "/api/account/guest/claim": "misafirin ilerlemesini hesaba birlestirme; misafir modu yalniz mobilde",
  "/api/handoff-nonce": "tarayicidan uygulamaya giris devrinin cihaz degeri; devri yalniz uygulama baslatiyor, webin devredecegi bir uygulama yok",
  "/api/immersion": "unite verisi; web sayfayi sunucuda cizip `lib/immersion/build`i dogrudan cagiriyor",
  "/api/me": "oturum ozeti; web sunucu tarafinda `lib/session` ile okuyor",
  "/api/skills/access": "Beceriler kilit gorunumu; web sayfayi sunucuda cizip `lib/premium/skill-access`i dogrudan cagiriyor",
  "/api/premium/status": "premium durumu; web sunucu tarafinda `lib/premium/access` ile okuyor",
  "/api/push/device": "FCM cihaz jetonu; tarayicida karsiligi /api/push/subscribe",
  "/api/turnstile": "site anahtari; web onu sunucuda cizilen sayfaya gomuyor",
  "/api/premium/trial-code": "grup kodu (2 ay magaza denemesi) YALNIZ Android uygulamasinda uygulaniyor; web karsilama sayfasi (`app/g/[code]`) `peekStoreTrialCode`u sunucuda cagiriyor, iOS yonlendirmesi `app/g/[code]/ios`ta (App Store 3.1.1)",
  /* Önceden `/api/words/...` alt uçlarının web çağrıları bu ucu da "webde
     çağrılıyor" gösteriyordu (alt dizi eşleşmesi); tam yol aranınca göründü. */
  "/api/words": "kelime listesi; web sayfayi sunucuda ciziyor",
  /* Icerik teslim hatti (F0): web ayni icerigi HTTP'siz okuyor
     (`lib/content/read` `readItem`), cunku sayfa zaten sunucuda ciziliyor.
     Mobilin sunucusu yok; ayni icerigi bu uclardan aliyor. */
  "/api/content/pointer": "icerik gostergesi; web `lib/content/read` `pointer`i sunucuda cagiriyor",
  "/api/content/manifest": "paket deltasi; webin cihaz onbellegi yok, icerigi dogrudan okuyor",
  "/api/content/i": "icerik govdesi; web `lib/content/read` `readItem` ile dogrudan okuyor",
  /* 2026-09-27 (Samet): ekran acikken ses sunucuya gitmiyor. Web bu uca
     gelmiyor (tarayicinin tanıyıcısı); uc yalniz mobilde ekran kapali yuruyus. */
  "/api/stt": "sunucu ses tanimasi YALNIZ mobilde ekran kapali yuruyus (`mode=walk`); web tarayicinin tanıyıcısını kullaniyor, ekran acikken ses gondermiyor",
};

const MOBIL_ONLY_METHOD = {
  /* Mobil JS'te cagri `Native.uploadStt(url, …)`: yontem native tarafta (POST),
     JS kaynaginda `method:` olmadigi icin GET gorunuyor. */
  "GET /api/stt": "ekran kapali yuruyusun sesi native uploadStt ile POST gidiyor (JS'te yontemsiz, GET sayiliyor); web ekran acikken ses gondermiyor",
  "POST /api/account/apple-code": "native Apple kod takasi",
  "DELETE /api/account/guest": "misafir verisini silme (yalniz mobil misafir modu)",
  "GET /api/avatar/items": "avatar kilitleri; web ayni bilgiyi sayfa sunucusunda okuyor (profile/avatar/page, lockedAvatarParts), istemci istegi yok",
  "POST /api/account/guest/claim": "misafiri hesaba birlestirme (yalniz mobil misafir modu)",
  "GET /api/immersion": "web `lib/immersion/build`i sunucuda cagiriyor",
  "GET /api/me": "web `lib/session`i sunucuda cagiriyor",
  "GET /api/level": "seviye hazirligi; web `lib/level-readiness`i Ogren sayfasinin sunucusunda cagiriyor (learn/page)",
  "GET /api/skills/access": "web `lib/premium/skill-access`i sunucuda cagiriyor",
  "GET /api/premium/status": "web `lib/premium/access`i sunucuda cagiriyor",
  "GET /api/premium/trial-code": "grup kodu on bakisi; web `/g/[code]` sayfasi `peekStoreTrialCode`u sunucuda cagiriyor",
  "POST /api/premium/trial-code": "grup kodu talebi yalniz Android uygulamasinda (Play teklifi); web satmiyor, iOS 3.1.1 geregi web yonlendirmesinden gidiyor",
  "POST /api/premium/referral": "davet bagi; web `/r/[code]` rotasinda `attachReferral`i SUNUCUDA cagiriyor (sayfa zaten sunucuda, istemciye gidip gelmesi gereksiz). Mobilde sunucu yok, uc cagriliyor.",
  "POST /api/push/device": "FCM cihaz jetonu",
  "DELETE /api/push/device": "FCM cihaz jetonu",
  "GET /api/turnstile": "site anahtari sunucuda gomuluyor",
  "GET /api/mock-exam": "kagit katalogu; web paketi sunucuda ice aliyor (`lib/mock-exams`)",
  "GET /api/placement": "yerlestirme sorulari; web paketi sunucuda ice aliyor",
  "GET /api/words": "kelime listesi; web sayfayi sunucuda ciziyor",
  "GET /api/content/pointer": "web `lib/content/read` `pointer`i sunucuda cagiriyor",
  "GET /api/content/manifest": "webin cihaz onbellegi yok; delta yalniz mobil icin",
  "GET /api/content/i": "web govdeyi `readItem` ile sunucuda cozuyor",
};

const all = routes().sort();
const src = sources(["src", "scripts", "mobile/src", "mobile/scripts"]);
/* Dinamik parça (`[id]`) çağıranda değişken olarak duruyor: önek aranıyor. */
const prefix = (api) => api.replace(/\/\[[^\]]+\].*$/, "");
/* Dinamik parçası OLMAYAN uç tam yol olarak aranıyor: `/api/immersion`,
   `/api/immersion/item` çağrısının içinde alt dizi olarak geçiyor ve alt uç
   webde çağrılınca üst uç da "webde çağrılıyor" sayılıyordu. */
const kacir = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const callRe = (api) => new RegExp(kacir(prefix(api)) + (prefix(api) === api ? "(?![\\w/-])" : ""));
const has = (t, api) => callRe(api).test(t);
const called = (api) => src.some((t) => has(t, api));

const orphans = all.filter((a) => !called(a));
const undocumented = orphans.filter((a) => !ALLOW[a]);
const stale = Object.keys(ALLOW).filter((a) => !orphans.includes(a));

/* Web kaynagi ile mobil kaynagi AYRI okunuyor: "iki cagiran" sorusu ancak
   boyle sorulabiliyor. */
const webSrc = sources(["src"]);
const mobSrc = sources(["mobile/src"]);
const calledIn = (list, api) => list.some((t) => has(t, api));
const webOnly = all.filter((a) => calledIn(webSrc, a) && !calledIn(mobSrc, a));
const webOnlyUndoc = webOnly.filter((a) => !WEB_ONLY[prefix(a)] && !WEB_ONLY[a]);
const webOnlyStale = Object.keys(WEB_ONLY).filter((a) => !webOnly.some((x) => prefix(x) === a || x === a));
const mobOnly = all.filter((a) => calledIn(mobSrc, a) && !calledIn(webSrc, a));
const mobOnlyUndoc = mobOnly.filter((a) => !MOBIL_ONLY[prefix(a)] && !MOBIL_ONLY[a]);
const mobOnlyStale = Object.keys(MOBIL_ONLY).filter((a) => !mobOnly.some((x) => prefix(x) === a || x === a));

/* Cagri yerindeki YONTEM: `method: "X"` varsa o, yoksa GET. Pencere cagri
   ifadesinin sonunda kesiliyor - iki komsu cagri (once GET, sonra POST) ayni
   pencereye girip birbirinin yontemini gölgelemesin. */
function yontemler(text, yol) {
  const out = new Set();
  let i = 0;
  while ((i = text.indexOf(yol, i)) >= 0) {
    let son = text.length;
    for (const t of [";", "\n\n"]) { const j = text.indexOf(t, i); if (j >= 0 && j < son) son = j; }
    const w = text.slice(i, Math.min(son, i + 400));
    const m = w.match(/method:\s*"(GET|POST|PATCH|PUT|DELETE)"/);
    out.add(m ? m[1] : "GET");
    i += yol.length;
  }
  return out;
}
const routeMethods = (f) =>
  [...fs.readFileSync(f, "utf8").matchAll(/export async function (GET|POST|PATCH|PUT|DELETE)/g)].map((m) => m[1]);

const yontemSatirlari = [];
const yontemSatirlariMobil = [];
for (const ep of all) {
  const dosya = path.join(ROOT, "src", "app", ep, "route.ts");
  if (!fs.existsSync(dosya)) continue;
  const p = prefix(ep);
  for (const m of routeMethods(dosya)) {
    if (yontemler(webSrc.join("\n"), p).has(m) && !yontemler(mobSrc.join("\n"), p).has(m)) {
      yontemSatirlari.push(`${m} ${p}`);
    }
    if (yontemler(mobSrc.join("\n"), p).has(m) && !yontemler(webSrc.join("\n"), p).has(m)) {
      yontemSatirlariMobil.push(`${m} ${p}`);
    }
  }
}
const yontemUndoc = yontemSatirlari.filter((r) => !WEB_ONLY_METHOD[r]);
const yontemStale = Object.keys(WEB_ONLY_METHOD).filter((r) => !yontemSatirlari.includes(r));
const yontemMobUndoc = yontemSatirlariMobil.filter((r) => !MOBIL_ONLY_METHOD[r]);
const yontemMobStale = Object.keys(MOBIL_ONLY_METHOD).filter((r) => !yontemSatirlariMobil.includes(r));

const check = process.argv.includes("--check");
if (!check) {
  console.log(`${all.length} uç, ${orphans.length} tanesinin repoda çağıranı yok:\n`);
  for (const a of orphans) console.log(`  ${a}\n      ${ALLOW[a] ?? "SEBEP YAZILI DEĞİL"}`);
}

let bad = 0;
if (undocumented.length) {
  bad++;
  console.error("\nÇAĞIRANI OLMAYAN VE LİSTEDE YAZILI OLMAYAN UÇ:");
  for (const a of undocumented) console.error(`  ${a}`);
  console.error("\nUcu bir istemciye bağla ya da `ALLOW` listesine SEBEBİYLE ekle.");
}
if (stale.length) {
  bad++;
  console.error("\nLİSTEDE OLUP ARTIK ÇAĞRILAN UÇ (listeden çıkar):");
  for (const a of stale) console.error(`  ${a}`);
}
if (webOnlyUndoc.length) {
  bad++;
  console.error("\nYALNIZ WEBİN ÇAĞIRDIĞI UÇ (mobilde karşılığı yok):");
  for (const a of webOnlyUndoc) console.error(`  ${a}`);
  console.error("\nMobil istemciye bağla ya da `WEB_ONLY` listesine SEBEBİYLE ekle.");
}
if (yontemUndoc.length) {
  bad++;
  console.error("\nYALNIZ WEBİN ÇAĞIRDIĞI YÖNTEM (mobilde o yöntem yok):");
  for (const r of yontemUndoc) console.error(`  ${r}`);
  console.error("\nMobil istemciye bağla ya da `WEB_ONLY_METHOD` listesine SEBEBİYLE ekle.");
}
if (yontemStale.length) {
  bad++;
  console.error("\nWEB_ONLY_METHOD LİSTESİNDE OLUP ARTIK MOBİLDE DE ÇAĞRILAN YÖNTEM (listeden çıkar):");
  for (const r of yontemStale) console.error(`  ${r}`);
}
if (webOnlyStale.length) {
  bad++;
  console.error("\nWEB_ONLY LİSTESİNDE OLUP ARTIK MOBİLDE DE ÇAĞRILAN UÇ (listeden çıkar):");
  for (const a of webOnlyStale) console.error(`  ${a}`);
}
if (mobOnlyUndoc.length) {
  bad++;
  console.error("\nYALNIZ MOBİLİN ÇAĞIRDIĞI UÇ (webde karşılığı yok):");
  for (const a of mobOnlyUndoc) console.error(`  ${a}`);
  console.error("\nWeb istemciye bağla ya da `MOBIL_ONLY` listesine SEBEBİYLE ekle.");
}
if (mobOnlyStale.length) {
  bad++;
  console.error("\nMOBIL_ONLY LİSTESİNDE OLUP ARTIK WEBDE DE ÇAĞRILAN UÇ (listeden çıkar):");
  for (const a of mobOnlyStale) console.error(`  ${a}`);
}
if (yontemMobUndoc.length) {
  bad++;
  console.error("\nYALNIZ MOBİLİN ÇAĞIRDIĞI YÖNTEM (webde o yöntem yok):");
  for (const r of yontemMobUndoc) console.error(`  ${r}`);
  console.error("\nWeb istemciye bağla ya da `MOBIL_ONLY_METHOD` listesine SEBEBİYLE ekle.");
}
if (yontemMobStale.length) {
  bad++;
  console.error("\nMOBIL_ONLY_METHOD LİSTESİNDE OLUP ARTIK WEBDE DE ÇAĞRILAN YÖNTEM (listeden çıkar):");
  for (const r of yontemMobStale) console.error(`  ${r}`);
}
/* Sayilar cikisa yaziliyor: "tamam" tek basina taramanin CALISTIGINI
   soylemiyor - kumeler bosalsa da "belgesiz yok" dogru cikardi. */
if (!bad)
  console.log(
    check
      ? `tamam: ${all.length} uç, ${orphans.length} belgelenmiş çağıransız, ` +
        `${webOnly.length} yalnız web (${yontemSatirlari.length} yöntem), ` +
        `${mobOnly.length} yalnız mobil (${yontemSatirlariMobil.length} yöntem)`
      : "\nHEPSİ YAZILI\n",
  );
process.exit(bad ? 1 : 0);
