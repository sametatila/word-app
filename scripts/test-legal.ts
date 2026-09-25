import { existsSync, readFileSync } from "node:fs";
import { PRIVACY_DEFAULT } from "@/content/legal/defaults/privacy";
import { TERMS_DEFAULT } from "@/content/legal/defaults/terms";
import { SUPPORT_DEFAULT } from "@/content/legal/defaults/support";
import type { LegalDocDefault } from "@/content/legal/defaults/types";
import { safeHref, unbalancedConditionals, unknownTokens } from "@/lib/legal/markdown";
import { SPEECH_LOG_RETENTION_DAYS } from "@/lib/conversations/log-const";
import { SESSION_MAX_DAYS } from "@/lib/auth/session-config";
import { ATTESTATION_RETENTION_DAYS } from "@/lib/auth/attestation-const";
import { DAILY_QUOTAS } from "@/lib/quotas";
import {
  LEGAL_CHANGELOG,
  LEGAL_ENTITY,
  LEGAL_EFFECTIVE_DATE,
  LEGAL_LOCALES,
  LEGAL_PATHS,
  LEGAL_VERSION,
  LEGAL_VOCAB,
  ALL_PROCESSORS,
  FAIR_USE,
  processorRow,
  type LegalDoc,
} from "@/lib/legal";
import { AI_CONSENT_FINGERPRINT, AI_CONSENT_PURPOSES, AI_CONSENT_VERSIONS } from "@/lib/ai-consent-shared";
import { aiConsentFingerprintOf, aiConsentProcessorList } from "@/lib/ai-consent";
import { trBase } from "@/i18n/base/tr";
import { enBase } from "@/i18n/base/en";
import { deBase } from "@/i18n/base/de";
import { trWeb } from "@/i18n/web/tr";
import { enWeb } from "@/i18n/web/en";
import { deWeb } from "@/i18n/web/de";

/**
 * HUKUKİ METİNLERİN KAPISI — veritabanı istemez, saniye sürer.
 *
 * Buradaki hata sınıfının ortak yanı SESSİZ olması: yanlış bir sürüm numarası,
 * çevrilmemiş bir kayıt ya da tabloda boş kalan bir hücre derlemeyi kırmaz,
 * testi kırmaz, ancak yayımlanmış metni okuyan biri fark eder — yani en kötü
 * yerde. Bugün üçü birden gerçekten oldu:
 *
 *   - `LEGAL_VERSION` elle iki ayrı yerde artırılıyor (sabit + kaydın kendi
 *     `version` alanı) ve dosyanın kendi yorumu "aynı olmak zorundadır" diyor.
 *     Zorunluluğu yazan bir cümle vardı, kontrol eden bir şey yoktu.
 *   - `llmRouting` amacı OpenRouter satırıyla birlikte ölmüştü ve arkada kaldı.
 *   - `LEGAL_PATHS`e yeni bir yol eklenip sayfası unutulursa bağlantı 404 verir;
 *     üstelik o yollardan biri App Store'un Support URL alanına giriyor.
 */
let fails = 0;
const check = (name: string, ok: boolean, detail = "") => {
  console.log(`  ${ok ? "✓" : "✗"} ${name}${ok || !detail ? "" : ` — ${detail}`}`);
  if (!ok) fails++;
};

console.log("\nSürüm");
const head = LEGAL_CHANGELOG[0];
check("sürüm sabiti en yeni kayıtla aynı", LEGAL_VERSION === head.version, `${LEGAL_VERSION} ≠ ${head.version}`);
check("yürürlük tarihi en yeni kayıtla aynı", LEGAL_EFFECTIVE_DATE === head.date, `${LEGAL_EFFECTIVE_DATE} ≠ ${head.date}`);
check("tarihler ISO biçiminde", LEGAL_CHANGELOG.every((e) => /^\d{4}-\d{2}-\d{2}$/.test(e.date)));
check(
  "sürümler yeniden eskiye sıralı",
  LEGAL_CHANGELOG.every((e, i) => i === 0 || LEGAL_CHANGELOG[i - 1].date >= e.date),
);

