/**
 * Ders içeriği doğrulaması: `npm run check:lessons`
 *
 * Veritabanı gerektirmez; kataloğu okur ve içerik sözleşmesini denetler.
 * İçerik üreten ajanın her partiden sonra çalıştırması zorunlu (bkz.
 * data/lessons-plan/SPEC.md): tip denetimi yapının doğruluğunu, bu betik
 * PEDAGOJİNİN sözleşmesini denetliyor — kelimeler gerçekten söyletiliyor mu,
 * puanlanan adım yeterli mi, doğru/yanlış cevapları tek kalıba saplanmış mı.
 *
 * İki seviye var: HATA (çıkış kodu 1 — parti kabul edilmez) ve UYARI
 * (yayına engel değil ama üretici gözden geçirmeli).
 */
import { LESSONS, lessonsFor, findLesson } from "../src/lib/lessons";
import { scoredSteps, type Lesson } from "../src/lib/lessons/types";
import { roleplayPrompt } from "../src/lib/lessons/roleplay";
import { courseOrDefault } from "../src/lib/courses";

let fails = 0;
let warns = 0;
function check(name: string, ok: boolean, extra = "") {
  if (!ok) fails++;
  console.log(`${ok ? "✓" : "✗"} ${name} ${extra}`.trimEnd());
}
function warn(name: string, ok: boolean, extra = "") {
  if (ok) return;
  warns++;
  console.log(`! ${name} ${extra}`.trimEnd());
}

const repeatsOf = (l: Lesson) =>
  l.lecture
    .filter((s) => s.expect?.kind === "repeat")
    .map((s) => (s.expect as { target: string }).target.toLowerCase());

console.log(`Katalog: ${LESSONS.length} ders\n`);

// ── Katalog bütünlüğü ──
check("kimlikler benzersiz", new Set(LESSONS.map((l) => l.id)).size === LESSONS.length);
/*
  Kimlik ÖNEKİ kursa bağlı: `de-a1-…`, `zh-a1-…`, `en-a1-…`.

  Kural eskiden yalnız iki kursu biliyordu ("gsw-zh ise zh, değilse de") ve
  İngilizce kurs eklenince `en-a1-hello` gibi DOĞRU kimlikleri hata sayıyordu —
  dört ders yüzünden kapı kırmızı duruyordu. Aynı sınıf bu depoda başka
  yerlerde de çıktı (`speechLocale`, sabit `lang="de"`): tek kurs varsayımı,
  kurs eklenince sessizce yanlışa dönüşüyor.
*/
const idPrefix = (course: string) => (course === "gsw-zh" ? "zh" : course);
const idOk = (l: { id: string; course: string; level: string }) =>
  new RegExp(`^${idPrefix(l.course)}-${l.level.toLowerCase()}-[a-z0-9-]+$`).test(l.id);
check("kimlikler kurallı (kurs-seviye-slug)",
  LESSONS.every(idOk),
  `(${LESSONS.filter((l) => !idOk(l)).map((l) => l.id).slice(0, 4).join(", ")})`);
check("kimlikle bulunuyor", findLesson(LESSONS[0].id)?.id === LESSONS[0].id);
check("kurs süzgeci karıştırmıyor", lessonsFor("gsw-zh").every((l) => l.course === "gsw-zh"));

