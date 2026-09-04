/**
 * Ünite hizalı beceri egzersizleri, o üniteye kadar ÖĞRETİLEN kelimelerin
 * dışına çıkıyor mu? Çıkanları sıklığa göre listeler.
 *
 * Kesin bir kapı değil: çekimli biçimler ve özel adlar yanlış alarm üretir.
 * Amaç oranı görmek ve gözden kaçan ağır kelimeyi yakalamak.
 */
const fs = require("fs");
const R = process.cwd();
const L = JSON.parse(fs.readFileSync(`${R}/mobile/src/data/lessons/de-a1.json`, "utf8"));
const ex = JSON.parse(fs.readFileSync(`${R}/mobile/src/data/skills/exercises.json`, "utf8"));

// çok sık işlev sözcükleri + sayı + selam: her ünitede serbest
const SERBEST = new Set(`der die das den dem des ein eine einen einem einer eines kein keine keinen
ich du er sie es wir ihr mich dich sich uns euch mir dir ihm ihn ihnen mein meine meinen meinem meiner
dein deine sein seine ihre ihren unser euer und oder aber denn dass weil wenn als ob wie wo woher wohin
zu in an auf aus bei mit nach von vor über unter für um durch gegen ohne seit bis nicht ja nein doch man
ist sind bin bist war waren hat habe haben hast wird werden kann können muss müssen will
auch noch nur schon sehr hier da dann jetzt heute sehr viel mehr alle etwas nichts
guten tag morgen abend hallo bitte danke herr frau sie ihnen ihr
null eins zwei drei vier fünf sechs sieben acht neun zehn elf zwölf zwanzig dreißig hundert tausend
euro uhr jahre jahr person personen gruppe kurs a1 a2 b1
oh ok ach na so
richtig falsch wer welche welcher welches warum wann
problem moment zusammen jeden monat
im am zum zur beim vom ins aufs
machen macht soll sollen heißt bin`.split(/\s+/).filter(Boolean));

// Havuzun TAMAMI (her seviye): özel ad ayıklaması için — bir sözcük havuzda
// hiç yoksa ve metinde büyük harfle geçiyorsa büyük olasılıkla bir isim
// (Emma, Bremen, Türkei). Bunları "seviye dışı kelime" saymak yanıltıcı.
const pool = require(`${R}/data/app/words.json`);
const havuzKok = new Set();
for (const r of pool) for (const w of String(r.de).toLowerCase().match(/[a-zäöüß]{3,}/g) || []) havuzKok.add(w);

const norm = (s) => String(s || "").toLowerCase().replace(/^(der|die|das)\s+/, "").trim();
const cum = new Map();                       // ünite -> kümülatif kelime kümesi
let acc = new Set();
for (let u = 1; u <= 25; u++) {
  for (const l of L.slice((u - 1) * 4, u * 4)) {
    for (const v of l.vocab || []) for (const w of norm(v.de).split(/\s+/)) acc.add(w);
    for (const p of l.patterns || []) for (const w of String(p.de).toLowerCase().match(/[a-zäöüß]+/g) || []) acc.add(w);
  }
  cum.set(u, new Set(acc));
}

// Soru kökü ve rewrite kaynağı bazen Türkçe yazılıyor ("Neyiniz var?"); onları
// Almanca sanıp ölçmek sahte kayma üretiyordu. ı/ş/ğ/İ Almancada HİÇ yok, geri
// kalanı da Almancayla karışmayan Türkçe işlev sözcükleri.
const TR_ISARET = /[ışğİıŞĞ]|\b(ne|nasıl|hangi|nedir|demek|sorusu|için|değil|yok|kaç|kim|nerede|var)\b/i;
const türkçeMi = (s) => TR_ISARET.test(String(s || ""));

function almanca(e) {
  const out = [];
  if (e.text) out.push(e.text);
  for (const s of e.segments || []) out.push(s.text);
  // Şıklar Türkçe olabiliyor ("samimi (du)"); Almanca ölçümüne sokmuyoruz.
  for (const q of e.questions || []) {
    if (!türkçeMi(q.text)) out.push(q.text);
    for (const a of q.accept || []) out.push(a);
  }
  for (const t of e.tasks || []) {
    if (t.answer) out.push(t.answer);
    if (t.source && !türkçeMi(t.source)) out.push(t.source);
    if (t.sample) out.push(t.sample);
    if (t.stimulus) out.push(t.stimulus);
    for (const f of t.fields || []) out.push(f.answer);
  }
  return out.join(" ");
}

