import { translate, type NativeLang } from "@/lib/i18n/dict";
import { courseName } from "@/lib/courses";
import { track } from "@/lib/track";

/**
 * Davet paylaşımı — mobil `M/src/lib/share.ts`in karşılığı.
 *
 * İKİ ŞEY MOBİLDEN AYRIYDI. Metin sabit Türkçe yazılıydı ("Almanca
 * çalışıyorum, sen de gel…"), yani arayüz İngilizce ya da Almanca olsa bile
 * davet Türkçe gidiyordu. Ve bağlantı `?src=invite` taşıyordu: kimin davet
 * ettiği hiçbir yerde yazmadığı için ödül üretmiyordu. Mobil ikisini de
 * yapıyor — `t("share.invite", { lang, link })` ve `?code=<davet kodu>`.
 *
 * Kod isteğe bağlı: yoksa bağlantı yine paylaşılıyor, yalnız ödül bağlanmıyor.
 * Paylaşımı büsbütün engellemek daha kötü olurdu.
 */
export function inviteText(lang: NativeLang, course: string | null | undefined, code?: string | null): string {
  const origin = typeof window === "undefined" ? "https://www.lernomi.app" : window.location.origin;
  const link = code ? `${origin}/premium?code=${code}` : origin;
  return translate(lang, "share.invite", { lang: courseName(course, lang), link });
}

/**
 * Paylaşım sayfası, yoksa pano. Dönen değer panoya DÜŞÜLDÜ mü — arayüz
 * "kopyalandı" diyebilsin diye; yerli paylaşım açıldığında bir şey demiyor.
 */
export async function shareInvite(text: string): Promise<"shared" | "copied" | "failed"> {
  return shareText(text, "invite");
}

/**
 * TUR SONUCU METNİ — mobil `shareResult`ın karşılığı.
 *
 * Mobil aynı anahtarı (`share.result`) kullanıyor ve bağlantıya `?ref=sonuc`
 * ekliyor; web'de aynı işaret kalıyor ki iki platformdan gelen paylaşımlar
 * tek yerde sayılabilsin.
 */
export function resultText(lang: NativeLang, correct: number, total: number): string {
  const origin = typeof window === "undefined" ? "https://www.lernomi.app" : window.location.origin;
  return translate(lang, "share.result", { total, correct, link: `${origin}?ref=sonuc` });
}

/**
 * Paylaşım sayfası, yoksa pano. `kind` olay etiketine gidiyor: davet ile tur
 * sonucu ayrı sayılıyor (mobil de öyle yapıyor - `track("share", …, "result")`).
 */
export async function shareText(text: string, kind: "invite" | "result"): Promise<"shared" | "copied" | "failed"> {
  track("share", 0, kind);
  try {
    if (navigator.share) {
      await navigator.share({ text });
      return "shared";
    }
  } catch {
    /* paylaşım sayfası kapatıldıysa panoya düşülür */
  }
  try {
    await navigator.clipboard.writeText(text);
    return "copied";
  } catch {
    /* pano da yoksa kullanıcı bir şey kaybetmiyor, tekrar deneyebilir */
    return "failed";
  }
}
