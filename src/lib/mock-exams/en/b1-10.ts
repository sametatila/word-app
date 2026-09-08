import type { MockPaper } from "../types";

/**
 * B1 · Deneme 10 — "Old Photographs and Family History".
 *
 * B1'in öteki denemeleriyle AYNI PLAN; konu ayrı. Aile belgeleri B1 için
 * elverişli: geçmiş zaman, present perfect, pişmanlık ve koşul aynı
 * malzemede zorlanmadan bir arada duruyor.
 *
 * Uzun metin bilerek başarısız bir yöntemin anlatısı: dokuzuncu denemede
 * üçüncü kişi bir meslek profili vardı, burada birinci tekil bir kişi
 * doğru bilinen şeyi yapıyor ve yine de kullanışsız bir sonuç elde
 * ediyor. Dördüncü görev de ayrı bir eksen üstünde: çözüm-öneri değil,
 * fotoğrafın göstermediği şeyler.
 */
export const EN_B1_10: MockPaper = {
  id: "en-b1-10",
  course: "en",
  level: "B1",
  no: 10,
  theme: "Old Photographs and Family History",
  themeTr: "Eski fotoğraflar ve aile geçmişi",
  minutes: 155,
  parts: [
    /* ── READING ───────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 55,
      instruction:
        "This part has six tasks. You read short texts, adverts, an article and three texts with gaps. Choose the correct answer for each question.",
      instructionTr:
        "Bu bölümde altı görev var. Kısa metinler, ilanlar, bir yazı ve boşluklu üç metin okuyacaksın. Her soruda doğru cevabı işaretle.",
      tasks: [
        {
          id: "en-b1-10-l1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "Read the five texts and questions 1 to 5. Choose a, b or c.",
          promptTr: "Beş metni ve 1–5. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "m1",
              genre: "Note in a box",
              genreTr: "Kutudaki not",
              title: "Your grandmother's",
              body: `These are your grandmother's. I have written on the back of the ones I am sure about. The others I have left blank, because a wrong name is worse than no name. Ask Aunt Hale before September; she is the last one who was there.`,
            },
            {
              kind: "text",
              id: "m2",
              genre: "Notice in a library",
              genreTr: "Kütüphane duyurusu",
              title: "LOCAL HISTORY ROOM",
              body: `Open Tuesday and Saturday, ten to four.

Photographs may be looked at but not taken out of the room.

We scan up to five for you free. More than five costs one euro each.`,
            },
            {
              kind: "text",
              id: "m3",
              genre: "Email",
              genreTr: "E-posta",
              title: "The album",
              body: `Dear Fikret, I found the album. There are about two hundred pictures and I recognise perhaps thirty people. I am not going to guess at the rest. Could we sit down with your mother one Sunday and go through them together?`,
            },
            {
              kind: "text",
              id: "m4",
              genre: "Notice at a community centre",
              genreTr: "Toplum merkezi duyurusu",
              title: "BRING A PHOTOGRAPH",
              body: `Wednesday evenings. Bring one picture and tell us about it in five minutes.

We record what you say and you get the recording.

We do not keep a copy unless you ask us to.`,
            },
            {
              kind: "text",
              id: "m5",
              genre: "Message",
              genreTr: "İleti",
              title: "On Sunday",
              body: `Zeki, my father is eighty-nine and he still names everybody in the pictures without stopping. I have been meaning to write it down for six years. I am doing it on Sunday and I am not putting it off again.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-10-l1-1",
              no: 1,
              ref: "m1",
              text: "Why are some photographs blank on the back?",
              options: ["The writer was not certain of the names", "There was no room left to write", "Those photographs are much older"],
              answer: 0,
              explain:
                "Not ölçütünü veriyor: emin olduklarının arkasına yazmış, ötekileri boş bırakmış, «because a wrong name is worse than no name».",
            },
            {
              kind: "mcq",
              id: "en-b1-10-l1-2",
              no: 2,
              ref: "m2",
              text: "What is free?",
              options: ["Taking photographs home", "Scanning any number of them", "Scanning the first five"],
              answer: 2,
              explain:
                "Duyuru sınırı veriyor: «We scan up to five for you free. More than five costs one euro each». Albümler odadan çıkmıyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-10-l1-3",
              no: 3,
              ref: "m3",
              text: "What does the writer suggest?",
              options: ["Scanning the whole album", "Going through it with somebody who knows", "Throwing away the pictures nobody knows"],
              answer: 1,
              explain:
                "E-posta öneriyi soru biçiminde veriyor: «Could we sit down with your mother one Sunday and go through them together?». Tahmin etmeyi ise reddediyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-10-l1-4",
              no: 4,
              ref: "m4",
              text: "What happens to the recording?",
              options: ["It is yours, and no copy stays here", "The centre puts it on its website", "The centre keeps a copy of every picture"],
              answer: 0,
              explain:
                "Duyuru iki cümlede bunu kuruyor: «you get the recording» ve «We do not keep a copy unless you ask us to».",
            },
            {
              kind: "mcq",
              id: "en-b1-10-l1-5",
              no: 5,
              ref: "m5",
              text: "What is the writer going to do?",
              options: ["Take new photographs of her father", "Ask her father to write the names himself", "Finally record what her father knows"],
              answer: 2,
              explain:
                "İleti altı yıllık erteleyişi bitiriyor: «I have been meaning to write it down for six years. I am doing it on Sunday».",
            },
          ],
        },
        {
          id: "en-b1-10-l2",
          no: 2,
          format: "match",
          goal: "orientation",
          prompt:
            "Read about five people, 6 to 10. Then read the eight adverts a to h. Which advert is right for each person? You use each advert once only.",
          promptTr:
            "6–10. maddelerdeki beş kişiyi oku. Sonra a'dan h'ye sekiz ilanı oku. Her kişiye hangi ilan uyar? Her ilan en fazla bir kez kullanılır.",
          options: [
            { key: "a", label: "Photograph Boxes and Paper", body: "Boxes and sleeves that do not damage paper. Advice on temperature and light. Nothing here costs more than twelve euros." },
            { key: "b", label: "Old Maps Online", body: "Every street in the city from 1890 to 1975, free with a library card. Search by the name of a street that no longer exists." },
            { key: "c", label: "Bring a Photograph", body: "Wednesday evenings. One picture, five minutes, and we record what you say in front of the group." },
            { key: "d", label: "Film Developing", body: "Black and white film of any age. Two weeks. We tell you first if there is nothing on it." },
            { key: "e", label: "Recording Memories", body: "Volunteers visit older people at home with a recorder. Training in October, then one hour a month." },
            { key: "f", label: "Scanning Service", body: "Five free with your library card, then one euro each. Tuesday and Saturday only." },
            { key: "g", label: "Family Names Group", body: "First Monday of the month. People searching for the same surnames meet and compare what they have." },
            { key: "h", label: "Frames and Glass", body: "We cut glass to size while you wait. Wooden frames from six euros." },
          ],
          items: [
            {
              kind: "match",
              id: "en-b1-10-l2-6",
              no: 6,
              text: "Vesna has three hundred family photographs and no idea how to store them.",
              answer: "a",
              explain:
                "İlan hem malzemeyi hem öğüdü veriyor: «Boxes and sleeves that do not damage paper. Advice on temperature and light».",
            },
            {
              kind: "match",
              id: "en-b1-10-l2-7",
              no: 7,
              text: "Lenn wants to know where his grandmother's street was in 1950.",
              answer: "b",
              explain:
                "İlan hem dönemi hem arama biçimini veriyor: «from 1890 to 1975» ve «Search by the name of a street that no longer exists».",
            },
            {
              kind: "match",
              id: "en-b1-10-l2-8",
              no: 8,
              text: "Hale has one photograph and wants to tell its story to other people.",
              answer: "c",
              explain:
                "İlan tam bu biçimi kuruyor: «One picture, five minutes, and we record what you say in front of the group».",
            },
            {
              kind: "match",
              id: "en-b1-10-l2-9",
              no: 9,
              text: "Yasin has old film that has never been developed.",
              answer: "d",
              explain:
                "İlan yaş sınırı koymuyor: «Black and white film of any age», üstelik boş çıkarsa önceden haber veriyor.",
            },
            {
              kind: "match",
              id: "en-b1-10-l2-10",
              no: 10,
              text: "Eyup wants his ninety-year-old neighbour's memories recorded before it is too late.",
              answer: "e",
              explain:
                "İlan hizmeti tarif ediyor: «Volunteers visit older people at home with a recorder». Çarşamba akşamları (c) ise kişinin kendisinin gelmesini gerektiriyor.",
            },
          ],
        },
        {
          id: "en-b1-10-l3",
          no: 3,
          format: "mcq",
          goal: "opinion",
          prompt: "Read the article and questions 11 to 15. Choose a, b, c or d.",
          promptTr: "Yazıyı ve 11–15. maddeleri oku. a, b, c ya da d'yi seç.",
          texts: [
            {
              kind: "text",
              id: "t3",
              genre: "Magazine article",
              genreTr: "Dergi yazısı",
              title: "I recorded my aunt for eleven hours",
              body: `I did the thing everybody tells you to do. I bought a recorder, I sat down with my aunt, and over four Sundays I recorded eleven hours of her talking about the family. Then I did nothing with it for two years.

The problem is not that the recordings are bad. My aunt, who was born in 1934, remembered the street names better than the dates. The problem is that eleven hours of anybody is unusable. There is no way in. If I want to know when her mother came to this city, I will have to listen to eleven hours to find the ninety seconds where she says it.

I know what I should have done, and I want to say it plainly because nobody told me. I should have written the questions down first, asked them in order, and made a note of the time on the recorder each time she answered one.

There is a second thing and it is worse. She names about forty people in those eleven hours and she never spells anything. I can hear the names and I cannot write them. My aunt died in March.

Although I would do it differently now, I am not sorry that I recorded her. The eleven hours exist and my children will have them, which is more than my parents left me. But I did the easy part, and I told myself it was the whole job.`,
              gloss: [
                { de: "a recorder", tr: "ses kayıt cihazı", en: "recorder" },
                { de: "unusable", tr: "kullanılamaz", en: "unusable" },
                { de: "to spell", tr: "harf harf söylemek", en: "spell" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-10-l3-11",
              no: 11,
              text: "What did the writer do?",
              options: [
                "She wrote down her aunt's stories by hand",
                "She scanned all the family photographs",
                "She interviewed several different relatives",
                "She made one very long recording",
              ],
              answer: 3,
              explain:
                "İlk paragraf işi tarif ediyor: «over four Sundays I recorded eleven hours of her talking about the family». Tek kişi ve tek yöntem.",
            },
            {
              kind: "mcq",
              id: "en-b1-10-l3-12",
              no: 12,
              text: "What is the problem with the recordings?",
              options: [
                "The sound quality is poor",
                "Nothing in them can be located",
                "Her aunt did not remember very much",
                "They were deleted by accident",
              ],
              answer: 1,
              explain:
                "İkinci paragraf sorunu adlandırıyor: «eleven hours of anybody is unusable. There is no way in», ve tek bir bilgi için on bir saat dinlemek gerekiyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-10-l3-13",
              no: 13,
              text: "What does she say she should have done?",
              options: [
                "Used a much better recorder",
                "Asked another relative to be there",
                "Prepared questions and noted the times",
                "Recorded for shorter periods each time",
              ],
              answer: 2,
              explain:
                "Üçüncü paragraf üç adımı sıralıyor: «written the questions down first, asked them in order, and made a note of the time on the recorder».",
            },
            {
              kind: "mcq",
              id: "en-b1-10-l3-14",
              no: 14,
              text: "What is the second problem?",
              options: [
                "She cannot write the names she hears",
                "Her aunt spoke much too quickly",
                "Nobody else in the family is interested",
                "The recordings are too long to copy",
              ],
              answer: 0,
              explain:
                "Dördüncü paragraf bunu veriyor: «she never spells anything. I can hear the names and I cannot write them», ve teyzesi mart ayında ölmüş.",
            },
            {
              kind: "mcq",
              id: "en-b1-10-l3-15",
              no: 15,
              text: "How does she judge what she did?",
              options: [
                "As a complete waste of four Sundays",
                "As something she would never repeat",
                "As better than any other method",
                "As the easy part mistaken for the whole",
              ],
              answer: 3,
              explain:
                "Son cümle yargıyı veriyor: «I did the easy part, and I told myself it was the whole job». Pişman olmadığını da söylüyor.",
            },
          ],
        },
        {
          id: "en-b1-10-l4",
          no: 4,
          format: "match",
          goal: "structure",
          prompt:
            "Read the text. One sentence is missing from each of the gaps 16 to 20. Which sentence a to f fits which gap? One sentence fits nowhere.",
          promptTr:
            "Metni oku. 16–20. boşluklarda birer cümle eksik. a–f cümlelerinden hangisi hangi boşluğa uyar? Bir cümle hiçbir yere uymuyor.",
          texts: [
            {
              kind: "text",
              id: "t4",
              genre: "Magazine text",
              genreTr: "Dergi metni",
              title: "What a photograph does not show",
              body: `A family photograph is evidence of one second and people treat it as evidence of a life. {{16}}

Consider what has to happen before the picture exists at all. Somebody owned a camera, which in 1955 was not everybody. Somebody decided the moment was worth a frame, and film cost money. {{17}}

Then there is the question of who is holding it. The person behind the camera is in none of the pictures, and in most families that is the same person for thirty years. {{18}}

The captions are worse than the pictures. A name on the back is written by somebody who was sure, and being sure is not the same as being right. My grandfather is confidently named in two albums as his own brother. {{19}}

None of this is an argument for throwing them away. It is an argument for writing down what you actually know and what you are only guessing. If you write two words in brackets now, you will save somebody a year. {{20}}`,
              gloss: [
                { de: "a caption", tr: "altyazı, açıklama", en: "caption" },
                { de: "a frame", tr: "kare", en: "frame" },
                { de: "confidently", tr: "kendinden emin biçimde", en: "confidently" },
              ],
            },
          ],
          options: [
            { key: "a", label: "a", body: "Everybody in the album is therefore somebody the photographer chose to keep." },
            { key: "b", label: "b", body: "The second is much shorter than the life, and it is the only part anybody ever looks at." },
            { key: "c", label: "c", body: "My grandmother took every photograph in our house and appears in four of them." },
            { key: "d", label: "d", body: "Two words in brackets would have saved me a year of asking the wrong relatives." },
            { key: "e", label: "e", body: "Nobody noticed until a cousin asked why he was wearing the wrong uniform." },
            { key: "f", label: "f", body: "Colour film became cheaper than black and white in this country in about 1968." },
          ],
          items: [
            {
              kind: "match",
              id: "en-b1-10-l4-16",
              no: 16,
              text: "Gap 16",
              answer: "b",
              explain:
                "Açılış saniye ile hayatı karşı karşıya koyuyor: «evidence of one second … evidence of a life». (b) o karşıtlığı sürdürüyor: saniye çok daha kısa ve bakılan tek parça o.",
            },
            {
              kind: "match",
              id: "en-b1-10-l4-17",
              no: 17,
              text: "Gap 17",
              answer: "a",
              explain:
                "Paragraf kararları sayıyor: «Somebody owned a camera, which in 1955 was not everybody» ve «Somebody decided the moment was worth a frame». (a) sonucu çıkarıyor: albümdeki herkes «somebody the photographer chose to keep».",
            },
            {
              kind: "match",
              id: "en-b1-10-l4-18",
              no: 18,
              text: "Gap 18",
              answer: "c",
              explain:
                "Paragraf kuralı veriyor: «The person behind the camera is in none of the pictures». (c) bunu tek bir örnekle sayıya döküyor: bütün fotoğrafları çeken büyükanne «appears in four of them».",
            },
            {
              kind: "match",
              id: "en-b1-10-l4-19",
              no: 19,
              text: "Gap 19",
              answer: "e",
              explain:
                "Paragraf yanlış bir arka yazıyı örnekliyor: dede «confidently named in two albums as his own brother». (e) yanlışın nasıl ortaya çıktığını ekliyor: bir kuzen «why he was wearing the wrong uniform» diye soruyor.",
            },
            {
              kind: "match",
              id: "en-b1-10-l4-20",
              no: 20,
              text: "Gap 20",
              answer: "d",
              explain:
                "Son paragraf öneriyi veriyor: «writing down what you actually know and what you are only guessing». (d) yazarın kendi bedelini ekleyerek öneriyi kişiselleştiriyor. (f) renkli filmin 1968'de ucuzlamasından söz ediyor ve metinde film türü hiç tartışılmıyor — hiçbir boşluğa uymayan cümle odur.",
            },
          ],
        },
        {
          id: "en-b1-10-l5",
          no: 5,
          format: "gapMcq",
          goal: "structure",
          prompt: "Read the text and complete gaps 21 to 25. Which word fits: a, b, c or d?",
          promptTr: "Metni oku ve 21–25. boşlukları tamamla. Hangi sözcük uyar: a, b, c ya da d?",
          texts: [
            {
              kind: "text",
              id: "t5",
              genre: "Advice text",
              genreTr: "Öğüt metni",
              title: "If somebody in your family is over eighty",
              body: `If somebody in your family is over eighty, the useful work is not scanning. It is asking.

Write the questions down first. You will not think of them in the room, and asking somebody to talk about their childhood {{21}} nothing at all.

Ask about objects rather than years. Nobody remembers 1961. Everybody remembers the chair that {{22}} in the corner.

Spell the names out loud and ask the person to {{23}} you if you are wrong. You cannot do this afterwards.

I {{24}} to think that the recording was the record. Now I think the record is the page of notes you make while the recording runs.

And a family {{25}} keeps no notes will lose the same story twice.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-10-l5-21",
              no: 21,
              text: "Gap 21",
              options: ["produce", "producing", "produces", "produced"],
              answer: 2,
              explain:
                "Cümlenin öznesi `asking somebody to talk about their childhood`, yani tekil bir ad öbeği; geniş zamanda yüklem `-s` alır. `producing` yardımcı fiilsiz yüklem olamaz.",
            },
            {
              kind: "mcq",
              id: "en-b1-10-l5-22",
              no: 22,
              text: "Gap 22",
              options: ["stood", "stand", "stands", "standing"],
              answer: 0,
              explain:
                "Sandalye artık orada değil; anımsanan geçmiş bir durum anlatılıyor ve ilgi cümleciğinin yüklemi geçmiş zaman olur: `stood`. Metnin geri kalanı da geçmişe gönderiyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-10-l5-23",
              no: 23,
              text: "Gap 23",
              options: ["repair", "correct", "improve", "answer"],
              answer: 1,
              explain:
                "`correct somebody` bir kişinin yanlışını düzeltmeyi anlatır ve cümlenin sonu bunu doğruluyor: «if you are wrong». `repair` nesneler için, `improve` iyileştirmek, `answer` ise cevaplamaktır.",
            },
            {
              kind: "mcq",
              id: "en-b1-10-l5-24",
              no: 24,
              text: "Gap 24",
              options: ["am used", "was using", "use", "used"],
              answer: 3,
              explain:
                "`used to + yalın fiil` artık sürmeyen bir geçmiş inancı bildirir ve sonraki cümle bunu doğruluyor: «Now I think …». `am used to` alışkın olmayı anlatır ve `-ing` ister.",
            },
            {
              kind: "mcq",
              id: "en-b1-10-l5-25",
              no: 25,
              text: "Gap 25",
              options: ["that", "who", "whose", "what"],
              answer: 0,
              explain:
                "Eksik öğe özne görevinde bir ilgi adılı ve öncül `a family`, yani bir topluluk adı. `that` uyar; `whose` iyelik bildirir, `what` öncül almaz.",
            },
          ],
        },
        {
          id: "en-b1-10-l6",
          no: 6,
          format: "gap",
          goal: "structure",
          prompt: "Read the text and complete gaps 26 to 30. Write ONE word in each gap.",
          promptTr: "Metni oku ve 26–30. boşlukları tamamla. Her boşluğa TEK bir sözcük yaz.",
          texts: [
            {
              kind: "text",
              id: "t6",
              genre: "Note in a box",
              genreTr: "Kutudaki not",
              title: "If you find this box",
              body: `This box came to me {{26}} my mother in 2019, and I have added nothing to it since.

There are four people in the picture on top and I can name all {{27}} one of them.

The woman on the left is my grandmother, {{28}} was born in a village that no longer has a name.

I am writing this because the person who could correct me is no longer here, and I would rather be wrong {{29}} paper than silent.

If you find this box, the notes are folded {{30}} the lid.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-b1-10-l6-26",
              no: 26,
              text: "Gap 26",
              accept: ["from"],
              explain:
                "Bir şeyin kimden geldiğini `from` bildirir: `came to me from my mother`. `by` eylemi yapanı gösterir, kaynağı değil.",
            },
            {
              kind: "gap",
              id: "en-b1-10-l6-27",
              no: 27,
              text: "Gap 27",
              accept: ["but"],
              explain:
                "`all but one` biri dışında hepsi demektir ve cümle dört kişiden üçünü tanıdığını söylüyor. `except` de yakın anlamlıdır ama `all` ile birlikte yerleşik biçim `all but`tır.",
            },
            {
              kind: "gap",
              id: "en-b1-10-l6-28",
              no: 28,
              text: "Gap 28",
              accept: ["who"],
              explain:
                "Virgülden sonra bir kişiye gönderme yapan ilgi adılı gerekiyor: `my grandmother, who was born …`. `that` virgüllü ilgi cümlesinde kullanılmaz.",
            },
            {
              kind: "gap",
              id: "en-b1-10-l6-29",
              no: 29,
              text: "Gap 29",
              accept: ["on"],
              explain:
                "`on paper` yazılı olmayı anlatan yerleşik öbektir: «wrong on paper than silent». `in paper` bir şeyi kâğıda sarmayı bildirir.",
            },
            {
              kind: "gap",
              id: "en-b1-10-l6-30",
              no: 30,
              text: "Gap 30",
              accept: ["under"],
              explain:
                "Notlar kapağın altına katlanmış: `folded under the lid`. `on the lid` üstünde olurdu ve katlanmış bir kâğıt için uygun değil.",
            },
          ],
        },
      ],
    },

    /* ── LISTENING ─────────────────────────────────────────────────────── */
    {
      skill: "listening",
      minutes: 35,
      instruction:
        "This part has four tasks. You hear short extracts, conversations, some information and an interview. You hear every recording twice.",
      instructionTr:
        "Bu bölümde dört görev var. Kısa parçalar, konuşmalar, bir bilgilendirme ve bir söyleşi dinleyeceksin. Her kaydı iki kez dinleyebilirsin.",
      tasks: [
        {
          id: "en-b1-10-h1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "You hear seven short extracts. Choose a, b or c. You hear every extract twice.",
          promptTr: "Yedi kısa parça dinleyeceksin. a, b ya da c'yi seç. Her parçayı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "a1",
              genre: "Phone message",
              genreTr: "Telefon iletisi",
              situation: "Kütüphane bir okura ileti bırakıyor.",
              plays: 2,
              segments: [
                { text: "Hello, it is about the local history room. You asked about the five free scans. That is five per visit, not five in total, so bring the rest on Saturday and we will do them then." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "Between relatives",
              genreTr: "Akrabalar arasında",
              situation: "İki akraba fotoğrafların arkasını konuşuyor.",
              plays: 2,
              segments: [
                { text: "Did you write on the back?" },
                { text: "Only where I was sure." },
                { text: "That is about six pictures." },
                { text: "Six correct is better than two hundred that somebody has to check in twenty years." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "At a desk",
              genreTr: "Bankoda",
              situation: "Bir ziyaretçi albüm istiyor.",
              plays: 2,
              segments: [
                { text: "I would like to see the album from Mill Street." },
                { text: "Of course. You can look at it here, but it does not leave the room." },
                { text: "Can I photograph a page?" },
                { text: "With your phone, yes. Not with a flash." },
              ],
            },
            {
              kind: "audio",
              id: "a4",
              genre: "Short talk",
              genreTr: "Kısa konuşma",
              situation: "Bir uzman saklama koşullarını anlatıyor.",
              plays: 2,
              segments: [
                { text: "People ask me what to buy. Nothing, usually. The loft is the worst room in the house for paper and the cupboard under the stairs is one of the best. Moving the box costs you an afternoon and no money at all." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "Between friends",
              genreTr: "Arkadaşlar arasında",
              situation: "İki arkadaş uzun bir kaydı konuşuyor.",
              plays: 2,
              segments: [
                { text: "Eleven hours?" },
                { text: "Eleven." },
                { text: "Have you listened to it?" },
                { text: "I have listened to about forty minutes. That is the whole problem in one sentence, is it not?" },
              ],
            },
            {
              kind: "audio",
              id: "a6",
              genre: "Announcement",
              genreTr: "Duyuru",
              situation: "Toplum merkezinde hatırlatma yapılıyor.",
              plays: 2,
              segments: [
                { text: "A short reminder about Wednesday. Bring one photograph, not a box. We have five minutes each and eleven people, and last month we only heard four of you." },
              ],
            },
            {
              kind: "audio",
              id: "a7",
              genre: "Phone message",
              genreTr: "Telefon iletisi",
              situation: "Biri arkadaşına bulduğu şeyi anlatıyor.",
              plays: 2,
              segments: [
                { text: "Hi Hale, it is Lenn. I found the street on the old map. It is under the car park now. I have printed it and I will bring it on Sunday, because your mother will want to see it." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-10-h1-1",
              no: 1,
              ref: "a1",
              text: "What does the caller explain?",
              options: ["The limit is per visit", "The room is closed on Saturday", "Scanning now costs money"],
              answer: 0,
              explain:
                "İleti yanlış anlamayı düzeltiyor: «That is five per visit, not five in total», ve cumartesi gelinmesini öneriyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-10-h1-2",
              no: 2,
              ref: "a2",
              text: "What is the second speaker's point?",
              options: ["Two hundred is not very many", "Certainty matters more than quantity", "Nobody will check them anyway"],
              answer: 1,
              explain:
                "Konuşmacı iki sayıyı karşılaştırıyor: «Six correct is better than two hundred that somebody has to check in twenty years».",
            },
            {
              kind: "mcq",
              id: "en-b1-10-h1-3",
              no: 3,
              ref: "a3",
              text: "What is the visitor allowed to do?",
              options: ["Take the album home for a day", "Photograph it with a flash", "Photograph a page with a phone"],
              answer: 2,
              explain:
                "Görevli izni ve sınırı birlikte veriyor: «With your phone, yes. Not with a flash». Albüm odadan çıkmıyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-10-h1-4",
              no: 4,
              ref: "a4",
              text: "What does the speaker recommend?",
              options: ["Moving the box downstairs", "Buying proper boxes at once", "Scanning everything immediately"],
              answer: 0,
              explain:
                "Konuşmacı satın almayı eliyor («Nothing, usually») ve iki odayı karşılaştırıyor: tavan arası en kötüsü, merdiven altındaki dolap en iyilerinden.",
            },
            {
              kind: "mcq",
              id: "en-b1-10-h1-5",
              no: 5,
              ref: "a5",
              text: "What does the second speaker admit?",
              options: ["The recording did not work", "Her aunt talked far too much", "She has hardly used it"],
              answer: 2,
              explain:
                "Konuşmacı sayıyı veriyor: on bir saatin «about forty minutes» kadarını dinlemiş, ve bunu sorunun kendisi sayıyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-10-h1-6",
              no: 6,
              ref: "a6",
              text: "What is the reminder about?",
              options: ["The evening has been cancelled", "Bringing only one picture", "The recordings will be published"],
              answer: 1,
              explain:
                "Duyuru tek bir kural hatırlatıyor: «Bring one photograph, not a box», çünkü geçen ay on bir kişiden yalnız dördü konuşabilmiş.",
            },
            {
              kind: "mcq",
              id: "en-b1-10-h1-7",
              no: 7,
              ref: "a7",
              text: "What has Lenn found?",
              options: ["A photograph of the old street", "The name of the new car park", "The street on an old map"],
              answer: 2,
              explain:
                "İleti bulguyu veriyor: «I found the street on the old map. It is under the car park now».",
            },
          ],
        },
        {
          id: "en-b1-10-h2",
          no: 2,
          format: "mcq",
          goal: "gist",
          prompt: "You hear six short conversations. What is the main point? Choose a, b or c. You hear every conversation twice.",
          promptTr: "Altı kısa konuşma dinleyeceksin. Ana nokta nedir? a, b ya da c'yi seç. Her konuşmayı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "b1",
              genre: "Between friends",
              genreTr: "Arkadaşlar arasında",
              situation: "Biri büyükannesine sorduğu soruyu anlatıyor.",
              plays: 2,
              segments: [
                { text: "I asked her to spell it and she laughed at me." },
                { text: "Why?" },
                { text: "Because it is her own name and she is eighty-four. But I have got it right on paper now, and in ten years nobody will laugh and nobody will know." },
              ],
            },
            {
              kind: "audio",
              id: "b2",
              genre: "Between relatives",
              genreTr: "Akrabalar arasında",
              situation: "İki kişi tarama seçeneklerini konuşuyor.",
              plays: 2,
              segments: [
                { text: "The library will scan them all." },
                { text: "Free?" },
                { text: "Five a visit." },
                { text: "Then it is forty visits. Or four visits and a hundred and forty euros. Pick the one you actually have." },
              ],
            },
            {
              kind: "audio",
              id: "b3",
              genre: "Phone call",
              genreTr: "Telefon görüşmesi",
              situation: "Biri kendisine yapılan çağrıya karşılık veriyor.",
              plays: 2,
              segments: [
                { text: "That is kind of you to ask, and I am going to say no for now. I sorted my mother's house in the spring and I have not opened a box since. Ask me in the autumn and I expect the answer will change." },
              ],
            },
            {
              kind: "audio",
              id: "b4",
              genre: "Between relatives",
              genreTr: "Akrabalar arasında",
              situation: "İki kişi fotoğrafın üstündeki yazıyı konuşuyor.",
              plays: 2,
              segments: [
                { text: "Somebody wrote the names in pen on the front." },
                { text: "On the front?" },
                { text: "Across the sky. In 1970 nobody thought a photograph was a document." },
                { text: "And now?" },
                { text: "Now we photograph the photograph and cut the sky out." },
              ],
            },
            {
              kind: "audio",
              id: "b5",
              genre: "Between friends",
              genreTr: "Arkadaşlar arasında",
              situation: "İki kişi araştırma yöntemini tartışıyor.",
              plays: 2,
              segments: [
                { text: "You cannot do family history without going to the village." },
                { text: "I did four years of it from a table." },
                { text: "What did you miss?" },
                { text: "Smells, probably. And a woman in the shop who would have told me everything in an hour." },
              ],
            },
            {
              kind: "audio",
              id: "b6",
              genre: "Between friends",
              genreTr: "Arkadaşlar arasında",
              situation: "İki kişi bir babanın hafızasını konuşuyor.",
              plays: 2,
              segments: [
                { text: "Your father names everybody without stopping." },
                { text: "He does." },
                { text: "Then write it down." },
                { text: "I have been saying that to myself since 2019. On Sunday I am doing it." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-10-h2-8",
              no: 8,
              ref: "b1",
              text: "What is the speaker doing?",
              options: ["Complaining about his grandmother", "Defending an awkward question", "Explaining why he stopped asking"],
              answer: 1,
              explain:
                "Konuşmacı gülünmesini kabul edip yine de haklı çıkıyor: «I have got it right on paper now, and in ten years nobody will laugh and nobody will know».",
            },
            {
              kind: "mcq",
              id: "en-b1-10-h2-9",
              no: 9,
              ref: "b2",
              text: "What is the second speaker pointing out?",
              options: ["A choice between time and money", "That the library rule is unfair to readers", "That scanning is not worth doing"],
              answer: 0,
              explain:
                "Konuşmacı iki yolu sayıya döküyor: «forty visits. Or four visits and a hundred and forty euros. Pick the one you actually have».",
            },
            {
              kind: "mcq",
              id: "en-b1-10-h2-10",
              no: 10,
              ref: "b3",
              text: "What is the speaker doing?",
              options: ["Asking for more time to decide", "Explaining a family argument", "Refusing for now only"],
              answer: 2,
              explain:
                "Konuşmacı reddi süreyle sınırlıyor: «I am going to say no for now … Ask me in the autumn and I expect the answer will change».",
            },
            {
              kind: "mcq",
              id: "en-b1-10-h2-11",
              no: 11,
              ref: "b4",
              text: "What is the main point?",
              options: ["The photographs are ruined for good", "Attitudes to photographs have changed", "Pens should never be used at all"],
              answer: 1,
              explain:
                "Konuşma iki dönemi karşılaştırıyor: «In 1970 nobody thought a photograph was a document» ve bugün fotoğrafın fotoğrafı çekiliyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-10-h2-12",
              no: 12,
              ref: "b5",
              text: "What does the second speaker concede?",
              options: ["That being there would have helped", "That the four years were largely wasted", "That village records are better"],
              answer: 0,
              explain:
                "Konuşmacı masadan çalıştığını savunuyor ama kaybını sayıyor: «a woman in the shop who would have told me everything in an hour».",
            },
            {
              kind: "mcq",
              id: "en-b1-10-h2-13",
              no: 13,
              ref: "b6",
              text: "What is the second speaker doing?",
              options: ["Explaining why it is impossible", "Asking the first speaker to help him", "Admitting a delay and ending it"],
              answer: 2,
              explain:
                "Konuşmacı süreyi ve kararı birlikte veriyor: «I have been saying that to myself since 2019. On Sunday I am doing it».",
            },
          ],
        },
        {
          id: "en-b1-10-h3",
          no: 3,
          format: "notes",
          goal: "detail",
          prompt:
            "You hear information about a local history room. Complete the notes, questions 14 to 19. Write ONE or TWO words or a number in each gap. You hear the information twice.",
          promptTr:
            "Bir yerel tarih odası hakkında bilgi dinleyeceksin. 14–19. maddelerdeki notları tamamla. Her boşluğa BİR ya da İKİ sözcük veya bir sayı yaz. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "c1",
              genre: "Information",
              genreTr: "Bilgilendirme",
              situation: "Bir görevli yerel tarih odasını anlatıyor.",
              plays: 2,
              segments: [
                {
                  text: "Good evening. The local history room is open on Tuesday and Saturday, from ten to four. You need a library card, which is free, and you must leave your bag in the locker. We hold about eight thousand photographs of this district. Five scans a visit are free; after that it is one euro each. Albums may be looked at but not taken out of the room. And the volunteers who can name people are here on Saturday morning only.",
                },
              ],
            },
            {
              kind: "text",
              id: "n1",
              genre: "Notes",
              genreTr: "Not kâğıdı",
              title: "Local history room — notes",
              body: `Open on Tuesday and:      {{14}}
The room closes at:       {{15}}
Leave your bag in the:    {{16}}
Number of photographs:    about {{17}}
Free scans per visit:     {{18}}
Volunteers come on Saturday: {{19}}`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-b1-10-h3-14",
              no: 14,
              ref: "c1",
              text: "Gap 14",
              accept: ["saturday"],
              explain:
                "Kayıt iki günü veriyor: «open on Tuesday and Saturday». Not kâğıdında salı basılı, boşluğa ikinci gün geliyor.",
            },
            {
              kind: "gap",
              id: "en-b1-10-h3-15",
              no: 15,
              ref: "c1",
              text: "Gap 15",
              accept: ["4", "four"],
              explain:
                "«from ten to four» — kapanış saati. On açılış saati; not kâğıdı kapanışı soruyor.",
            },
            {
              kind: "gap",
              id: "en-b1-10-h3-16",
              no: 16,
              ref: "c1",
              text: "Gap 16",
              accept: ["locker"],
              explain:
                "Kayıt koşulu veriyor: «you must leave your bag in the locker». Kart ücretsiz ama çanta içeri girmiyor.",
            },
            {
              kind: "gap",
              id: "en-b1-10-h3-17",
              no: 17,
              ref: "c1",
              text: "Gap 17",
              accept: ["8000", "eight thousand"],
              explain:
                "«We hold about eight thousand photographs of this district» — koleksiyonun büyüklüğü.",
            },
            {
              kind: "gap",
              id: "en-b1-10-h3-18",
              no: 18,
              ref: "c1",
              text: "Gap 18",
              accept: ["5", "five"],
              explain:
                "«Five scans a visit are free; after that it is one euro each» — ücretsiz tarama sayısı. Bir euro sonraki her tarama için.",
            },
            {
              kind: "gap",
              id: "en-b1-10-h3-19",
              no: 19,
              ref: "c1",
              text: "Gap 19",
              accept: ["morning"],
              explain:
                "Kayıt gönüllülerin saatini daraltıyor: «here on Saturday morning only». Not kâğıdında cumartesi basılı, boşluğa günün yarısı geliyor.",
            },
          ],
        },
        {
          id: "en-b1-10-h4",
          no: 4,
          format: "mcq",
          goal: "opinion",
          prompt:
            "You hear an interview with a woman who labelled four thousand family photographs. Choose a, b or c for questions 20 to 25. You hear the interview twice.",
          promptTr:
            "Dört bin aile fotoğrafını etiketlemiş bir kadınla söyleşi dinleyeceksin. 20–25. maddeler için a, b ya da c'yi seç. Söyleşiyi iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Radio interview",
              genreTr: "Radyo söyleşisi",
              situation: "Bir sunucu, dört bin fotoğrafı etiketleyen Vesna ile konuşuyor.",
              plays: 2,
              segments: [
                { text: "Four thousand photographs. How long did that take?" },
                { text: "Two years, about four hours a week. And I want to be careful with that number, because the sorting was not the hard part. The sorting was the part I could do while listening to the radio." },
                { text: "So what was the hard part?" },
                { text: "Deciding what counted as knowing. I could put a name on a face if my mother said the name. But my mother was ninety and she was pleasing me, and I could see her doing it." },
                { text: "How did you handle that?" },
                { text: "Badly at first. Then I started writing two lines instead of one: the name, and who told me. It doubled the work and it is the only part I would defend now." },
                { text: "Did anything surprise you?" },
                { text: "The gaps. There are no pictures at all from 1943 to 1949, and nobody in my family has ever mentioned that. I asked and I got a shrug, and the shrug is now in my notes too." },
                { text: "What would you tell somebody who is starting?" },
                { text: "Do the last twenty years first. Everybody starts with the oldest box because it feels urgent, and the oldest box is the one where nobody can help you anyway. The pictures from the nineteen-nineties still have people alive who can name them." },
                { text: "And what happened to the four thousand in the end?" },
                { text: "They are in eleven boxes in a cupboard, and there is one page at the front of each box. If somebody throws the boxes away, they will at least have to read a page first. That is the whole of my ambition." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-10-h4-20",
              no: 20,
              ref: "d1",
              text: "What does Vesna say about the two years?",
              options: ["The sorting was the easy part", "It took much longer than she expected", "She worked on it full time"],
              answer: 0,
              explain:
                "Vesna süreyi verip hemen sınırlıyor: «the sorting was not the hard part. The sorting was the part I could do while listening to the radio».",
            },
            {
              kind: "mcq",
              id: "en-b1-10-h4-21",
              no: 21,
              ref: "d1",
              text: "What difficulty does she describe?",
              options: ["Her mother refused to help her", "The photographs were badly damaged", "Knowing whether a name was reliable"],
              answer: 2,
              explain:
                "Vesna güçlüğü adlandırıyor: «Deciding what counted as knowing», çünkü annesi doksanındaydı ve onu memnun etmeye çalışıyordu.",
            },
            {
              kind: "mcq",
              id: "en-b1-10-h4-22",
              no: 22,
              ref: "d1",
              text: "What did she start doing?",
              options: ["Recording her mother on video", "Writing down who told her the name", "Asking two relatives about each face"],
              answer: 1,
              explain:
                "Vesna yöntemi anlatıyor: «two lines instead of one: the name, and who told me», ve savunduğu tek bölümün bu olduğunu söylüyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-10-h4-23",
              no: 23,
              ref: "d1",
              text: "What surprised her?",
              options: ["A period with no pictures at all", "How many people she recognised", "How little her family cared"],
              answer: 0,
              explain:
                "Vesna boşluğu tarihiyle veriyor: «There are no pictures at all from 1943 to 1949, and nobody in my family has ever mentioned that».",
            },
            {
              kind: "mcq",
              id: "en-b1-10-h4-24",
              no: 24,
              ref: "d1",
              text: "What does she advise somebody to do first?",
              options: ["Start with the oldest box", "Start with the most recent pictures", "Scan everything before sorting"],
              answer: 1,
              explain:
                "Vesna sırayı tersine çeviriyor: «Do the last twenty years first», çünkü en eski kutuda kimse yardım edemiyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-10-h4-25",
              no: 25,
              ref: "d1",
              text: "What is her aim for the boxes?",
              options: ["That they go to a museum", "That her children finish the work", "That anybody throwing them away reads a page"],
              answer: 2,
              explain:
                "Vesna hedefini küçültüyor: «If somebody throws the boxes away, they will at least have to read a page first. That is the whole of my ambition».",
            },
          ],
        },
      ],
    },

    /* ── WRITING ───────────────────────────────────────────────────────── */
    {
      skill: "writing",
      minutes: 50,
      instruction: "This part has two tasks: an email and an article.",
      instructionTr: "Bu bölümde iki görev var: bir e-posta ve bir yazı.",
      tasks: [
        {
          id: "en-b1-10-w1",
          no: 1,
          format: "writing",
          goal: "interaction",
          prompt:
            "You have found a box of old family photographs and you cannot name most of the people. Write an email to an older relative. Write about 100 words and cover all the points.",
          promptTr:
            "Eski aile fotoğraflarından bir kutu buldun ve içindeki kişilerin çoğunu tanıyamıyorsun. Yaşlı bir akrabana e-posta yaz. Yaklaşık 100 kelime, bütün maddeleri işle.",
          items: [],
          rubric: {
            minWords: 100,
            points: [
              { de: "Say what you have found and where.", tr: "Ne bulduğunu ve nerede bulduğunu söyle." },
              { de: "Say what you can and cannot do on your own.", tr: "Kendi başına neyi yapabildiğini ve neyi yapamadığını söyle." },
              { de: "Suggest a specific time and say how long it would take.", tr: "Somut bir zaman öner ve ne kadar süreceğini söyle." },
            ],
            sample: `Dear Aunt Hale,

I was clearing my mother's flat last month and I found a shoebox of photographs at the back of a cupboard. There are about a hundred and fifty and most of them are from before 1960.

I have sorted them by size, which is all I can do on my own. I recognise my mother and perhaps four other faces. Nobody wrote anything on the back.

Could I come on a Sunday afternoon in March with the box and a notebook? I would only need two hours, and we could stop whenever you were tired.

I would be very grateful.

Yours,
Eyup`,
            criteria: [
              "Üç içerik noktasının üçü de işlendi mi?",
              "Somut sayılar ve tarihler verildi mi?",
              "Kendi yapabildiği ile yapamadığı ayrıldı mı?",
              "Öneri somut mu (gün, süre) ve karşı taraf gözetilmiş mi?",
              "Kayıt kibar mı? Yaklaşık 100 kelime var mı?",
            ],
          },
        },
        {
          id: "en-b1-10-w2",
          no: 2,
          format: "writing",
          goal: "production",
          prompt:
            "Write an article for a website with this title: \"Something I wish I had asked\". Say what it is, why you did not ask at the time and what you do differently now. Write about 100 words.",
          promptTr:
            "Bir internet sitesi için şu başlıkla bir yazı yaz: \"Keşke sorsaydım dediğim bir şey\". Ne olduğunu, o zaman neden sormadığını ve şimdi neyi farklı yaptığını yaz. Yaklaşık 100 kelime.",
          items: [],
          rubric: {
            minWords: 100,
            points: [
              { de: "Say what you wish you had asked.", tr: "Keşke sorsaydım dediğin şeyi söyle." },
              { de: "Say why you did not ask at the time.", tr: "O zaman neden sormadığını söyle." },
              { de: "Say what you do differently now.", tr: "Şimdi neyi farklı yaptığını söyle." },
            ],
            sample: `I wish I had asked my grandfather why he left his village at nineteen. He talked about the journey often and never about the reason, and I assumed the reason was obvious.

I did not ask because I was twenty-two and I believed he would always be at that table. There is also a smaller reason that I am less proud of: the question felt rude, and I preferred an easy afternoon.

What I do now is different and slightly ridiculous. I write two questions on a card before I visit anybody over seventy, and I ask them in the first ten minutes, while there is still time.`,
            criteria: [
              "Üç içerik noktasının üçü de işlendi mi?",
              "Sorulmayan soru somut mu?",
              "Sormama gerekçesi dürüst ve somut mu?",
              "Şimdiki uygulama geçmişle karşıtlık kuruyor mu?",
              "Geçmiş zaman ve `wish + had` yapısı doğru mu? Yaklaşık 100 kelime var mı?",
            ],
          },
        },
      ],
    },

    /* ── SPEAKING ──────────────────────────────────────────────────────── */
    {
      skill: "speaking",
      minutes: 15,
      instruction: "This part has four tasks: an interview, a long turn, a task we do together, and a general conversation.",
      instructionTr: "Bu bölümde dört görev var: söyleşi, tek başına konuşma, birlikte yapılan bir görev ve genel sohbet.",
      tasks: [
        {
          id: "en-b1-10-s1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt: "I ask you some questions about photographs, objects and what families keep.",
          promptTr: "Sana fotoğraflar, eşyalar ve ailelerin neyi sakladığı hakkında sorular soracağım.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "Good afternoon. Are there old photographs in your family? Where are they kept?", tr: "İyi günler. Ailende eski fotoğraflar var mı? Nerede duruyorlar?" },
            { who: "you", hint: "Durumu anlat ve bir örnek ver.", expect: "bir durumu betimlemek ve somut bir örnekle desteklemek", seconds: 40 },
            { who: "partner", de: "Thank you. Has anybody in your family ever told you a story you did not know?", tr: "Teşekkürler. Ailende biri sana bilmediğin bir hikâye anlattı mı?" },
            { who: "you", hint: "Geçmiş zamanla tek bir olay anlat.", expect: "geçmişte olmuş tek bir olayı anlatmak", seconds: 40 },
            { who: "partner", de: "And if you had one afternoon with the oldest person in your family, what would you ask?", tr: "Ailendeki en yaşlı kişiyle bir öğleden sonran olsa ne sorardın?" },
            { who: "you", hint: "Koşul kipiyle cevapla ve gerekçelendir.", expect: "ikinci tip koşul cümlesiyle bir varsayım kurmak", seconds: 40 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "describe a situation with an example", tr: "Bir durumu örnekle anlatmak" },
              { de: "tell one story from the past", tr: "Geçmişten tek bir olay anlatmak" },
              { de: "use a second conditional", tr: "İkinci tip koşulu kullanmak" },
            ],
            sample:
              "There is one box in my parents' flat and nobody has opened it since we moved in 2011. I know there are photographs in it because I have seen the corner of one. Two years ago my uncle told me that my grandmother had a brother who went to Canada, and until that afternoon I did not know he existed. If I had one afternoon with my grandmother, I would ask her about names rather than events, because names are the part that disappears first.",
            criteria: [
              "İlk cevapta somut bir örnek verildi mi?",
              "Anlatı tek ve belirgin mi?",
              "Son cevapta ikinci tip koşul kuruldu mu?",
              "Cevaplar geliştirildi mi, tek cümlede mi kaldı?",
            ],
          },
        },
        {
          id: "en-b1-10-s2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Talk on your own for about one minute. Compare these two ways of keeping what an older relative knows: recording them talking, or writing notes while they talk. Say which you would choose and why.",
          promptTr:
            "Yaklaşık bir dakika tek başına konuş. Yaşlı bir akrabanın bildiklerini saklamanın şu iki yolunu karşılaştır: konuşurken kaydetmek mi, konuşurken not almak mı? Hangisini seçeceğini ve nedenini söyle.",
          prepSeconds: 60,
          speakSeconds: 75,
          items: [],
          rubric: {
            minutes: 2,
            points: [
              { de: "compare the two ways", tr: "İki yolu karşılaştır" },
              { de: "say which you would choose and why", tr: "Hangisini seçeceğini ve nedenini söyle" },
              { de: "mention one disadvantage of your choice", tr: "Seçtiğin yolun bir olumsuz yanını da söyle" },
            ],
            sample:
              "A recording keeps the voice, and the voice turns out to matter more than people expect. It also keeps everything, which is the problem: eleven hours with no way in is not a record, it is a wall. Notes are the opposite. You lose the voice and the jokes, and you gain a page you can actually read in five minutes. I would take the notes, mainly because I know myself and I will not listen to eleven hours. The disadvantage is that a note is already an interpretation: what I wrote down is what I understood, and I will never be able to check it.",
            criteria: [
              "İki yol da gerçekten karşılaştırıldı mı?",
              "Karşılaştırma yapıları kullanıldı mı? (the opposite, which is the problem)",
              "Seçim gerekçelendirildi mi?",
              "Seçilen yolun olumsuz yanı da söylendi mi?",
              "Bir dakika kesintisiz konuşuldu mu?",
            ],
          },
        },
        {
          id: "en-b1-10-s3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "A relative who is ninety-two can manage one afternoon. Talk with me and agree how we use those three hours.",
          promptTr:
            "Doksan iki yaşındaki bir akraba yalnız bir öğleden sonraya dayanabiliyor. Benimle konuş ve o üç saati nasıl kullanacağımıza karar ver.",
          prepSeconds: 30,
          exchange: [
            { who: "partner", de: "The obvious thing is to go through the photographs, because there are two hundred of them. Would you start there?", tr: "Akla ilk gelen fotoğrafları elden geçirmek; iki yüz tane var. Oradan mı başlardın?" },
            { who: "you", hint: "Öneriyi değerlendir ve gerekçeli bir karşılık ver.", expect: "bir öneriyi değerlendirmek ve gerekçeli karşılık vermek", seconds: 40 },
            { who: "partner", de: "But if we ask questions instead, we may get four good stories and no names at all. Is that not worse?", tr: "Ama onun yerine soru sorarsak dört güzel hikâye alırız ve hiç isim alamayız. Bu daha kötü değil mi?" },
            { who: "you", hint: "İtirazı değerlendir ve iki şeyi birden karşılayan bir plan öner.", expect: "bir itirazı değerlendirmek ve iki amacı birden karşılayan bir plan önermek", seconds: 40 },
            { who: "partner", de: "All right. Tell me the plan for the three hours.", tr: "Peki. Üç saatlik planı söyle." },
            { who: "you", hint: "Planı sırayla ve süreleriyle özetle.", expect: "bir planı sıra ve süre vererek özetlemek", seconds: 35 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "respond to a proposal with a reason", tr: "Bir öneriye gerekçeyle karşılık vermek" },
              { de: "produce a plan that meets two aims", tr: "İki amacı birden karşılayan bir plan üretmek" },
              { de: "summarise the plan with times", tr: "Planı süreleriyle özetlemek" },
            ],
            sample:
              "I would not start with two hundred photographs, because by picture forty she will be tired and the last hundred are the ones nobody else can name. You are right that questions alone give us stories without names, so I would do both in one movement: choose twenty pictures beforehand and ask a question about each. So: half an hour of tea and nothing, ninety minutes on twenty chosen pictures with the recorder running, a break, and the last half hour on the two names we still do not have.",
            criteria: [
              "İlk öneriye gerekçeli bir karşılık verildi mi?",
              "İtiraz ciddiye alındı mı ve iki amaç birleştirildi mi?",
              "Plan sıralı ve süreli mi?",
              "Karşı tarafın sözlerine gönderme yapıldı mı?",
            ],
          },
        },
        {
          id: "en-b1-10-s4",
          no: 4,
          format: "speaking",
          goal: "interaction",
          prompt: "We talk a little more about the same topic: whether families should keep everything or choose.",
          promptTr: "Aynı konu üzerine biraz daha konuşuyoruz: aileler her şeyi mi saklamalı, yoksa seçmeli mi.",
          prepSeconds: 15,
          exchange: [
            { who: "partner", de: "Some people keep every photograph and every letter. Is that the right thing to do?", tr: "Bazı insanlar her fotoğrafı ve her mektubu saklıyor. Doğru olan bu mu?" },
            { who: "you", hint: "Görüşünü söyle ve bir örnek ver.", expect: "genel bir soruya görüş bildirmek ve örneklendirmek", seconds: 40 },
            { who: "partner", de: "Others say that keeping everything means nobody will ever look at any of it. Would you agree?", tr: "Kimileri de her şeyi saklamanın kimsenin hiçbirine bakmaması demek olduğunu söylüyor. Katılır mısın?" },
            { who: "you", hint: "Kısmen katıl ya da karşı çık; iki yanı da anmaya çalış.", expect: "bir iddiaya kısmen katılmak ya da karşı çıkmak, iki yanı da anmak", seconds: 45 },
          ],
          items: [],
          rubric: {
            minutes: 3,
            points: [
              { de: "give an opinion with an example", tr: "Görüşü bir örnekle vermek" },
              { de: "agree or disagree in a nuanced way", tr: "Katılırken ya da karşı çıkarken ince ayrım yapmak" },
            ],
            sample:
              "Keeping everything is the safe choice for the person doing the keeping and the hard choice for whoever comes next. My cousin inherited nine boxes and has looked in one. I partly agree with the second argument, because a hundred pictures with notes are worth more than four thousand without. But somebody has to choose, and the person choosing is usually the one who knows least, which is exactly why we lose the wrong things.",
            criteria: [
              "Görüş açıkça bildirildi mi?",
              "Somut bir örnek verildi mi?",
              "Kısmi katılım ifadeleri kullanıldı mı? (I partly agree, although)",
              "İki yan da anıldı mı?",
            ],
          },
        },
      ],
    },
  ],
};
