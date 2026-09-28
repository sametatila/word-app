import { CORRECTION_MARK } from "@/lib/chat-format";

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
 *
 * İstemci ayrıştırıcısı (web `chat-format`, mobil `game/chat`) değişmiyor:
 * süzgeç sunucuda olduğu için mağazadaki eski sürümler de korunuyor.
 */

export type FixVerdict =
  | { keep: true }
  | { keep: false; reason: "same" | "not_said" | "coord_verb_final" };

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

/**
 * Kural etiketi "fiil sonda / yan cümle" diyor mu — üç ana dilde ve Almanca
 * terimle. "Verbendung" (fiil EKİ, çekim) bilerek eşleşmiyor: "und du arbeitet
 * → und du arbeitest (Verbendung)" gerçek bir düzeltme. Tire sınıfı geniş:
 * model "Verb‑Endstellung"ı bölünmez tireyle (U+2011) yazıyor.
 */
const VERB_FINAL_LABEL =
  /end[\s\u2010-\u2014-]*stellung|letzt[\s\u2010-\u2014-]*stellung|verb\s+am\s+ende|nebensatz|verb[\s\u2010-\u2014-]*final|verb\s+(goes\s+)?(at|to)\s+the\s+end|subordinate|fiil(in|i)?\s+son(a|da)|yan\s+c[üu]mle/i;

/**
 * Tek bir düzeltme satırının (işaret çıkarılmış hâli) kararı.
 *
 * `said` öğrencinin son sözü. Ok taşımayan satır biçim dışı; ne dediği
 * anlaşılamadığı için geçiriliyor (istemci onu olduğu gibi gösteriyor).
 */
export function judgeCorrection(correction: string, said: string): FixVerdict {
  const parts = correction.split(/→|->/);
  if (parts.length < 2) return { keep: true };
  const rightRaw = parts.slice(1).join("→");
  // Sağ taraftaki kural etiketi „(V2-Regel)“ karşılaştırmaya girmiyor.
  const label = rightRaw.match(/\(([^)]*)\)\s*$/)?.[1] ?? "";
  const left = words(parts[0]);
  const right = words(rightRaw.replace(/\([^)]*\)\s*$/, ""));
  if (!left.length) return { keep: true };

  if (left.join(" ") === right.join(" ")) return { keep: false, reason: "same" };

  // Ellipsis ("…", "...") sözcük değil; `words` onları zaten ayırıcı sayıyor.
  const heard = words(said);
  if (heard.length && !inOrder(left, heard)) return { keep: false, reason: "not_said" };

  if (COORD.has(left[0]) && VERB_FINAL_LABEL.test(label) && !left.some((w) => SUBORDINATING.has(w))) {
    return { keep: false, reason: "coord_verb_final" };
  }
  return { keep: true };
}

/**
 * Tam metin üstünde süzgeç — ölçüm betikleri ve testler için. Akış için
 * `guardCorrections`, ikisi aynı satır kararını kullanıyor.
 */
export function filterCorrectionLines(text: string, said: string): { text: string; dropped: string[] } {
  const dropped: string[] = [];
  const kept = text.split("\n").filter((line) => {
    const verdict = judgeLine(line, said);
    if (!verdict.keep) dropped.push(verdict.reason);
    return verdict.keep;
  });
  return { text: kept.join("\n"), dropped };
}

/** Satır düzeltme satırı değilse dokunulmuyor; ayrıştırıcıyla aynı tanım (`trim` + işaret). */
function judgeLine(line: string, said: string): FixVerdict {
  const trimmed = line.trim();
  if (!trimmed.startsWith(CORRECTION_MARK)) return { keep: true };
  const value = trimmed.slice(CORRECTION_MARK.length).trim().replace(/\*\*?([^*\n]+)\*\*?/g, "$1");
  return judgeCorrection(value, said);
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
): AsyncGenerator<string> {
  let held = ""; // tutulan (düzeltme olabilecek) satırın başı
  let holding = false;
  let atLineStart = true;

  /** Satırın kendisi ya da silindiyse `null`. */
  const settle = (line: string): string | null => {
    const verdict = judgeLine(line, said);
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
