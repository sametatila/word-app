/**
 * Kendi karakter seslerimiz (Defne/Aras) — `npm run test:tts-own`.
 *
 * Üç şeyi sabitliyor:
 *   1. SEÇİM. Kayıtlı tercih cinsiyet yuvası olarak çözülüyor: eski Katja/Conrad/Jenny/Guy seçimi Defne/Aras'a,
 *      kurs değişince aynı karakter (Zürih'te Leni/Jan) — kimsenin seçimi sessizce varsayılana dönmüyor.
 *   2. DÜŞÜŞ YOK. Kelime isteği (`k=w`) tabloda varsa karakterin dosyası, yoksa 404; Edge'e gitmiyor.
 *   3. ÖNBELLEK. Karakter dosyası bir gün + ETag (değişebilir: uyarılı kayıt yeniden üretilince), iOS için aralık.
 */
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import {
  edgeVoiceOf,
  glossVoice,
  conversationVoice,
  resolveVoice,
  voicesFor,
} from "../src/lib/tts/voices";
import { tileSpeech } from "../src/lib/tts/text";

let n = 0;
const ok = (name: string) => {
  n++;
  console.log(`  ✓ ${name}`);
};

// 1. Seçim
assert.deepEqual(
  voicesFor("de").map((v) => v.label),
  ["Defne", "Aras"],
);
assert.deepEqual(
  voicesFor("en").map((v) => v.label),
  ["Defne", "Aras"],
);
assert.deepEqual(
  voicesFor("gsw-zh").map((v) => v.label),
  ["Leni", "Jan"],
);
ok("seçilebilir sesler: de/en Defne-Aras, Zürih Leni-Jan");
assert.equal(resolveVoice("de", "de-DE-KatjaNeural"), "de-DE-Defne");
assert.equal(resolveVoice("de", "de-DE-ConradNeural"), "de-DE-Aras");
assert.equal(resolveVoice("en", "en-US-GuyNeural"), "en-US-Aras");
assert.equal(resolveVoice("en", "de-DE-ConradNeural"), "en-US-Aras");
ok("eski Edge seçimi cinsiyetine göre Defne/Aras'a çevriliyor");
assert.equal(resolveVoice("en", "de-DE-Aras"), "en-US-Aras");
assert.equal(resolveVoice("de", "en-US-Defne"), "de-DE-Defne");
assert.equal(resolveVoice("gsw-zh", "de-DE-Aras"), "de-CH-JanNeural");
assert.equal(resolveVoice("de", "de-CH-JanNeural"), "de-DE-Aras");
ok("kurs değişince karakter korunuyor (Zürih'te aynı cinsiyet)");
assert.equal(resolveVoice("de", null), "de-DE-Defne");
assert.equal(resolveVoice("de", "tanımsız"), "de-DE-Defne");
ok("tercih yoksa ya da tanınmıyorsa kursun ilk sesi (Defne)");
assert.equal(glossVoice("tr", "de-DE-Aras"), "tr-TR-Aras");
assert.equal(glossVoice("en", "de-DE-Defne"), "en-US-Defne");
assert.equal(glossVoice("de", "en-US-Aras"), "de-DE-Aras");
assert.equal(glossVoice("tr", "de-CH-LeniNeural"), "tr-TR-EmelNeural");
ok(
  "yürüyüş anlamı seçilen karakterin anadil sesiyle; karaktersiz kursta anlatım sesi",
);
assert.equal(conversationVoice("de"), "de-DE-KatjaNeural");
assert.equal(conversationVoice("en"), "en-US-JennyNeural");
assert.equal(conversationVoice("gsw-zh"), "de-CH-LeniNeural");
assert.equal(edgeVoiceOf("de-DE-Aras"), "de-DE-ConradNeural");
assert.equal(edgeVoiceOf("tr-TR-Aras"), "tr-TR-AhmetNeural");
assert.equal(edgeVoiceOf("de-DE-KatjaNeural"), "de-DE-KatjaNeural");
ok(
  "üretilmemiş katmanlar sabit ders sesinde; karakterin Edge karşılığı aynı cinsiyet",
);

assert.equal(tileSpeech("Berlin,"), "Berlin");
assert.equal(tileSpeech("„Hallo"), "Hallo");
assert.equal(tileSpeech("(heute)"), "heute");
assert.equal(tileSpeech("Schule."), "Schule");
assert.equal(tileSpeech("don't"), "don't");
assert.equal(tileSpeech("Ich"), "Ich");
assert.equal(tileSpeech("E-Mail"), "E-Mail");
ok("kutu metni: kenar noktalaması gidiyor, sözcük içi ve büyük harf kalıyor");

