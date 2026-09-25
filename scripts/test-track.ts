import { buildTrack, UNIT_CONVERSATIONS, GROUP_SIZE } from "../src/lib/immersion/build";
import type { Conversation } from "../src/lib/conversations/types";
import type { CefrLevel } from "../src/lib/skills/types";
import type { SkillMeta } from "../src/lib/skills/index";
import type { ImmersionTrack } from "../src/lib/immersion/types";
import { buildTrackState, groupComplete } from "../src/lib/immersion/state";
import { buildUnitBriefs } from "../src/lib/immersion/brief";
import { deriveQuiz } from "../src/lib/immersion/quiz";
import { deriveGrammar, type GrammarText } from "../src/lib/immersion/grammar";

/* Denetim betiği sunucu değil: metinler sabit, kural sayilari olculuyor. */
const DENEME_METNI: GrammarText = { orderQuestion: "order?", orderSentence: "order.", bool: ["Richtig", "Falsch"] };
import { CONVERSATIONS } from "../src/lib/conversations/source";

let pass = 0;
const fail: string[] = [];
function check(name: string, cond: boolean) {
  if (cond) pass++;
  else fail.push(name);
}

function mkConversation(i: number, level: CefrLevel): Conversation {
  return {
    id: `de-${level.toLowerCase()}-b${String(i).padStart(2, "0")}`,
    level,
    course: "de",
    icon: "greet",
    title: `Lektion ${i}`,
    titleTr: `Konuşma ${i}`,
    summary: "x",
    minutes: 5,
    focusId: "x",
    vocab: [],
    patterns: [],
    lecture: [],
    chat: { scene: "", partner: "", opening: "", openingTr: "", goal: "", minTurns: 6 },
  };
}
function mkMeta(id: string, skill: SkillMeta["skill"], level: CefrLevel): SkillMeta {
  // `unit: null` — kütüphane egzersizi (bkz. lib/skills/types `isLibraryExercise`).
  return { id, skill, level, title: `${skill}-${id}`, genre: "İlan", minutes: 4, items: 5, unit: null };
}

const conversations = Array.from({ length: 10 }, (_, i) => mkConversation(i + 1, "A1"));
const reading = Array.from({ length: 3 }, (_, i) => mkMeta(`a1-r${i + 1}`, "reading", "A1"));
const listening = Array.from({ length: 5 }, (_, i) => mkMeta(`a1-l${i + 1}`, "listening", "A1"));
const writing = Array.from({ length: 5 }, (_, i) => mkMeta(`a1-w${i + 1}`, "writing", "A1"));

const t: ImmersionTrack = buildTrack({ course: "de", level: "A1", conversations, reading, listening, writing });

// 1. unit sayısı = ceil(konuşma/4)
check("unit sayısı ceil(10/4)=3", t.units.length === Math.ceil(10 / UNIT_CONVERSATIONS) && t.units.length === 3);

// 2. her ünite unitQuiz ile biter, tek unitQuiz
check(
  "her ünite tam bir unitQuiz ile biter",
  t.units.every((u) => u.items.at(-1)?.kind === "unitQuiz" && u.items.filter((i) => i.kind === "unitQuiz").length === 1),
);

// 3. dolu üniteler 4 konuşma + 2 read + 2 listen + 2 write taşır
const full = t.units.slice(0, 2);
check(
  "dolu ünitelerde 4/2/2/2 desen",
  full.every((u) => {
    const c = (k: string) => u.items.filter((i) => i.kind === k).length;
    return c("conversation") === 4 && c("read") === 2 && c("listen") === 2 && c("write") === 2;
  }),
);

// 4. kısmi son ünite (10 konuşma → 4+4+2): 2 konuşma, boş konuşma slotu yok
const last = t.units[2];
check("kısmi son ünitede 2 konuşma", last.conversationCount === 2 && last.items.filter((i) => i.kind === "conversation").length === 2);
check("hiçbir konuşma item'ı boş ref taşımaz", t.units.every((u) => u.items.filter((i) => i.kind === "conversation").every((i) => i.ref)));

// 5. konuşma ref'leri girdi sırasını korur
const conversationRefs = t.units.flatMap((u) => u.items.filter((i) => i.kind === "conversation").map((i) => i.ref));
check("konuşma ref'leri katalog sırasında", JSON.stringify(conversationRefs) === JSON.stringify(conversations.map((l) => l.id)));