const hedef = ex.filter((e) => /^a1-u\d+-/.test(e.id));
console.log(`ünite hizalı egzersiz: ${hedef.length}`);
const genelDisi = new Map();
for (const e of hedef) {
  const u = e.unit;
  const izin = new Set([...(cum.get(u) || [])]);
  for (const g of e.gloss || []) for (const w of norm(g.de).split(/\s+/)) izin.add(w);   // egzersizin kendi sözlükçesi
  for (const t of e.tasks || []) for (const g of t.phrases || t.words || []) for (const w of norm(g.de).split(/\s+/)) izin.add(w);
  // Türkçe harf taşıyan özel adlar ("Yılmaz") Almanca sözcük regexinde parçalanıp
  // sahte gövde bırakıyordu ("lmaz"). Böyle bir belirteci bütünüyle atıyoruz.
  const ham = almanca(e).split(/\s+/).filter((t) => !/[ışğİıŞĞçÇ]/.test(t)).join(" ");
  // metinde büyük harfle geçen ve havuzda hiç bulunmayan sözcükler = özel ad
  // Gün ve ay adları büyük harfle yazılır ve havuzda olmayabilir, ama ÖZEL AD
  // DEĞİL — öğretilmesi gerekir. A1 yalnız beş gün öğretiyor (Donnerstag ve
  // Freitag hiç geçmiyor); muafiyet onları da geçiriyordu.
  const TAKVIM = new Set(["montag", "dienstag", "mittwoch", "donnerstag", "freitag",
    "samstag", "sonntag", "januar", "februar", "märz", "april", "mai", "juni",
    "juli", "august", "september", "oktober", "november", "dezember"]);
  const ozelAd = new Set((ham.match(/(?<![.!?]\s)(?<!^)\b[A-ZÄÖÜ][a-zäöüß]{2,}\b/g) || [])
    .map((w) => w.toLowerCase()).filter((w) => !havuzKok.has(w) && !TAKVIM.has(w)));
  // Unvan kısaltmasından sonraki ad cümle başı sanılıp muafiyetin DIŞINDA
  // kalıyordu ("Dr. Weber"). Unvanı ve ardındaki adı ayrıca özel ad say.
  for (const m of ham.matchAll(/\b(Dr|Prof|Frau|Herr)\.?\s+([A-ZÄÖÜ][a-zäöüß]+)/g)) {
    ozelAd.add(m[1].toLowerCase());
    if (!havuzKok.has(m[2].toLowerCase())) ozelAd.add(m[2].toLowerCase());
  }
  // Ayrılabilir fiilde çekim öneki AYIRIR: anrufen → "rufe … an", aufstehen →
  // "stehe … auf". Kök olarak mastarı almak yetmiyor; öneksiz gövdeyi de ekle.
  const AYRILABILIR = /^(an|auf|aus|ein|mit|nach|vor|zu|ab|bei|los|weg|zurück)/;
  const izinKok = [];
  for (const w of izin) {
    if (w.length >= 4) izinKok.push(w);
    const m = w.match(AYRILABILIR);
    if (m && w.length - m[0].length >= 4) izinKok.push(w.slice(m[0].length));
    // Ayrılan ön ek metinde TEK BAŞINA geçiyor ("ich sehe fern", "steht auf"),
    // o yüzden önekin kendisi de bilinen sayılmalı. "fern" ve "spazieren" gibi
    // önek listesine girmeyenler için mastarın baş kısmını da ekliyoruz.
    for (const on of ["fern", "spazieren", "statt", "teil", "heim", "frei"]) {
      if (w.startsWith(on) && w.length > on.length + 2) izinKok.push(on);
    }
  }
  // çekim toleransı: öğretilen kelimenin kökünü taşıyorsa bilinir say
  // Üç yön: token kökle başlıyor (kommen→kommt), token kelimenin ÖNEKİ
  // (üben→übe: çekim mastardan KISA), ya da tam eşleşme.
  const bilinir = (w) => izin.has(w) || ozelAd.has(w) ||
    izinKok.some((k) => w.startsWith(k.slice(0, Math.max(4, k.length - 2)))) ||
    (w.length >= 3 && izinKok.some((k) => k.startsWith(w)));
  const tok = (ham.toLowerCase().match(/[a-zäöüß]{2,}/g) || []);
  const disi = tok.filter((w) => !SERBEST.has(w) && !bilinir(w));
  const oran = tok.length ? (disi.length / tok.length * 100).toFixed(1) : "0";
  if (disi.length) {
    const say = {}; for (const w of disi) say[w] = (say[w] || 0) + 1;
    const ilk = Object.entries(say).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([w, n]) => `${w}×${n}`);
    console.log(`  ${e.id.padEnd(12)} %${oran.padStart(4)} dışı (${disi.length}/${tok.length}): ${ilk.join(", ")}`);
    for (const w of disi) genelDisi.set(w, (genelDisi.get(w) || 0) + 1);
  } else {
    console.log(`  ${e.id.padEnd(12)} temiz`);
  }
}
console.log("\nen sık dışarıda kalanlar:", [...genelDisi].sort((a, b) => b[1] - a[1]).slice(0, 20).map(([w, n]) => `${w}×${n}`).join(" · "));