// 2-3. Uç
async function endpoint() {
  const dir = mkdtempSync(path.join(tmpdir(), "tts-own-"));
  mkdirSync(path.join(dir, "m4a", "defne"), { recursive: true });
  const audio = Buffer.from("ftypM4A-sahte-ses-verisi-0123456789");
  writeFileSync(path.join(dir, "m4a", "defne", "abc123.m4a"), audio);
  writeFileSync(
    path.join(dir, "tts-map.json"),
    JSON.stringify({ "defne|de|der Hund": "defne/abc123.m4a" }),
  );
  process.env.TTS_OWN_DIR = dir;

  const { GET } = await import("../src/app/api/tts/route");
  const req = (q: string, headers: Record<string, string> = {}) =>
    GET(
      new Request(`https://www.lernomi.app/api/tts?${q}`, {
        headers: { host: "www.lernomi.app", ...headers },
      }),
    );

  let res = await req("v=de-DE-Defne&t=der%20Hund&k=w");
  assert.equal(res.status, 200);
  assert.equal(res.headers.get("content-type"), "audio/mp4");
  assert.equal(res.headers.get("x-tts-source"), "own");
  assert.equal(res.headers.get("cache-control"), "public, max-age=86400");
  assert.equal(res.headers.get("etag"), '"defne/abc123.m4a"');
  assert.deepEqual(Buffer.from(await res.arrayBuffer()), audio);
  ok("kelime tabloda: Defne'nin dosyası, bir gün + ETag");

  res = await req("v=de-DE-Defne&t=der%20%20Hund&k=w");
  assert.equal(res.status, 200);
  assert.equal(res.headers.get("x-tts-source"), "own");
  ok("temizlik sunucuyla aynı: fazla boşluklu metin de tabloda bulunuyor");

  // İşaretsiz istek tablodaki metni bulsa da karakter dosyasını ALMIYOR: sentez yoluna, yani oturum
  // kapısına gidiyor (burada oturum yok → 401). Kelime dışı her şey Edge karşılığında kalıyor.
  res = await req("v=de-DE-Defne&t=der%20Hund");
  assert.notEqual(res.headers.get("x-tts-source"), "own");
  assert.equal(res.status, 401);
  ok("işaretsiz istek (rol yapma, ders) karakter dosyasını almıyor, Edge karşılığına gidiyor");

  res = await req("v=de-DE-Defne&t=der%20Hund&k=w", {
    "if-none-match": '"defne/abc123.m4a"',
  });
  assert.equal(res.status, 304);
  ok("ETag tutuyorsa 304");

  res = await req("v=de-DE-Defne&t=der%20Hund&k=w", { range: "bytes=0-1" });
  assert.equal(res.status, 206);
  assert.equal(res.headers.get("content-range"), `bytes 0-1/${audio.length}`);
  ok("iOS aralık isteği 206");

  res = await req("v=de-DE-Aras&t=der%20Hund&k=w");
  assert.equal(res.status, 404);
  assert.equal(res.headers.get("cache-control"), "no-store");
  assert.equal((await res.json()).error, "no_own_audio");
  ok("Aras'ın kaydı yok: 404, Defne'ye ya da Edge'e düşmüyor");

  res = await req("v=de-DE-Defne&t=der%20Hund&k=w&r=slow");
  assert.equal(res.status, 404);
  ok("yavaş hız üretilmedi: kelime isteği 404");

  res = await req("v=de-DE-Defne&t=der%20Hund&k=n");
  assert.equal(res.status, 200);
  assert.equal(res.headers.get("x-tts-source"), "own");
  ok("anlatım isteği (k=n) tabloda varsa karakterin dosyası");

  res = await req("v=de-DE-Defne&t=Yeni%20kelime.&k=n");
  assert.equal(res.status, 401);
  ok("anlatım tabloda yoksa 404 DEĞİL, sentez yoluna gidiyor (oturumsuz: 401)");

  res = await req("v=de-DE-Defne&t=der%20Hund&k=w", {
    referer: "https://saldirgan.example/x",
  });
  assert.equal(res.status, 403);
  ok("başka kökenden istek 403 (karakter dosyası da)");

  res = await req("v=xx-XX-Kimse&t=der%20Hund&k=w");
  assert.equal(res.status, 400);
  ok("tanınmayan ses 400");
}

endpoint().then(
  () => console.log(`\ntamam: ${n} denetim`),
  (err) => {
    console.error(err);
    process.exit(1);
  },
);