// 6. beceri havuzu sırayla tükenir; bitince ref=null (reading 3 < ihtiyaç)
const readItems = t.units.flatMap((u) => u.items.filter((i) => i.kind === "read"));
check("reading ilk 3 slot dolu, kalan null", readItems.slice(0, 3).every((i) => i.ref) && readItems.slice(3).every((i) => i.ref === null));
check("reading ref sırası havuzu izler", JSON.stringify(readItems.slice(0, 3).map((i) => i.ref)) === JSON.stringify(reading.map((m) => m.id)));

// 7. item id'leri track genelinde benzersiz
const ids = t.units.flatMap((u) => u.items.map((i) => i.id));
check("item id'leri benzersiz", new Set(ids).size === ids.length);

// 8. her ünite TAM TAKIM: grammar + quiz + unitQuiz
check("her ünite grammar taşır", t.units.every((u) => u.items.some((i) => i.kind === "grammar")));
check("her ünite quiz taşır", t.units.every((u) => u.items.some((i) => i.kind === "quiz")));
check("ünite 1 tam takım (grammar+quiz+unitQuiz)", ["grammar", "quiz", "unitQuiz"].every((k) => t.units[0].items.some((i) => i.kind === k)));

// 9. group = floor((index-1)/groupSize)
check("group = floor((index-1)/GROUP_SIZE)", t.units.every((u) => u.group === Math.floor((u.index - 1) / GROUP_SIZE)));

// 10. tema ünitenin ilk konuşmasının modülünden (A1 ilk modül teması)
check("ünite 1 teması A1 ilk modül", t.units[0].theme === "Tanışma ve ben");

// 11. boş seviye → 0 ünite
check("konuşmayı olmayan seviye 0 ünite", buildTrack({ course: "de", level: "C1", conversations: [] }).units.length === 0);

// 12. beceri hiç yoksa read/listen/write slotları null ama var
const noSkills = buildTrack({ course: "de", level: "A1", conversations });
check("beceri içeriği yoksa slotlar null yer tutucu", noSkills.units[0].items.filter((i) => i.kind === "read").every((i) => i.ref === null && i.title === "Okuma"));


// ---- state / gating (saf) ----
const u1 = t.units[0];
const u1Refs = u1.items.filter((i) => i.ref).map((i) => i.ref as string);
const s0 = buildTrackState(t, { conversationDone: () => false, skillDone: () => false });
check("boşken ünite1 kilitsiz, ünite2/3 kilitli", !s0.units[0].locked && s0.units[1].locked && s0.units[2].locked);
check("boşken currentIndex=1", s0.currentIndex === 1);
check("ünite1 oynanabilir toplam=10 (4+2+2+2), done=0", s0.units[0].total === 10 && s0.units[0].done === 0);
check("ünite1 iskelet 4 konuşma, 0 bitti", s0.units[0].conversationsTotal === 4 && s0.units[0].conversationsDone === 0);
check("unitQuiz artık oynanabilir (türetilen pratik)", s0.units[0].items.find((i) => i.item.kind === "unitQuiz")?.playable === true);
check("unitQuiz/quiz sayıma girmez (total=10, konuşma+beceri)", s0.units[0].total === 10);
check("unitQuiz/quiz ref = unitId (türetme rotası)", t.units[1].items.filter((i) => i.kind === "unitQuiz" || i.kind === "quiz").every((i) => i.ref === t.units[1].id));

const doneSet = new Set(u1Refs);
const s1 = buildTrackState(t, { conversationDone: (r) => doneSet.has(r), skillDone: (r) => doneSet.has(r) });
check("ünite1 tümü bitince complete", s1.units[0].complete && s1.units[0].done === s1.units[0].total);
check("ünite1 bitince ünite2 açılır, ünite3 kilitli", !s1.units[1].locked && s1.units[2].locked);
check("currentIndex ünite2'ye ilerler", s1.currentIndex === 2);

