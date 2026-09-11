import Link from "next/link";
import { LogoMark } from "@/components/icons";
import { getT } from "@/lib/i18n/server";

export default async function NotFound() {
  const t = await getT();
  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-4 px-5 text-center">
      <LogoMark size={48} />
      <h1 className="text-h1">{t("notfound.title")}</h1>
      <p className="muted text-body">{t("notfound.sub")}</p>
      <div className="mt-2 flex flex-wrap justify-center gap-3">
        <Link href="/learn" className="btn btn-primary px-5 py-3">
          {t("common.back_to_learn")}
        </Link>
        <Link href="/" className="btn btn-ghost px-5 py-3">
          {t("common.home")}
        </Link>
      </div>
    </div>
  );
}
