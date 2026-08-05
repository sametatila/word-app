"use client";

import type { Round, RoundWord } from "@/lib/types";
import { IntroGame } from "@/components/games/intro-game";
import { ChoiceGame } from "@/components/games/choice-game";
import { MatchGame } from "@/components/games/match-game";
import { ArtikelGame } from "@/components/games/artikel-game";
import { ScrambleGame } from "@/components/games/scramble-game";
import { TypingGame } from "@/components/games/typing-game";
import { ClozeGame } from "@/components/games/cloze-game";
import { OrderGame } from "@/components/games/order-game";
import { PluralGame } from "@/components/games/plural-game";

const w = (id: number, de: string, artikel: string | null, tr: string): RoundWord => ({
  id,
  de,
  artikel,
  tr,
  typ: artikel ? "Nomen" : "Verb",
  niveau: "A1",
  beispiel: `Ich sehe ${de} jeden Tag.`,
  beispielTr: `Her gün ${tr} görüyorum.`,
  formen: artikel ? "-e" : "hat gemacht",
  isNew: false,
});

const ROUNDS: Round[] = [
  { id: "d1", game: "intro", word: w(1, "Frühstück", "das", "kahvaltı") },
  {
    id: "d2",
    game: "choice",
    word: w(2, "Bahnhof", "der", "tren istasyonu"),
    options: ["tren istasyonu", "kitap", "pencere", "kahvaltı"],
    direction: "de-tr",
  },
  {
    id: "d3",
    game: "match",
    words: [
      w(3, "Haus", "das", "ev"),
      w(4, "Buch", "das", "kitap"),
      w(5, "Straße", "die", "cadde"),
      w(6, "Wasser", "das", "su"),
      w(7, "Tür", "die", "kapı"),
    ],
  },
  { id: "d4", game: "artikel", word: w(8, "Fenster", "das", "pencere") },
  { id: "d5", game: "scramble", word: w(9, "Schlüssel", "der", "anahtar") },
  { id: "d6", game: "typing", word: w(10, "arbeiten", null, "çalışmak"), alternatives: ["schaffen"] },
  {
    id: "d7",
    game: "cloze",
    word: w(11, "Zug", "der", "tren"),
    sentence: "Der _____ fährt um acht Uhr ab.",
    sentenceTr: "Tren saat sekizde kalkıyor.",
    answer: "Zug",
    options: ["Zug", "Hund", "Tisch", "Baum"],
  },
  {
    id: "d8",
    game: "order",
    word: w(12, "Bahnhof", "der", "tren istasyonu"),
    tokens: ["am", "Ich", "dich", "hole", "Bahnhof"],
    answer: ["Ich", "hole", "dich", "am", "Bahnhof"],
    tail: ".",
    sentenceTr: "Seni tren istasyonundan alacağım.",
  },
  {
    id: "d9",
    game: "plural",
    word: w(13, "Arzt", "der", "doktor"),
    answer: "Ärzte",
    options: ["Ärzte", "Ärzten", "Arzt", "Ärzter"],
  },
];

/** Yalnızca geliştirme kontrolü için: tüm oyunları tek sayfada render eder. */
export default function DemoGames() {
  return (
    <div className="mx-auto max-w-2xl space-y-16 p-6">
      {ROUNDS.map((round) => (
        <section key={round.id} className="card p-5">
          <h2 className="muted mb-4 text-xs font-bold uppercase">{round.game}</h2>
          {round.game === "intro" && <IntroGame round={round} onDone={() => {}} />}
          {round.game === "choice" && <ChoiceGame round={round} onDone={() => {}} />}
          {round.game === "match" && <MatchGame round={round} onDone={() => {}} />}
          {round.game === "artikel" && <ArtikelGame round={round} onDone={() => {}} />}
          {round.game === "scramble" && <ScrambleGame round={round} onDone={() => {}} />}
          {round.game === "typing" && <TypingGame round={round} onDone={() => {}} />}
          {round.game === "cloze" && <ClozeGame round={round} onDone={() => {}} />}
          {round.game === "order" && <OrderGame round={round} onDone={() => {}} />}
          {round.game === "plural" && <PluralGame round={round} onDone={() => {}} />}
        </section>
      ))}
    </div>
  );
}
