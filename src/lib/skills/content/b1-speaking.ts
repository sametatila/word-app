import type { SkillExercise } from "../types";

/**
 * B1 · Ses çalışması — A1'de kurulan seslerin ÜSTÜNE gelen katman.
 *
 * Neden bu dosya var: seviye sınavının Sprechen bölümü beceri bankasından
 * besleniyor ve `exam.ts` oraya yalnız `genre: "Ses çalışması"` etiketli
 * konuşma drill'lerini alıyor (bkz. exam.ts, `drills` filtresi). B1 bankasında
 * hiç konuşma egzersizi yoktu, dolayısıyla B1 seviye sınavında konuşma bölümü
 * hiç çıkmıyordu — kâğıt üç cümle istiyor, banka sıfır veriyordu. Bölüm boş
 * kalınca ağırlığı diğerlerine dağılıyor (öğrenci ceza almıyor), ama konuşma
 * tabanlı bir kursta B1 sertifikasının konuşma ÖLÇMEMESİ ciddi bir eksik.
 *
 * İçerik A1'i TEKRARLAMIYOR. a1-speaking.ts tek tek sesleri kuruyor: z, s,
 * st/sp, v/w, ch, -er, ei/ie, ünlü uzunluğu. Onlar B1'de çoktan oturmuş
 * sayılır. B1'de bozulan şey ses değil, sesin CÜMLE İÇİNDEKİ davranışı:
 * cümleler uzadıkça vurgu, bağlanma ve ritim hataları ortaya çıkıyor, tek
 * kelime söylerken görünmüyorlar. Dokuz başlığın her biri Türkçe ile Almanca
 * arasında yapısal bir farktan doğuyor:
 *
 *   ü5   Knacklaut. Türkçe ünlüyle başlayan kelimeyi öncekine BAĞLAR
 *        ("bir elma" → "birelma"). Almanca bağlamaz, ünlüden önce gırtlağı
 *        kapatıp yeniden açar: "das ‿Auto" değil "das | Auto".
 *   ü10  Schwa. Türkçede vurgusuz hece sönmez, her ünlü tam okunur.
 *        Almancada -e ve -en sönük: "haben" ≈ "haabm", "gesagt" ≈ "gzaakt".
 *        B1'de Perfekt her cümlede; ge-…-t/-en'i harf harf okumak yoruyor.
 *   ü15  R'nin iki yüzü. Türkçe r dilin ucuyla çarpılır ve her yerde aynıdır.
 *        Almancada ünlüden ÖNCE boğazdan ([ʁ]), ünlüden SONRA ünlüleşir ([ɐ]).
 *        A1 yalnız "-er" sonunu görmüştü; burada kuralın tamamı var.
 *   ü20  Ünsüz kümeleri. Türkçe hece yapısı yığın sevmez ve araya ünlü
 *        sokar: "Herbst" → "herbıst", "sprichst" → "sıprihist". Almanca
 *        araya ünlü koymaz; eklenen her ünlü heceyi ve ritmi bozuyor.
 *   ü25  pf ve qu. İkisi de Türkçede yok. "Kopf" → "kop", "Qualität" →
 *        "kualite" oluyor; oysa pf tek hamlede, qu ise [kv] okunuyor.
 *   ü30  Bileşik vurgusu. Almanca bileşikte vurgu HER ZAMAN ilk parçada:
 *        ÁRbeitsplatz. Türkçe tamlamada vurgu sona kayar ("iş yerÍ"), o
 *        yüzden öğrenci bileşiğin sonunu vurguluyor ve kelime dağılıyor.
 *   ü35  Ön ek vurgusu. Ayrılabilen ön ek VURGULU (ÚMziehen), ayrılamayan
 *        vurgusuz (überSÉTZen). Türkçede vurgunun böyle bir dilbilgisi işi
 *        yok; yanlış vurgu burada yalnız aksan değil, ANLAM değiştiriyor.
 *   ü40  Cümle vurgusu. Almanca cümlenin bir odağı vardır ve o odak
 *        cümlenin neyi söylediğini belirler. Türkçe aynı işi kelime
 *        SIRASIYLA yapar (odak fiilden önce gelir), o yüzden Türkçe konuşan
 *        cümleyi düz okuyor ve odak kayboluyor.
 *   ü45  Tonlama. Türkçede evet/hayır sorusunu "mi" taşır, ton taşımaz.
 *        Almancada soru ekini TON yapıyor: yükselen ton = evet/hayır sorusu,
 *        inen ton = W-sorusu. Düz okunan "Kommen Sie morgen?" soru gibi
 *        duyulmuyor.
 *
 * `confusions.heard` alanı, hata yapıldığında tanıyıcının ÜRETECEĞİ biçimi
 * yazıyor: öğrenciye "yanlış" demek yerine ne duyulduğunu söyleyebiliyoruz.
 *
 * Yerleşim beşer ünite arayla (5, 10, … 45). Konuşma `BASE_PATTERN`'de bir
 * slot değil — bu egzersizler patikadan değil, /skills sayfasından ve seviye
 * sınavından ulaşılıyor. Ünite etiketi kelime disiplini içindir: her cümle
 * yalnız o üniteye kadar öğretilen kelimelerden kuruluyor
 * (`npm run check:unitvocab -- b1`).
 */
