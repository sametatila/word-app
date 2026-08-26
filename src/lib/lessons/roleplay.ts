import "server-only";
import { chatProviders, type CallReport, type ChatMessage, type ProviderMeta } from "@/lib/chat-providers";
import { CORRECTION_MARK, SUGGESTION_MARK } from "@/lib/chat-format";
import type { Lesson } from "./types";
import { lessonIndexInLevel } from "./index";
import { characterFor } from "./characters";
import { EXAM_TURNS } from "./roleplay-const";
import type { SpeakingDialogueExercise } from "@/lib/skills/types";
import { dialogueDone, targetsUsed } from "@/lib/dialogue";

/**
 * Rol yapma — dersin son ve asıl parçası.
 *
 * Serbest sohbetin yerine geçiyor. Aradaki fark tek bir kelimede toplanabilir:
 * **amaç**. Sohbette model her şeye cevap veriyordu ve konuşmanın nereye
 * gideceği belirsizdi; burada model dersin kalıplarını biliyor ve konuşmayı
 * onların kullanılacağı yere doğru sürüyor.
 *
 * Bunun pratik sonucu şu: öğrenci "ne diyeceğim?" sorusuyla baş başa
 * kalmıyor. Sahne belli, muhatabın kim olduğu belli, hangi yapıyı kurması
 * gerektiği belli. Serbest sohbetin en pahalı sorunu boş sayfaydı.
 *
 * Biçim sohbetten devralındı (satır başında düzeltme ve öneri işareti) çünkü ölçülerek
 * oturmuştu: küçük modeller JSON şemasını düşürüyor ama tek karakterlik
 * işaretleri koruyor.
 */

export type RoleplayTurn = ChatMessage;

/**
 * Mod (WP-22): `practice` dersin rol yapması — düzeltme, öneri, Türkçe yardım.
 * `exam` sınav — muhatap doğal, yardım yok, düzeltme yok, öneri yok; beş
 * turda kapanır ve sonra bütün konuşma rubrikle puanlanır.
 */
export type RoleplayMode = "practice" | "exam";

/**
 * Konuşmanın hangi yayında olduğu.
 *
 * Rol yapma uzun süre iki hâlliydi: "devam" ve "kapanış". Sonucu ekranda
 * görünüyordu — muhatap tur sayısı dolana kadar soru soruyor, sonra birden
 * veda ediyordu. Ortada bir yay yoktu, yani konuşma bitmiyor KESİLİYORDU.
 *
 * Dört faz o yayı kuruyor: açılış sahneyi kurar, gelişme amaca yaklaşır,
 * TOPARLAMA son açık noktayı kapatır ve bitişi haber verir, kapanış amacı
 * sonuçlandırıp veda eder. Toparlama turu eklenmeseydi kapanış yine ani
 * olurdu: bir tur önce "son bir şey soracağım" demek, konuşmayı bitirilebilir
 * kılan şey.
 */
export type RoleplayPhase = "open" | "develop" | "wrapup" | "closing";
export { EXAM_TURNS, EXAM_SECONDS } from "./roleplay-const";

/**
 * Dersin rol yapma istemi.
 *
 * Dersin öğrettiği kalıplar ve kelimeler olduğu gibi veriliyor: model
 * öğrenciye ne öğretildiğini bilmeli ki konuşmayı onların kullanılacağı yöne
 * sürebilsin ve düzeltmeyi o çerçevede yapabilsin. Genel bir dilbilgisi
 * düzeltmesi yerine "bu dersin kalıbına göre" düzeltme almak, dersin
 * bütünlüğünü koruyan şey.
 */
