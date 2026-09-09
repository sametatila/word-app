import Link from "next/link";
import type { ReactNode } from "react";
import { LEGAL_PATHS, isLegalPlaceholder, isLegalOmitted, legalPath, type LegalLocale } from "./index";
import { platformText, visibleProcessors, type LegalConfig } from "./shape";

/**
 * Hukuki belge gövdesinin markdown + belirteç motoru.
 *
 * HAM HTML ÜRETMİYOR. Metin panelden geliyor ve `dangerouslySetInnerHTML` ile
 * basılsaydı, panele erişen herkes sayfaya script koyabilirdi — admin yetkisi
 * bunu "güvenli" yapmaz, çünkü o yetki bir gün devredilebilir ve XSS'in bedeli
 * oturum çerezi. Ayrıştırıcı bunun yerine yalnız TANIDIĞI düğümleri (başlık,
 * paragraf, liste, tablo, bağlantı, kalın, kod) React öğesi olarak kuruyor;
 * geri kalan her şey düz metin olarak basılıyor. Enjeksiyon yüzeyi yok.
 *
 * ASLA İSTİSNA ATMAZ. Bozuk markdown, yarım tablo, kapanmamış belirteç — hepsi
 * ya düz metne düşer ya görünür bir işaretle basılır. Bir gizlilik politikası
 * sayfası, panelde yapılan bir yazım hatası yüzünden 500 vermemeli: o sayfanın
 * adresi Play Console'a ve App Store Connect'e verilmiş durumda.
 *
 * İSTEMCİDE DE ÇALIŞIR (`server-only` yok): panel canlı önizleme için aynı
 * işlevi çağırıyor. Önizlemenin ayrı bir uygulamayla üretilmesi, "panelde
 * gördüğüm şey yayına çıkan şey değil" sınıfının tamamını açardı.
 */

/* ── belirteç sözlüğü ───────────────────────────────────────────────────── */

/** Kimlik alanları — `{{controllerName}}` gibi doğrudan adıyla. */
const ENTITY_KEYS = [
  "controllerName", "controllerAddress",
  "publisherName", "publisherAddress", "publisherTaxOffice",
  "trRepresentative",
  "privacyEmailTr", "privacyEmailEu", "supportEmail",
  "court", "backupRetentionDays", "supportResponseDays",
] as const;

const FAIR_USE_KEYS = ["roleplayTurnsPerDay", "sttRequestsPerDay", "pronounceRequestsPerDay", "reportsPerDay"] as const;
const ENTITY_BLOCKS = ["controller", "controller:contact", "publisher"] as const;
const LINK_KEYS = Object.keys(LEGAL_PATHS) as (keyof typeof LEGAL_PATHS)[];

/**
 * Tanınan belirteçlerin tamamı — panelin kaydetme denetimi ve `test-legal`
 * kapısı bu listeye bakıyor. Kapalı bir sözlük olması bilinçli: serbest
 * belirteç, yayına çıkmış bir sayfada sessizce boş basardı.
 */
export function knownTokens(): string[] {
  return [
    ...ENTITY_KEYS,
    ...FAIR_USE_KEYS.map((k) => `fairUse:${k}`),
    ...ENTITY_BLOCKS.map((b) => `entityBlock:${b}`),
    ...LINK_KEYS.map((k) => `link:${k}`),
    "processorsTable",
    "platforms",
    "hosting",
    "ifIos",
    "/ifIos",
  ];
}

const TOKEN_RE = /\{\{([a-zA-Z][a-zA-Z0-9:/]*)\}\}/g;

/** Metindeki belirteçler. Aynı belirteç birden çok geçse bir kez dönüyor. */
export function collectTokens(md: string): string[] {
  return [...new Set([...md.matchAll(TOKEN_RE)].map((m) => m[1]))];
}

/** Sözlükte olmayan belirteçler — kaydetme bunlarla reddediliyor. */
export function unknownTokens(md: string): string[] {
  const known = new Set(knownTokens());
  return collectTokens(md).filter((t) => !known.has(t));
}

/**
 * `{{ifIos}}` blokları dengeli mi? Kapanmayan bir blok, iOS kapalıyken metnin
 * geri kalanını sessizce yutar — kaydetme bunu da reddediyor.
 */
