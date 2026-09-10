/**
 * Rol yapma SENARYOSUNU paketler: `node data/lessons/script/make.mjs`
 *
 * ÇÖZÜCÜ GÖSTERDİ. `roleplay` hattı dört alanı kapsıyor (sahne, muhatap,
 * açılış, amaç — 580×4) ve bitmiş görünüyordu. Ama on dersin çevrimdışı
 * senaryosu ayrı bir dosyada duruyor ve içinde üç Türkçe alan daha var:
 *
 *   askTr   modelin repliğinin Türkçesi
 *   cue     öğrenciye ne söyleyeceğini fısıldayan ipucu
 *   sayTr   cevaba verilen karşılığın Türkçesi
 *
 * Senaryolu rol yapma, modelin çalışmadığı ya da çalışmasının istenmediği
 * yerde devreye giren HAZIR akış — yani tam da ağın olmadığı, modelin
 * yavaş olduğu anda görünen metin. Çevrilmemiş kalırsa İngilizce bir
 * dersin en kırılgan yerinde Türkçe çıkar.
 *
 * TEK DOSYA, KONUMSAL ARGÜMAN. Ders içeriği `tr("…")` gibi adlandırılmış
 * çağrılar kullanıyor ama senaryolar iki kısayolla yazılmış:
 *
 *   t(id, ask, askTr, cue, replies, fallback)
 *   r(match, say, sayTr, next, uses)
 *
 * yani Türkçe alanların adı YOK, sırası var. Kardeş hatların alan adına
 * bakan taraması bu yüzden hiçbir şey bulamamıştı; burada sıra sayılıyor.
 * `fallback` ise nesne olarak yazıldığı için `sayTr:` adıyla duruyor.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const SRC = new URL("../../../src/lib/lessons/content/scripts-a1.ts", import.meta.url).pathname;
const DIR = new URL(".", import.meta.url).pathname;

const S = '"((?:[^"\\\\]|\\\\.)*)"';

export function extractScript() {
  const src = readFileSync(SRC, "utf8");
  /** dize → { tr, kind, n, ctx, lessons } */
  const rows = new Map();
  let lesson = null;
  let ask = null;

  const add = (text, kind) => {
    const r = rows.get(text) ?? { tr: text, kind, n: 0, ctx: [], lessons: [] };
    r.n++;
    // BAĞLAM TURUN TAMAMI: "Şimdi sen sor." ipucu tek başına çevrilemez,
    // neyi sorduğu ancak modelin bir önceki repliğiyle görünüyor.
    if (r.ctx.length < 3)
      r.ctx.push(kind === "askTr" || !ask ? `«${text}»` : `[${ask}] «${text}»`);
    if (lesson && !r.lessons.includes(lesson) && r.lessons.length < 3) r.lessons.push(lesson);
    rows.set(text, r);
  };

  // Tek taramada, konum sırasıyla: ders anahtarı bir bloğu açıyor, `t(` bir
  // turu, `r(` o turun cevabını. Ayrı ayrı toplansaydı bağlam kaybolurdu.
  const re = new RegExp(
    [
      `"(de-[a-z0-9-]+)":\\s*\\[`,
      `\\bt\\(\\s*${S}\\s*,\\s*${S}\\s*,\\s*${S}\\s*,\\s*${S}`,
      `\\br\\(\\s*\\[[^\\]]*\\]\\s*,\\s*${S}\\s*,\\s*${S}`,
      `\\bsayTr:\\s*${S}`,
    ].join("|"),
    "g",
  );
  for (const m of src.matchAll(re)) {
    if (m[1] !== undefined) {
      lesson = m[1];
      ask = null;
    } else if (m[2] !== undefined) {
      // t(id, ask, askTr, cue, …) — m[2]=id, m[3]=ask, m[4]=askTr, m[5]=cue
      ask = JSON.parse(`"${m[3]}"`);
      add(JSON.parse(`"${m[4]}"`), "askTr");
      add(JSON.parse(`"${m[5]}"`), "cue");
    } else if (m[6] !== undefined) {
      // r(match, say, sayTr, …) — m[6]=say, m[7]=sayTr
      add(JSON.parse(`"${m[7]}"`), "sayTr");
    } else if (m[8] !== undefined) {
      add(JSON.parse(`"${m[8]}"`), "sayTr");
    }
  }

  // Sıklık azalan; eşitlikte kısa önce, sonra alfabetik — sıra KARARLI olmalı,
  // yoksa paketler her `make`te kayar ve yazılanlar tutmaz.
  return [...rows.values()].sort(
    (a, b) => b.n - a.n || a.tr.length - b.tr.length || a.tr.localeCompare(b.tr, "tr"),
  );
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const rows = extractScript();
  mkdirSync(`${DIR}in`, { recursive: true });
  mkdirSync(`${DIR}out`, { recursive: true });
  const SIZE = 125;
  let n = 0;
  for (let i = 0; i < rows.length; i += SIZE) {
    n++;
    const name = `s-${String(n).padStart(3, "0")}`;
    writeFileSync(
      `${DIR}in/${name}.json`,
      `${JSON.stringify({ packet: name, words: rows.slice(i, i + SIZE) }, null, 1)}\n`,
    );
  }
  const kinds = rows.reduce((a, r) => ((a[r.kind] = (a[r.kind] ?? 0) + 1), a), {});
  const total = rows.reduce((a, r) => a + r.n, 0);
  console.log(
    `${rows.length} benzersiz dize · ${total} alan · ${n} paket\n` +
      Object.entries(kinds).map(([k, v]) => `${k} ${v}`).join(" · "),
  );
}
