import { CORRECTION_MARK, breakInlineMarkers } from "@/lib/chat-format";
import { foldSentence } from "@/lib/sentence-match";
import MASS_NOUNS from "./mass-nouns.generated.json";

/**
 * Düzeltme satırı süzgeci — sunucuda, akış öğrenciye gitmeden önce.
 *
 * Model bazen doğru bir cümleyi "düzeltiyor" ve daha kötüsü, önerdiği "doğru"
 * hâl dilbilgisel olarak YANLIŞ oluyor. Gözlenen (2026-09-28, B1 "Das
 * Vorstellungsgespräch"): öğrenci "…, weil ich habe viel Erfahrung im Verkauf und
 * ich arbeite gern mit Kunden" dedi; ilk düzeltme (weil → fiil sonda) doğruydu,
 * ikincisi "und ich arbeite gern → und gern mit Kunden arbeite ich
 * (Verb-Endstellung)" idi. "und" sıralama bağlacı, fiili yerinden oynatmaz;
 * öğrencinin cümlesi doğru, önerilen cümle bozuk Almanca. Öğrenciye bozuk
 * Almancayı "doğrusu" diye göstermek uygulamaya güveni en çok sarsan hata.
 *
 * İstem bunu önlemeye çalışıyor (bkz. `chat.ts` HATA DÜZELTME) ama garanti
 * değil. Burada yalnız DETERMİNİSTİK, ucuz denetimler var; ikinci bir model
 * çağrısı yok: her tur için ikinci bir istek hem gecikmeyi ikiye katlar
 * (düzeltme satırları cevabın başında, öğrenci onları bekliyor) hem de
 * paylaşılan ücretsiz sağlayıcı kotasını iki kat hızlı tüketir. Kod tabanında
 * sohbet için böyle bir doğrulama çağrısı da yok.
 *
 * Süzgeç TUTUCU: emin olmadığı satırı geçirir. Yanlış bir düzeltmeyi kaçırmak,
 * doğru bir düzeltmeyi silmekten daha az kötü değil ama bu denetimler yalnız
 * kesin yanlış olan biçimleri yakalıyor:
 *   1. Sol ve sağ taraf harf harf aynı (yalnız imla/noktalama farkı) —
 *      istemcideki `isCosmetic`in sunucudaki eşi; eski sürümlere de gider.
 *   2. Sol taraf öğrencinin SON sözünde geçmiyor — model öğrencinin
 *      söylemediği bir şeyi düzeltiyor (uydurma hata).
 *   3. Sıralama bağlacıyla (und/aber/oder/denn/sondern, and/but/or…) başlayan
 *      parça "fiil sonda / yan cümle" gerekçesiyle düzeltiliyor — bu bağlaçlar
 *      yan cümle kurmaz, gerekçe kendi başına yanlış.
 *   4. Sıralama bağlacından sonraki öznenin düşürülmesi ("und ich arbeite gern →
 *      und arbeite gern (Redundantes Subjekt)"). Özneyi yinelemek dilbilgisel;
 *      düşürmek yalnız üslup (2026-09-29, `test:chat` de-b1-bewerbung/en).
 *
 * QA kullanıcısının bildirdiği sahte düzeltmeler (2026-10-09, panel #13 #15 #16 #28):
 *   5. Yazılış farkı: iki taraf sayı-sözcük, kısaltma ve noktalama katlanınca aynı
 *      ("siebzehn achtundzwanzig → 17 28 (Zahlen)"). Sayıyı sözle söylemek hata değil.
 *   6. Kişi değişiyor: sol ve sağ taraf farklı KİŞİLERDEN söz ediyor ("Du kochst jetzt
 *      die Suppe → Ich koche jetzt die Suppe (Inhaltliche Korrektur)"). Bu anlamı
 *      değiştirmek, düzeltme değil. Aynı kişinin hâlleri (mich → mir) serbest.
 *   7. Hitap düzeltmesi (du ↔ Sie): hitap dilbilgisi değil ("Möchtest du auch einen
 *      Kaffee? → Möchten Sie …? (Höflichkeitsform)", iş arkadaşı sahnesi). Sahnenin
 *      hitabı biliniyorsa (`chatRegister`, açılış cümlesinden) iki yönde de siliniyor;
 *      karakter doğru hitabı kendisi kullanıyor. Bilinmiyorsa dokunulmuyor.
 *   8. Etiket değişikliğe uymuyor: sözcük SIRASI kuralı (V2, Wortstellung …) yazılmış
 *      ama iki taraf aynı sözcüklerin yer değiştirmesi değil ("weil ich … studieren
 *      möchte → … will (V2-Regel)"). Gerekçe yanlışsa düzeltme de güvenilmez.
 *   9. Üslup/içerik etiketi (Präzision, Inhalt, Stil, Ausdruck …) ve kısaltmanın açılması
 *      ("zur Uni → zur Universität", "bis fünf → bis fünf Uhr (Präzision)"): istem
 *      üslup farkının hata olmadığını söylüyor; etiket bunu kendisi itiraf ediyor.
 *
 * İstemci ayrıştırıcısı (web `chat-format`, mobil `game/chat`) değişmiyor:
 * süzgeç sunucuda olduğu için mağazadaki eski sürümler de korunuyor.
 */

