package com.lernomi.speech

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.app.Service
import android.content.Context
import android.content.pm.PackageManager
import android.content.Intent
import android.content.pm.ServiceInfo
import android.os.Build
import android.os.IBinder
import androidx.core.app.NotificationCompat
import com.lernomi.R

/**
 * Yürüyüş "ekran kapalı" modu için MİKROFONLU foreground service.
 *
 * Android 9+ arka planda (ekran güç tuşuyla kapalıyken) mikrofon erişimini yalnız
 * foreground service + mikrofon tipiyle açık tutar. Bu service çalışırken AudioRecord
 * arka planda da kayıt alabilir (Azure yolu). Kalıcı bildirim zorunlu.
 */
class LernomiWalkService : Service() {
  companion object {
    const val ACTION_STOP = "com.lernomi.walk.STOP"
    /** Bildirimdeki "Durdur" → JS'e haber (LernomiSpeechModule kurar). Servisin JS'e tek yolu. */
    @Volatile var onStop: (() -> Unit)? = null

    /**
     * startForeground BAŞARISIZ olduysa JS'e haber (LernomiSpeechModule kurar).
     *
     * Eskiden yalnız logcat'e yazılıyordu: servis ölüyor ama tur devam ediyordu ve
     * kullanıcı ekranı kapattığında mikrofon sessizce kesiliyordu. Play'in ön plan
     * servisi kuralının karşılığı da bu — servis yoksa arka planda kayıt zaten
     * yapılmamalı, dolayısıyla kullanıcı bunu ÖNCEDEN bilmeli.
     */
    @Volatile var onStartFailed: ((String) -> Unit)? = null
  }

  override fun onBind(intent: Intent?): IBinder? = null

  override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
    if (intent?.action == ACTION_STOP) {
      // Kullanıcı bildirimden durdurdu: JS oturumu kapatır, servis kendini bitirir.
      try { onStop?.invoke() } catch (_: Exception) { /* yut */ }
      stopForeground(STOP_FOREGROUND_REMOVE)
      stopSelf()
      return START_NOT_STICKY
    }
    val chId = "nomi_walk"
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      val nm = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
      if (nm.getNotificationChannel(chId) == null) {
        nm.createNotificationChannel(
          NotificationChannel(chId, getString(R.string.walk_channel_name), NotificationManager.IMPORTANCE_LOW).apply {
            // Ayarlar'daki kanal listesinde ne olduğu yazsın: kullanıcı bildirimi
            // kapatmadan önce neyi kapattığını görmeli (Play FGS beklentisi).
            description = getString(R.string.walk_channel_description)
            setShowBadge(false)
            setSound(null, null)
            enableVibration(false)
            // Kilit ekranında GÖRÜNSÜN: yürüyüş modunun tek kullanım biçimi ekran
            // kapalı; gizlenirse kullanıcı mikrofonun açık olduğunu göremez.
            lockscreenVisibility = Notification.VISIBILITY_PUBLIC
          },
        )
      }
    }
    // Bildirime dokununca uygulamaya (yürüyüş ekranına) dön.
    val launch = packageManager.getLaunchIntentForPackage(packageName)?.apply {
      addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP or Intent.FLAG_ACTIVITY_CLEAR_TOP)
    }
    val content = launch?.let {
      PendingIntent.getActivity(this, 0, it, PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE)
    }
    val stop = PendingIntent.getService(
      this, 1, Intent(this, LernomiWalkService::class.java).setAction(ACTION_STOP),
      PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE,
    )
    val notif: Notification = NotificationCompat.Builder(this, chId)
      .setContentTitle(getString(R.string.walk_notification_title))
      .setContentText(getString(R.string.walk_notification_text))
      .setStyle(NotificationCompat.BigTextStyle().bigText(getString(R.string.walk_notification_text)))
      .setSmallIcon(R.drawable.ic_notification)
      .setContentIntent(content)
      .addAction(0, getString(R.string.walk_stop), stop)
      .setOngoing(true)
      .setPriority(NotificationCompat.PRIORITY_LOW)
      .setCategory(NotificationCompat.CATEGORY_SERVICE)
      .setVisibility(NotificationCompat.VISIBILITY_PUBLIC)
      // Bildirim HEMEN çizilsin. Varsayılan davranış onu 10 saniye geciktiriyor;
      // kısa bir turda kullanıcı mikrofonun açık olduğunu ancak iş bittikten sonra
      // görüyordu. Kaydın sürdüğünün görünür olması hem Play kuralı hem de
      // inceleyicinin ilk sorusu.
      .setForegroundServiceBehavior(NotificationCompat.FOREGROUND_SERVICE_IMMEDIATE)
      .build()
    // Mikrofon izni OLMADAN startForeground(type=microphone) Android 14+'ta
    // SecurityException fırlatıyor. İzin normalde tur başlamadan alınıyor (JS
    // ensureMicPermission); kullanıcı Ayarlar'dan geri aldıysa burada yakalanır.
    val micGranted = checkSelfPermission(android.Manifest.permission.RECORD_AUDIO) ==
      PackageManager.PERMISSION_GRANTED
    if (!micGranted) {
      fail("permission")
      return START_NOT_STICKY
    }
    try {
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
        startForeground(7, notif, ServiceInfo.FOREGROUND_SERVICE_TYPE_MICROPHONE)
      } else {
        startForeground(7, notif)
      }
    } catch (e: SecurityException) {
      // Tip için gereken izin yok ya da geri alınmış (Android 14+).
      android.util.Log.e("LernomiWalk", "startForeground izin HATASI: ${e.message}", e)
      fail("permission")
      return START_NOT_STICKY
    } catch (e: Exception) {
      // Android 12+: uygulama arka plandayken ön plan servisi başlatılamaz
      // (ForegroundServiceStartNotAllowedException). Sınıf adına göre ayrıştırmak
      // API 31 altında derlemeyi bozmadan aynı şeyi söylüyor.
      val reason = if (e.javaClass.simpleName.contains("ForegroundServiceStartNotAllowed")) "background" else "unknown"
      android.util.Log.e("LernomiWalk", "startForeground HATA: ${e.message}", e)
      fail(reason)
      return START_NOT_STICKY
    }
    // NOT_STICKY: süreç ölürse mikrofon servisi kullanıcı olmadan yeniden başlamaz (Play FGS
    // kuralı: kullanıcının başlattığı, fark edip durdurabildiği kayıt).
    return START_NOT_STICKY
  }

  /** Servis kalkamadı: JS'e sebebi bildir ve kendini topla — yarım bir servis bırakma. */
  private fun fail(reason: String) {
    try { onStartFailed?.invoke(reason) } catch (_: Exception) { /* yut */ }
    stopForeground(STOP_FOREGROUND_REMOVE)
    stopSelf()
  }

  override fun onDestroy() {
    onStop = null
    onStartFailed = null
    super.onDestroy()
  }
}