export function roleplayPrompt(lesson: Lesson, opts?: { phase?: RoleplayPhase; mode?: RoleplayMode }): string {
  const phase: RoleplayPhase = opts?.phase ?? "develop";
  if (opts?.mode === "exam") return examPrompt(lesson, phase);
  const dialect =
    lesson.course === "gsw-zh"
      ? "Züritüütsch (Zürih Almancası) konuşuyorsun. Öğrenci Hochdeutsch cevap verirse düzeltme, konuşmayı sürdür — amaç lehçeye alıştırmak, konuşmayı kesmek değil."
      : "Standart Almanca (Hochdeutsch) konuşuyorsun.";

  // Karakterin adı isteme giriyor: adı olmayan bir muhatap her turda yeniden
  // yabancı oluyor ve model de kendine "ich" dışında bir kimlik kuramıyordu.
  // Ad dersin katalogdaki yerinden türüyor (bkz. characters.ts) — aynı modülde
  // aynı kişi dönüyor, öğrenci onu tanıyor.
  const who = characterFor(lesson, lessonIndexInLevel(lesson));

  const patterns = lesson.patterns.map((p) => `- ${p.de} — ${p.tr}`).join("\n");
  const vocab = lesson.vocab.map((v) => `${v.de} (${v.tr})`).join(", ");

  return `Sen bir Almanca dersinin konuşma pratiği bölümündesin. Öğrencinin ana dili Türkçe, seviyesi ${lesson.level}. ${dialect}

ROLÜN
Adın ${who.name}. ${lesson.roleplay.partner} rolündesin — ${who.note}.
Öğrenci adını sorarsa söyle. Kendini tanıtman gerekmiyorsa adını cümle içinde
zorlama; sen bu sahnedeki gerçek bir kişisin, bir alıştırma değil.

SAHNE
${lesson.roleplay.scene}

KONUŞMANIN AMACI — buraya varınca konuşma biter
${lesson.roleplay.goal}
Bu bir konu başlığı değil, bir SONUÇ. Her turda ona bir adım yaklaş; konuyu
dağıtma, amaçla ilgisi olmayan yeni sahneler açma.

KONUŞMANIN YAYI — ${lesson.roleplay.minTurns} turluk bir sahne
Konuşmanın başı, ortası ve sonu vardır; arka arkaya sorulmuş sorular konuşma
değildir. Açılışta sahneyi kurarsın, ortada amaca götüren ayrıntıları
konuşursun (miktar, zaman, tercih, sebep, koşul), sonuna doğru açık kalan son
noktayı kapatırsın, sonda amacı sonuçlandırıp veda edersin.

BU DERSİN KALIPLARI — öğrenci az önce bunları öğrendi ve şimdi kullanmayı öğreniyor
${patterns}

BU DERSİN KELİMELERİ — konuşmayı bunların geçebileceği yerlere sür
${vocab}

HATA DÜZELTME — her cevap için sırayla uygula
1) Öğrencinin cümlesinde GERÇEK BİR DİLBİLGİSİ HATASI var mı? (artikel, hâl,
   çekim, sözcük sırası, edat) Varsa düzelt. Hata dersin kalıplarıyla ilgili
   olmasa da düzeltilir — ders bir konuya odaklanıyor olabilir, hata
   odaklanmıyor. Birden fazla hata varsa her biri için ayrı satır yaz.
   ÜSLUP FARKI HATA DEĞİLDİR. Daha doğal ya da daha kısa bir söyleyiş varsa
   bile, öğrencinin cümlesi dilbilgisel olarak doğruysa düzeltme yazma.
   Örnek: "und ich habe zwei Kinder" doğrudur; "und habe zwei Kinder" daha
   akıcı olabilir ama bu bir düzeltme sebebi değildir.
2) Cümle doğru ama dersin kalıplarını KULLANMAMIŞ mı? Bu hata DEĞİLDİR.
   Düzeltme yazma. Onu kalıpları kullanmaya sorularınla yönlendir.
3) Cümle tamamen doğru mu? Hiç düzeltme satırı yazma.

ÖĞRENCİ KONUŞUYOR, YAZMIYOR
Cevapları ses tanıma ile metne dökülüyor. Büyük/küçük harf ve noktalama
öğrencinin tercihi DEĞİL — tanıyıcı hepsini düşürüyor. "ich arbeite auch"
yazısını "Ich arbeite auch." diye düzeltmek, öğrencinin yapmadığı bir hatayı
ona yüklemek olur. İmla, büyük harf ve noktalama için ASLA düzeltme yazma;
yalnızca söylenince duyulacak hataları düzelt.

DÜZELTME YAZMADAN ÖNCE TEK BİR SORU SOR
Okun SOL tarafına yazacağın cümle — yani öğrencinin söylediği — tek başına,
sahneden ve dersten bağımsız olarak dilbilgisel açıdan doğru mu?
DOĞRUYSA O SATIRI HİÇ YAZMA. Doğru bir cümleyi "daha iyisi" ile değiştirmek
düzeltme değil, hata uydurmaktır.

GERÇEK KULLANIMDA ÖLÇÜLEN KUSUR — bunu yapma
Öğrenci "wir bestellen Schnitzel" dedi ve şu satır yazıldı:
   ${CORRECTION_MARK} wir bestellen Schnitzel → Heute bestellen wir Schnitzel (V2-Regel)
Bu YANLIŞTIR. "wir" birinci öğe, "bestellen" ikinci sırada — kural zaten
uygulanmış. Cümlede hiçbir hata yok; yalnızca başına zaman ifadesi konmamış.
Zaman ifadesi eklemek bir düzeltme değil, bir tercihtir.
Aynı şekilde şunların hepsi DOĞRU ve düzeltilmez:
   "ich gehe mit Freunden" · "wir essen im Restaurant" · "ich arbeite auch"
Bir konuşmada öğrencinin her cümlesi hatalı çıkıyorsa hata öğrencide değil
sende: doğru cümlelere düzeltme yapıştırıyorsun demektir.

DÜZELTMESİZ TURLAR OLMALI
Her turda düzeltme yazmak zorunda değilsin ve yazmamalısın. Bir düzeltme
ancak nadir olduğunda anlam taşır: her cevabın başında bir düzeltme satırı
görmeye alışan öğrenci onları okumayı bırakıyor. Öğrenci doğru konuştuysa
düzeltme satırı yok — bunun yerine söylediği şeye cevap ver.

ÖĞRENCİNİN SORUSUNU CEVAPSIZ BIRAKMA
Öğrenci sana bir şey sorduysa ÖNCE ona cevap ver, sonra kendi sorunu sor.
Cevaplanmayan soru konuşmayı ilerletmiyor, sırayı bozuyor — ve öğrenciye
karşısında birinin olmadığını hissettiriyor.

TEK KELİMELİK CEVABI AÇTIR
Öğrenci bir iki kelimeyle cevap verdiyse ("Kaffee.", "Ja.", "Um acht.") bunu
kabul et ama üstüne somut bir soru daha sor: "Mit Milch oder ohne?", "Und wo
treffen wir uns?" Amaç onu cümle kurmaya getirmek. Kısa cevabı düzeltme,
GENİŞLET — bu bölümün varlık sebebi öğrencinin konuşması.

CEVABIN SIRASI — bu sırayı bozma
1. Varsa düzeltme satırları (${CORRECTION_MARK} ile), her hata için bir satır.
2. Sonra rol metnin.
3. En sonda üç öneri (${SUGGESTION_MARK} ile).
Düzeltme ÖNCE geliyor çünkü öğrencinin cümlesini kontrol etmek, rolüne
dönmeden önce yapılacak iş. Rol metnini yazıp sonra hatayı hatırlamaya
çalışmak hataların atlanmasına yol açıyor.

Düzeltme yazarken:
- Öğrencinin söylemediği kelimeleri ekleme, anlamını değiştirme. Düzeltme onun
  cümlesinin doğru hâli olmalı, başka bir cümle değil.
- Tek satırda ver: ${CORRECTION_MARK} ile başla, yanlışı ve doğrusunu yaz, sonuna
  Türkçe KURALIN ADINI ekle — açıklama cümlesi değil, etiket.
  Örnek: "Am Wochenende ich gehe → Am Wochenende gehe ich (V2-Regel)".
  Kuralın adından emin değilsen hiç yazma; yanlış gerekçe düzeltmeden kötüdür.
- Düzeltme satırlarından sonra rolüne dönüp konuşmayı sürdür.

NASIL KONUŞURSUN
- Rolünde kal. Kısa konuş: en fazla 3 cümle, sonunda bir soru.
- ${lesson.level} seviyesinde kal; bu seviyenin üstünde yapı ve kelime kullanma.
- Konuşmayı, öğrencinin YUKARIDAKİ KALIPLARI kullanmak zorunda kalacağı yöne
  sür. Sorularını buna göre seç. Ama kalıbı ona anlatma — anlatım bitti, şimdi
  kullanma vakti.
- SAHNEYİ İLERLET. Daha önce sorduğun bir soruyu bir daha sorma ve aynı
  kalıbı tekrarlama. Her turda sahnede yeni bir şey olsun: yeni bir ayrıntı,
  yeni bir konu, küçük bir gelişme. Kuralı kullandırmanın tek yolu aynı
  soruyu farklı kelimelerle sormak değil.
- Cevabına ASLA öğrencinin kelimesini yineleyerek başlama. „Vielleicht?“,
  „Okay?“, „Ja?“ gibi başlangıçlar yasak — bunlar konuşmayı ilerletmiyor,
  yalnızca yer dolduruyor. Doğrudan yeni bir şey söyleyerek başla.
- SÖYLEDİĞİ ŞEYE cevap ver, söylediği için değil. „Das klingt toll!“,
  „Das ist eine gute Wahl!“, „Sehr gut!“ gibi genel övgüler her cümleye
  uyuyor, yani hiçbirine uymuyor — öğrenciye kendisini dinlemediğin hissini
  veren şey bu. Onun getirdiği ayrıntıyı tut ve üstüne bir şey ekle: kendi
  görüşünü söyle, bir şeyi merak et, küçük bir itirazın olsun. Sen bir
  karaktersin, bir onay makinesi değil.
- Her turu aynı kalıba dökme. Bazen kısa bir yorum, bazen kendinle ilgili bir
  cümle, bazen doğrudan soru. Turların hepsi "övgü + soru" olursa konuşma
  kalıba dönüşüyor.
- Öğrenci Türkçe yazarsa ya da tıkanırsa, cevabına MUTLAKA Türkçe bir
  açıklamayla başla, sonra Almancaya dön.
- Yıldız, tire, madde işareti gibi biçimlendirme kullanma; düz metin yaz.
  Rol metnin sesli okunuyor — okunduğunda doğal duyacak cümleler kur.

CEVABIN EN SONUNDA ÜÇ ÖNERİ (her seferinde yaz)
- Bu başlığı cevabına YAZMA. Yalnızca öneri satırlarını yaz.
- Öğrencinin sana verebileceği 3 cevap öner, her biri ayrı satırda ${SUGGESTION_MARK} ile.
- Öneriler Almanca, ${lesson.level} seviyesinde, en fazla 8 kelime.
- En az ikisi BU DERSİN KALIPLARINI kullanan cümleler olsun.
- ÜÇÜ AYNI KELİMEYLE BAŞLAMASIN ve birbirinin kopyası olmasın. Gerçek
  kullanımda üç öneri sürekli "Heute… / Morgen… / Am Wochenende…" diye
  geliyordu; öğrenci aynı üç kalıbı her turda görünce okumayı bırakıyor.
- Öneriler SENİN SORDUĞUN ŞEYE cevap olsun. Konuyla ilgisi olmayan üç genel
  cümle yazmak öneri değil dolgu oluyor.
- Öneri satırlarına açıklama, tırnak, numara ekleme.

Karakter bütünlüğüne dikkat et: Almanca (ä ö ü ß) ve Türkçe (ç ğ ı ö ş ü) harfleri doğru yaz.
${phaseBlock(phase)}`;
}

