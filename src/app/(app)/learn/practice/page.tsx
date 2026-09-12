import Link from "next/link";
import type { SVGProps } from "react";
import { titleMeta } from "@/lib/page-meta";
import { PageBack } from "@/components/page-back";
import { CardGrid } from "@/components/layout";
import { getUserInfo } from "@/lib/auth/server";
import { ensureProfile } from "@/lib/session";
import { courseOrDefault } from "@/lib/courses";
import { GAME_LABEL_KEYS, type GameId } from "@/lib/types";
import { getT } from "@/lib/i18n/server";
import {
  ArrowRightIcon,
  BoltIcon,
  CardsIcon,
  CheckIcon,
  KeyboardIcon,
  ListenIcon,
  PuzzleIcon,
  QuizIcon,
  SortIcon,
  StackIcon,
  TagIcon,
  TranslateIcon,
  WriteIcon,
} from "@/components/icons";

export const generateMetadata = titleMeta("practice.practice");
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
 * ## Düzen mobilden
 *
 * İlk web sürümü düz bir listeydi: on bir satır, hepsi aynı ağırlıkta, ayırt
 * edici tek şey adları. Mobildeki ekran (`M/src/screens/PracticeScreen.tsx`)
 * iki şeyi başka türlü yapıyor ve ikisi de bilerek:
 *
 *   - Üstte KARIŞIK tur duruyor. Pratiğe giren herkes tek oyun istemiyor;
 *     "bugün ne çalışsam" diye bakan kullanıcının varsayılan cevabı karışık
 *     tur ve o karar burada verilmeli, başka bir sekmede değil.
 *   - Oyunlar karo. Renkli simge karoyu bir ADA yapıyor: kullanıcı üçüncü
 *     ziyaretinde adı okumadan, rengiyle "artikel olan" karoya gidiyor. Düz
 *     listede o hafıza hiç kurulmuyor.
 *
 * Liste kursa göre süzülüyor: artikel ve çoğul yalnız Almancada anlamlı,
 * İngilizce kursunda o iki oyun boş tur üretirdi.
 */
type Tile = {
  game: GameId;
  hint: string;
  Icon: (props: SVGProps<SVGSVGElement> & { size?: number }) => React.ReactElement;
  tone: string;
};

/*
  Simge oyunun NE YAPTIĞINI söylemeli ve iki karo aynı görünmemeli — eşleme
  mobildekiyle birebir aynı (orada `META`). Renkler de aynı sırada: mobilin
  `primary/streak/info/success/accent` beşlisinin web karşılıkları.
*/
/*
 * OYUN GLIFLERI UYGULAMANIN KENDI SOZLUGUNDEN.
 *
 * Uc karo YAKIN KOPYA ikon cizyordu: secmeli soruda `QuestionIcon`
 * (`QuizIcon`in neredeyse ayni ikizi), bosluk doldurmada `PenIcon`
 * (`WriteIcon`in ikizi), dinlemede `HeadphonesIcon` (`ListenIcon`in ikizi).
 * Uclusu de setin BASKA bir isi icin ayrilmis glifleri: `PenIcon` ve
 * `HeadphonesIcon` iki platformda da BASARIM rozetlerinin glifi
 * (`achievement-badge` / `ui/achievementIcon`), `ListenIcon`/`WriteIcon`/
 * `QuizIcon` ise ADIM TURUNUN glifi (`immersion/unit-pane` / `ui/unitKind`).
 * Yani ayni oyun, ayni ekranda, Androidde bir glif webde baskasi; ustune web
 * kendi icinde de ayrisiyordu (patika ile pratik ayni oyuna iki ikon).
 * Tonlar zaten birebirdi (brand=primary, flame=streak, sky=info,
 * mint=success, violet=accent) - ayrisan yalniz gliflerdi.
 */
