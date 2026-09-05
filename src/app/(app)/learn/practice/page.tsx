import Link from "next/link";
import { PageBack } from "@/components/page-back";
import { getUserInfo } from "@/lib/auth/server";
import { ensureProfile } from "@/lib/session";
import { courseOrDefault } from "@/lib/courses";
import { GAME_LABELS, type GameId } from "@/lib/types";
import { ChevronRightIcon } from "@/components/icons";

export const metadata = { title: "Pratik" };
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
  { game: "choice", hint: "Dört şıktan doğru anlamı seç" },
  { game: "artikel", hint: "der, die, das — hızlı karar" },
  { game: "cloze", hint: "Cümledeki boşluğu doldur" },
  { game: "typing", hint: "Kelimeyi yazarak hatırla" },
  { game: "listen", hint: "Duyduğun kelimeyi tanı" },
  { game: "truefalse", hint: "Eşleşme doğru mu, değil mi" },
  { game: "match", hint: "Kelime ve anlamı eşleştir" },
  { game: "scramble", hint: "Karışık harflerden kelimeyi kur" },
  { game: "order", hint: "Cümleyi doğru sıraya diz" },
  { game: "plural", hint: "Çoğul biçimini bil" },
  { game: "translate", hint: "Cümleyi hedef dile çevir" },
];

export default async function PracticePage() {
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
            <Link href={`/learn?game=${game}`} className="flex items-center gap-3 px-4 py-3.5">
              <span className="min-w-0 flex-1">
                <span className="block font-semibold">{GAME_LABELS[game]}</span>
                <span className="muted block text-xs">{hint}</span>
              </span>
              <ChevronRightIcon size={18} className="shrink-0" style={{ color: "var(--text-faint)" }} />
            </Link>
          </li>
        ))}
      </ul>
      <p className="muted px-1 text-xs leading-relaxed">
        Tur, aralıklı tekrar kuyruğundan senin kelimelerinle kurulur; oyun türü
        sabit kalır. Karışık çalışmak için Öğren sekmesindeki normal turu kullan.
      </p>
    </div>
  );
}