export type FixVerdict =
  | { keep: true }
  | {
      keep: false;
      reason:
        | "same"
        | "not_said"
        | "coord_verb_final"
        | "coord_ellipsis"
        | "form_only"
        | "person_change"
        | "register"
        | "label_mismatch"
        | "style"
        | "mass_noun";
    };

/** Sahnenin bilinen bağlamı: hitap (yalnız Almanca) ve hedef dil. */
export type FixContext = { register?: "du" | "Sie"; lang?: "de" | "en" };

/** Karşılaştırma için sözcüklere ayırma: küçük harf, ß=ss, harf/rakam dışı ayırıcı. */
function words(text: string): string[] {
  return text
    .normalize("NFC")
    .toLocaleLowerCase("de-DE")
    .replace(/ß/g, "ss")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim()
    .split(" ")
    .filter(Boolean);
}

/**
 * `needle` sözcükleri `hay` içinde AYNI SIRAYLA geçiyor mu (arada başka sözcük
 * olabilir). Bitişiklik aranmıyor: model sol tarafı kısaltabiliyor ("weil ich
 * habe … Erfahrung") ya da bir dolgu sözcüğünü atlayabiliyor; bunlar uydurma
 * değil. Aranan şey öğrencinin HİÇ söylemediği sözcük — "ein Hund" düzeltilirken
 * öğrenci "einen Hund" demişse sol taraf uydurmadır.
 */
function inOrder(needle: string[], hay: string[]): boolean {
  let i = 0;
  for (const w of hay) if (i < needle.length && w === needle[i]) i++;
  return i === needle.length;
}

/**
 * Yan cümle KURMAYAN sıralama bağlaçları. Arkalarından gelen cümle ana cümledir
 * (Almancada bağlaç 0. konumda, fiil yine ikinci). Hedef dilden bağımsız tek
 * liste: İngilizcede fiil sona zaten hiç gitmez.
 */
const COORD = new Set(["und", "aber", "oder", "denn", "sondern", "and", "but", "or", "so", "yet"]);

/**
 * Parçada yan cümle kurabilecek bir sözcük varsa "fiil sonda" gerekçesi
 * doğru olabilir ("und weil ich habe…", "und die Frau, die ich kenne"). O
 * zaman süzgeç karışmaz. İlgi zamirleri artikellerle aynı yazıldığı için
 * (der/die/das) liste bilerek geniş: yanlışlıkla geçirmek, yanlışlıkla
 * silmekten iyidir.
 */
const SUBORDINATING = new Set([
  "weil", "dass", "ob", "wenn", "als", "obwohl", "damit", "bevor", "nachdem", "während", "bis", "seit",
  "seitdem", "sobald", "falls", "da", "sodass", "indem", "ohne", "statt", "anstatt", "wie", "wo", "was",
  "wer", "wann", "warum", "wohin", "woher", "welche", "welcher", "welches", "der", "die", "das", "dem",
  "den", "deren", "dessen", "zu",
]);

/** Sıralama bağlacından sonra yinelenebilen özne zamirleri (Almanca, İngilizce). */
const SUBJECT = new Set(["ich", "du", "er", "sie", "es", "wir", "ihr", "i", "you", "he", "she", "it", "we", "they"]);

