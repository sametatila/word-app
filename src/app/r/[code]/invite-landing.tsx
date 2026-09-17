import Link from "next/link";
import { Avatar } from "@/components/avatar";

/**
 * Davetiye — girişsiz ziyaretçinin gördüğü tek ekran.
 *
 * ÜÇ SORUYA CEVAP VERİYOR, bu sırayla: kim davet etti · ne olacak · ne
 * yapmam gerekiyor. Sıra önemli: ziyaretçi uygulamayı çoğu zaman hiç
 * duymamış, o yüzden önce TANIDIĞI şey (arkadaşının adı ve avatarı) geliyor,
 * ürün anlatısı en sonda.
 *
 * KOD EKRANDA HİÇ GÖRÜNMÜYOR. Ziyaretçinin onu bilmesine gerek yok — kod
 * adreste taşınıyor ve kayıttan sonra bağ kendiliğinden kuruluyor. Ekranda
 * gösterilse "bir yere girmem mi gerekiyor?" sorusunu doğururdu; oysa
 * girilecek bir yer bilerek yok.
 */
export function InviteLanding({
  code,
  inviter,
  t,
}: {
  code: string;
  inviter: { name: string | null; avatar: string | null; userId: string } | null;
  t: { title: string; lead: string; how: string; cta: string; browse: string; pitch: string };
}) {
  /* Kayıttan sonra buraya DÖNÜYOR: bağ ancak hesap varken kurulabiliyor. */
  const next = code ? `/login?next=${encodeURIComponent(`/r/${code}`)}` : "/login";

  return (
    <main className="mx-auto flex w-full max-w-md flex-col items-center px-4 py-12 text-center">
      {inviter && (
        <Avatar userId={inviter.userId} name={inviter.name} avatar={inviter.avatar} size={96} />
      )}
      <h1 className="mt-5 text-h1 text-balance">{t.title}</h1>
      <p className="muted mt-2 text-body">{t.lead}</p>

      {inviter && (
        <p
          className="mt-7 w-full rounded-panel px-4 py-3 text-caption"
          style={{ background: "var(--surface-2)", color: "var(--text-muted)" }}
        >
          {t.how}
        </p>
      )}

      <Link
        href={next}
        className="mt-7 w-full rounded-panel px-5 py-3 text-strong on-fill"
        style={{ background: "var(--color-brand)" }}
      >
        {inviter ? t.cta : t.browse}
      </Link>

      <p className="muted mt-7 max-w-[38ch] text-caption">{t.pitch}</p>
    </main>
  );
}
