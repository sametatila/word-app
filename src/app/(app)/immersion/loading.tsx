/** Patika (bento) gelene kadar iskelet: başlık + öne çıkan kart + ızgara. */
export default function Loading() {
  return (
    <div aria-hidden className="mx-auto w-full max-w-md space-y-3 px-4 pt-11">
      <div className="flex items-center justify-between">
        <div className="h-8 w-28 animate-pulse rounded-xl surface-2" />
        <div className="h-6 w-10 animate-pulse rounded-full surface-2" />
      </div>
      <div className="h-2.5 w-full animate-pulse rounded-full surface-2" />
      <div className="h-44 w-full animate-pulse rounded-3xl surface-2" />
      <div className="grid grid-cols-2 gap-3">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-28 animate-pulse rounded-2xl surface-2" style={{ opacity: 1 - i * 0.12 }} />
        ))}
      </div>
    </div>
  );
}
