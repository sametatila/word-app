import { NextResponse } from "next/server";
import { LANDING, PAIRS } from "@/content/landing";
import { appControl } from "@/lib/app-control";
import { offeredNativeLangs } from "@/lib/courses";
import { landingPath } from "@/lib/landing-path";
import { legalPath } from "@/lib/legal";
/* Dil adları kendi dillerinde (endonim), tek kaynaktan: dil seçicideki adlarla aynı. */
import { LANG_LABEL } from "@/lib/i18n/dict";
import { SITE_URL } from "@/lib/site";

/**
 * `/llms.txt` — dil modelleri için ürün özeti (llmstxt.org biçimi, Markdown).
 *
 * ChatGPT, Claude, Perplexity gibi asistanlar bir uygulamayı anlatırken
 * sayfayı çekip okuyor; tanıtım sayfası görsel bir vitrin, telefon
 * çerçeveleri ve kaydırma hareketiyle. Burada aynı bilgi düz metin: ne olduğu,
 * kime göre, hangi özellik, ne ücretsiz, ne Premium, hangi adres.
 *
 * METİN VİTRİNDEN (`src/content/landing.ts`), elle yazılmıyor: vitrin
 * değişince özet de değişiyor, iki kopya birbirinden ayrışamıyor. Ana metin
 * İngilizce (modellerin ortak dili), Türkçe ve Almanca giriş altta. Mağaza
 * bağlantıları yalnız panelde "yayında" işaretli mağaza için (tanıtım
 * sayfasındaki rozetlerle aynı kural).
 */
export const dynamic = "force-dynamic";

const abs = (path: string) => (path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`);

export async function GET() {
  const en = LANDING.en;
  const store = (await appControl()).store;
  const offered = new Set(offeredNativeLangs());
  const pairs = PAIRS.filter((p) => offered.has(p.native));
  /* Platformlar GERÇEK olan: mağaza yayında değilse yalnız web (tarayıcıdan ya
     da ana ekrana eklenerek). */
  const ios = store.ios.live && store.ios.url ? store.ios.url : null;
  const android = store.android.live && store.android.url ? store.android.url : null;
  const platforms = [ios ? "iPhone and iPad" : null, android ? "Android" : null, "the web"].filter(Boolean);
  const on = platforms.length > 1 ? `${platforms.slice(0, -1).join(", ")} and ${platforms.at(-1)}` : `${platforms[0]} (iPhone and Android apps are coming to the stores soon)`;

  const pillar = (p: { title: string; lede: string; more?: string[] }) =>
    [`### ${p.title}`, "", p.lede, ...(p.more ?? []).map((m) => `\n${m}`)].join("\n");

  const lines = [
    "# Lernomi",
    "",
    `> Lernomi is a language-learning app for German and English, from A1 to C1, on ${on}. Explanations, hints and feedback come in the learner's own language (Turkish, English or German), and learners practice by speaking: AI conversation with instant corrections, four-skill mock exams, a daily spaced-repetition word round and a hands-free Walk mode.`,
    "",
    `Website: ${abs("/")} (Turkish), ${abs(landingPath("en"))} (English), ${abs(landingPath("de"))} (German). No account is needed to start in the browser.`,
    "",
    "## Language paths",
    "",
    ...pairs.map(
      (p) => `- ${en.langs.course[p.course]} — ${en.langs.explained[p.native]}: A1–C1, ${en.langs.words[p.course]}`,
    ),
    "",
    en.langs.lede,
    "",
    `In numbers (German course): ${en.stats.map((s) => `${s.value} ${s.label}`).join(", ")}.`,
    "",
    "## Features",
    "",
    pillar(en.path),
    `\nEvery unit has: ${en.path.steps.join(", ")}.`,
    "",
    pillar(en.talk),
    "",
    pillar(en.exam),
    "",
    ...en.exam.rows.map((r) => `- ${r.local}: ${r.how}`),
    "",
    pillar(en.walk),
    "",
    ...en.walk.modes.map((m) => `- ${m.when}: ${m.what}`),
    "",
    pillar(en.daily),
    "",
    pillar(en.skills),
    "",
    `### ${en.start.title}`,
    "",
    en.start.body,
    "",
    "## Pricing",
    "",
    `${en.plans.title} ${en.plans.sub}`,
    "",
    `### ${en.plans.freeTitle}`,
    "",
    ...en.plans.free.map((x) => `- ${x}`),
    "",
    en.plans.earn,
    "",
    `### ${en.plans.premiumTitle}`,
    "",
    en.plans.premiumSub,
    "",
    ...en.plans.premium.map((x) => `- ${x}`),
    "",
    `${en.plans.packs} ${en.plans.trial}`,
    "",
    `## ${en.fine.accountTitle}`,
    "",
    ...en.fine.account.map((x) => `- ${x}`),
    `- ${en.fine.cert}`,
    `- ${en.fine.disclaimer}`,
    "",
    `## ${LANG_LABEL.tr}`,
    "",
    `${LANDING.tr.hero.line1} ${LANDING.tr.hero.line2} ${LANDING.tr.hero.intro}`,
    "",
    `Sayfa: ${abs("/")}`,
    "",
    `## ${LANG_LABEL.de}`,
    "",
    `${LANDING.de.hero.line1} ${LANDING.de.hero.line2} ${LANDING.de.hero.intro}`,
    "",
    `Seite: ${abs(landingPath("de"))}`,
    "",
    "## Links",
    "",
    `- [Lernomi (${LANG_LABEL.en})](${abs(landingPath("en"))})`,
    `- [Lernomi (${LANG_LABEL.tr})](${abs("/")})`,
    `- [Lernomi (${LANG_LABEL.de})](${abs(landingPath("de"))})`,
    ...(ios ? [`- [App Store](${ios})`] : []),
    ...(android ? [`- [Google Play](${android})`] : []),
    `- [Support](${abs(legalPath("support", "en"))})`,
    `- [Privacy policy](${abs(legalPath("privacy", "en"))})`,
    `- [Terms of use](${abs(legalPath("terms", "en"))})`,
    "",
  ];

  return new NextResponse(lines.join("\n"), {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
