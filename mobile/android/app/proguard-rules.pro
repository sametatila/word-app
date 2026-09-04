# Release: minify + shrinkResources açık (app/build.gradle). RN çekirdeği, Hermes, Fresco,
# react-native-purchases, notifee, google-signin ve webview kendi consumer kurallarını taşır.
# Buradakiler yamalanan eski modüller ve kendi native modülümüz için.

# Kendi native modülümüz — JS'ten ada göre bulunur, üyeleri @ReactMethod ile çağrılır.
-keep class com.lernomi.speech.** { *; }

# Yamalanan üçüncü parti modüller (patches/): consumer kuralı taşımıyorlar.
-keep class com.zmxv.RNSound.** { *; }
-keep class net.no_mad.tts.** { *; }
-keep class com.mkuczera.** { *; }

# RN köprüsü: NativeModule/ViewManager reflection; TurboModule codegen.
-keep class * implements com.facebook.react.bridge.NativeModule { *; }
-keep class * extends com.facebook.react.bridge.JavaScriptModule { *; }
-keep class * extends com.facebook.react.uimanager.ViewManager { *; }
-keepclassmembers class * { @com.facebook.react.bridge.ReactMethod <methods>; }
-keepclassmembers class * { @com.facebook.react.uimanager.annotations.ReactProp <methods>; }
-keepclassmembers class * { @com.facebook.react.uimanager.annotations.ReactPropGroup <methods>; }
-keepclassmembers,includedescriptorclasses class * { native <methods>; }

# Kotlin coroutines / metadata (react-native-purchases)
-keep class kotlin.Metadata { *; }
-dontwarn kotlinx.coroutines.**

# OkHttp / Conscrypt uyarıları (RN ağ katmanı)
-dontwarn okhttp3.**
-dontwarn okio.**
-dontwarn org.conscrypt.**
-dontwarn org.bouncycastle.**
-dontwarn org.openjsse.**
