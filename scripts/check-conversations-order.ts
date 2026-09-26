/**
 * Konuşma adımı: kelime, anlamı söylenmeden ÖNCE beklentili bir adımda kullanılıyor mu?
 *   npm run check:conversations-order [-- --ayrinti]
 *
 * NEDEN (2026-09-26). İngilizce C1'de 70 konuşmada 269 kelime, kalıp ve
 * tekrar cümlelerinde, tanımı gelmeden kullanılıyordu (L1 "The poem is
 * fragmentary; the reader, contemplative." — contemplative L2'de
 * tanıtılıyordu); 22 kelime ise hiçbir adımda tek başına anlamıyla
 * verilmiyordu ve ikisi (novel, last name) üretim adımında isteniyordu.
 * Öğrenci anlamını duymadığı kelimeyi tekrar etmek zorundaydı. Hiçbir kapı
 * sırayı ölçmüyordu: `check:conversations` yalnız "her kelime tekrar
 * ettiriliyor mu" diye bakıyor.
 *
 * KURAL:
 *  - KULLANIM yalnız beklentili adımda sayılır: tekrar/üretim hedefi (`target`),
 *    doğru/yanlış cümlesi (`statement`). Anlatımdaki örnek cümle kullanım değil,
 *    sunumdur (ör. de-c1-zwischen-zeilen „Eigentlich ist die Idee gut.“ girişi).
 *  - TANITIM, kelimenin ilk geçtiği şu adımlardan biri:
 *      (a) hedef dil parçası kelimenin kendisi (baştaki a/an/the/my/to atılır),
 *      (b) LİSTE parçası ve kelime ögelerinden biri ("one, two, three") — her öge
 *          en çok üç sözcük ve parçada noktalı virgül yok,
 *      (c) anadil parçası kelimeyi anıyor ("Noise gürültü demek"),
 *      (d) tekrar hedefi kelimenin kendisi.
 *    Kullanım tanıtımla aynı adımdaysa ihlal yok.
 *  - HATA: ilk kullanım < tanıtım; ya da kelime kullanılıyor ama hiç tanıtılmıyor.
 *  - İSTİSNA: gözle incelenip bırakılanlar (kullanım bir bileşik ya da kalıp ve
 *    anlamı aynı adımda bütün olarak veriliyor). Kapanan istisna da hata:
 *    liste kirlenmesin.
 */
import { CONVERSATIONS } from "@/lib/conversations/source";
import type { Conversation } from "@/lib/conversations/types";

const EXCEPT: { id: string; w: string; why: string }[] = [
  { id: "en-a1-form", w: "name", why: "«What's your name?» aynı adımda «adın ne» diye çevriliyor; sonraki adım cevap kalıbı" },
  { id: "en-a1-morning", w: "after", why: "kullanım «after that» kalıbı, aynı adımda «ondan sonra»; sonraki adım tek başına after ile karşılaştırma" },
  { id: "en-a1-neighbours", w: "next door", why: "kalıbın kendisi, aynı adımda «yan kapıda oturuyor»; sonraki adım kelime kelime çözümleme" },
  { id: "en-a1-rules", w: "quiet", why: "cümle çevirisiyle veriliyor; sonraki adım «Buradaki quiet…» diye geriye dönük çözümlüyor" },
  { id: "en-a1-refuse", w: "afraid", why: "«I'm afraid I can't» aynı adımda çevriliyor; sonraki adım «Kelime kelime bakalım»" },
  { id: "en-a1-cinema", w: "movie", why: "kullanım bileşik «movie theater», aynı adımda «sinema» diye tanıtılıyor" },
  { id: "en-a2-used-to", w: "play", why: "cümle aynı adımda çevriliyor; sonraki adım kalıbın yapısını çözümlüyor" },
  { id: "en-a2-flat-hunting", w: "floor", why: "kullanım bileşik «first floor», aynı adımda tanıtılıyor" },
  { id: "en-a2-work-email", w: "regards", why: "«Best regards» aynı adımda «Saygılarımla»; sonraki geçiş özet" },
  { id: "en-a2-bank", w: "card", why: "kullanım bileşik «credit card», aynı adımda tanıtılıyor" },
  { id: "en-a2-apologies", w: "worry", why: "«Don't worry about it» aynı adımda çevriliyor; tekrarı öne almak onu «Bugünün son kelimesi» adımının arkasına ve bağlı iki adımın arasına koyardı" },
  { id: "en-a2-relationships", w: "divorced", why: "aynı adım «divorce» kökünü tanıtıyor; sonraki tekrar sıfat biçimi" },
  { id: "en-a2-video-call", w: "call", why: "kullanım bileşik «video call», önceki adımda «görüntülü arama»" },
  { id: "en-b1-cv", w: "reference", why: "kalıp aynı adımda «referans» diye çevriliyor; sonraki adım kullanım notu" },
  { id: "en-b1-feedback", w: "review", why: "kullanım bileşik «performance review», aynı adımda tanıtılıyor" },
  { id: "en-b1-sick-note", w: "otherwise", why: "kalıp aynı adımda «yoksa» diye çevriliyor; sonraki adım bugünün kuralı" },
  { id: "en-b2-rents-rising", w: "housing", why: "kullanım bileşik «housing shortage», aynı adımda tanıtılıyor" },
  { id: "de-a1-bus-bahn", w: "die Bahn", why: "eşleşen «die U-Bahn» bileşiği, kendi adımında tanıtılıyor; «die Bahn» sonra ayrıca" },
];

