import { Platform } from "react-native";
import Purchases, { type PurchasesPackage, type CustomerInfo } from "react-native-purchases";
import { REVENUECAT, billingConfigured } from "./billingConfig";

/**
 * Gerçek satın alma (RevenueCat). Web + mobil AYNI entitlement'ı paylaşsın diye
 * appUserID = Neon kullanıcı kimliği. Anahtar yoksa her fonksiyon güvenle no-op /
 * false döner — paywall huni modunda çalışmaya devam eder.
 */
let configured = false;
const platform = (): "android" | "ios" => (Platform.OS === "ios" ? "ios" : "android");

export function billingAvailable(): boolean {
  return billingConfigured(platform());
}

export async function configureBilling(userId: string | null): Promise<void> {
  if (!billingAvailable()) return;
  try {
    if (!configured) {
      Purchases.configure({ apiKey: platform() === "ios" ? REVENUECAT.iosKey : REVENUECAT.androidKey, appUserID: userId ?? undefined });
      configured = true;
    } else if (userId) {
      await Purchases.logIn(userId);
    }
  } catch { /* yut */ }
}

export async function getPackages(): Promise<PurchasesPackage[]> {
  if (!configured) return [];
  try {
    const offerings = await Purchases.getOfferings();
    return offerings.current?.availablePackages ?? [];
  } catch {
    return [];
  }
}

export function hasPremium(info: CustomerInfo | null): boolean {
  return !!info?.entitlements.active[REVENUECAT.entitlementId];
}

export async function getPremium(): Promise<boolean> {
  if (!configured) return false;
  try { return hasPremium(await Purchases.getCustomerInfo()); } catch { return false; }
}

export async function purchase(pkg: PurchasesPackage): Promise<boolean> {
  if (!configured) return false;
  try {
    const { customerInfo } = await Purchases.purchasePackage(pkg);
    return hasPremium(customerInfo);
  } catch {
    return false; // iptal ya da hata — sessiz
  }
}

export async function restore(): Promise<boolean> {
  if (!configured) return false;
  try { return hasPremium(await Purchases.restorePurchases()); } catch { return false; }
}
