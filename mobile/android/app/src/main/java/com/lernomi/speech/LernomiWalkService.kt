package com.lernomi.speech

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.app.Service
import android.content.Context
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
            setShowBadge(false)
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
      .build()
    try {
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
        startForeground(7, notif, ServiceInfo.FOREGROUND_SERVICE_TYPE_MICROPHONE)
      } else {
        startForeground(7, notif)
      }
    } catch (e: Exception) { android.util.Log.e("LernomiWalk", "startForeground HATA: ${e.message}", e) }
    // NOT_STICKY: süreç ölürse mikrofon servisi kullanıcı olmadan yeniden başlamaz (Play FGS
    // kuralı: kullanıcının başlattığı, fark edip durdurabildiği kayıt).
    return START_NOT_STICKY
  }

  override fun onDestroy() {
    onStop = null
    super.onDestroy()
  }
}