const u1Conversations = new Set(u1.items.filter((i) => i.kind === "conversation").map((i) => i.ref as string));
const s2 = buildTrackState(t, { conversationDone: (r) => u1Conversations.has(r), skillDone: () => false });
/*
  İKİ AYRI SORU. "Sonraki ünite açılsın mı?" konuşmalara bakar (beceri içeriği
  seyrek, onu kapı yapmak eksik içeriği zorunlu kılardı). "Bu ünite bitti mi?"
  ise hepsine bakar. Tek bayrakken dört konuşmayı bitiren kullanıcıya, beceri
  yuvaları dururken "tamamlandı" deniyordu.
*/
check("yalnız konuşmalar bitince ünite1 BİTMİŞ SAYILMAZ", !s2.units[0].complete && s2.units[0].conversationsDone === 4 && s2.units[0].done === 4);
check("ama sonraki üniteyi AÇAR (unlocksNext)", s2.units[0].unlocksNext);
check("konuşmalar bitince ünite2 açılır (beceri bloklamaz)", !s2.units[1].locked);
check("bitmemiş ünite 'şu an buradasın' kalır", s2.currentIndex === 1);

/*
  PRATİK ADIMLAR KAYITLIYSA SAYIMA GİRER. Dil bilgisi, tekrar ve kontrol
  noktasının "bitti" kaydı yokken ünite ekranı 13 adım gösterip 10 üzerinden
  sayıyordu; kayıt verilince ölçüt tek: oynanabilir her adım.
*/
const u1Practice = u1.items.filter((i) => i.kind === "grammar" || i.kind === "quiz" || i.kind === "unitQuiz");
const u1Oynanabilir = u1.items.filter((i) => i.ref !== null);
const sP0 = buildTrackState(t, { conversationDone: () => false, skillDone: () => false, practiceDone: () => false, practiceAttempted: () => false });
check("pratik kaydı verilince toplam = oynanabilir adım sayısı", sP0.units[0].total === u1Oynanabilir.length && u1Practice.length === 3);
check("pratik adım sırayı harcar: başta yalnız ilk adım açık", sP0.units[0].items.filter((i) => i.open).length === 1);
const practiceIds = new Set(u1Practice.map((i) => i.id));
const sP1 = buildTrackState(t, {
  conversationDone: (r) => doneSet.has(r),
  skillDone: (r) => doneSet.has(r),
  practiceDone: (id) => practiceIds.has(id),
  practiceAttempted: (id) => practiceIds.has(id),
});
check("konuşma+beceri+pratik bitince ünite complete ve done=total", sP1.units[0].complete && sP1.units[0].done === sP1.units[0].total);
const sP2 = buildTrackState(t, { conversationDone: (r) => doneSet.has(r), skillDone: (r) => doneSet.has(r), practiceDone: () => false, practiceAttempted: () => false });
check("pratik adımları bitmeden ünite complete sayılmaz", !sP2.units[0].complete && sP2.units[0].done === sP2.units[0].total - 3);
check("pratik adımlar sonraki üniteyi kilitlemez (kapı konuşmalar)", !sP2.units[1].locked);
check("konuşmalar ve beceriler bitince ilk pratik adım (gramer) açılır", sP2.units[0].items.find((i) => i.item.kind === "grammar")?.open === true);

const sAll = buildTrackState(t, { conversationDone: () => true, skillDone: () => true });
check("her şey bitince tüm üniteler complete", sAll.units.every((u) => u.complete));
check("grup 0 tamamlanmış (groupComplete)", groupComplete(sAll, 0) && !groupComplete(s0, 0));
check("her şey bitince currentIndex son ünite", sAll.currentIndex === (t.units.at(-1)?.index ?? -1));


// ---- kayan pencere: kapı USTALIĞA değil İLERLEMEYE bağlı ----
// Bir beceriden geçer not alamayan öğrenci orada takılmamalı; sıradakine
// geçebilmeli ama daha sonrakine geçememeli.
const u1Playable = s0.units[0].items.filter((i) => i.playable);
check("boşken yalnız İLK oynanabilir adım açık", u1Playable.filter((i) => i.open).length === 1 && u1Playable.find((i) => i.open) === u1Playable[0]);
check("boşken 2. adım kapalı", u1Playable[1].open === false);
check("kilitli ünitenin hiçbir adımı açık değil", s0.units[1].items.every((i) => !i.open));

