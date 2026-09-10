import React from "react";
import { LearnIcon, ReadIcon, ListenIcon, WriteIcon, GrammarIcon, QuizIcon, CheckIcon } from "./icons";
import type { ItemKind } from "../data/unit";
import type { Palette } from "../theme";

/**
 * Ünite öğesinin TÜRÜ → ikon ve renk.
 *
 * İki ekranda ayrı ayrı yazılıydı (Patika'nın ünite listesi ve egzersiz
 * oynatıcısı) ve ikinci kopya EKSİKTİ: `lesson`, `quiz` ve `checkpoint` yoktu,
 * yani oynatıcı bir kontrol noktası açtığında rengi kırmızı yerine turuncuya
 * düşüyordu. Bugün o yol kullanılmıyor ama iki liste sessizce ayrışmıştı ve
 * ayrışma büyümeye açıktı.
 *
 * Web karşılığı `src/components/immersion/unit-pane.tsx` içinde tek yerde;
 * sekiz türün rengi iki platformda birebir aynı.
 */
/*
  TÜR BİRLEŞİMİ TEK YERDEN. Burada üçüncü bir kopya vardı ve içinde ölü bir
  `speak` taşıyordu: sunucu o türü hiç üretmiyor (bkz. `data/unit`). Dosyanın
  kendi notu iki kopyanın sessizce ayrıştığını anlatıyor; üçüncüsü de aynı
  yoldaydı. Artık `data/unit` içindeki tek tanım kullanılıyor, yani sunucunun
  kümesi değiştiğinde derleyici burayı da zorluyor.
*/
export const KIND_TINT: Record<ItemKind, keyof Palette> = {
  lesson: "primary",
  read: "info",
  listen: "accent",
  write: "success",
  grammar: "streak",
  quiz: "primary",
  checkpoint: "danger",
};

const ICONS: Record<ItemKind, (p: { color: string; size: number }) => React.ReactElement> = {
  lesson: (p) => <LearnIcon {...p} />,
  read: (p) => <ReadIcon {...p} />,
  listen: (p) => <ListenIcon {...p} />,
  write: (p) => <WriteIcon {...p} />,
  grammar: (p) => <GrammarIcon {...p} />,
  quiz: (p) => <QuizIcon {...p} />,
  checkpoint: (p) => <CheckIcon {...p} />,
};

/** Türün ikonu; tanınmayan tür için `null` (çizen yer boş bırakır). */
export function kindIcon(kind: string): ((p: { color: string; size: number }) => React.ReactElement) | null {
  return ICONS[kind as ItemKind] ?? null;
}

/** Türün renk anahtarı; tanınmayan tür marka rengine düşer. */
export function kindTint(kind: string): keyof Palette {
  return KIND_TINT[kind as ItemKind] ?? "primary";
}