/**
 * Kural etiketi "fiil sonda / yan cümle" diyor mu — üç ana dilde ve Almanca
 * terimle. "Verbendung" (fiil EKİ, çekim) bilerek eşleşmiyor: "und du arbeitet
 * → und du arbeitest (Verbendung)" gerçek bir düzeltme. Tire sınıfı geniş:
 * model "Verb‑Endstellung"ı bölünmez tireyle (U+2011) yazıyor.
 */
const VERB_FINAL_LABEL =
  /end[\s\u2010-\u2014-]*stellung|letzt[\s\u2010-\u2014-]*stellung|verb\s+am\s+ende|nebensatz|verb[\s\u2010-\u2014-]*final|verb\s+(goes\s+)?(at|to)\s+the\s+end|subordinate|fiil(in|i)?\s+son(a|da)|yan\s+c[üu]mle/i;

/**
 * KİŞİ: zamirin hangi kişiyi gösterdiği; hâl (ich/mich/mir) aynı kişi. Belirsiz
 * biçimler (sie/Sie/ihr/ihnen, "sein" fiil de olabilir) bilerek yok: emin
 * olunmayan satır geçer.
 */
const PERSON: Record<string, string> = {
  ich: "1s", mich: "1s", mir: "1s", mein: "1s", meine: "1s", meinen: "1s", meinem: "1s", meiner: "1s", meines: "1s",
  du: "2s", dich: "2s", dir: "2s", dein: "2s", deine: "2s", deinen: "2s", deinem: "2s", deiner: "2s", deines: "2s",
  er: "3m", ihn: "3m", ihm: "3m",
  wir: "1p", uns: "1p", unser: "1p", unsere: "1p", unseren: "1p", unserem: "1p", unserer: "1p", unseres: "1p",
  euch: "2p", euer: "2p", eure: "2p", euren: "2p", eurem: "2p", eurer: "2p", eures: "2p",
  i: "1s", me: "1s", my: "1s", mine: "1s", we: "1p", us: "1p", our: "1p", ours: "1p",
  he: "3m", him: "3m", his: "3m", they: "3p", them: "3p", their: "3p",
};
const persons = (ws: string[]) => new Set(ws.map((w) => PERSON[w]).filter(Boolean));

/** Hitap biçimleri: "du" ailesi ve büyük harfli "Sie" ailesi (cümle başındaki "Sie" belirsiz, sayılmaz). */
const DU_FORM = /(?<![\p{L}])(du|dich|dir|dein\p{L}*)(?![\p{L}])/iu;
const SIE_FORM = /(?<![\p{L}])(Ihnen|Ihre?\p{L}*)(?![\p{L}])|(?<![.!?]\s*|^\s*)(?<![\p{L}])Sie(?![\p{L}])/u;

/** Sözcük sırası kuralı adı (etiket bunu diyorsa değişiklik bir yer değiştirme olmalı). */
const ORDER_LABEL = /v2|verb[\s\u2010-\u2014-]*(zweit|stellung|position)|wort[\s\u2010-\u2014-]*stellung|satz[\s\u2010-\u2014-]*stellung|wortfolge|inversion|word\s+order|s[öo]zc[üu]k\s+s[ıi]ras[ıi]|kelime\s+s[ıi]ras[ıi]/i;

/**
 * Dilbilgisi değil, üslup ya da içerik olduğunu söyleyen etiketler. "Wortwahl"
 * bilerek yok: yanlış sözcük gerçek hata olabilir (kısaltma açma ayrıca yakalanıyor).
 */
const STYLE_LABEL = /pr[äa]zision|genauigkeit|inhalt|content|stil\b|style|ausdruck|nat[üu]rlich|formulierung|klarheit|umgangssprach|idiomati|üslup|anlam\s+düzelt|i[çc]erik/i;

/**
 * SAYILAMAYAN İSİM (QA F-0008, 2026-10-09): "Ich brauche Zahnpasta → Ich brauche eine
 * Zahnpasta (Artikel)". Liste data/app/words.json'daki "(Sg.)" isimler
 * (`scripts/gen-mass-nouns.mjs`). Yalnız belirsiz artikelin EKLENDİĞİ düzeltme siliniyor;
 * var olan artikelin hâl düzeltmesi ("ein Kaffee → einen Kaffee") gerçek hata, kalıyor.
 */
