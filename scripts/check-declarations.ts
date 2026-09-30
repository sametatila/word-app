/**
 * Veri beyanları kapısı — `npm run check:declarations`.
 *
 * Aynı gerçeği dört yer anlatıyor ve mağazalar bunları birbirine karşı okuyor:
 *
 *   mobile/ios/Lernomi/PrivacyInfo.xcprivacy   iOS gizlilik manifesti (Apple okuyor)
 *   docs/appstore/README.md                    Connect › App Privacy formunun kaydı
 *   docs/play/data-safety.md                   Play › Veri güvenliği formunun kaydı
 *   src/content/legal/defaults/privacy.ts      gizlilik politikası (üç dil)
 *   src/lib/legal PROCESSORS                   alıcılar tablosu (politikada basılıyor)
 *
 * Biri tek başına değişince beyan ile davranış (ya da iki beyan) çelişiyor ve
 * bu, 5.1.1 / 5.1.2 ve Play Kullanıcı Verileri reddinin klasik sebebi. Somut
 * örnek (2026-09-30): dil modeli sağlayıcısı değişti, Play belgesi eski
 * alıcıları saymaya devam edebilirdi; politika "konum toplanmaz" derken iOS
 * etiketi "Kaba konum" beyan ediyordu. Bu kapı ikisini de yakalıyor.
 *
 * EŞLEME TABLOSU (`MAP`) kapının tek bilgisi: hangi Apple türü hangi Play
 * satırına denk geliyor. Bir türün yalnız bir mağazada olması meşruysa
 * (`play: null`) gerekçesi satırında yazılı.
 */
import { readFileSync } from "node:fs";
import { PRIVACY_DEFAULT } from "@/content/legal/defaults/privacy";
import { aiConsentProcessorList } from "@/lib/ai-consent";

type Row = {
  /** `NSPrivacyCollectedDataType` son eki. */
  apple: string;
  /** App Store belgesindeki satırın başı (Kategori › Tür). */
  appleLabel: string;
  /** Play belgesindeki satırın başı; `null` = Play'de karşılığı yok (gerekçe `why`). */
  play: string | null;
  why?: string;
};

const MAP: Row[] = [
  { apple: "EmailAddress", appleLabel: "Contact Info › Email Address", play: "Kişisel bilgi › E-posta adresi" },
  { apple: "Name", appleLabel: "Contact Info › Name", play: "Kişisel bilgi › Ad" },
  { apple: "OtherUserContent", appleLabel: "User Content › Other User Content", play: "Mesajlar › Diğer uygulama içi mesajlar" },
  { apple: "UserID", appleLabel: "Identifiers › User ID", play: "Kişisel bilgi › Kullanıcı kimlikleri" },
  { apple: "DeviceID", appleLabel: "Identifiers › Device ID", play: "Cihaz veya diğer kimlikler" },
  { apple: "ProductInteraction", appleLabel: "Usage Data › Product Interaction", play: "Uygulama etkinliği › Uygulama içi etkileşimler" },
  { apple: "PurchaseHistory", appleLabel: "Purchases › Purchase History", play: "Finansal bilgi › Satın alma geçmişi" },
  { apple: "CrashData", appleLabel: "Diagnostics › Crash Data", play: "Uygulama bilgisi ve performans › Çökme günlükleri" },
  { apple: "OtherDiagnosticData", appleLabel: "Diagnostics › Other Diagnostic Data", play: "Uygulama bilgisi ve performans › Tanılama" },
  {
    apple: "CoarseLocation", appleLabel: "Location › Coarse Location", play: null,
    why: "iOS'taki Google ile Giriş kütüphanesi IP'den kaba konum çıkarıyor; Android girişinde bu kütüphane yok",
  },
];

