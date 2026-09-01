package com.nomi.speech

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.Service
import android.content.Context
import android.content.Intent
import android.content.pm.ServiceInfo
import android.os.Build
import android.os.IBinder
import androidx.core.app.NotificationCompat

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
          NotificationChannel(chId, "Yürüyüş modu", NotificationManager.IMPORTANCE_LOW).apply {
            setShowBadge(false)
          },
        )
      }
    }
    val iconRes = resources.getIdentifier("ic_notification", "drawable", packageName)
      .let { if (it != 0) it else applicationInfo.icon }
    val notif: Notification = NotificationCompat.Builder(this, chId)
      .setContentTitle("Yürüyüş modu")
      .setContentText("Dinliyorum — ekran kapalıyken de çalışır")
      .setSmallIcon(iconRes)
      .setOngoing(true)
      .setPriority(NotificationCompat.PRIORITY_LOW)
      .build()
    try {
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
        startForeground(7, notif, ServiceInfo.FOREGROUND_SERVICE_TYPE_MICROPHONE)
      } else {
        startForeground(7, notif)
      }
    } catch (_: Exception) { /* yut — bazı cihazlar kısıtlayabilir */ }
    return START_STICKY
  }
}
