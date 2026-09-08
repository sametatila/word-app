import type { MockPaper } from "../types";

/**
 * B1 · Deneme 9 — "Sharing a Flat and What Nobody Agreed".
 *
 * B1'in öteki denemeleriyle AYNI PLAN; konu ayrı. Paylaşılan ev B1 için
 * elverişli: rica, ret, koşul, şikâyet ve uzlaşma dili aynı malzemede
 * doğal duruyor ve hiçbiri uydurulmuş bir bağlam gerektirmiyor.
 *
 * Yedinci denemenin altıncı görevi bir devir notuydu ("dört yıldır bu
 * işi yapıyorum … listeye hayır demekten korkma … liste göründüğünden
 * uzun"). O iskelet burada bilerek kullanılmadı; altıncı görev bu kez
 * kalanların değil gidenlerin üstünden kuruluyor. Dinlemedeki iki kısa
 * konuşma da yedinciden ayrı: orada listesizliği savunan ve sözünün
 * sınırını çizen kişiler vardı, burada kanıt tutmayı öneren ve alışkanlık
 * ile kural arasını ayıran kişiler var.
 */
export const EN_B1_09: MockPaper = {
  id: "en-b1-09",
  course: "en",
  level: "B1",
  no: 9,
  theme: "Sharing a Flat and What Nobody Agreed",
  themeTr: "Ev paylaşmak ve kimsenin anlaşmadığı kurallar",
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
          id: "en-b1-09-l1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "Read the five texts and questions 1 to 5. Choose a, b or c.",
          promptTr: "Beş metni ve 1–5. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "m1",
              genre: "Note on a fridge",
              genreTr: "Buzdolabındaki not",
              title: "The top shelf",
              body: `Whoever is using the top shelf: it is not yours. I do not mind sharing it, but I bought that cheese on Sunday and it was gone on Tuesday. Please just ask me. I would have said yes.`,
            },
            {
              kind: "text",
              id: "m2",
              genre: "Email from the landlord",
              genreTr: "Ev sahibinden e-posta",
              title: "The boiler",
              body: `Dear all, the boiler is being replaced on the 14th. There will be no hot water from eight until about four. One of you must be in the flat, because the men cannot work if nobody opens the door. Please tell me by Friday who it will be.`,
            },
            {
              kind: "text",
              id: "m3",
              genre: "Message",
              genreTr: "İleti",
              title: "Not about the plates",
              body: `Uma, I am not angry about the washing up. I am tired of being the person who notices it. That is a different thing and it is much harder to fix. Can we talk on Sunday?`,
            },
            {
              kind: "text",
              id: "m4",
              genre: "Notice in a building",
              genreTr: "Bina duyurusu",
              title: "The paper bin",
              body: `The bins are collected on Thursday morning. Flat 3 has put the wrong things in the paper bin four weeks running and the company left it standing. It is now everybody's problem. There is a list of what may go in on the back of this page.`,
            },
            {
              kind: "text",
              id: "m5",
              genre: "Message to a group",
              genreTr: "Gruba ileti",
              title: "The shared list",
              body: `I have written a list of what we buy together: paper, soap, oil, salt. Nothing else. If it is on the list, anybody can use it and anybody can replace it. If it is not on the list, it belongs to somebody and nobody touches it.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-09-l1-1",
              no: 1,
              ref: "m1",
              text: "What does the writer want?",
              options: ["The shelf back for herself alone", "Somebody to buy her some new cheese", "To be asked first"],
              answer: 2,
              explain:
                "Not paylaşmaya itiraz etmiyor: «I do not mind sharing it». İstek tek bir cümlede: «Please just ask me. I would have said yes».",
            },
            {
              kind: "mcq",
              id: "en-b1-09-l1-2",
              no: 2,
              ref: "m2",
              text: "What must the flatmates do?",
              options: ["Decide who stays at home", "Pay for the new boiler", "Find another flat for the day"],
              answer: 0,
              explain:
                "E-posta iki şeyi bağlıyor: «One of you must be in the flat» ve «Please tell me by Friday who it will be». Ödemeden hiç söz edilmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-09-l1-3",
              no: 3,
              ref: "m3",
              text: "What is the writer's point?",
              options: ["The washing up is never done at all", "The problem is who has to notice", "She has decided to move out"],
              answer: 1,
              explain:
                "İleti şikâyetin konusunu değiştiriyor: «I am not angry about the washing up. I am tired of being the person who notices it».",
            },
            {
              kind: "mcq",
              id: "en-b1-09-l1-4",
              no: 4,
              ref: "m4",
              text: "Why is the notice on the wall?",
              options: ["The collection day has changed", "Flat 3 must pay a charge", "One flat's mistake affects everybody"],
              answer: 2,
              explain:
                "Duyuru sonucu genelleştiriyor: kutu boşaltılmadan bırakılmış ve «It is now everybody's problem». Ceza ya da gün değişikliği yok.",
            },
            {
              kind: "mcq",
              id: "en-b1-09-l1-5",
              no: 5,
              ref: "m5",
              text: "What is the purpose of the list?",
              options: ["To make ownership clear", "To divide the cleaning fairly", "To reduce the shopping bill"],
              answer: 0,
              explain:
                "İleti iki durumu ayırıyor: listedeki her şey ortak, «If it is not on the list, it belongs to somebody and nobody touches it». Temizlik ve tasarruf hiç geçmiyor.",
            },
          ],
        },
        {
          id: "en-b1-09-l2",
          no: 2,
          format: "match",
          goal: "orientation",
          prompt:
            "Read about five people, 6 to 10. Then read the eight adverts a to h. Which advert is right for each person? You use each advert once only.",
          promptTr:
            "6–10. maddelerdeki beş kişiyi oku. Sonra a'dan h'ye sekiz ilanı oku. Her kişiye hangi ilan uyar? Her ilan en fazla bir kez kullanılır.",
          options: [
            { key: "a", label: "Rooms Wanted and Offered", body: "A free noticeboard. One photograph, the rent and the deposit shown. We do not list rooms where the deposit is more than one month." },
            { key: "b", label: "Short Lets", body: "One to six months, for people who are away or who need a room for a single term. We take five per cent of the rent." },
            { key: "c", label: "Housing Advice", body: "Free, Wednesday afternoons. Who repairs what, when a landlord may enter, how notice works. Bring your contract." },
            { key: "d", label: "Talking It Through", body: "Two evenings with somebody from outside the household. For bills, cleaning and noise. Twenty euros for the whole household." },
            { key: "e", label: "Building Breakfast", body: "First Saturday of the month in the courtyard. Bring something to eat. Everybody in the building is welcome, including new arrivals." },
            { key: "f", label: "Deposit Loans", body: "We lend you the deposit and you pay it back over ten months. Interest applies and we ask for proof of income." },
            { key: "g", label: "Removals", body: "A van and two people for four hours, ninety euros. Stairs cost extra above the third floor." },
            { key: "h", label: "Cleaning Company", body: "Weekly or every two weeks. Shared flats a speciality. One price for the whole flat, not per room." },
          ],
          items: [
            {
              kind: "match",
              id: "en-b1-09-l2-6",
              no: 6,
              text: "Vida is looking for a room and cannot pay a deposit of more than one month.",
              answer: "a",
              explain:
                "İlan tam bu kısıtı kuruyor: «We do not list rooms where the deposit is more than one month». Depozito kredisi (f) ise borçlanmayı gerektirir.",
            },
            {
              kind: "match",
              id: "en-b1-09-l2-7",
              no: 7,
              text: "Tomo and his flatmates disagree about the bills and want somebody from outside to help.",
              answer: "d",
              explain:
                "İlan hem konuyu hem yöntemi veriyor: «Two evenings with somebody from outside the household. For bills, cleaning and noise».",
            },
            {
              kind: "match",
              id: "en-b1-09-l2-8",
              no: 8,
              text: "Zsofia wants to know what her landlord must repair and what she must.",
              answer: "c",
              explain:
                "İlan sorusunu birebir karşılıyor: «Who repairs what, when a landlord may enter, how notice works», üstelik ücretsiz.",
            },
            {
              kind: "match",
              id: "en-b1-09-l2-9",
              no: 9,
              text: "Wren has a spare room for three months only, while her sister is away.",
              answer: "b",
              explain:
                "İlan süreyi ve durumu veriyor: «One to six months, for people who are away». Üç ay bu aralığın içinde.",
            },
            {
              kind: "match",
              id: "en-b1-09-l2-10",
              no: 10,
              text: "Dragan wants to meet people in the building because he has just moved in.",
              answer: "e",
              explain:
                "İlan yeni gelenleri açıkça anıyor: «Everybody in the building is welcome, including new arrivals».",
            },
          ],
        },
        {
          id: "en-b1-09-l3",
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
              title: "The argument is never about the washing up",
              body: `Piet Marek has sat in about ninety shared flats where the people living there had stopped speaking to each other. He is paid to do it by a housing charity, and he has a view that the households themselves rarely share.

Almost every dispute he is called to is presented as a dispute about cleaning. In his experience it almost never is.

What he finds instead is an agreement that nobody ever made. Four people move in over eighteen months. The first two work out how the kitchen runs; the third arrives and copies them; the fourth arrives and does something different. Nothing was written down, so nothing can be pointed at.

He is careful about how far this goes. Some people, he says, simply do not clean, although that is much rarer than households believe, and no amount of talking will change it. But those cases are obvious within a week, and they are not the ones he is called about.

His method is not complicated. He asks each person to write down, alone, the three household rules they believe already exist. In a household of four he has never once received four identical lists, and in about half of them somebody names a rule that nobody else has heard of.

The last part is the one households resist. He asks them to write the rules down and put them on the fridge, and about a third refuse, because a written rule feels like an accusation. He has learned to leave the room while they argue about that, and to come back.`,
              gloss: [
                { de: "a dispute", tr: "anlaşmazlık", en: "dispute" },
                { de: "an accusation", tr: "suçlama", en: "accusation" },
                { de: "a household", tr: "hane", en: "household" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-09-l3-11",
              no: 11,
              text: "What does Piet Marek do?",
              options: [
                "He rents out rooms in shared flats",
                "He is called in when a household has stopped talking",
                "He runs courses about cleaning a kitchen",
                "He writes contracts on behalf of landlords",
              ],
              answer: 1,
              explain:
                "İlk cümle işi tarif ediyor: «about ninety shared flats where the people living there had stopped speaking to each other», ve bunu bir vakıf adına ücretle yapıyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-09-l3-12",
              no: 12,
              text: "What does he say about disputes over cleaning?",
              options: [
                "They are usually easy to settle",
                "They are the most common and the most serious",
                "They happen only in large households",
                "They are usually about something else",
              ],
              answer: 3,
              explain:
                "Metin sunuluş ile gerçeği ayırıyor: «is presented as a dispute about cleaning. In his experience it almost never is».",
            },
            {
              kind: "mcq",
              id: "en-b1-09-l3-13",
              no: 13,
              text: "How does an unwritten agreement come about?",
              options: [
                "People arrive at different times and copy differently",
                "Landlords refuse to put rules in the contract",
                "The first tenant will not explain anything",
                "Nobody in the household writes things down well",
              ],
              answer: 0,
              explain:
                "Üçüncü paragraf süreci sırasıyla anlatıyor: ilk ikisi düzeni kuruyor, «the third arrives and copies them; the fourth arrives and does something different».",
            },
            {
              kind: "mcq",
              id: "en-b1-09-l3-14",
              no: 14,
              text: "What does he say about people who do not clean at all?",
              options: [
                "They make up most of his cases",
                "A written rule usually changes them",
                "They are obvious quickly and not his work",
                "They normally leave within a month",
              ],
              answer: 2,
              explain:
                "Metin bu grubu ayırıyor: «those cases are obvious within a week, and they are not the ones he is called about».",
            },
            {
              kind: "mcq",
              id: "en-b1-09-l3-15",
              no: 15,
              text: "Why do some households refuse the written rules?",
              options: [
                "They think the rules he suggests are wrong",
                "Putting it on paper sounds like blame",
                "There is no room on the fridge door",
                "They have already written their own",
              ],
              answer: 1,
              explain:
                "Son paragraf gerekçeyi veriyor: «about a third refuse, because a written rule feels like an accusation».",
            },
          ],
        },
        {
          id: "en-b1-09-l4",
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
              title: "The shelf that nobody owns",
              body: `Every shared kitchen has one shelf that belongs to everybody, and it is the most interesting object in the flat. {{16}}

The rule at the start is always the same and it is always unspoken: shared things go here. Oil, salt, paper. Nobody writes it down, because it seems too obvious to write down. {{17}}

The trouble begins with the things that are almost shared. A bag of rice bought by one person and used by three. A bottle of oil that somebody replaced twice and somebody else never did. {{18}}

There is a solution and it is unglamorous. You write a list of what is shared, the list is short, and everything that is not on it belongs to somebody. {{19}}

I have lived in six shared flats and I have seen this work twice. Both times somebody wrote the list in the first week, before there was anything to argue about. {{20}}`,
              gloss: [
                { de: "unspoken", tr: "söylenmemiş", en: "unspoken" },
                { de: "a verdict", tr: "hüküm, karar", en: "verdict" },
                { de: "to inherit", tr: "devralmak", en: "inherit" },
              ],
            },
          ],
          options: [
            { key: "a", label: "a", body: "By March there are usually three shelves and a silence." },
            { key: "b", label: "b", body: "It is the only place in the flat where the rules have to be worked out rather than inherited." },
            { key: "c", label: "c", body: "These are the objects that produce the arguments, and they are never the ones anybody expects." },
            { key: "d", label: "d", body: "Writing it later, when somebody is already angry, turns a piece of paper into a verdict." },
            { key: "e", label: "e", body: "The list is not there to be fair; it is there to make ownership boring." },
            { key: "f", label: "f", body: "Most rented kitchens in this city were fitted between 1998 and 2004." },
          ],
          items: [
            {
              kind: "match",
              id: "en-b1-09-l4-16",
              no: 16,
              text: "Gap 16",
              answer: "b",
              explain:
                "Açılış rafı «the most interesting object in the flat» diye niteliyor ve bir gerekçe bekliyor. (b) o gerekçeyi veriyor: kuralların devralınmadığı tek yer orası.",
            },
            {
              kind: "match",
              id: "en-b1-09-l4-17",
              no: 17,
              text: "Gap 17",
              answer: "a",
              explain:
                "Paragraf kuralın yazılmadığını söylüyor: «too obvious to write down». (a) sonucu veriyor: mart ayına kadar üç ayrı raf ve bir sessizlik.",
            },
            {
              kind: "match",
              id: "en-b1-09-l4-18",
              no: 18,
              text: "Gap 18",
              answer: "c",
              explain:
                "Paragraf iki örnek sayıyor: üç kişinin kullandığı pirinç ve iki kez yenilenen yağ. (c) «These are the objects» ile o ikisine gönderme yapıyor.",
            },
            {
              kind: "match",
              id: "en-b1-09-l4-19",
              no: 19,
              text: "Gap 19",
              answer: "e",
              explain:
                "Paragraf çözümü tarif ediyor: «the list is short, and everything that is not on it belongs to somebody». (e) listenin amacını adlandırıyor: «it is there to make ownership boring», yani adalet değil sıradanlık.",
            },
            {
              kind: "match",
              id: "en-b1-09-l4-20",
              no: 20,
              text: "Gap 20",
              answer: "d",
              explain:
                "Son paragraf zamanlamayı vurguluyor: «in the first week, before there was anything to argue about». (d) karşıtını veriyor: sonradan yazılan liste bir hükme dönüşüyor. (f) mutfakların 1998–2004 arasında döşendiğini söylüyor ve metinde mutfakların yaşı hiç tartışılmıyor — hiçbir boşluğa uymayan cümle odur.",
            },
          ],
        },
        {
          id: "en-b1-09-l5",
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
              title: "If you are moving into a shared flat",
              body: `If you are moving into a shared flat, the first week decides the next year.

Ask about money before you sign. Not the rent — everybody asks about the rent. Ask who {{21}} the internet bill when somebody leaves in March.

Write down what is shared. The list should be short and it should be {{22}} the fridge, where a new person can read it.

Do not clean other people's things in the first month. It looks kind and it {{23}} an expectation that you cannot keep.

I {{24}} to think that the loudest person in a flat was the problem. Now I think the problem is the person who notices everything and says nothing.

And one more: a household {{25}} runs on hints will lose somebody every summer.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-09-l5-21",
              no: 21,
              text: "Gap 21",
              options: ["pays", "pay", "paying", "paid"],
              answer: 0,
              explain:
                "`who` burada soru cümleciğinin öznesi ve tekil sayılır, geniş zamanda `-s` alır: «who pays the internet bill». `paying` yardımcı fiilsiz yüklem olamaz.",
            },
            {
              kind: "mcq",
              id: "en-b1-09-l5-22",
              no: 22,
              text: "Gap 22",
              options: ["at", "in", "on", "over"],
              answer: 2,
              explain:
                "Bir yüzeye yapıştırılan şey için `on` kullanılır: `on the fridge`. `in the fridge` içine koymak demektir ve liste okunamaz olurdu.",
            },
            {
              kind: "mcq",
              id: "en-b1-09-l5-23",
              no: 23,
              text: "Gap 23",
              options: ["makes", "gives", "takes", "creates"],
              answer: 3,
              explain:
                "`create an expectation` yerleşik eşdizimdir. `make`, `give` ve `take` bu adla birleşmez; `give` ayrıca ikinci bir nesne ister.",
            },
            {
              kind: "mcq",
              id: "en-b1-09-l5-24",
              no: 24,
              text: "Gap 24",
              options: ["am used", "used", "was using", "use"],
              answer: 1,
              explain:
                "`used to + yalın fiil` artık sürmeyen bir geçmiş inancı bildirir ve sonraki cümle bunu doğruluyor: «Now I think …». `am used to` alışkın olmayı anlatır ve `-ing` ister.",
            },
            {
              kind: "mcq",
              id: "en-b1-09-l5-25",
              no: 25,
              text: "Gap 25",
              options: ["what", "who", "whose", "that"],
              answer: 3,
              explain:
                "Eksik öğe özne görevinde bir ilgi adılı ve öncül `a household`, yani bir kişi değil. `that` uyar; `who` kişiler için, `whose` iyelik bildirir, `what` öncül almaz.",
            },
          ],
        },
        {
          id: "en-b1-09-l6",
          no: 6,
          format: "gap",
          goal: "structure",
          prompt: "Read the text and complete gaps 26 to 30. Write ONE word in each gap.",
          promptTr: "Metni oku ve 26–30. boşlukları tamamla. Her boşluğa TEK bir sözcük yaz.",
          texts: [
            {
              kind: "text",
              id: "t6",
              genre: "Message to new flatmates",
              genreTr: "Yeni ev arkadaşlarına ileti",
              title: "Four of us signed",
              body: `Four of us signed the contract in 2021, and only one of us is still here. That person is me.

A flat does not have a character of {{26}} own. It has whoever cooks on Sunday, and when that person leaves everything changes, even {{27}} the furniture stays the same.

Money arguments are never about money. They are about {{28}} was asked and who was only told.

The person who tidies without saying anything is usually the first {{29}} leave, because nobody notices somebody stopping.

If I could give the two people arriving next month one piece of advice, it would be to talk about March {{30}} January, while everybody is still polite.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-b1-09-l6-26",
              no: 26,
              text: "Gap 26",
              accept: ["its"],
              explain:
                "`a character of ___ own` yapısında iyelik sıfatı gerekiyor ve öncül `a flat`, yani cansız bir ad: `its`. `it's` kısaltması bu konumda kullanılmaz.",
            },
            {
              kind: "gap",
              id: "en-b1-09-l6-27",
              no: 27,
              text: "Gap 27",
              accept: ["though"],
              explain:
                "`even though` bir ödün cümlesi kurar ve önündeki `even` boşluktan hemen önce duruyor. `if` ile kurulan `even if` varsayım bildirir, oysa mobilyanın aynı kaldığı bir olgu.",
            },
            {
              kind: "gap",
              id: "en-b1-09-l6-28",
              no: 28,
              text: "Gap 28",
              accept: ["who"],
              explain:
                "Cümlenin sonu `and who was only told` diye sürüyor, yani koşut yapı aynı adılı ister: `who was asked`. Kişiler söz konusu olduğu için `which` gelmez.",
            },
            {
              kind: "gap",
              id: "en-b1-09-l6-29",
              no: 29,
              text: "Gap 29",
              accept: ["to"],
              explain:
                "`the first to + yalın fiil` sıra bildiren yerleşik yapıdır: «the first to leave». `who leaves` da mümkün olurdu ama boşluk `leave` biçiminden önce duruyor.",
            },
            {
              kind: "gap",
              id: "en-b1-09-l6-30",
              no: 30,
              text: "Gap 30",
              accept: ["in"],
              explain:
                "Ay adlarıyla `in` kullanılır: `in January`. Cümle martı ocakta konuşmayı öneriyor, yani iki ay iki ayrı işlevde.",
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
          id: "en-b1-09-h1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "You hear seven short extracts. Choose a, b or c. You hear every extract twice.",
          promptTr: "Yedi kısa parça dinleyeceksin. a, b ya da c'yi seç. Her parçayı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "a1",
              genre: "Phone call",
              genreTr: "Telefon görüşmesi",
              situation: "Bir kişi ev arkadaşıyla ilgili bir sorunu anlatıyor.",
              plays: 2,
              segments: [
                { text: "It is not the plates. I want to be clear about that, because if I say plates he will wash the plates for two weeks and we will be back here in April. It is that I am the only one who sees them." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "Phone message",
              genreTr: "Telefon iletisi",
              situation: "Ev sahibi kiracılara ileti bırakıyor.",
              plays: 2,
              segments: [
                { text: "Hello, this is about the boiler on the 14th. The men come at eight and they need somebody in the flat until about four. It does not matter which of you. Please just tell me a name by Friday." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "In the kitchen",
              genreTr: "Mutfakta",
              situation: "İki ev arkadaşı ortak alışverişi konuşuyor.",
              plays: 2,
              segments: [
                { text: "I bought the oil again. Third time this month." },
                { text: "Put it on the shared list and we split it." },
                { text: "There is no shared list." },
                { text: "Exactly. That is the whole problem." },
              ],
            },
            {
              kind: "audio",
              id: "a4",
              genre: "Housing adviser",
              genreTr: "Konut danışmanı",
              situation: "Bir danışman kendisine gelen soruları anlatıyor.",
              plays: 2,
              segments: [
                { text: "People ring me about repairs and they almost always ask the wrong question. The question is not whether the landlord should fix it. It is whether you told him in writing and can prove the date." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "Between friends",
              genreTr: "Arkadaşlar arasında",
              situation: "İki arkadaş dört kişilik bir evi konuşuyor.",
              plays: 2,
              segments: [
                { text: "Four of you and one bathroom?" },
                { text: "It works." },
                { text: "How?" },
                { text: "Nobody planned it. Sora gets up at six because of her shift, I am at seven, and the other two are students. If Sora changed jobs, the whole thing would fall over." },
              ],
            },
            {
              kind: "audio",
              id: "a6",
              genre: "Short talk",
              genreTr: "Kısa konuşma",
              situation: "Bir konuşmacı yaygın bir öğüdü ele alıyor.",
              plays: 2,
              segments: [
                { text: "The advice you always hear is: choose your flatmates carefully. It is good advice and it is useless, because most people take the room that is free in the week they need it. What can actually be chosen is what you agree in the first month." },
              ],
            },
            {
              kind: "audio",
              id: "a7",
              genre: "Phone message",
              genreTr: "Telefon iletisi",
              situation: "Bir ev arkadaşı toplantı öncesi ileti bırakıyor.",
              plays: 2,
              segments: [
                { text: "Hi, it is about Saturday. I cannot come to the flat meeting, but I want to say one thing before you decide. I will pay a share of the cleaner, and I will not pay a share of the new sofa. Please put that in the notes." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-09-h1-1",
              no: 1,
              ref: "a1",
              text: "What is the speaker's point?",
              options: ["The plates are never washed at all", "Fixing the plates would not fix the problem", "She wants him to move out"],
              answer: 1,
              explain:
                "Konuşmacı sonucu önceden görüyor: «he will wash the plates for two weeks and we will be back here in April». Asıl sorun fark eden tek kişi olmak.",
            },
            {
              kind: "mcq",
              id: "en-b1-09-h1-2",
              no: 2,
              ref: "a2",
              text: "What does the landlord need?",
              options: ["Payment before the 14th", "All four tenants at home", "One name by Friday"],
              answer: 2,
              explain:
                "İleti kimin kalacağını önemsemiyor: «It does not matter which of you. Please just tell me a name by Friday».",
            },
            {
              kind: "mcq",
              id: "en-b1-09-h1-3",
              no: 3,
              ref: "a3",
              text: "What is the second speaker's point?",
              options: ["That there should be a shared list", "That the oil is too expensive", "That the first speaker should stop buying it"],
              answer: 0,
              explain:
                "İkinci konuşmacı listenin yokluğunu sorunun kendisi sayıyor: «Exactly. That is the whole problem».",
            },
            {
              kind: "mcq",
              id: "en-b1-09-h1-4",
              no: 4,
              ref: "a4",
              text: "What does the adviser say matters?",
              options: ["Whose fault the damage is", "Proof that the landlord was told", "The cost of the repair"],
              answer: 1,
              explain:
                "Danışman doğru soruyu adlandırıyor: «whether you told him in writing and can prove the date».",
            },
            {
              kind: "mcq",
              id: "en-b1-09-h1-5",
              no: 5,
              ref: "a5",
              text: "What does the second speaker say about the arrangement?",
              options: ["It works by accident", "They agreed it carefully", "It has already failed once"],
              answer: 0,
              explain:
                "Konuşmacı düzenin tasarlanmadığını söylüyor: «Nobody planned it», ve tek bir değişiklikle çökeceğini ekliyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-09-h1-6",
              no: 6,
              ref: "a6",
              text: "What is the speaker's point about the usual advice?",
              options: ["It is simply wrong", "It applies only to students", "Most people cannot follow it"],
              answer: 2,
              explain:
                "Konuşmacı öğüdü iyi sayıp uygulanamaz buluyor: «because most people take the room that is free in the week they need it».",
            },
            {
              kind: "mcq",
              id: "en-b1-09-h1-7",
              no: 7,
              ref: "a7",
              text: "What is the speaker doing?",
              options: ["Cancelling the meeting", "Setting a limit before a decision", "Refusing to pay anything"],
              answer: 1,
              explain:
                "İleti iki kalemi ayırıyor: «I will pay a share of the cleaner, and I will not pay a share of the new sofa», üstelik tutanağa geçirilmesini istiyor.",
            },
          ],
        },
        {
          id: "en-b1-09-h2",
          no: 2,
          format: "mcq",
          goal: "gist",
          prompt: "You hear six short conversations. What is the main point? Choose a, b or c. You hear every conversation twice.",
          promptTr: "Altı kısa konuşma dinleyeceksin. Ana nokta nedir? a, b ya da c'yi seç. Her konuşmayı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "b1",
              genre: "Between flatmates",
              genreTr: "Ev arkadaşları arasında",
              situation: "İki kişi buzdolabına asılan bir notu konuşuyor.",
              plays: 2,
              segments: [
                { text: "I put a note on the fridge." },
                { text: "And?" },
                { text: "Nothing happened for a week. Then I said the same sentence out loud at breakfast and it was done by lunchtime. The same words." },
                { text: "So write nothing?" },
                { text: "So say it to a face." },
              ],
            },
            {
              kind: "audio",
              id: "b2",
              genre: "Between flatmates",
              genreTr: "Ev arkadaşları arasında",
              situation: "İki kişi bir teklifi değerlendiriyor.",
              plays: 2,
              segments: [
                { text: "He offered to do all the cleaning if he pays less rent." },
                { text: "I would take that." },
                { text: "He offered the same thing in the school flat last year. Six weeks, then nothing, and by then the rent was already lower." },
                { text: "All right. That is fair." },
              ],
            },
            {
              kind: "audio",
              id: "b3",
              genre: "Phone call",
              genreTr: "Telefon görüşmesi",
              situation: "Biri kendisine yapılan bir çağrıya karşılık veriyor.",
              plays: 2,
              segments: [
                { text: "That is kind of you to ask, and no, not this month. I did the whole move in December and I was no use to anybody for two weeks. Ask me again in the spring and the answer will probably be different." },
              ],
            },
            {
              kind: "audio",
              id: "b4",
              genre: "In the kitchen",
              genreTr: "Mutfakta",
              situation: "İki ev arkadaşı hafta sonunu konuşuyor.",
              plays: 2,
              segments: [
                { text: "Somebody left a pan on the stove on Friday." },
                { text: "And?" },
                { text: "It was still there on Monday. It is not that people are lazy. It is that between Friday and Sunday nobody in this flat is responsible for anything." },
              ],
            },
            {
              kind: "audio",
              id: "b5",
              genre: "Between flatmates",
              genreTr: "Ev arkadaşları arasında",
              situation: "İki kiracı ev sahibinin cevabını konuşuyor.",
              plays: 2,
              segments: [
                { text: "The landlord says the damp is because we do not open the windows." },
                { text: "Do you open them?" },
                { text: "In February?" },
                { text: "That is his answer and it will be his answer next year too. Write to him anyway and keep the date." },
              ],
            },
            {
              kind: "audio",
              id: "b6",
              genre: "Between flatmates",
              genreTr: "Ev arkadaşları arasında",
              situation: "İki kişi büyük odayı tartışıyor.",
              plays: 2,
              segments: [
                { text: "I have lived here longest, so I get the big room." },
                { text: "Nobody agreed that." },
                { text: "It is how it works everywhere." },
                { text: "It is how it worked in your last flat. That is not the same thing as a rule." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-09-h2-8",
              no: 8,
              ref: "b1",
              text: "What did the first speaker learn?",
              options: ["Saying it in person works better", "Notes on the fridge should be longer", "The fridge is the wrong place for a note"],
              answer: 0,
              explain:
                "Konuşmacı iki denemeyi karşılaştırıyor: yazı bir hafta işe yaramıyor, «The same words» sözlü söylenince öğlene kadar yapılıyor. Sonuç: «So say it to a face».",
            },
            {
              kind: "mcq",
              id: "en-b1-09-h2-9",
              no: 9,
              ref: "b2",
              text: "What do they agree in the end?",
              options: ["The offer is generous", "The offer has failed before", "The rent should not change at all"],
              answer: 1,
              explain:
                "İkinci konuşmacı geçmişi duyunca fikrini değiştiriyor: «Six weeks, then nothing, and by then the rent was already lower» — «All right. That is fair».",
            },
            {
              kind: "mcq",
              id: "en-b1-09-h2-10",
              no: 10,
              ref: "b3",
              text: "What is the speaker doing?",
              options: ["Asking for help with a move", "Complaining about December", "Turning something down politely"],
              answer: 2,
              explain:
                "Konuşmacı reddediyor ama kapıyı kapatmıyor: «no, not this month … Ask me again in the spring».",
            },
            {
              kind: "mcq",
              id: "en-b1-09-h2-11",
              no: 11,
              ref: "b4",
              text: "What is the main point?",
              options: ["Nobody is responsible at the weekend", "The flatmates are careless people", "The pan should simply be thrown away"],
              answer: 0,
              explain:
                "Konuşmacı ilk açıklamayı kendisi eliyor: «It is not that people are lazy», sonra teşhisi veriyor: cuma ile pazar arasında kimse sorumlu değil.",
            },
            {
              kind: "mcq",
              id: "en-b1-09-h2-12",
              no: 12,
              ref: "b5",
              text: "What does the second speaker advise?",
              options: ["To open the windows more often", "To stop paying the rent", "To write to the landlord and keep the date"],
              answer: 2,
              explain:
                "Konuşmacı ev sahibinin cevabının değişmeyeceğini söylüyor ve kanıt öneriyor: «Write to him anyway and keep the date».",
            },
            {
              kind: "mcq",
              id: "en-b1-09-h2-13",
              no: 13,
              ref: "b6",
              text: "What is the second speaker saying?",
              options: ["The big room should be shared", "A habit is not an agreement", "The first speaker should move out"],
              answer: 1,
              explain:
                "Konuşmacı geçmiş uygulamayı kuraldan ayırıyor: «It is how it worked in your last flat. That is not the same thing as a rule».",
            },
          ],
        },
        {
          id: "en-b1-09-h3",
          no: 3,
          format: "notes",
          goal: "detail",
          prompt:
            "You hear information about a housing advice desk. Complete the notes, questions 14 to 19. Write ONE or TWO words or a number in each gap. You hear the information twice.",
          promptTr:
            "Bir konut danışma masası hakkında bilgi dinleyeceksin. 14–19. maddelerdeki notları tamamla. Her boşluğa BİR ya da İKİ sözcük veya bir sayı yaz. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "c1",
              genre: "Information",
              genreTr: "Bilgilendirme",
              situation: "Bir görevli danışma masasını anlatıyor.",
              plays: 2,
              segments: [
                {
                  text: "Good evening. The housing advice desk runs on a Wednesday, between two and six. It is free and you do not need an appointment, but you must bring your contract; we cannot advise you without it. There are three advisers and the average wait is forty minutes. We help with repairs, deposits and notice. We cannot help with arguments between flatmates — for that there is a separate service on Monday. And if you are in a hurry, the quietest hour is between five and six.",
                },
              ],
            },
            {
              kind: "text",
              id: "n1",
              genre: "Notes",
              genreTr: "Not kâğıdı",
              title: "Housing advice desk — notes",
              body: `Day:                     {{14}}
You must bring your:     {{15}}
Number of advisers:      {{16}}
Average wait:            {{17}} minutes
Flatmate arguments:      {{18}}
The quietest hour starts at: {{19}}`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-b1-09-h3-14",
              no: 14,
              ref: "c1",
              text: "Gap 14",
              accept: ["wednesday"],
              explain:
                "Kayıt günü veriyor: «The housing advice desk runs on a Wednesday». Pazartesi ayrı hizmetin günü.",
            },
            {
              kind: "gap",
              id: "en-b1-09-h3-15",
              no: 15,
              ref: "c1",
              text: "Gap 15",
              accept: ["contract"],
              explain:
                "Kayıt koşulu gerekçesiyle veriyor: «you must bring your contract; we cannot advise you without it». Randevu ise gerekmiyor.",
            },
            {
              kind: "gap",
              id: "en-b1-09-h3-16",
              no: 16,
              ref: "c1",
              text: "Gap 16",
              accept: ["3", "three"],
              explain:
                "«There are three advisers and the average wait is forty minutes» — danışman sayısı üç, kırk ise dakika.",
            },
            {
              kind: "gap",
              id: "en-b1-09-h3-17",
              no: 17,
              ref: "c1",
              text: "Gap 17",
              accept: ["40", "forty"],
              explain:
                "Aynı cümledeki ikinci sayı bekleme süresine ait: «the average wait is forty minutes».",
            },
            {
              kind: "gap",
              id: "en-b1-09-h3-18",
              no: 18,
              ref: "c1",
              text: "Gap 18",
              accept: ["monday"],
              explain:
                "Kayıt bu konuyu ayırıyor: «We cannot help with arguments between flatmates — for that there is a separate service on Monday».",
            },
            {
              kind: "gap",
              id: "en-b1-09-h3-19",
              no: 19,
              ref: "c1",
              text: "Gap 19",
              accept: ["5", "five"],
              explain:
                "«the quietest hour is between five and six» — sakin saatin başlangıcı beş. İki ile altı ise masanın açık olduğu aralık.",
            },
          ],
        },
        {
          id: "en-b1-09-h4",
          no: 4,
          format: "mcq",
          goal: "opinion",
          prompt:
            "You hear an interview with a woman who writes household agreements. Choose a, b or c for questions 20 to 25. You hear the interview twice.",
          promptTr:
            "Ev içi anlaşma metinleri yazan bir kadınla söyleşi dinleyeceksin. 20–25. maddeler için a, b ya da c'yi seç. Söyleşiyi iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Radio interview",
              genreTr: "Radyo söyleşisi",
              situation: "Bir sunucu, on bir paylaşımlı evde yaşamış olan Juno ile konuşuyor.",
              plays: 2,
              segments: [
                { text: "Eleven flats. Is that a record?" },
                { text: "It is a bad sign, not a record. Two of those lasted four months. The honest version is that I was very bad at this for the first six years." },
                { text: "Bad in what way?" },
                { text: "I assumed. I assumed that everybody meant the same thing by the word clean, and I assumed that being reasonable was a method. It is not a method. It is a mood, and it goes at about eleven at night." },
                { text: "So now you write agreements. What is in one?" },
                { text: "Less than people expect. Four lines about money, one about guests, one about noise after eleven, and a date to read it again. It fits on a fridge door." },
                { text: "Does it work?" },
                { text: "It works for money and noise, which are the two things you can write down. It does nothing at all for the person who is quietly unhappy, and that is who actually leaves." },
                { text: "How do you know when somebody has reached that point?" },
                { text: "I do not, and anybody who says they can is selling a workshop. What I do instead is put a date in the agreement. Six weeks after somebody moves in, everybody sits down for twenty minutes whether there is a problem or not." },
                { text: "That sounds awkward." },
                { text: "It is awkward the first time and dull every time after that. Dull is the aim. If the meeting is interesting, you left it too late." },
                { text: "Would you change anything about the way you do it?" },
                { text: "I would put the money lines first. For two years I put the friendly parts first, so it read like a promise. Now it reads like an invoice, and people take it seriously in a way they did not before." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-09-h4-20",
              no: 20,
              ref: "d1",
              text: "What does Juno say about having lived in eleven flats?",
              options: ["It has made her something of an expert", "Most of them were short by choice", "It shows she was bad at it"],
              answer: 2,
              explain:
                "Juno rakamı olumsuz okuyor: «It is a bad sign, not a record» ve ekliyor: «I was very bad at this for the first six years».",
            },
            {
              kind: "mcq",
              id: "en-b1-09-h4-21",
              no: 21,
              ref: "d1",
              text: "What mistake does she describe?",
              options: ["Assuming everybody meant the same things", "Refusing to talk about money at all", "Choosing her flatmates too quickly"],
              answer: 0,
              explain:
                "Juno hatayı iki kez adlandırıyor: «I assumed that everybody meant the same thing by the word clean, and I assumed that being reasonable was a method».",
            },
            {
              kind: "mcq",
              id: "en-b1-09-h4-22",
              no: 22,
              ref: "d1",
              text: "What does she say an agreement contains?",
              options: ["A long list of detailed household rules", "A short text with a date", "Nothing at all about money"],
              answer: 1,
              explain:
                "Juno içeriği sayıyor: dört satır para, bir satır misafir, bir satır gürültü «and a date to read it again. It fits on a fridge door».",
            },
            {
              kind: "mcq",
              id: "en-b1-09-h4-23",
              no: 23,
              ref: "d1",
              text: "What does she say the agreement cannot do?",
              options: ["Settling arguments about noise at night", "Dividing the bills fairly between people", "Helping somebody who says nothing"],
              answer: 2,
              explain:
                "Juno sınırı açıkça koyuyor: «It does nothing at all for the person who is quietly unhappy, and that is who actually leaves».",
            },
            {
              kind: "mcq",
              id: "en-b1-09-h4-24",
              no: 24,
              ref: "d1",
              text: "What is the purpose of the six-week meeting?",
              options: ["To decide who should leave the flat", "To happen before a problem exists", "To read the whole contract aloud"],
              answer: 1,
              explain:
                "Juno toplantıyı soruna bağlamıyor: «everybody sits down for twenty minutes whether there is a problem or not», ve ekliyor: «If the meeting is interesting, you left it too late».",
            },
            {
              kind: "mcq",
              id: "en-b1-09-h4-25",
              no: 25,
              ref: "d1",
              text: "What has she changed?",
              options: ["The order of the agreement", "The length of the meetings", "The kind of household she works with"],
              answer: 0,
              explain:
                "Juno değişikliği adlandırıyor: «I would put the money lines first», çünkü önceki sıralamada metin bir söz gibi okunuyordu.",
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
          id: "en-b1-09-w1",
          no: 1,
          format: "writing",
          goal: "interaction",
          prompt:
            "There is damp on the wall of your rented flat and it has been there for six weeks. Write an email to your landlord. Write about 100 words and cover all the points.",
          promptTr:
            "Kiraladığın dairenin duvarında altı haftadır nem var. Ev sahibine bir e-posta yaz. Yaklaşık 100 kelime, bütün maddeleri işle.",
          items: [],
          rubric: {
            minWords: 100,
            points: [
              { de: "Say what the problem is and since when.", tr: "Sorunun ne olduğunu ve ne zamandır sürdüğünü söyle." },
              { de: "Say what you have already done about it.", tr: "Bu konuda şimdiye kadar ne yaptığını söyle." },
              { de: "Ask for one clear thing, with a date.", tr: "Tek ve açık bir şey iste, tarihiyle birlikte." },
            ],
            sample: `Dear Mr Halm,

I am writing about the damp on the bedroom wall of flat 4. It appeared at the beginning of February and it now covers an area about the size of a door.

I telephoned your office on 14 February and spoke to a colleague, who said somebody would come. Nobody has come since then. I have opened the windows every day, as you suggested, and the patch has grown.

Could you arrange for somebody to look at the wall before 20 March? I am at home on Tuesday and Thursday mornings.

I would be grateful for an answer this week.

Yours sincerely,
Vida Roth`,
            criteria: [
              "Üç içerik noktasının üçü de işlendi mi?",
              "Tarih, süre ve büyüklük gibi somut bilgiler verildi mi?",
              "Present perfect doğru kullanıldı mı? (`Nobody has come`, `the patch has grown`)",
              "Tek ve açık bir istek var mı, tarihiyle birlikte?",
              "Kayıt resmî mi ve sitem içermeyecek biçimde mi? Yaklaşık 100 kelime var mı?",
            ],
          },
        },
        {
          id: "en-b1-09-w2",
          no: 2,
          format: "writing",
          goal: "production",
          prompt:
            "Write an article for a student website with this title: \"The question I would ask before moving in\". Say what the question is, why you would ask it and what happened when you did not. Write about 100 words.",
          promptTr:
            "Bir öğrenci sitesi için şu başlıkla bir yazı yaz: \"Bir eve girmeden önce soracağım soru\". Sorunun ne olduğunu, neden soracağını ve sormadığın zaman ne olduğunu yaz. Yaklaşık 100 kelime.",
          items: [],
          rubric: {
            minWords: 100,
            points: [
              { de: "Say what the question is.", tr: "Sorunun ne olduğunu söyle." },
              { de: "Say why you would ask it.", tr: "Neden soracağını söyle." },
              { de: "Say what happened when you did not ask it.", tr: "Sormadığın zaman ne olduğunu söyle." },
            ],
            sample: `My question is not about the rent. It is this: who pays the internet when somebody leaves in the middle of a contract?

I would ask it because it is small enough to answer honestly and large enough to show how the household works. A flat that has never thought about it has never thought about anything.

I did not ask it in my last flat. In November one of us moved out and the bill stayed in his name. For four months the rest of us paid him and he forgot to pay the company twice. We were not angry with him. We were angry with ourselves.`,
            criteria: [
              "Üç içerik noktasının üçü de işlendi mi?",
              "Soru somut mu, yoksa genel bir niyet mi?",
              "Gerekçe soruyla gerçekten bağlantılı mı?",
              "Geçmiş zaman ve present perfect doğru ayrıldı mı?",
              "Yaklaşık 100 kelime yazıldı mı?",
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
          id: "en-b1-09-s1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt: "I ask you some questions about where you live and about sharing space with other people.",
          promptTr: "Sana yaşadığın yer ve başkalarıyla alan paylaşmak hakkında sorular soracağım.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "Good afternoon. Do you live alone or with other people? How does that work?", tr: "İyi günler. Tek başına mı yaşıyorsun yoksa başkalarıyla mı? Bu nasıl yürüyor?" },
            { who: "you", hint: "Durumu anlat ve bir örnek ver.", expect: "bir durumu betimlemek ve somut bir örnekle desteklemek", seconds: 40 },
            { who: "partner", de: "Thank you. Has there ever been an argument in a place where you lived? What was it really about?", tr: "Teşekkürler. Yaşadığın bir yerde hiç tartışma çıktı mı? Aslında neyle ilgiliydi?" },
            { who: "you", hint: "Geçmiş zamanla bir olay anlat ve gerçek sebebi söyle.", expect: "geçmişte olmuş bir olayı anlatmak ve nedenini çözümlemek", seconds: 40 },
            { who: "partner", de: "And if you shared a flat with three strangers, what would you agree in the first week?", tr: "Üç yabancıyla bir ev paylaşsan, ilk hafta neyi konuşup karara bağlardın?" },
            { who: "you", hint: "Koşul kipiyle cevapla ve gerekçelendir.", expect: "ikinci tip koşul cümlesiyle bir varsayım kurmak", seconds: 40 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "describe a situation with an example", tr: "Bir durumu örnekle anlatmak" },
              { de: "analyse the reason behind an event", tr: "Bir olayın arkasındaki nedeni çözümlemek" },
              { de: "use a second conditional", tr: "İkinci tip koşulu kullanmak" },
            ],
            sample:
              "I live with two other people and one of them I did not know before. It works because we eat at different times, which is luck rather than planning. Last year we argued for a month about the bathroom, and it was not really about the bathroom; it was that one person had never been asked and the rest of us had. If I shared a flat with three strangers, I would agree the money in the first week, because money is the only thing you can write down honestly before you like each other.",
            criteria: [
              "İlk cevapta somut bir örnek verildi mi?",
              "Olayın arkasındaki neden çözümlendi mi, yoksa yalnız anlatıldı mı?",
              "Son cevapta ikinci tip koşul kuruldu mu?",
              "Cevaplar geliştirildi mi, tek cümlede mi kaldı?",
            ],
          },
        },
        {
          id: "en-b1-09-s2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Talk on your own for about one minute. Compare these two ways of running a shared flat: writing the rules down at the start, or sorting things out as they come up. Say which you would prefer and why.",
          promptTr:
            "Yaklaşık bir dakika tek başına konuş. Paylaşımlı bir evi yürütmenin şu iki yolunu karşılaştır: kuralları başta yazmak mı, sorunlar çıktıkça çözmek mi? Hangisini tercih edeceğini ve nedenini söyle.",
          prepSeconds: 60,
          speakSeconds: 75,
          items: [],
          rubric: {
            minutes: 2,
            points: [
              { de: "compare the two ways", tr: "İki yolu karşılaştır" },
              { de: "say which you prefer and why", tr: "Hangisini tercih ettiğini ve nedenini söyle" },
              { de: "mention one disadvantage of your choice", tr: "Seçtiğin yolun bir olumsuz yanını da söyle" },
            ],
            sample:
              "Writing the rules down feels cold in week one, when everybody is polite and nothing has gone wrong. That is exactly why it works: a rule written before there is a problem is a piece of paper, and the same rule written in March is a judgement about somebody. Sorting things out as they come up sounds friendlier, and it puts the whole job on whoever minds first. I would write them down. The disadvantage is real, though: a written list makes people think the difficult things have been covered, and the things that actually break a flat are the ones nobody can put on a fridge door.",
            criteria: [
              "İki yol da gerçekten karşılaştırıldı mı?",
              "Karşılaştırma yapıları kullanıldı mı? (that is exactly why, on the other hand)",
              "Tercih gerekçelendirildi mi?",
              "Seçilen yolun olumsuz yanı da söylendi mi?",
              "Bir dakika kesintisiz konuşuldu mu?",
            ],
          },
        },
        {
          id: "en-b1-09-s3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Four of us share a flat and one person has just lost their job. Talk with me and agree how we divide the bills for the next three months.",
          promptTr:
            "Dördümüz bir evi paylaşıyoruz ve bir kişi işini yeni kaybetti. Benimle konuş ve önümüzdeki üç ay faturaları nasıl bölüşeceğimize karar ver.",
          prepSeconds: 30,
          exchange: [
            { who: "partner", de: "The simplest thing is that we three pay a little more for three months. Would you agree to that?", tr: "En basiti üçümüzün üç ay boyunca biraz fazla ödemesi. Buna katılır mısın?" },
            { who: "you", hint: "Öneriye gerekçeli karşılık ver: kabul et ya da değiştir.", expect: "bir öneriye gerekçeli karşılık vermek", seconds: 40 },
            { who: "partner", de: "But he does not want charity, and one of us earns much less than the other two. Does that change the plan?", tr: "Ama o yardım istemiyor ve üçümüzden biri ötekilerden çok daha az kazanıyor. Bu planı değiştirir mi?" },
            { who: "you", hint: "İki kısıtı da hesaba katan somut bir çözüm öner.", expect: "iki ayrı kısıtı birlikte karşılayan bir çözüm önermek", seconds: 40 },
            { who: "partner", de: "All right. Say the arrangement as we would write it down.", tr: "Peki. Düzeni yazacağımız gibi söyle." },
            { who: "you", hint: "Varılan düzeni tek tek ve uygulanabilir biçimde özetle.", expect: "varılan düzeni açık ve uygulanabilir biçimde özetlemek", seconds: 35 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "respond to a proposal with a reason", tr: "Bir öneriye gerekçeyle karşılık vermek" },
              { de: "solve a problem with two constraints", tr: "İki kısıtı olan bir sorunu çözmek" },
              { de: "summarise the arrangement", tr: "Varılan düzeni özetlemek" },
            ],
            sample:
              "I would agree in principle, but not as charity, because he has said he does not want that. You are right that we do not all earn the same, so an equal extra share is not equal at all. What I would do is this: he pays his rent and nothing else for three months, and the three of us divide the bills by income rather than by head. On paper: rent unchanged for everybody, bills split sixty, twenty-five and fifteen, reviewed on 1 June, and he pays back nothing.",
            criteria: [
              "İlk öneriye gerekçeli bir karşılık verildi mi?",
              "İki kısıt da (yardım istememesi ve gelir farkı) çözüme katıldı mı?",
              "Somut bir bölüşüm ortaya çıktı mı?",
              "Sonunda düzen özetlendi mi?",
            ],
          },
        },
        {
          id: "en-b1-09-s4",
          no: 4,
          format: "speaking",
          goal: "interaction",
          prompt: "We talk a little more about the same topic: whether landlords should choose who lives together.",
          promptTr: "Aynı konu üzerine biraz daha konuşuyoruz: kimlerin birlikte yaşayacağını ev sahipleri mi seçmeli.",
          prepSeconds: 15,
          exchange: [
            { who: "partner", de: "Some landlords interview every new flatmate themselves. Is that reasonable?", tr: "Bazı ev sahipleri her yeni ev arkadaşıyla kendisi görüşüyor. Bu makul mü?" },
            { who: "you", hint: "Görüşünü söyle ve bir örnek ver.", expect: "genel bir soruya görüş bildirmek ve örneklendirmek", seconds: 40 },
            { who: "partner", de: "Others say the people who already live there should decide, because they are the ones who have to share a kitchen. Would you agree?", tr: "Kimileri de kararı orada yaşayanların vermesi gerektiğini söylüyor; mutfağı paylaşacak olanlar onlar. Katılır mısın?" },
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
              "A landlord has a reason to check that somebody can pay, and no reason at all to decide who is pleasant at breakfast. In my last flat the owner refused a person we all liked because of her job, and the room stayed empty for two months. I partly agree with the second argument, because the people who share the kitchen carry the consequences. But a household of three can also be unfair to a stranger without noticing, and there is nobody outside the room to say so.",
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