// ── Ders başına sözleşme ──
for (const l of LESSONS) {
  const id = l.id;
  const bad = (msg: string, extra = "") => check(`${id}: ${msg}`, false, extra);
  const ok = (cond: boolean, msg: string, extra = "") => {
    if (!cond) bad(msg, extra);
  };

  ok(l.title.trim().length > 0 && l.titleTr.trim().length > 0, "başlıklar dolu");
  ok(l.summary.trim().length > 15, "özet bir cümle");
  ok(l.focusId.trim().length > 0, "odak kimliği var");
  ok(l.minutes >= 6 && l.minutes <= 15, "süre 6-15 dk", `(${l.minutes})`);
  // Sözlükçe boyu seviyeye bağlı: bir patika havuzun kendi katmanını
  // kapsayacak kadar kelime taşımak zorunda (ders × 8). B2 de sekize çıktı:
  // 100 × 5 = 500 yuva ile B2 katmanının (2061 madde) ancak dörtte biri
  // öğretilebiliyordu. C1 hâlâ 5 — sırası gelmedi.
  ok(l.vocab.length === 8, "tam 8 kelime", `(${l.vocab.length})`);
  ok(l.patterns.length >= 2 && l.patterns.length <= 3, "2-3 kalıp", `(${l.patterns.length})`);
  ok(
    l.vocab.every((v) => v.de.trim() && v.tr.trim()),
    "kelime çiftleri dolu",
  );

  // Anlatım iskeleti
  ok(l.lecture[0]?.expect?.kind === "confirm", "onayla başlıyor");
  ok(l.lecture.length >= 14 && l.lecture.length <= 24, "anlatım 14-24 adım", `(${l.lecture.length})`);
  ok(!l.lecture[l.lecture.length - 1]?.expect, "kapanış adımı beklentisiz");
  ok(
    l.lecture.every((s) => s.say.length > 0 && s.say.every((seg) => seg.text.trim().length > 0)),
    "bütün segmentler dolu",
  );
  /*
    Segment ya ANADİL ya KURSUN HEDEF DİLİ. Kural eskiden yalnız "tr" ve "de"
    kabul ediyordu; İngilizce dersler doğru biçimde `en` segmenti taşıyor ve
    kapı onları hata sayıyordu. Ölçüldü: `de` kursu {de, tr}, `en` kursu
    {en, tr} kullanıyor - başka dil yok.
  */
  const targetLang = l.course === "en" ? "en" : "de";
  ok(
    l.lecture.every((s) =>
      s.say.every((seg) => seg.lang === "tr" || seg.lang === targetLang),
    ),
    "segment dilleri geçerli",
    `(${l.course} → tr/${targetLang})`,
  );
  /*
    Türkçe parçanın içinde ALINTILANMIŞ HEDEF DİL CÜMLESİ durmamalı.

    Sebep seslendirme: ses dili PARÇADAN seçiliyor, yani model cümle Türkçe
    sesle okunuyor — öğrencinin tekrar edeceği cümle yanlış telaffuzla
    geliyor. Doğrusu cümleyi kendi `de(...)`/`en(...)` parçasına almak;
    oynatıcı onu zaten marka rengiyle ve kalın yazıyor (lesson-player).

    ÖLÇÜT NE SAYMIYOR — Türkçe cümlenin içindeki TEK terim: "als mi wenn mi",
    "Plusquamperfekt", "I would like", "on the weekend". Bunlar anlatımın
    KONUSU, öğrenci onları tekrar etmiyor ve ayrı parçaya almak cümleyi
    paramparça ederdi. Eski ölçüt ß/ä arıyordu ve tam bu ikisini
    ayıramıyordu: "während" ile "'Während er kocht, deckt sie den Tisch.'"
    aynı uyarıyı veriyordu, yani uyarı ne temizlenebiliyordu ne de bir şey
    söylüyordu.

    Ayrım ÖLÇÜLDÜ (2026-09-12): 11 derste 37 alıntı cümlesi vardı ve hepsi
    kendi parçasına alındı; aynı taramada 25 kısa alıntı terim çıktı ve
    onlar bilerek bırakıldı. Kesme işareti kısaltmada da kullanıldığı için
    (don't, I'd) açıklık yalnız tırnak sözcüğe bitişik DEĞİLSE alıntı
    sayılıyor — bitişik sayılsaydı İngilizce kursta altı uydurma "cümle"
    çıkıyordu, ölçüldü.
  */
  const FOREIGN_WORD =
    l.course === "en"
      ? /\b(i|you|he|she|it|we|they|is|are|was|were|have|has|had|do|does|did|not|a|an|the|and|or|but|to|with|on|for|of|in|at|my|your|can|will|would|there|this|that)\b/gi
      : /\b(ich|du|er|sie|es|wir|ihr|ist|sind|war|waren|habe|hat|haben|bin|nicht|ein|eine|einen|der|die|das|den|dem|und|oder|aber|zu|mit|auf|für|von|im|in|am|man|wird|kann|muss|will|soll|dass|weil|wenn|als|wie|mehr|noch|auch)\b/gi;
  const quotedSentence = (t: string) =>
    [...t.matchAll(/(?<=^|[\s(:—–-])'([^']{6,})'(?=$|[\s.,;:!?)…—–])/g)].some((m) => {
      const span = m[1].trim();
      if (/[ışğİĞŞ]/.test(span)) return false; // Türkçe alıntı
      FOREIGN_WORD.lastIndex = 0;
      if ((span.match(FOREIGN_WORD) ?? []).length < 2) return false;
      const words = span.split(/\s+/).length;
      return words >= 4 && (/[.!?…]$/.test(span) || words >= 5);
    });
  const leakage = l.lecture.flatMap((s) => s.say.filter((seg) => seg.lang === "tr" && quotedSentence(seg.text)));
  ok(leakage.length === 0, "Türkçe parçada alıntılanmış hedef dil cümlesi yok",
    `(${leakage.slice(0, 2).map((s) => s.text.slice(0, 40)).join(" | ")})`);

  /*
    AYNI DERSTE İKİ KEZ ÖĞRETİLEN KELİME. Ders kelimeyi bir adımda açıklıyor
    ("floor … demek"), sonra ilerideki bir adımda sıfırdan tanıtıyor:
    "Bir kelime daha: floor · Türkçesi: kat. Lütfen tekrar et:". Öğrenci
    aynı kelimeyi iki kez "yeni" diye alıyor ve dersin sekiz yuvasından biri
    boşa gidiyor — havuz A1'de zaten dar (aşağıdaki yineleme ölçümüne bak).

    Kaynağı ölçüldü: sözlükçeyi 5'ten 8'e çıkaran iş (2026-09-11) yeni
    kelimeleri dersin SONUNA şablon adımıyla ekledi ve dersin gövdesinde
    hâlihazırda açıklanmış kelimeyi göremedi. 2026-09-12'de 36 vaka
    bulundu ve HEPSİ kapatıldı (havuzda boşta duran kelimelerle), o yüzden
    ölçüt uyarı değil HATA.

    C1'de bir ders bilerek önce çifti tanıtıp sonra tek tek çalıştırıyor
    (`de-c1-praezision`: "scheinbar ≠ anscheinend" kalıbı dersin konusu).
    Ölçüt onu saymıyor çünkü o adımlar dört parçadan uzun — yani sınır
    tesadüf değil, önizleme-sonra-drill kalıbını dışarıda bırakıyor.

    Ölçüt DAR tutuldu: yalnız şablon adımı ("Bir kelime daha:" ile açılan,
    dört parçalık) ve yalnız kelimenin TEK BAŞINA geçtiği önceki bir adım
    sayılıyor. Cümle içinde geçmek sayılmıyor — ders örnek cümleyi önce
    duyurup sonra kelimeyi öğretebilir, o kusur değil.
  */
  const TEMPLATE_OPEN = /^(Bir kelime daha|Sıradaki|İlk kelimemiz|İkinci kelimemiz|Kelimemiz|Son kelimemiz)\b/;
  const twiceTaught = l.lecture.filter((s, i) => {
    const e = s.expect as { kind?: string; target?: string } | undefined;
    if (e?.kind !== "repeat" || !e.target) return false;
    if (!TEMPLATE_OPEN.test(s.say[0]?.text ?? "") || s.say.length > 4) return false;
    const w = e.target.trim().toLowerCase();
    return l.lecture.slice(0, i).some(
      (st) =>
        st.say.some((x) => x.lang !== "tr" && x.text.trim().toLowerCase() === w) &&
        st.say.some((x) => x.lang === "tr" && /demek/.test(x.text)),
    );
  });
  ok(twiceTaught.length === 0, "kelime aynı derste iki kez öğretilmiyor",
    `(${twiceTaught.map((s) => (s.expect as { target: string }).target).join(", ")})`);

  // Her kelime sesli tekrar ettiriliyor
  const reps = repeatsOf(l);
  const missing = l.vocab.filter((v) => !reps.some((t) => t.includes(v.de.toLowerCase())));
  ok(missing.length === 0, "her kelime tekrar ettiriliyor",
    missing.length ? `(eksik: ${missing.map((v) => v.de).join(", ")})` : "");

  // Puanlanan adımlar
  const produces = l.lecture.filter((s) => s.expect?.kind === "produce");
  const tfs = l.lecture.filter((s) => s.expect?.kind === "truefalse");
  ok(produces.length >= 2, "en az 2 üretim", `(${produces.length})`);
  ok(tfs.length >= 1, "en az 1 doğru/yanlış", `(${tfs.length})`);
  ok(scoredSteps(l) >= 3, "puanlanan adım >= 3", `(${scoredSteps(l)})`);
  for (const s of produces) {
    const e = s.expect as { target: string; hint: { text: string }[] };
    ok(e.target.trim().length > 0, "üretim hedefi dolu");
    ok(e.hint.length > 0 && e.hint.every((h) => h.text.trim().length > 0), "üretim ipucu dolu");
    // İpucu DOĞRU CÜMLENİN TAMAMINI söylemeli: "yanlış" demek öğretmez ve
    // yarım ipucu ikinci denemeyi tahmin oyununa çevirir. Eskiden bu gevşek bir
    // uyarıydı (son iki kelime ya da uzun bir metin yeterdi); kalite taraması
    // 500 dersin 500'ünde tam cümlenin zaten verildiğini gösterdi, o yüzden
    // artık sözleşme: gevşek eşik gerçek bir eksiği örtebilirdi.
    const norm = (x: string) => x.toLowerCase().replace(/[.,!?…]/g, "").replace(/\s+/g, " ").trim();
    ok(norm(e.hint.map((h) => h.text).join(" ")).includes(norm(e.target)),
      "ipucu doğru cümleyi içeriyor", `(${e.target.slice(0, 40)})`);
  }
  for (const s of tfs) {
    const e = s.expect as { statement: string; why: { text: string }[]; answer: boolean };
    ok(e.statement.trim().length > 0, "doğru/yanlış cümlesi dolu");
    ok(e.why.length > 0, "doğru/yanlış gerekçesi dolu");
    /* Cümle, adımın söylediği metinde geçmeli — öğrenci neyi yargılayacağını
       duymalı. PARÇANIN DİLİ KURSTAN geliyor: ölçüt `lang === "de"` yazılıydı
       ve İngilizce kursun parçaları `en` etiketli, yani kural o kursun 200
       dersinde HİÇ geçemiyordu — içerik kusuru değil, kapının kendisi iki kurs
       varken görünmeyen bir varsayım taşıyordu (`hasModuleExams` ve
       `targetLang` ile aynı sınıf). */
    const tag = courseOrDefault(l.course).targetLang;
    ok(
      s.say.some((seg) => seg.lang === tag && seg.text.includes(e.statement.replace(/[.?!]$/, "").slice(0, 12))),
      "yargılanan cümle seste geçiyor",
    );
  }

  // Konuşma fazı
  ok(l.roleplay.scene.trim().length > 30, "sahne yeterince anlatılmış");
  ok(l.roleplay.partner.trim().length > 5, "rol tanımı var");
  ok(l.roleplay.opening.trim().length > 0 && l.roleplay.openingTr.trim().length > 0, "açılış çift dilli");
  ok(l.roleplay.opening.includes("?"), "açılış soruyla bitiyor");
  // Konuşmanın amacı: sahnenin kopyası olmamalı ve bir SONUÇ söylemeli.
  // Dört turluk sahnelerde bu alan yoktu ve konuşma bitmiyor, kesiliyordu.
  ok(l.roleplay.goal.trim().length > 25, "konuşmanın amacı yazılmış", `(${l.roleplay.goal.length})`);
  ok(l.roleplay.goal.trim() !== l.roleplay.scene.trim(), "amaç sahnenin kopyası değil");
  ok(l.roleplay.minTurns >= 6 && l.roleplay.minTurns <= 9, "tur alt sınırı 6-9", `(${l.roleplay.minTurns})`);
  // Senaryolu derste çevrimdışı yol da alt sınıra ulaşabilmeli; yoksa
  // sağlayıcısız ortamda ders hiç geçilemez.
  ok(!l.roleplay.script || l.roleplay.script.length >= l.roleplay.minTurns,
    "senaryo tur sayısı alt sınırı karşılıyor",
    l.roleplay.script ? `(${l.roleplay.script.length} < ${l.roleplay.minTurns})` : "");
  const prompt = roleplayPrompt(l);
  ok(l.patterns.every((p) => prompt.includes(p.de)), "istem kalıpları taşıyor");
  ok(l.vocab.every((v) => prompt.includes(v.de)), "istem kelimeleri taşıyor");
  ok(prompt.includes(l.roleplay.goal), "istem konuşmanın amacını taşıyor");

  /*
    Tekrar/üretimden SONRAKİ adım övgüyle BAŞLAMAMALI. İki ayrı kusur, ikisi de
    ölçüldü (2026-09-12, İngilizce kursta 121 adım / 85 ders):

    1. ÜST ÜSTE BİNME. Doğru cevaptan sonra motor övgüyü sıradaki cümlenin
       başına ekliyor (`lesson-player.tsx` → `PRAISE_KEYS`, "Çok iyi!",
       "Harika!", "Süper!", "Çok güzel söyledin!", "Mükemmel!"). Adım kendi
       övgüsüyle açılırsa öğrenci ikisini arka arkaya duyuyor — 15 adımda
       AYNI sözcük iki kez ("Çok iyi! Çok iyi. İkinci kelime:").
    2. YANLIŞ CEVAPTAN SONRA ÖVGÜ — daha keskin olan. Motorun övgüsü yola
       bağlı: atlanan ya da üç denemede geçilemeyen adımda eklenmiyor. İçeriğe
       yazılan övgü ise HER YOLDA okunuyor; öğrenci üç kez yanılıp geçtiğinde
       ders ona "Güzel." diyor.

    Bu yüzden övgü içerikte değil motorda durur. (Doğru/yanlış ve kapanış
    adımlarından sonra motor övgü eklemiyor; oralarda içerik övgüsü serbest.)

    Ölçüt İLK CÜMLEye bakıyor: kısa (≤30 karakter) ve övgü köküyle başlıyorsa
    övgüdür. Eski biçim yalnız beş sözcüğü tanıyordu ve gerçek 121 adımın
    65'ini görüyordu — "Güzel." (51 kez) hiç sayılmıyordu.
  */
  const PRAISE_ROOT = /^(çok iyi|çok güzel|iyi|güzel|harika|süper|mükemmel|bravo|aferin|tebrikler)/i;
  const doublePraise = l.lecture.filter((s, i) => {
    const prev = l.lecture[i - 1]?.expect?.kind;
    if (prev !== "repeat" && prev !== "produce") return false;
    const opener = /^[^.!?]{1,30}[.!]/.exec(s.say[0]?.text ?? "")?.[0] ?? "";
    return PRAISE_ROOT.test(opener);
  });
  ok(doublePraise.length === 0, "övgü üst üste binmiyor",
    `(${doublePraise.slice(0, 1).map((s) => s.say[0].text.slice(0, 30)).join("")})`);
}

