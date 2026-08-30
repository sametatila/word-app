/**
 * react-native-sound'u AGP-8 / RN 0.87 uyumlu hale getirir: namespace ekler,
 * eski manifest `package` attribute'unu kaldırır, react-android'e bağlar,
 * kısıtlayıcı ndk abiFilters bloğunu düşürür. postinstall'da çalışır.
 */
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..", "node_modules", "react-native-sound", "android");
const gradle = path.join(root, "build.gradle");
const manifest = path.join(root, "src", "main", "AndroidManifest.xml");

if (fs.existsSync(gradle)) {
  fs.writeFileSync(gradle, `apply plugin: 'com.android.library'

android {
    namespace "com.zmxv.RNSound"
    compileSdk rootProject.hasProperty('compileSdkVersion') ? rootProject.compileSdkVersion : 35
    defaultConfig {
        minSdkVersion rootProject.hasProperty('minSdkVersion') ? rootProject.minSdkVersion : 24
    }
}

dependencies {
    implementation 'com.facebook.react:react-android'
}
`);
  console.log("patch-sound: build.gradle yazıldı");
}
if (fs.existsSync(manifest)) {
  let m = fs.readFileSync(manifest, "utf8");
  m = m.replace(/\s*package="[^"]*"/, "");
  fs.writeFileSync(manifest, m);
  console.log("patch-sound: manifest package kaldırıldı");
}
