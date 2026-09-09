import {
  FAIR_USE,
  LEGAL_EFFECTIVE_DATE,
  LEGAL_ENTITY,
  LEGAL_HOSTING_TEXT,
  LEGAL_PLATFORMS,
  LEGAL_VERSION,
  LEGAL_CHANGELOG,
  ALL_PROCESSORS,
  processorRow,
  type LegalChangelogEntry,
  type LegalLocale,
  type Trio,
} from "./index";

/**
 * Hukuki yapılandırmanın SAF kısmı: tipler, varsayılan, ayrıştırma, türetilenler.
 *
 * `config.ts`ten AYRILDI çünkü orası `server-only` ve bu dosyaya hem sunucunun
 * hem PANELİN ihtiyacı var: yönetim ekranı metni yazarken canlı önizleme
 * basıyor ve önizleme, sayfanın kullandığı `renderLegalBody`nin ta kendisiyle
 * üretiliyor. Ayrı bir önizleme uygulaması yazmak "panelde gördüğüm şey yayına
 * çıkan şey değil" sınıfının tamamını açardı.
 *
 * Veritabanına dokunan hiçbir şey burada yok; okuma ve yazma `config.ts`te.
 */

/** Alıcılar tablosunun bir satırı — hücreler üç dilde çözülmüş hâlde. */
export type ConfigProcessor = {
  /**
   * Sağlayıcı adı ÜÇ DİLDE. Çoğu satırda üçü de aynı ("Groq"), ama hepsi değil:
   * e-posta satırı "Resend (e-posta, SMTP ile)" / "Resend (e-mail, over SMTP)"
   * diye taşımayı da söylüyor. Tek dizgi olsaydı o satır her dilde Türkçe
   * basılırdı — eski kodda bunu `PROCESSOR_NAMES` sözlüğü çözüyordu.
   */
  name: Trio;
  purpose: Trio;
  data: Trio;
  region: Trio;
  safeguard: Trio;
  when: Trio;
  /** Yalnız iOS yayındayken basılan satır (Apple ile Giriş, App Store). */
  iosOnly?: boolean;
};

export type LegalConfig = {
  entity: Record<keyof typeof LEGAL_ENTITY, string>;
  version: string;
  effectiveDate: string;
  changelog: LegalChangelogEntry[];
  platforms: { android: boolean; ios: boolean };
  fairUse: Record<keyof typeof FAIR_USE, number>;
  hosting: Trio;
  processors: ConfigProcessor[];
};

/* ── kırpıcılar ─────────────────────────────────────────────────────────── */

function str(v: unknown, fallback: string, max = 400): string {
  if (typeof v !== "string") return fallback;
  const t = v.trim();
  return t.length <= max ? t : t.slice(0, max);
}

/** Boş dize GEÇERLİ bir değer: "bu profilde yok" demek (ör. KEP'i olmayan kişi). */
function strAllowEmpty(v: unknown, fallback: string, max = 400): string {
  return typeof v === "string" ? v.trim().slice(0, max) : fallback;
}

function int(v: unknown, fallback: number, min: number, max: number): number {
  const n = typeof v === "number" ? v : Number(v);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, Math.round(n)));
}

function bool(v: unknown, fallback: boolean): boolean {
  return typeof v === "boolean" ? v : fallback;
}

/** ISO tarih (YYYY-MM-DD). Biçim tutmuyorsa varsayılan — bozuk tarih sayfada basılmaz. */
function isoDate(v: unknown, fallback: string): string {
  const s = typeof v === "string" ? v.trim() : "";
  return /^\d{4}-\d{2}-\d{2}$/.test(s) ? s : fallback;
}

/**
 * Sürüm numarası. Serbest metin DEĞİL: "1.0", "1.2.3" gibi iki ya da üç
 * basamak. Sayfada sürüm olarak basılıyor ve `test-legal` kapısı bunun kaydın
 * kendi sürümüyle eşleştiğini denetliyor; serbest metin o denetimi anlamsız
 * kılardı.
 */
