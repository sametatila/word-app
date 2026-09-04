/**
 * Uygulama sürümü — ÜÇ kaynak ELLE eşitlenir, yeni sürümde üçü birden artar:
 *   APP_VERSION      ↔ android/app/build.gradle versionName
 *                    ↔ ios/Lernomi.xcodeproj MARKETING_VERSION
 *   APP_VERSION_CODE ↔ android/app/build.gradle versionCode
 *                    ↔ ios/Lernomi.xcodeproj CURRENT_PROJECT_VERSION
 * Güncelleme denetimi (useUpdate) bunu GitHub'daki son sürümle karşılaştırır.
 * Native modül (device-info) eklememek için sabit.
 */
export const APP_VERSION = "1.0.11";
export const APP_VERSION_CODE = 13;
