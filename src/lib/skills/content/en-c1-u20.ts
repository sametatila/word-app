import type { SkillExercise } from "../types";

/**
 * EN · C1 · Ünite 20 — "Model ne kadar kesin, gerçekten canlandırıldı,
 * bir kent raporunu bir arada tutmak, planın söylemedikleri".
 *
 * Dört ders: How certain is the model · Revitalized indeed ·
 * Holding a city report together · What the plan leaves unsaid.
 *
 *   Kelime: feedback loop, tipping point, regenerative capacity, decompose,
 *           secrete, mitigate, gentrification, revitalize, densify, refurbish,
 *           inhospitable, traffic gridlock, spatial planning, zoning plan,
 *           change of use, accessibility, moratorium, construction freeze,
 *           fall into neglect, fall into ruin, dismantling, repurpose, designate.
 *   Kalıp:  A feedback loop may well push the system past a tipping point. ·
 *           The regenerative capacity might hold if the litter can decompose. ·
 *           Warm soil may secrete more gas and lose its thermal balance. ·
 *           The square was revitalized; the neighbors, less so. ·
 *           We have no gentrification here; we densify and refurbish. ·
 *           Car-friendly, they said, and rather good against traffic gridlock. ·
 *           The spatial planning outlined above is made concrete in the zoning plan below. ·
 *           That change of use, as noted, works in urban design terms only. ·
 *           In terms of scale, a fine-grained quarter serves accessibility better. ·
 *           The moratorium survives as a promise, the construction freeze as a date. ·
 *           The houses fall into neglect; the halls, into ruin. ·
 *           The dismantling began; the repurposing did not.
 *
 * Ünitenin tek öğretme noktası SIFIR TÜRETME. „The dismantling began; the
 * repurposing did not“ — tek satırda fiilden yapılmış iki isim, ikisi de
 * „-ing“ ekli. Öteki yol eksiz dönüşüm; onun hiçbir
 * şeyi yok: ne ek, ne biçim değişikliği, ne görünür bir iz — isim
 * olduğunu söyleyen tek şey önündeki „the“. Buna dönüşüm deniyor ve dilin
 * en ucuz makinesi: a build, a spend, an ask, a reveal, a read; öğrenilecek
 * liste yok, çünkü eklenecek bir şey yok. Almanca bunu YAPAMIYOR: orada
 * fiilden yapılan isim her zaman bir iz bırakıyor — en azından büyük harf,
 * çoğunlukla artikel, sıklıkla da ek — yani SINIF DEĞİŞİMİ YAZIYA
 * DÖKÜLÜYOR. Ölçü: **BİR ÜNİTE ÖNCE İNGİLİZCE ÖNEK EKLEYEREK SÖZCÜK
 * YAPIYORDU; BURADA HİÇBİR ŞEY EKLEMEDEN YAPIYOR — iki makine de üretken,
 * ikisi de beklemeyen okura görünmez, ve ikisinin bedeli de aynı: hiçten
 * kurulmuş yeni bir sözcük TERİM gibi duruyor.** Bir planlama belgesinde
 * başlık olarak „the repurpose“ gören okur, bir yerlerde onun formu
 * olduğunu varsayıyor; bu yüzden planda „the repurposing“ yazıyor.
 */
