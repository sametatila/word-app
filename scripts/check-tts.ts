/**
 * Seslendirme kapısı — `npm run check:tts`.
 *
 * NEDEN VAR. Seslendirmenin bozulma biçimlerinin hepsi SESSİZ: hiçbiri tip
 * hatası vermiyor, hiçbiri günlüğe düşmüyor, hepsi yalnızca öğrencinin
 * hiçbir şey duymamasıyla ya da yanlış bir şey duymasıyla ortaya çıkıyor.
 * Kurulduğu gün (2026-09-18) üç tanesi canlıydı:
 *
 *   1. UZUNLUK. `/api/tts` 600 karakterin üstünü 400 ile REDDEDİYOR. Deneme
 *      sınavındaki dinleme diyalogları oynatıcıda tek dizgede birleştirildiği
 *      için 171'i hiç çalmıyordu — üstelik kullanıcının iki dinleme hakkından
 *      biri, hiçbir şey duyulmadan yanıyordu. Okuma alıştırmalarının 120'den
 *      85'i de aynı duvara çarpıyordu.
 *   2. KONUŞMACI. İçerik modeli konuşmacıyı taşıyor ama ses tarafı onu hiç
 *      okumuyordu: 709 diyalog bloğunun 598'i iki ya da daha çok kişilik ve
 *      hepsi tek ağızdan okunuyordu.
 *   3. AYRIŞMA. Aynı kurallar web ve mobilde iki ayrı kopya hâlinde yaşıyor.
 *
 * Bu betik dördünü ölçüyor — üstteki üçüne BÖLÜCÜnün kendisi ekleniyor, çünkü
 * uzunluk sorununun çözümü bölmek ve kötü bir bölücü sorunu sessiz bir içerik
 * kaybına çevirir: düşen bir cümle sınavda hiç duyulmaz ve dinlemede metin
 * ekranda görünmediği için kimse fark etmez. Kapı KIRILDIĞINDA bir şey
 * duyulmuyor ya da yanlış duyuluyor demektir.
 */
import { readFileSync } from "node:fs";
import { MOCK_PAPERS } from "../src/lib/mock-exams/source";
import { QUIZ_WEEKS } from "../src/lib/weekly-quiz";
import { BUNDLED_EXERCISES } from "../src/lib/skills/bundled";
import { MODULE_EXAM_ENTRIES } from "../src/lib/lessons/module-exam";
import { MAX_TEXT, cleanForSpeech, splitForSpeech } from "../src/lib/tts/text";
import { dialogueCast, genderOf, rolePairs, speakerKey, speakerKnown } from "../src/lib/tts/speakers";

let errors = 0;
let warnings = 0;
const err = (where: string, msg: string) => {
  errors++;
  console.log(`  ✗ ${where}: ${msg}`);
};
const warn = (where: string, msg: string) => {
  warnings++;
  console.log(`  ! ${where}: ${msg}`);
};

/* ── İçerikten diyalogları ve okunacak metinleri topla ─────────────────── */

type Block = { where: string; course: string; segments: { speaker?: string; text: string }[] };
const blocks: Block[] = [];
/** Tek parça hâlinde seslendirilebilen serbest metinler (okuma parçaları vb.). */
const prose: { where: string; text: string }[] = [];

for (const paper of MOCK_PAPERS) {
  for (const part of paper.parts) {
    for (const task of part.tasks) {
      for (const st of task.texts ?? []) {
        if (st.kind === "audio") blocks.push({ where: `${paper.id}·${st.id}`, course: paper.course, segments: st.segments });
        else if (st.kind === "text") prose.push({ where: `${paper.id}·${st.id}`, text: st.body });
      }
    }
  }
}

for (const week of QUIZ_WEEKS) {
  for (const it of week.items) {
    const st = (it as { stimulus?: { kind: string; id: string; segments?: { speaker?: string; text: string }[]; body?: string } }).stimulus;
    if (!st) continue;
    if (st.kind === "audio" && st.segments) blocks.push({ where: `${week.id}·${st.id}`, course: week.course, segments: st.segments });
    if (st.kind === "text" && st.body) prose.push({ where: `${week.id}·${st.id}`, text: st.body });
  }
}

for (const ex of BUNDLED_EXERCISES) {
  const course = ex.id.startsWith("en-") ? "en" : "de";
  if (ex.skill === "listening") blocks.push({ where: ex.id, course, segments: ex.segments });
  if (ex.skill === "reading") prose.push({ where: ex.id, text: ex.text });
}

