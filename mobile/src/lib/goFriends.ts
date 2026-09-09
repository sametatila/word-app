import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import type { RootTabParams } from "../navigation/RootTabs";

/**
 * Arkadaş sekmesine git.
 *
 * Arkadaş merkezi kök yığından sekmelere taşındı; oraya gitmek artık
 * `navigate("Friends")` değil, sekme gezginini adresleyen iki katmanlı bir
 * çağrı. Beş çağrı yerinde aynı satırı yazmak yerine tek yerde duruyor —
 * yığın/sekme ayrımı bir gün değişirse tek dosya değişsin.
 */
export function goFriends(
  nav: NativeStackNavigationProp<RootStackParams>,
  tab?: NonNullable<RootTabParams["Friends"]>["tab"],
): void {
  nav.navigate("Tabs", { screen: "Friends", params: tab ? { tab } : undefined });
}