export const enC1U20: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-c1-u20-r1",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 20,
    title: "The old mill quarter waits",
    genre: "article",
    intro: "Kapanan bir tekstil fabrikasının mahallesi üzerine haber. Dönüşüm neden durdu?",
    gloss: [
      { de: "textile", tr: "tekstil" },
      { de: "a mill", tr: "fabrika" },
      { de: "a dye house", tr: "boyahane" },
      { de: "riverside", tr: "nehir kıyısındaki" },
      { de: "a loading dock", tr: "yükleme rampası" },
      { de: "dismantling", tr: "söküm" },
      { de: "repurposing", tr: "yeniden işlevlendirme" },
      { de: "removal", tr: "sökülme" },
      { de: "steel", tr: "çelik" },
      { de: "rebuilding", tr: "yeniden inşa" },
      { de: "a riverbank", tr: "nehir kıyısı" },
      { de: "a moratorium", tr: "moratoryum" },
      { de: "a construction freeze", tr: "inşaat yasağı" },
      { de: "lift", tr: "kaldırmak" },
      { de: "fall into neglect", tr: "bakımsız kalmak" },
      { de: "a roof", tr: "çatı" },
      { de: "a cottage", tr: "küçük ev" },
      { de: "inhabited", tr: "oturulan" },
      { de: "a courtyard", tr: "avlu" },
      { de: "a mural", tr: "duvar resmi" },
      { de: "a railway line", tr: "demiryolu hattı" },
      { de: "a property fund", tr: "gayrimenkul fonu" },
      { de: "designate", tr: "ilan etmek" },
      { de: "demolition", tr: "yıkım" },
      { de: "impossible", tr: "imkânsız" },
      { de: "a rescue", tr: "kurtarılma" },
      { de: "demolish", tr: "yıkmak" },
    ],
    minutes: 12,
    text:
      "THE OLD MILL QUARTER WAITS\n" +
      "When the Harlow textile mill closed in 2016, the city promised a new neighborhood within five years: apartments in the old spinning halls, a market in the dye house, a riverside park where the loading docks had been. Eight years later, the site tells a different story. The dismantling began; the repurposing did not.\n" +
      "The machines went first. Their removal took eighteen months and was paid for by selling the steel. Then the funding for the rebuilding ran out, and a dispute between the owner and the city over the flooding risk on the riverbank stopped everything else.\n" +
      "In 2021 the council declared a moratorium on new permits in the quarter until a flood study was finished, and a construction freeze on the riverside lots. The study was delivered in 2023. The moratorium survives as a promise, the construction freeze as a date: the council says the first will be lifted „soon“; the second ends officially on 31 December.\n" +
      "Meanwhile, the quarter is changing on its own. The houses fall into neglect; the halls, into ruin. Windows are broken, the roof of the dye house collapsed in a storm last winter, and the cottages along Canal Street, most of them still inhabited, have not been repaired since the mill closed.\n" +
      "Residents have not given up. A group called Mill Quarter Neighbors has started its own small projects: a Saturday market in the courtyard, a mural on the water tower and the planting of fruit trees along the old railway line. „We cannot wait for the planning to finish,“ says Lena Brandt, who grew up in one of the cottages. „By then there will be nothing left to plan.“\n" +
      "The owner, a property fund based in another city, did not answer questions for this article. The city says it hopes to designate the halls as protected buildings next year, which would make their demolition impossible and their rescue more expensive.",
    questions: [
      {
        text: "How was the removal of the machines paid for?",
        options: ["by selling the steel", "by the city", "by the property fund"],
        answer: 0,
        explain: "„Their removal took eighteen months and was paid for by selling the steel.“",
      },
      {
        text: "When does the construction freeze end?",
        options: ["on 31 December", "soon", "next year"],
        answer: 0,
        explain: "„the second ends officially on 31 December.“",
      },
      {
        kind: "truefalse",
        text: "Most of the cottages on Canal Street are still inhabited.",
        options: ["True", "False"],
        answer: 0,
        explain: "„…the cottages along Canal Street, most of them still inhabited, have not been repaired since the mill closed.“",
      },
      {
        kind: "gapfill",
        text: "The dismantling began; the ___ did not.",
        options: [],
        answer: 0,
        accept: ["repurposing"],
        explain: "„The dismantling began; the repurposing did not.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The mill closed in 2016.",
          "The council declared a moratorium.",
          "The roof of the dye house collapsed.",
          "Residents started a Saturday market.",
        ],
        explain: "Fabrikanın kapanması, belediyenin kararı, çürüyen binalar, en sonda mahallelinin girişimleri.",
      },
      {
        kind: "short_answer",
        text: "What would protection make impossible?",
        options: [],
        answer: 0,
        accept: ["their demolition", "demolition", "demolishing the halls"],
        explain: "„…which would make their demolition impossible and their rescue more expensive.“",
      },
    ],
  },
  {
    id: "en-c1-u20-r2",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 20,
    title: "From plan to zoning map",
    genre: "report",
    intro: "Bir kent planlama raporundan bölüm. Plan neyi karara bağlıyor, neyi bağlamıyor?",
    gloss: [
      { de: "adopt", tr: "kabul etmek" },
      { de: "industrial", tr: "sanayi" },
      { de: "a facade", tr: "cephe" },
      { de: "peak hours", tr: "yoğun saatler" },
      { de: "funds", tr: "finanse etmek" },
      { de: "fund", tr: "finanse etmek" },
      { de: "a pedestrian bridge", tr: "yaya köprüsü" },
      { de: "a rail yard", tr: "demiryolu sahası" },
      { de: "propose", tr: "önermek" },
      { de: "a grocery store", tr: "market" },
      { de: "guarantee", tr: "garanti etmek" },
      { de: "affordable", tr: "uygun fiyatlı" },
      { de: "affordability", tr: "karşılanabilirlik" },
      { de: "a consultation", tr: "halka danışma" },
      { de: "summarize", tr: "özetlemek" },
    ],
    minutes: 12,
    text:
      "RIVERSIDE DISTRICT: PLANNING UPDATE, SECTION 4\n" +
      "4.1 From plan to map. The spatial planning outlined above is made concrete in the zoning plan below. The framework adopted in 2022 set three goals for the Riverside district: more housing, more green space and shorter distances to daily services. The zoning plan now fixes where each of these will happen, block by block, and it will be open for public comment from 3 March to 14 April.\n" +
      "4.2 The former printing works. The owner has applied for a change of use from industrial to residential. That change of use, as noted in section 2, works in urban design terms only. The height, facade and street line of the building suit a residential street. However, the site has no school within walking distance, and the traffic study shows the access road already at capacity at peak hours. The planning office therefore recommends approval only if the owner funds a new pedestrian bridge.\n" +
      "4.3 Block sizes. In terms of scale, a fine-grained quarter serves accessibility better. The plan divides the former rail yard into blocks of no more than 80 meters per side, rather than the 250-meter blocks proposed by the developer in 2021. Smaller blocks mean more street corners, more stores on the ground floor and shorter walks: in the model, the average walk to a grocery store falls from eleven minutes to six.\n" +
      "4.4 What the plan does not decide. The zoning plan fixes uses and heights. It does not set rents, and it cannot guarantee that the new apartments will be affordable. Measures on affordability are discussed in section 6.\n" +
      "4.5 Next steps. Comments received during the consultation will be summarized in a report to the council in May. A map of all proposed changes is attached as Annex B.",
    questions: [
      {
        text: "When is the zoning plan open for public comment?",
        options: ["from 3 March to 14 April", "in May", "in 2022"],
        answer: 0,
        explain: "„…it will be open for public comment from 3 March to 14 April.“",
      },
      {
        text: "What must the owner of the printing works fund?",
        options: ["a new pedestrian bridge", "a school", "a new access road"],
        answer: 0,
        explain: "„The planning office therefore recommends approval only if the owner funds a new pedestrian bridge.“",
      },
      {
        kind: "truefalse",
        text: "The zoning plan guarantees affordable apartments.",
        options: ["True", "False"],
        answer: 1,
        explain: "„It does not set rents, and it cannot guarantee that the new apartments will be affordable.“",
      },
      {
        kind: "gapfill",
        text: "In terms of scale, a fine-grained quarter serves ___ better.",
        options: [],
        answer: 0,
        accept: ["accessibility"],
        explain: "„In terms of scale, a fine-grained quarter serves accessibility better.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The framework set three goals.",
          "The owner applied for a change of use.",
          "The blocks are no more than 80 meters per side.",
          "Comments will be summarized in May.",
        ],
        explain: "Planın hedefleri, matbaa binası, blok büyüklüğü, en sonda sonraki adımlar.",
      },
      {
        kind: "short_answer",
        text: "How long will the average walk to a grocery store be?",
        options: [],
        answer: 0,
        accept: ["six minutes", "6 minutes", "six"],
        explain: "„…the average walk to a grocery store falls from eleven minutes to six.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-c1-u20-l1",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 20,
    title: "A new square, higher rents",
    genre: "dialogue",
    intro: "Yenilenen bir meydan üzerine radyo tartışması. Kira artışını kim, nasıl açıklıyor?",
    gloss: [
      { de: "a bench", tr: "bank" },
      { de: "a refurbishment", tr: "tadilat" },
      { de: "a junction", tr: "kavşak" },
      { de: "simply", tr: "düpedüz" },
      { de: "rise", tr: "yükselmek" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Kaya", text: "Two years ago this square was a parking lot. Today there are trees, benches and a market on Thursdays, and people love it." },
      { speaker: "Bilge", text: "People who visit it love it. The square was revitalized; the neighbors, less so. Rents on the four streets around it went up by a third in eighteen months." },
      { speaker: "Kaya", text: "Rents are rising everywhere in the city. We have no gentrification here; we densify and refurbish." },
      { speaker: "Bilge", text: "Refurbishing is exactly the problem. After a refurbishment the landlord can raise the rent, and three families in my building have already moved out." },
      { speaker: "Kaya", text: "The city cannot control private rents." },
      { speaker: "Bilge", text: "It can collect the numbers. How many leases changed hands on each street in the last three years? You have those data and you have never published them." },
      { speaker: "Kaya", text: "We will look at that. But the square also solved a real problem. Before, it was dark and inhospitable at night." },
      { speaker: "Bilge", text: "Nobody disputes the trees. What worries me is the next project, the new ring road. Car-friendly, they said, and rather good against traffic gridlock." },
      { speaker: "Kaya", text: "The junction at the bridge is blocked every morning. Something has to be done." },
      { speaker: "Bilge", text: "A new lane fills up in about four years, and the jam simply moves one street along. That has been studied for decades." },
      { speaker: "Kaya", text: "So what would you do instead?" },
      { speaker: "Bilge", text: "A tram line, and a public register of rents. Together they cost less than the road." },
    ],
    questions: [
      {
        text: "What was the square two years ago?",
        options: ["a parking lot", "a market", "a park"],
        answer: 0,
        explain: "„Two years ago this square was a parking lot.“",
      },
      {
        text: "How much did rents rise around the square?",
        options: ["by a third", "by half", "not at all"],
        answer: 0,
        explain: "„Rents on the four streets around it went up by a third in eighteen months.“",
      },
      {
        kind: "truefalse",
        text: "Three families in Bilge's building have moved out.",
        options: ["True", "False"],
        answer: 0,
        explain: "„three families in my building have already moved out.“",
      },
      {
        kind: "gapfill",
        text: "Car-friendly, they said, and rather good against traffic ___.",
        options: [],
        answer: 0,
        accept: ["gridlock"],
        explain: "„Car-friendly, they said, and rather good against traffic gridlock.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["The square was revitalized; the neighbors, less so.", "The square was revitalized; the neighbors, less so"],
        explain: "Meydan canlandı ama komşular için aynı şey söylenemez; ikinci yarıda fiil tekrarlanmıyor.",
      },
      {
        kind: "short_answer",
        text: "What does Bilge want instead of the road?",
        options: [],
        answer: 0,
        accept: ["a tram line", "a tram", "a tram and a register"],
        explain: "„A tram line, and a public register of rents.“",
      },
    ],
  },
  {
    id: "en-c1-u20-l2",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 20,
    title: "Feedback loops and tipping points",
    genre: "monologue",
    intro: "Bir iklim bilimcinin podcast bölümü: kuzeydeki orman ölçümleri. Model neyi biliyor, neyi bilmiyor?",
    gloss: [
      { de: "a circle", tr: "döngü" },
      { de: "elsewhere", tr: "başka yerde" },
      { de: "capture", tr: "tutmak" },
      { de: "decomposition", tr: "çürüme" },
      { de: "a prediction", tr: "tahmin" },
      { de: "lead to", tr: "götürmek" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Neval", text: "Welcome back. Today I want to talk about the forest plots we have been measuring in the north since 2011, and about what they can and cannot tell us." },
      { speaker: "Neval", text: "The short answer first. A feedback loop may well push this system past a tipping point. We see signs of it, but we cannot yet say when, or whether it has already started." },
      { speaker: "Neval", text: "Here is how the loop works. Warm soil may secrete more gas and lose its thermal balance. The gas warms the air, and the air warms the soil again." },
      { speaker: "Neval", text: "The question is whether that circle becomes strong enough to keep going on its own. If it does, cutting emissions elsewhere would slow it down but might not stop it." },
      { speaker: "Neval", text: "There is also a reason for hope. The regenerative capacity might hold if the litter can decompose. Fallen leaves that break down feed new growth and keep carbon in the ground." },
      { speaker: "Neval", text: "On cold ground, leaves hardly break down at all. In the last three warm winters they decomposed twice as fast as in our first years, faster than our model expected." },
      { speaker: "Neval", text: "So is that good news or bad news? It may be both. More growth captures carbon, but faster decomposition also releases it." },
      { speaker: "Neval", text: "What our model gives us is a range, from a small loss of carbon to a large one by 2060. The middle of that range is not a prediction; the model never said the middle." },
      { speaker: "Neval", text: "If both ends of the range lead to the same decision, protecting these forests, then we should make that decision now and stop waiting for a single number." },
    ],
    questions: [
      {
        text: "Since when have the forest plots been measured?",
        options: ["since 2011", "since 2060", "for three winters"],
        answer: 0,
        explain: "„…the forest plots we have been measuring in the north since 2011…“",
      },
      {
        text: "How fast did the leaves decompose in the last three warm winters?",
        options: ["twice as fast", "not at all", "half as fast"],
        answer: 0,
        explain: "„In the last three warm winters they decomposed twice as fast as in our first years…“",
      },
      {
        kind: "truefalse",
        text: "The model predicts the middle of the range.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The middle of that range is not a prediction; the model never said the middle.“",
      },
      {
        kind: "gapfill",
        text: "The regenerative capacity might hold if the litter can ___.",
        options: [],
        answer: 0,
        accept: ["decompose"],
        explain: "„The regenerative capacity might hold if the litter can decompose.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: [
          "A feedback loop may well push this system past a tipping point.",
          "A feedback loop may well push this system past a tipping point",
        ],
        explain: "Bilim insanı kesin konuşmuyor: „may well“ güçlü ama kanıtlanmamış bir olasılık bildiriyor.",
      },
      {
        kind: "short_answer",
        text: "What decision should be made now?",
        options: [],
        answer: 0,
        accept: ["protecting these forests", "protect the forests", "protecting the forests"],
        explain: "„If both ends of the range lead to the same decision, protecting these forests, then we should make that decision now…“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-c1-u20-w1",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 20,
    title: "An old industrial quarter",
    genre: "info",
    intro: "Eski bir fabrika mahallesi ve kent planı üzerine notlar yaz.",
    gloss: [
      { de: "a dismantling", tr: "sökme" },
      { de: "a moratorium", tr: "moratoryum" },
      { de: "a construction freeze", tr: "inşaatın durdurulması" },
      { de: "spatial planning", tr: "mekânsal planlama" },
      { de: "a zoning plan", tr: "imar planı" },
      { de: "accessibility", tr: "erişilebilirlik" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Sökme başladı; yeniden işlevlendirme başlamadı.",
        answer: "The dismantling began; the repurposing did not.",
        hint: "İkisi de „-ing“ ekli: ikisi de fiilden isim.",
      },
      {
        kind: "build",
        tr: "Moratoryum bir söz olarak, inşaatın durdurulması bir tarih olarak sağ kalıyor.",
        answer: "The moratorium survives as a promise, the construction freeze as a date.",
        hint: "İkinci yarıda fiil yok; iki şey iki ayrı biçimde sürüyor.",
      },
      {
        kind: "build",
        tr: "Evler bakımsız kalıyor; salonlar harabeye dönüyor.",
        answer: "The houses fall into neglect; the halls, into ruin.",
        hint: "Fiil gitmiş; geriye kalan edat farkı taşıyor.",
      },
      {
        kind: "build",
        tr: "Yukarıda özetlenen mekânsal planlama, aşağıdaki imar planında somutlaşıyor.",
        answer: "The spatial planning outlined above is made concrete in the zoning plan below.",
        hint: "Biri niyet, öteki hukuki belge.",
      },
      {
        kind: "build",
        tr: "Ölçek bakımından ince dokulu bir mahalle erişilebilirliğe daha iyi hizmet eder.",
        answer: "In terms of scale, a fine-grained quarter serves accessibility better.",
        hint: "Çerçeve iddiadan önce boyutu adlandırıyor.",
      },
      {
        kind: "form",
        prompt: "Mahalle bülteni için durum kartını doldur.",
        facts: "Tekstil fabrikası 2016'da kapandı; makinelerin sökülmesi başladı ama binaların yeni kullanıma dönüştürülmesi başlamadı; inşaat yasağı 31 Aralık'ta bitiyor; mahalleli avluda bir cumartesi pazarı kurdu.",
        fields: [
          { label: "The mill closed", answer: "in 2016", accept: ["2016"] },
          { label: "The dismantling", answer: "began", accept: ["it began", "started"] },
          { label: "The repurposing", answer: "did not begin", accept: ["not yet", "it did not"] },
          { label: "The construction freeze ends", answer: "on 31 December", accept: ["31 December", "December 31"] },
          { label: "The residents started", answer: "a Saturday market", accept: ["a market", "Saturday market"] },
        ],
      },
    ],
  },
  {
    id: "en-c1-u20-w2",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 20,
    title: "City change and nature",
    genre: "info",
    intro: "Kentsel dönüşüm ve bir iklim modeli üzerine cümleler kur.",
    gloss: [
      { de: "to revitalize", tr: "canlılık kazandırmak" },
      { de: "gentrification", tr: "soylulaştırma" },
      { de: "to densify", tr: "yoğunlaştırmak" },
      { de: "a feedback loop", tr: "geri besleme döngüsü" },
      { de: "a tipping point", tr: "devrilme noktası" },
      { de: "regenerative capacity", tr: "yenilenme kapasitesi" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Meydana canlılık kazandırıldı; komşulara, daha az.",
        answer: "The square was revitalized; the neighbors, less so.",
        hint: "İki sözcük bütün projeyi bildiriyor.",
      },
      {
        kind: "build",
        tr: "Burada soylulaştırma yok; yoğunlaştırıyor ve elden geçiriyoruz.",
        answer: "We have no gentrification here; we densify and refurbish.",
        hint: "Tür yadsınıyor, örnek iki fiille kabul ediliyor.",
      },
      {
        kind: "build",
        tr: "Otomobil odaklı, dediler, üstelik trafik felcine karşı iyi geliyor.",
        answer: "Car-friendly, they said, and rather good against traffic gridlock.",
        hint: "Sondaki iltifatı bir yüzyıl sınadı.",
      },
      {
        kind: "build",
        tr: "Bir geri besleme döngüsü sistemi pekâlâ devrilme noktasının ötesine itebilir.",
        answer: "A feedback loop may well push the system past a tipping point.",
        hint: "Önemli olan dikkatli sözcük „may“.",
      },
      {
        kind: "build",
        tr: "Döküntü çürüyebilirse yenilenme kapasitesi tutabilir.",
        answer: "The regenerative capacity might hold if the litter can decompose.",
        hint: "On sözcükte iki koşul; işi ikincisi görüyor.",
      },
    ],
  },
];