let failures = 0;
let total = 0;
function check(name: string, cond: boolean, detail = "") {
  total++;
  if (cond) console.log(`  ✓ ${name}`);
  else {
    failures++;
    console.log(`  ✗ ${name}${detail ? ` — ${detail}` : ""}`);
  }
}
const same = (a: string[], b: string[]) => a.length === b.length && [...a].sort().join("|") === [...b].sort().join("|");
const diff = (a: string[], b: string[]) => {
  const fazla = a.filter((x) => !b.includes(x));
  const eksik = b.filter((x) => !a.includes(x));
  return [fazla.length ? `fazla: ${fazla.join(", ")}` : "", eksik.length ? `eksik: ${eksik.join(", ")}` : ""].filter(Boolean).join("; ");
};

/* ── iOS manifesti ─────────────────────────────────────────────────── */
type Collected = { type: string; linked: boolean; tracking: boolean; purposes: string[] };
function manifest(): Collected[] {
  const xml = readFileSync("mobile/ios/Lernomi/PrivacyInfo.xcprivacy", "utf8").replace(/<!--[\s\S]*?-->/g, "");
  const block = xml.split("<key>NSPrivacyCollectedDataTypes</key>")[1]?.split("<key>NSPrivacyAccessedAPITypes</key>")[0] ?? "";
  return [...block.matchAll(/<dict>([\s\S]*?)<\/dict>/g)].map(([, d]) => ({
    type: /<key>NSPrivacyCollectedDataType<\/key>\s*<string>NSPrivacyCollectedDataType(\w+)<\/string>/.exec(d)?.[1] ?? "?",
    linked: /<key>NSPrivacyCollectedDataTypeLinked<\/key>\s*<true\/>/.test(d),
    tracking: /<key>NSPrivacyCollectedDataTypeTracking<\/key>\s*<true\/>/.test(d),
    purposes: [...d.matchAll(/<string>NSPrivacyCollectedDataTypePurpose(\w+)<\/string>/g)].map((m) => m[1]),
  }));
}

