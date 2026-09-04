# Şerit A + G + D — başka şeritlere teslim

`docs/plan/ios-parity.md` §2.1 gereği: kilitli dosyaları sahibi düzenler, isteyen
şerit **tarif eder**. Bu dosya Şerit A'nın (Apple ile Giriş), Şerit G'nin (iOS Google
istemcisi) ve Şerit D'nin başka şeritlerden istediklerini tek yerde tutar.

Bu şeritte yazılan kodun hiçbiri **derlenmedi** — makinede Xcode yok.

---

## 1 → Şerit P (`project.pbxproj`, `Info.plist`, entitlements)

### 1.1 Sign in with Apple yetkisi (capability) — ZORUNLU

Yetki olmadan `ASAuthorizationController` isteği kullanıcıya hiç sorulmadan
`1000` (UNKNOWN) ya da `1004` (FAILED) ile düşer. Üç parça:

1. **Yeni dosya** `mobile/ios/Lernomi/Lernomi.entitlements`:

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
   <plist version="1.0">
   <dict>
   	<key>com.apple.developer.applesignin</key>
   	<array>
   		<string>Default</string>
   	</array>
   </dict>
   </plist>
   ```

2. **Build setting** (iki yapılandırmada da): `CODE_SIGN_ENTITLEMENTS = Lernomi/Lernomi.entitlements`.

3. Dosya `PBXFileReference` + gruba eklenir. **Sources fazına GİRMEZ** (derlenen kod
   değil, imzalama girdisi).

Apple Developer portalında da App ID için *Sign in with Apple* işaretlenmeli, yoksa
profil bu yetkiyi taşımaz ve imzalama hata verir. Bu portal işi, kod işi değil.

### 1.2 Google için `CFBundleURLTypes` — ters client id

`Info.plist`'e (ana `<dict>` içine, `CFBundleName`'den sonra):

```xml
	<!-- Google Sign-In geri dönüş şeması: iOS OAuth istemcisinin TERS client id'si.
	     Sır değil (uygulama paketinde zaten gömülü). Web client id ile karıştırılmamalı:
	     idToken'ın aud'u web client id olmaya devam eder — bkz. lib/googleAuth.ts. -->
	<key>CFBundleURLTypes</key>
	<array>
		<dict>
			<key>CFBundleTypeRole</key>
			<string>Editor</string>
			<key>CFBundleURLSchemes</key>
			<array>
				<string>com.googleusercontent.apps.YER-TUTUCU</string>
			</array>
		</dict>
	</array>
```

`YER-TUTUCU`'nun gerçek değeri Google Cloud'da iOS OAuth istemcisi açılınca belli olur:
istemci `<numara>-<harfler>.apps.googleusercontent.com` ise ters yazımı
`com.googleusercontent.apps.<numara>-<harfler>`.

**Bağlı iş:** `mobile/src/lib/googleAuth.ts` içindeki `IOS_CLIENT_ID` bugün BOŞ ve boşken
`iosClientId` hiç gönderilmiyor, Google düğmesi de iOS'ta hiç çizilmiyor
(`googleSupported()`). İkisi **aynı istemciden** doldurulmalı ve **birlikte** gitmeli:
biri dolup öteki boş kalırsa giriş "invalid client" ile düşer ya da düğme çizilip
çalışmaz.

### 1.3 Bundle kimliği bağı

`PRODUCT_BUNDLE_IDENTIFIER` (P4) ne seçilirse sunucudaki `APPLE_BUNDLE_ID` env
değeri **birebir o** olacak: native id token'ın `aud`'u bundle kimliğidir ve sunucu
doğrulamayı ona göre yapar. Bugünkü öneri `app.lernomi.ios`. P bunu değiştirirse
bu belgeye ve `docs/appstore/README.md`'ye not düşülmeli — env değeri Şerit D'de.

### 1.4 Pod

`@invertase/react-native-apple-authentication` otolinkleme ile geliyor, `Podfile`'a
elle satır **gerekmiyor** (`use_native_modules!` yeterli). Mac'te `pod install`
çalıştığında `RNAppleAuthentication` pod'u görünmeli; görünmüyorsa
`mobile/react-native.config.js` gözden geçirilsin — orada paketin **Android**
otolinklemesi kapalı (iOS'a dokunmuyor).

---

## 2 → Şerit T (`mobile/src/i18n/{tr,en,de}.ts`)

İki yeni anahtar. Sözlükler alfabetik; ikisi de `autherror.` bloğuna girer —
`autherror.bu_e_postayla_kayitli_bir_hesap_bu` ile `autherror.cancelled` arasına
(`apple_failed` önce, `no_apple_token` `autherror.no_google_token`'dan önce).

| Anahtar | tr | en | de |
|---|---|---|---|
| `autherror.apple_failed` | `Apple girişi başarısız oldu. E-posta ile deneyebilirsin.` | `Apple sign-in failed. You can try with e-mail instead.` | `Apple-Anmeldung fehlgeschlagen. Du kannst es mit E-Mail versuchen.` |
| `autherror.no_apple_token` | `Apple kimliği alınamadı` | `Could not get Apple credentials` | `Apple-Identität konnte nicht abgerufen werden` |

Metinler bilerek `autherror.google_failed` / `autherror.no_google_token` ile aynı
kalıpta: iki sağlayıcının hatası kullanıcıya aynı biçimde okunmalı.

Düğme yazısı için **yeni anahtar yok** — `auth.saglayici_ile_devam_et`
(`{saglayici} ile devam et`) zaten parametreli ve "Apple ile devam et" üretiyor.
Bu metin Apple'ın onayladığı düğme başlıklarından biri ("Continue with Apple");
serbest metinle değiştirilmemeli.

---

## 3 → Şerit S (Mac'te derleme)

- `pod install` sonrası `RNAppleAuthentication` pod'u var mı.
- `prop-types` `mobile/package.json`'a **bilerek** doğrudan bağımlılık olarak eklendi:
  Apple paketinin iOS düğme bileşeni onu içeri alıyor ama kendi `dependencies`inde
  BEYAN ETMİYOR. Bugün ağaçta yalnız bir geliştirme bağımlılığının altından geldiği
  için `--omit=dev` kurulumda kaybolup Metro'yu "Unable to resolve module prop-types"
  ile düşürebilirdi.
- Cihazda sınanacaklar `docs/appstore/README.md`'de, Apple bölümünün sonunda.
