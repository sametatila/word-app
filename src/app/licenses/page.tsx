import type { Metadata } from "next";
import data from "@/content/oss-licenses.json";

/**
 * Açık kaynak lisansları — mobil uygulamanın içindeki kütüphanelerin bildirimi
 * (denetim 2026-09-25 İ7). Uygulama Ayarlar'dan bu sayfayı açıyor.
 *
 * Liste `npm run licenses:gen` ile `src/content/oss-licenses.json`a üretiliyor;
 * bağımlılık değişince yeniden üretilir. Lisans metinleri İngilizce olduğu için
 * sayfa da tek dilde, İngilizce (künye gibi tek dilli).
 */
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Open source licenses",
  description: "Open source software used in the Lernomi app and its licenses.",
  robots: { index: false },
};

type Js = { name: string; version: string; license: string; url: string | null; text: string | null };
type Pod = { name: string; text: string };
type Sdk = { name: string; license: string; url: string };

const { js, ios, android } = data as { js: Js[]; ios: Pod[]; android: Sdk[] };

function Section({ title, count, children }: { title: string; count: number; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-h2">
        {title} <span className="muted text-body">({count})</span>
      </h2>
      <div className="mt-3 divide-y divide-[color:var(--hairline)]">{children}</div>
    </section>
  );
}

function Entry({ title, meta, text, url }: { title: string; meta?: string; text: string | null; url?: string | null }) {
  return (
    <details className="py-2">
      <summary className="cursor-pointer text-body">
        <span className="font-semibold">{title}</span>
        {meta ? <span className="muted"> · {meta}</span> : null}
      </summary>
      {text ? (
        <pre className="mt-2 whitespace-pre-wrap break-words text-caption leading-relaxed">{text}</pre>
      ) : null}
      {url ? (
        <p className="mt-2 text-caption">
          <a className="underline" href={url} rel="noopener noreferrer" target="_blank">
            {url}
          </a>
        </p>
      ) : null}
    </details>
  );
}

export default function Page() {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-10" lang="en">
      <h1 className="text-display tracking-tight">Open source licenses</h1>
      <p className="muted mt-3 text-body leading-relaxed">
        The Lernomi app is built with the open source software listed below. Each entry shows its license; tap it to read the
        full notice.
      </p>

      <Section title="JavaScript libraries" count={js.length}>
        {js.map((p) => (
          <Entry key={`${p.name}@${p.version}`} title={`${p.name} ${p.version}`} meta={p.license} text={p.text} url={p.url} />
        ))}
      </Section>

      <Section title="iOS libraries" count={ios.length}>
        {ios.map((p) => (
          <Entry key={p.name} title={p.name} text={p.text} />
        ))}
      </Section>

      <Section title="Android libraries" count={android.length}>
        {android.map((p) => (
          <Entry key={p.name} title={p.name} meta={p.license} text={null} url={p.url} />
        ))}
      </Section>

      <p className="muted mt-10 text-caption leading-relaxed">
        Where no license text is shipped with a package, its license is named and linked. The full Apache License 2.0 is at{" "}
        <a className="underline" href="https://www.apache.org/licenses/LICENSE-2.0" rel="noopener noreferrer" target="_blank">
          apache.org/licenses/LICENSE-2.0
        </a>
        .
      </p>
    </div>
  );
}