/* ── Markdown tabloları ────────────────────────────────────────────── */
function tableRows(path: string, heading: RegExp): string[][] {
  const md = readFileSync(path, "utf8");
  const start = md.search(heading);
  if (start < 0) return [];
  const rows: string[][] = [];
  let inTable = false;
  for (const line of md.slice(start).split("\n").slice(1)) {
    if (line.startsWith("|")) {
      inTable = true;
      const cells = line.split("|").slice(1, -1).map((c) => c.trim());
      if (!/^-+$/.test(cells[0]) && cells[0] !== "Apple kategorisi" && cells[0] !== "Kategori › Veri türü") rows.push(cells);
    } else if (inTable) break;
  }
  return rows;
}
const head = (cell: string) => cell.replace(/\s*\(.*$/, "").trim();
const yes = (cell: string | undefined) => /^Evet\b/.test(cell ?? "");

const PURPOSE_NAMES: Record<string, string> = { AppFunctionality: "App Functionality", Analytics: "Analytics" };

async function main() {
  const collected = manifest();
  const appleRows = tableRows("docs/appstore/README.md", /^## Gizlilik etiketleri/m);
  const playRows = tableRows("docs/play/data-safety.md", /^\| Kategori › Veri türü/m);

  console.log("\niOS manifesti ↔ eşleme tablosu");
  check("manifestteki türler eşleme tablosuyla aynı", same(collected.map((c) => c.type), MAP.map((r) => r.apple)),
    diff(collected.map((c) => c.type), MAP.map((r) => r.apple)));
  check("hiçbir tür izleme için değil", collected.every((c) => !c.tracking));

  console.log("\niOS manifesti ↔ App Store belgesi (Connect › App Privacy kaydı)");
  const appleYes = appleRows.filter((r) => yes(r[1]));
  const byLabel = new Map(appleYes.map((r) => [head(r[0]), r]));
  check("belgede \"Evet\" satırları manifestle aynı", same([...byLabel.keys()], MAP.map((r) => r.appleLabel)),
    diff([...byLabel.keys()], MAP.map((r) => r.appleLabel)));
  for (const row of MAP) {
    const c = collected.find((x) => x.type === row.apple);
    const r = byLabel.get(row.appleLabel);
    if (!c || !r) continue;
    check(`${row.apple}: kimliğe bağlı aynı`, yes(r[2]) === c.linked, `belge "${r[2]}", manifest ${c.linked}`);
    const docPurposes = Object.values(PURPOSE_NAMES).filter((n) => r[3].includes(n));
    const manPurposes = c.purposes.map((p) => PURPOSE_NAMES[p] ?? p);
    check(`${row.apple}: amaçlar aynı`, same(docPurposes, manPurposes), `belge "${r[3]}", manifest ${manPurposes.join(" + ")}`);
  }

  console.log("\nPlay belgesi (Play › Veri güvenliği kaydı)");
  for (const row of MAP) {
    if (!row.play) {
      check(`${row.apple}: Play'de karşılığı yok, gerekçesi yazılı`, Boolean(row.why));
      continue;
    }
    const r = playRows.find((x) => head(x[0]).startsWith(row.play!));
    check(`${row.apple} → "${row.play}" toplanıyor: Evet`, yes(r?.[1]), r ? `"${r[1]}"` : "satır yok");
  }

  /* Paylaşılan satırlardaki sağlayıcılar alıcılar tablosundaki kümeyle aynı olmalı. */
  const providersOf = (prefix: string) => {
    const r = playRows.find((x) => head(x[0]).startsWith(prefix));
    const m = /\(([^)]*)\)/.exec(r?.[2] ?? "");
    return m ? m[1].split(",").map((s) => s.trim()) : [];
  };
  const matches = (play: string[], names: string[]) =>
    play.every((p) => names.some((n) => n.startsWith(p))) && names.every((n) => play.some((p) => n.startsWith(p)));
  const textNames = aiConsentProcessorList("ai_text").map((p) => String(p.name));
  const voiceNames = aiConsentProcessorList("ai_voice").map((p) => String(p.name));
  const textPlay = providersOf("Mesajlar › Diğer uygulama içi mesajlar");
  const voicePlay = providersOf("Ses › Ses kayıtları");
  check("Play \"Mesajlar\" alıcıları = dil modeli alıcıları", matches(textPlay, textNames), `Play: ${textPlay.join(", ")} · PROCESSORS: ${textNames.join(", ")}`);
  check("Play \"Ses kayıtları\" alıcıları = konuşma tanıma alıcıları", matches(voicePlay, voiceNames), `Play: ${voicePlay.join(", ")} · PROCESSORS: ${voiceNames.join(", ")}`);

  console.log("\nGizlilik politikası (üç dil) ↔ beyanlar");
  const types = new Set(collected.map((c) => c.type));
  const NOT_COLLECTED = { tr: "**Toplanmayanlar:**", en: "**What is not collected:**", de: "**Was nicht erhoben wird:**" } as const;
  const ERROR_REPORT = { tr: "hata raporu", en: "error report", de: "Fehlerbericht" } as const;
  const CRASH_WORDS = { tr: /çökme raporu\b(?! SDK)/i, en: /crash reports?\b(?! SDK)/i, de: /Absturzbericht(?!s-)/i } as const;
  const LOCATION = { tr: /(^|,)\s*konum\s*[,.]/i, en: /(^|,)\s*location\s*[,.]/i, de: /(^|,)\s*Standort\s*[,.]/i } as const;
  for (const lang of ["tr", "en", "de"] as const) {
    const body = PRIVACY_DEFAULT[lang].body;
    const line = body.split("\n").find((l) => l.startsWith(NOT_COLLECTED[lang])) ?? "";
    const list = line.slice(NOT_COLLECTED[lang].length).split(".")[0];
    check(`${lang}: "toplanmayanlar" satırı var`, Boolean(line));
    if (types.has("CrashData")) {
      check(`${lang}: hata raporu toplandığı söyleniyor`, body.toLowerCase().includes(ERROR_REPORT[lang].toLowerCase()));
      check(`${lang}: toplanmayanlar listesinde çökme raporu yok`, !CRASH_WORDS[lang].test(list), list);
    }
    if (types.has("CoarseLocation") || types.has("PreciseLocation")) {
      check(`${lang}: toplanmayanlar listesi konumu düz saymıyor`, !LOCATION[lang].test(list), list);
    }
  }

  console.log(`\n${total - failures}/${total} geçti`);
  if (failures) process.exit(1);
}

void main();
