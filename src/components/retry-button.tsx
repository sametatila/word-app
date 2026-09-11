"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RefreshIcon } from "@/components/icons";
import { useT } from "@/lib/i18n/client";

/**
 * "Tekrar dene" — sunucuda çizilen bir hata kartının içinden.
 *
 * Sunucu bileşeni kendi verisini okuyamayınca kullanıcıya bir kart gösteriyor
 * ve kart ÇIKMAZDI: tek yol sekmeden çıkıp geri gelmek ya da sayfayı elle
 * yenilemekti. Oysa sebep çoğu zaman geçici (bağlantı kesintisi, veritabanı
 * hıçkırığı) ve Android aynı yerde birincil bir "tekrar dene" gösteriyor.
 *
 * `router.refresh()` sunucu çizimini yeniden çalıştırıyor — sayfa yeniden
 * yüklenmiyor, yani sekme çubuğu, kaydırma yeri ve istemci durumu yerinde
 * kalıyor. Basılı kalırken "yenileniyor" demesi, cevap gecikirse ikinci kez
 * basılmasını önlüyor.
 */
export function RetryButton({ className }: { className?: string }) {
  const t = useT();
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  return (
    <button
      type="button"
      disabled={busy}
      onClick={() => {
        setBusy(true);
        router.refresh();
        // Sunucu çizimi bitince bu bileşen yeniden kuruluyor; yine de kart
        // aynı kalırsa (hata sürüyorsa) düğme kilitli kalmasın.
        setTimeout(() => setBusy(false), 3000);
      }}
      className={className ?? "btn btn-primary mt-4 flex items-center gap-2 px-5 py-3"}
    >
      <RefreshIcon size={18} /> {t(busy ? "common.loading" : "common.try_again")}
    </button>
  );
}
