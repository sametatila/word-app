/**
 * Nomi service worker — yalnızca bildirim işi görür.
 *
 * Bilerek dar tutuldu: çevrimdışı önbellek yok. Uygulamanın içeriği
 * (kelime kuyruğu, tekrar zamanları, ilerleme) sunucudan geliyor ve
 * eskimiş bir kopyayı göstermek, hiç göstermemekten kötü olurdu —
 * öğrenci bir daha görmeyeceği bir turu oynamış olurdu.
 */

self.addEventListener("install", () => {
  // Yeni sürüm beklemeden devralsın: bildirim davranışındaki bir düzeltme
  // kullanıcının bütün sekmeleri kapatmasını beklememeli.
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("push", (event) => {
  if (!event.data) return;

  let data;
  try {
    data = event.data.json();
  } catch {
    return; // biçimi tanımadığımız bildirimi göstermeyiz
  }

  event.waitUntil(
    self.registration.showNotification(data.title || "Nomi", {
      body: data.body || "",
      icon: "/icon-192.png",
      badge: "/icon-192.png",
      // Aynı etiket öncekinin yerine geçer: kaçırılan günler kilit
      // ekranında üst üste yığılmasın.
      tag: data.tag || "nomi",
      renotify: true,
      lang: "tr",
      data: { url: data.url || "/learn" },
    }),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const target = (event.notification.data && event.notification.data.url) || "/learn";
  // Bildirimden gelindiği adreste belli olsun: uygulama açılışta `src=push`
  // görürse push_open olayını yazar (bildirim hunisinin okuma ucu).
  const url = target + (target.includes("?") ? "&" : "?") + "src=push";

  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      // Uygulama zaten açıksa yeni pencere açmak yerine ona odaklanılıyor:
      // ikinci bir kopya, yarım kalan turu iki yerden oynatırdı.
      for (const client of list) {
        if (client.url.includes(target) && "focus" in client) return client.focus();
      }
      for (const client of list) {
        if ("navigate" in client && "focus" in client) {
          return client.navigate(url).then((c) => (c ? c.focus() : undefined));
        }
      }
      return self.clients.openWindow(url);
    }),
  );
});
