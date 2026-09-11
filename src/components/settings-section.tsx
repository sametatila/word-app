/**
 * Ayar sayfasının iki yapı taşı: GRUP başlığı ve BÖLÜM kartı.
 *
 * İkisi de `profile-form` içinde özeldi; hesap kartları (parola, iki adımlı
 * doğrulama, etkin oturumlar) aynı görünümü kendi elleriyle kuruyordu. Aynı
 * şeyi üç yerde ayrı yazmak, "ayarlar karışık görünüyor" şikâyetinin görünür
 * yarısıydı: kartların dolgusu, etiket boşluğu ve genişliği zamanla ayrıştı.
 * Tek kaynak buraya alındı.
 *
 * Bölüm etiketi kartın İÇİNDE bir başlık değil, kartın DIŞINDA bir ad. Fark
 * küçük görünüyor ama bölümler arasındaki sınırı görünür kılan şey bu — kart
 * içi başlık, kartı bir öncekinin devamı gibi gösteriyordu.
 */
export function Group({ title }: { title: string }) {
  return <h2 className="mx-auto mt-8 w-full max-w-3xl text-h3 first:mt-0">{title}</h2>;
}

/** `bare`: kartın kendi dolgusu yok — satırlar kendi dolgusunu taşıyor. */
export function Section({
  title,
  bare,
  id,
  children,
}: {
  title: string;
  bare?: boolean;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto w-full max-w-3xl">
      <p className="muted mb-2 ml-1 text-caption tracking-wide">{title}</p>
      <div className={bare ? "card divide-y divide-[color:var(--hairline)] overflow-hidden" : "card space-y-4 p-5"}>
        {children}
      </div>
    </section>
  );
}
