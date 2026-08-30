/**
 * react-native-purchases (RevenueCat) — RN 0.87 / AGP-8 uyumu: eski AGP 4.0.1
 * buildscript'i düşer, namespace ekler, react-android'e bağlar, RevenueCat
 * hybrid-common SDK'yı korur; çakışan manifest `package` attribute'unu kaldırır.
 * (New Arch interop ile çalışır — modül codegen kullanmıyor.) postinstall'da çalışır.
 */
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..", "node_modules", "react-native-purchases", "android");
const gradle = path.join(root, "build.gradle");
const manifest = path.join(root, "src", "main", "AndroidManifest.xml");

if (fs.existsSync(gradle)) {
  fs.writeFileSync(gradle, `apply plugin: 'com.android.library'
apply plugin: 'kotlin-android'

android {
    namespace "com.revenuecat.purchases.react"
    compileSdk rootProject.hasProperty('compileSdkVersion') ? rootProject.compileSdkVersion : 35
    defaultConfig {
        minSdkVersion rootProject.hasProperty('minSdkVersion') ? rootProject.minSdkVersion : 24
    }
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
}

dependencies {
    api 'com.facebook.react:react-android'
    implementation 'com.revenuecat.purchases:purchases-hybrid-common:13.37.0'
}
`);
  console.log("patch-purchases: build.gradle yazıldı");
}
if (fs.existsSync(manifest)) {
  let m = fs.readFileSync(manifest, "utf8");
  m = m.replace(/\s*package="[^"]*"/, "");
  fs.writeFileSync(manifest, m);
  console.log("patch-purchases: manifest package kaldırıldı");
}