// İlk adım DENENDİ ama geçilemedi (done değil, attempted)
const ilkRef = u1Playable[0].item.ref as string;
const sTried = buildTrackState(t, {
  conversationDone: () => false,
  skillDone: () => false,
  conversationAttempted: (r) => r === ilkRef,
  skillAttempted: (r) => r === ilkRef,
});
const p1 = sTried.units[0].items.filter((i) => i.playable);
check("denenen adım açık kalır (tekrar edilebilir)", p1[0].open && p1[0].attempted && !p1[0].done);
check("deneme SIRADAKİNİ açar", p1[1].open === true);
check("bir sonraki hâlâ kapalı", p1[2].open === false);
check("deneme üniteyi TAMAMLAMAZ", !sTried.units[0].complete && sTried.units[1].locked);

// İkincisi de denenince pencere bir adım daha kayar
const ikiRef = new Set([ilkRef, p1[1].item.ref as string]);
const sTried2 = buildTrackState(t, {
  conversationDone: () => false,
  skillDone: () => false,
  conversationAttempted: (r) => ikiRef.has(r),
  skillAttempted: (r) => ikiRef.has(r),
});
const p2 = sTried2.units[0].items.filter((i) => i.playable);
check("pencere ilerledikçe kayar", p2[0].open && p2[1].open && p2[2].open && p2[3].open === false);

// Biten adım kendiliğinden denenmiş sayılır (eski çağıranlar bozulmasın)
// quiz/unitQuiz bugün done takibi taşımıyor; ölçüt konuşma + beceri.
const izlenen = (k: string) => k === "conversation" || k === "read" || k === "listen" || k === "write";
check("bitmiş adım attempted sayılır", s1.units[0].items.filter((i) => i.playable && izlenen(i.item.kind)).every((i) => i.attempted));
check("attempted yüklemi verilmezse eski davranış (yalnız bitenler + sıradaki)",
  s2.units[0].items.filter((i) => i.playable && !i.done).filter((i) => i.open).length === 1);

// ---- content brief (conversation'a göre türetme) ----
const bl = (i: number, vocab: [string, string][], patterns: [string, string][], cando: string[]) => ({
  ...mkConversation(i, "A1"),
  vocab: vocab.map(([de, tr]) => ({ de, tr })),
  patterns: patterns.map(([de, tr]) => ({ de, tr })),
  cando,
});
const briefConversations = [
  bl(1, [["Hallo", "merhaba"], ["Name", "isim"]], [["Ich heiße …", "adım …"]], ["a1.self.introduce"]),
  bl(2, [["Name", "isim"], ["Land", "ülke"]], [["Ich komme aus …", "…'denim"]], ["a1.self.origin"]),
  bl(3, [["Beruf", "meslek"]], [["Ich bin …", "…yim"]], ["a1.self.introduce"]),
  bl(4, [["Hobby", "hobi"]], [["Ich mag …", "…severim"]], ["a1.self.hobby"]),
];
const briefs = buildUnitBriefs("de", "A1", briefConversations, "tr");
check("4 konuşma → 1 brief", briefs.length === 1);
check("brief teması modülden (Tanışma ve ben)", briefs[0].theme === "Tanışma ve ben");
check("brief vocab de'ye göre tekil (Name bir kez)", briefs[0].vocab.length === 5 && briefs[0].vocab.filter((v) => v.de === "Name").length === 1);
check("brief pattern birleşik (4)", briefs[0].patterns.length === 4);
check("brief cando birleşik+tekil (introduce bir kez)", briefs[0].cando.length === 3 && briefs[0].cando.filter((c) => c === "a1.self.introduce").length === 1);
check("brief 4 conversationId + needs 2/2/2", briefs[0].conversationIds.length === 4 && briefs[0].needs.read === 2 && briefs[0].needs.listen === 2 && briefs[0].needs.write === 2);


