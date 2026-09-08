import type { MockPaper } from "../types";

/**
 * C1 · Deneme 7 — "Fehler und Verantwortung".
 *
 * PLAN kâğıt 1–6 ile birebir aynı.
 *
 *   Lesen  70 dk · 25 madde   (10 özet boşluğu · 10 dört şıklı · 5 yapı boşluğu)
 *   Hören  40 dk · 25 madde   (10 not alma · 15 panel)
 *   Schreiben 80 dk           görüş yazısı (~200) + on boşluklu resmî mektup
 *   Sprechen  15 dk           sunum (4 dk) · birlikte karar verme
 *
 * KONU SEÇİMİ: hata kültürü ve sorumluluk. C1'de ölçülen şey artık argüman
 * değil ARGÜMANIN YAPISI: bir savın hangi noktada kendi bedelini kabul ettiği,
 * bir karşı çıkışın savı mı yoksa savın bir karikatürünü mü hedeflediği.
 * Bu konu o ayrımı doğal olarak taşıyor, çünkü tartışmanın her iki tarafı da
 * kendi tarafının maliyetini söylemek zorunda kalıyor.
 *
 * L2 METNİ bilerek kendi konumunun zayıf yanını açıkça yazıyor ("Das ist ein
 * statistisches Argument, und statistische Argumente verlieren gegen Gesichter").
 * Maddelerin bir kısmı tam bu kabulü hedefliyor — yazarın ne savunduğunu değil,
 * neyi teslim ettiğini soruyor.
 *
 * SÜRE: konuşma bölümündeki iki görevin de `minutes` alanı yazılı; `taskSeconds`
 * açık süreyi ancak bölümün TÜM görevlerinde varsa kullanıyor.
 */