/* Modül sınavı kâğıtları KURSUYLA birlikte okunuyor (`MODULE_EXAM_ENTRIES`).
   Kurs bir dönem sabit yazılıydı ve o gün doğruydu — kâğıt taşıyan tek kurs
   Almancaydı. İngilizce kâğıtlar (2026-09-21) eklenince sabit, İngilizce
   diyaloğu Almanca kadroyla ölçmek demek olurdu: etiketin cinsiyeti Almanca
   kurallarıyla çözülür ("Student" eril sayılır, oysa İngilizcede cinsiyetsiz)
   ve blok içi ses çakışması yanlış yerde aranırdı. */
for (const { course, plan } of MODULE_EXAM_ENTRIES) {
  const turns = plan.listening?.turns;
  if (turns) blocks.push({ where: `modül·${course}-${plan.level}-${plan.index}`, course, segments: turns.map((t) => ({ speaker: t.speaker, text: t.de })) });
}

/* ── 1. UZUNLUK — hiçbir istek tavanı aşmamalı ─────────────────────────── */

console.log(`\n1. Uzunluk — tavan ${MAX_TEXT} karakter`);
{
  let overSegments = 0;
  let worstSegment = 0;
  let overBlocks = 0;
  let worstBlock = 0;
  for (const b of blocks) {
    for (const seg of b.segments) {
      const c = cleanForSpeech(seg.text);
      worstSegment = Math.max(worstSegment, c.length);
      /* TEK REPLİĞİN tavanı aşması hata DEĞİL, ölçü.

         Bunlar diyalog değil monolog: bir haber bülteni ya da ders anlatımı
         tek konuşmacının altmış saniyelik kaydı olarak yazılıyor. Bölücü
         onları cümle sınırından ayırıyor, yani ses çıkıyor — ama bölünme
         konuşmacı DEĞİŞMEDEN oluyor ve o sınır (küçük de olsa) duyulabilir.
         Sayı burada görünsün ki içerik tarafında sessizce büyümesin.

         Gerçek hata bölünememek olurdu; onu 3. bölüm ölçüyor. */
      if (c.length > MAX_TEXT) {
        overSegments++;
        for (const part of splitForSpeech(seg.text)) {
          if (part.length > MAX_TEXT) err(b.where, `bölme sonrası replik parçası ${part.length} karakter`);
        }
      }
    }
    const total = b.segments.reduce((a, s) => a + cleanForSpeech(s.text).length, 0);
    if (total > MAX_TEXT) overBlocks++;
    worstBlock = Math.max(worstBlock, total);
  }
  console.log(`   ${blocks.length} diyalog bloğu, ${blocks.reduce((a, b) => a + b.segments.length, 0)} replik`);
  console.log(`   tavanı aşan tek replik: ${overSegments} (en uzunu ${worstSegment}) — monolog kayıtları, bölücü hepsini çalınabilir yapıyor`);
  if (overSegments) warn("uzunluk", `${overSegments} replik konuşmacı değişmeden bölünüyor — sınır duyulabilir`);
  console.log(`   toplamı tavanı aşan blok: ${overBlocks} (en uzunu ${worstBlock}) — replik replik okunduğu için sorun değil`);

  // Serbest metinler: bölücü olmadan çalamazlar, bölücüyle çalmalılar.
  let longProse = 0;
  let worstProse = 0;
  for (const p of prose) {
    const c = cleanForSpeech(p.text);
    worstProse = Math.max(worstProse, c.length);
    if (c.length > MAX_TEXT) longProse++;
    for (const part of splitForSpeech(p.text)) {
      if (part.length > MAX_TEXT) err(p.where, `bölme sonrası parça ${part.length} karakter — bölücü tavanı tutturamadı`);
    }
  }
  console.log(`   ${prose.length} serbest metin; tavanın üstünde ${longProse} (en uzunu ${worstProse}) — bölücü hepsini tavanın altına indiriyor`);
}

/* ── 2. KONUŞMACI — etiketler çözülüyor, kadro çakışmıyor ──────────────── */