console.log("\nSürüm geçmişi");
for (const entry of LEGAL_CHANGELOG) {
  for (const locale of LEGAL_LOCALES) {
    const lines = entry.changes[locale];
    check(
      `${entry.version} · ${locale}: kayıt dolu`,
      Array.isArray(lines) && lines.length > 0 && lines.every((l) => l.trim().length > 0),
    );
  }
  // Diller arasında madde sayısı da eşit olmalı: bir dile madde eklenip
  // ötekine eklenmemesi, çeviri eksiğinin en sık görülen biçimi.
  const counts = LEGAL_LOCALES.map((l) => entry.changes[l].length);
  check(`${entry.version}: üç dilde aynı sayıda madde`, new Set(counts).size === 1, counts.join(" / "));
}

console.log("\nYollar");
for (const [doc, path] of Object.entries(LEGAL_PATHS) as [LegalDoc, string][]) {
  // Yolun karşılığı bir sayfa dosyası olmalı. `/account/delete` gibi çok
  // parçalı yollar da doğrudan eşleşiyor; dinamik segment kullanılmıyor.
  check(`${doc} → ${path} sayfası var`, existsSync(`src/app${path}/page.tsx`));
}

console.log("\nAlıcılar tablosu");
for (const p of ALL_PROCESSORS) {
  for (const locale of LEGAL_LOCALES) {
    const row = processorRow(p, locale);
    const empty = Object.entries(row)
      .filter(([, v]) => !v || !v.trim())
      .map(([k]) => k);
    check(`${p.name} · ${locale}: hücreler dolu`, empty.length === 0, empty.join(", "));
  }
}

console.log("\nSözlükte ölü anahtar");
/*
  `Set<string>` OLARAK yazılı: alanların eleman tipleri farklı olduğu için
  `used[group]` bir Set BİRLEŞİMİ oluyor ve `has()`in parametresi `never`e
  daralıyordu (tsc: "Argument of type 'string' is not assignable to 'never'").
*/
const used: Record<string, Set<string>> = {
  purposes: new Set(ALL_PROCESSORS.map((p) => p.purpose)),
  dataKinds: new Set(ALL_PROCESSORS.map((p) => p.data)),
  regions: new Set(ALL_PROCESSORS.map((p) => p.region)),
  safeguards: new Set(ALL_PROCESSORS.map((p) => p.safeguard)),
  // `always` sözlükte varsayılan: `when` yazılmayan her satır onu kullanıyor,
  // dolayısıyla hiçbir satırda adı geçmese bile ölü değil.
  occasions: new Set([...ALL_PROCESSORS.map((p) => p.when ?? "always"), "always"]),
};
for (const [group, keys] of Object.entries(LEGAL_VOCAB) as [keyof typeof used, readonly string[]][]) {
  const dead = keys.filter((k) => !used[group].has(k));
  check(`${group}: kullanılmayan anahtar yok`, dead.length === 0, dead.join(", "));
}

