import type { AssessRequest } from "../src/lib/assess-prompts";
import { isTranslateCheck, noteShowsNoError, v2Broken, parseTranslateCheck, sameBothSides, translateAccepted, translateCheckAssessment } from "../src/lib/translate-check";

/**
 * Çeviri kurtarma kontrolü — `npm run test:translate-check-unit`. Dil modeli istemez.
 *
 * Üç sözleşme: (1) yalnız kurtarma isteği tanınıyor, kart gösteren öteki
 * `sentence` çağıranları tam rubrikte kalıyor; (2) sağlayıcıların bozuk JSON'u
 * okunuyor; (3) sunucunun kurduğu puan, istemcilerin (eski mobil sürümler dahil)
 * `overall ≥ 75 && task ≥ 3` eşiğinde kararla aynı sonucu veriyor.
 * Kalite ölçümü ayrı: `npm run test:translate-check` (model ister).
 */

let fails = 0;
const check = (name: string, ok: boolean, detail = "") => {
  if (ok) console.log(`  ✓ ${name}`);
  else {
    fails++;
    console.log(`  ✗ ${name}${detail ? ` → ${detail}` : ""}`);
  }
};

const rescue = (prompt: string, extra: Partial<AssessRequest> = {}): AssessRequest => ({
  kind: "sentence",
  level: "A1",
  lang: "de",
  task: { prompt, target: "Ich bin müde." },
  answer: { text: "Ich bin sehr müde heute." },
  ...extra,
});

console.log("tanıma");
check("Türkçe arayüz", isTranslateCheck(rescue("Çevir: Ben yorgunum.")));
check("İngilizce arayüz", isTranslateCheck(rescue("Translate: I am tired.")));
check("Almanca arayüz", isTranslateCheck(rescue("Übersetze: Ich bin müde.")));
check("cümle kurma (targets) tanınmıyor", !isTranslateCheck({ ...rescue("Çevir: x"), task: { prompt: "Çevir: x", targets: ["müde"] } }));
check("alıştırma kimliği varsa tanınmıyor", !isTranslateCheck(rescue("Çevir: x", { exerciseId: "de-a1-01-s1" })));
check("kısıt varsa tanınmıyor", !isTranslateCheck({ ...rescue("Çevir: x"), task: { prompt: "Çevir: x", target: "y", constraints: ["Perfekt kullan"] } }));
check("yazma türü tanınmıyor", !isTranslateCheck(rescue("Çevir: x", { kind: "writing" })));
check("başka görev metni tanınmıyor", !isTranslateCheck(rescue("'Tisch' kelimesiyle bir cümle kur.")));

console.log("ayrıştırma");
const std = parseTranslateCheck('{"anlam_notu":"yok","anlam_dogru":true,"dilbilgisi_notu":"mich → mir","dilbilgisi_dogru":false}');
check("standart JSON", !!std && std.meaningOk && !std.grammarOk, JSON.stringify(std));
const single = parseTranslateCheck("{'anlam_notu':'yok','anlam_dogru':true,'dilbilgisi_notu':'yok','dilbilgisi_dogru':true}");
check("tek tırnaklı JSON (gpt-oss)", !!single && translateAccepted(single), JSON.stringify(single));
const bare = parseTranslateCheck("{anlam_notu:olumsuzluk eksik,anlam_dogru:false,dilbilgisi_notu:yok,dilbilgisi_dogru:true}");
check("tırnaksız JSON (gpt-oss)", !!bare && !bare.meaningOk && bare.grammarOk, JSON.stringify(bare));
const inner = parseTranslateCheck('{"anlam_notu":""hier" eklenmiş","anlam_dogru":true,"dilbilgisi_notu":"yok","dilbilgisi_dogru":true}');
check("değer içinde çift tırnak", !!inner && translateAccepted(inner), JSON.stringify(inner));
check("karar alanı yoksa okunmuyor", parseTranslateCheck('{"anlam_notu":"yok"}') === null);
check("JSON yoksa okunmuyor", parseTranslateCheck("Bu çeviri doğru.") === null);

console.log("iki tarafı aynı not");
check("bezahle değil, bezahle", sameBothSides("bezahle değil, bezahle (yazım hatası)"));
check("X → X", sameBothSides("Bushaltestelle → Bushaltestelle"));
check("gerçek düzeltme kalıyor", !sameBothSides("mich → mir"));
check("açıklama kalıyor", !sameBothSides("haben yerine sein kullanılmalı (bin gegangen)"));
const same = parseTranslateCheck('{"anlam_notu":"yok","anlam_dogru":true,"dilbilgisi_notu":"bezahle → bezahle","dilbilgisi_dogru":false}');
check("aynı notlu ret kabule dönüyor", !!same && translateAccepted(same));