const MASS = new Set<string>(MASS_NOUNS as string[]);
const INDEF = new Set(["ein", "eine", "einen", "einem", "einer", "eines"]);
function addsArticleToMassNoun(left: string[], right: string[]): boolean {
  if (right.length !== left.length + 1) return false;
  let i = 0;
  while (i < left.length && left[i] === right[i]) i++;
  if (!INDEF.has(right[i]) || left.slice(i).join(" ") !== right.slice(i + 1).join(" ")) return false;
  // artikelden sonraki ilk iki sözcükten biri (araya sıfat girebilir) sayılamayan isim
  return right.slice(i + 1, i + 3).some((w) => MASS.has(w));
}

/**
 * SERBEST KONUMLU İLGEÇ (QA F-0008, 2026-10-09): "Halten Sie bitte hier → Bitte halten
 * Sie hier (Satzstellung)". bitte, auch, doch, mal, gern… cümlede birkaç yerde durabilir;
 * yalnız onların yeri değişiyorsa bu bir tercih, düzeltme değil.
 */
const FREE_PARTICLES = new Set(["bitte", "auch", "doch", "mal", "ja", "denn", "gern", "gerne", "schon", "noch", "eben", "halt", "wohl", "vielleicht", "eigentlich", "also", "dann", "jetzt", "please", "too", "also", "just", "really"]);
function onlyParticleMoved(left: string[], right: string[]): boolean {
  if ([...left].sort().join(" ") !== [...right].sort().join(" ") || left.join(" ") === right.join(" ")) return false;
  const core = (ws: string[]) => ws.filter((w) => !FREE_PARTICLES.has(w)).join(" ");
  return core(left) === core(right);
}

/**
 * İKİSİ DE DOĞRU DEĞİŞKENLER (QA F-0008): "gegenüber vom Bahnhof → gegenüber dem
 * Bahnhof (Präposition)". Sol ve sağ yalnız bu çiftlerden biriyle ayrılıyorsa düzeltme yok.
 */
const BOTH_RIGHT: [string, string][] = [
  ["gegenüber vom", "gegenüber dem"],
  ["gegenüber von der", "gegenüber der"],
  ["gegenüber von den", "gegenüber den"],
  ["gern", "gerne"],
  ["heute abend", "heute am abend"],
  ["nach hause", "nachhause"],
  ["zu hause", "zuhause"],
];
function bothRightVariant(left: string[], right: string[]): boolean {
  const l = ` ${left.join(" ")} `;
  const r = ` ${right.join(" ")} `;
  return BOTH_RIGHT.some(([a, b]) => {
    const swap = (s: string, x: string, y: string) => s.split(` ${x} `).join(` ${y} `);
    return swap(l, a, b) === r || swap(l, b, a) === r;
  });
}

/** "Uni → Universität": tek sözcük, sağdaki soldakiyle başlıyor ve yalnız uzuyor. */
function expandsAbbreviation(left: string[], right: string[]): boolean {
  if (left.length !== right.length) return false;
  let diff = 0;
  for (let i = 0; i < left.length; i++) {
    if (left[i] === right[i]) continue;
    diff++;
    if (!(right[i].length >= left[i].length + 3 && right[i].startsWith(left[i]))) return false;
  }
  return diff === 1;
}

/**
 * Tek bir düzeltme satırının (işaret çıkarılmış hâli) kararı.
 *
 * `said` öğrencinin son sözü. Ok taşımayan satır biçim dışı; ne dediği
 * anlaşılamadığı için geçiriliyor (istemci onu olduğu gibi gösteriyor).
 */
