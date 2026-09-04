"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertIcon, RefreshIcon } from "@/components/icons";
import { track } from "@/lib/track";
import { screenKey } from "@/lib/screens";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[lernomi]", error);
    // Hata sınırına düşen ekran ölçülüyor: "bir şeyler ters gitti"yi kaç
    // kişi, hangi ekranda gördü — yoksa yalnız şikâyet edenler sayılır.
    track("client_error", 1, screenKey(window.location.pathname));
  }, [error]);

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-4 px-5 text-center">
      <span
        className="flex h-12 w-12 items-center justify-center rounded-2xl"
        style={{
          background: "color-mix(in srgb, var(--color-rose) 14%, transparent)",
          color: "var(--color-rose)",
        }}
      >
        <AlertIcon size={24} />
      </span>
      <h1 className="text-2xl font-bold">Bir şeyler ters gitti</h1>
      <p className="muted text-sm">
        Beklenmeyen bir hata oluştu. Tekrar denemek genelde yeterli olur; sorun sürerse birkaç
        dakika sonra tekrar gel.
      </p>
      {error.digest ? (
        <p className="muted text-xs">
          Hata kodu: <code>{error.digest}</code>
        </p>
      ) : null}
      <div className="mt-2 flex flex-wrap justify-center gap-3">
        <button onClick={reset} className="btn btn-primary flex items-center gap-2 px-5 py-3">
          <RefreshIcon size={18} /> Tekrar dene
        </button>
        <Link href="/" className="btn btn-ghost px-5 py-3">
          Ana sayfa
        </Link>
      </div>
    </div>
  );
}