function version(v: unknown, fallback: string): string {
  const s = typeof v === "string" ? v.trim() : "";
  return /^\d+\.\d+(\.\d+)?$/.test(s) ? s : fallback;
}

function trio(v: unknown, fallback: Trio, max = 400): Trio {
  const o = (v ?? {}) as Record<string, unknown>;
  return {
    tr: str(o.tr, fallback.tr, max),
    en: str(o.en, fallback.en, max),
    de: str(o.de, fallback.de, max),
  };
}

/** Madde listesi: boş satırlar atılır, aşırı uzunluk kırpılır. */
function lines(v: unknown, fallback: readonly string[], maxItems = 40, maxLen = 1200): string[] {
  if (!Array.isArray(v)) return [...fallback];
  const out = v
    .slice(0, maxItems)
    .map((x) => (typeof x === "string" ? x.trim() : ""))
    .filter(Boolean)
    .map((x) => x.slice(0, maxLen));
  return out.length ? out : [...fallback];
}

/* ── varsayılan ─────────────────────────────────────────────────────────── */

/**
 * Koddaki varsayılan — sözlük anahtarları bir kez çözülerek üretiliyor.
 *
 * `ALL_PROCESSORS` bayraktan bağımsız tam küme; iOS satırları `iosOnly` ile
 * işaretleniyor ki panelde de görünsünler ama bayrak kapalıyken basılmasınlar.
 */
function defaultProcessors(): ConfigProcessor[] {
  const iosNames = new Set(["Apple (Sign-In)", "Apple (App Store)"]);
  return ALL_PROCESSORS.map((p) => {
    const cell = (pick: (l: LegalLocale) => string): Trio => ({
      tr: pick("tr"),
      en: pick("en"),
      de: pick("de"),
    });
    return {
      name: cell((l) => processorRow(p, l).name),
      purpose: cell((l) => processorRow(p, l).purpose),
      data: cell((l) => processorRow(p, l).data),
      region: cell((l) => processorRow(p, l).region),
      safeguard: cell((l) => processorRow(p, l).safeguard),
      when: cell((l) => processorRow(p, l).when),
      ...(iosNames.has(p.name) ? { iosOnly: true } : {}),
    };
  });
}

let defaults: LegalConfig | null = null;

export function defaultLegalConfig(): LegalConfig {
  if (!defaults) {
    defaults = {
      entity: { ...LEGAL_ENTITY },
      version: LEGAL_VERSION,
      effectiveDate: LEGAL_EFFECTIVE_DATE,
      changelog: LEGAL_CHANGELOG.map((e) => ({
        version: e.version,
        date: e.date,
        changes: { tr: [...e.changes.tr], en: [...e.changes.en], de: [...e.changes.de] },
      })),
      platforms: { ...LEGAL_PLATFORMS },
      fairUse: { ...FAIR_USE },
      hosting: { ...LEGAL_HOSTING_TEXT },
      processors: defaultProcessors(),
    };
  }
  // Kopya dönülüyor: çağıran üzerinde oynarsa varsayılan bozulmasın.
  return structuredClone(defaults);
}

/* ── ayrıştırma ─────────────────────────────────────────────────────────── */

