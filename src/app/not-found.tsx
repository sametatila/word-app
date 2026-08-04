import Link from "next/link";
import { LogoMark } from "@/components/icons";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-4 px-5 text-center">
      <span className="brand-gradient flex h-12 w-12 items-center justify-center rounded-2xl text-white">
        <LogoMark size={26} />
      </span>
      <h1 className="text-2xl font-bold">Sayfa bulunamadı</h1>
      <p className="muted text-sm">
        Aradığın sayfa taşınmış ya da hiç var olmamış olabilir.
      </p>
      <div className="mt-2 flex flex-wrap justify-center gap-3">
        <Link href="/learn" className="btn btn-primary px-5 py-3">
          Öğrenmeye dön
        </Link>
        <Link href="/" className="btn btn-ghost px-5 py-3">
          Ana sayfa
        </Link>
      </div>
    </div>
  );
}
