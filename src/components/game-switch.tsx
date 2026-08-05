"use client";

import type { Round } from "@/lib/types";
import type { GameResult } from "@/components/games/types";
import { IntroGame } from "@/components/games/intro-game";
import { ChoiceGame } from "@/components/games/choice-game";
import { MatchGame } from "@/components/games/match-game";
import { ArtikelGame } from "@/components/games/artikel-game";
import { ScrambleGame } from "@/components/games/scramble-game";
import { TypingGame } from "@/components/games/typing-game";
import { ClozeGame } from "@/components/games/cloze-game";
import { OrderGame } from "@/components/games/order-game";

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
  }
}
