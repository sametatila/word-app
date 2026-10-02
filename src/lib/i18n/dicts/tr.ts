import { trBase } from "@/i18n/base/tr";
import { trWeb } from "@/i18n/web/tr";

/** `tr` arayüz sözlüğü: mobilden çekilen taban + web'e özel anahtarlar. Tarayıcıda ayrı parça (bkz. `lib/i18n/dicts-all`). */
const dict: Record<string, string> = { ...trBase, ...trWeb };
export default dict;
