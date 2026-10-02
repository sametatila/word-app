import { enBase } from "@/i18n/base/en";
import { enWeb } from "@/i18n/web/en";

/** `en` arayüz sözlüğü: mobilden çekilen taban + web'e özel anahtarlar. Tarayıcıda ayrı parça (bkz. `lib/i18n/dicts-all`). */
const dict: Record<string, string> = { ...enBase, ...enWeb };
export default dict;
