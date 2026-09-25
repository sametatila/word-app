import { useSyncExternalStore } from "react";
import { apiBase, onBaseChange } from "./base";

/**
 * O anki API tabanı, değişince yeniden çizen biçimde (bkz. ./base). Adresi
 * bir WebView'in `source`u gibi görünür bir yere yazan bileşenler için:
 * taban yedeğe geçtiğinde sayfa yeni adresten yeniden açılsın.
 */
export function useApiBase(): string {
  return useSyncExternalStore(onBaseChange, apiBase, apiBase);
}
