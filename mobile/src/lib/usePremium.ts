import { useEffect, useState } from "react";
import Purchases, { type CustomerInfo } from "react-native-purchases";
import { billingAvailable, hasPremium, getPremium } from "./billing";

/**
 * Kullanıcının premium durumu — RevenueCat entitlement'ından, canlı dinlenir.
 * Billing yapılandırılmamışsa her zaman false (paywall huni modunda).
 */
export function usePremium(): boolean {
  const [premium, setPremium] = useState(false);
  useEffect(() => {
    if (!billingAvailable()) return;
    let alive = true;
    void getPremium().then((p) => { if (alive) setPremium(p); });
    const listener = (info: CustomerInfo) => setPremium(hasPremium(info));
    try { Purchases.addCustomerInfoUpdateListener(listener); } catch { /* yut */ }
    return () => { alive = false; try { Purchases.removeCustomerInfoUpdateListener(listener); } catch { /* yut */ } };
  }, []);
  return premium;
}
