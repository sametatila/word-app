package com.nomi

import android.content.pm.ActivityInfo
import android.os.Bundle
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {

  override fun onCreate(savedInstanceState: Bundle?) {
    // Sistem açılış ekranı (Theme.Nomi.Splash) → AppTheme. super'dan ÖNCE çağrılmalı.
    installSplashScreen()
    // RN: ekran döndürme/yeniden boyutlanmada görünüm durumunu Android'e geri yüklettirmiyoruz.
    super.onCreate(null)
    // Yönlendirme: telefonda dikey kilit; tablet/katlanabilirde (sw >= 600dp) kullanıcı
    // döndürmesine izin. Android 16 büyük ekranda manifest kilidini zaten yok sayıyor —
    // beyan gerçekle uyumlu olsun ve yatay düzen test edilebilsin. Manifest'te kilit yok
    // (kaynak nitelikleri manifestte değişemez, lint ManifestResource).
    val large = resources.configuration.smallestScreenWidthDp >= 600
    requestedOrientation = if (large) ActivityInfo.SCREEN_ORIENTATION_FULL_USER else ActivityInfo.SCREEN_ORIENTATION_PORTRAIT
  }

  /** JS tarafında kayıtlı ana bileşenin adı. */
  override fun getMainComponentName(): String = "Nomi"

  /** Yeni mimari (Fabric) açık ReactActivityDelegate. */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