export const b1Speaking: SkillExercise[] = [
  {
    id: "b1-u05-s1",
    level: "B1",
    skill: "speaking",
    unit: 5,
    title: "Knacklaut: kelimeleri birbirine bağlama",
    genre: "Ses çalışması",
    intro:
      "Türkçede ünlüyle başlayan kelime öncekine yapışır. Almancada yapışmaz: „am Abend“ tek kelime gibi değil, iki kelime gibi söylenir.",
    gloss: [
      { de: "der Abend", tr: "akşam", en: "evening" },
      { de: "die Idee", tr: "fikir", en: "idea" },
      { de: "allein", tr: "yalnız", en: "alone" },
    ],
    minutes: 4,
    tasks: [
      {
        de: "Am Abend arbeite ich allein.",
        tr: "Akşam yalnız çalışıyorum.",
        hint: "„am | Abend“ — m ile A arasında gırtlağı bir an kapat. „amaabend“ olmayacak.",
        confusions: [
          { heard: ["amabend", "am abend zusammen"], fix: "İki kelimeyi birleştirdin; Abend'in A'sından önce kısa bir duraklama var.", expected: "am Abend" },
        ],
      },
      {
        de: "Ich habe eine gute Idee.",
        tr: "İyi bir fikrim var.",
        hint: "„eine | Idee“ ve „I-dee“: iki ünlü de kendi başına başlıyor, „ayni-dee“ değil.",
        confusions: [
          { heard: ["einidee", "eine idee zusammen"], fix: "eine ile Idee birbirine aktı; Idee'nin başında yeniden başla.", expected: "eine Idee" },
        ],
      },
      {
        de: "Er antwortet auf die E-Mail.",
        tr: "E-postaya cevap veriyor.",
        hint: "„Er | antwortet | auf“ — üç kelime, üç ayrı başlangıç.",
      },
      {
        de: "Das alte Auto ist kaputt.",
        tr: "Eski araba bozuk.",
        hint: "Ünlüyle başlayan üç kelime peş peşe: „alte | Auto | ist“. Hepsini ayrı ayrı bas.",
        confusions: [
          { heard: ["dasalte auto", "das alteauto"], fix: "Kelimeler birbirine aktı; her ünlüden önce gırtlağı kapat.", expected: "das alte Auto" },
        ],
      },
      {
        de: "Sie erklärt es uns noch einmal.",
        tr: "Bize bir kez daha açıklıyor.",
        hint: "„es | uns“ ve „noch | einmal“ — arada boşluk duyulmalı.",
      },
      {
        de: "Wir essen heute um acht.",
        tr: "Bugün sekizde yiyoruz.",
        hint: "„um | acht“: m'den sonra durakla, yoksa tek kelime gibi duyulur.",
        confusions: [
          { heard: ["umacht", "um acht zusammen"], fix: "„um acht“ iki kelime; birleştirince „umacht“ diye duyuluyor.", expected: "um acht" },
        ],
      },
    ],
  },
  {
    id: "b1-u10-s1",
    level: "B1",
    skill: "speaking",
    unit: 10,
    title: "Sönük heceler: -e ve -en",
    genre: "Ses çalışması",
    intro:
      "Almancada vurgusuz -e ve -en neredeyse duyulmaz. Türkçede her ünlü tam okunur; bu fark Perfekt cümlelerinde en çok göze batar.",
    gloss: [
      { de: "warten", tr: "beklemek", en: "to wait" },
      { de: "vergessen", tr: "unutmak", en: "to forget" },
      { de: "anfangen", tr: "başlamak", en: "to start" },
    ],
    minutes: 4,
    tasks: [
      {
        de: "Wir haben sehr lange gewartet.",
        tr: "Çok uzun bekledik.",
        hint: "„haben“ ≈ HAA-bm, sonunda e yok. „gewartet“ ≈ g'VAR-tet, baştaki ge- sönük.",
        confusions: [
          { heard: ["ha-ben", "ge-wartet"], fix: "Heceleri tam okudun; vurgusuz e'yi sön dür, yalnız vurgulu heceyi bas.", expected: "haben gewartet" },
        ],
      },
      {
        de: "Sie hat den Brief geschrieben.",
        tr: "Mektubu yazdı.",
        hint: "„geschrieben“ ≈ g'ŞRİİ-bm. Tek vurgu ŞRİİ'de; ge- ve -en sönük.",
      },
      {
        de: "Die Kinder sind endlich gekommen.",
        tr: "Çocuklar sonunda geldi.",
        hint: "„gekommen“ ≈ g'KO-mm. Sondaki -en'i „en“ diye söyleme.",
        confusions: [
          { heard: ["ge kommen", "gekommenn"], fix: "Sondaki -en ayrı hece değil, m'nin içinde eriyor.", expected: "gekommen" },
        ],
      },
      {
        de: "Ich habe das nicht verstanden.",
        tr: "Bunu anlamadım.",
        hint: "„verstanden“ ≈ fer-ŞTAN-dn. Üç hecenin yalnız ortası tam.",
      },
      {
        de: "Wir wollen morgen früh anfangen.",
        tr: "Yarın erken başlamak istiyoruz.",
        hint: "„wollen“ ≈ VO-ln, „anfangen“ ≈ AN-fang-n. Vurgu ilk hecede.",
      },
      {
        de: "Er hat den Termin wieder vergessen.",
        tr: "Randevuyu yine unuttu.",
        hint: "„vergessen“ ≈ fer-GE-sn. Baştaki ver- sönük, vurgu GE'de.",
        confusions: [
          { heard: ["fer gessen", "vergessenn"], fix: "ver-'i tam okudun; o hece sönük, vurgu ortadaki GE'de.", expected: "vergessen" },
        ],
      },
    ],
  },
  {
    id: "b1-u15-s1",
    level: "B1",
    skill: "speaking",
    unit: 15,
    title: "R'nin iki yüzü: boğazda ve ünlüleşerek",
    genre: "Ses çalışması",
    intro:
      "Almanca r ünlüden ÖNCE boğazdan gelir, ünlüden SONRA neredeyse „a“ya döner. Türkçedeki tek r her iki yerde de yanlış duyuluyor.",
    gloss: [
      { de: "der Verkehr", tr: "trafik", en: "traffic" },
      { de: "zurück", tr: "geri", en: "back" },
      { de: "die Regel", tr: "kural", en: "rule" },
    ],
    minutes: 4,
    tasks: [
      {
        de: "Ihr Bruder arbeitet hier in der Stadt.",
        tr: "Erkek kardeşi burada şehirde çalışıyor.",
        hint: "„Bruder“ = BRUU-da: baştaki r boğazda, sondaki -er neredeyse „a“. İkisi aynı harf, aynı ses değil.",
        confusions: [
          { heard: ["bruderr", "hierr"], fix: "Sondaki r'yi dilinle çarptın; orada r ünlüleşiyor, „a“ gibi duyulmalı.", expected: "Bruder hier" },
        ],
      },
      {
        de: "Wir fahren morgen früher zurück.",
        tr: "Yarın daha erken dönüyoruz.",
        hint: "„früher“ = FRÜÜ-a. Baştaki fr- boğazda, sondaki -er ünlü.",
      },
      {
        de: "Der Verkehr war heute sehr stark.",
        tr: "Trafik bugün çok yoğundu.",
        hint: "„Verkehr“ = fea-KEEA. İki r de ünlüden sonra, ikisi de „a“ya dönüyor.",
        confusions: [
          { heard: ["ferkerr", "verkehr mit r"], fix: "İki r'yi de çarptın; ikisi de ünlüden sonra geliyor, ikisi de sönük.", expected: "Verkehr" },
        ],
      },
      {
        de: "Die Regel ist ganz richtig.",
        tr: "Kural tamamen doğru.",
        hint: "„Regel“ ve „richtig“ — ikisinde de r ünlüden önce, yani boğazda. Dilinin ucu hiç kıpırdamasın.",
      },
      {
        de: "Herr Richter ruft morgen an.",
        tr: "Bay Richter yarın arayacak.",
        hint: "„Richter“de iki r var: baştaki boğazda, sondaki „a“. „ruft“ta boğazda.",
      },
      {
        de: "Wir waren vier Stunden unterwegs.",
        tr: "Dört saat yoldaydık.",
        hint: "„vier“ = FİİA, sondaki r ünlü. „waren“ = VAA-rn, ortadaki r boğazda.",
        confusions: [
          { heard: ["fierr", "vier mit r"], fix: "„vier“in sonunda r yok gibi; uzun İ'den sonra hafif bir „a“ var.", expected: "vier" },
        ],
      },
    ],
  },
  {
    id: "b1-u20-s1",
    level: "B1",
    skill: "speaking",
    unit: 20,
    title: "Ünsüz yığınları: araya ünlü koymadan",
    genre: "Ses çalışması",
    intro:
      "Türkçe hece yapısı arka arkaya üç ünsüzü sevmez ve araya bir ünlü sokar. Almancada o ünlü yok; eklenince hece sayısı değişiyor.",
    gloss: [
      { de: "der Herbst", tr: "sonbahar", en: "autumn" },
      { de: "die Angst", tr: "korku", en: "fear" },
      { de: "das Rezept", tr: "reçete", en: "prescription" },
    ],
    minutes: 5,
    tasks: [
      {
        de: "Im Herbst wird es früh dunkel.",
        tr: "Sonbaharda erken kararıyor.",
        hint: "„Herbst“ TEK hece: h-e-r-b-s-t. „herbıst“ iki hece olur, yanlış.",
        confusions: [
          { heard: ["herbist", "herebst"], fix: "Araya ünlü koydun; rbst'yi tek nefeste, ünlüsüz bitir.", expected: "Herbst" },
        ],
      },
      {
        de: "Du sprichst wirklich gut Deutsch.",
        tr: "Gerçekten iyi Almanca konuşuyorsun.",
        hint: "„sprichst“ tek hece: şp-r-i-h-st. Baştaki sp = „şp“.",
        confusions: [
          { heard: ["sipirihist", "sprichist"], fix: "Üç yerde ünlü eklemişsin; kelime tek hece.", expected: "sprichst" },
        ],
      },
      {
        de: "Ich habe Angst vor der Prüfung.",
        tr: "Sınavdan korkuyorum.",
        hint: "„Angst“ sonu ngst — dördü de ünlüsüz. „angıst“ değil.",
      },
      {
        de: "Der Arzt schreibt mir ein Rezept.",
        tr: "Doktor bana bir reçete yazıyor.",
        hint: "„Arzt“ = a-rts-t, tek hece. „schreibt“ = şraypt, sonu -pt.",
        confusions: [
          { heard: ["arzıt", "artzet"], fix: "„Arzt“ tek hece; z zaten „ts“, araya ünlü girmiyor.", expected: "Arzt" },
        ],
      },
      {
        de: "Selbst am Sonntag frühstücke ich spät.",
        tr: "Pazar günü bile geç kahvaltı ediyorum.",
        hint: "„selbst“ = z-e-l-p-st, tek hece. „frühstücke“nin ortasında hst yığını var.",
      },
      {
        de: "Sie kommt zuerst zum Bahnhof.",
        tr: "Önce gara geliyor.",
        hint: "„zuerst“ = tsu-EERST, sonu -rst. „kommt“ sonu -mt.",
      },
    ],
  },
  {
    id: "b1-u25-s1",
    level: "B1",
    skill: "speaking",
    unit: 25,
    title: "pf ve qu: Türkçede olmayan iki ses",
    genre: "Ses çalışması",
    intro:
      "„pf“ tek harekette söylenir, p ile f arasında duraklama yoktur. „qu“ ise „ku“ değil, „kv“ okunur.",
    gloss: [
      { de: "der Apfel", tr: "elma", en: "apple" },
      { de: "die Pflanze", tr: "bitki", en: "plant" },
      { de: "die Qualität", tr: "kalite", en: "quality" },
    ],
    minutes: 4,
    tasks: [
      {
        de: "Der Apfel liegt auf dem Tisch.",
        tr: "Elma masanın üstünde duruyor.",
        hint: "„Apfel“ = A-pfel. Dudak p için kapanır ve açılırken f'ye geçer; arada ünlü yok.",
        confusions: [
          { heard: ["afel", "apel"], fix: "p ya da f'den birini yuttun; ikisi tek harekette birlikte.", expected: "Apfel" },
        ],
      },
      {
        de: "Ich habe seit gestern Kopfschmerzen.",
        tr: "Dünden beri başım ağrıyor.",
        hint: "„Kopf“ sonu pf; „kop“ demek yetmiyor, f duyulmalı.",
        confusions: [
          { heard: ["kop schmerzen", "kopf mit pause"], fix: "pf'yi ikiye böldün ya da f'yi düşürdün; tek hamlede söyle.", expected: "Kopfschmerzen" },
        ],
      },
      {
        de: "Die Pflanze braucht jeden Tag Wasser.",
        tr: "Bitkinin her gün suya ihtiyacı var.",
        hint: "„Pflanze“ = PFLAN-tse. Başta pf, hemen ardından l geliyor.",
      },
      {
        de: "Die Qualität ist wirklich gut.",
        tr: "Kalite gerçekten iyi.",
        hint: "„Qualität“ = kva-li-TEET. qu = kv, vurgu son hecede.",
        confusions: [
          { heard: ["kualitet", "kwalitet"], fix: "qu'yu „ku“ okudun; Almancada „kv“.", expected: "Qualität" },
        ],
      },
      {
        de: "Das Pferd steht auf der Wiese.",
        tr: "At çayırda duruyor.",
        hint: "„Pferd“ = PFEEAT. Başta pf, sonda -rd sertleşip „t“ oluyor.",
      },
      {
        de: "Er hat seine Pflicht ganz vergessen.",
        tr: "Görevini tamamen unuttu.",
        hint: "„Pflicht“ = PFLİHT. pf + l, sonra ich-sesi.",
      },
    ],
  },
  {
    id: "b1-u30-s1",
    level: "B1",
    skill: "speaking",
    unit: 30,
    title: "Bileşik kelimede vurgu: ilk parça",
    genre: "Ses çalışması",
    intro:
      "Almanca bileşik kelimede vurgu her zaman İLK parçadadır. Türkçe tamlamada vurgu sona kaydığı için uzun bileşikler yanlış yerden vurgulanıyor.",
    gloss: [
      { de: "die Krankenversicherung", tr: "sağlık sigortası", en: "health insurance" },
      { de: "die Arbeitszeit", tr: "çalışma saati", en: "working hours" },
      { de: "der Führerschein", tr: "ehliyet", en: "driving licence" },
    ],
    minutes: 5,
    tasks: [
      {
        de: "Die Krankenversicherung zahlt die Rechnung.",
        tr: "Sağlık sigortası faturayı ödüyor.",
        hint: "KRAN-kenversicherung. Beş hece uzun, ama vurgu tek: en baştaki KRAN.",
        confusions: [
          { heard: ["krankenversiCHErung", "versicherung betont"], fix: "Vurguyu ikinci parçaya kaydırdın; bileşikte vurgu hep başta.", expected: "Krankenversicherung" },
        ],
      },
      {
        de: "Meine Arbeitszeit beginnt um acht.",
        tr: "Çalışma saatim sekizde başlıyor.",
        hint: "AR-beitszeit. „zeit“ vurgulu değil, „Arbeits“ vurgulu.",
      },
      {
        de: "Der Arbeitsplatz ist ziemlich weit weg.",
        tr: "İş yeri epey uzakta.",
        hint: "AR-beitsplatz. Türkçe „iş yerÍ“ sona vurguyor; Almanca tersi.",
        confusions: [
          { heard: ["arbeitsPLATZ"], fix: "Sonu vurguladın; ilk parça vurgulu, ikincisi sönük.", expected: "Arbeitsplatz" },
        ],
      },
      {
        de: "Das Krankenhaus liegt neben dem Bahnhof.",
        tr: "Hastane garın yanında.",
        hint: "KRAN-kenhaus, BAAN-hof. İkisi de baştan vurgulu.",
      },
      {
        de: "Der Führerschein kostet ziemlich viel Geld.",
        tr: "Ehliyet epey pahalı.",
        hint: "FÜÜ-rerschein. „schein“ sönük kalıyor.",
      },
      {
        de: "Die Bewerbungsunterlagen sind endlich fertig.",
        tr: "Başvuru belgeleri sonunda hazır.",
        hint: "Be-VER-bungsunterlagen: burada ilk parça „Bewerbung“ ve onun kendi vurgusu VER'de. Bileşiğin vurgusu yine ilk parçanın içinde.",
        confusions: [
          { heard: ["bewerbungsunterLAgen"], fix: "Vurgu ikinci parçaya kaydı; „Unterlagen“ sönük kalmalı.", expected: "Bewerbungsunterlagen" },
        ],
      },
    ],
  },
  {
    id: "b1-u35-s1",
    level: "B1",
    skill: "speaking",
    unit: 35,
    title: "Ön ek vurgusu: anlamı değiştiren fark",
    genre: "Ses çalışması",
    intro:
      "Ayrılabilen ön ek vurguludur, ayrılamayan değildir. Bu, aksan meselesi değil: „ÚMfahren“ ile „umFÁHREN“ birbirinin zıddı anlama gelir.",
    gloss: [
      { de: "umziehen", tr: "taşınmak", en: "to move house" },
      { de: "übersetzen", tr: "çevirmek", en: "to translate" },
      { de: "unterschreiben", tr: "imzalamak", en: "to sign" },
    ],
    minutes: 5,
    tasks: [
      {
        de: "Ich ziehe nächste Woche um.",
        tr: "Gelecek hafta taşınıyorum.",
        hint: "Ayrılabilen ön ek cümlede sona gidiyor ve VURGULU: „…nächste Woche ÚM“.",
        confusions: [
          { heard: ["ich ziehe naechste woche um unbetont"], fix: "Sondaki „um“u yuttun; ayrılan ön ek cümlenin en vurgulu yeri.", expected: "um" },
        ],
      },
      {
        de: "Der Text ist schwer zu übersetzen.",
        tr: "Metni çevirmek zor.",
        hint: "überSÉTZen — ayrılamaz, vurgu köke. „ÜBERsetzen“ deseydin „karşıya geçirmek“ olurdu.",
        confusions: [
          { heard: ["UEbersetzen", "ueber setzen"], fix: "Ön eki vurguladın; o zaman kelime „karşıya geçirmek“ oluyor.", expected: "übersetzen" },
        ],
      },
      {
        de: "Wir wiederholen die Regel noch einmal.",
        tr: "Kuralı bir kez daha tekrarlıyoruz.",
        hint: "wiederHÓLen — ayrılamaz, vurgu HOL'da. Ön ek sönük kaldığı için fiil bölünmüyor.",
      },
      {
        de: "Sie unterschreibt heute den Vertrag.",
        tr: "Sözleşmeyi bugün imzalıyor.",
        hint: "unterSCHRÉIBT. „unter“ vurgusuz olduğu için cümlede ayrılmıyor.",
      },
      {
        de: "Ich stehe jeden Tag früh auf.",
        tr: "Her gün erken kalkıyorum.",
        hint: "ÁUFstehen — ön ek vurgulu, o yüzden sona ayrılıyor. Sondaki „auf“u bas.",
      },
      {
        de: "Er hat den Termin gestern abgesagt.",
        tr: "Randevuyu dün iptal etti.",
        hint: "ÁBgesagt: ge- ön ekle kök arasına giriyor, vurgu yine baştaki AB'de.",
        confusions: [
          { heard: ["abgeSAGT"], fix: "Vurguyu köke koydun; ayrılabilen fiilde vurgu ön ekte kalır.", expected: "abgesagt" },
        ],
      },
    ],
  },
  {
    id: "b1-u40-s1",
    level: "B1",
    skill: "speaking",
    unit: 40,
    title: "Cümle vurgusu: neyi söylediğini ton belirler",
    genre: "Ses çalışması",
    intro:
      "Almanca cümlenin bir odağı vardır. Türkçe odağı kelime sırasıyla kurar, o yüzden Türkçe konuşan cümleyi düz okuyor ve odak kayboluyor.",
    gloss: [
      { de: "unbedingt", tr: "mutlaka", en: "definitely" },
      { de: "sondern", tr: "bilakis", en: "but rather" },
      { de: "nie", tr: "asla", en: "never" },
    ],
    minutes: 5,
    tasks: [
      {
        de: "Ich fahre morgen nach Berlin.",
        tr: "Yarın Berlin'e gidiyorum.",
        hint: "Nötr cümlede odak sondaki bilgide: „…nach berLÍN“. Baştaki „Ich“ vurgusuz.",
        confusions: [
          { heard: ["ICH fahre morgen nach berlin"], fix: "Özneyi vurguladın; o zaman „başkası değil, ben“ demiş olursun.", expected: "nach Berlin" },
        ],
      },
      {
        de: "Nicht ich habe das gesagt, sondern er.",
        tr: "Bunu ben söylemedim, o söyledi.",
        hint: "Burada odak GERÇEKTEN öznede: „nicht ÍCH… sondern ÉR“. İki vurgu karşı karşıya.",
      },
      {
        de: "Das war gestern, nicht heute.",
        tr: "O dündü, bugün değil.",
        hint: "„GESTERN“ ve „HEUTE“ karşıtlık taşıyor; ikisi de basılıyor, arası sönük.",
        confusions: [
          { heard: ["das war gestern nicht heute flach"], fix: "Cümleyi düz okudun; karşıtlık duyulmadığı için düzeltme anlaşılmıyor.", expected: "gestern … heute" },
        ],
      },
      {
        de: "Ich habe das nie gesagt.",
        tr: "Bunu asla söylemedim.",
        hint: "Odak „NÍE“de. Sonraki „gesagt“ sönük iniyor.",
      },
      {
        de: "Wir müssen heute unbedingt anfangen.",
        tr: "Bugün mutlaka başlamalıyız.",
        hint: "„unbeDÍNGT“ vurgulu; ondan sonraki „anfangen“ tonu düşürüyor.",
      },
      {
        de: "Er hat nur einen Termin frei.",
        tr: "Yalnızca bir randevusu boş.",
        hint: "„NÚR einen“ — sınırlama „nur“da; „einen“i vurgularsan sayıyı vurgulamış olursun.",
        confusions: [
          { heard: ["nur EInen termin"], fix: "Sayıyı vurguladın; odak „nur“da olmalı, kısıtlamayı o taşıyor.", expected: "nur" },
        ],
      },
    ],
  },
  {
    id: "b1-u45-s1",
    level: "B1",
    skill: "speaking",
    unit: 45,
    title: "Tonlama: soruyu ton taşır",
    genre: "Ses çalışması",
    intro:
      "Türkçede evet/hayır sorusunu „mi“ eki taşır. Almancada o işi ton yapar: yükselen ton soru, inen ton bildirim demektir.",
    gloss: [
      { de: "zurückkommen", tr: "geri dönmek", en: "to come back" },
      { de: "helfen", tr: "yardım etmek", en: "to help" },
      { de: "ob", tr: "acaba", en: "whether" },
    ],
    minutes: 5,
    tasks: [
      {
        de: "Kommen Sie morgen wieder?",
        tr: "Yarın yine gelecek misiniz?",
        hint: "Evet/hayır sorusu: ton sonda YUKARI çıkar. Düz bitirirsen emir gibi duyulur.",
        confusions: [
          { heard: ["kommen sie morgen wieder fallend"], fix: "Ton düştü; „mi“ eki olmadığı için soru olduğunu yalnız yükselen ton gösteriyor.", expected: "Kommen Sie morgen wieder?" },
        ],
      },
      {
        de: "Wann kommen Sie zurück?",
        tr: "Ne zaman döneceksiniz?",
        hint: "W-sorusu: soru kelimesi zaten soruyu kuruyor, o yüzden ton sonda AŞAĞI iner.",
        confusions: [
          { heard: ["wann kommen sie zurueck steigend"], fix: "Sonu yukarı çektin; W-sorusunda ton iner, yoksa şaşkınlık gibi duyulur.", expected: "Wann kommen Sie zurück?" },
        ],
      },
      {
        de: "Könnten Sie mir bitte kurz helfen?",
        tr: "Bana kısaca yardım edebilir misiniz?",
        hint: "Rica: ton hafif yükselir ve „bitte“ sönük kalır. Sert inen ton ricayı emre çeviriyor.",
      },
      {
        de: "Ich weiß nicht, ob er heute kommt.",
        tr: "Bugün gelip gelmeyeceğini bilmiyorum.",
        hint: "Bu soru değil, bildirim: „ob“ cümlesi olsa da ton sonda iner.",
        confusions: [
          { heard: ["ob er heute kommt steigend"], fix: "Sonu yukarı çektin; dolaylı soru cümlesi bildirimdir, tonu iner.", expected: "ob er heute kommt" },
        ],
      },
      {
        de: "Wo hast du das gelernt?",
        tr: "Bunu nerede öğrendin?",
        hint: "W-sorusu, ton iner. Odak „WO“da, sonu sönük.",
      },
      {
        de: "Hast du den Brief schon geschrieben?",
        tr: "Mektubu yazdın mı?",
        hint: "Fiille başlıyor, yani evet/hayır sorusu: sonda ton yükselir.",
      },
    ],
  },
];