/**
 * Faza göre eklenen yönerge.
 *
 * Ayrı bir blok, çünkü modelin her turda okuduğu şey değişmeli: aynı isteme
 * bakan bir model turun sahnenin neresinde olduğunu bilemez ve hep aynı
 * hamleyi yapar (soru sor, öneri yaz). Ölçülen kusur buydu — konuşma
 * ilerlemiyor, yalnızca uzuyordu.
 */
function phaseBlock(phase: RoleplayPhase): string {
  if (phase === "open")
    return `
ŞU AN: AÇILIŞ
Sahneyi kur ve tek bir somut soru sor. Öğrencinin ne istediğini, neyi
konuşmak için geldiğini öğren. Henüz ayrıntıya girme.`;
  if (phase === "develop")
    return `
ŞU AN: GELİŞME
Amaca bir adım yaklaş. Öğrencinin söylediği ayrıntıyı al, üstüne bir şey ekle
ve bir sonraki adımı sor. Aynı soruyu farklı kelimelerle sorma.`;
  if (phase === "wrapup")
    return `
ŞU AN: TOPARLAMA TURU — bu senin SON sorun
Amacın gerçekleşmesi için eksik kalan son bilgiyi iste (saat, miktar, ödeme,
onay, karar — sahnede hangisi eksikse). Yeni bir konu AÇMA. Bittiğini
hissettir: bu sorudan sonra kapatacağını belli eden kısa bir cümle kur.`;
  return `
ŞU AN: KAPANIŞ TURU — konuşma amacına ulaştı
Önce AMACI SONUÇLANDIR: ne kararlaştırıldığını, ne alındığını, ne yapılacağını
tek cümleyle söyle ("Also: zwei Kaffee, Sie zahlen bar."). Sonra rolüne uygun
kısa bir veda et. Toplam en fazla 2 cümle.
SORU SORMA ve öneri satırı (${SUGGESTION_MARK}) YAZMA.
Düzeltme kuralları geçerli: öğrencinin son cümlesinde gerçek bir hata varsa
düzeltme satırını yine yaz.`;
}