console.log("\n2. Konuşmacı");
{
  const labels = new Map<string, number>();
  for (const b of blocks) for (const s of b.segments) if (speakerKey(s.speaker)) labels.set(speakerKey(s.speaker), (labels.get(speakerKey(s.speaker)) ?? 0) + 1);

  const unknown = [...labels.keys()].filter((l) => !speakerKnown(l));
  const genderless = [...labels.keys()].filter((l) => speakerKnown(l) && !genderOf(l));
  console.log(`   ${labels.size} farklı etiket, ${[...labels.values()].reduce((a, b) => a + b, 0)} replik`);
  console.log(`   cinsiyeti çözülen: ${labels.size - unknown.length - genderless.length} · cinsiyetsiz (kurum/unvan): ${genderless.length}`);

  /* BİLİNMEYEN ETİKET KAPIYI KIRMIYOR, bilerek. Ses yine veriliyor (sıradaki
     boş koltuk) ve yeni içerik yazan kişinin önü kesilmiyor. Ama sayı burada
     görünüyor: sessizce büyürse bir sonraki bakışta fark edilir. */
  if (unknown.length) warn("sözlük", `${unknown.length} etiket tanınmıyor — sıradaki ses veriliyor: ${unknown.slice(0, 20).join(", ")}${unknown.length > 20 ? " …" : ""}`);

  /* ROL TABLOSU ASİMETRİK OLMAMALI.

     `genderOf` önce `NEUTRAL`a bakıyor; oraya yazılan bir sözcük aynı yazımdaki
     Almanca rol adını GÖLGELİYOR. Kurulurken tam bu olmuştu: "Student"
     İngilizce diye cinsiyetsiz listeye yazılmıştı ve Almanca tarafta eril
     çözülmüyordu — ama dişili ("Studentin") türetildiği için kadın
     çözülüyordu. Sonuç: erkek bir öğrenci kadın sesine düşebiliyordu.
     Hiçbir tip hatası vermez, yalnız yanlış sesle duyulur. */
  for (const { male, female } of rolePairs()) {
    if (genderOf(male, "de") !== "male") err("sözlük", `"${male}" eril çözülmüyor (${genderOf(male, "de") ?? "cinsiyetsiz"}) — büyük olasılıkla NEUTRAL gölgeliyor`);
    if (female && genderOf(female, "de") !== "female") err("sözlük", `"${female}" dişil çözülmüyor (${genderOf(female, "de") ?? "cinsiyetsiz"})`);
  }
  console.log(`   rol çifti: ${rolePairs().length} · eril/dişil simetrisi tam`);

  /* ÇAKIŞMA: aynı blokta iki AYRI konuşmacı aynı ses+perde alırsa diyalog
     yine tek ağızdan duyulur ve bütün işin amacı kaybolur. */
  let multi = 0;
  let clash = 0;
  for (const b of blocks) {
    const uniq = [...new Set(b.segments.map((s) => speakerKey(s.speaker)))].filter(Boolean);
    if (uniq.length < 2) continue;
    multi++;
    const cast = dialogueCast(b.course, b.segments);
    const seen = new Map<string, string>();
    b.segments.forEach((s, i) => {
      const who = speakerKey(s.speaker);
      if (!who) return;
      const seat = `${cast[i].voice}|${cast[i].pitch}`;
      const owner = seen.get(seat);
      if (owner === undefined) seen.set(seat, who);
      else if (owner !== who) {
        clash++;
        err(b.where, `"${owner}" ile "${who}" aynı sesi paylaşıyor (${seat})`);
      }
    });
    // Aynı konuşmacı blok boyunca ses değiştirmemeli.
    const byWho = new Map<string, string>();
    b.segments.forEach((s, i) => {
      const who = speakerKey(s.speaker);
      if (!who) return;
      const seat = `${cast[i].voice}|${cast[i].pitch}`;
      const first = byWho.get(who);
      if (first === undefined) byWho.set(who, seat);
      else if (first !== seat) err(b.where, `"${who}" blok içinde ses değiştiriyor (${first} → ${seat})`);
    });
  }
  console.log(`   çok konuşmacılı blok: ${multi}/${blocks.length} · ses çakışması: ${clash}`);
}

/* ── 3. BÖLÜCÜ — hiçbir şey kaybolmamalı ───────────────────────────────── */

