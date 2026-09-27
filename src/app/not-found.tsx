import { FlowColumn, FlowActions, StateBody } from "@/components/flow";
import { getT } from "@/lib/i18n/server";

/* DURUM ŞABLONU (components/flow): kök hata sayfası (`error.tsx`) ve uygulama
   içi 404 (`(app)/not-found.tsx`) ile aynı kalıp. */
export default async function NotFound() {
  const t = await getT();
  return (
    <div className="flex min-h-dvh items-center px-5">
      <FlowColumn>
        <StateBody title={t("notfound.title")} body={t("notfound.sub")}>
          <FlowActions
            primary={{ label: t("common.back_to_learn"), href: "/learn" }}
            tertiary={{ label: t("common.home"), href: "/" }}
          />
        </StateBody>
      </FlowColumn>
    </div>
  );
}