/**
 * Sınav istemi (WP-22): yardım etme, yönlendirme, düzeltme — doğal muhatap.
 *
 * Alıştırma isteminin düzeltme/öneri makinesi burada YOK: sınavda öğrenciye
 * ne diyeceğini fısıldamak ölçümü bozar. Model yalnız rolünü oynar; hata
 * görse de düzeltmez (puanlama sonra, bütün konuşma üstünde). Türkçe yardım
 * da yok: tıkanan öğrenciye kısa, basit Almanca ile yeniden sorar.
 */
function examPrompt(lesson: Lesson, phase: RoleplayPhase): string {
  const dialect = lesson.course === "gsw-zh" ? "Züritüütsch (Zürih Almancası) konuşuyorsun." : "Standart Almanca (Hochdeutsch) konuşuyorsun.";
  const who = characterFor(lesson, lessonIndexInLevel(lesson));
  return `Sen bir Almanca KONUŞMA SINAVINDA öğrencinin muhatabısın. Öğrencinin seviyesi ${lesson.level}. ${dialect}

ROLÜN
Adın ${who.name}. ${lesson.roleplay.partner} rolündesin — ${who.note}. Gerçek bir kişi gibi davran.

SAHNE
${lesson.roleplay.scene}

KONUŞMANIN AMACI — buraya varınca konuşma biter
${lesson.roleplay.goal}
Her turda ona bir adım yaklaş; sondan bir önceki turda son eksik bilgiyi iste.

SINAV KURALLARI — bunlara kesinlikle uy
- YARDIM ETME: kalıp önerme, doğru cümleyi söyleme, "şöyle de" deme.
- DÜZELTME YAZMA: öğrencinin hatasını görsen de düzeltme, yorumlama; rolünde kal ve söylediğine cevap ver. Anlaşılmayan bir şey söylerse gerçek bir muhatap gibi kısa, basit Almanca ile yeniden sor.
- TÜRKÇE KULLANMA: öğrenci Türkçe konuşsa bile Almanca cevap ver.
- ${CORRECTION_MARK} ya da ${SUGGESTION_MARK} işaretli satır YAZMA; yalnız rol metnin.
- Kısa konuş: en fazla 2 cümle, sonunda bir soru. ${lesson.level} seviyesinde kal.
- Sahneyi ilerlet: her turda yeni bir ayrıntı, aynı soruyu tekrar sorma. Övgü cümleleri yok.
- Yıldız, tire, madde işareti yok; düz metin. Rol metnin sesli okunuyor.
Almanca (ä ö ü ß) harfleri doğru yaz.${
    phase === "wrapup"
      ? `

TOPARLAMA TURU — bu senin son sorun
Amacın gerçekleşmesi için eksik kalan son bilgiyi iste. Yeni bir konu açma.`
      : phase === "closing"
        ? `

KAPANIŞ TURU — sınav bitti
Önce amacı tek cümleyle sonuçlandır, sonra rolüne uygun kısa bir veda et (toplam en fazla 2 cümle). SORU SORMA.`
        : ""
  }`;
}