console.log("\n3. Bölücü");
{
  /* EN ÖNEMLİ ÖZELLİK BU. Bölme sessiz bir içerik kaybına dönüşebilir: bir
     cümleyi düşüren bölücü sınavda o cümleyi hiç duyurmaz ve kimse fark
     etmez — metin ekranda görünmüyor bile (dinlemede transkript gizli).
     Parçaların birleşimi temizlenmiş metnin BİREBİR aynısı olmak zorunda. */
  let lost = 0;
  let midWord = 0;
  let over = 0;
  let split = 0;
  const all = [...prose.map((p) => p.text), ...blocks.flatMap((b) => b.segments.map((s) => s.text))];
  const bare = (x: string) => x.replace(/\s/g, "");
  for (const text of all) {
    const clean = cleanForSpeech(text);
    const parts = splitForSpeech(text);
    if (parts.length > 1) split++;
    if (parts.join(" ") !== clean) {
      /* İKİ AYRI DURUM, iki ayrı sonuç.

         Boşlukla birleştirince metni geri vermemek TEK BAŞINA kayıp demek
         değil: 600 karakteri boşluksuz aşan bir dizge (gerçekte olmuyor ama
         bir bağlantı adresi yapıştırılırsa olur) kelime ORTASINDAN kesiliyor
         ve araya olmayan bir boşluk giriyor. Karakterler yerinde. Bunu kayıp
         saymak yanlış alarm olurdu; saymamak da gerçek kaybı gizlerdi. */
      if (bare(parts.join("")) === bare(clean)) {
        midWord++;
      } else {
        lost++;
        if (lost <= 3) err("bölücü", `parçalar metni geri vermiyor (${clean.length} karakter): ${clean.slice(0, 60)}…`);
      }
    }
    for (const p of parts) if (p.length > MAX_TEXT) over++;
  }
  console.log(`   ${all.length} metin denendi · bölünen ${split} · kayıp ${lost} · tavan aşımı ${over}`);
  if (midWord) warn("bölücü", `${midWord} metinde kelime ortasından kesim var — 600 karakteri boşluksuz aşan bir dizge`);
  if (over) err("bölücü", `${over} parça tavanı aşıyor`);

  /* ETKİSİZLİK: bölünmüş bir parçayı yeniden bölmek onu değiştirmemeli.
     `mergeForSpeech` önce birleştirip sonra bölüyor; bu özellik olmasaydı
     aynı metin iki farklı çağrıda iki farklı adrese, yani iki ayrı sentez ve
     iki ayrı önbellek girdisine düşerdi. */
  let unstable = 0;
  for (const text of all) {
    for (const p of splitForSpeech(text)) {
      if (splitForSpeech(p).join(" ") !== p) unstable++;
    }
  }
  if (unstable) err("bölücü", `${unstable} parça yeniden bölündüğünde değişiyor — önbellek anahtarı kararsız`);
  else console.log("   yeniden bölme kararlı (önbellek anahtarı sabit)");
}

/* ── 4. AYRIŞMA — web ile mobil aynı kuralları taşımalı ────────────────── */