// ---- quiz/unitQuiz türetme (brief → SkillQuestion) ----
const qpool = {
  vocab: Array.from({ length: 8 }, (_, k) => ({ de: `w${k}`, tr: `t${k}` })),
  patterns: Array.from({ length: 5 }, (_, k) => ({ de: `De${k}`, tr: `Tr${k}` })),
};
/*
  METİN ÇAĞIRANDAN GELİYOR. `deriveQuiz` soru cümlelerini kendi kurmuyor:
  arayüz dilinde çevrilmiş üç parçayı alıyor (bkz. `(app)/immersion/quiz`).
  Test onları burada sabit veriyor ki ölçtüğü şey ÇEVİRİ değil YAPI olsun —
  kalıp soruları sonda mı, tekrar soruları araya giriyor mu, seçenekler
  benzersiz mi. Eskiden Türkçe cümleyi `quiz.ts` kuruyordu ve test o cümleyi
  arıyordu; cümle çağırana taşınınca test sessizce kırmızıya döndü.
*/
const say = {
  whatMeans: (word: string) => `«${word}» ne demek?`,
  howToSay: (pattern: string) => `«${pattern}» Almanca nasıl denir?`,
  fromEarlier: "önceki ünitelerden tekrar",
};
const quiz = deriveQuiz(briefs[0], qpool, 6, undefined, say);
check("quiz 6 soru üretir", quiz.length === 6);
check("kelime sorusu de→tr, doğru cevap vocab tr", quiz[0].text.includes("Hallo") && quiz[0].options[quiz[0].answer] === "merhaba");
check("son 2 soru kalıp (tr→de)", quiz.slice(-2).every((q) => q.text.includes("nasıl denir")));
check("kalıp sorusunda doğru cevap de kalıbı", quiz[4].options[quiz[4].answer] === "Ich heiße …");
check("hiçbir distraktör doğru cevaba eşit değil", quiz.every((q) => q.options.filter((_, idx) => idx !== q.answer).every((o) => o !== q.options[q.answer])));
check("options benzersiz", quiz.every((q) => new Set(q.options).size === q.options.length));
check("deterministik (aynı girdi → aynı quiz)", JSON.stringify(deriveQuiz(briefs[0], qpool, 6, undefined, say)) === JSON.stringify(quiz));
check("unitQuiz daha uzun (count=12 → 5 vocab + 2 kalıp = 7, brief küçük)", deriveQuiz(briefs[0], qpool, 12, undefined, say).length === Math.min(12, briefs[0].vocab.length + 2));

// ---- birikimli tekrar (önceki ünitelerin kelimeleri quiz'e karışır) ----
// Ünite 3 gibi davranan sahte bir brief: kendi kelimeleri x0..x5, geçmişi r0..r19.
const laterBrief = { ...briefs[0], index: 3, vocab: Array.from({ length: 6 }, (_, k) => ({ de: `x${k}`, tr: `tx${k}` })) };
const reviewPool = {
  vocab: Array.from({ length: 20 }, (_, k) => ({ de: `r${k}`, tr: `tr${k}` })),
  patterns: [] as { de: string; tr: string }[],
};
const cum = deriveQuiz(laterBrief, qpool, 12, reviewPool, say);
const backQ = cum.filter((q) => q.explain?.includes("önceki ünitelerden tekrar"));
check("tekrar havuzu verilince geçmişten soru gelir (12 → 4)", backQ.length === 4);
check("tekrar soruları geçmiş kelimelerden (r ile başlar)", backQ.every((q) => /«r\d+»/.test(q.text)));
check("tekrar soruları bu ünitenin kelimesi değil", backQ.every((q) => !/«x\d+»/.test(q.text)));
check("tekrar soruları bloklanmıyor (araya giriyor)", cum.findIndex((q) => q.explain?.includes("tekrar")) < cum.length - backQ.length);
check("tekrar seçimi geçmişe yayılıyor (hepsi aynı yerden değil)", new Set(backQ.map((q) => q.text)).size === backQ.length);
check("birikimli quiz de deterministik", JSON.stringify(deriveQuiz(laterBrief, qpool, 12, reviewPool, say)) === JSON.stringify(cum));
check("farklı ünite farklı tekrar seti", JSON.stringify(deriveQuiz({ ...laterBrief, index: 7 }, qpool, 12, reviewPool, say)) !== JSON.stringify(cum));
check("ünite 1'de tekrar yok (geçmiş boş) → eski davranış", JSON.stringify(deriveQuiz(briefs[0], qpool, 6, { vocab: [], patterns: [] }, say)) === JSON.stringify(quiz));
check("soru metni tekrar olduğunu ele vermiyor", backQ.every((q) => q.text.startsWith("«") && q.text.endsWith("» ne demek?")));