export const C1_07: MockPaper = {
  id: "de-c1-07",
  course: "de",
  level: "C1",
  no: 7,
  theme: "Fehler und Verantwortung",
  themeTr: "Hata ve sorumluluk",
  minutes: 205,
  parts: [
    /* ── LESEN ─────────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 70,
      instruction:
        "Dieser Teil hat drei Aufgaben: eine Zusammenfassung ergänzen, einen Essay auswerten und einen Text strukturell schließen.",
      instructionTr:
        "Bu bölümde üç görev var: bir özeti tamamlamak, bir deneme metnini çözümlemek ve bir metni yapısal olarak kapatmak.",
      tasks: [
        {
          id: "de-c1-07-l1",
          no: 1,
          format: "gap",
          goal: "gist",
          prompt:
            "Lesen Sie den Text und die Zusammenfassung darunter. Ergänzen Sie die Lücken 1 bis 10 sinngemäß. Schreiben Sie in jede Lücke ein Wort. Die Wörter stehen nicht immer wörtlich im Text.",
          promptTr:
            "Metni ve altındaki özeti oku. 1–10. boşlukları anlama uygun biçimde tamamla. Her boşluğa bir sözcük yaz. Sözcükler metinde her zaman birebir geçmiyor.",
          texts: [
            {
              kind: "text",
              id: "t1",
              genre: "Sachtext",
              genreTr: "Bilgi metni",
              title: "Die zweite Frage",
              body: `Nach jedem größeren Zwischenfall stellt die Öffentlichkeit zwei Fragen, und sie stellt sie fast immer in derselben Reihenfolge. Die erste lautet: Wer war es? Die zweite: Wie konnte das geschehen? In der Praxis der Untersuchung ist die umgekehrte Reihenfolge entscheidend.

Das liegt nicht an einer besonderen Milde gegenüber den Beteiligten. Es liegt daran, dass die erste Frage die Antwort auf die zweite verschließt. Wer damit rechnen muss, benannt zu werden, berichtet weniger — und ohne Bericht gibt es nichts zu untersuchen.

Die Luftfahrt hat daraus vor Jahrzehnten Konsequenzen gezogen. Meldungen über Beinaheunfälle werden dort anonym erfasst und ausdrücklich nicht zur Grundlage arbeitsrechtlicher Schritte gemacht. Die Zahl der Meldungen stieg daraufhin um ein Vielfaches; die Zahl der Unfälle ging zurück.

Übertragen wurde das Verfahren gleichwohl nur zögerlich. In Kliniken existieren vergleichbare Systeme seit etwa zwanzig Jahren, doch ihre Wirkung schwankt erheblich. Untersuchungen führen das weniger auf die Technik zurück als auf eine einzige Bedingung: ob Leitungspersonen selbst Fehler berichten.

Ein verbreitetes Missverständnis besteht darin, Fehlerkultur mit Folgenlosigkeit zu verwechseln. Gemeint ist das Gegenteil. Wer absichtlich gegen Regeln verstößt, muss mit Konsequenzen rechnen; wer unter unklaren Bedingungen falsch entscheidet, soll berichten dürfen. Die Grenze verläuft nicht zwischen schwer und leicht, sondern zwischen Absicht und Umstand.

Schwierig bleibt der Umgang mit der Öffentlichkeit. Eine anonyme Meldung eignet sich nicht für eine Schlagzeile, ein Name schon. Solange Aufklärung und Empörung ohnehin dieselbe Bühne teilen, wird die erste Frage die lautere bleiben.`,
            },
            {
              kind: "text",
              id: "z1",
              genre: "Zusammenfassung",
              genreTr: "Özet",
              body: `Nach Zwischenfällen fragt die Öffentlichkeit zuerst nach der {{1}} und erst danach nach den Umständen. Für die Untersuchung ist diese Reihenfolge {{2}}, weil die Aussicht auf Benennung die Bereitschaft zur {{3}} senkt.

Die Luftfahrt hat deshalb ein System eingeführt, in dem Meldungen {{4}} erfasst werden und keine arbeitsrechtlichen Folgen haben. Die Zahl der Meldungen ist danach gestiegen, die Zahl der Unfälle {{5}}.

In Kliniken gibt es solche Systeme seit rund zwei {{6}}, doch sie wirken unterschiedlich stark. Entscheidend ist dabei nicht die Technik, sondern ob die {{7}} selbst Fehler berichtet.

Fehlerkultur bedeutet nicht {{8}}: Absichtliche Regelverstöße haben weiterhin Konsequenzen. Die Trennlinie verläuft zwischen Absicht und {{9}}.

Schwierig bleibt der Umgang mit der {{10}}, weil sich ein Name besser für eine Schlagzeile eignet als eine anonyme Meldung.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "de-c1-07-l1-1",
              no: 1,
              text: "Lücke 1",
              accept: ["Person", "Schuld", "Verantwortlichkeit"],
              explain:
                "İlk soru metinde birebir veriliyor: \"Wer war es?\" Özette bunun karşılığı kişi ya da suç.",
            },
            {
              kind: "gap",
              id: "de-c1-07-l1-2",
              no: 2,
              text: "Lücke 2",
              accept: ["hinderlich", "ungünstig", "schädlich"],
              explain:
                "Metin sırayı tersine çeviriyor: \"In der Praxis der Untersuchung ist die umgekehrte Reihenfolge entscheidend\" — yani kamuoyunun sırası soruşturmaya engel.",
            },
            {
              kind: "gap",
              id: "de-c1-07-l1-3",
              no: 3,
              text: "Lücke 3",
              accept: ["Meldung", "Mitteilung", "Offenheit"],
              explain:
                "\"Wer damit rechnen muss, benannt zu werden, berichtet weniger\" — düşen şey bildirme isteği.",
            },
            {
              kind: "gap",
              id: "de-c1-07-l1-4",
              no: 4,
              text: "Lücke 4",
              accept: ["anonym", "namenlos"],
              explain:
                "\"Meldungen über Beinaheunfälle werden dort anonym erfasst\" — ve iş hukuku sonucu doğurmuyor.",
            },
            {
              kind: "gap",
              id: "de-c1-07-l1-5",
              no: 5,
              text: "Lücke 5",
              accept: ["gesunken", "zurückgegangen", "gefallen"],
              explain:
                "Metindeki karşıtlık: bildirimler kat kat artmış, \"die Zahl der Unfälle ging zurück\".",
            },
            {
              kind: "gap",
              id: "de-c1-07-l1-6",
              no: 6,
              text: "Lücke 6",
              accept: ["Jahrzehnten", "Dekaden"],
              explain:
                "\"seit etwa zwanzig Jahren\" — yirmi yıl iki on yıl eder, özette çoğul datif isteniyor.",
            },
            {
              kind: "gap",
              id: "de-c1-07-l1-7",
              no: 7,
              text: "Lücke 7",
              accept: ["Leitung", "Führung", "Leitungsebene"],
              explain:
                "Belirleyici koşul metinde tek cümlede: \"ob Leitungspersonen selbst Fehler berichten\".",
            },
            {
              kind: "gap",
              id: "de-c1-07-l1-8",
              no: 8,
              text: "Lücke 8",
              accept: ["Folgenlosigkeit", "Straflosigkeit", "Nachsicht"],
              explain:
                "Yanlış anlama tam olarak bu: \"Fehlerkultur mit Folgenlosigkeit zu verwechseln\". Metin tersini söylüyor.",
            },
            {
              kind: "gap",
              id: "de-c1-07-l1-9",
              no: 9,
              text: "Lücke 9",
              accept: ["Umstand", "Umständen", "Versehen"],
              explain:
                "Ayrım cümlesi: \"Die Grenze verläuft nicht zwischen schwer und leicht, sondern zwischen Absicht und Umstand.\"",
            },
            {
              kind: "gap",
              id: "de-c1-07-l1-10",
              no: 10,
              text: "Lücke 10",
              accept: ["Öffentlichkeit", "Presse", "Medienöffentlichkeit"],
              explain:
                "Son paragrafın konusu: \"Schwierig bleibt der Umgang mit der Öffentlichkeit\" — manşet ile anonim bildirim arasındaki uyumsuzluk.",
            },
          ],
        },
        {
          id: "de-c1-07-l2",
          no: 2,
          format: "mcq",
          goal: "opinion",
          prompt: "Lesen Sie den Essay und die Aufgaben 11 bis 20. Wählen Sie: a, b, c oder d.",
          promptTr: "Deneme metnini ve 11–20. maddeleri oku. a, b, c ya da d'yi seç.",
          texts: [
            {
              kind: "text",
              id: "t2",
              genre: "Essay",
              genreTr: "Deneme",
              title: "Wer haftet für ein System?",
              body: `Als im vergangenen Jahr in einer norddeutschen Klinik eine Verwechslung von Medikamenten öffentlich wurde, verlief die Debatte nach einem Muster, das sich seit Jahren wiederholt. Zuerst wurde eine Pflegekraft genannt, dann eine Stationsleitung, schließlich eine Software. Am Ende standen ein Vergleich, ein Wechsel in der Leitung und keine Änderung des Verfahrens.

Man kann darin ein Versagen der Aufsicht sehen. Näher liegt eine andere Deutung: Unsere Vorstellung von Verantwortung stammt aus einer Zeit, in der Handlungen überschaubar waren. Sie unterstellt eine Person, die eine Entscheidung trifft und deren Folgen kennt. In einem Ablauf mit vierzehn Schnittstellen trifft diese Beschreibung auf niemanden mehr zu.

Die naheliegende Antwort — dann eben kollektive Haftung — überzeugt indes nicht. Wo alle verantwortlich sind, ist es niemand, und die Erfahrung mit Gremienbeschlüssen spricht deutlich genug. Die Alternative besteht nicht darin, Verantwortung zu verteilen, sondern sie zu übersetzen: von der Frage, wer den Fehler gemacht hat, zu der Frage, wer die Bedingungen gestaltet, unter denen er möglich wurde.

Diese Übersetzung hat einen Preis, den ihre Befürworter selten nennen. Sie entlastet die Ausführenden und belastet die Leitung, und zwar auch dann, wenn die Leitung keine Regel verletzt hat. Wer eine Station so organisiert, dass eine übermüdete Person zwei ähnlich aussehende Ampullen unterscheiden muss, hat nichts Verbotenes getan. Er hat eine Bedingung geschaffen. Ob das haftbar machen soll, ist eine politische Frage und keine juristische.

Bemerkenswert ist, dass die Praxis der Antwort weitgehend vorausgeeilt ist. In mehreren Branchen wird längst nach Bedingungen gefragt, ohne dass sich am Haftungsrecht etwas geändert hätte. Untersuchungsberichte der Luftfahrt nennen seit Jahrzehnten keine Namen; die Gerichte tun es weiterhin.

Diese Doppelstruktur wird oft als Widerspruch beschrieben. Sie ist eher eine Arbeitsteilung. Die Untersuchung braucht Offenheit und darf deshalb nicht bestrafen; das Recht braucht Zurechnung und kann deshalb nicht anonym bleiben. Problematisch wird es erst dort, wo die eine Sphäre die Ergebnisse der anderen verwendet — wo also ein Untersuchungsbericht zur Anklageschrift wird.

Genau das geschieht regelmäßig. In mehreren Ländern haben Staatsanwaltschaften auf anonyme Meldesysteme zugegriffen, und in jedem dieser Fälle brach die Zahl der Meldungen anschließend ein. Der Schaden ist messbar und wird dennoch hingenommen, weil die kurzfristige Aufklärung eines Einzelfalls sichtbarer ist als die langfristige Verhinderung vieler.

Was folgt daraus? Zunächst nichts Bequemes. Wer Systeme sicherer machen will, muss hinnehmen, dass einzelne Fälle unaufgeklärt bleiben. Wer jeden Fall aufklären will, muss hinnehmen, dass weniger berichtet wird. Beides zugleich zu fordern ist verbreitet, aber unaufrichtig.

Meine Neigung ist die erste. Nicht weil Einzelfälle unwichtig wären, sondern weil die Zahl der verhinderten Fälle größer ausfällt als die der aufgeklärten. Das ist ein statistisches Argument, und statistische Argumente verlieren gegen Gesichter. Deshalb wird sich vermutlich wenig ändern.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-c1-07-l2-11",
              no: 11,
              ref: "t2",
              text: "Was ist am beschriebenen Fall aus Norddeutschland bemerkenswert?",
              options: [
                "Dass letztlich niemand benannt wurde.",
                "Dass das Verfahren blieb.",
                "Dass die Software ersetzt wurde.",
                "Dass die Klinik geschlossen wurde.",
              ],
              answer: 1,
              explain:
                "Sonuç üçlü olarak sayılıyor: \"ein Vergleich, ein Wechsel in der Leitung und keine Änderung des Verfahrens\". Üç kişi ya da kurum adlandırılmış, değişmeyen tek şey usul.",
            },
            {
              kind: "mcq",
              id: "de-c1-07-l2-12",
              no: 12,
              ref: "t2",
              text: "Worin sieht der Autor die eigentliche Ursache dieses Musters?",
              options: [
                "In einer durchgehend versagenden Aufsicht.",
                "In der Nachlässigkeit der Pflegekräfte.",
                "In einem veralteten Verantwortungsbegriff.",
                "In der schlechten Software.",
              ],
              answer: 2,
              explain:
                "Denetim açıklamasını \"näher liegt eine andere Deutung\" diyerek geride bırakıyor: sorumluluk kavramı \"aus einer Zeit, in der Handlungen überschaubar waren\".",
            },
            {
              kind: "mcq",
              id: "de-c1-07-l2-13",
              no: 13,
              ref: "t2",
              text: "Warum lehnt der Autor kollektive Haftung ab?",
              options: [
                "Weil das Haftungsrecht sie ausschließt.",
                "Weil sie niemanden mehr bindet.",
                "Weil sie die Leitung entlastet.",
                "Weil sie zu hohe Kosten verursacht.",
              ],
              answer: 1,
              explain:
                "Gerekçe tek cümlede: \"Wo alle verantwortlich sind, ist es niemand\" — hukuki imkânsızlıktan ya da maliyetten söz etmiyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-07-l2-14",
              no: 14,
              ref: "t2",
              text: "Welchen Preis der von ihm vorgeschlagenen Übersetzung nennt der Autor?",
              options: [
                "Die Ausführenden werden deutlich stärker belastet.",
                "Die Untersuchung dauert länger.",
                "Die Kosten steigen erheblich.",
                "Die Leitung haftet auch ohne Regelverstoß.",
              ],
              answer: 3,
              explain:
                "Bedeli kendisi yazıyor: yük yönetime geçiyor \"auch dann, wenn die Leitung keine Regel verletzt hat\". Uygulayanlar ise tam tersine yükten kurtuluyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-07-l2-15",
              no: 15,
              ref: "t2",
              text: "Wie beschreibt der Autor das Verhältnis von Untersuchung und Recht?",
              options: [
                "Als offenen Widerspruch.",
                "Als Arbeitsteilung.",
                "Als vollständige Übereinstimmung.",
                "Als überholtes Modell.",
              ],
              answer: 1,
              explain:
                "Yaygın nitelemeyi düzeltiyor: \"Diese Doppelstruktur wird oft als Widerspruch beschrieben. Sie ist eher eine Arbeitsteilung.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-07-l2-16",
              no: 16,
              ref: "t2",
              text: "Wann wird diese Doppelstruktur nach dem Autor problematisch?",
              options: [
                "Wenn eine Sphäre die andere benutzt.",
                "Wenn Gerichte Namen nennen.",
                "Wenn Berichte anonym bleiben.",
                "Wenn eine Untersuchung viel zu lange dauert.",
              ],
              answer: 0,
              explain:
                "Sorunun yeri belirtiliyor: \"wo die eine Sphäre die Ergebnisse der anderen verwendet — wo also ein Untersuchungsbericht zur Anklageschrift wird\". Mahkemelerin ad vermesi kendi başına sorun sayılmıyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-07-l2-17",
              no: 17,
              ref: "t2",
              text: "Was geschah, wenn Staatsanwaltschaften auf Meldesysteme zugriffen?",
              options: [
                "Es wurde deutlich weniger gemeldet.",
                "Die Aufklärungsquote stieg dauerhaft.",
                "Die Systeme wurden abgeschafft.",
                "Es änderte sich nichts.",
              ],
              answer: 0,
              explain:
                "Sonuç istisnasız veriliyor: \"in jedem dieser Fälle brach die Zahl der Meldungen anschließend ein\".",
            },
            {
              kind: "mcq",
              id: "de-c1-07-l2-18",
              no: 18,
              ref: "t2",
              text: "Wie bewertet der Autor diesen Schaden?",
              options: [
                "Als unvermeidlich.",
                "Als deutlich übertrieben dargestellt.",
                "Als messbar, aber hingenommen.",
                "Als bislang unbelegt.",
              ],
              answer: 2,
              explain:
                "İki yargıyı bir cümlede birleştiriyor: \"Der Schaden ist messbar und wird dennoch hingenommen\" — gerekçe olarak da görünürlük farkını gösteriyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-07-l2-19",
              no: 19,
              ref: "t2",
              text: "Vor welche Wahl stellt der Autor seine Leser?",
              options: [
                "Zwischen Recht und reiner Politik.",
                "Zwischen Leitung und Ausführung.",
                "Zwischen Anonymität und den Kosten.",
                "Zwischen System und Einzelfall.",
              ],
              answer: 3,
              explain:
                "İki koşulu simetrik kuruyor: sistemi güvenli kılmak isteyen tek tek vakaların aydınlatılmamasına, her vakayı aydınlatmak isteyen daha az bildirime katlanacak. \"Beides zugleich zu fordern ist verbreitet, aber unaufrichtig.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-07-l2-20",
              no: 20,
              ref: "t2",
              text: "Womit begründet der Autor seine eigene Neigung?",
              options: [
                "Mit der Bedeutung jedes Einzelfalls.",
                "Mit juristischen Vorgaben.",
                "Mit einer statistischen Überlegung.",
                "Mit der öffentlichen Stimmung.",
              ],
              answer: 2,
              explain:
                "Gerekçesini kendisi adlandırıyor ve zayıflığını da kabul ediyor: \"Das ist ein statistisches Argument, und statistische Argumente verlieren gegen Gesichter.\"",
            },
          ],
        },
        {
          id: "de-c1-07-l3",
          no: 3,
          format: "gapMcq",
          goal: "structure",
          prompt: "Lesen Sie den Text und ergänzen Sie die Lücken 21 bis 25. Welche Lösung passt: a, b, c oder d?",
          promptTr: "Metni oku ve 21–25. boşlukları tamamla. Hangi seçenek uyar: a, b, c ya da d?",
          texts: [
            {
              kind: "text",
              id: "t3",
              genre: "Zeitschriftentext",
              genreTr: "Dergi metni",
              title: "Das Protokoll und das Gedächtnis",
              body: `Wer nach einem Zwischenfall Protokolle liest, findet selten das, was er sucht. Der Grund liegt vermeintlich in der Aktenführung, tatsächlich aber weniger dort {{21}} in der Art, wie Erinnerung überhaupt entsteht.

Beteiligte geben den Ablauf nicht einfach wieder; sie rekonstruieren ihn, {{22}} sie ihn erzählen. Was am Ende vorliegt, ist keine Aufzeichnung, sondern eine geordnete Fassung — und diese Ordnung entsteht unter dem Eindruck des inzwischen bekannten Ausgangs.

Untersuchungen zeigen, dass Zeugen ein Ereignis unterschiedlich schildern, je nachdem, ob sie das Ergebnis kennen. Die Warnzeichen erscheinen im Rückblick {{23}} deutlicher, als sie es im Moment der Entscheidung waren.

Für die Praxis folgt daraus eine unbequeme Regel: Je später befragt wird, desto glatter fällt die Erzählung aus. Fachleute empfehlen deshalb, Aufzeichnungen unmittelbar anzulegen — {{24}} lückenhaft sie im ersten Moment auch sein mögen.

Das Verfahren hat mithin Grenzen. Es verhindert nicht, dass später verglichen und geglättet wird. Es verschafft aber eine Fassung, die entstanden ist, {{25}} der Ausgang feststand.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-c1-07-l3-21",
              no: 21,
              ref: "t3",
              text: "Lücke 21",
              options: ["wie", "denn", "als", "sondern"],
              answer: 2,
              explain:
                "`weniger …` karşılaştırma kurar ve `als` ister: \"weniger in der Aktenführung als in der Art\". `sondern` ancak önünde bir olumsuzlama olsaydı gelirdi.",
            },
            {
              kind: "mcq",
              id: "de-c1-07-l3-22",
              no: 22,
              ref: "t3",
              text: "Lücke 22",
              options: ["indem", "obwohl", "nachdem", "bevor"],
              answer: 0,
              explain:
                "Yeniden kurma ile anlatma aynı edimin iki yüzü; araç bildiren `indem` bunu verir. `nachdem` ya da `bevor` ikisini ardışık kılar ve metnin savını bozar.",
            },
            {
              kind: "mcq",
              id: "de-c1-07-l3-23",
              no: 23,
              ref: "t3",
              text: "Lücke 23",
              options: ["gleichermaßen", "keineswegs", "ebenso", "ungleich"],
              answer: 3,
              explain:
                "Karşılaştırmalı sıfatı güçlendiren ölçü belirteci gerekiyor: `ungleich deutlicher`. `ebenso` ve `gleichermaßen` eşitlik kurar, `keineswegs` ise cümleyi olumsuzlar.",
            },
            {
              kind: "mcq",
              id: "de-c1-07-l3-24",
              no: 24,
              ref: "t3",
              text: "Lücke 24",
              options: ["wie", "so", "was", "wenn"],
              answer: 1,
              explain:
                "Ödün cümlesinin kalıbı `so + sıfat … auch`: \"so lückenhaft sie … auch sein mögen\". `wie` burada karşılaştırma kurar, ödün değil.",
            },
            {
              kind: "mcq",
              id: "de-c1-07-l3-25",
              no: 25,
              ref: "t3",
              text: "Lücke 25",
              options: ["seit", "nachdem", "ehe", "während"],
              answer: 2,
              explain:
                "Kayıt sonucun belli olmasından ÖNCE oluşmuş olmalı, yoksa metnin bütün savı çöker: \"entstanden ist, ehe der Ausgang feststand\".",
            },
          ],
        },
      ],
    },

    /* ── HÖREN ─────────────────────────────────────────────────────────── */
    {
      skill: "listening",
      minutes: 40,
      instruction: "Dieser Teil hat zwei Aufgaben: Notizen ergänzen und eine Podiumsdiskussion auswerten.",
      instructionTr: "Bu bölümde iki görev var: notları tamamlamak ve bir panel tartışmasını çözümlemek.",
      tasks: [
        {
          id: "de-c1-07-h1",
          no: 1,
          format: "notes",
          goal: "detail",
          prompt:
            "Sie hören eine Informationsveranstaltung. Ergänzen Sie die Notizen 1 bis 10. Schreiben Sie höchstens drei Wörter in jede Lücke. Sie hören den Text einmal.",
          promptTr:
            "Bir bilgilendirme konuşması dinleyeceksin. 1–10. notları tamamla. Her boşluğa en çok üç sözcük yaz. Kaydı bir kez dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "a1",
              genre: "Informationsveranstaltung",
              genreTr: "Bilgilendirme konuşması",
              title: "Das Meldesystem — Informationsabend für neue Mitarbeitende",
              situation: "Bir hastanenin kalite yönetimi sorumlusu bildirim sistemini anlatıyor; konuşan tek kişi.",
              plays: 1,
              segments: [
                {
                  text: "Guten Abend. Mein Name ist Ruth Haverkamp, ich leite das Qualitätsmanagement dieses Hauses. Ich stelle Ihnen heute unser Meldesystem vor und beginne mit dem häufigsten Missverständnis: Viele denken, es gehe um Schuld. Es geht nicht darum.",
                },
                {
                  text: "Gemeldet werden sollen vor allem Beinaheereignisse, also Situationen, in denen am Ende nichts passiert ist. Genau die sind uns am wertvollsten, weil sie den Ablauf offenlegen, ohne dass jemand zu Schaden gekommen wäre.",
                },
                {
                  text: "Zum Aufwand: Eine Meldung dauert im Schnitt vier Minuten. Wir haben das eigens gemessen, weil fehlende Zeit der am häufigsten genannte Grund gegen das System war.",
                },
                {
                  text: "Die Meldung ist anonym. Anonym heißt bei uns ganz konkret: Der Text erreicht mich ohne Namen, ohne Station und ohne Datum. Erhalten bleibt allein die Woche, weil wir sonst überhaupt nichts zuordnen könnten.",
                },
                {
                  text: "Was wir ausdrücklich nicht tun: Wir geben nichts an die Personalabteilung weiter. Das ist bei uns schriftlich festgehalten, und zwar seit zweitausendneunzehn. Es galt auch in dem Fall, in dem eine Meldung einen Vorgesetzten betraf.",
                },
                {
                  text: "Zur Wirkung: Im ersten Jahr hatten wir siebenundzwanzig Meldungen, im vierten Jahr über vierhundert. Dieser Anstieg bedeutet nicht, dass mehr passiert. Er bedeutet, dass mehr berichtet wird.",
                },
                {
                  text: "Ausgewertet wird einmal im Monat, und zwar in einer Runde, in der auch die Ärztliche Direktion sitzt. Das ist der eigentliche Punkt: Ohne Leitung am Tisch bleibt jedes System eine Sammelstelle.",
                },
                {
                  text: "Ein Beispiel aus dem letzten Jahr: Zwei Ampullen sahen einander zu ähnlich. Nach elf Meldungen haben wir die Lagerung getrennt. Eine zwölfte Meldung ist nie gekommen.",
                },
                {
                  text: "Und was tun Sie, wenn Sie unsicher sind? Melden Sie im Zweifel. Eine überflüssige Meldung kostet vier Minuten. Eine fehlende kostet unter Umständen sehr viel mehr.",
                },
              ],
            },
            {
              kind: "text",
              id: "n1",
              genre: "Notizen",
              genreTr: "Notlar",
              body: `Häufigstes Missverständnis: Viele denken, es gehe um {{1}}.

Zu melden sind vor allem {{2}}.

Dauer einer Meldung: etwa {{3}}.

Anonym heißt: ohne Namen, ohne Station, ohne {{4}}.

Erhalten bleibt: die {{5}}.

Keine Weitergabe an die {{6}}.

Schriftlich festgehalten seit {{7}}.

Meldungen im vierten Jahr: über {{8}}.

Auswertung monatlich, mit der {{9}} am Tisch.

Beispiel Ampullen: Lagerung nach {{10}} Meldungen getrennt.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "de-c1-07-h1-1",
              no: 1,
              ref: "a1",
              text: "Notiz 1",
              accept: ["Schuld", "die Schuld", "Schuldfragen"],
              explain:
                "Konuşma bununla açılıyor: \"Viele denken, es gehe um Schuld. Es geht nicht darum.\"",
            },
            {
              kind: "gap",
              id: "de-c1-07-h1-2",
              no: 2,
              ref: "a1",
              text: "Notiz 2",
              accept: ["Beinaheereignisse", "Beinahe-Ereignisse", "Beinaheunfälle"],
              explain:
                "\"Gemeldet werden sollen vor allem Beinaheereignisse, also Situationen, in denen am Ende nichts passiert ist.\"",
            },
            {
              kind: "gap",
              id: "de-c1-07-h1-3",
              no: 3,
              ref: "a1",
              text: "Notiz 3",
              accept: ["vier Minuten", "4 Minuten", "vier"],
              explain:
                "\"Eine Meldung dauert im Schnitt vier Minuten\" — bu süre özellikle ölçülmüş, çünkü en sık itiraz zaman yokluğuydu.",
            },
            {
              kind: "gap",
              id: "de-c1-07-h1-4",
              no: 4,
              ref: "a1",
              text: "Notiz 4",
              accept: ["Datum", "Tagesdatum", "genaues Datum"],
              explain:
                "Anonimliğin tanımı üç öğeyle veriliyor: \"ohne Namen, ohne Station und ohne Datum\".",
            },
            {
              kind: "gap",
              id: "de-c1-07-h1-5",
              no: 5,
              ref: "a1",
              text: "Notiz 5",
              accept: ["Woche", "Kalenderwoche"],
              explain:
                "Tek istisna ve gerekçesi: \"Erhalten bleibt allein die Woche, weil wir sonst überhaupt nichts zuordnen könnten.\"",
            },
            {
              kind: "gap",
              id: "de-c1-07-h1-6",
              no: 6,
              ref: "a1",
              text: "Notiz 6",
              accept: ["Personalabteilung", "Personalstelle"],
              explain:
                "\"Wir geben nichts an die Personalabteilung weiter\" — üstelik bir amiri ilgilendiren bildirimde de böyle davranılmış.",
            },
            {
              kind: "gap",
              id: "de-c1-07-h1-7",
              no: 7,
              ref: "a1",
              text: "Notiz 7",
              accept: ["2019", "zweitausendneunzehn"],
              explain:
                "Yazılı güvence tarihlendiriliyor: \"schriftlich festgehalten, und zwar seit zweitausendneunzehn\".",
            },
            {
              kind: "gap",
              id: "de-c1-07-h1-8",
              no: 8,
              ref: "a1",
              text: "Notiz 8",
              accept: ["400", "vierhundert"],
              explain:
                "İki sayı karşılaştırılıyor: ilk yıl yirmi yedi, \"im vierten Jahr über vierhundert\".",
            },
            {
              kind: "gap",
              id: "de-c1-07-h1-9",
              no: 9,
              ref: "a1",
              text: "Notiz 9",
              accept: ["Ärztlichen Direktion", "Ärztliche Direktion", "Direktion"],
              explain:
                "Aylık değerlendirme \"in einer Runde, in der auch die Ärztliche Direktion sitzt\" yapılıyor — konuşmacıya göre asıl belirleyici olan bu.",
            },
            {
              kind: "gap",
              id: "de-c1-07-h1-10",
              no: 10,
              ref: "a1",
              text: "Notiz 10",
              accept: ["elf", "11"],
              explain:
                "\"Nach elf Meldungen haben wir die Lagerung getrennt\" — on ikinci bildirim hiç gelmemiş.",
            },
          ],
        },
        {
          id: "de-c1-07-h2",
          no: 2,
          format: "mcq",
          goal: "gist",
          prompt: "Sie hören eine Diskussion. Wählen Sie zu den Aufgaben 11 bis 25: a, b oder c. Sie hören den Text zweimal.",
          promptTr: "Bir tartışma dinleyeceksin. 11–25. maddeler için a, b ya da c'yi seç. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Podiumsdiskussion",
              genreTr: "Panel tartışması",
              situation: "Üç konuk, kurumlarda hata bildiriminin nereye kadar korunabileceğini tartışıyor.",
              plays: 2,
              segments: [
                {
                  speaker: "Moderatorin",
                  text: "Frau Ruppert, Sie forschen zu Verwaltungen. Lässt sich Fehlerkultur überhaupt einführen, oder entsteht sie?",
                },
                {
                  speaker: "Frau Ruppert",
                  text: "Einführen lässt sich ein Verfahren, nicht eine Kultur. Was wir messen können, ist schlichter: ob die erste Meldung, die eine Leitung betrifft, folgenlos bleibt. Wo das einmal schiefgeht, hilft kein Handbuch mehr.",
                },
                {
                  speaker: "Moderatorin",
                  text: "Herr Möllenkamp, Sie sind Staatsanwalt. Ist ein geschütztes Meldesystem für Sie ein Ärgernis?",
                },
                {
                  speaker: "Herr Möllenkamp",
                  text: "Nein, und das überrascht die meisten. Mein Problem ist nicht, dass ich an diese Daten nicht komme. Mein Problem ist, dass niemand mir sagt, wo die Grenze verläuft. Ich habe eine Ermittlungspflicht; wenn der Gesetzgeber will, dass ich hier zurücktrete, muss er das schreiben.",
                },
                {
                  speaker: "Frau Ionescu",
                  text: "In der Luftfahrt steht es geschrieben, und es funktioniert. Was ich aus der Praxis ergänzen möchte: Der Schutz ist nie absolut. Bei grober Fahrlässigkeit greift er nicht, und das weiß jeder von uns im Cockpit.",
                },
                {
                  speaker: "Moderatorin",
                  text: "Frau Ruppert, ist das nicht genau die Unschärfe, die Herr Möllenkamp beklagt?",
                },
                {
                  speaker: "Frau Ruppert",
                  text: "Doch. Nur ist die Unschärfe in der Luftfahrt klein und bei uns groß. Der Unterschied ist nicht das Prinzip, sondern die Zahl der geregelten Fälle.",
                },
                {
                  speaker: "Herr Möllenkamp",
                  text: "Dem stimme ich zu. Ich würde hinzufügen: Solange die Grenze unklar bleibt, entscheiden faktisch einzelne Staatsanwältinnen und Staatsanwälte. Das ist für alle Seiten die schlechteste Lösung.",
                },
                {
                  speaker: "Moderatorin",
                  text: "Frau Ionescu, ändert der Schutz das Verhalten der Beteiligten?",
                },
                {
                  speaker: "Frau Ionescu",
                  text: "Er ändert, was berichtet wird, nicht was getan wird. Das ist ein wichtiger Unterschied. Niemand fliegt unvorsichtiger, weil er anschließend anonym berichten darf.",
                },
                {
                  speaker: "Frau Ruppert",
                  text: "Und genau das ist der Punkt, an dem die öffentliche Debatte regelmäßig kippt. Sie unterstellt einen Zusammenhang, für den es keine Belege gibt.",
                },
                {
                  speaker: "Moderatorin",
                  text: "Herr Möllenkamp, wie erklären Sie sich, dass Untersuchungsberichte trotzdem immer wieder in Akten landen?",
                },
                {
                  speaker: "Herr Möllenkamp",
                  text: "Weil sie vorliegen. Das klingt banal, ist aber die ganze Erklärung. Ein Bericht, der auf dem Tisch liegt, wird gelesen. Wer das nicht will, muss den Zugriff verbieten, nicht an das Ermessen appellieren.",
                },
                {
                  speaker: "Frau Ionescu",
                  text: "Ein Verbot allein reicht allerdings nicht. In meinem Beruf hat sich erst etwas geändert, als die Berichte ihre Sprache geändert haben. Sie beschreiben Abläufe, nicht Personen. Ein solcher Bericht taugt schlicht nicht als Anklage.",
                },
                {
                  speaker: "Moderatorin",
                  text: "Ein letzter Punkt: Was raten Sie einer Einrichtung, die morgen anfangen will?",
                },
                {
                  speaker: "Frau Ruppert",
                  text: "Nicht mit der Software beginnen. Mit der Frage beginnen, was passiert, wenn die erste unangenehme Meldung kommt — und die Antwort vorher aufschreiben.",
                },
                {
                  speaker: "Frau Ionescu",
                  text: "Und klein anfangen. Ein Bereich, ein Jahr, ausgewertet. Wer alles gleichzeitig will, bekommt eine Datenbank und keine Veränderung.",
                },
                {
                  speaker: "Herr Möllenkamp",
                  text: "Von mir aus juristisch: Lassen Sie sich früh sagen, was Sie herausgeben müssen. Es ist unangenehm, es früh zu wissen, und es ist verheerend, es spät zu erfahren.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-c1-07-h2-11",
              no: 11,
              ref: "d1",
              text: "Wie beantwortet Frau Ruppert die Eingangsfrage?",
              options: [
                "Kultur lässt sich verordnen.",
                "Nur ein Verfahren ist einführbar.",
                "Beides entsteht von selbst.",
              ],
              answer: 1,
              explain:
                "Ayrımı ilk cümlesinde kuruyor: \"Einführen lässt sich ein Verfahren, nicht eine Kultur\".",
            },
            {
              kind: "mcq",
              id: "de-c1-07-h2-12",
              no: 12,
              ref: "d1",
              text: "Woran misst Frau Ruppert den Erfolg?",
              options: [
                "An der Zahl der Meldungen.",
                "Am Umfang des Handbuchs.",
                "An der ersten Meldung über eine Leitung.",
              ],
              answer: 2,
              explain:
                "Ölçütü tek bir olaya bağlıyor: \"ob die erste Meldung, die eine Leitung betrifft, folgenlos bleibt\".",
            },
            {
              kind: "mcq",
              id: "de-c1-07-h2-13",
              no: 13,
              ref: "d1",
              text: "Was ist Herrn Möllenkamps eigentliches Problem?",
              options: [
                "Der fehlende Zugriff auf Daten.",
                "Die Haltung der Luftfahrt.",
                "Die unklare Grenze.",
              ],
              answer: 2,
              explain:
                "Beklenen itirazı reddedip kendi sorununu adlandırıyor: \"Mein Problem ist, dass niemand mir sagt, wo die Grenze verläuft\".",
            },
            {
              kind: "mcq",
              id: "de-c1-07-h2-14",
              no: 14,
              ref: "d1",
              text: "Was fordert er vom Gesetzgeber?",
              options: [
                "Eine geschriebene Regel.",
                "Mehr Personal.",
                "Den Verzicht auf Meldesysteme.",
              ],
              answer: 0,
              explain:
                "\"wenn der Gesetzgeber will, dass ich hier zurücktrete, muss er das schreiben\" — takdire değil metne ihtiyaç duyuyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-07-h2-15",
              no: 15,
              ref: "d1",
              text: "Was ergänzt Frau Ionescu aus der Praxis?",
              options: [
                "Der Schutz gilt ausnahmslos.",
                "Der Schutz hat Grenzen.",
                "Der Schutz wird selten genutzt.",
              ],
              answer: 1,
              explain:
                "Kendi tarafının sınırını söylüyor: \"Der Schutz ist nie absolut. Bei grober Fahrlässigkeit greift er nicht.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-07-h2-16",
              no: 16,
              ref: "d1",
              text: "Wie reagiert Frau Ruppert auf die Nachfrage der Moderatorin?",
              options: [
                "Sie räumt die Unschärfe ein.",
                "Sie bestreitet sie.",
                "Sie hält sie für unwichtig.",
              ],
              answer: 0,
              explain:
                "Tek sözcükle kabul ediyor — \"Doch.\" — ve ardından farkı ölçeğe taşıyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-07-h2-17",
              no: 17,
              ref: "d1",
              text: "Worin liegt nach ihr der Unterschied zur Luftfahrt?",
              options: [
                "Im zugrunde liegenden Prinzip.",
                "In der Zahl geregelter Fälle.",
                "In der Ausbildung der Beteiligten.",
              ],
              answer: 1,
              explain:
                "\"Der Unterschied ist nicht das Prinzip, sondern die Zahl der geregelten Fälle.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-07-h2-18",
              no: 18,
              ref: "d1",
              text: "Was folgt für Herrn Möllenkamp aus einer unklaren Grenze?",
              options: [
                "Die Systeme werden überflüssig.",
                "Die Gerichte entscheiden einheitlich.",
                "Einzelne entscheiden faktisch selbst.",
              ],
              answer: 2,
              explain:
                "\"entscheiden faktisch einzelne Staatsanwältinnen und Staatsanwälte\" — bunu herkes için en kötü çözüm sayıyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-07-h2-19",
              no: 19,
              ref: "d1",
              text: "Was ändert der Schutz nach Frau Ionescu?",
              options: [
                "Das Verhalten im Dienst.",
                "Die Zahl der Zwischenfälle.",
                "Nur das Berichten.",
              ],
              answer: 2,
              explain:
                "Ayrımı vurguluyor: \"Er ändert, was berichtet wird, nicht was getan wird\" — kimse anonim bildirebildiği için dikkatsiz uçmuyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-07-h2-20",
              no: 20,
              ref: "d1",
              text: "Was kritisiert Frau Ruppert an der öffentlichen Debatte?",
              options: [
                "Sie unterstellt einen unbelegten Zusammenhang.",
                "Sie beachtet die Luftfahrt zu sehr.",
                "Sie überschätzt die Rolle der Gerichte.",
              ],
              answer: 0,
              explain:
                "\"Sie unterstellt einen Zusammenhang, für den es keine Belege gibt\" — yani korumanın davranışı gevşettiği varsayımı.",
            },
            {
              kind: "mcq",
              id: "de-c1-07-h2-21",
              no: 21,
              ref: "d1",
              text: "Wie erklärt Herr Möllenkamp, dass Berichte in Akten landen?",
              options: [
                "Mit gezieltem Druck von außen.",
                "Damit, dass sie schlicht vorliegen.",
                "Mit dem Willen der Einrichtungen.",
              ],
              answer: 1,
              explain:
                "Açıklamayı kendisi sıradan buluyor: \"Weil sie vorliegen. Das klingt banal, ist aber die ganze Erklärung.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-07-h2-22",
              no: 22,
              ref: "d1",
              text: "Was folgt daraus nach ihm?",
              options: [
                "An das Ermessen zu appellieren.",
                "Den Zugriff zu verbieten.",
                "Die Berichte zu kürzen.",
              ],
              answer: 1,
              explain:
                "İki yolu karşı karşıya koyuyor: \"muss den Zugriff verbieten, nicht an das Ermessen appellieren\".",
            },
            {
              kind: "mcq",
              id: "de-c1-07-h2-23",
              no: 23,
              ref: "d1",
              text: "Was ergänzt Frau Ionescu zum Verbot?",
              options: [
                "Es genügt für sich genommen.",
                "Es ist überflüssig geworden.",
                "Die Sprache der Berichte zählt ebenso.",
              ],
              answer: 2,
              explain:
                "Yasağı yeterli görmüyor: değişim raporlar \"Abläufe, nicht Personen\" anlatmaya başlayınca gelmiş.",
            },
            {
              kind: "mcq",
              id: "de-c1-07-h2-24",
              no: 24,
              ref: "d1",
              text: "Was rät Frau Ruppert einer Einrichtung, die beginnt?",
              options: [
                "Die Reaktion vorher festzulegen.",
                "Zuerst die Software auszuwählen.",
                "Erst nach einem Vorfall zu starten.",
              ],
              answer: 0,
              explain:
                "Yazılımla başlamayı açıkça eliyor ve şunu istiyor: ilk rahatsız edici bildirimde ne olacağının cevabını \"vorher aufschreiben\".",
            },
            {
              kind: "mcq",
              id: "de-c1-07-h2-25",
              no: 25,
              ref: "d1",
              text: "Worin sind sich die drei Gäste im Schlussteil einig?",
              options: [
                "Dass der Anfang begrenzt und vorbereitet sein muss.",
                "Dass zuerst das Gesetz geändert werden muss.",
                "Dass ohne Software nichts geht.",
              ],
              answer: 0,
              explain:
                "Üç öğüt aynı yöne bakıyor: cevabı önceden yazmak, \"Ein Bereich, ein Jahr, ausgewertet\" ve hukuki yükümlülüğü erken öğrenmek.",
            },
          ],
        },
      ],
    },

    /* ── SCHREIBEN ─────────────────────────────────────────────────────── */
    {
      skill: "writing",
      minutes: 80,
      instruction: "Dieser Teil hat zwei Aufgaben: eine Stellungnahme und einen förmlichen Brief mit Lücken.",
      instructionTr: "Bu bölümde iki görev var: bir görüş yazısı ve boşluklu resmî bir mektup.",
      tasks: [
        {
          id: "de-c1-07-s1",
          no: 1,
          format: "writing",
          goal: "production",
          prompt:
            "In einer Fachzeitschrift stand: \"Wer Fehler folgenlos stellt, lädt zur Nachlässigkeit ein.\" Schreiben Sie eine Stellungnahme (circa 200 Wörter). Ordnen Sie die These ein, prüfen Sie sie an einem Beispiel, nennen Sie einen Einwand gegen Ihre eigene Position und ziehen Sie eine Schlussfolgerung.",
          promptTr:
            "Bir meslek dergisinde şöyle yazdı: \"Hatayı sonuçsuz bırakan, dikkatsizliğe davetiye çıkarır.\" Bir görüş yazısı yaz (yaklaşık 200 kelime). Savı yerine oturt, bir örnekle sına, kendi konumuna yönelik bir itirazı da söyle ve bir sonuca bağla.",
          items: [],
          rubric: {
            minWords: 200,
            points: [
              { de: "Die These präzise einordnen.", tr: "Savı tam olarak yerine oturt." },
              { de: "An einem Beispiel prüfen.", tr: "Bir örnekle sına." },
              { de: "Einen Einwand gegen die eigene Position nennen.", tr: "Kendi konumuna itiraz getir." },
              { de: "Eine begründete Schlussfolgerung ziehen.", tr: "Gerekçeli bir sonuca bağla." },
            ],
            sample: `Der Satz enthält eine Verwechslung, die sich leicht auflösen lässt. Wer Fehlerkultur fordert, verlangt nicht Folgenlosigkeit, sondern eine andere Zuordnung von Folgen: Absichtliche Regelverstöße bleiben sanktioniert, unklare Entscheidungen unter Druck sollen berichtet werden dürfen. Die Trennlinie verläuft zwischen Absicht und Umstand, nicht zwischen schwerem und leichtem Schaden.

Prüfen lässt sich das an der Luftfahrt. Seit Meldungen dort anonym erfasst und arbeitsrechtlich nicht verwertet werden, ist ihre Zahl um ein Vielfaches gestiegen, während die Zahl der Unfälle zurückgegangen ist. Wäre die These richtig, hätte das Gegenteil eintreten müssen: mehr Meldungen, mehr Unfälle. Eingetreten ist das nicht. Niemand fliegt unvorsichtiger, weil er anschließend anonym berichten darf, und keine der vorliegenden Auswertungen legt einen solchen Zusammenhang nahe.

Ein Einwand gegen meine eigene Position wiegt allerdings schwerer, als mir lieb ist: Ein geschütztes System entzieht der Öffentlichkeit tatsächlich Informationen. Angehörige eines Geschädigten erfahren unter Umständen nie, was geschehen ist. Wer für den Schutz argumentiert, muss diesen Preis benennen, statt ihn wegzuerklären.

Meine Schlussfolgerung ist deshalb keine bequeme. Der Schutz von Meldungen ist zu rechtfertigen, weil die Zahl der verhinderten Fälle die der aufgeklärten übersteigt. Er ist aber nur so lange zu rechtfertigen, wie die Grenze zur Absicht geschrieben steht und nicht dem Ermessen einzelner Stellen überlassen bleibt.`,
            criteria: [
              "Sav gerçekten yerine oturtuldu mu — hangi ayrım kurulmadan sav ayakta duruyor?",
              "Örnek savı sınıyor mu, yoksa yalnız yazarın konumunu resimliyor mu?",
              "İtiraz kendi konumuna mı yönelik, yoksa karşı tarafın zaten bilinen itirazı mı?",
              "Sonuç itirazdan sonra hâlâ ayakta mı, yoksa itiraz süs olarak mı kalmış?",
              "Yaklaşık 200 kelime var mı; metin bölümlenmiş ve bağlaçlarla yürütülmüş mü?",
              "C1 yapıları (adlaştırma, edilgen, ölçü belirteçleri, `lässt sich`) kullanılabiliyor mu?",
            ],
          },
        },
        {
          id: "de-c1-07-s2",
          no: 2,
          format: "gap",
          goal: "interaction",
          prompt:
            "Sie schreiben an die Redaktion einer Fachzeitschrift, weil ein Beitrag Ihre Einrichtung falsch dargestellt hat. Ergänzen Sie die Lücken 1 bis 10 im Brief. Schreiben Sie in jede Lücke ein Wort.",
          promptTr:
            "Bir meslek dergisinin yayın kuruluna yazıyorsun; bir yazı kurumunu yanlış aktarmış. Mektuptaki 1–10. boşlukları tamamla. Her boşluğa bir sözcük yaz.",
          texts: [
            {
              kind: "text",
              id: "b1",
              genre: "Leserbrief",
              genreTr: "Okur mektubu",
              title: "An die Redaktion",
              body: `Sehr geehrte Damen und Herren,

{{1}} auf Ihren Beitrag "Meldesysteme ohne Wirkung" in der Ausgabe vom 12. März möchte ich eine Darstellung richtigstellen.

Der Text erweckt den Eindruck, unser Haus habe eingegangene Meldungen an die Personalabteilung weitergeleitet. Das trifft {{2}} zu. Eine entsprechende Weitergabe ist bei uns seit 2019 schriftlich ausgeschlossen, und zwar {{3}} Ausnahme.

Richtig ist {{4}}, dass eine Meldung im vergangenen Jahr eine Leitungsperson betraf. Auch in diesem Fall wurde der Vorgang ausschließlich in der monatlichen Auswertungsrunde behandelt.

Ich bedaure, dass Ihre Redaktion vor der Veröffentlichung keine Gelegenheit zur Stellungnahme eingeräumt hat, {{5}} eine solche Rückfrage üblich ist.

{{6}} bitte ich Sie, in der nächsten Ausgabe eine Berichtigung abzudrucken. Ich stelle Ihnen die Verfahrensanweisung gern zur {{7}}.

Für eine Antwort {{8}} zum 5. April wäre ich Ihnen dankbar.

Mit {{9}} Grüßen
Ruth {{10}}`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "de-c1-07-s2-1",
              no: 1,
              text: "Lücke 1 (Bezugnahme auf einen Text)",
              accept: ["Bezugnehmend", "Bezug"],
              explain:
                "Resmî yazının açılışında bir metne gönderme kalıbı gerekiyor: `Bezugnehmend auf Ihren Beitrag …` ya da `Bezug nehmend`. Cümle `auf` ile devam ettiği için bu iki biçim oturur.",
            },
            {
              kind: "gap",
              id: "de-c1-07-s2-2",
              no: 2,
              text: "Lücke 2 (Verneinung einer Behauptung)",
              accept: ["nicht", "keineswegs", "mitnichten"],
              explain:
                "İddia reddediliyor: \"Das trifft nicht zu\". `keineswegs` ve `mitnichten` aynı işlevi daha vurgulu yapar ve C1 kaydına uygundur.",
            },
            {
              kind: "gap",
              id: "de-c1-07-s2-3",
              no: 3,
              text: "Lücke 3 (Präposition vor „Ausnahme“)",
              accept: ["ohne"],
              explain:
                "\"und zwar ohne Ausnahme\" — istisnasızlığı bildiren tek edat bu. `mit` anlamı tersine çevirirdi.",
            },
            {
              kind: "gap",
              id: "de-c1-07-s2-4",
              no: 4,
              text: "Lücke 4 (Einräumung)",
              accept: ["allerdings", "hingegen", "indes"],
              explain:
                "Yazar bir noktayı kabul edip sınırlıyor: \"Richtig ist allerdings, dass …\". Ödün bildiren bu belirteçler cümlenin ikinci konumunda durur.",
            },
            {
              kind: "gap",
              id: "de-c1-07-s2-5",
              no: 5,
              text: "Lücke 5 (einschränkender Anschluss)",
              accept: ["obwohl", "obgleich", "wiewohl"],
              explain:
                "Beklenen davranışla olan arasındaki çelişki: \"keine Gelegenheit … eingeräumt hat, obwohl eine solche Rückfrage üblich ist\".",
            },
            {
              kind: "gap",
              id: "de-c1-07-s2-6",
              no: 6,
              text: "Lücke 6 (Folgerung am Satzanfang)",
              accept: ["Daher", "Deshalb", "Folglich"],
              explain:
                "Önceki gerekçeden çıkan talep: \"Daher bitte ich Sie …\". Cümle başında sonuç bildiren bu belirteçlerden sonra fiil gelir.",
            },
            {
              kind: "gap",
              id: "de-c1-07-s2-7",
              no: 7,
              text: "Lücke 7 (feste Wendung: etwas zur … stellen)",
              accept: ["Verfügung"],
              explain:
                "Kalıp değişmez: `etwas zur Verfügung stellen`. Başka bir ad bu kalıba girmiyor.",
            },
            {
              kind: "gap",
              id: "de-c1-07-s2-8",
              no: 8,
              text: "Lücke 8 (Frist)",
              accept: ["bis"],
              explain:
                "Son tarih için `bis zum 5. April`. `ab` süreyi başlatır, `seit` geçmişe bakar; ikisi de burada anlamı bozar.",
            },
            {
              kind: "gap",
              id: "de-c1-07-s2-9",
              no: 9,
              text: "Lücke 9 (Grußformel)",
              accept: ["freundlichen", "besten", "vorzüglichen"],
              explain:
                "Kuruma yazılan resmî yazının vedası `Mit freundlichen Grüßen`. `besten` biraz daha serbest ama kabul edilebilir; gündelik biçimler bu kayda uymaz.",
            },
            {
              kind: "gap",
              id: "de-c1-07-s2-10",
              no: 10,
              text: "Lücke 10 (Nachname der Absenderin)",
              accept: ["Haverkamp"],
              explain:
                "Mektubu yazan kişi dinleme bölümündeki konuşmacıyla aynı: Ruth Haverkamp, kalite yönetimi sorumlusu.",
            },
          ],
        },
      ],
    },

    /* ── SPRECHEN ──────────────────────────────────────────────────────── */
    {
      skill: "speaking",
      minutes: 15,
      instruction: "Dieser Teil hat zwei Aufgaben: einen Vortrag halten und gemeinsam eine Entscheidung treffen.",
      instructionTr: "Bu bölümde iki görev var: bir sunum yapmak ve birlikte karar vermek.",
      tasks: [
        {
          id: "de-c1-07-p1",
          no: 1,
          format: "speaking",
          goal: "production",
          prompt:
            "Halten Sie einen Vortrag von etwa vier Minuten zum Thema \"Verantwortung in komplexen Organisationen: Person oder Bedingung?\". Gliedern Sie: Einstieg — Begriffsklärung — Argumente für die eine Seite — Argumente für die andere — eigene Position mit Einwand — Abschluss.",
          promptTr:
            "\"Karmaşık kurumlarda sorumluluk: kişi mi koşul mu?\" konusunda yaklaşık dört dakikalık bir sunum yap. Şu sırayı izle: giriş — kavram açıklaması — bir tarafın gerekçeleri — öteki tarafın gerekçeleri — kendi konumun ve ona itiraz — kapanış.",
          minutes: 8,
          prepSeconds: 180,
          speakSeconds: 240,
          items: [],
          rubric: {
            minutes: 6,
            points: [
              { de: "Einstieg und Gliederung", tr: "Giriş ve bölümleme" },
              { de: "Begriffe klären", tr: "Kavramları açmak" },
              { de: "Argumente für beide Seiten", tr: "İki tarafın da gerekçeleri" },
              { de: "eigene Position mit Einwand", tr: "Kendi konumun ve ona itiraz" },
              { de: "Beispiele", tr: "Örnekler" },
              { de: "Abschluss", tr: "Kapanış" },
            ],
            sample:
              "Ich möchte darüber sprechen, wem in einer großen Organisation ein Fehler zugerechnet werden kann. Ich kläre zuerst die Begriffe, stelle dann beide Seiten dar und komme am Ende zu meiner Position, gegen die ich selbst einen Einwand vorbringen werde. Mit Person meine ich denjenigen, der handelt; mit Bedingung diejenigen Umstände, die sein Handeln nahelegen. Für die Zurechnung an Personen spricht, dass sie überhaupt erst Zurechnung ermöglicht. Wo niemand benannt wird, ändert sich erfahrungsgemäß wenig; die Erfahrung mit Gremienbeschlüssen ist eindeutig. Für die Bedingungen spricht die Struktur moderner Abläufe. Wer zwei ähnlich aussehende Ampullen nebeneinander lagert, verletzt keine Regel und schafft dennoch die Voraussetzung des Fehlers. Meine Position ist, dass die Zurechnung an Bedingungen mehr verhindert. Der Einwand dagegen wiegt allerdings schwer: Sie entlastet diejenigen, die tatsächlich gehandelt haben, und für Betroffene ist genau das schwer erträglich. Ich halte die Position trotzdem, weil sich Bedingungen ändern lassen und Personen ersetzt, nicht verbessert werden. Zusammenfassend: Wer Fehler zählen will, sucht Personen. Wer sie verringern will, sucht Bedingungen — und muss dafür in Kauf nehmen, dass die zweite Antwort nie so befriedigend klingt wie die erste.",
            criteria: [
              "Altı bölümün hepsi var mı ve sunum baştan bölümlendi mi?",
              "Kavramlar gerçekten açıldı mı, yoksa örtük mü bırakıldı?",
              "Her iki taraf için de örnekle desteklenmiş gerekçe var mı?",
              "Kendi konumuna yönelik itiraz gerçek bir itiraz mı ve yanıtlandı mı?",
              "Dört dakika boyunca yapı korunabildi mi?",
              "C1 yapıları (adlaştırma, edilgen, `lässt sich`, ölçü belirteçleri) kullanılabildi mi?",
            ],
          },
        },
        {
          id: "de-c1-07-p2",
          no: 2,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Treffen Sie gemeinsam eine Entscheidung. Eine Einrichtung führt ein Meldesystem ein und muss vier Fragen klären: Wer wertet aus? Bleiben Meldungen anonym? Was passiert bei grober Fahrlässigkeit? Wird das Ergebnis veröffentlicht? Einigen Sie sich.",
          promptTr:
            "Birlikte bir karar verin. Bir kurum bildirim sistemi kuruyor ve dört soruyu çözmesi gerekiyor: Kim değerlendirecek? Bildirimler anonim mi kalacak? Ağır ihmalde ne olacak? Sonuç yayımlanacak mı? Anlaşın.",
          minutes: 7,
          prepSeconds: 120,
          exchange: [
            {
              who: "partner",
              de: "Ich beginne mit der Auswertung: Ich wäre dafür, dass eine unabhängige Stelle das übernimmt, nicht die Leitung. Sonst berichtet niemand über die Leitung. Was meinen Sie?",
              tr: "Değerlendirmeyle başlayayım: Bunu yönetim değil bağımsız bir birim üstlensin derim, yoksa kimse yönetim hakkında bildirim yapmaz. Sen ne diyorsun?",
            },
            {
              who: "you",
              hint: "Bir konum al ve 'yönetim masada olmazsa' itirazını da ele al.",
              expect: "bir konum almak ve karşı tarafın gerekçesini doğrudan ele almak",
              seconds: 60,
            },
            {
              who: "partner",
              de: "Zur Anonymität: Vollständige Anonymität macht Rückfragen unmöglich. Ohne Rückfrage bleibt die Hälfte der Meldungen unverwertbar. Wie lösen Sie das?",
              tr: "Anonimlik meselesi: Tam anonimlik geri soru sormayı imkânsız kılıyor. Geri soru olmadan bildirimlerin yarısı işe yaramaz kalıyor. Bunu nasıl çözersin?",
            },
            {
              who: "you",
              hint: "Somut bir ara çözüm öner ve maliyetini de söyle.",
              expect: "somut bir ara çözüm önermek ve bedelini açıkça adlandırmak",
              seconds: 60,
            },
            {
              who: "partner",
              de: "Grobe Fahrlässigkeit: Wenn wir dort Konsequenzen zulassen, wird die Grenze im Zweifel weit ausgelegt. Wenn wir sie ausschließen, verlieren wir jede Glaubwürdigkeit. Wo ziehen Sie die Linie?",
              tr: "Ağır ihmal: Orada yaptırıma izin verirsek sınır tereddütte geniş yorumlanır. Tümden dışlarsak inandırıcılığımız kalmaz. Sen sınırı nereye çekersin?",
            },
            {
              who: "you",
              hint: "Sınırı somut olarak çiz ve kimin karar vereceğini söyle.",
              expect: "sınırı somut biçimde çizmek ve karar merciini adlandırmak",
              seconds: 60,
            },
            {
              who: "partner",
              de: "Gut. Fassen Sie bitte zusammen, worauf wir uns geeinigt haben, einschließlich der Punkte, die offen bleiben.",
              tr: "Peki. Neyde anlaştığımızı özetler misin — açık kalan noktalar da dâhil?",
            },
            {
              who: "you",
              hint: "Anlaşmayı ve açık kalanları eksiksiz özetle.",
              expect: "anlaşmayı ve açık kalan noktaları eksiksiz özetlemek",
              seconds: 45,
            },
          ],
          items: [],
          rubric: {
            minutes: 7,
            points: [
              { de: "eine Position begründen", tr: "Bir konumu gerekçelendirmek" },
              { de: "auf Einwände eingehen", tr: "İtirazlara girmek" },
              { de: "einen Kompromiss formulieren", tr: "Bir uzlaşı biçimlendirmek" },
              { de: "Ergebnis und offene Punkte zusammenfassen", tr: "Sonucu ve açık noktaları özetlemek" },
            ],
            sample:
              "Ich stimme Ihnen zu, dass die Leitung nicht allein auswerten darf — allerdings darf sie auch nicht fehlen, sonst bleibt das System eine Sammelstelle ohne Folgen. Ich schlage deshalb vor: Eine unabhängige Stelle sichtet, die Leitung sitzt in der Auswertungsrunde, hat aber keinen Zugriff auf die Rohmeldungen. Zur Anonymität: Ich würde eine Rückfragemöglichkeit über ein Pseudonym einrichten. Der Preis ist ehrlich zu benennen — ein Pseudonym ist rekonstruierbar, wenn jemand es will, und deshalb muss der Zugriff darauf schriftlich geregelt sein. Bei grober Fahrlässigkeit ziehe ich die Linie an der Absicht: Wer wissentlich gegen eine Regel verstößt, verliert den Schutz; wer unter unklaren Bedingungen falsch entscheidet, behält ihn. Entscheiden soll das nicht die Leitung, sondern dieselbe unabhängige Stelle, im Zweifel mit externer Beteiligung. Zusammengefasst: unabhängige Sichtung, Leitung in der Auswertung ohne Rohdatenzugriff, Pseudonym statt voller Anonymität, Schutzverlust nur bei Absicht. Offen bleibt die Veröffentlichung — wir haben sie nicht geklärt, und ich würde sie nicht nebenbei entscheiden.",
            criteria: [
              "Konum gerekçelendirildi mi ve karşı tarafın gerekçesi doğrudan ele alındı mı?",
              "Ara çözüm gerçekten uygulanabilir mi ve bedeli açıkça söylendi mi?",
              "Sınır somut çizildi mi (kim, hangi ölçüte göre karar veriyor)?",
              "Özet açık kalan noktayı da içeriyor mu, yoksa anlaşma varmış gibi mi kapatıyor?",
              "Tartışma dili C1 düzeyinde mi (einräumen, abwägen, in Kauf nehmen)?",
            ],
          },
        },
      ],
    },
  ],
};
