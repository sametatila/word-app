import type { ReactNode } from "react";

/**
 * E-posta adresi Cloudflare'in "Email Address Obfuscation" gizlemesinin DIŞINDA.
 *
 * NEDEN (2026-09-30): Cloudflare vekili sayfadaki her e-posta biçimini HTML'de
 * "[email protected]" + `/cdn-cgi/l/email-protection` bağlantısına çeviriyor ve
 * tarayıcıda JavaScript ile geri açıyor. Destek sayfası App Store / Play'in
 * "Support URL" alanında; künye (DDG §5) ve gizlilik politikası iletişim
 * bilgisini doğrudan okunur vermeli. Ham sayfada adres görünmüyordu.
 *
 * Cloudflare'in belgelenmiş yolu: `<!--email_off-->…<!--/email_off-->` arasındaki
 * kısım gizlenmiyor. React yorum düğümü basamadığı için bu küçük parça
 * `dangerouslySetInnerHTML` ile yazılıyor; içerik burada kaçırılıyor (adres
 * panelden gelen serbest metin olabilir).
 */
const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function EmailOff({ text, href, className }: { text: string; href?: string; className?: string }) {
  const inner = href
    ? `<a href="${esc(href)}"${className ? ` class="${esc(className)}"` : ""}>${esc(text)}</a>`
    : esc(text);
  return <span dangerouslySetInnerHTML={{ __html: `<!--email_off-->${inner}<!--/email_off-->` }} />;
}

const EMAIL_RE = /[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g;

/** Düz metindeki adresleri `EmailOff` ile sarar; adres yoksa metni olduğu gibi döner. */
export function withEmailsOff(text: string, keyPrefix: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let i = 0;
  for (const m of text.matchAll(EMAIL_RE)) {
    const at = m.index ?? 0;
    if (at > last) out.push(text.slice(last, at));
    out.push(<EmailOff key={`${keyPrefix}-e${i++}`} text={m[0]} />);
    last = at + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}
