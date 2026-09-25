import type { QuizWeek } from "../types";

/**
 * C1 · Hafta 5 · Transfer (İngilizce kursu).
 *
 * SAF TEKRAR DEĞİL. W1–W4'ün hedefleri yeni bağlamlarda ve yeni metin
 * türlerinde soruluyor: köşe yazısı, arka plan yazısı, deneme ve haber
 * analizinden sonra bu hafta bir OKUR MEKTUBU ve bir toplantı — ikisi de
 * savunma ve itiraz dili taşıyan, kişisel tonu olan türler.
 *
 * C1'DE TRANSFERİN ANLAMI: alt seviyelerde aynı kuralı başka bir cümlede
 * sormak yetiyordu. Burada kural aynı ama METNİN AMACI değişiyor — okur
 * mektubunda bildirme fiili aktarım değil MESAFE koymak için kullanılıyor.
 * Aynı biçim, başka iş.
 */
export const EN_C1_W05: QuizWeek = {
  id: "en-c1-w05",
  course: "en",
  level: "C1",
  no: 5,
  theme: "Objection and judgement",
  themeTr: "Transfer — itiraz ve tartma",
  canDo: ["C1.RD.1", "C1.LS.2", "C1.GR.2", "C1.WR.4"],

  stimuli: [
    {
      kind: "text",
      id: "t1",
      genre: "Letter to the editor",
      genreTr: "Okur mektubu",
      title: "On your piece about the new charge",
      body:
        "Your article states that the charge was agreed with those affected. That is not quite accurate. " +
        "Three associations were invited; in the end one was heard.\n\n" +
        "I accept that the council is under pressure and that the costs have to be covered somehow. " +
        "Even so, a staged solution would have been possible, of the kind that has long been in use elsewhere. " +
        "Had the associations' proposals been examined, a more workable model would now be on the table.\n\n" +
        "What troubles me, however, is less the level of the charge than the account given of the procedure. " +
        "A decision whose making is not set out openly loses support — all the more so in a matter that affects " +
        "every household.\n\n" +
        "A correction would be appropriate.",
    },
    {
      kind: "audio",
      id: "a1",
      genre: "Committee meeting",
      genreTr: "Komisyon toplantısı",
      plays: 2,
      segments: [
        { speaker: "Chair", text: "The complaint is that the procedure was not transparent. Ms Hartley?" },
        { speaker: "Hartley", text: "Formally everything was correct. Nobody disputes that." },
        { speaker: "Chair", text: "The letter disputes it rather firmly." },
        { speaker: "Hartley", text: "It disputes the effect, not the form. That is a difference." },
        { speaker: "Chair", text: "A difference that interests nobody outside this room." },
        { speaker: "Hartley", text: "Granted. We should have explained earlier why only one association was heard." },
      ],
    },
  ],

  items: [
    /* ── Okuduğunu anlama ──────────────────────────────────────────────── */
    {
      id: "en-c1-w05-r1",
      block: "read",
      ref: "t1",
      stem: "What is the writer's main objection?",
      options: [
        "The charge is set too high",
        "The council has no costs at all",
        "The account given of the procedure is inaccurate",
        "Other towns use the same solution",
      ],
      answer: 2,
      why: "\"What troubles me, however, is less the level of the charge than the account given of the procedure.\" `less … than` bir öncelik sıralaması kuruyor: itiraz tutara değil, sürecin anlatılışına.",
      targets: ["reading.nuance", "syntax.cleft"],
    },
    {
      id: "en-c1-w05-r2",
      block: "read",
      ref: "t1",
      stem: "What does the writer concede?",
      options: [
        "That the associations were not invited",
        "That a staged solution is impossible",
        "That the decision was set out openly",
        "That the council is under pressure and costs must be covered",
      ],
      answer: 3,
      why: "\"I accept that the council is under pressure …\" C1 argümantasyonunda kabul bir taktiktir: karşı tarafın haklı yanını teslim etmek kendi itirazını güçlendirir. Kabul edilen şey itirazın kendisi değildir.",
      targets: ["argument.concession", "verb.acknowledge"],
    },
    {
      id: "en-c1-w05-r3",
      block: "read",
      ref: "t1",
      stem: "What would be different if the proposals had been examined?",
      options: [
        "The charge would have been abolished",
        "A more workable model would now be on the table",
        "The associations would have gone to court",
        "The council would have no costs",
      ],
      answer: 1,
      why: "\"Had the associations' proposals been examined, a more workable model would now be on the table.\" Bağlaçsız gerçek dışı koşul; sonuç `would now` ile bugüne bakıyor, yani olmamış bir şimdiyi anlatıyor.",
      targets: ["conditional.inversion", "conditional.unreal"],
    },

    /* ── Dinlediğini anlama ────────────────────────────────────────────── */
    {
      id: "en-c1-w05-l1",
      block: "listen",
      ref: "a1",
      stem: "How does Ms Hartley first defend the procedure?",
      options: [
        "She points out that formally everything was correct",
        "She denies the complaint entirely",
        "She agrees with the letter",
        "She postpones her answer",
      ],
      answer: 0,
      why: "\"Formally everything was correct.\" `Formally` savunmayı daraltıyor: yalnız biçim savunuluyor, sonuç değil. Bu daraltma bir konumun tamamını değil sınırını gösterir.",
      targets: ["listening.stance", "argument.qualification"],
    },
    {
      id: "en-c1-w05-l2",
      block: "listen",
      ref: "a1",
      stem: "What distinction does Ms Hartley insist on?",
      options: [
        "Between council and associations",
        "Between costs and charge",
        "Between the effect and the form of the procedure",
        "Between press and committee",
      ],
      answer: 2,
      why: "\"It disputes the effect, not the form.\" Hartley itirazın hedefini yeniden tanımlıyor — kazanmak için değil, sınırlandırmak için. Başkanın cevabı bu ayrımın dışarıda işe yaramadığını söylüyor.",
      targets: ["listening.argument", "argument.distinction"],
    },
    {
      id: "en-c1-w05-l3",
      block: "listen",
      ref: "a1",
      stem: "How does Ms Hartley's contribution end?",
      options: [
        "With a resignation",
        "With the admission that they explained too late",
        "With a rejection of the complaint",
        "With the announcement of legal action",
      ],
      answer: 1,
      why: "\"Granted. We should have explained earlier …\" `Granted` ve ardından gelen `should have` birlikte bir kabul kuruyor: yapılmamış olan söyleniyor.",
      targets: ["listening.consensus", "modal.perfect"],
    },

    /* ── Dilbilgisi ────────────────────────────────────────────────────── */
    {
      id: "en-c1-w05-g1",
      block: "grammar",
      stem: "Your article ___ that the charge was agreed with those affected.",
      options: ["state", "stating", "is stated", "states"],
      answer: 3,
      why: "`Your article` tekil, fiil `-s` alır. Bildirme fiili burada ikinci bir iş daha yapıyor: yazar aktardığı iddiadan mesafe alıyor ve hemen ardından onu çürütüyor (`That is not quite accurate`).",
      targets: ["verb.reporting", "subject-verb.agreement"],
      byNative: {
        de: {
          options: ["state", "stating", "is stated", "states"],
          answer: 3,
          why: "Almancada bu mesafe Konjunktiv I ile KİPTE taşınır (`die Gebühr sei …`), o yüzden İngilizcede de bir biçim değişikliği aranıyor ve edilgen `is stated` seçiliyor. İngilizcede mesafeyi kip değil bildirme fiilinin kendisi taşır.",
        },
      },
    },
    {
      id: "en-c1-w05-g2",
      block: "grammar",
      stem: "A staged solution ___ possible.",
      options: ["would have been", "would be", "will have been", "had been"],
      answer: 0,
      why: "Geçmişe dönük gerçek dışılık `would have been` ile kurulur: mümkün OLABİLİRDİ ama olmadı. `would be` şimdiye bakar ve olayın geçmişte kaçırıldığını söylemez.",
      targets: ["modal.perfect", "conditional.unreal"],
    },
    {
      id: "en-c1-w05-g3",
      block: "grammar",
      stem: "A decision ___ making is not set out openly loses support.",
      options: ["which", "that", "whose", "of whom"],
      answer: 2,
      why: "`making` kararın oluşumu — iyelik ilişkisi, o yüzden `whose`. W4'te aynı yapı `a system whose failure` ile sorulmuştu; biçim değişmiyor, öncül değişiyor. `of whom` yalnız insanlar için kullanılır.",
      targets: ["relative.whose", "relative.defining"],
    },
    {
      id: "en-c1-w05-g4",
      block: "grammar",
      stem: "What troubles me is ___ the level of the charge ___ the account of the procedure.",
      options: ["both … and", "less … than", "neither … nor", "either … or"],
      answer: 1,
      why: "Cümle iki şeyi karşılaştırıp birini öne çıkarıyor: `less … than`. Öteki üçü iki öğeyi eşitler ya da ikisini birden dışlar; hiçbiri öncelik sıralaması kurmaz.",
      targets: ["connector.correlative", "syntax.comparison"],
    },
    {
      id: "en-c1-w05-g5",
      block: "grammar",
      stem: "…of the kind that ___ in use elsewhere for years.",
      options: ["is long", "has long being", "was long been", "has long been"],
      answer: 3,
      why: "`for years` süreklilik bildiriyor ve şimdiye uzanıyor, yani present perfect gerekiyor: `has long been in use`. Basit şimdiki zaman süreyi taşımaz; `being` ve `was been` kurulamayan biçimler.",
      targets: ["tense.present-perfect", "adverb.position"],
      byNative: {
        de: {
          options: ["is long", "has long being", "was long been", "has long been"],
          answer: 3,
          why: "Almancada `seit Jahren in Gebrauch` şimdiki zamanla kurulur (`ist seit Jahren`), o yüzden `is` doğru görünüyor. İngilizcede geçmişten şimdiye uzanan süre present perfect ister.",
        },
      },
    },

    /* ── Bağlamda kelime ───────────────────────────────────────────────── */
    {
      id: "en-c1-w05-v1",
      block: "vocab",
      stem: "That is not quite ___.",
      options: ["accurate", "exacting", "right of", "true to"],
      answer: 0,
      why: "`accurate` bir ifadenin olguya uygunluğunu anlatır ve düzeltme dilinin yerleşik sözcüğüdür. `exacting` 'titiz, zahmetli' demek ve bir ifadeyi değil bir işi ya da kişiyi niteler; öteki ikisi bu konumda kurulmuş öbekler değildir.",
      targets: ["adjective.accurate", "wordfield.evidence"],
    },
    {
      id: "en-c1-w05-v2",
      block: "vocab",
      stem: "A decision that is not explained ___ support.",
      options: ["misses", "drops", "loses", "fails"],
      answer: 2,
      why: "`lose support` desteğin azalmasını anlatan yerleşik eşdizimdir. `miss` kaçırmak, `drop` düşürmek, `fail` başarısız olmaktır — üçü de `support` ile bu anlamı kurmaz.",
      targets: ["collocation.lose-support", "wordfield.politics"],
    },
    {
      id: "en-c1-w05-v3",
      block: "vocab",
      stem: "A correction would be ___.",
      options: ["approximate", "appropriate", "appreciated of", "approving"],
      answer: 1,
      why: "`appropriate` yerinde/uygun demek. `approximate` yaklaşık, `approving` onaylayan anlamına gelir — üçü de `appro-` ile başlıyor ama anlamları ayrı. Biçim benzerliği anlam benzerliği değildir.",
      targets: ["adjective.appropriate", "word-formation.confusable"],
    },
  ],
};
