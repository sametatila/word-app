"use client";

import type { ReactNode } from "react";
import { useT } from "@/lib/i18n/client";

/**
 * İSKELETİN EKRAN OKUYUCUYA "MEŞGUL" DEDİĞİ YER.
 *
 * On dört `loading.tsx` dosyası da gelecek düzenin şeklini doğru çiziyordu —
 * ama hiçbiri kendini DUYURMUYORDU ve on dördünün kökü `aria-hidden`dı. Yani
 * sesli okuyucu kullanan biri bir sekmeye geçtiğinde hiçbir şey duymuyor:
 * ekran sessizce boş kalıyor, sonra içerik bir anda ortaya çıkıyor.
 *
 * Mobil bunu KÖKTE çözmüştü ve gerekçesi orada yazılı (`ui/Skeleton`
 * `SkeletonCard`: "İskelet yalnız GÖRSEL bir işaretti: sesli okuyucu kullanan
 * biri boş bir ekran duyuyor, uygulamanın çalışıp çalışmadığını bilmiyor").
 * Web'in `SkeletonCard`ı da `role="status" aria-busy` taşıyor — eksik olan
 * ROTA seviyesindeki yedeklerdi.
 *
 * `aria-hidden` KÖKTEN İÇERİ TAŞINIYOR: kökte kalırsa etiketin kendisi de
 * gizlenir ve bölge hiç duyurulmaz. Çubukların metni olmadığı için ayrıca
 * gizlemek de gerekmiyor; yalnız etiket duyuruluyor.
 *
 * İstemci bileşeni, çünkü etiket çeviriden geliyor ve `loading.tsx` bir
 * Suspense yedeği: orada `await` etmek yedeğin kendisini askıya alırdı.
 */
export function LoadingRegion({ children, className = "" }: { children: ReactNode; className?: string }) {
  const t = useT();
  return (
    <div role="status" aria-busy="true" aria-label={t("social.loading")} className={className}>
      {children}
    </div>
  );
}
