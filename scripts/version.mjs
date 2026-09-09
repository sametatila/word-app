#!/usr/bin/env node
/**
 * SÜRÜMÜN TEK KAYNAĞI VE KAPISI.
 *
 * NEDEN VAR. Sürüm dört ayrı dosyada yazılıydı ve hiçbir şey onları birbirine
 * bağlamıyordu; üçü elle eşitleniyor, dördüncüsü (web) kendi başına ilerliyordu.
 * Sonuç ölçüldü: aynı ürün, aynı ekranın aynı yerinde web'de "Lernomi 1.0.5",
 * mobilde "Lernomi 1.0.0" yazıyordu — ve o satırın tek işi, destek isteyen
 * kullanıcının söyleyebileceği şey olmaktı.
 *
 * Elle dört yere doğru sayıyı yazmak bu sorunu çözmez, ertelerdi. Onun yerine:
 * bir kaynak, bir yazıcı, bir kapı.
 *
 *   KAYNAK   package.json → "version" (semver) + "versionCode" (tamsayı)
 *   YAZICI   --write / --set / --bump-code  → aşağıdaki üç hedefe basar
 *   KAPI     --check  → ayrışma varsa çıkış kodu 1, CI kırılır
 *
 * İKİ SAYI, İKİ İŞ. `version` kullanıcıya görünen semver; mağaza sayfasında ve
 * Ayarlar'ın dibinde bu yazıyor. `versionCode` yalnız Android/iOS için ve
 * MONOTON artmak zorunda: Play aynı versionCode'u ikinci kez kabul etmiyor,
 * dolayısıyla kapalı testte "1.0.0"ın onuncu yüklemesi bile yeni bir kod ister.
 * Bu yüzden versionCode semver'den TÜRETİLMİYOR; ayrı bir sayaç.
 *
 * Web dağıtımları numarayı artırmaz — numara ürünün mağazadaki sürümüdür.
 *
 * Kullanım:
 *   node scripts/version.mjs                 # denetle (varsayılan)
 *   node scripts/version.mjs --write         # kaynağı hedeflere bas
 *   node scripts/version.mjs --set 1.0.1     # semver'i değiştir + bas
 *   node scripts/version.mjs --bump-code     # versionCode +1 + bas (her Play yüklemesi)
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PKG = join(ROOT, "package.json");

/**
 * Hedefler. Her alan bir regex ve bir yazıcıdan oluşuyor; `count` beklenen
 * eşleşme sayısı ve BEKLENTİ OLARAK yazılı — pbxproj aynı değeri iki
 * yapılandırmada (Debug/Release) taşıyor ve biri atlanırsa arşiv sessizce
 * yanlış build numarasıyla çıkar. Sayı tutmazsa dosya değişmiş demektir ve
 * betik yazmayı reddediyor; sessizce yarısını güncellemektense durmak doğru.
 */