// ── Katalog geneli ──
// Doğru/yanlış cevapları tek kalıba saplanmamalı: hepsi "yanlış" olursa
// öğrenci cümleyi okumadan cevabı ezberliyor.
const answers = LESSONS.flatMap((l) =>
  l.lecture
    .filter((s) => s.expect?.kind === "truefalse")
    .map((s) => (s.expect as { answer: boolean }).answer),
);
const trueRatio = answers.length ? answers.filter(Boolean).length / answers.length : 0;
warn("doğru/yanlış dengesi (hedef %25-60 doğru)",
  answers.length < 8 || (trueRatio >= 0.25 && trueRatio <= 0.6),
  `(doğru oranı ${(trueRatio * 100).toFixed(0)}%)`);

// Aynı kelime iki derste "yeni" diye öğretilmemeli (seviye içinde).
//
// UYARI SAYISI BİR YAPILACAKLAR LİSTESİ DEĞİL — aritmetiği 2026-09-12'de
// ölçüldü ve İngilizce kursun A1'inde tabanı HAVUZ belirliyor:
//
//   en A1  yuva 800 · havuz 692 → en az 108 yineleme ZORUNLU (ölçülen 128)
//   en A2  yuva 800 · havuz 1108 → zorunlu yineleme yok (ölçülen 92)
//   en B1/B2/C1  yineleme yok (havuz 1516/2225/1634)
//
// Yani A1'deki 128 uyarının 108'i kapatılamaz; kapatmaya çalışmak dersten
// temasına ait kelimeyi söküp havuzun artığını ("kral", "önlük") koymak
// demek olurdu. A2'nin 92'si ise gerçekten açık: 484 kelime boşta duruyor.
// Yinelemenin 71'i şablon adımıyla öğretiliyor (ucuz takas), kalanı dersin
// gövdesine dokunmuş durumda (takas dersi bozar).
//
// Anahtar SEVİYE + HEDEF DİL: kurs değil, çünkü aynı dili öğreten iki kurs
// (de ve gsw-zh) aynı kelimeyi iki kez öğretmemeli. Ama AYRI dil öğreten iki
// kurs çakışmaz: Almanca dersteki "wild" ile İngilizce dersteki "wild" aynı
// yazılıyor, farklı kelime ve hiçbir öğrenci ikisini birden görmüyor —
// seviye tek başına anahtar olsaydı bu eş yazımlar uyarı üretirdi.
const seen = new Map<string, string>();
for (const l of LESSONS) {
  const lang = courseOrDefault(l.course).targetLang;
  for (const v of l.vocab) {
    const key = `${l.level}:${lang}:${v.de.toLowerCase()}`;
    if (seen.has(key)) {
      warn(`yinelenen kelime: ${v.de}`, false, `(${seen.get(key)} ve ${l.id}, ${l.level})`);
    } else {
      seen.set(key, l.id);
    }
  }
}