export function unbalancedConditionals(md: string): boolean {
  const open = (md.match(/\{\{ifIos\}\}/g) ?? []).length;
  const close = (md.match(/\{\{\/ifIos\}\}/g) ?? []).length;
  return open !== close;
}

/* ── koşullu bloklar ────────────────────────────────────────────────────── */

/**
 * `{{ifIos}}…{{/ifIos}}` bölgelerini bayrağa göre açar ya da siler.
 *
 * Ayrıştırmadan ÖNCE yapılıyor, çünkü koşul bir paragrafın ortasında da
 * olabiliyor ("…mağazadan{{ifIos}}, iOS'ta Apple üzerinden{{/ifIos}} satın
 * alınır") ve blok ayrıştırıcısına bunu öğretmek gereksiz karmaşa olurdu.
 */
function applyConditionals(md: string, ios: boolean): string {
  return md.replace(/\{\{ifIos\}\}([\s\S]*?)\{\{\/ifIos\}\}/g, (_, inner: string) => (ios ? inner : ""));
}

/* ── kimlik değerleri ───────────────────────────────────────────────────── */

/**
 * Doldurulmamış alan `[[YER_TUTUCU]]` biçiminde kalıyor ve vurguyla basılıyor —
 * yayın öncesi gözden kaçmasın diye. Doldurulunca vurgu kendiliğinden kalkıyor.
 */
function entityValue(cfg: LegalConfig, key: string): ReactNode {
  const v = (cfg.entity as Record<string, string>)[key] ?? "";
  if (isLegalOmitted(v)) return null;
  return isLegalPlaceholder(v) ? <span className="ph">{v}</span> : <>{v}</>;
}

const ENTITY_LABELS: Record<LegalLocale, Record<string, string>> = {
  tr: {
    controller: "Veri sorumlusu", publisher: "Yayıncı ve veri işleyen",
    address: "Yazışma adresi", taxOffice: "Vergi dairesi",
    trRep: "Türkiye veri sorumlusu temsilcisi (KVKK)",
    privacy: "KVKK başvuruları", privacyEu: "GDPR başvuruları", support: "Destek",
  },
  en: {
    controller: "Data controller", publisher: "Publisher and processor",
    address: "Postal address", taxOffice: "Tax office",
    trRep: "Representative in Türkiye (KVKK)",
    privacy: "KVKK requests (Türkiye)", privacyEu: "GDPR / UK GDPR requests", support: "Support",
  },
  de: {
    controller: "Verantwortlicher", publisher: "Herausgeber und Auftragsverarbeiter",
    address: "Postanschrift", taxOffice: "Finanzamt",
    trRep: "Vertreter in der Türkei (KVKK)",
    privacy: "KVKK-Anträge (Türkei)", privacyEu: "DSGVO- / UK-GDPR-Anträge", support: "Support",
  },
};

/**
 * Kimlik bloğu (KVKK aydınlatma ve 6563 tanıtıcı bilgi zorunlu unsuru).
 *
 * Uygulanmayan alan (boş dize, ör. KEP'i olmayan gerçek kişi) hiç basılmıyor:
 * boş bir satır, olmayan bir yükümlülüğü varmış gibi gösterir.
 */
function EntityBlock({ cfg, locale, party, contact }: {
  cfg: LegalConfig; locale: LegalLocale; party: "controller" | "publisher"; contact: boolean;
}) {
  const l = ENTITY_LABELS[locale];
  const row = (label: string, key: string) => {
    const node = entityValue(cfg, key);
    return node === null ? null : <><dt key={`${key}-t`}>{label}</dt><dd key={`${key}-d`}>{node}</dd></>;
  };
  return (
    <dl className="entity">
      <dt>{party === "controller" ? l.controller : l.publisher}</dt>
      <dd>{entityValue(cfg, party === "controller" ? "controllerName" : "publisherName")}</dd>
      {row(l.address, party === "controller" ? "controllerAddress" : "publisherAddress")}
      {party === "publisher" ? row(l.taxOffice, "publisherTaxOffice") : null}
      {party === "controller" ? row(l.trRep, "trRepresentative") : null}
      {contact ? (
        <>
          {row(l.privacy, "privacyEmailTr")}
          {row(l.privacyEu, "privacyEmailEu")}
          {row(l.support, "supportEmail")}
        </>
      ) : null}
    </dl>
  );
}

