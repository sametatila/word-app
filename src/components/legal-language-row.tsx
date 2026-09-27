import Link from "next/link";

/**
 * Hukuki sayfaların dil satırı: "Dil: Türkçe · English · Deutsch". Seçili dil
 * kalın düz metin, ötekiler bağlantı (`href`) ya da adresi değiştirmeyen
 * düğme (`onPick`, hesap silme sayfası). Kullananlar: `legal-shell`,
 * `lib/legal/impressum`, `account/delete/language-row`.
 *
 * `legal-shell` içinde değil, çünkü o dosya `server-only` yapılandırmayı
 * okuyor ve silme sayfasının satırı istemci bileşeni.
 */
export function LegalLanguageRow<L extends string>({
  label,
  locales,
  current,
  names,
  href,
  onPick,
  tagLang = false,
}: {
  label: string;
  /** Gösterim sırası (Impressum Almancayı başa alıyor). */
  locales: readonly L[];
  current: L;
  names: Record<L, string>;
  href?: (l: L) => string;
  onPick?: (l: L) => void;
  /** Dil adına `lang` özniteliği: ekran okuyucu "Deutsch"u Türkçe okumasın. */
  tagLang?: boolean;
}) {
  return (
    <p className="muted mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-body">
      <span>{label}:</span>
      {locales.map((l) =>
        l === current ? (
          <span key={l} lang={tagLang ? l : undefined} className="font-semibold text-[var(--text)]">
            {names[l]}
          </span>
        ) : href ? (
          <Link key={l} href={href(l)} hrefLang={l} className="underline-offset-4 hover:underline">
            {names[l]}
          </Link>
        ) : (
          <button
            key={l}
            type="button"
            lang={tagLang ? l : undefined}
            onClick={() => onPick?.(l)}
            className="underline-offset-4 hover:underline"
          >
            {names[l]}
          </button>
        ),
      )}
    </p>
  );
}