// Üretim hedefleri birbirinin kopyası olmamalı.
const targets = LESSONS.flatMap((l) =>
  l.lecture
    .filter((s) => s.expect?.kind === "produce")
    .map((s) => ({ id: l.id, t: (s.expect as { target: string }).target.toLowerCase() })),
);
const dupTargets = targets.filter((a, i) => targets.findIndex((b) => b.t === a.t) !== i);
warn("yinelenen üretim hedefi yok", dupTargets.length === 0,
  `(${[...new Set(dupTargets.map((d) => `${d.id}: ${d.t}`))].slice(0, 3).join(" | ")})`);

// Hüküm cümleleri de kopya olmamalı: aynı yanlışı iki kez yargılatmak yeni bir
// şey ölçmez. Uyarı, hata değil — B2 finali ile C1 finali aynı cümleyi BİLEREK
// yankılıyor (seviyenin ilk kuralına kapanışta geri dönüş).
const statements = LESSONS.flatMap((l) =>
  l.lecture
    .filter((s) => s.expect?.kind === "truefalse")
    .map((s) => ({ id: l.id, t: (s.expect as { statement: string }).statement.toLowerCase() })),
);
const dupStatements = statements.filter((a, i) => statements.findIndex((b) => b.t === a.t) !== i);
warn("yinelenen hüküm cümlesi yok", dupStatements.length <= 1,
  `(${[...new Set(dupStatements.map((d) => `${d.id}: ${d.t}`))].slice(0, 3).join(" | ")})`);

console.log(
  `\n${fails ? `${fails} HATA` : "Hata yok"} · ${warns ? `${warns} uyarı` : "uyarı yok"}`,
);
process.exit(fails ? 1 : 0);
