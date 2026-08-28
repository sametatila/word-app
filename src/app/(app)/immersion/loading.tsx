/** Patika gelene kadar görünen iskelet (başlık + ilerleme + dolambaçlı düğümler). */
export default function Loading() {
  const nodes: [number, number][] = [
    [50, 10],
    [72, 100],
    [50, 190],
    [28, 280],
  ];
  return (
    <div aria-hidden className="mx-auto w-full max-w-md space-y-4 px-4 pt-4">
      <div className="flex items-center justify-between">
        <div className="h-7 w-28 animate-pulse rounded-xl surface-2" />
        <div className="h-6 w-10 animate-pulse rounded-full surface-2" />
      </div>
      <div className="h-4 w-72 animate-pulse rounded-xl surface-2" />
      <div className="h-2.5 w-full animate-pulse rounded-full surface-2" />
      <div className="h-12 w-full animate-pulse rounded-2xl surface-2" />
      <div className="relative h-80">
        {nodes.map(([x, y], i) => (
          <div
            key={i}
            className="absolute h-14 w-14 animate-pulse rounded-full surface-2"
            style={{ left: `${x}%`, top: y, transform: "translate(-50%, 0)", opacity: 1 - i * 0.15 }}
          />
        ))}
      </div>
    </div>
  );
}
