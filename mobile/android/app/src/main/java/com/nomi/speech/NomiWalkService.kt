package com.nomi.speech

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
import com.nomi.R

/**
 * Yürüyüş "ekran kapalı" modu için MİKROFONLU foreground service.
 *
 * Android 9+ arka planda (ekran güç tuşuyla kapalıyken) mikrofon erişimini yalnız
 * foreground service + mikrofon tipiyle açık tutar. Bu service çalışırken AudioRecord
 * arka planda da kayıt alabilir (Azure yolu). Kalıcı bildirim zorunlu.
 */
class NomiWalkService : Service() {
  override fun onBind(intent: Intent?): IBinder? = null

  override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
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
    val notif: Notification = NotificationCompat.Builder(this, chId)
      .setContentTitle(getString(R.string.walk_notification_title))
      .setContentText(getString(R.string.walk_notification_text))
      .setStyle(NotificationCompat.BigTextStyle().bigText(getString(R.string.walk_notification_text)))
      .setSmallIcon(R.drawable.ic_notification)
      .setContentIntent(content)
      .setOngoing(true)
      .setPriority(NotificationCompat.PRIORITY_LOW)
      .build()
    try {
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
        startForeground(7, notif, ServiceInfo.FOREGROUND_SERVICE_TYPE_MICROPHONE)
      } else {
        startForeground(7, notif)
      }
    } catch (e: Exception) { android.util.Log.e("NomiWalk", "startForeground HATA: ${e.message}", e) }
    return START_STICKY
  }
}