export function judgeCorrection(correction: string, said: string, ctx: FixContext = {}): FixVerdict {
  const parts = correction.split(/→|->/);
  if (parts.length < 2) return { keep: true };
  const rightRaw = parts.slice(1).join("→");
  // Sağ taraftaki kural etiketi „(V2-Regel)“ karşılaştırmaya girmiyor.
  const label = rightRaw.match(/\(([^)]*)\)\s*$/)?.[1] ?? "";
  const rightText = rightRaw.replace(/\([^)]*\)\s*$/, "");
  const left = words(parts[0]);
  const right = words(rightText);
  if (!left.length) return { keep: true };

  if (left.join(" ") === right.join(" ")) return { keep: false, reason: "same" };
  const lang = ctx.lang ?? "de";
  if (foldSentence(parts[0], lang) === foldSentence(rightText, lang)) return { keep: false, reason: "form_only" };

  // Ellipsis ("…", "...") sözcük değil; `words` onları zaten ayırıcı sayıyor.
  const heard = words(said);
  if (heard.length && !inOrder(left, heard)) return { keep: false, reason: "not_said" };

  if (COORD.has(left[0]) && VERB_FINAL_LABEL.test(label) && !left.some((w) => SUBORDINATING.has(w))) {
    return { keep: false, reason: "coord_verb_final" };
  }

  // Sağ taraf, bağlaçtan sonraki özne zamiri çıkarılmış sol taraf: yalnız üslup.
  if (COORD.has(left[0]) && SUBJECT.has(left[1]) && [left[0], ...left.slice(2)].join(" ") === right.join(" ")) {
    return { keep: false, reason: "coord_ellipsis" };
  }

  // Hitap (du ↔ Sie) dilbilgisi hatası değil: hitabı bilinen sahnede hiçbir yönde
  // düzeltilmiyor; karakter doğru hitabı kendisi kullanarak örnek oluyor.
  const swap =
    (DU_FORM.test(parts[0]) && SIE_FORM.test(rightText) && !DU_FORM.test(rightText)) ||
    (SIE_FORM.test(parts[0]) && DU_FORM.test(rightText) && !SIE_FORM.test(rightText));
  if (ctx.register && swap) return { keep: false, reason: "register" };

  // Kişi: iki taraf da kişi zamiri taşıyor ve kişiler farklı (du ↔ Sie hitap kuralına kalıyor).
  const pl = persons(left);
  const pr = persons(right);
  if (pl.size && pr.size && [...pl].sort().join() !== [...pr].sort().join()) return { keep: false, reason: "person_change" };

  // Sıra kuralı yazılmış ama değişiklik bir yer değiştirme değil.
  if (ORDER_LABEL.test(label) && [...left].sort().join(" ") !== [...right].sort().join(" ")) {
    return { keep: false, reason: "label_mismatch" };
  }

  if (STYLE_LABEL.test(label) || expandsAbbreviation(left, right) || onlyParticleMoved(left, right) || bothRightVariant(left, right)) {
    return { keep: false, reason: "style" };
  }
  if (lang === "de" && addsArticleToMassNoun(left, right)) return { keep: false, reason: "mass_noun" };
  return { keep: true };
}

/**
 * Tam metin üstünde süzgeç — ölçüm betikleri ve testler için. Akış için
 * `guardCorrections`, ikisi aynı satır kararını kullanıyor.
 */
export function filterCorrectionLines(text: string, said: string, ctx: FixContext = {}): { text: string; dropped: string[] } {
  const dropped: string[] = [];
  const kept = breakInlineMarkers(text).split("\n").filter((line) => {
    const verdict = judgeLine(line, said, ctx);
    if (!verdict.keep) dropped.push(verdict.reason);
    return verdict.keep;
  });
  return { text: kept.join("\n"), dropped };
}

/** Satır düzeltme satırı değilse dokunulmuyor; ayrıştırıcıyla aynı tanım (`trim` + işaret). */
function judgeLine(line: string, said: string, ctx: FixContext): FixVerdict {
  const trimmed = line.trim();
  if (!trimmed.startsWith(CORRECTION_MARK)) return { keep: true };
  const value = trimmed.slice(CORRECTION_MARK.length).trim().replace(/\*\*?([^*\n]+)\*\*?/g, "$1");
  return judgeCorrection(value, said, ctx);
}

/**
 * ROL METNİ OLMAYAN CEVAP (QA 2026-10-09, panel #39): model bazen yalnız üç öneri
 * döndürüyor ("[SAY] Ich habe Größe M. [SAY] …"); karakter hiçbir şey söylememiş
 * oluyor. İşaret satırları ([FIX]/[SAY]) ilk rol cümlesi görünene kadar tutuluyor;
 * düz metin beklemeden akıyor (gecikme yok). Cevap rol metni olmadan biterse tur
 * `retries` kez yeniden üretiliyor; yine yoksa tutulan satırlar gönderiliyor
 * (en azından öneri düğmeleri). `make` her denemede yeni bir akış kurar.
 */