const PROCESSOR_HEADS: Record<LegalLocale, string[]> = {
  tr: ["Sağlayıcı", "Ne için", "Hangi veri", "Bölge", "Güvence", "Ne zaman"],
  en: ["Provider", "For what", "Which data", "Region", "Safeguard", "When"],
  de: ["Anbieter", "Wofür", "Welche Daten", "Region", "Garantie", "Wann"],
};

function ProcessorsTable({ cfg, locale }: { cfg: LegalConfig; locale: LegalLocale }) {
  const rows = visibleProcessors(cfg);
  return (
    <div className="tablewrap">
      <table>
        <thead>
          <tr>{PROCESSOR_HEADS[locale].map((h) => <th key={h}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((p) => (
            <tr key={p.name.tr || p.name.en}>
              <td>{p.name[locale]}</td>
              <td>{p.purpose[locale]}</td>
              <td>{p.data[locale]}</td>
              <td>{p.region[locale]}</td>
              <td>{p.safeguard[locale]}</td>
              <td>{p.when[locale]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── satır içi ayrıştırma ───────────────────────────────────────────────── */

type Ctx = { cfg: LegalConfig; locale: LegalLocale };

/** Satır içi belirtecin METİN karşılığı — bağlantı adresi olarak da kullanılıyor. */
function tokenText(ctx: Ctx, token: string): string | null {
  if ((ENTITY_KEYS as readonly string[]).includes(token)) {
    return (ctx.cfg.entity as Record<string, string>)[token] ?? "";
  }
  if (token.startsWith("fairUse:")) {
    const k = token.slice("fairUse:".length) as (typeof FAIR_USE_KEYS)[number];
    const v = ctx.cfg.fairUse[k];
    return typeof v === "number" ? String(v) : null;
  }
  if (token.startsWith("link:")) {
    const k = token.slice("link:".length) as keyof typeof LEGAL_PATHS;
    return LEGAL_PATHS[k] ? legalPath(k, ctx.locale) : null;
  }
  if (token === "platforms") return platformText(ctx.cfg)[ctx.locale];
  if (token === "hosting") return ctx.cfg.hosting[ctx.locale];
  return null;
}

/** Bilinmeyen belirteç: sessizce yutulmuyor, GÖRÜNÜR basılıyor. */
function UnknownToken({ name }: { name: string }) {
  return <span className="ph">{`{{${name}}}`}</span>;
}

/**
 * Satır içi biçimlendirme: `**kalın**`, `` `kod` ``, `[metin](adres)`, belirteç.
 *
 * Elle yazılmış küçük bir ayrıştırıcı; markdown kütüphanesi eklenmedi çünkü
 * ihtiyaç bu beş düğümden ibaret ve bir kütüphane beraberinde ham HTML üreten
 * bir yol da getirirdi (yukarıdaki güvenlik notu).
 */
function inline(ctx: Ctx, text: string, keyPrefix: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*)|(`[^`]+`)|(\[[^\]]+\]\([^)]+\))|(\{\{[a-zA-Z][a-zA-Z0-9:/]*\}\})/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;

  const pushText = (s: string) => { if (s) out.push(s); };

  while ((m = re.exec(text))) {
    pushText(text.slice(last, m.index));
    last = m.index + m[0].length;
    const key = `${keyPrefix}-${i++}`;
    const tok = m[0];

    if (tok.startsWith("**")) {
      out.push(<strong key={key}>{tok.slice(2, -2)}</strong>);
    } else if (tok.startsWith("`")) {
      out.push(<code key={key}>{tok.slice(1, -1)}</code>);
    } else if (tok.startsWith("[")) {
      const cut = tok.indexOf("](");
      const label = tok.slice(1, cut);
      let href = tok.slice(cut + 2, -1).trim();
      // Adres kendisi bir belirteç olabilir: [gizlilik]({{link:privacy}})
      const t = href.match(/^\{\{([a-zA-Z][a-zA-Z0-9:/]*)\}\}$/);
      if (t) href = tokenText(ctx, t[1]) ?? "#";
      const inner = inline(ctx, label, key);
      // Uygulama içi yollar `next/link` ile; dış adresler düz <a>. Ayrım
      // gezinmenin istemci tarafında kalması için: /privacy → /terms geçişi
      // tam sayfa yenilemesi olmamalı.
      out.push(
        href.startsWith("/")
          ? <Link key={key} href={href} prefetch={false}>{inner}</Link>
          : <a key={key} href={href} rel="noopener noreferrer">{inner}</a>,
      );
    } else {
      const name = tok.slice(2, -2);
      if ((ENTITY_KEYS as readonly string[]).includes(name)) {
        // Dolu bir alan DÜZ METİN olarak basılıyor, sarmalayıcı düğüm yok:
        // "…{{privacyEmailTr}}," bir <span> içine alınsaydı DOM'a hiçbir işe
        // yaramayan bir öğe eklenirdi. Yalnız doldurulmamış alan sarılıyor,
        // çünkü onun vurgulanması gerekiyor.
        const v = (ctx.cfg.entity as Record<string, string>)[name] ?? "";
        if (isLegalPlaceholder(v)) out.push(<span key={key} className="ph">{v}</span>);
        else if (!isLegalOmitted(v)) pushText(v);
      } else {
        const s = tokenText(ctx, name);
        if (s === null) out.push(<UnknownToken key={key} name={name} />);
        else pushText(s);
      }
    }
  }
  pushText(text.slice(last));
  return out;
}

/* ── blok ayrıştırma ────────────────────────────────────────────────────── */

const BLOCK_TOKEN_RE = /^\{\{(processorsTable|entityBlock:(?:controller|controller:contact|publisher))\}\}$/;

/** Markdown tablo ayracı satırı: |---|---| */
const isTableRule = (s: string) => /^\|(\s*:?-{2,}:?\s*\|)+$/.test(s.trim());
const splitRow = (s: string) => s.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());

/**
 * Gövdeyi React öğelerine çevirir.
 *
 * Bloklar boş satırla ayrılıyor. Tanınan blok türleri: `##`/`###` başlık,
 * `-` listesi, markdown tablosu, blok belirteci, paragraf. Tanınmayan her şey
 * paragraf olur — yani en kötü durum "biçimlenmemiş metin", "kaybolmuş metin"
 * değil.
 */
export function renderLegalBody(markdown: string, ctx: Ctx): ReactNode[] {
  const src = applyConditionals(markdown ?? "", ctx.cfg.platforms.ios);
  const blocks = src.replace(/\r\n/g, "\n").split(/\n{2,}/);
  const out: ReactNode[] = [];

  blocks.forEach((raw, bi) => {
    const block = raw.trim();
    if (!block) return;
    const key = `b${bi}`;
    const lines = block.split("\n");

    // Blok belirteçleri: kendi satırlarında.
    const bt = block.match(BLOCK_TOKEN_RE);
    if (bt) {
      const name = bt[1];
      if (name === "processorsTable") out.push(<ProcessorsTable key={key} cfg={ctx.cfg} locale={ctx.locale} />);
      else {
        const party = name.startsWith("entityBlock:publisher") ? "publisher" : "controller";
        out.push(
          <EntityBlock key={key} cfg={ctx.cfg} locale={ctx.locale} party={party} contact={name.endsWith(":contact")} />,
        );
      }
      return;
    }

    if (block.startsWith("### ")) {
      out.push(<h3 key={key}>{inline(ctx, block.slice(4), key)}</h3>);
      return;
    }
    if (block.startsWith("## ")) {
      out.push(<h2 key={key}>{inline(ctx, block.slice(3), key)}</h2>);
      return;
    }

    if (lines.every((l) => l.trim().startsWith("- "))) {
      out.push(
        <ul key={key}>
          {lines.map((l, i) => <li key={`${key}-${i}`}>{inline(ctx, l.trim().slice(2), `${key}-${i}`)}</li>)}
        </ul>,
      );
      return;
    }

    // Tablo: ilk satır başlık, ikinci satır ayraç, kalanı gövde. Ayraç yoksa
    // tablo sayılmıyor ve blok paragrafa düşüyor.
    // Başlık satırı OLMAYAN tablo: ilk satır doğrudan ayraç (|---|---|). Destek
    // sayfasındaki "konu → nereye" tablosu böyle; oraya uydurma bir başlık
    // koymak, olmayan bir sütun adı iddia etmek olurdu.
    if (lines.length >= 2 && isTableRule(lines[0])) {
      const body = lines.slice(1).filter((l) => l.trim().startsWith("|")).map(splitRow);
      out.push(
        <div className="tablewrap" key={key}>
          <table>
            <tbody>
              {body.map((r, ri) => (
                <tr key={ri}>{r.map((c, ci) => <td key={ci}>{inline(ctx, c, `${key}-${ri}-${ci}`)}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      return;
    }

    if (lines.length >= 2 && lines[0].trim().startsWith("|") && isTableRule(lines[1])) {
      const head = splitRow(lines[0]);
      const body = lines.slice(2).filter((l) => l.trim().startsWith("|")).map(splitRow);
      out.push(
        <div className="tablewrap" key={key}>
          <table>
            <thead><tr>{head.map((h, i) => <th key={i}>{inline(ctx, h, `${key}-h${i}`)}</th>)}</tr></thead>
            <tbody>
              {body.map((r, ri) => (
                <tr key={ri}>{r.map((c, ci) => <td key={ci}>{inline(ctx, c, `${key}-${ri}-${ci}`)}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      return;
    }

    // Paragraf: blok içi tek satır sonları boşluğa çevriliyor (markdown kuralı).
    out.push(<p key={key}>{inline(ctx, lines.join(" "), key)}</p>);
  });

  return out;
}

/**
 * Belge gövdesinin tipografisi — `.legal` sınıfı altında.
 *
 * BURADA, `legal-shell`de DEĞİL: yönetim panelindeki canlı önizleme de aynı
 * stili basıyor ve o bir İSTEMCİ bileşeni. `legal-shell` veritabanına dokunan
 * modülleri (server-only) içe aktardığı için oradan bir şey almak, tüm sunucu
 * zincirini istemci paketine sürüklüyordu — sayfalar 500 veriyordu ve bunu ne
 * tsc ne lint görüyor, yalnız çalışırken çıkıyor.
 */
export function LegalStyles() {
  return (
    <style>{`
      .legal h2 { font-size: 1.125rem; font-weight: 800; margin: 2rem 0 0.5rem; letter-spacing: -0.01em; }
      .legal h3 { font-size: 1rem; font-weight: 700; margin: 1.25rem 0 0.35rem; }
      .legal p, .legal li { font-size: 0.95rem; line-height: 1.65; }
      .legal p { margin: 0.5rem 0; }
      .legal ul { margin: 0.5rem 0 0.5rem 1.25rem; list-style: disc; }
      .legal li { margin: 0.25rem 0; }
      .legal table { width: 100%; border-collapse: collapse; font-size: 0.85rem; margin: 0.75rem 0 1rem; }
      .legal th, .legal td { text-align: left; vertical-align: top; padding: 0.45rem 0.5rem; border-bottom: 1px solid var(--border); }
      .legal th { font-weight: 700; color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.04em; }
      .legal .tablewrap { overflow-x: auto; }
      .legal a { text-decoration: underline; text-underline-offset: 4px; }
      .legal code { font-size: 0.85em; background: var(--surface-2); padding: 0.05em 0.35em; border-radius: 0.35rem; }
      .legal .ph { font-family: ui-monospace, monospace; font-size: 0.85em; padding: 0.05em 0.4em; border-radius: 0.35rem; background: color-mix(in srgb, var(--color-flame-400) 22%, transparent); color: var(--text); white-space: nowrap; }
      .legal .entity { margin: 0.75rem 0 1rem; }
      .legal .entity dt { font-weight: 700; font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.04em; margin-top: 0.5rem; }
      .legal .entity dd { margin: 0.1rem 0 0; font-size: 0.95rem; }
    `}</style>
  );
}
