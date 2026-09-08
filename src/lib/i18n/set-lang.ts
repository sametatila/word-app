"use client";

import { LANG_COOKIE } from "@/lib/i18n/cookie";
import type { NativeLang } from "@/lib/i18n/dict";

/**
 * Dil çerezini yazar — sunucunun sayfayı doğru dilde çizebilmesi için.
 *
 * Bir YIL: dil kullanıcının kalıcı tercihi ve her oturumda yeniden sorulmamalı.
 * `SameSite=Lax` yeterli, çünkü çerez yalnız hangi sözlüğün okunacağını
 * söylüyor — yetki taşımıyor. `Secure` yalnız HTTPS'te, yoksa yerel geliştirme
 * sunucusunda (http) çerez hiç yazılmaz.
 */
export function writeLangCookie(lang: NativeLang): void {
  try {
    const secure = location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${LANG_COOKIE}=${lang}; Path=/; Max-Age=31536000; SameSite=Lax${secure}`;
  } catch {
    /* çerez yazılamıyorsa arayüz varsayılan dilde kalır */
  }
}

export function readLangCookie(): string | null {
  try {
    const m = document.cookie.match(new RegExp(`(?:^|; )${LANG_COOKIE}=([^;]*)`));
    return m ? decodeURIComponent(m[1]) : null;
  } catch {
    return null;
  }
}