const TILES: Tile[] = [
  { game: "choice", hint: "prac.choice", Icon: QuizIcon, tone: "var(--color-brand-500)" },
  { game: "artikel", hint: "prac.artikel", Icon: TagIcon, tone: "var(--color-flame-500)" },
  { game: "cloze", hint: "prac.cloze", Icon: WriteIcon, tone: "var(--color-sky-500)" },
  { game: "typing", hint: "prac.typing", Icon: KeyboardIcon, tone: "var(--color-mint-500)" },
  { game: "listen", hint: "prac.listen", Icon: ListenIcon, tone: "var(--color-violet-500)" },
  { game: "truefalse", hint: "prac.truefalse", Icon: CheckIcon, tone: "var(--color-brand-500)" },
  { game: "match", hint: "prac.match", Icon: CardsIcon, tone: "var(--color-sky-500)" },
  { game: "scramble", hint: "prac.scramble", Icon: PuzzleIcon, tone: "var(--color-flame-500)" },
  { game: "order", hint: "prac.order", Icon: SortIcon, tone: "var(--color-violet-500)" },
  { game: "plural", hint: "prac.plural", Icon: StackIcon, tone: "var(--color-mint-500)" },
  { game: "translate", hint: "prac.translate", Icon: TranslateIcon, tone: "var(--color-brand-500)" },
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
  /* Eleme kursun KENDİ bayrağına bakıyor, hedef dilin adına değil: artikel
     Almancaya değil dilin cinsiyetli isim sistemine ait bir özellik. Mobil
     de aynı bayrağı kullanıyor (`supportsGame`). */
  const articles = courseOrDefault(course).hasArticles;
  const list = TILES.filter((g) => articles || (g.game !== "artikel" && g.game !== "plural"));

  return (
    <div className="mx-auto w-full max-w-3xl space-y-5">
      <PageBack
        fallback="/learn"
        title={t("practice.practice")}
        subtitle={t("practice.practice_one_game_with_your_own")}
      />

      {/* KARIŞIK TUR — ekranın kahramanı. Pratik ekranına gelen herkes tek
          oyun aramıyor; "bugün ne çalışsam" sorusunun varsayılan cevabı bu ve
          karar burada verilebilmeli. Mobilde de listenin üstünde duruyor. */}
      <Link
        href="/learn/game"
        className="pressable flex items-center gap-3 rounded-card p-5 glow-tint-lg"
        style={{ background: "var(--brand-fill)", color: "var(--on-brand)", "--tint-fill": "var(--brand-fill)" } as React.CSSProperties}
      >
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-tile bg-white/20">
          <BoltIcon size={24} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-h3">{t("practice.mixed_round")}</span>
          <span className="block text-caption opacity-90">{t("practice.all_game_types_in_one")}</span>
        </span>
        <ArrowRightIcon size={20} className="shrink-0" />
      </Link>

      <section className="space-y-3">
        <h2 className="muted text-micro uppercase tracking-eyebrow">{t("practice.single_game")}</h2>
        <CardGrid min={150}>
          {list.map(({ game, hint, Icon, tone }) => (
            <Link
              key={game}
              href={`/learn/game?game=${game}`}
              className="pressable card flex min-h-[8.25rem] flex-col justify-between gap-3 p-4"
            >
              <span
                className="flex h-11 w-11 items-center justify-center rounded-tile text-white glow-tint-sm"
                style={{ background: tone, "--tint-fill": tone } as React.CSSProperties}
              >
                <Icon size={22} />
              </span>
              <span>
                <span className="block text-h3">{t(GAME_LABEL_KEYS[game])}</span>
                {/* Mobilde karoda yalnız ad var; web'de satır sığıyor ve
                    "cloze" ile "scramble" arasındaki farkı ad tek başına
                    anlatmıyor. Parite düzenin dili demek, webde fazla olanı
                    atmak değil. */}
                <span className="muted block text-caption">{t(hint)}</span>
              </span>
            </Link>
          ))}
        </CardGrid>
      </section>

      <p className="muted px-1 text-caption leading-relaxed">{t("prac.note")}</p>
    </div>
  );
}