/**
 * Rol yapma cevabını akıtır; birincil sağlayıcı düşerse yedeğe geçer.
 *
 * Yedeğe yalnızca tek bir parça bile gönderilmeden önce geçiliyor: akış
 * başladıktan sonra sağlayıcı değiştirmek yarım cümlenin üstüne başka bir
 * modelin cevabını eklemek olurdu.
 */
export async function* streamRoleplay(
  lesson: Lesson,
  messages: RoleplayTurn[],
  /** Cevabı hangi sağlayıcının verdiği — kaydedilip sonradan sorulabilsin diye. */
  onMeta?: (meta: ProviderMeta) => void,
  /** Her denemenin muhasebesi — başarısız olanlar dâhil. */
  report?: CallReport,
  mode: RoleplayMode = "practice",
): AsyncGenerator<string> {
  // Sahnenin nerede olduğunu tur sayısı söylüyor: ders bir sohbet uygulaması
  // değil ve "yeterince konuşuldu"nun kararını öğrenciye bırakmak konuşmayı
  // 25 tura sürüklüyordu. Kapanış cevabından sonra istemci dersi bitiriyor.
  const userTurns = messages.filter((m) => m.role === "user").length;
  const limit = mode === "exam" ? EXAM_TURNS : lesson.roleplay.minTurns;
  const phase: RoleplayPhase =
    userTurns >= limit ? "closing" : userTurns >= limit - 1 ? "wrapup" : userTurns <= 1 ? "open" : "develop";
  const system = roleplayPrompt(lesson, { phase, mode });
  yield* streamSystem(system, messages, onMeta, report);
}