const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const norm = (s: string) => s.toLowerCase().replace(/[.!?…,]+$/, "").trim();
const bare = (s: string) => norm(s).replace(/^(a|an|the|my|to) /, "");
const isList = (t: string) =>
  /[,·]/.test(t) && !/;/.test(t) && t.split(/\s*[,·]\s*/).filter(Boolean).every((x) => x.trim().split(/\s+/).length <= 3);
type Step = Conversation["lecture"][number];
const expected = (st: Step) => {
  const e = st.expect as { target?: string; statement?: string } | undefined;
  return [e?.target, e?.statement].filter((x): x is string => !!x);
};
function introAt(l: Conversation, w: string, re: RegExp, tag: string) {
  for (let i = 0; i < l.lecture.length; i++) {
    const st = l.lecture[i];
    for (const g of st.say) {
      if (g.lang === tag) {
        const n = norm(g.text);
        if (n === w || bare(g.text) === w) return i;
        if (isList(g.text) && n.split(/\s*[,·]\s*/).map(bare).includes(w)) return i;
      } else if (re.test(g.text)) return i;
    }
    const e = st.expect as { kind?: string; target?: string } | undefined;
    if (e?.kind === "repeat" && e.target && norm(e.target) === w) return i;
  }
  return -1;
}
function orderViolations(l: Conversation, tag: string) {
  const out: { w: string; intro: number; use: number; kind: string; noIntro?: boolean }[] = [];
  for (const v of l.vocab) {
    const full = norm(v.de);
    const w = norm(v.de.replace(/^(to|der|die|das) /, ""));
    const re = new RegExp(`(^|[^\\p{L}])${esc(w)}([^\\p{L}]|$)`, "iu");
    let intro = introAt(l, full, re, tag);
    const i2 = full !== w ? introAt(l, w, re, tag) : -1;
    if (intro < 0 || (i2 >= 0 && i2 < intro)) intro = i2;
    const use = l.lecture.findIndex((st) => expected(st).some((x) => re.test(x)));
    if (use < 0) continue;
    const kind = (l.lecture[use].expect as { kind: string }).kind;
    if (intro < 0) out.push({ w: v.de, intro, use, kind, noIntro: true });
    else if (use < intro) out.push({ w: v.de, intro, use, kind });
  }
  return out;
}

const DETAIL = process.argv.includes("--ayrinti");
const stats: Record<string, { konusma: number; ihlal: number; istisna: number; tanitimsiz: number }> = {};
const lines: string[] = [];
const usedExcept = new Set<string>();
let bad = 0;
for (const l of CONVERSATIONS) {
  const tag = l.course === "en" ? "en" : "de";
  const k = `${l.course} ${l.level}`;
  const S = (stats[k] ??= { konusma: 0, ihlal: 0, istisna: 0, tanitimsiz: 0 });
  S.konusma++;
  for (const x of orderViolations(l, tag)) {
    if (x.noIntro) { S.tanitimsiz++; bad++; lines.push(`  TANITIMSIZ ${l.id} «${x.w}»: L${x.use} ${x.kind}, hiçbir adımda anlamıyla verilmiyor`); continue; }
    const ex = EXCEPT.find((e) => e.id === l.id && e.w === x.w);
    if (ex) { S.istisna++; usedExcept.add(`${ex.id}|${ex.w}`); continue; }
    S.ihlal++;
    bad++;
    lines.push(`  İHLAL ${l.id} «${x.w}»: tanıtım L${x.intro}, önce L${x.use} (${x.kind})`);
  }
}
const stale = EXCEPT.filter((e) => !usedExcept.has(`${e.id}|${e.w}`));
if (DETAIL) console.table(stats);
if (lines.length) console.log(lines.join("\n"));
for (const e of stale) console.log(`  KAPANMIŞ İSTİSNA (listeden sil): ${e.id} «${e.w}»`);
console.log(bad || stale.length ? `\n✗ ${bad} ihlal · ${stale.length} kapanmış istisna` : `\n✓ ${CONVERSATIONS.length} konuşmada sıra ihlali ve tanıtımsız kelime yok (${EXCEPT.length} gerekçeli istisna)`);
process.exit(bad || stale.length ? 1 : 0);
