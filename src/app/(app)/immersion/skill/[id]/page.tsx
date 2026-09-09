import { notFound } from "next/navigation";
import { getUserId } from "@/lib/auth/server";
import { getExercise, libraryMetas, listExerciseMeta } from "@/lib/skills";
import { listSkillStatus } from "@/lib/skills/record";
import { isLibraryExercise, targetLangOf } from "@/lib/skills/types";
import { PlayerFrame, type PlayerFrameValue } from "@/components/skills/player-context";
import { ReadingPlayer } from "@/components/skills/reading-player";
import { ListeningPlayer } from "@/components/skills/listening-player";
import { WritingPlayer } from "@/components/skills/writing-player";
import { SpeakingPlayer } from "@/components/skills/speaking-player";
import { MonologuePlayer } from "@/components/skills/monologue-player";
import { GrammarPlayer } from "@/components/skills/grammar-player";

export const dynamic = "force-dynamic";

/** Beceriler kütüphanesinde "bitti" eşiği — immersion/progress.ts ile aynı (70). */
const DONE_PCT = 70;

/**
 * Beceri egzersizi oynatıcısı — Patika öğeleri ve Beceriler kütüphanesi aynı
 * rotayı kullanır. Eski `/skills/[id]` buraya taşındı; /skills slug'ı kaldırıldı.
 *
 * Beş beceri: okuma, dinleme, yazma (Patika + kütüphane), konuşma ve dil bilgisi
 * (yalnız kütüphane, 2026-09). Konuşma iki biçim: söyleyiş drilli (`tasks`) ve
 * monolog (`monologue`); diyalog biçimi bugün içerikte yok, gelirse buraya dal
 * açılır.
 *
 * ÇERÇEVE: hedef dil, geri bağlantısı ve "sıradaki" egzersiz burada belirlenir
 * ve `PlayerFrame` ile bütün oynatıcılara iner. "Sıradaki", Beceriler'den
 * gelindiğinde (`?from=skills`) aynı kurs/seviye/becerideki bitmemiş bir sonraki
 * kütüphane egzersizi: öğrenci bitirdiği anda ne yapacağını görür, hub'a dönüp
 * aramaz. Patika'dan gelindiğinde sıradakini Patika'nın kendisi söyler.
 */
export default async function ImmersionSkillPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { id } = await params;
  const exercise = await getExercise(id);
  if (!exercise) notFound();
  // Aynı oynatıcıya iki yerden giriliyor; "geri" nereden gelindiyse oraya
  // dönmeli, yoksa Beceriler'den giren kullanıcı Patika'ya düşüyor.
  const from = (await searchParams)?.from;
  const fromSkills = from === "skills";
  const backHref = fromSkills ? `/skills?level=${exercise.level}` : "/immersion";

  const frame: PlayerFrameValue = {
    lang: targetLangOf(exercise),
    backHref,
    backLabel: fromSkills ? "item.back_to_skills" : "lesson.back_to_path",
    next: fromSkills && isLibraryExercise(exercise) ? await nextInLibrary(exercise.id, exercise.course ?? "de", exercise.level, exercise.skill) : null,
  };

  return <PlayerFrame value={frame}>{pickPlayer(exercise, backHref)}</PlayerFrame>;
}

function pickPlayer(exercise: NonNullable<Awaited<ReturnType<typeof getExercise>>>, backHref: string) {
  switch (exercise.skill) {
    case "reading":
      return <ReadingPlayer exercise={exercise} backHref={backHref} />;
    case "listening":
      return <ListeningPlayer exercise={exercise} backHref={backHref} />;
    case "writing":
      return <WritingPlayer exercise={exercise} backHref={backHref} />;
    case "grammar":
      return <GrammarPlayer exercise={exercise} backHref={backHref} />;
    case "speaking":
      if ("monologue" in exercise) return <MonologuePlayer exercise={exercise} backHref={backHref} />;
      if ("tasks" in exercise) return <SpeakingPlayer exercise={exercise} backHref={backHref} />;
      // Diyalog biçimi: içerikte yok, oynatıcısı da yok (WP-23 açık diyalog kaldırıldı).
      notFound();
    // eslint-disable-next-line no-fallthrough
    default:
      notFound();
  }
}

/**
 * Aynı kurs/seviye/becerideki, kütüphane sırasına göre bir sonraki BİTMEMİŞ
 * egzersiz. Önce mevcut egzersizden sonrakiler, sonra baştan; hepsi bitmişse
 * null (bitiş kartı yalnız "geri" gösterir). İlerleme okunamazsa sıradaki
 * yine hesaplanır — yalnız "bitmiş" süzgeci boş kalır.
 */
async function nextInLibrary(
  currentId: string,
  course: string,
  level: string,
  skill: string,
): Promise<{ href: string; title: string } | null> {
  const list = libraryMetas(await listExerciseMeta(course)).filter((m) => m.level === level && m.skill === skill);
  const at = list.findIndex((m) => m.id === currentId);
  if (list.length < 2) return null;
  let done = new Set<string>();
  try {
    const userId = await getUserId();
    if (userId) {
      const status = await listSkillStatus(userId, level);
      done = new Set(Object.entries(status).filter(([, s]) => (s.lastScore ?? 0) >= DONE_PCT).map(([k]) => k));
    }
  } catch (err) {
    console.error("[skill] sıradaki için ilerleme okunamadı", err);
  }
  const ordered = [...list.slice(at + 1), ...list.slice(0, Math.max(at, 0))].filter((m) => m.id !== currentId);
  const pick = ordered.find((m) => !done.has(m.id));
  return pick ? { href: `/immersion/skill/${pick.id}?from=skills`, title: pick.title } : null;
}
