import { notFound } from "next/navigation";
import Link from "next/link";
import { getUserId, getUserInfo } from "@/lib/auth/server";
import { getT } from "@/lib/i18n/server";
import { LockIcon } from "@/components/icons";
import { StateBody } from "@/components/flow";
import { gatedSkillKind, isSkillLocked, skillLibraryAccess } from "@/lib/premium/skill-access";
import { gateNote } from "@/lib/premium/gate-note";
import { exerciseQuota } from "@/lib/premium/unlock-view";
import { UnlockProgress } from "@/components/unlock-progress";
import { getExercise, libraryMetas, listExerciseMeta } from "@/lib/skills";
import { listSkillStatus } from "@/lib/skills/record";
import { isSkillDone } from "@/lib/score-bands";
import { isLibraryExercise, targetLangOf } from "@/lib/skills/types";
import { PlayerFrame, type PlayerFrameValue } from "@/components/skills/player-context";
import { ReadingPlayer } from "@/components/skills/reading-player";
import { ListeningPlayer } from "@/components/skills/listening-player";
import { WritingPlayer } from "@/components/skills/writing-player";
import { SpeakingPlayer } from "@/components/skills/speaking-player";
import { MonologuePlayer } from "@/components/skills/monologue-player";
import { GrammarPlayer } from "@/components/skills/grammar-player";
import { titleMeta } from "@/lib/page-meta";
import { ensureProfile } from "@/lib/session";
import { localiseExercise } from "@/lib/lessons/native-server";
import { isNativeLang } from "@/lib/i18n/dict";

export const dynamic = "force-dynamic";

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
export const generateMetadata = titleMeta("skills.skills");

export default async function ImmersionSkillPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { id } = await params;
  const source = await getExercise(id);
  if (!source) notFound();

  /* PREMIUM KİLİDİ doğrudan adresle girilince de geçerli: liste kilitli satırı
     planlara götürüyor ama adres paylaşılabiliyor. Oynatıcı açılsaydı öğrenci
     yazısını yazıp ancak gönderirken 403 görürdü (bkz. lib/premium/skill-access). */
  const lockedNote = await lockNote(source);
  /* KALAN HAK VE NASIL AÇILIR (2026-09-25). Kapılı alıştırmada (Beceriler
     yazma/B1+ monolog, Patika Yazma) kilit kartının ve oynatıcının üstünde
     aynı gösterge: ✓ koşullar, seri çubuğu, ne zaman açılır, Premium'la hemen. */
  const quota = await quotaFor(source);
  if (lockedNote) {
    const t = await getT();
    return (
      <div className="mx-auto w-full max-w-md space-y-3">
        <StateBody icon={<LockIcon size={40} className="muted mx-auto" />} title={t("gate.premium_only")} body={lockedNote}>
          {quota ? null : (
            <Link href="/premium" prefetch={false} className="btn btn-primary w-full px-4 py-2.5 text-body">
              {t("gate.see_plans")}
            </Link>
          )}
          <Link href={`/skills?level=${source.level}`} className="btn btn-ghost mt-2 w-full px-4 py-2.5 text-body">
            {t("item.back_to_skills")}
          </Link>
        </StateBody>
        {quota ? <UnlockProgress copy={quota.copy} /> : null}
      </div>
    );
  }

  /* YÖNERGE VE AÇIKLAMA öğrencinin dilinde. Metin, soru kökü ve şıklar
     öğrenilen dilde kalıyor — egzersizin ölçtüğü şey onlar. Çeviri BURADA,
     `getExercise`te değil: öteki üç çağıran (puanlama, kayıt, rol yapma uç
     noktası) düz metni hiç kullanmıyor ve orada 1,7 MB sözlük boşa yüklenir.
     Hep-ya-hiç: bir dize bile eksikse egzersiz tümüyle Türkçe kalıyor. */
  let exercise = source;
  try {
    const userId = await getUserId();
    const profile = userId ? await ensureProfile(userId) : null;
    const lang = isNativeLang(profile?.nativeLang) ? profile.nativeLang : null;
    exercise = await localiseExercise(source, lang);
  } catch (err) {
    // Log Türkçe DEĞİL, bilerek: `i18n-hardcoded` cırcırlı tabanı dosya
    // başına sayıyor ve buraya Türkçe bir cümle eklemek tabanı yükseltirdi.
    // Tanımlayıcı artı hata nesnesi teşhis için zaten yeterli.
    console.error("[skill] localiseExercise", err);
  }
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

  /* Patika Yazma adımı KİLİTLENMİYOR: hak yoksa yazı yine yazılıp bitirilebiliyor,
     yalnız yapay zekâ puanı gelmiyor. O durumda (bu alıştırmaya hak düşmemişse)
     oynatıcının üstünde nasıl açılacağı yazıyor. */
  const banner = quota && !quota.owned && quota.remaining <= 0 ? <UnlockProgress copy={quota.copy} /> : null;
  return (
    <PlayerFrame value={frame}>
      {banner ? <div className="mx-auto mb-3 w-full max-w-2xl">{banner}</div> : null}
      {pickPlayer(exercise, backHref)}
    </PlayerFrame>
  );
}

/** Kapılı alıştırmanın kotası (misafir ve premium'da null). */
async function quotaFor(exercise: NonNullable<Awaited<ReturnType<typeof getExercise>>>) {
  const kind =
    exercise.unit != null ? (exercise.skill === "writing" ? "writing" : null) : gatedSkillKind(exercise as typeof exercise & { monologue?: unknown });
  if (!kind) return null;
  try {
    const who = await getUserInfo();
    return who ? await exerciseQuota(who, { id: exercise.id, level: exercise.level, unit: exercise.unit ?? null }, kind) : null;
  } catch (err) {
    console.error("[skill] quotaFor", err);
    return null;
  }
}

/** Kilitliyse gösterilecek tek satır (kota durumu), değilse null. */
async function lockNote(exercise: NonNullable<Awaited<ReturnType<typeof getExercise>>>): Promise<string | null> {
  if (!gatedSkillKind(exercise as typeof exercise & { monologue?: unknown })) return null;
  try {
    const who = await getUserInfo();
    if (!who || who.guest) return null;
    const access = await skillLibraryAccess(who.id, exercise.level);
    if (!isSkillLocked({ id: exercise.id, skill: exercise.skill, unit: exercise.unit ?? null, level: exercise.level }, access)) return null;
    const kind = gatedSkillKind(exercise as typeof exercise & { monologue?: unknown });
    const note = kind ? gateNote(access[kind]) : null;
    const t = await getT();
    return note ? `${t("skills.ai_quota")} · ${t(note.key, { n: note.n })}` : t("skills.ai_quota");
  } catch (err) {
    console.error("[skill] lockNote", err);
    return null;
  }
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
      done = new Set(Object.entries(status).filter(([, s]) => isSkillDone(s.lastScore)).map(([k]) => k));
    }
  } catch (err) {
    console.error("[skill] sıradaki için ilerleme okunamadı", err);
  }
  const ordered = [...list.slice(at + 1), ...list.slice(0, Math.max(at, 0))].filter((m) => m.id !== currentId);
  const pick = ordered.find((m) => !done.has(m.id));
  return pick ? { href: `/immersion/skill/${pick.id}?from=skills`, title: pick.title } : null;
}
