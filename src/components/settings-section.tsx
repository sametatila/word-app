/**
 * Ayar sayfasının iki yapı taşı: GRUP (başlık + tek kart) ve SATIR.
 *
 * Eskiden her bölümün kendi kartı vardı ve sayfa alt alta on beş kutuya
 * dönüşmüştü: kart, bölümleri ayırsın diye vardı ama bölüm sayısı artınca
 * ayırmayı bıraktı, yalnız gürültü ekledi. Şimdi kart GRUBU çiziyor, bölümler
 * kartın içinde ince bir çizgiyle ayrılıyor.
 *
 * Satırların bir kısmı koşullu (parolasız hesapta PAROLA satırı hiç yok);
 * ayıraç `divide-y` ile kartın kendisinde durduğu için gizlenen satır ortada
 * asılı bir çizgi bırakmıyor — çizilmeyen çocuk DOM'a hiç girmiyor.
 */
export function Group({
  title,
  id,
  children,
}: {
  title: string;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto mt-8 w-full max-w-3xl first:mt-0">
      <h2 className="mb-2 ml-1 text-h3">{title}</h2>
      <div className="card divide-y divide-[color:var(--hairline)] px-5">{children}</div>
    </section>
  );
}

/** Grup kartının içindeki bir bölüm: küçük etiket ve altında içeriği. */
export function Row({
  label,
  children,
}: {
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="py-5 first:pt-5 last:pb-5">
      {label ? <p className="muted mb-2 text-caption tracking-wide">{label}</p> : null}
      {children}
    </div>
  );
}
