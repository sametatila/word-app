/** Beceriler listesi gelene kadar görünen iskelet. */
export default function Loading() {
  return (
    <div aria-hidden className="mx-auto w-full max-w-2xl space-y-3">
      <div className="h-7 w-36 animate-pulse rounded-xl surface-2" />
      <div className="h-4 w-72 animate-pulse rounded-xl surface-2" />
      <div className="flex gap-2 py-2">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="h-8 w-12 animate-pulse rounded-full surface-2" />
        ))}
      </div>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="h-16 w-full animate-pulse rounded-xl surface-2"
          style={{ opacity: 1 - i * 0.13 }}
        />
      ))}
    </div>
  );
}