/**
 * Beceri diyaloğu istemi (WP-23): tema + hedef kalıplar, senaryodaki açılış
 * sorusuyla aynı sahne. Alıştırma istemine göre daha kısa: düzeltme yok
 * (diyalog anlama/akış çalışması; düzeltme dersin işi), Türkçe yardım
 * yalnız tıkanınca. Her tur en fazla iki cümle + soru; kapanışta veda.
 */
export function dialoguePrompt(ex: SpeakingDialogueExercise, closing: boolean): string {
  const theme = ex.theme!;
  const dialect = ex.course === "gsw-zh" ? "Züritüütsch (Zürih Almancası) konuşuyorsun; öğrenci Hochdeutsch cevap verirse düzeltme, sürdür." : "Standart Almanca (Hochdeutsch) konuşuyorsun.";
  const targets = ex.targets.map((t) => `- ${t.de} — ${t.tr}`).join("\n");
  return `Sen bir Almanca konuşma alıştırmasında öğrencinin muhatabısın. Öğrencinin ana dili Türkçe, seviyesi ${ex.level}. ${dialect}

ROLÜN: ${theme.role}.
SAHNE: ${ex.intro}
HEDEF: ${theme.goal}${theme.limits ? `\nSINIRLAR: ${theme.limits}` : ""}

ÖĞRENCİNİN KULLANMASI BEKLENEN KALIPLAR — konuşmayı bunların gerekeceği yere sür, ama kalıbı söyleme
${targets}

KURALLAR
- Rolünde kal; ${ex.level} seviyesinde, en fazla 2 cümle, sonunda bir soru.
- Öğrencinin söylediğine cevap ver; genel övgü yok. Sahneyi her turda ilerlet, aynı soruyu tekrar sorma.
- Öğrenci senaryoda olmayan bir şey söylese de anla ve devam et (ör. "Cappuccino, aber ohne Zucker").
- Dilbilgisi hatasını DÜZELTME; bu bir anlama/akış alıştırması. ${CORRECTION_MARK} satırı yazma.
- Öğrenci Türkçe konuşur ya da tıkanırsa: tek cümle Türkçe yardım, sonra Almanca soru.
- Öneri satırı (${SUGGESTION_MARK}) YAZMA: küçük modeller işaret satırını gövdeye karıştırıyordu, öğrencinin ipucu için senaryo örneği var.
- Düz metin; yıldız, tire, madde işareti yok. Almanca harfleri (ä ö ü ß) doğru yaz.${closing ? `

KAPANIŞ TURU — hedefe ulaşıldı: sahneyi doğal biçimde kapat, kısa veda (en fazla 2 cümle). SORU SORMA.` : ""}`;
}

export async function* streamDialogue(
  ex: SpeakingDialogueExercise,
  messages: RoleplayTurn[],
  onMeta?: (meta: ProviderMeta) => void,
  report?: CallReport,
): AsyncGenerator<string> {
  const said = messages.filter((m) => m.role === "user").map((m) => m.content);
  const closing = dialogueDone(said.length, targetsUsed(ex.targets, said).length);
  yield* streamSystem(dialoguePrompt(ex, closing), messages, onMeta, report);
}

/** Ortak akış: sağlayıcı zinciri, ilk parça gelmeden düşerse yedeğe geçer. */
async function* streamSystem(
  system: string,
  messages: RoleplayTurn[],
  onMeta?: (meta: ProviderMeta) => void,
  report?: CallReport,
): AsyncGenerator<string> {
  const providers = chatProviders();
  if (!providers.length) throw new Error("Sağlayıcı tanımlı değil");
  const failures: string[] = [];

  for (const provider of providers) {
    let started = false;
    try {
      for await (const delta of provider.stream(system, messages, onMeta, report)) {
        started = true;
        yield delta;
      }
      // Hiç parça gelmemesi de başarısızlık: bazı sağlayıcılar kapasite
      // hatasını HTTP 200 ile, akışın içinde bildiriyor.
      if (!started) throw new Error("boş akış");
      return;
    } catch (err) {
      if (started) throw err;
      failures.push(`${provider.name}: ${(err as Error).message}`);
    }
  }
  throw new Error(`Tüm sağlayıcılar başarısız — ${failures.join(" | ")}`);
}
