"use client";

import { useEffect } from "react";
import type { Round } from "@/lib/types";

type IntroRound = Extract<Round, { game: "intro" }>;
import type { GameResult } from "@/components/games/types";
import { IntroGame } from "@/components/games/intro-game";
import { ChoiceGame } from "@/components/games/choice-game";
import { MatchGame } from "@/components/games/match-game";
import { ArtikelGame } from "@/components/games/artikel-game";
import { ScrambleGame } from "@/components/games/scramble-game";
import { TypingGame } from "@/components/games/typing-game";
import { ClozeGame } from "@/components/games/cloze-game";
import { OrderGame } from "@/components/games/order-game";
import { PluralGame } from "@/components/games/plural-game";
import { ListenGame } from "@/components/games/listen-game";
import { TrueFalseGame } from "@/components/games/truefalse-game";
import { TranslateGame } from "@/components/games/translate-game";
import { FreeSentenceGame } from "@/components/games/free-sentence-game";

/** Tur tipine göre doğru oyunu render eder — hem normal turda hem meydan okumada. */
export function GameSwitch({
  round,
  onDone,
}: {
  round: Round;
  onDone: (r: GameResult[]) => void;
}) {
  switch (round.game) {
    case "intro":
      return <IntroGame round={round} onDone={onDone} />;
    case "choice":
      return <ChoiceGame round={round} onDone={onDone} />;
    case "match":
      return <MatchGame round={round} onDone={onDone} />;
    case "artikel":
      return <ArtikelGame round={round} onDone={onDone} />;
    case "scramble":
      return <ScrambleGame round={round} onDone={onDone} />;
    case "typing":
      return <TypingGame round={round} onDone={onDone} />;
    case "cloze":
      return <ClozeGame round={round} onDone={onDone} />;
    case "order":
      return <OrderGame round={round} onDone={onDone} />;
    case "plural":
      return <PluralGame round={round} onDone={onDone} />;
    case "listen":
      return <ListenGame round={round} onDone={onDone} />;
    case "truefalse":
      return <TrueFalseGame round={round} onDone={onDone} />;
    case "translate":
      return <TranslateGame round={round} onDone={onDone} />;
    case "free_sentence":
      return <FreeSentenceGame round={round} onDone={onDone} />;
  }
  /*
   * TANIMADIĞI TUR EKRANI DÜŞÜRMESİN.
   *
   * `switch`in dalları tükendiğinde bileşen `undefined` döndürüyordu ve React
   * bunu hata sayıyor: sunucu istemciden yeni olduğunda (yeni bir tur türü
   * eklendiğinde ya da `speak` gibi başka bir yüzeye ait bir tur sızdığında)
   * oturumun tamamı çöküyordu. Android bilmediği turu kendi kendine
   * değerlendirmeye düşürüyor (`game/rounds` `SelfAssess`); web de kelimeyi
   * gösterip devam ettiriyor, kelime yoksa turu atlıyor.
   */
  const unknown = round as { word?: IntroRound["word"] };
  if (!unknown.word) return <SkipRound onDone={onDone} />;
  return <IntroGame round={{ id: round.id, game: "intro", word: unknown.word }} onDone={onDone} />;
}

/** Oynatılamayan turu sessizce geçer — render sırasında değil, efektte. */
function SkipRound({ onDone }: { onDone: (r: GameResult[]) => void }) {
  useEffect(() => {
    onDone([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
