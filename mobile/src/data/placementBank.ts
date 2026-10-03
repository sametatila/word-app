/* ÜRETİLDİ — elle düzenleme. Kaynak data/placement/*.json, `npm run placement:sync`.
   Web (src/lib/placement-bank.ts) ve mobil (mobile/src/data/placementBank.ts) birebir aynı. */
import type { BankItem, VocabCard } from "../lib/placementEngine";

export type PlacementItem = BankItem & { text?: string; question?: string; audio?: string };
export type PlacementBank = { cards: VocabCard[]; items: PlacementItem[] };

export const PLACEMENT_BANK: Record<"de" | "en", PlacementBank> = {
  "de": {
    "cards": [
      {
        "id": "de-w-a1-1",
        "word": "die Miete",
        "level": "A1"
      },
      {
        "id": "de-w-a1-2",
        "word": "der Käse",
        "level": "A1"
      },
      {
        "id": "de-w-a1-3",
        "word": "die Tasse",
        "level": "A1"
      },
      {
        "id": "de-w-a1-4",
        "word": "schenken",
        "level": "A1"
      },
      {
        "id": "de-w-a1-5",
        "word": "bestellen",
        "level": "A1"
      },
      {
        "id": "de-w-a1-6",
        "word": "das Fieber",
        "level": "A1"
      },
      {
        "id": "de-w-a1-7",
        "word": "üben",
        "level": "A1"
      },
      {
        "id": "de-w-a1-8",
        "word": "wiederholen",
        "level": "A1"
      },
      {
        "id": "de-w-a2-1",
        "word": "die Hose",
        "level": "A2"
      },
      {
        "id": "de-w-a2-2",
        "word": "der Vogel",
        "level": "A2"
      },
      {
        "id": "de-w-a2-3",
        "word": "der Löffel",
        "level": "A2"
      },
      {
        "id": "de-w-a2-4",
        "word": "der Schirm",
        "level": "A2"
      },
      {
        "id": "de-w-a2-5",
        "word": "merken",
        "level": "A2"
      },
      {
        "id": "de-w-a2-6",
        "word": "husten",
        "level": "A2"
      },
      {
        "id": "de-w-a2-7",
        "word": "kündigen",
        "level": "A2"
      },
      {
        "id": "de-w-a2-8",
        "word": "die Krankheit",
        "level": "A2"
      },
      {
        "id": "de-w-b1-1",
        "word": "der Eindruck",
        "level": "B1"
      },
      {
        "id": "de-w-b1-2",
        "word": "fliehen",
        "level": "B1"
      },
      {
        "id": "de-w-b1-3",
        "word": "vermissen",
        "level": "B1"
      },
      {
        "id": "de-w-b1-4",
        "word": "die Geburt",
        "level": "B1"
      },
      {
        "id": "de-w-b1-5",
        "word": "die Decke",
        "level": "B1"
      },
      {
        "id": "de-w-b1-6",
        "word": "der Einwohner",
        "level": "B1"
      },
      {
        "id": "de-w-b1-7",
        "word": "schütteln",
        "level": "B1"
      },
      {
        "id": "de-w-b1-8",
        "word": "die Empfehlung",
        "level": "B1"
      },
      {
        "id": "de-w-b2-1",
        "word": "die Beschwerde",
        "level": "B2"
      },
      {
        "id": "de-w-b2-2",
        "word": "die Erleichterung",
        "level": "B2"
      },
      {
        "id": "de-w-b2-3",
        "word": "der Ehrgeiz",
        "level": "B2"
      },
      {
        "id": "de-w-b2-4",
        "word": "die Verlegenheit",
        "level": "B2"
      },
      {
        "id": "de-w-b2-5",
        "word": "die Lücke",
        "level": "B2"
      },
      {
        "id": "de-w-b2-6",
        "word": "die Zutat",
        "level": "B2"
      },
      {
        "id": "de-w-b2-7",
        "word": "vernachlässigen",
        "level": "B2"
      },
      {
        "id": "de-w-b2-8",
        "word": "die Belegschaft",
        "level": "B2"
      },
      {
        "id": "de-w-c1-1",
        "word": "das Gutachten",
        "level": "C1"
      },
      {
        "id": "de-w-c1-2",
        "word": "der Sündenbock",
        "level": "C1"
      },
      {
        "id": "de-w-c1-3",
        "word": "veranlassen",
        "level": "C1"
      },
      {
        "id": "de-w-c1-4",
        "word": "nachvollziehen",
        "level": "C1"
      },
      {
        "id": "de-w-c1-5",
        "word": "feilschen",
        "level": "C1"
      },
      {
        "id": "de-w-c1-6",
        "word": "der Bürge",
        "level": "C1"
      },
      {
        "id": "de-w-c1-7",
        "word": "bezwecken",
        "level": "C1"
      },
      {
        "id": "de-w-c1-8",
        "word": "abwägen",
        "level": "C1"
      },
      {
        "id": "de-p-1",
        "word": "verkrinsen",
        "level": null
      },
      {
        "id": "de-p-2",
        "word": "das Sprötel",
        "level": null
      },
      {
        "id": "de-p-3",
        "word": "der Wuchter",
        "level": null
      },
      {
        "id": "de-p-4",
        "word": "die Pfaltung",
        "level": null
      },
      {
        "id": "de-p-5",
        "word": "beglampen",
        "level": null
      },
      {
        "id": "de-p-6",
        "word": "der Trunzel",
        "level": null
      },
      {
        "id": "de-p-7",
        "word": "das Gerbsel",
        "level": null
      },
      {
        "id": "de-p-8",
        "word": "schwiefen",
        "level": null
      },
      {
        "id": "de-p-9",
        "word": "die Strüffe",
        "level": null
      },
      {
        "id": "de-p-10",
        "word": "umglarten",
        "level": null
      },
      {
        "id": "de-p-11",
        "word": "befrimmen",
        "level": null
      },
      {
        "id": "de-p-12",
        "word": "zerfiepen",
        "level": null
      },
      {
        "id": "de-p-13",
        "word": "die Wehlung",
        "level": null
      },
      {
        "id": "de-p-14",
        "word": "verlanken",
        "level": null
      },
      {
        "id": "de-p-15",
        "word": "die Klabbe",
        "level": null
      },
      {
        "id": "de-p-16",
        "word": "das Mulbe",
        "level": null
      }
    ],
    "items": [
      {
        "id": "de-a1-c1",
        "level": "A1",
        "offset": -0.3,
        "kind": "cloze",
        "text": "Ich ___ aus Spanien.",
        "options": [
          "kommt",
          "komme",
          "kommst",
          "kommen"
        ],
        "answer": 1
      },
      {
        "id": "de-a1-c2",
        "level": "A1",
        "offset": -0.2,
        "kind": "cloze",
        "text": "Wie ___ du?",
        "options": [
          "heiße",
          "heißt",
          "heiß",
          "heißen"
        ],
        "answer": 1
      },
      {
        "id": "de-a1-c3",
        "level": "A1",
        "offset": 0,
        "kind": "cloze",
        "text": "Das ist ___ Buch.",
        "options": [
          "einer",
          "eine",
          "ein",
          "einen"
        ],
        "answer": 2
      },
      {
        "id": "de-a1-c4",
        "level": "A1",
        "offset": 0,
        "kind": "cloze",
        "text": "Am Wochenende ___ wir ins Kino.",
        "options": [
          "geht",
          "gehst",
          "gehe",
          "gehen"
        ],
        "answer": 3
      },
      {
        "id": "de-a1-c5",
        "level": "A1",
        "offset": 0.2,
        "kind": "cloze",
        "text": "Hast du ___ Bruder?",
        "options": [
          "eine",
          "einen",
          "ein",
          "einem"
        ],
        "answer": 1
      },
      {
        "id": "de-a1-c6",
        "level": "A1",
        "offset": 0.3,
        "kind": "cloze",
        "text": "Morgen ___ ich nicht arbeiten.",
        "options": [
          "musst",
          "müsst",
          "muss",
          "müssen"
        ],
        "answer": 2
      },
      {
        "id": "de-a1-r1",
        "level": "A1",
        "offset": -0.3,
        "kind": "reading",
        "text": "Hallo, ich bin Lena. Ich bin 25 Jahre alt und wohne in Hamburg. Ich arbeite in einem Café.",
        "question": "Wo arbeitet Lena?",
        "options": [
          "In einem Büro",
          "In einer Schule",
          "Im Supermarkt",
          "In einem Café"
        ],
        "answer": 3
      },
      {
        "id": "de-a1-r2",
        "level": "A1",
        "offset": -0.1,
        "kind": "reading",
        "text": "Der Supermarkt ist von Montag bis Samstag von 8 bis 20 Uhr geöffnet. Am Sonntag ist er geschlossen.",
        "question": "Wann ist der Supermarkt geschlossen?",
        "options": [
          "Jeden Tag um 18 Uhr",
          "Am Samstag",
          "Am Sonntag",
          "Am Montag"
        ],
        "answer": 2
      },
      {
        "id": "de-a1-r3",
        "level": "A1",
        "offset": 0.1,
        "kind": "reading",
        "text": "Liebe Anna, ich habe morgen Geburtstag. Kommst du um 19 Uhr zu mir? Bring bitte keinen Kuchen mit, ich backe selbst. Tom",
        "question": "Was soll Anna nicht mitbringen?",
        "options": [
          "Kuchen",
          "Getränke",
          "Musik",
          "Blumen"
        ],
        "answer": 0
      },
      {
        "id": "de-a1-r4",
        "level": "A1",
        "offset": 0.2,
        "kind": "reading",
        "text": "Herr Kaya fährt jeden Tag mit dem Bus zur Arbeit. Heute ist der Bus kaputt. Er nimmt ein Taxi.",
        "question": "Wie fährt Herr Kaya heute zur Arbeit?",
        "options": [
          "Zu Fuß",
          "Mit dem Taxi",
          "Mit dem Fahrrad",
          "Mit dem Bus"
        ],
        "answer": 1
      },
      {
        "id": "de-a1-l1",
        "level": "A1",
        "offset": -0.2,
        "kind": "listening",
        "question": "Wohin will die Person?",
        "audio": "Entschuldigung, wo ist der Bahnhof? Gehen Sie hier geradeaus und dann links.",
        "options": [
          "Zum Bahnhof",
          "Zum Hotel",
          "Zur Post"
        ],
        "answer": 0
      },
      {
        "id": "de-a1-l2",
        "level": "A1",
        "offset": 0,
        "kind": "listening",
        "question": "Wie viel kostet das?",
        "audio": "Ich möchte zwei Brötchen und einen Kaffee, bitte. Das macht vier Euro fünfzig.",
        "options": [
          "4,50 €",
          "2,50 €",
          "5,40 €"
        ],
        "answer": 0
      },
      {
        "id": "de-a1-l3",
        "level": "A1",
        "offset": 0.3,
        "kind": "listening",
        "question": "Wann ist der Termin?",
        "audio": "Mein Termin beim Arzt ist am Donnerstag um halb zehn.",
        "options": [
          "Dienstag, 10:30 Uhr",
          "Donnerstag, 9:30 Uhr",
          "Donnerstag, 10:30 Uhr"
        ],
        "answer": 1
      },
      {
        "id": "de-a2-c1",
        "level": "A2",
        "offset": -0.3,
        "kind": "cloze",
        "text": "Gestern ___ ich lange geschlafen.",
        "options": [
          "hast",
          "war",
          "bin",
          "habe"
        ],
        "answer": 3
      },
      {
        "id": "de-a2-c2",
        "level": "A2",
        "offset": -0.1,
        "kind": "cloze",
        "text": "Wir sind am Samstag nach München ___.",
        "options": [
          "gefahrt",
          "gefährt",
          "fahren",
          "gefahren"
        ],
        "answer": 3
      },
      {
        "id": "de-a2-c3",
        "level": "A2",
        "offset": 0.1,
        "kind": "cloze",
        "text": "Ich gebe ___ Mutter ein Geschenk.",
        "options": [
          "meiner",
          "meine",
          "mein",
          "meinen"
        ],
        "answer": 0
      },
      {
        "id": "de-a2-c4",
        "level": "A2",
        "offset": 0,
        "kind": "cloze",
        "text": "Ich kann heute nicht kommen, ___ ich krank bin.",
        "options": [
          "denn",
          "aber",
          "weil",
          "deshalb"
        ],
        "answer": 2
      },
      {
        "id": "de-a2-c5",
        "level": "A2",
        "offset": -0.2,
        "kind": "cloze",
        "text": "Mein Bruder ist zwei Jahre ___ als ich.",
        "options": [
          "mehr alt",
          "älter",
          "am ältesten",
          "alt"
        ],
        "answer": 1
      },
      {
        "id": "de-a2-c6",
        "level": "A2",
        "offset": 0.3,
        "kind": "cloze",
        "text": "Kannst du mir sagen, ___ der Zug abfährt?",
        "options": [
          "wer",
          "wen",
          "wann",
          "was"
        ],
        "answer": 2
      },
      {
        "id": "de-a2-r1",
        "level": "A2",
        "offset": 0,
        "kind": "reading",
        "text": "Wegen Bauarbeiten fährt die Linie 5 vom 3. bis 10. Mai nicht. Bitte nehmen Sie den Ersatzbus vor dem Rathaus.",
        "question": "Was sollen die Fahrgäste tun?",
        "options": [
          "Eine neue Fahrkarte kaufen",
          "Bis zum 10. Mai zu Hause bleiben",
          "Den Ersatzbus nehmen",
          "Am Rathaus aussteigen"
        ],
        "answer": 2
      },
      {
        "id": "de-a2-r2",
        "level": "A2",
        "offset": -0.2,
        "kind": "reading",
        "text": "Hallo Jonas, leider kann ich am Freitag nicht zum Fußball kommen. Meine Eltern besuchen mich und ich muss sie vom Flughafen abholen. Vielleicht nächste Woche? Mehmet",
        "question": "Warum kommt Mehmet nicht?",
        "options": [
          "Er holt seine Eltern ab.",
          "Er fliegt in den Urlaub.",
          "Er ist krank.",
          "Er muss arbeiten."
        ],
        "answer": 0
      },
      {
        "id": "de-a2-r3",
        "level": "A2",
        "offset": 0.2,
        "kind": "reading",
        "text": "Zimmer frei: 18 m², möbliert, 5 Minuten zur Uni. 420 € warm. Keine Haustiere. Nur für Nichtraucher.",
        "question": "Wer kann das Zimmer NICHT mieten?",
        "options": [
          "Eine Nichtraucherin",
          "Jemand ohne Möbel",
          "Jemand mit einer Katze",
          "Ein Student"
        ],
        "answer": 2
      },
      {
        "id": "de-a2-r4",
        "level": "A2",
        "offset": 0.3,
        "kind": "reading",
        "text": "Früher hat Clara in einem großen Büro gearbeitet. Seit einem Jahr arbeitet sie von zu Hause. Sie spart Zeit, aber sie vermisst ihre Kollegen.",
        "question": "Was findet Clara nicht gut?",
        "options": [
          "Das Büro ist zu groß.",
          "Sie sieht ihre Kollegen nicht mehr.",
          "Sie verdient weniger.",
          "Sie braucht mehr Zeit."
        ],
        "answer": 1
      },
      {
        "id": "de-a2-l1",
        "level": "A2",
        "offset": -0.1,
        "kind": "listening",
        "question": "Was ist mit dem Zug nach Köln?",
        "audio": "Achtung an Gleis drei: Der Zug nach Köln hat heute etwa zwanzig Minuten Verspätung.",
        "options": [
          "Er kommt später.",
          "Er fällt heute aus.",
          "Er fährt von einem anderen Gleis."
        ],
        "answer": 0
      },
      {
        "id": "de-a2-l2",
        "level": "A2",
        "offset": 0.1,
        "kind": "listening",
        "question": "Was sollen die anderen tun?",
        "audio": "Hallo Sara, hier ist Paul. Ich stehe im Stau und komme erst um acht. Fangt ruhig schon ohne mich an.",
        "options": [
          "Auf Paul warten",
          "Paul abholen",
          "Ohne Paul anfangen"
        ],
        "answer": 2
      },
      {
        "id": "de-a2-l3",
        "level": "A2",
        "offset": 0.3,
        "kind": "listening",
        "question": "Wie hoch ist die Kaution?",
        "audio": "Für die Wohnung brauchen Sie eine Kaution von zwei Monatsmieten. Die Miete beträgt sechshundert Euro.",
        "options": [
          "600 Euro",
          "1200 Euro",
          "800 Euro"
        ],
        "answer": 1
      },
      {
        "id": "de-b1-c1",
        "level": "B1",
        "offset": -0.1,
        "kind": "cloze",
        "text": "Wenn ich mehr Zeit ___, würde ich öfter reisen.",
        "options": [
          "hätte",
          "habe",
          "hatte",
          "haben"
        ],
        "answer": 0
      },
      {
        "id": "de-b1-c2",
        "level": "B1",
        "offset": 0.2,
        "kind": "cloze",
        "text": "Das ist der Mann, ___ ich gestern geholfen habe.",
        "options": [
          "dem",
          "dessen",
          "den",
          "der"
        ],
        "answer": 0
      },
      {
        "id": "de-b1-c3",
        "level": "B1",
        "offset": -0.2,
        "kind": "cloze",
        "text": "Ich freue mich schon ___ die Ferien nächste Woche.",
        "options": [
          "über",
          "auf",
          "an",
          "für"
        ],
        "answer": 1
      },
      {
        "id": "de-b1-c4",
        "level": "B1",
        "offset": 0.1,
        "kind": "cloze",
        "text": "Obwohl es regnete, ___ wir spazieren.",
        "options": [
          "gingen",
          "gehend",
          "wir gingen",
          "gegangen"
        ],
        "answer": 0
      },
      {
        "id": "de-b1-c5",
        "level": "B1",
        "offset": 0.3,
        "kind": "cloze",
        "text": "Das Auto muss bis Freitag ___ werden.",
        "options": [
          "repariert haben",
          "reparieren",
          "reparierte",
          "repariert"
        ],
        "answer": 3
      },
      {
        "id": "de-b1-c6",
        "level": "B1",
        "offset": 0,
        "kind": "cloze",
        "text": "Je mehr du übst, ___ besser sprichst du.",
        "options": [
          "wie",
          "so",
          "als",
          "desto"
        ],
        "answer": 3
      },
      {
        "id": "de-b1-r1",
        "level": "B1",
        "offset": 0,
        "kind": "reading",
        "text": "Liebe Kolleginnen und Kollegen, ab nächstem Monat können Sie Ihre Arbeitszeit flexibler gestalten. Die Kernzeit zwischen 10 und 15 Uhr bleibt aber bestehen; in dieser Zeit müssen alle anwesend sein.",
        "question": "Was ändert sich NICHT?",
        "options": [
          "Alle müssen von 10 bis 15 Uhr da sein.",
          "Man kann früher gehen.",
          "Man kann später anfangen.",
          "Die Arbeitszeit wird kürzer."
        ],
        "answer": 0
      },
      {
        "id": "de-b1-r2",
        "level": "B1",
        "offset": -0.1,
        "kind": "reading",
        "text": "Viele Menschen glauben, dass man nach dem Essen eine Stunde warten muss, bevor man schwimmt. Ärzte sagen jedoch, dass leichtes Schwimmen nach einer kleinen Mahlzeit kein Problem ist.",
        "question": "Was sagen die Ärzte?",
        "options": [
          "Man muss immer eine Stunde warten.",
          "Nach einer kleinen Mahlzeit darf man leicht schwimmen.",
          "Man sollte vor dem Schwimmen nichts essen.",
          "Schwimmen nach dem Essen ist gefährlich."
        ],
        "answer": 1
      },
      {
        "id": "de-b1-r3",
        "level": "B1",
        "offset": 0.2,
        "kind": "reading",
        "text": "Herr Weber hat seine Waschmaschine online bestellt. Nach zwei Wochen war sie immer noch nicht da. Als er beim Kundenservice anrief, erfuhr er, dass die Maschine an seine alte Adresse geliefert worden war.",
        "question": "Warum hatte Herr Weber die Maschine nicht bekommen?",
        "options": [
          "Sie war kaputt.",
          "Er hatte sie nicht bezahlt.",
          "Der Shop hatte sie vergessen.",
          "Sie war an die falsche Adresse geliefert worden."
        ],
        "answer": 3
      },
      {
        "id": "de-b1-r4",
        "level": "B1",
        "offset": 0.3,
        "kind": "reading",
        "text": "Das Museum bietet jeden ersten Sonntag im Monat freien Eintritt an. Führungen kosten an diesen Tagen trotzdem 5 Euro und sollten vorher reserviert werden.",
        "question": "Was gilt am ersten Sonntag im Monat?",
        "options": [
          "Alles ist kostenlos.",
          "Das Museum ist geschlossen.",
          "Man muss den Eintritt reservieren.",
          "Der Eintritt ist frei, Führungen kosten aber Geld."
        ],
        "answer": 3
      },
      {
        "id": "de-b1-l1",
        "level": "B1",
        "offset": -0.1,
        "kind": "listening",
        "question": "Warum wird das Treffen verschoben?",
        "audio": "Wir müssen das Treffen leider verschieben, weil Frau Müller krank ist. Ich schlage Mittwoch nächster Woche vor, falls das allen passt.",
        "options": [
          "Der Raum ist besetzt.",
          "Mittwoch passt nicht.",
          "Eine Kollegin ist krank."
        ],
        "answer": 2
      },
      {
        "id": "de-b1-l2",
        "level": "B1",
        "offset": 0.1,
        "kind": "listening",
        "question": "Womit fährt die Person?",
        "audio": "Eigentlich wollte ich mit dem Zug fahren, aber die Tickets waren so teuer, dass ich mich doch für den Fernbus entschieden habe.",
        "options": [
          "Mit dem Fernbus",
          "Mit dem Zug",
          "Mit dem Auto"
        ],
        "answer": 0
      },
      {
        "id": "de-b1-l3",
        "level": "B1",
        "offset": 0.3,
        "kind": "listening",
        "question": "Bis wann läuft die Ausstellung jetzt?",
        "audio": "Die Ausstellung, die ursprünglich bis Ende Juni laufen sollte, wurde wegen des großen Andrangs um einen Monat verlängert.",
        "options": [
          "Bis Ende Juli",
          "Bis Ende Juni",
          "Bis Ende Mai"
        ],
        "answer": 0
      },
      {
        "id": "de-b2-c1",
        "level": "B2",
        "offset": -0.1,
        "kind": "cloze",
        "text": "Hätte ich das gewusst, ___ ich anders entschieden.",
        "options": [
          "habe",
          "wäre",
          "hätte",
          "würde"
        ],
        "answer": 2
      },
      {
        "id": "de-b2-c2",
        "level": "B2",
        "offset": -0.2,
        "kind": "cloze",
        "text": "___ der schlechten Wetterlage wurde der Flug gestrichen.",
        "options": [
          "Obwohl",
          "Aufgrund",
          "Trotz",
          "Statt"
        ],
        "answer": 1
      },
      {
        "id": "de-b2-c3",
        "level": "B2",
        "offset": 0.1,
        "kind": "cloze",
        "text": "Er tut so, ___ er nichts davon wüsste.",
        "options": [
          "als ob",
          "sodass",
          "damit",
          "obwohl"
        ],
        "answer": 0
      },
      {
        "id": "de-b2-c4",
        "level": "B2",
        "offset": 0.3,
        "kind": "cloze",
        "text": "Die Ergebnisse, ___ der Bericht beruht, sind veraltet.",
        "options": [
          "auf die",
          "auf denen",
          "an denen",
          "denen"
        ],
        "answer": 1
      },
      {
        "id": "de-b2-c5",
        "level": "B2",
        "offset": -0.3,
        "kind": "cloze",
        "text": "Es ist höchste Zeit, dass wir uns ___ das Problem kümmern.",
        "options": [
          "für",
          "um",
          "über",
          "auf"
        ],
        "answer": 1
      },
      {
        "id": "de-b2-c6",
        "level": "B2",
        "offset": 0.2,
        "kind": "cloze",
        "text": "Kaum ___ er zu Hause angekommen, klingelte das Telefon.",
        "options": [
          "hatte",
          "wurde",
          "ist",
          "war"
        ],
        "answer": 3
      },
      {
        "id": "de-b2-r1",
        "level": "B2",
        "offset": 0,
        "kind": "reading",
        "text": "Die Stadt plant, den Autoverkehr in der Innenstadt bis 2030 deutlich zu reduzieren. Anwohner begrüßen die Pläne grundsätzlich, befürchten jedoch, dass der Lieferverkehr für die Geschäfte erschwert wird.",
        "question": "Welche Sorge haben die Anwohner?",
        "options": [
          "Dass die Pläne zu spät kommen",
          "Dass Geschäfte schwerer beliefert werden können",
          "Dass es mehr Autos geben wird",
          "Dass sie selbst nicht mehr parken dürfen"
        ],
        "answer": 1
      },
      {
        "id": "de-b2-r2",
        "level": "B2",
        "offset": -0.1,
        "kind": "reading",
        "text": "Obwohl die Studie viel Aufmerksamkeit erhielt, weisen Fachleute darauf hin, dass die Zahl der Teilnehmenden zu gering war, um allgemeingültige Schlüsse zu ziehen.",
        "question": "Was kritisieren die Fachleute?",
        "options": [
          "Die Studie dauerte zu lange.",
          "Die Ergebnisse wurden geheim gehalten.",
          "Die Studie hatte zu wenige Teilnehmende.",
          "Die Studie war zu teuer."
        ],
        "answer": 2
      },
      {
        "id": "de-b2-r3",
        "level": "B2",
        "offset": 0.1,
        "kind": "reading",
        "text": "Wer sich ehrenamtlich engagiert, tut nicht nur anderen etwas Gutes: Untersuchungen zufolge berichten Freiwillige häufiger von einer hohen Lebenszufriedenheit als Menschen, die sich nicht engagieren.",
        "question": "Was sagt der Text über Freiwillige?",
        "options": [
          "Sie haben weniger Freizeit.",
          "Sie sind oft zufriedener mit ihrem Leben.",
          "Sie verdienen mehr Geld.",
          "Sie sind seltener krank."
        ],
        "answer": 1
      },
      {
        "id": "de-b2-r4",
        "level": "B2",
        "offset": 0.3,
        "kind": "reading",
        "text": "Der Autor räumt ein, dass seine Thesen provokant sind, betont aber, dass er keineswegs beabsichtigt habe, die Leserschaft zu spalten.",
        "question": "Was betont der Autor?",
        "options": [
          "Er wurde falsch zitiert.",
          "Er wollte die Leser nicht spalten.",
          "Seine Thesen sind nicht provokant.",
          "Er hat seine Meinung geändert."
        ],
        "answer": 1
      },
      {
        "id": "de-b2-l1",
        "level": "B2",
        "offset": -0.1,
        "kind": "listening",
        "question": "Wie findet die Person den Umzug?",
        "audio": "Ich hätte nie gedacht, dass mir der Umzug aufs Land so gut gefällt. Klar, der Weg zur Arbeit ist länger, aber dafür habe ich endlich Ruhe.",
        "options": [
          "Gut, trotz des längeren Arbeitswegs",
          "Sie bereut ihn.",
          "Schlecht, wegen des Lärms"
        ],
        "answer": 0
      },
      {
        "id": "de-b2-l2",
        "level": "B2",
        "offset": 0.1,
        "kind": "listening",
        "question": "Wie begründet die Firma die Preiserhöhung?",
        "audio": "Die Firma betont, die Preiserhöhung sei unvermeidlich gewesen, da die Energiekosten im vergangenen Jahr drastisch gestiegen seien.",
        "options": [
          "Mit gestiegenen Energiekosten",
          "Mit höheren Löhnen",
          "Mit neuen Produkten"
        ],
        "answer": 0
      },
      {
        "id": "de-b2-l3",
        "level": "B2",
        "offset": 0.3,
        "kind": "listening",
        "question": "Was ist laut Sprecher das eigentliche Problem?",
        "audio": "Nicht die Technik ist das Problem, sondern dass viele Schulen gar nicht wissen, wie sie die Geräte sinnvoll in den Unterricht einbinden sollen.",
        "options": [
          "Die sinnvolle Nutzung im Unterricht",
          "Die Technik ist zu teuer.",
          "Es gibt zu wenige Geräte."
        ],
        "answer": 0
      },
      {
        "id": "de-c1-c1",
        "level": "C1",
        "offset": 0,
        "kind": "cloze",
        "text": "Ich habe keine Zeit, ins Kino zu gehen, ___ denn eine Reise zu machen.",
        "options": [
          "außer",
          "sondern",
          "sowie",
          "geschweige"
        ],
        "answer": 3
      },
      {
        "id": "de-c1-c2",
        "level": "C1",
        "offset": 0.2,
        "kind": "cloze",
        "text": "Die ___ Maßnahmen haben sich als wirkungslos erwiesen.",
        "options": [
          "ergriffen vom Ministerium",
          "vom Ministerium ergreifenden",
          "vom Ministerium ergriffenen",
          "vom Ministerium ergriffen"
        ],
        "answer": 2
      },
      {
        "id": "de-c1-c3",
        "level": "C1",
        "offset": 0.1,
        "kind": "cloze",
        "text": "Wir sollten das Angebot annehmen, ___ es keine bessere Alternative gibt.",
        "options": [
          "geschweige denn",
          "wohingegen",
          "zumal",
          "obgleich"
        ],
        "answer": 2
      },
      {
        "id": "de-c1-c4",
        "level": "C1",
        "offset": -0.2,
        "kind": "cloze",
        "text": "___ der Tatsache, dass die Frist abgelaufen ist, können wir den Antrag nicht mehr bearbeiten.",
        "options": [
          "Obwohl",
          "Stattdessen",
          "Infolgedessen",
          "Angesichts"
        ],
        "answer": 3
      },
      {
        "id": "de-c1-c5",
        "level": "C1",
        "offset": 0.3,
        "kind": "cloze",
        "text": "Das Projekt steht und fällt ___ der Finanzierung.",
        "options": [
          "mit",
          "an",
          "durch",
          "bei"
        ],
        "answer": 0
      },
      {
        "id": "de-c1-c6",
        "level": "C1",
        "offset": -0.3,
        "kind": "cloze",
        "text": "Es bedarf ___ gründlichen Prüfung.",
        "options": [
          "einer",
          "eine",
          "einem",
          "einen"
        ],
        "answer": 0
      },
      {
        "id": "de-c1-r1",
        "level": "C1",
        "offset": 0,
        "kind": "reading",
        "text": "Die Debatte um das bedingungslose Grundeinkommen wird häufig von der Frage dominiert, ob es finanzierbar sei. Dabei gerät aus dem Blick, welche gesellschaftlichen Veränderungen es nach sich ziehen könnte, etwa im Verhältnis von Erwerbsarbeit und Ehrenamt.",
        "question": "Was kritisiert der Text an der Debatte?",
        "options": [
          "Die Finanzierung wird ignoriert.",
          "Das Ehrenamt wird überschätzt.",
          "Sie wird zu emotional geführt.",
          "Gesellschaftliche Folgen werden vernachlässigt."
        ],
        "answer": 3
      },
      {
        "id": "de-c1-r2",
        "level": "C1",
        "offset": 0.2,
        "kind": "reading",
        "text": "Dass die Maßnahme ihr Ziel verfehlt hat, lässt sich kaum bestreiten. Ob man daraus jedoch schließen kann, dass sie von Anfang an zum Scheitern verurteilt war, steht auf einem anderen Blatt.",
        "question": "Welche Haltung nimmt der Autor ein?",
        "options": [
          "Die Maßnahme war von Anfang an falsch.",
          "Das Scheitern ist klar, die Ursache aber offen.",
          "Über das Ergebnis lässt sich noch nichts sagen.",
          "Die Maßnahme war ein Erfolg."
        ],
        "answer": 1
      },
      {
        "id": "de-c1-r3",
        "level": "C1",
        "offset": -0.1,
        "kind": "reading",
        "text": "Kritiker werfen der Plattform vor, sie habe die Verbreitung von Falschmeldungen billigend in Kauf genommen, um die Verweildauer der Nutzer zu erhöhen.",
        "question": "Was wird der Plattform vorgeworfen?",
        "options": [
          "Sie hat zu wenig Werbung gezeigt.",
          "Sie duldete Falschmeldungen aus wirtschaftlichem Interesse.",
          "Sie hat Nutzer gesperrt.",
          "Sie hat Falschmeldungen selbst erfunden."
        ],
        "answer": 1
      },
      {
        "id": "de-c1-r4",
        "level": "C1",
        "offset": 0.3,
        "kind": "reading",
        "text": "Der Roman lebt weniger von seiner Handlung, die über weite Strecken vorhersehbar bleibt, als von der Präzision, mit der die Autorin die inneren Widersprüche ihrer Figuren seziert.",
        "question": "Worin liegt laut Rezension die Stärke des Romans?",
        "options": [
          "In der überraschenden Handlung",
          "In der genauen Darstellung der Figuren",
          "In den vielen Schauplätzen",
          "Im schnellen Tempo"
        ],
        "answer": 1
      },
      {
        "id": "de-c1-l1",
        "level": "C1",
        "offset": 0,
        "kind": "listening",
        "question": "Was meint der Sprecher?",
        "audio": "Man kann über die Reform denken, was man will, aber ihr vorzuwerfen, sie sei überstürzt beschlossen worden, wird der jahrelangen Vorbereitung schlicht nicht gerecht.",
        "options": [
          "Er lehnt die Reform ab.",
          "Die Reform wurde lange vorbereitet.",
          "Die Reform war überstürzt."
        ],
        "answer": 1
      },
      {
        "id": "de-c1-l2",
        "level": "C1",
        "offset": 0.1,
        "kind": "listening",
        "question": "Wie bewertet die Sprecherin die Zahlen?",
        "audio": "Ich will die Zahlen gar nicht schönreden, aber im Vergleich zum Vorjahr haben wir den Verlust immerhin halbiert.",
        "options": [
          "Sehr gut",
          "Schlechter als im Vorjahr",
          "Noch nicht gut, aber besser"
        ],
        "answer": 2
      },
      {
        "id": "de-c1-l3",
        "level": "C1",
        "offset": 0.3,
        "kind": "listening",
        "question": "Was hat das Gericht getan?",
        "audio": "Dass das Gericht der Klage stattgegeben hat, dürfte weitreichende Folgen für ähnliche Verfahren haben.",
        "options": [
          "Es hat das Verfahren vertagt.",
          "Es hat die Klage abgewiesen.",
          "Es hat der Klage recht gegeben."
        ],
        "answer": 2
      }
    ]
  },
  "en": {
    "cards": [
      {
        "id": "en-w-a1-1",
        "word": "sweater",
        "level": "A1"
      },
      {
        "id": "en-w-a1-2",
        "word": "lake",
        "level": "A1"
      },
      {
        "id": "en-w-a1-3",
        "word": "homework",
        "level": "A1"
      },
      {
        "id": "en-w-a1-4",
        "word": "smile",
        "level": "A1"
      },
      {
        "id": "en-w-a1-5",
        "word": "choose",
        "level": "A1"
      },
      {
        "id": "en-w-a1-6",
        "word": "clock",
        "level": "A1"
      },
      {
        "id": "en-w-a1-7",
        "word": "kitchen",
        "level": "A1"
      },
      {
        "id": "en-w-a1-8",
        "word": "need",
        "level": "A1"
      },
      {
        "id": "en-w-a2-1",
        "word": "shout",
        "level": "A2"
      },
      {
        "id": "en-w-a2-2",
        "word": "apologise",
        "level": "A2"
      },
      {
        "id": "en-w-a2-3",
        "word": "describe",
        "level": "A2"
      },
      {
        "id": "en-w-a2-4",
        "word": "expect",
        "level": "A2"
      },
      {
        "id": "en-w-a2-5",
        "word": "payment",
        "level": "A2"
      },
      {
        "id": "en-w-a2-6",
        "word": "doorbell",
        "level": "A2"
      },
      {
        "id": "en-w-a2-7",
        "word": "wood",
        "level": "A2"
      },
      {
        "id": "en-w-a2-8",
        "word": "marry",
        "level": "A2"
      },
      {
        "id": "en-w-b1-1",
        "word": "clue",
        "level": "B1"
      },
      {
        "id": "en-w-b1-2",
        "word": "stain",
        "level": "B1"
      },
      {
        "id": "en-w-b1-3",
        "word": "habit",
        "level": "B1"
      },
      {
        "id": "en-w-b1-4",
        "word": "sew",
        "level": "B1"
      },
      {
        "id": "en-w-b1-5",
        "word": "lid",
        "level": "B1"
      },
      {
        "id": "en-w-b1-6",
        "word": "hire",
        "level": "B1"
      },
      {
        "id": "en-w-b1-7",
        "word": "embassy",
        "level": "B1"
      },
      {
        "id": "en-w-b1-8",
        "word": "dig",
        "level": "B1"
      },
      {
        "id": "en-w-b2-1",
        "word": "longing",
        "level": "B2"
      },
      {
        "id": "en-w-b2-2",
        "word": "theft",
        "level": "B2"
      },
      {
        "id": "en-w-b2-3",
        "word": "absence",
        "level": "B2"
      },
      {
        "id": "en-w-b2-4",
        "word": "float",
        "level": "B2"
      },
      {
        "id": "en-w-b2-5",
        "word": "grant",
        "level": "B2"
      },
      {
        "id": "en-w-b2-6",
        "word": "depart",
        "level": "B2"
      },
      {
        "id": "en-w-b2-7",
        "word": "craftsman",
        "level": "B2"
      },
      {
        "id": "en-w-b2-8",
        "word": "enable",
        "level": "B2"
      },
      {
        "id": "en-w-c1-1",
        "word": "refurbish",
        "level": "C1"
      },
      {
        "id": "en-w-c1-2",
        "word": "construe",
        "level": "C1"
      },
      {
        "id": "en-w-c1-3",
        "word": "imposition",
        "level": "C1"
      },
      {
        "id": "en-w-c1-4",
        "word": "eviction",
        "level": "C1"
      },
      {
        "id": "en-w-c1-5",
        "word": "convene",
        "level": "C1"
      },
      {
        "id": "en-w-c1-6",
        "word": "vow",
        "level": "C1"
      },
      {
        "id": "en-w-c1-7",
        "word": "scrutinise",
        "level": "C1"
      },
      {
        "id": "en-w-c1-8",
        "word": "dispatch",
        "level": "C1"
      },
      {
        "id": "en-p-1",
        "word": "crandle",
        "level": null
      },
      {
        "id": "en-p-2",
        "word": "wemble",
        "level": null
      },
      {
        "id": "en-p-3",
        "word": "frunt",
        "level": null
      },
      {
        "id": "en-p-4",
        "word": "glomish",
        "level": null
      },
      {
        "id": "en-p-5",
        "word": "dreave",
        "level": null
      },
      {
        "id": "en-p-6",
        "word": "spalter",
        "level": null
      },
      {
        "id": "en-p-7",
        "word": "brask",
        "level": null
      },
      {
        "id": "en-p-8",
        "word": "quillow",
        "level": null
      },
      {
        "id": "en-p-9",
        "word": "sneeve",
        "level": null
      },
      {
        "id": "en-p-10",
        "word": "trantle",
        "level": null
      },
      {
        "id": "en-p-11",
        "word": "pranch",
        "level": null
      },
      {
        "id": "en-p-12",
        "word": "morble",
        "level": null
      }
    ],
    "items": [
      {
        "id": "en-a1-c1",
        "level": "A1",
        "offset": -0.3,
        "kind": "cloze",
        "text": "She ___ from Brazil.",
        "options": [
          "be",
          "am",
          "are",
          "is"
        ],
        "answer": 3
      },
      {
        "id": "en-a1-c2",
        "level": "A1",
        "offset": -0.2,
        "kind": "cloze",
        "text": "I ___ coffee every morning.",
        "options": [
          "drinks",
          "am drink",
          "drink",
          "drinking"
        ],
        "answer": 2
      },
      {
        "id": "en-a1-c3",
        "level": "A1",
        "offset": 0,
        "kind": "cloze",
        "text": "There ___ two cats in the garden.",
        "options": [
          "has",
          "are",
          "be",
          "is"
        ],
        "answer": 1
      },
      {
        "id": "en-a1-c4",
        "level": "A1",
        "offset": 0,
        "kind": "cloze",
        "text": "___ you like pizza?",
        "options": [
          "Does",
          "Is",
          "Are",
          "Do"
        ],
        "answer": 3
      },
      {
        "id": "en-a1-c5",
        "level": "A1",
        "offset": 0.1,
        "kind": "cloze",
        "text": "My sister ___ a new car.",
        "options": [
          "has",
          "have",
          "having",
          "is"
        ],
        "answer": 0
      },
      {
        "id": "en-a1-c6",
        "level": "A1",
        "offset": 0.3,
        "kind": "cloze",
        "text": "We can't come tomorrow because we ___ work.",
        "options": [
          "having to",
          "have to",
          "must to",
          "has to"
        ],
        "answer": 1
      },
      {
        "id": "en-a1-r1",
        "level": "A1",
        "offset": -0.3,
        "kind": "reading",
        "text": "Hi, I'm Paul. I'm 30 and I live in Leeds. I work in a hospital. I'm a nurse.",
        "question": "What is Paul's job?",
        "options": [
          "He's a doctor.",
          "He's a nurse.",
          "He's a student.",
          "He's a teacher."
        ],
        "answer": 1
      },
      {
        "id": "en-a1-r2",
        "level": "A1",
        "offset": -0.1,
        "kind": "reading",
        "text": "The library is open from Monday to Friday, 9 am to 6 pm. It is closed at the weekend.",
        "question": "When is the library closed?",
        "options": [
          "On Friday",
          "On Saturday and Sunday",
          "Every day at 5 pm",
          "On Monday"
        ],
        "answer": 1
      },
      {
        "id": "en-a1-r3",
        "level": "A1",
        "offset": 0.1,
        "kind": "reading",
        "text": "Dear Sam, it's my birthday on Saturday. Can you come to my party at 7? Please don't bring food, my mum is cooking. Love, Mia",
        "question": "What should Sam not bring?",
        "options": [
          "Music",
          "Drinks",
          "A present",
          "Food"
        ],
        "answer": 3
      },
      {
        "id": "en-a1-r4",
        "level": "A1",
        "offset": 0.2,
        "kind": "reading",
        "text": "Mr Lee usually goes to work by bike. Today it is raining, so he is taking the bus.",
        "question": "How is Mr Lee going to work today?",
        "options": [
          "By bike",
          "By car",
          "By bus",
          "On foot"
        ],
        "answer": 2
      },
      {
        "id": "en-a1-l1",
        "level": "A1",
        "offset": -0.2,
        "kind": "listening",
        "question": "Where does the person want to go?",
        "audio": "Excuse me, where is the station? Go straight on and then turn left.",
        "options": [
          "To the station",
          "To the hotel",
          "To the post office"
        ],
        "answer": 0
      },
      {
        "id": "en-a1-l2",
        "level": "A1",
        "offset": 0,
        "kind": "listening",
        "question": "How much is it?",
        "audio": "Two sandwiches and a tea, please. That's six pounds fifty.",
        "options": [
          "£2.50",
          "£6.50",
          "£5.60"
        ],
        "answer": 1
      },
      {
        "id": "en-a1-l3",
        "level": "A1",
        "offset": 0.3,
        "kind": "listening",
        "question": "When is the appointment?",
        "audio": "My doctor's appointment is on Thursday at a quarter to ten.",
        "options": [
          "Thursday, 10:15",
          "Tuesday, 10:15",
          "Thursday, 9:45"
        ],
        "answer": 2
      },
      {
        "id": "en-a2-c1",
        "level": "A2",
        "offset": -0.3,
        "kind": "cloze",
        "text": "Yesterday I ___ to the cinema.",
        "options": [
          "have gone",
          "went",
          "go",
          "goed"
        ],
        "answer": 1
      },
      {
        "id": "en-a2-c2",
        "level": "A2",
        "offset": 0,
        "kind": "cloze",
        "text": "I've lived here ___ 2019.",
        "options": [
          "since",
          "ago",
          "from",
          "for"
        ],
        "answer": 0
      },
      {
        "id": "en-a2-c3",
        "level": "A2",
        "offset": -0.1,
        "kind": "cloze",
        "text": "This is the ___ film I've ever seen.",
        "options": [
          "most good",
          "best",
          "goodest",
          "better"
        ],
        "answer": 1
      },
      {
        "id": "en-a2-c4",
        "level": "A2",
        "offset": -0.2,
        "kind": "cloze",
        "text": "I couldn't come to the party ___ I was ill.",
        "options": [
          "but",
          "so",
          "although",
          "because"
        ],
        "answer": 3
      },
      {
        "id": "en-a2-c5",
        "level": "A2",
        "offset": 0.1,
        "kind": "cloze",
        "text": "If it rains tomorrow, we ___ stay at home.",
        "options": [
          "would",
          "did",
          "will",
          "are"
        ],
        "answer": 2
      },
      {
        "id": "en-a2-c6",
        "level": "A2",
        "offset": 0.3,
        "kind": "cloze",
        "text": "You ___ wear a helmet when you ride a motorbike. It's the law.",
        "options": [
          "can't",
          "needn't",
          "must",
          "mustn't"
        ],
        "answer": 2
      },
      {
        "id": "en-a2-r1",
        "level": "A2",
        "offset": 0,
        "kind": "reading",
        "text": "Because of building work, bus number 12 will not run from 3 to 10 May. Please use the replacement bus outside the town hall.",
        "question": "What should passengers do?",
        "options": [
          "Get off at the town hall",
          "Buy a new ticket",
          "Take the replacement bus",
          "Stay at home until 10 May"
        ],
        "answer": 2
      },
      {
        "id": "en-a2-r2",
        "level": "A2",
        "offset": -0.2,
        "kind": "reading",
        "text": "Hi Jack, sorry, I can't play football on Friday. My parents are visiting and I have to pick them up from the airport. Maybe next week? Tom",
        "question": "Why can't Tom play?",
        "options": [
          "He has to work.",
          "He's flying on holiday.",
          "He's picking up his parents.",
          "He's ill."
        ],
        "answer": 2
      },
      {
        "id": "en-a2-r3",
        "level": "A2",
        "offset": 0.2,
        "kind": "reading",
        "text": "Room to rent: 15 m², furnished, 5 minutes from the university. £500 a month including bills. No pets. Non-smokers only.",
        "question": "Who can NOT rent the room?",
        "options": [
          "Someone with a cat",
          "A non-smoker",
          "Someone without furniture",
          "A student"
        ],
        "answer": 0
      },
      {
        "id": "en-a2-r4",
        "level": "A2",
        "offset": 0.3,
        "kind": "reading",
        "text": "Clara used to work in a big office. For a year now she has worked from home. She saves time, but she misses her colleagues.",
        "question": "What does Clara not like?",
        "options": [
          "Earning less money",
          "Not seeing her colleagues",
          "Spending more time travelling",
          "The big office"
        ],
        "answer": 1
      },
      {
        "id": "en-a2-l1",
        "level": "A2",
        "offset": -0.1,
        "kind": "listening",
        "question": "What is the problem with the train?",
        "audio": "Attention please: the train to Manchester is running about twenty minutes late.",
        "options": [
          "It's leaving from another platform.",
          "It's cancelled.",
          "It's late."
        ],
        "answer": 2
      },
      {
        "id": "en-a2-l2",
        "level": "A2",
        "offset": 0.1,
        "kind": "listening",
        "question": "What should the others do?",
        "audio": "Hi Sara, it's Paul. I'm stuck in traffic, so I won't be there till eight. Just start without me.",
        "options": [
          "Wait for Paul",
          "Start without Paul",
          "Pick Paul up"
        ],
        "answer": 1
      },
      {
        "id": "en-a2-l3",
        "level": "A2",
        "offset": 0.3,
        "kind": "listening",
        "question": "How much is the deposit?",
        "audio": "For the flat you need to pay a deposit of two months' rent. The rent is six hundred pounds.",
        "options": [
          "£600",
          "£1,200",
          "£800"
        ],
        "answer": 1
      },
      {
        "id": "en-b1-c1",
        "level": "B1",
        "offset": -0.1,
        "kind": "cloze",
        "text": "If I ___ more time, I would travel more.",
        "options": [
          "have",
          "would have",
          "had",
          "having"
        ],
        "answer": 2
      },
      {
        "id": "en-b1-c2",
        "level": "B1",
        "offset": 0.2,
        "kind": "cloze",
        "text": "That's the woman ___ car was stolen.",
        "options": [
          "who's",
          "who",
          "which",
          "whose"
        ],
        "answer": 3
      },
      {
        "id": "en-b1-c3",
        "level": "B1",
        "offset": 0,
        "kind": "cloze",
        "text": "I'm looking forward ___ you soon.",
        "options": [
          "to seeing",
          "for seeing",
          "seeing",
          "to see"
        ],
        "answer": 0
      },
      {
        "id": "en-b1-c4",
        "level": "B1",
        "offset": -0.2,
        "kind": "cloze",
        "text": "The bridge ___ in 1890.",
        "options": [
          "was built",
          "built",
          "has built",
          "is building"
        ],
        "answer": 0
      },
      {
        "id": "en-b1-c5",
        "level": "B1",
        "offset": 0.3,
        "kind": "cloze",
        "text": "By the time we arrived, the film ___.",
        "options": [
          "had already started",
          "already starts",
          "was already start",
          "has already started"
        ],
        "answer": 0
      },
      {
        "id": "en-b1-c6",
        "level": "B1",
        "offset": 0.1,
        "kind": "cloze",
        "text": "The more you practise, ___ you get.",
        "options": [
          "the best",
          "better",
          "more better",
          "the better"
        ],
        "answer": 3
      },
      {
        "id": "en-b1-r1",
        "level": "B1",
        "offset": 0,
        "kind": "reading",
        "text": "Dear all, from next month you can choose your working hours more freely. However, everyone must still be in the office between 10 am and 3 pm.",
        "question": "What stays the same?",
        "options": [
          "The working week gets shorter.",
          "Everyone must be in between 10 and 3.",
          "You can start later.",
          "You can leave earlier."
        ],
        "answer": 1
      },
      {
        "id": "en-b1-r2",
        "level": "B1",
        "offset": -0.1,
        "kind": "reading",
        "text": "Many people believe you must wait an hour after eating before you swim. Doctors say, however, that gentle swimming after a light meal is not a problem.",
        "question": "What do doctors say?",
        "options": [
          "Gentle swimming after a light meal is fine.",
          "You should not eat before swimming.",
          "Swimming after eating is dangerous.",
          "You must always wait an hour."
        ],
        "answer": 0
      },
      {
        "id": "en-b1-r3",
        "level": "B1",
        "offset": 0.2,
        "kind": "reading",
        "text": "Mr Webb ordered a washing machine online. After two weeks it still hadn't arrived. When he called customer service, he found out it had been delivered to his old address.",
        "question": "Why hadn't Mr Webb received the machine?",
        "options": [
          "It had gone to the wrong address.",
          "The shop had forgotten it.",
          "He hadn't paid for it.",
          "It was broken."
        ],
        "answer": 0
      },
      {
        "id": "en-b1-r4",
        "level": "B1",
        "offset": 0.3,
        "kind": "reading",
        "text": "Entry to the museum is free on the first Sunday of every month. Guided tours still cost £5 on these days and should be booked in advance.",
        "question": "What is true on the first Sunday of the month?",
        "options": [
          "The museum is closed.",
          "You must book your entry.",
          "Everything is free.",
          "Entry is free, but tours cost money."
        ],
        "answer": 3
      },
      {
        "id": "en-b1-l1",
        "level": "B1",
        "offset": -0.1,
        "kind": "listening",
        "question": "Why is the meeting being postponed?",
        "audio": "We'll have to postpone the meeting because Mrs Miller is off sick. I'd suggest Wednesday next week, if that works for everyone.",
        "options": [
          "Wednesday doesn't work.",
          "A colleague is ill.",
          "The room is booked."
        ],
        "answer": 1
      },
      {
        "id": "en-b1-l2",
        "level": "B1",
        "offset": 0.1,
        "kind": "listening",
        "question": "How is the person travelling?",
        "audio": "I was actually going to take the train, but the tickets were so expensive that I decided on the coach in the end.",
        "options": [
          "By coach",
          "By car",
          "By train"
        ],
        "answer": 0
      },
      {
        "id": "en-b1-l3",
        "level": "B1",
        "offset": 0.3,
        "kind": "listening",
        "question": "When does the exhibition end now?",
        "audio": "The exhibition, which was originally due to end in June, has been extended by a month because it's been so popular.",
        "options": [
          "At the end of May",
          "At the end of July",
          "At the end of June"
        ],
        "answer": 1
      },
      {
        "id": "en-b2-c1",
        "level": "B2",
        "offset": -0.1,
        "kind": "cloze",
        "text": "Had I known about the problem, I ___ differently.",
        "options": [
          "had acted",
          "acted",
          "would have acted",
          "would act"
        ],
        "answer": 2
      },
      {
        "id": "en-b2-c2",
        "level": "B2",
        "offset": -0.2,
        "kind": "cloze",
        "text": "___ the bad weather, the flight left on time.",
        "options": [
          "However",
          "Because of",
          "Although",
          "Despite"
        ],
        "answer": 3
      },
      {
        "id": "en-b2-c3",
        "level": "B2",
        "offset": 0.1,
        "kind": "cloze",
        "text": "He talks as ___ he knew everything.",
        "options": [
          "since",
          "because",
          "if",
          "whether"
        ],
        "answer": 2
      },
      {
        "id": "en-b2-c4",
        "level": "B2",
        "offset": 0.3,
        "kind": "cloze",
        "text": "Not until the next morning ___ how serious the damage was.",
        "options": [
          "we did realise",
          "did we realise",
          "we realised",
          "realised we"
        ],
        "answer": 1
      },
      {
        "id": "en-b2-c5",
        "level": "B2",
        "offset": 0,
        "kind": "cloze",
        "text": "It's high time we ___ something about this problem.",
        "options": [
          "have done",
          "will do",
          "do",
          "did"
        ],
        "answer": 3
      },
      {
        "id": "en-b2-c6",
        "level": "B2",
        "offset": 0.2,
        "kind": "cloze",
        "text": "She denied ___ the money.",
        "options": [
          "to take",
          "to have take",
          "take",
          "taking"
        ],
        "answer": 3
      },
      {
        "id": "en-b2-r1",
        "level": "B2",
        "offset": 0,
        "kind": "reading",
        "text": "The council plans to cut car traffic in the city centre significantly by 2030. Residents broadly welcome the plans but fear that deliveries to local shops will become more difficult.",
        "question": "What are residents worried about?",
        "options": [
          "Shops being harder to supply",
          "Not being allowed to park",
          "The plans coming too late",
          "More cars in the city"
        ],
        "answer": 0
      },
      {
        "id": "en-b2-r2",
        "level": "B2",
        "offset": -0.1,
        "kind": "reading",
        "text": "Although the study attracted a lot of attention, experts point out that the number of participants was too small to draw general conclusions.",
        "question": "What do the experts criticise?",
        "options": [
          "The study had too few participants.",
          "The study took too long.",
          "The results were kept secret.",
          "The study was too expensive."
        ],
        "answer": 0
      },
      {
        "id": "en-b2-r3",
        "level": "B2",
        "offset": 0.1,
        "kind": "reading",
        "text": "Volunteering doesn't only benefit others: according to research, volunteers report high life satisfaction more often than people who don't volunteer.",
        "question": "What does the text say about volunteers?",
        "options": [
          "They earn more money.",
          "They are ill less often.",
          "They are often more satisfied with life.",
          "They have less free time."
        ],
        "answer": 2
      },
      {
        "id": "en-b2-r4",
        "level": "B2",
        "offset": 0.3,
        "kind": "reading",
        "text": "The author concedes that his arguments are provocative, but insists that he never intended to divide his readers.",
        "question": "What does the author insist on?",
        "options": [
          "He was misquoted.",
          "He has changed his mind.",
          "His arguments aren't provocative.",
          "He didn't want to divide his readers."
        ],
        "answer": 3
      },
      {
        "id": "en-b2-l1",
        "level": "B2",
        "offset": -0.1,
        "kind": "listening",
        "question": "How does the speaker feel about the move?",
        "audio": "I never thought I'd enjoy moving to the countryside so much. Sure, the commute is longer, but at least I finally have some peace and quiet.",
        "options": [
          "Positive, despite the longer commute",
          "Negative, because of the noise",
          "They regret it."
        ],
        "answer": 0
      },
      {
        "id": "en-b2-l2",
        "level": "B2",
        "offset": 0.1,
        "kind": "listening",
        "question": "How does the company justify the price rise?",
        "audio": "The company insists the price rise was unavoidable, as energy costs rose dramatically over the past year.",
        "options": [
          "New products",
          "Higher energy costs",
          "Higher wages"
        ],
        "answer": 1
      },
      {
        "id": "en-b2-l3",
        "level": "B2",
        "offset": 0.3,
        "kind": "listening",
        "question": "What is the real problem, according to the speaker?",
        "audio": "The technology isn't the problem. It's that many schools simply don't know how to use the devices meaningfully in lessons.",
        "options": [
          "Expensive technology",
          "Not enough devices",
          "Using the devices well in lessons"
        ],
        "answer": 2
      },
      {
        "id": "en-c1-c1",
        "level": "C1",
        "offset": 0,
        "kind": "cloze",
        "text": "I don't have time to go to the cinema, let ___ go on holiday.",
        "options": [
          "apart",
          "alone",
          "only",
          "aside"
        ],
        "answer": 1
      },
      {
        "id": "en-c1-c2",
        "level": "C1",
        "offset": 0.2,
        "kind": "cloze",
        "text": "___ to the public, the plans would have caused an outcry.",
        "options": [
          "Having revealed",
          "If revealed they were",
          "Had they been revealed",
          "Were they revealing"
        ],
        "answer": 2
      },
      {
        "id": "en-c1-c3",
        "level": "C1",
        "offset": 0.1,
        "kind": "cloze",
        "text": "The decision, ___ well-intentioned, proved counterproductive.",
        "options": [
          "however",
          "whichever",
          "whatever",
          "despite"
        ],
        "answer": 0
      },
      {
        "id": "en-c1-c4",
        "level": "C1",
        "offset": -0.2,
        "kind": "cloze",
        "text": "___ the fact that the deadline has passed, we can no longer process your application.",
        "options": [
          "In view of",
          "Even though",
          "Instead",
          "Consequently"
        ],
        "answer": 0
      },
      {
        "id": "en-c1-c5",
        "level": "C1",
        "offset": 0.3,
        "kind": "cloze",
        "text": "She's not ___ to accept criticism lightly.",
        "options": [
          "ones",
          "the one who",
          "one",
          "someone what"
        ],
        "answer": 2
      },
      {
        "id": "en-c1-c6",
        "level": "C1",
        "offset": -0.3,
        "kind": "cloze",
        "text": "The situation calls ___ a thorough review.",
        "options": [
          "up",
          "at",
          "on",
          "for"
        ],
        "answer": 3
      },
      {
        "id": "en-c1-r1",
        "level": "C1",
        "offset": 0,
        "kind": "reading",
        "text": "The debate on universal basic income is often dominated by whether it is affordable. What tends to be overlooked is the social change it could bring about, for instance in the relationship between paid work and volunteering.",
        "question": "What does the text criticise about the debate?",
        "options": [
          "Volunteering is overrated.",
          "It is too emotional.",
          "Social consequences are neglected.",
          "Affordability is ignored."
        ],
        "answer": 2
      },
      {
        "id": "en-c1-r2",
        "level": "C1",
        "offset": 0.2,
        "kind": "reading",
        "text": "That the measure failed to achieve its aim is hard to dispute. Whether one can conclude from this that it was doomed from the outset is another matter entirely.",
        "question": "What is the author's position?",
        "options": [
          "It is too early to judge the result.",
          "The failure is clear, but its cause is open.",
          "The measure was a success.",
          "The measure was wrong from the start."
        ],
        "answer": 1
      },
      {
        "id": "en-c1-r3",
        "level": "C1",
        "offset": -0.1,
        "kind": "reading",
        "text": "Critics accuse the platform of having knowingly tolerated the spread of misinformation in order to keep users online for longer.",
        "question": "What is the platform accused of?",
        "options": [
          "Tolerating misinformation for commercial gain",
          "Banning users",
          "Inventing misinformation itself",
          "Showing too few adverts"
        ],
        "answer": 0
      },
      {
        "id": "en-c1-r4",
        "level": "C1",
        "offset": 0.3,
        "kind": "reading",
        "text": "The novel owes less to its plot, which remains predictable for long stretches, than to the precision with which the author dissects her characters' inner contradictions.",
        "question": "According to the review, what is the novel's strength?",
        "options": [
          "Its fast pace",
          "Its precise portrayal of the characters",
          "Its many settings",
          "Its surprising plot"
        ],
        "answer": 1
      },
      {
        "id": "en-c1-l1",
        "level": "C1",
        "offset": 0,
        "kind": "listening",
        "question": "What does the speaker mean?",
        "audio": "Say what you like about the reform, but to accuse it of being rushed through simply doesn't do justice to years of preparation.",
        "options": [
          "The reform was prepared for years.",
          "He rejects the reform.",
          "The reform was rushed."
        ],
        "answer": 0
      },
      {
        "id": "en-c1-l2",
        "level": "C1",
        "offset": 0.1,
        "kind": "listening",
        "question": "How does the speaker assess the figures?",
        "audio": "I'm not trying to gloss over the figures, but compared with last year we've at least halved the loss.",
        "options": [
          "Very good",
          "Not good yet, but improved",
          "Worse than last year"
        ],
        "answer": 1
      },
      {
        "id": "en-c1-l3",
        "level": "C1",
        "offset": 0.3,
        "kind": "listening",
        "question": "What did the court do?",
        "audio": "The court's ruling in favour of the claimant is likely to have far-reaching implications for similar cases.",
        "options": [
          "It dismissed the claim.",
          "It postponed the case.",
          "It ruled for the claimant."
        ],
        "answer": 2
      }
    ]
  }
};