export async function* ensureRoleText(
  make: () => AsyncIterable<string>,
  retries = 1,
  onRetry?: () => void,
): AsyncGenerator<string> {
  for (let attempt = 0; ; attempt++) {
    let sawBody = false;
    let held = ""; // tutulan işaret satırları (rol metninden önce)
    let line = ""; // içinde bulunulan satırın başı (sınıflanana kadar)
    let mode: "unknown" | "body" | "mark" = "unknown";
    const out: string[] = [];
    const flushHeld = () => {
      if (held) out.push(held);
      held = "";
    };
    for await (const delta of make()) {
      for (const ch of delta) {
        if (mode === "body") {
          out.push(ch);
          if (ch === "\n") mode = "unknown";
          continue;
        }
        line += ch;
        if (mode === "unknown") {
          const lead = line.trimStart();
          if (ch === "\n" && !lead) {
            // boş satır: rol metninden önceyse tutuluyor, sonra akıyor
            if (sawBody) out.push(line);
            else held += line;
            line = "";
            continue;
          }
          if (!lead) continue;
          const marks = [CORRECTION_MARK, "[SAY]"];
          if (marks.some((m) => lead.startsWith(m))) mode = "mark";
          else if (!marks.some((m) => m.startsWith(lead))) {
            mode = "body";
            sawBody = true;
            flushHeld();
            out.push(line);
            line = "";
            if (ch === "\n") mode = "unknown";
            continue;
          }
        }
        if (mode === "mark" && ch === "\n") {
          if (sawBody) out.push(line);
          else held += line;
          line = "";
          mode = "unknown";
        }
      }
      if (out.length) yield out.splice(0).join("");
    }
    if (line) {
      if (sawBody || mode === "body") out.push(line);
      else held += line;
      line = "";
    }
    /* Model rol cümlesini de öneri gibi işaretlediyse (QA F-0002, "[SAY] Zwei Pfund Äpfel,
       sehr gerne." + üç öneri): dördüncü öneri satırı yok sayılmaz; ilki rol metnidir,
       işareti kaldırılıp gövdeye alınıyor (yeniden üretmeye gerek yok). */
    if (!sawBody) {
      const lines = held.split("\n");
      const says = lines.filter((l) => l.trim().startsWith("[SAY]"));
      if (says.length >= 4) {
        const first = lines.findIndex((l) => l.trim().startsWith("[SAY]"));
        lines[first] = lines[first].trim().slice("[SAY]".length).trim();
        held = lines.join("\n");
        sawBody = true;
      }
    }
    if (sawBody || attempt >= retries) {
      flushHeld();
      if (out.length) yield out.join("");
      return;
    }
    onRetry?.();
  }
}

/**
 * MODELİN ÖZEL İŞARETLERİ (QA F-0065, 2026-10-09): Gemma bazen düşünme kanalının
 * işaretlerini düz metne döküyor ("<|channel>thought\n<channel|>"); balona ham düşüyordu.
 * `<|channel>…<channel|>` bloğu içeriğiyle, öteki `<|…|>` / `<…|>` / `<|…>` işaretleri
 * tek başına siliniyor. Yarım kalabilecek kuyruk ("<|cha") bir sonraki parçayı bekliyor.
 */
const CHANNEL_BLOCK = /<\|channel\|?>[\s\S]*?<\|?channel\|>\s*/g;
const SPECIAL_TOKEN = /<\|[a-z_]{1,24}\|?>|<[a-z_]{1,24}\|>/gi;
export function stripModelTokens(text: string): string {
  return text.replace(CHANNEL_BLOCK, "").replace(SPECIAL_TOKEN, "");
}
export async function* stripModelTokenStream(source: AsyncIterable<string>): AsyncGenerator<string> {
  let buf = "";
  for await (const delta of source) {
    buf += delta;
    // Açık kanal bloğu kapanmadıysa bekle (en çok 2.000 karakter: bozuk akış metni yutmasın).
    const open = buf.search(/<\|channel\|?>/);
    if (open !== -1 && !/<\|?channel\|>/.test(buf.slice(open + 9)) && buf.length - open < 2000) {
      const ready = stripModelTokens(buf.slice(0, open));
      buf = buf.slice(open);
      if (ready) yield ready;
      continue;
    }
    const cleaned = stripModelTokens(buf);
    // Sonda yarım bir "<|…" ya da "<…" olabilir: onu tut.
    const tail = cleaned.match(/<\|?[a-z_]{0,24}\|?$/i);
    const cut = tail ? cleaned.length - tail[0].length : cleaned.length;
    buf = cleaned.slice(cut);
    if (cut) yield cleaned.slice(0, cut);
  }
  if (buf) {
    const rest = stripModelTokens(buf);
    if (rest) yield rest;
  }
}