console.log("\n4. Web ↔ mobil paritesi");
{
  const read = (p: string) => readFileSync(new URL(`../${p}`, import.meta.url), "utf8");
  /**
   * Bir listeyi kaynaktan çıkarır — biçimden bağımsız karşılaştırma.
   *
   * Adı `const` ile arıyor, düz metin olarak DEĞİL: liste adları kendi
   * açıklama yorumlarında da geçiyor ve düz arama ilk GÖNDERMEYİ bulup
   * ondan sonraki ilk `[`e, yani bambaşka bir diziye bakıyordu (yedi listenin
   * yedisi de aynı 63 maddeyi "aynı" diye onaylıyordu).
   */
  const items = (src: string, name: string): string[] => {
    const at = src.search(new RegExp(`const ${name}\\b`));
    if (at < 0) return [];
    const open = src.indexOf("[", at);
    if (open < 0) return [];
    let depth = 0;
    for (let i = open; i < src.length; i++) {
      if (src[i] === "[") depth++;
      else if (src[i] === "]" && --depth === 0) {
        return [...src.slice(open, i).matchAll(/"([^"]+)"/g)].map((m) => m[1]).sort();
      }
    }
    return [];
  };
  const same = (what: string, a: string[], b: string[]) => {
    if (!a.length || !b.length) return err("parite", `${what}: liste okunamadı (web ${b.length}, mobil ${a.length})`);
    const onlyA = a.filter((x) => !b.includes(x));
    const onlyB = b.filter((x) => !a.includes(x));
    if (onlyA.length || onlyB.length) {
      err("parite", `${what}: yalnız mobilde [${onlyA.join(", ")}] · yalnız webde [${onlyB.join(", ")}]`);
    } else console.log(`   ${what}: ${a.length} madde, aynı`);
  };

  const webSpk = read("src/lib/tts/speakers.ts");
  const mobSpk = read("mobile/src/lib/speakers.ts");
  for (const name of ["ROLE_REGULAR", "EXTRA_F", "EXTRA_M", "NEUTRAL", "FIRST_F", "FIRST_M", "SURNAME_M"]) {
    same(name, items(mobSpk, name), items(webSpk, name));
  }
  // Düzensiz çiftler: anahtar→değer eşlemesi de aynı olmalı.
  const pairs = (src: string) => {
    const at = src.search(/const ROLE_IRREGULAR\b/);
    if (at < 0) return [];
    const open = src.indexOf("{", at);
    const close = src.indexOf("\n};", open);
    return [...src.slice(open, close).matchAll(/(\w+): (?:"([^"]+)"|null)/g)].map((m) => `${m[1]}=${m[2] ?? "null"}`).sort();
  };
  same("ROLE_IRREGULAR", pairs(mobSpk), pairs(webSpk));

  const webV = read("src/lib/tts/voices.ts");
  const mobV = read("mobile/src/lib/voices.ts");
  const castOf = (src: string) => {
    const at = src.search(/const CAST\b/);
    if (at < 0) return [];
    const open = src.indexOf("{", at);
    const close = src.indexOf("\n};", open);
    return [...src.slice(open, close).matchAll(/"([a-z]{2}-[A-Z]{2}-\w+)"/g)].map((m) => m[1]);
  };
  const wc = castOf(webV);
  const mc = castOf(mobV);
  // Kadroda SIRA anlamlı (kim ikinci konuşmacı olur), o yüzden sıralanmadan.
  if (wc.join(",") !== mc.join(",")) err("parite", `kadro sırası ayrışmış:\n      web  ${wc.join(", ")}\n      mobil ${mc.join(", ")}`);
  else console.log(`   CAST: ${wc.length} ses, aynı sırada`);

  // Metin kuralları: bölme tavanı ve hedefleri iki tarafta aynı olmalı.
  const nums = (src: string) => [/MAX_TEXT = (\d+)/, /SOFT_TARGET = (\d+)/, /FIRST_TARGET = (\d+)/].map((re) => re.exec(src)?.[1] ?? "?").join("/");
  const webN = nums(read("src/lib/tts/text.ts"));
  const mobN = nums(read("mobile/src/lib/ttsText.ts"));
  if (webN !== mobN) err("parite", `bölme sayıları ayrışmış — web ${webN}, mobil ${mobN}`);
  else console.log(`   bölme sayıları: ${webN}, aynı`);

  // Cümle dizme kutusunun okunacak hâli: kayıt anahtarı bu, iki tarafta birebir aynı olmalı.
  const tile = (src: string) => (src.match(/const TILE_EDGE_(START|END) = .+;/g) ?? []).join("\n");
  const webT = tile(read("src/lib/tts/text.ts"));
  const mobT = tile(read("mobile/src/lib/ttsText.ts"));
  if (!webT || webT !== mobT) err("parite", `kutu metni kuralı (tileSpeech) ayrışmış:\n      web  ${webT}\n      mobil ${mobT}`);
  else console.log("   kutu metni kuralı (tileSpeech): aynı");

  // Kelime katmanı: seçilebilir sesler, karakter sesleri ve eski seçimlerin cinsiyeti iki tarafta aynı.
  const ids = (src: string, name: string) => {
    const at = src.search(new RegExp(`const ${name}\\b`));
    const body = at < 0 ? "" : src.slice(at, src.indexOf("};", at) > 0 && name !== "VOICES" ? src.indexOf("};", at) : src.indexOf("];", at));
    return [...body.matchAll(/"([a-z]{2}-[A-Z]{2}-[A-Za-z]+)"/g)].map((m) => m[1]).join(",");
  };
  for (const name of ["VOICES", "OWN_VOICES", "GENDER", "LESSON"]) {
    const w = ids(webV, name);
    const m = ids(mobV, name);
    if (!w || w !== m) err("parite", `${name} ayrışmış:\n      web  ${w}\n      mobil ${m}`);
    else console.log(`   ${name}: aynı`);
  }
}

console.log(`\n${errors === 0 ? "tamam" : "BAŞARISIZ"}: ${errors} hata, ${warnings} uyarı`);
process.exit(errors === 0 ? 0 : 1);