console.log("\nBelgelerin varsayılan metni");
const DOCS: Record<string, Record<string, LegalDocDefault>> = {
  privacy: PRIVACY_DEFAULT,
  terms: TERMS_DEFAULT,
  support: SUPPORT_DEFAULT,
};
for (const [doc, byLocale] of Object.entries(DOCS)) {
  for (const locale of LEGAL_LOCALES) {
    const d = byLocale[locale];
    const where = `${doc} · ${locale}`;
    check(`${where}: başlık ve gövde dolu`, Boolean(d?.title?.trim() && d?.body?.trim()));
    if (!d) continue;
    const unknown = unknownTokens(d.body);
    // Kapalı sözlük: yazım hatası olan bir belirteç sayfada ham {{...}} olarak
    // görünür. Panelde kaydetme bunu reddediyor; varsayılan metin panelden
    // geçmediği için kapı burada.
    check(`${where}: belirteçlerin hepsi tanınıyor`, unknown.length === 0, unknown.join(", "));
    check(`${where}: {{ifIos}} dengeli`, !unbalancedConditionals(d.body));
    check(`${where}: en az bir bölüm başlığı var`, d.body.includes("## "));
    // Blok belirteçleri kendi satırlarında olmalı, yoksa paragrafa düşer ve
    // sayfada ham metin olarak görünür.
    const inlineBlock = d.body
      .split("\n")
      .some((l) => /\{\{(processorsTable|entityBlock:)/.test(l) && l.trim() !== l.trim().match(/^\{\{[^}]+\}\}$/)?.[0]);
    check(`${where}: blok belirteçleri kendi satırında`, !inlineBlock);
  }
}

/**
 * SAKLAMA SÜRELERİ: POLİTİKANIN SÖZÜ İLE KODUN DAVRANIŞI.
 *
 * Politika üç dilde "sohbet kayıtları N gün, sonra kendiliğinden
 * silinir" ve "oturum süresince, en çok N gün" diyor. Bu iki cümle bir
 * taahhüt: sayfa Play Console ve App Store Connect'e URL olarak verilmiş
 * durumda. Sayı metnin içine düz yazıldığı sürece kuralı uygulayan sabit
 * değişip metin eski sözü söylemeye devam edebilirdi — ve kimse fark etmezdi,
 * çünkü ne derleme ne test bir metnin içindeki rakamı okur.
 *
 * Ölçüt MUTLAK, karşılaştırmalı değil: metin belirteci kullanmalı ve o
 * belirtecin değeri kuralı uygulayan sabitten gelmeli. "İki taraf da aynı
 * sayıyı yazıyor mu" diye sormak yetmez — ikisi birlikte yanlış olabilir.
 */
console.log("\nSaklama süreleri");
{
  /*
   * Her söz KENDI KONUSUYLA birlikte tanımlı. İlk yazımda belirtecin metinde
   * geçip geçmediği GÖVDE düzeyinde soruluyordu (`body.includes`) — oysa söz
   * SATIR düzeyinde veriliyor: tablo satırındaki belirteç, listedeki cümlenin
   * düz sayıya dönmesini örtüyordu. Ölçüm, ölçtüğünü sandığı şeyin komşusunu
   * ölçüyordu; kapı şimdi konuya uyan HER satırı ayrı ayrı okuyor.
   */
  const PROMISES = [
    {
      token: "speechLogDays",
      value: SPEECH_LOG_RETENTION_DAYS,
      label: "sohbet kaydı",
      topic: /sohbet kayıt|chat log|Chat-Protokoll/i,
    },
    {
      token: "sessionMaxDays",
      value: SESSION_MAX_DAYS,
      label: "oturum kaydı",
      topic: /oturum süresince|oturum kayıtları|oturum çerezi|life of the session|session records|session cookie|Dauer der Sitzung|Sitzungsdatensätze|Sitzungs-Cookie/i,
    },
    {
      /* Tablo satırı ve §9 listesi; süpürme `purgeExpiredGuestAttestations`. */
      token: "attestationDays",
      value: ATTESTATION_RETENTION_DAYS,
      label: "cihaz doğrulaması",
      topic: /cihaz bütünlüğü (kontrolü|sonucu)|device integrity (check|result)|Geräteintegritätsprüfung/i,
    },
  ];

  /*
   * "N gün" taraması yalnız konuya uyan satırlarda. Metnin tamamında aramak
   * YANLIŞ olurdu ve ilk yazımda öyleydi: üç dilde birden "talepler en geç 30
   * gün içinde sonuçlandırılır" cümlesine takıldı. O otuz gün KANUNDAN geliyor
   * (KVKK m.13, GDPR m.12(3)) ve uygulamanın bir sabitine bağlı değil;
   * belirtece çevrilseydi kodun sayısını değiştirmek kanuni süreyi de
   * değiştirir görünürdü.
   */
  const PLAIN_DAYS = /(\d+)\s*(gün|days|Tage)/g;

  for (const { token, value, label, topic } of PROMISES) {
    check(
      `${label}: belirtecin değeri sabitten geliyor`,
      LEGAL_ENTITY[token as keyof typeof LEGAL_ENTITY] === String(value),
      `${LEGAL_ENTITY[token as keyof typeof LEGAL_ENTITY]} ≠ ${value}`,
    );
    for (const locale of LEGAL_LOCALES) {
      const lines = (PRIVACY_DEFAULT[locale]?.body ?? "").split("\n").filter((l) => topic.test(l));
      check(`${label} · ${locale}: sözü taşıyan satır bulundu`, lines.length > 0);
      const withoutToken = lines.filter((l) => !l.includes(`{{${token}}}`));
      check(
        `${label} · ${locale}: her satır belirteci kullanıyor`,
        withoutToken.length === 0,
        withoutToken.map((l) => l.slice(0, 60)).join(" | "),
      );
      const plain = lines.flatMap((l) => [...l.matchAll(PLAIN_DAYS)].map((m) => m[0]));
      check(`${label} · ${locale}: satırda düz sayı kalmadı`, plain.length === 0, plain.join(", "));
    }
  }
}

/**
 * ADİL KULLANIM: METİNDEKİ SINIR İLE UCUN UYGULADIĞI SINIR.
 *
 * `FAIR_USE` tablosu dört uç dosyasındaki yerel sabitlerin ELLE tutulmuş
 * kopyasıydı — tablonun kendi yorumu bile "route dosyalarındaki sabitler"
 * diyordu, yani zorunluluğu yazan bir cümle vardı, ölçen bir şey yoktu.
 * Kullanıcı için sonucu şu olurdu: şartlar sayfası bir sınır söyler, uç
 * başkasını uygular ve 429 metinde yazandan önce gelir.
 *
 * Kaynak artık `lib/quotas`; uçlar oradan okuyor ve `FAIR_USE` oradan
 * türetiliyor. Kapı iki şeyi soruyor: tablo kaynakla aynı mı (türetme
 * bozulduysa görünür) ve her uç sayıyı kaynaktan mı okuyor.
 */
console.log("\nAdil kullanım");
{
  const ENDPOINTS: { path: string; field: keyof typeof DAILY_QUOTAS }[] = [
    { path: "src/app/api/chat/route.ts", field: "chatTurns" },
    { path: "src/app/api/stt/route.ts", field: "sttRequests" },
    { path: "src/app/api/pronounce/route.ts", field: "pronounceRequests" },
    { path: "src/app/api/reports/route.ts", field: "reports" },
  ];
  const PAIRS: [keyof typeof FAIR_USE, keyof typeof DAILY_QUOTAS][] = [
    ["chatTurnsPerDay", "chatTurns"],
    ["sttRequestsPerDay", "sttRequests"],
    ["pronounceRequestsPerDay", "pronounceRequests"],
    ["reportsPerDay", "reports"],
  ];
  for (const [legalKey, quotaKey] of PAIRS) {
    check(
      `${legalKey}: tablo kaynakla aynı`,
      FAIR_USE[legalKey] === DAILY_QUOTAS[quotaKey],
      `${FAIR_USE[legalKey]} ≠ ${DAILY_QUOTAS[quotaKey]}`,
    );
  }
  /* Tablonun alan kümesi de kaynakla eşleşmeli: kaynağa yeni bir kota eklenip
     tabloya eklenmezse metin o sınırı hiç söylemez. */
  check(
    "tablo ile kaynak aynı sayıda alan taşıyor",
    Object.keys(FAIR_USE).length === Object.keys(DAILY_QUOTAS).length,
    `${Object.keys(FAIR_USE).length} ≠ ${Object.keys(DAILY_QUOTAS).length}`,
  );
  for (const { path, field } of ENDPOINTS) {
    const src = existsSync(path) ? readFileSync(path, "utf8") : "";
    /* Ad, üst dizinle birlikte: dördü de "route.ts" olursa çıktı hangi ucun
       düştüğünü söylemez. */
    const name = path.split("/").slice(-2).join("/");
    check(`${name}: dosya var`, src.length > 0);
    /* Yorumlar ayıklanır: gerekçe metnindeki ad "okuyor" sayılmasın. */
    const code = src.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    check(`${name}: sınırı kaynaktan okuyor`, new RegExp(`DAILY_QUOTAS\\.${field}\\b`).test(code));
    /* Ve elle yazılmış bir sayıya geri dönmemiş: sınırın SAYISI dosyada
       kalmamalı. Mutlak ölçüt; "iki taraf aynı mı" diye sormak yetmez. */
    /* Sabitin ADI uçtan uca aynı değil (`ROLEPLAY_DAILY_LIMIT` da var), o
       yüzden kalıp ada değil BİÇİME bakıyor: herhangi bir `..._LIMIT = sayı`. */
    const plain = /[A-Z_]*LIMIT\s*=\s*\d/.test(code);
    check(`${name}: elle yazılmış sınır kalmadı`, !plain);
  }
}

console.log("\nYapay zekâ rızası");
/*
  RIZA BİR ALICI LİSTESİNE VERİLİYOR. Politikanın alıcılar tablosuna yeni bir
  dil modeli ya da konuşma tanıma sağlayıcısı eklenince, eski listeye verilmiş
  izin o yeni alıcıyı KAPSAMAZ; sürüm artmalı ve kullanıcıya yeniden
  sorulmalı ("outdated"). Parmak izi o bağı tutuyor: tablo değişip
  `AI_CONSENT_FINGERPRINT` değişmezse burası kırılır, onu değiştiren de
  `AI_CONSENT_VERSIONS`i artırmayı hatırlar.
*/
for (const purpose of AI_CONSENT_PURPOSES) {
  const actual = aiConsentFingerprintOf(purpose);
  check(
    `${purpose}: alıcı listesi rıza sürümünün parmak iziyle aynı (sürüm ${AI_CONSENT_VERSIONS[purpose]})`,
    actual === AI_CONSENT_FINGERPRINT[purpose],
    `"${actual}" ≠ "${AI_CONSENT_FINGERPRINT[purpose]}" — alıcı değiştiyse AI_CONSENT_VERSIONS.${purpose} artmalı ve parmak izi güncellenmeli`,
  );
  check(`${purpose}: rıza ekranında en az bir alıcı var`, aiConsentProcessorList(purpose).length > 0);
}

console.log("\nUygulama içi yollar");
/*
  METİN BİR YOL SÖYLÜYOR, UYGULAMA BAŞKA BİR YERDE.

  Hesap silme düğmesi 2026-09-09'da Ayarlar'dan Profil ekranının altına
  taşındı; gizlilik politikası, şartlar, destek sayfası, web silme sayfası ve
  iki mağazanın inceleme notları "Profil › Ayarlar › Hesap › Hesabı sil"
  demeye devam etti. İnceleme notları da yürüyüş modunu Beceriler sekmesinde
  gösteriyordu, giriş ise Öğren'deki kutucuk. İnceleyici notlardaki yolu izler;
  yolda düğme yoksa "hesap silme bulunamadı" (App Store 5.1.1(v)) yazar, Play
  de beyanla video ve uygulamanın uyuşmasını istiyor (mağaza raporu B13, B14).

  Yol ARAYÜZÜN KENDİ ETİKETLERİNDEN kuruluyor, elle yazılmıyor: bir etiket
  yeniden çevrilince ya da düğme başka bir gruba taşınınca burası kırılır.
*/
{
  const base = { tr: trBase, en: enBase, de: deBase } as const;
  const web = { tr: trWeb, en: enWeb, de: deWeb } as const;
  const deletePath = (l: (typeof LEGAL_LOCALES)[number]) =>
    [base[l]["profile.profile"], base[l]["settings.settings"], base[l]["settings.group_account"], base[l]["settings.delete_account"]].join(" › ");
  const walkPath = (l: (typeof LEGAL_LOCALES)[number]) => [base[l]["nav.learn"], base[l]["learn.walk_mode"]].join(" › ");
  const oldWalkPath = (l: (typeof LEGAL_LOCALES)[number]) => [base[l]["nav.skills"], base[l]["learn.walk_mode"]].join(" › ");

  for (const locale of LEGAL_LOCALES) {
    const path = deletePath(locale);
    for (const [name, doc] of [["gizlilik", PRIVACY_DEFAULT], ["şartlar", TERMS_DEFAULT], ["destek", SUPPORT_DEFAULT]] as const) {
      check(`${name} · ${locale}: hesap silme yolu arayüzle aynı ("${path}")`, doc[locale].body.includes(path));
    }
    check(`web silme sayfası · ${locale}: hesap silme yolu arayüzle aynı`, (web[locale]["del.in_app_path"] ?? "").includes(path));
  }

  // Yolun uygulamada gerçekten var olduğu: Profil → Ayarlar, Ayarlar'ın Hesap grubunda silme satırı.
  const settings = readFileSync("mobile/src/screens/SettingsScreen.tsx", "utf8");
  const groupAt = settings.indexOf('<Group title={t("settings.group_account")}');
  const accountGroup = groupAt < 0 ? "" : settings.slice(groupAt, settings.indexOf("</Group>", groupAt));
  check("uygulama: Ayarlar › Hesap grubunda hesap silme satırı var", accountGroup.includes('nav.navigate("DeleteAccount")'));
  check("uygulama: Profil ekranından Ayarlar açılıyor", readFileSync("mobile/src/screens/ProfileScreen.tsx", "utf8").includes('nav.navigate("Settings")'));
  check("uygulama: yürüyüş modu Öğren sekmesinden açılıyor", readFileSync("mobile/src/screens/LearnScreen.tsx", "utf8").includes('nav.navigate("Walk")'));

  /*
    MİSAFİR SİLME YOLU (mağaza ön inceleme B24). Hesapsız kullanımda "Hesabı sil"
    yok; politika, şartlar ve destek sayfası "Profil › Misafir verilerini sil"
    diyor. Yol yine arayüzün etiketlerinden kuruluyor ve düğmenin Profil'de
    gerçekten durduğu ölçülüyor.
  */
  const guestDeletePath = (l: (typeof LEGAL_LOCALES)[number]) => [base[l]["profile.profile"], base[l]["guest.delete_row"]].join(" › ");
  for (const locale of LEGAL_LOCALES) {
    const path = guestDeletePath(locale);
    check(`misafir silme etiketi · ${locale}: sözlükte var`, Boolean(base[locale]["guest.delete_row"]));
    for (const [name, doc] of [["gizlilik", PRIVACY_DEFAULT], ["şartlar", TERMS_DEFAULT], ["destek", SUPPORT_DEFAULT]] as const) {
      check(`${name} · ${locale}: misafir silme yolu arayüzle aynı ("${path}")`, doc[locale].body.includes(path));
    }
  }
  const profileScreen = readFileSync("mobile/src/screens/ProfileScreen.tsx", "utf8");
  check(
    "uygulama: Profil'de misafir silme satırı silme ekranını açıyor",
    /onPress=\{\(\) => nav\.navigate\("DeleteAccount"\)\} accessibilityLabel=\{t\("guest\.delete_row"\)\}/.test(profileScreen),
  );
  check("uygulama: silme ekranı misafiri siliyor", readFileSync("mobile/src/screens/DeleteAccountScreen.tsx", "utf8").includes("await deleteGuest()"));

  // İnceleme notları İngilizce (inceleyici onu okuyor), Console beyanı ve Veri Güvenliği notu Türkçe.
  const docs: { file: string; locale: (typeof LEGAL_LOCALES)[number] }[] = [
    { file: "docs/appstore/connect.md", locale: "en" },
    { file: "docs/play/console.md", locale: "en" },
    { file: "docs/play/console.md", locale: "tr" },
    { file: "docs/play/data-safety.md", locale: "tr" },
  ];
  for (const { file, locale } of docs) {
    const md = readFileSync(file, "utf8");
    check(`${file} · ${locale}: yürüyüş modu yolu "${walkPath(locale)}"`, md.includes(walkPath(locale)));
    check(`${file} · ${locale}: eski "${oldWalkPath(locale)}" yolu kalmadı`, !md.includes(oldWalkPath(locale)));
    check(`${file} · ${locale}: hesap silme yolu "${deletePath(locale)}"`, md.includes(deletePath(locale)));
  }
}

/* ── bağlantı adresi süzgeci (güvenlik denetimi 2026-09-14, #8) ─────────── */
{
  console.log("\nbağlantı adresi süzgeci");
  // Metinlerin bugün kullandığı her biçim geçmeli: süzgeç yayımlanmış bir
  // bağlantıyı düşürürse gizlilik politikası sessizce bağlantısız kalır.
  for (const ok of ["/privacy", "/tr/terms#silme", "#bolum", "https://play.google.com/x", "http://example.com", "mailto:support@example.com", "MAILTO:a@b.c"]) {
    check(`geçer: ${ok}`, safeHref(ok) === ok);
  }
  for (const bad of ["javascript:alert(1)", "JavaScript:alert(1)", " javascript:alert(1)", "jav\tascript:alert(1)", "java\nscript:x", "data:text/html,<script>", "vbscript:x", "//evil.example/x", "/\\evil.example", "privacy", "ftp://x", "https://a b"]) {
    check(`reddedilir: ${JSON.stringify(bad)}`, safeHref(bad) === null);
  }
  // Yayımlanmış metinlerdeki bütün düz bağlantılar süzgeçten geçiyor.
  const hrefs = [PRIVACY_DEFAULT, TERMS_DEFAULT, SUPPORT_DEFAULT]
    .flatMap((d) => Object.values(d).map((v) => JSON.stringify(v)))
    .flatMap((s) => [...s.matchAll(/\]\(([^)]+)\)/g)].map((m) => m[1]))
    .filter((h) => !h.startsWith("{{"));
  check("varsayılan metinlerde bağlantı bulundu", hrefs.length > 0, String(hrefs.length));
  const dusen = hrefs.filter((h) => safeHref(h) === null);
  check("varsayılan metinlerdeki hiçbir bağlantı düşmüyor", dusen.length === 0, dusen.join(", "));
}

console.log(fails === 0 ? `\ntamam: hepsi geçti` : `\nKALDI: ${fails}`);
process.exit(fails === 0 ? 0 : 1);