export function parseLegalConfig(raw: unknown): LegalConfig {
  const d = defaultLegalConfig();
  const o = (raw ?? {}) as Record<string, unknown>;

  const rawEntity = (o.entity ?? {}) as Record<string, unknown>;
  const entity = { ...d.entity };
  for (const k of Object.keys(entity) as (keyof typeof entity)[]) {
    // Kimlik alanları boş bırakılabilir (uygulanmayan alan satırı hiç basılmıyor),
    // o yüzden `strAllowEmpty`. Adres alanları uzun olabildiği için sınır geniş.
    entity[k] = strAllowEmpty(rawEntity[k], entity[k], 600);
  }

  const rawChangelog = Array.isArray(o.changelog) ? o.changelog : null;
  const changelog: LegalChangelogEntry[] = rawChangelog
    ? rawChangelog
        .slice(0, 60)
        .map((raw) => {
          const e = (raw ?? {}) as Record<string, unknown>;
          const ch = (e.changes ?? {}) as Record<string, unknown>;
          return {
            version: version(e.version, ""),
            date: isoDate(e.date, ""),
            changes: {
              tr: lines(ch.tr, []),
              en: lines(ch.en, []),
              de: lines(ch.de, []),
            },
          };
        })
        // Sürümü ya da tarihi geçersiz olan kayıt DÜŞÜYOR: yarım bir kayıt
        // sayfada "Sürüm  · " diye basılırdı.
        .filter((e) => e.version && e.date && e.changes.tr.length)
    : d.changelog;

  const rawProcessors = Array.isArray(o.processors) ? o.processors : null;
  const processors: ConfigProcessor[] = rawProcessors
    ? rawProcessors
        .slice(0, 60)
        .map((raw) => {
          const p = (raw ?? {}) as Record<string, unknown>;
          const empty: Trio = { tr: "", en: "", de: "" };
          return {
            name: trio(p.name, empty, 80),
            purpose: trio(p.purpose, empty),
            data: trio(p.data, empty),
            region: trio(p.region, empty),
            safeguard: trio(p.safeguard, empty),
            when: trio(p.when, empty),
            ...(bool(p.iosOnly, false) ? { iosOnly: true } : {}),
          };
        })
        // Adı olmayan satır düşer: tablonun ilk sütunu boşsa satırın anlamı yok.
        .filter((p) => p.name.tr || p.name.en || p.name.de)
    : d.processors;

  const fu = (o.fairUse ?? {}) as Record<string, unknown>;
  const pf = (o.platforms ?? {}) as Record<string, unknown>;

  return {
    entity,
    version: version(o.version, d.version),
    effectiveDate: isoDate(o.effectiveDate, d.effectiveDate),
    // Kayıt kalmadıysa varsayılana dönülüyor: sürüm geçmişi bölümünün tamamen
    // boş basılması, "hiç değişmedi" gibi okunurdu.
    changelog: changelog.length ? changelog : d.changelog,
    platforms: {
      // Android kapatılamıyor: uygulama Play'de yayında ve metinlerin kapsam
      // cümlesi en az bir platform saymak zorunda.
      android: true,
      ios: bool(pf.ios, d.platforms.ios),
    },
    fairUse: {
      roleplayTurnsPerDay: int(fu.roleplayTurnsPerDay, d.fairUse.roleplayTurnsPerDay, 1, 100_000),
      sttRequestsPerDay: int(fu.sttRequestsPerDay, d.fairUse.sttRequestsPerDay, 1, 100_000),
      pronounceRequestsPerDay: int(fu.pronounceRequestsPerDay, d.fairUse.pronounceRequestsPerDay, 1, 100_000),
      reportsPerDay: int(fu.reportsPerDay, d.fairUse.reportsPerDay, 1, 100_000),
    },
    hosting: trio(o.hosting, d.hosting, 200),
    processors: processors.length ? processors : d.processors,
  };
}

/** Metinlerde platformların sayıldığı cümle — bayrağa göre. */
export function platformText(cfg: LegalConfig): Trio {
  return cfg.platforms.ios
    ? { tr: "Android ve iOS uygulamalarını", en: "the Android and iOS apps", de: "die Android- und iOS-App" }
    : { tr: "Android uygulamasını", en: "the Android app", de: "die Android-App" };
}

/** Bayrağa göre basılacak alıcı satırları (iOS kapalıysa Apple satırları düşer). */
export function visibleProcessors(cfg: LegalConfig): ConfigProcessor[] {
  return cfg.processors.filter((p) => !p.iosOnly || cfg.platforms.ios);
}
