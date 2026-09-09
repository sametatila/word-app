import Link from "next/link";
import { titleMeta } from "@/lib/page-meta";
import { PageBack } from "@/components/page-back";
import { getUserInfo } from "@/lib/auth/server";
import { ensureProfile } from "@/lib/session";
import { courseOrDefault } from "@/lib/courses";
import { GAME_LABEL_KEYS, type GameId } from "@/lib/types";
import { getT } from "@/lib/i18n/server";
import { ChevronRightIcon } from "@/components/icons";

export const generateMetadata = titleMeta("learn.practice");
export const dynamic = "force-dynamic";

/**
 * Tek oyunlu pratik — web'de SEÇİCİ yoktu.
 *
 * Oturum oynatıcısı `?game=` parametresini okuyup turu tek oyuna kısıtlıyor
 * (session-player). Yani yetenek aylardır vardı, ama o adrese yalnız BAĞLAMSAL
 * yerlerden gidiliyordu: hata analizinin "şunu çalış" önerisi ve günlük planın
 * hedefi. Kullanıcının kendi isteğiyle "bugün artikel çalışayım" demesinin bir
 * yolu yoktu. Mobilde bu ekran (Pratik) baştan beri var.
 *
 * Liste kursa göre süzülüyor: artikel ve çoğul yalnız Almancada anlamlı,
 * İngilizce kursunda o iki oyun boş tur üretirdi.
 */
const GAMES: { game: GameId; hint: string }[] = [
  { game: "choice", hint: "prac.choice" },
  { game: "artikel", hint: "prac.artikel" },
  { game: "cloze", hint: "prac.cloze" },
  { game: "typing", hint: "prac.typing" },
  { game: "listen", hint: "prac.listen" },
  { game: "truefalse", hint: "prac.truefalse" },
  { game: "match", hint: "prac.match" },
  { game: "scramble", hint: "prac.scramble" },
  { game: "order", hint: "prac.order" },
  { game: "plural", hint: "prac.plural" },
  { game: "translate", hint: "prac.translate" },
];

export default async function PracticePage() {
  const t = await getT();
  const user = await getUserInfo();
  if (!user) return null;

  let course = "de";
  try {
    course = (await ensureProfile(user.id, user.name)).course;
  } catch (err) {
    console.error("[practice] profil okunamadı", err);
  }
  // Artikel ve çoğul dile bağlı: hedef dil Almanca değilse o oyunlar listelenmez.
  const german = courseOrDefault(course).targetLang === "de";
  const list = GAMES.filter((g) => german || (g.game !== "artikel" && g.game !== "plural"));

  return (
    <div className="mx-auto w-full max-w-2xl space-y-5">
      <PageBack fallback="/learn" title="Pratik" subtitle="Kendi kelimelerinle tek oyun" />
      <ul className="card divide-y overflow-hidden" style={{ borderColor: "var(--border)" }}>
        {list.map(({ game, hint }) => (
          <li key={game}>
            <Link href={`/learn/game?game=${game}`} className="flex items-center gap-3 px-4 py-3.5">
              <span className="min-w-0 flex-1">
                <span className="block font-semibold">{t(GAME_LABEL_KEYS[game])}</span>
                <span className="muted block text-xs">{t(hint)}</span>
              </span>
              <ChevronRightIcon size={18} className="shrink-0" style={{ color: "var(--text-faint)" }} />
            </Link>
          </li>
        ))}
      </ul>
      <p className="muted px-1 text-xs leading-relaxed">
        {t("prac.note")}
      </p>
    </div>
  );
}