/**
 * İŞARETİ SATIR BAŞINA AL — akışta (QA 2026-10-09, panel #12). Model önerileri
 * bazen rol metninin arkasına aynı satırda yazıyor ("…Woher kommen Sie?   [SAY] Ich
 * komme aus der Türkei.   [SAY] …"); istemciler işareti yalnız satır başında
 * tanıdığı için ham "[SAY]" balona düşüyordu, öneri düğmeleri hiç çıkmıyordu. Sunucuda
 * bölmek mağazadaki eski sürümleri de düzeltiyor; istemcideki `breakInlineMarkers`
 * ikinci kat. Yarım kalabilecek kuyruk ("… - [SA") bir sonraki parçayı bekliyor.
 */
export async function* splitInlineMarkers(source: AsyncIterable<string>): AsyncGenerator<string> {
  const TAIL = /[ \t]*(?:[-•*]|\d{1,2}[.)])?[ \t]*(?:\[(?:F(?:I(?:X)?)?|S(?:A(?:Y)?)?)?)?$/;
  let buf = "";
  let last = "\n"; // gönderilen son karakter (satır başında mıyız)
  for await (const delta of source) {
    buf += delta;
    const cut = buf.search(TAIL);
    const ready = cut === -1 ? buf : buf.slice(0, cut);
    buf = cut === -1 ? "" : buf.slice(cut);
    if (!ready) continue;
    const out = breakInlineMarkers(last + ready).slice(1);
    if (out) {
      last = out.at(-1) ?? last;
      yield out;
    }
  }
  if (buf) {
    const out = breakInlineMarkers(last + buf).slice(1);
    if (out) yield out;
  }
}

/**
 * Akış süzgeci: düzeltme satırı OLABİLECEK satır tamamlanana kadar tutulur,
 * karar verilince ya bütün olarak (satır sonuyla) gönderilir ya hiç
 * gönderilmez. Öteki satırlar beklemeden akıyor — rol metni ve öneriler
 * gecikmiyor. Düzeltme satırları zaten cevabın başında ve istemci onları satır
 * bitince gösteriyor; tek satırlık bekleme ekranda fark edilmiyor.
 *
 * Silinen satırın nedeni `onDrop`a gidiyor (içerik değil: öğrencinin sözü
 * günlüğe yazılmasın).
 */
export async function* guardCorrections(
  source: AsyncIterable<string>,
  said: string,
  onDrop?: (reason: string) => void,
  ctx: FixContext = {},
): AsyncGenerator<string> {
  let held = ""; // tutulan (düzeltme olabilecek) satırın başı
  let holding = false;
  let atLineStart = true;

  /** Satırın kendisi ya da silindiyse `null`. */
  const settle = (line: string): string | null => {
    const verdict = judgeLine(line, said, ctx);
    if (verdict.keep) return line;
    onDrop?.(verdict.reason);
    return null;
  };

  for await (const delta of source) {
    let rest = delta;
    let out = "";
    while (rest) {
      if (atLineStart && !holding) {
        holding = true;
        held = "";
      }
      if (holding) {
        const nl = rest.indexOf("\n");
        const chunk = nl === -1 ? rest : rest.slice(0, nl);
        held += chunk;
        const lead = held.trimStart();
        // İşaretle başlayabilir mi? Başlayamayacağı anlaşıldığı an satır akmaya başlıyor.
        const maybeFix = lead.startsWith(CORRECTION_MARK) || CORRECTION_MARK.startsWith(lead);
        if (nl === -1) {
          rest = "";
          if (!maybeFix) {
            out += held;
            holding = false;
            atLineStart = false;
          }
          break;
        }
        rest = rest.slice(nl + 1);
        const kept = settle(held);
        // Silinen satırın satır sonu da gidiyor: arada boş satır kalmasın.
        if (kept !== null) out += kept + "\n";
        holding = false;
        atLineStart = true;
        continue;
      }
      // Düz satırın devamı: satır sonuna kadar olduğu gibi.
      const nl = rest.indexOf("\n");
      if (nl === -1) {
        out += rest;
        rest = "";
      } else {
        out += rest.slice(0, nl + 1);
        rest = rest.slice(nl + 1);
        atLineStart = true;
      }
    }
    if (out) yield out;
  }
  if (holding && held) {
    const kept = settle(held);
    if (kept !== null) yield kept;
  }
}