/*
  PRATİK ÖĞELER PENCEREYİ TIKAMAZ (regresyon).

  Gramer/quiz/ünite quizi ilerleme kaydı tutmuyor: itemAttempted onlara
  daima false döner. Pencerenin "sıradaki" yuvasını almalarına izin verilince
  pencere orada park ediyordu ve ünitenin KAPANIŞ adımı (ünite quizi)
  hiçbir ünitede açılamıyordu. Testler bunu görmüyordu — 64 kontrol yeşilken
  kusur canlıydı.
*/
const tumRef = new Set(
  t.units[0].items
    .filter((i) => ["conversation", "read", "listen", "write"].includes(i.kind) && i.ref)
    .map((i) => i.ref as string),
);
const sTam = buildTrackState(t, {
  conversationDone: (r) => tumRef.has(r),
  skillDone: (r) => tumRef.has(r),
  conversationAttempted: (r) => tumRef.has(r),
  skillAttempted: (r) => tumRef.has(r),
});
const tamItems = sTam.units[0].items;
const kontrol = tamItems.find((i) => i.item.kind === "unitQuiz");
const quizItem = tamItems.find((i) => i.item.kind === "quiz");
check("ünite bitince KONTROL NOKTASI açılır", kontrol?.open === true);
check("ünite bitince quiz açılır", quizItem?.open === true);
check("pratik öğeler pencereyi harcamaz (ikisi birden açık)", Boolean(kontrol?.open && quizItem?.open));

// Ünite yarımken pratik öğeleri kapalı kalmalı: sıra hâlâ korunuyor.
const eksikRef = new Set([...tumRef].slice(0, 2));
const sYarim = buildTrackState(t, {
  conversationDone: (r) => eksikRef.has(r),
  skillDone: (r) => eksikRef.has(r),
  conversationAttempted: (r) => eksikRef.has(r),
  skillAttempted: (r) => eksikRef.has(r),
});
const yarimItems = sYarim.units[0].items;
check("ünite yarımken ünite quizi KAPALI", yarimItems.find((i) => i.item.kind === "unitQuiz")?.open === false);
check("ünite yarımken quiz KAPALI", yarimItems.find((i) => i.item.kind === "quiz")?.open === false);

/*
  GRAMER ARTIK HER ÜNİTEDE OYNANABİLİR (regresyon).

  Desende her ünitede gramer adımı var ama elle yazılmış içerik yalnız birinde
  vardı; kalan 144 ünitede adım "yakında" olarak duruyordu. Artık ünitenin
  kendi hüküm ve üretim adımlarından türetiliyor (lib/immersion/grammar.ts).
*/
const gramerItem = t.units[1].items.find((i) => i.kind === "grammar");
check("gramer adımı ref taşıyor (oynanabilir)", gramerItem?.ref === t.units[1].id);
// Türetme GERÇEK konuşmalara karşı sınanır: sentetik fixture'da hüküm adımı yok
// ve olması da gerekmiyor — türetmenin değeri konuşmanın kendi malzemesinde.
const gercekA1 = CONVERSATIONS.filter((l) => l.course === "de" && l.level === "A1");
let gramerBos = 0;
for (let u = 0; u < Math.ceil(gercekA1.length / 4); u++) {
  const q = deriveGrammar(`de-a1-u${String(u + 1).padStart(2, "0")}`, gercekA1.slice(u * 4, u * 4 + 4), 8, DENEME_METNI);
  if (!q.length) gramerBos++;
}
check("A1'in HER ünitesinde gramer türüyor", gramerBos === 0);
const örnek = deriveGrammar("de-a1-u02", gercekA1.slice(4, 8), 8, DENEME_METNI);
check("gramer türetmesi hüküm İÇERİR", örnek.some((q) => q.kind === "truefalse"));
check("gramer sorularının şıkkı ya da maddesi var", örnek.every((q) => q.options.length > 0 || (q.items?.length ?? 0) > 0));

if (fail.length) {
  console.error(`\n${fail.length} TEST BAŞARISIZ:`);
  for (const f of fail) console.error("  ✗ " + f);
  process.exit(1);
}
console.log(`\nTÜM TESTLER GEÇTİ — test:track (${pass} kontrol, buildTrack 4/2/2/2 + unitQuiz + gating)`);