const TARGETS = [
  {
    label: "mobile/src/version.ts",
    path: join(ROOT, "mobile/src/version.ts"),
    fields: [
      { key: "version", re: /(APP_VERSION\s*=\s*")([^"]+)(")/g, count: 1 },
      { key: "code", re: /(APP_VERSION_CODE\s*=\s*)(\d+)(;)/g, count: 1 },
    ],
  },
  {
    label: "android/app/build.gradle",
    path: join(ROOT, "mobile/android/app/build.gradle"),
    fields: [
      { key: "version", re: /(^\s*versionName\s+")([^"]+)(")/gm, count: 1 },
      { key: "code", re: /(^\s*versionCode\s+)(\d+)([ \t]*$)/gm, count: 1 },
    ],
  },
  {
    label: "ios/project.pbxproj",
    path: join(ROOT, "mobile/ios/Lernomi.xcodeproj/project.pbxproj"),
    fields: [
      { key: "version", re: /(MARKETING_VERSION = )([^;]+)(;)/g, count: 2 },
      { key: "code", re: /(CURRENT_PROJECT_VERSION = )(\d+)(;)/g, count: 2 },
    ],
  },
];

const read = (p) => readFileSync(p, "utf8");

/** Kaynak: package.json. versionCode yoksa 1 sayılır ve ilk yazmada eklenir. */
function source() {
  const raw = read(PKG);
  const pkg = JSON.parse(raw);
  if (typeof pkg.version !== "string" || !/^\d+\.\d+\.\d+$/.test(pkg.version)) {
    throw new Error(`package.json › version semver değil: ${JSON.stringify(pkg.version)}`);
  }
  const code = pkg.versionCode;
  if (code !== undefined && (!Number.isInteger(code) || code < 1)) {
    throw new Error(`package.json › versionCode pozitif tamsayı olmalı: ${JSON.stringify(code)}`);
  }
  return { version: pkg.version, code: code ?? 1, raw, hasCode: code !== undefined };
}

/** Bir hedefteki mevcut değerleri okur; eşleşme sayısı beklenenden farklıysa null. */
function readTarget(t) {
  const text = read(t.path);
  const out = { text };
  for (const f of t.fields) {
    const hits = [...text.matchAll(f.re)].map((m) => m[2].trim());
    if (hits.length !== f.count) {
      out[f.key] = { error: `${hits.length} eşleşme, beklenen ${f.count}` };
      continue;
    }
    const uniq = [...new Set(hits)];
    out[f.key] = uniq.length === 1 ? { value: uniq[0] } : { error: `kendi içinde ayrışık: ${uniq.join(" / ")}` };
  }
  return out;
}

function check(src) {
  const rows = [];
  let bad = 0;
  rows.push({ label: "package.json (KAYNAK)", version: src.version, code: String(src.code), ok: true });
  for (const t of TARGETS) {
    const cur = readTarget(t);
    const v = cur.version.error ? cur.version.error : cur.version.value;
    const c = cur.code.error ? cur.code.error : cur.code.value;
    const ok = !cur.version.error && !cur.code.error && v === src.version && c === String(src.code);
    if (!ok) bad++;
    rows.push({ label: t.label, version: v, code: c, ok });
  }
  const w = Math.max(...rows.map((r) => r.label.length));
  for (const r of rows) {
    console.log(`  ${r.ok ? "tamam" : "AYRIK"}  ${r.label.padEnd(w)}  ${r.version} (${r.code})`);
  }
  return bad;
}

function write(src) {
  for (const t of TARGETS) {
    const cur = readTarget(t);
    for (const f of t.fields) {
      if (cur[f.key].error) {
        throw new Error(`${t.label} › ${f.key}: ${cur[f.key].error} — dosya değişmiş, elle bakın.`);
      }
    }
    let text = cur.text;
    for (const f of t.fields) {
      const val = f.key === "version" ? src.version : String(src.code);
      // Grupları SAYIYLA değil, dizgi olup olmadıklarına bakarak alıyoruz.
      // String.replace geri çağrısına gruplardan sonra offset (sayı) ve kaynak
      // metin de geliyor; üç grup varsayıp dördüncü argümanı "son grup" sanmak
      // offset'i çıktıya yazıyordu — versionCode 1 yerine 16219 oldu, ölçüldü.
      text = text.replace(f.re, (...args) => {
        const groups = args.slice(1, -2).filter((g) => typeof g === "string");
        if (groups.length !== 3) throw new Error(`${t.label} › ${f.key}: regex üç grup vermiyor`);
        return `${groups[0]}${val}${groups[2]}`;
      });
    }
    if (text !== cur.text) {
      writeFileSync(t.path, text);
      console.log(`  yazıldı  ${t.label}`);
    } else {
      console.log(`  aynıydı  ${t.label}`);
    }
  }
}

/**
 * package.json'a yazarken JSON.stringify KULLANILMIYOR: dosyayı yeniden
 * biçimlendirip anahtar sırasını değiştirir ve fark okunamaz hâle gelir.
 * Hedef satırlar metin olarak değiştiriliyor; versionCode yoksa version'ın
 * hemen altına, aynı girintiyle ekleniyor.
 */
function writeSource(version, code) {
  let raw = read(PKG);
  raw = raw.replace(/("version"\s*:\s*")[^"]+(")/, `$1${version}$2`);
  if (/"versionCode"\s*:\s*\d+/.test(raw)) {
    raw = raw.replace(/("versionCode"\s*:\s*)\d+/, `$1${code}`);
  } else {
    raw = raw.replace(/^(\s*)"version"(\s*:\s*"[^"]+",)$/m, `$1"version"$2\n$1"versionCode": ${code},`);
  }
  writeFileSync(PKG, raw);
  console.log(`  yazıldı  package.json → ${version} (${code})`);
}

const argv = process.argv.slice(2);
const has = (f) => argv.includes(f);
const valueOf = (f) => {
  const i = argv.indexOf(f);
  return i >= 0 ? argv[i + 1] : undefined;
};

try {
  let src = source();

  if (has("--set") || has("--bump-code")) {
    const next = has("--set") ? valueOf("--set") : src.version;
    if (!next || !/^\d+\.\d+\.\d+$/.test(next)) {
      throw new Error(`--set için semver gerekiyor (ör. 1.0.1), gelen: ${next ?? "yok"}`);
    }
    // Her semver değişikliği yeni bir yükleme demek, yeni yükleme yeni kod ister.
    const code = src.code + (has("--bump-code") || next !== src.version ? 1 : 0);
    console.log("== Kaynak");
    writeSource(next, code);
    src = source();
    console.log("\n== Hedefler");
    write(src);
    console.log("\n== Doğrulama");
    process.exit(check(src) === 0 ? 0 : 1);
  }

  if (has("--write")) {
    if (!src.hasCode) writeSource(src.version, src.code);
    console.log("== Hedefler");
    write(src);
    console.log("\n== Doğrulama");
    process.exit(check(source()) === 0 ? 0 : 1);
  }

  console.log("== Sürüm");
  const bad = check(src);
  if (bad === 0) {
    console.log("\nDört kaynak da aynı.");
    process.exit(0);
  }
  console.error(`\n${bad} hedef kaynakla ayrışmış. Düzeltmek için:\n  npm run version:write`);
  console.error("Sürümü DEĞİŞTİRMEK istiyorsanız kaynağı değiştirin:\n  npm run version:set -- 1.0.1   ·   npm run version:bump-code");
  process.exit(1);
} catch (e) {
  console.error(`HATA: ${e.message}`);
  process.exit(2);
}