console.log("gösterilmemiş hata (yalnız gerçek düzeltme kalır)");
const BEZ = "Ich bezahle meine Miete immer am Monatsanfang.";
check("'bezahle olmalıydı' → hata yok", noteShowsNoError("bezahle olmalıydı", BEZ));
check("'bezahle → bezahle' → hata yok", noteShowsNoError("bezahle -> bezahle", BEZ));
check("'zahle → bezahle' → hata yok", noteShowsNoError("zahle → bezahle", BEZ));
/* Ölçümde görülen GERÇEK hata notları: hepsi hata olarak kalmalı (yanlış kabul olmasın). */
const REAL: [string, string][] = [
  ["Können Sie mich helfen?", "mich → mir"],
  ["Ich suche einen neue Job.", "einen neue → einen neuen"],
  ["Ich lese abends normalerweise eine Buch.", "eine Buch -> ein Buch"],
  ["It will raining tomorrow.", "will'den sonra fiil yalın olmalı (raining -> rain)"],
  ["It will raining tomorrow.", "will raining → will rain"],
  ["Gestern habe ich ins Kino gegangen.", "habe yerine bin kullanılmalı"],
  ["Wo ist der Bushaltestelle?", "der Bushaltestelle -> die Bushaltestelle"],
  ["Was machst du in Wochenende?", "yanlış edat; in Wochenende yerine am Wochenende olmalı"],
  ["Mein Bruder sind Arzt.", "Bruder için 'sind' değil 'ist' kullanılmalı"],
  ["She go running every morning.", "she go → she goes"],
  ["Sollen wir heute Abend Pizza gegessen?", "gegessen yerine essen olmalı"],
  ["My brother is more tall than me.", "tall tek heceli olduğu için 'taller' olmalı"],
  ["Ich habe eine sehr schöne Wohnung finden.", "finden → gefunden olmalı"],
  ["Am Montag ich habe eine Besprechung.", "sözcük sırası yanlış; fiil ikinci sırada olmalı"],
];
for (const [said, note] of REAL) check(`gerçek hata kalıyor: ${note}`, !noteShowsNoError(note, said));

console.log("istemci eşiği (overall ≥ 75 && task ≥ 3)");
const req = rescue("Çevir: Ben yorgunum.");
const clientAccepts = (meaningOk: boolean, grammarOk: boolean) => {
  const a = translateCheckAssessment(req, { meaningOk, grammarOk, meaningNote: "", grammarNote: "" });
  return a.score.overall >= 75 && a.score.task >= 3;
};
check("anlam + dilbilgisi doğru → kabul", clientAccepts(true, true));
check("yalnız dilbilgisi hatası → ret", !clientAccepts(true, false));
check("yalnız anlam farkı → ret", !clientAccepts(false, true));
check("ikisi de yanlış → ret", !clientAccepts(false, false));
const rejected = translateCheckAssessment(req, { meaningOk: false, grammarOk: true, meaningNote: "olumsuzluk eksik", grammarNote: "yok" });
check("retle düzeltme örnek çeviri", rejected.corrected === "Ich bin müde.");
check("retle not ipucunda", rejected.next_tip_tr === "olumsuzluk eksik", rejected.next_tip_tr);

console.log("\nV2 denetimi (modelden önce)");
check("Wir zusammen sind … → bozuk", v2Broken("Wir zusammen sind sehr glücklich.", "Wir sind sehr glücklich zusammen."));
check("Zum Frühstück ich trinke … → bozuk", v2Broken("Zum Frühstück ich trinke einen Tee.", "Zum Frühstück trinke ich einen Tee."));
check("Morgen ich kaufe ein → bozuk", v2Broken("Morgen ich kaufe ein.", "Ich kaufe morgen ein."));
check("Ich trinke zum Frühstück … → geçerli", !v2Broken("Ich trinke zum Frühstück einen Tee.", "Zum Frühstück trinke ich einen Tee."));
check("Morgen kaufe ich ein → geçerli", !v2Broken("Morgen kaufe ich ein.", "Ich kaufe morgen ein."));
check("Wir sind zusammen sehr glücklich → geçerli", !v2Broken("Wir sind zusammen sehr glücklich.", "Wir sind sehr glücklich zusammen."));
check("Zum Frühstück trinke ich (çok sözcüklü ilk öğe) → geçerli", !v2Broken("Zum Frühstück trinke ich Tee.", "Ich trinke Tee zum Frühstück."));
check("Und ich trinke … (bağlaç) → geçerli", !v2Broken("Und ich trinke Tee.", "Ich trinke Tee."));
check("soru hedefi → bakılmaz", !v2Broken("Welche Größe das ist?", "Welche Größe ist das?"));
check("öznesiz hedef → bakılmaz", !v2Broken("Zum Fest kommen meine Eltern.", "Meine Eltern kommen zum Fest."));
check("başka fiil → bakılmaz", !v2Broken("Ich habe morgen Zeit.", "Ich kaufe morgen ein."));

if (fails) {
  console.log(`\n${fails} başarısız`);
  process.exit(1);
}
console.log("\ntamam");
