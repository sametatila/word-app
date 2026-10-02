import { deBase } from "@/i18n/base/de";
import { deWeb } from "@/i18n/web/de";

/** `de` arayüz sözlüğü: mobilden çekilen taban + web'e özel anahtarlar. Tarayıcıda ayrı parça (bkz. `lib/i18n/dicts-all`). */
const dict: Record<string, string> = { ...deBase, ...deWeb };
export default dict;
