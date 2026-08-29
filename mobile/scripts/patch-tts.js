/**
 * react-native-tts eski (jcenter, AGP 1.3.1, namespace yok) ve modern
 * Gradle/AGP 8 ile derlenmiyor. Bu betik her `npm install` sonrası modülün
 * android/build.gradle + AndroidManifest'ini AGP 8 uyumlu hâle getirir.
 */
const fs = require("fs");
const path = require("path");
const base = path.join(__dirname, "..", "node_modules", "react-native-tts", "android");
if (!fs.existsSync(base)) process.exit(0);

const buildGradle = `def safeExtGet(prop, fallback) {
    rootProject.ext.has(prop) ? rootProject.ext.get(prop) : fallback
}

apply plugin: 'com.android.library'

android {
    namespace "net.no_mad.tts"
    compileSdkVersion safeExtGet('compileSdkVersion', 35)

    defaultConfig {
        minSdkVersion safeExtGet('minSdkVersion', 24)
        targetSdkVersion safeExtGet('targetSdkVersion', 35)
    }
}

repositories {
    google()
    mavenCentral()
}

dependencies {
    implementation 'com.facebook.react:react-android'
}
`;
const manifest = `<manifest xmlns:android="http://schemas.android.com/apk/res/android">\n</manifest>\n`;

try {
  fs.writeFileSync(path.join(base, "build.gradle"), buildGradle);
  fs.writeFileSync(path.join(base, "src", "main", "AndroidManifest.xml"), manifest);
  console.log("[patch-tts] react-native-tts AGP8 duzeltmesi uygulandi");
} catch (e) {
  console.warn("[patch-tts]", e.message);
}
