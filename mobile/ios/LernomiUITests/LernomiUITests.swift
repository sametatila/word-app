import XCTest

/// Uygulamayı baştan sona TIKLAYARAK gezer: onboarding, ilk kelimeler, giriş
/// duvarı ve (kimlik bilgisi verilmişse) sekmelerin altındaki ekranlar.
///
/// Neden var: `simctl` dokunma yapamıyor, dolayısıyla ekran görüntüsü betiği
/// uygulamanın açıldığı ilk ekranda kalıyordu.
///
/// Kareleri BU TEST ALMIYOR: dışarıdan `simctl io screenshot` döngüsü çekiyor
/// (bkz. scripts/ios-flow-screenshots.sh). Sebep, xcresult'tan ek çıkarmanın
/// Xcode sürümüne göre değişmesi; simctl'in çalıştığı ise kanıtlı. Test bunun
/// için her ekranda bilerek bekliyor — döngü o aralıkta yakalıyor.
///
/// ## Dokunuşlar neden metinle seçilmiyor
///
/// Aynı akış üç dilde koşabilmeli, o yüzden "Devam et"/"Continue"/"Weiter" ile
/// eşleşmek kırılgan olurdu. Kural konumsal: ekranın en altındaki düğme "devam",
/// üstündekiler seçenek. Ham koordinat da yok — düğmeler erişilebilirlik
/// ağacından geliyor (PressableScale `accessibilityRole="button"` veriyor), yani
/// düzen değişse test kırılmaz; düğme gerçekten kaybolursa kırılır, istenen bu.
///
/// TEK istisna yasak listesi: geri dönülemez eylemler METİNLE eleniyor. Metinler
/// elle yazılmıyor, `src/i18n/<dil>.ts`'ten okunup UI_TEST_BLOCK ile geçiriliyor
/// (tek kaynak orası). Bugün listede hesap silme onayları ve çıkış onayı var.
final class LernomiUITests: XCTestCase {

  /// Her ekranda bu kadar duruluyor ki dış döngü kareyi yakalayabilsin.
  /// Dış döngü 2 saniyede bir çekiyor, 3 saniye onu güvenle geçiyor.
  private let dwell: UInt32 = 3

  /// Turun duracağı an. İş zaman aşımı 60 dakika ve önünde derleme + matris
  /// var; tarama derinleştikçe süre kolayca kaçıyor. Bütçe dolduğunda tur
  /// KENDİ İSTEĞİYLE duruyor — zaman aşımıyla düşen bir iş hiçbir kare
  /// yüklemez, erken duran tur o ana kadarki karelerin hepsini verir.
  private lazy var deadline = Date().addingTimeInterval(16 * 60)
  private var outOfTime: Bool { Date() >= deadline }
  private var blocked: [String] = []
  private let env = ProcessInfo.processInfo.environment

  override func setUpWithError() throws {
    continueAfterFailure = true // bir adım tutmasa da kalan ekranlar görülsün
    // Sistem diyaloğu (bildirim izni, mikrofon) turu bloklayabilir: uygulamanın
    // üstünde durur ve altındaki hiçbir düğme dokunulabilir olmaz. Çıkarsa
    // reddediliyor — izin vermek turun işi değil ve verilen izin sonraki
    // koşularda farklı bir başlangıç durumu bırakırdı.
    addUIInterruptionMonitor(withDescription: "sistem diyalogu") { alert in
      for label in ["Don't Allow", "İzin Verme", "Nicht erlauben", "Cancel", "İptal", "Abbrechen"] {
        let b = alert.buttons[label]
        if b.exists { b.tap(); return true }
      }
      if alert.buttons.count > 0 { alert.buttons.element(boundBy: 0).tap(); return true }
      return false
    }
    blocked = (env["UI_TEST_BLOCK"] ?? "")
      .split(separator: "|")
      .map { $0.trimmingCharacters(in: .whitespaces).lowercased() }
      .filter { !$0.isEmpty }
  }

  func testFullTour() throws {
    let app = launchApp()

    // 1) Onboarding + ilk kelimeler: ekranın en altındaki düğmeye basarak ilerle.
    //    Giriş ekranı görünür görünmez duruyor — orası "devam" mantığının değil
    //    signIn()'in işi. Durmasaydı en alttaki düğmeye basmayı sürdürür ve giriş
    //    formundaki mod değiştirme düğmesine basıp formu kayda çevirirdi (bir kez
    //    öyle oldu; kare 28 kayıt formunu gösteriyordu).
    advance(app, rounds: 16, stopAt: label("EMAIL_CTA"))

    // 2) Giriş duvarı. Kimlik bilgisi yoksa burada duruluyor — ki bu da bir ekran.
    signIn(app)

    // 3) Giriş sonrası ara ekranlar (bildirim izni istemi gibi) kapatılıyor.
    //    Bunlar tur boyunca değil bir kez çıkıyor ama sekme çubuğunu örtüyor,
    //    yani kapatılmazsa tarama sekmeleri hiç bulamıyor.
    dismissInterstitials(app, times: 3)

    // 4) Sekmelerin altındaki ekranlar.
    crawlTabs(app)
  }

  // MARK: - kurulum

  private func launchApp() -> XCUIApplication {
    let app = XCUIApplication()
    if let lang = env["UI_TEST_LANG"] {
      app.launchArguments += ["-AppleLanguages", "(\(lang))", "-AppleLocale", "\(lang)_\(lang.uppercased())"]
    }
    app.launch()
    sleep(dwell)
    return app
  }

  // MARK: - eleman seçimi

  /// Görünür düğmeler, yukarıdan aşağıya sıralı. Yasaklılar elenmiş.
  private func buttons(_ app: XCUIApplication) -> [XCUIElement] {
    app.buttons.allElementsBoundByIndex
      .filter { $0.exists && $0.isHittable && $0.frame.height > 1 && !isBlocked($0) }
      .sorted { $0.frame.minY < $1.frame.minY }
  }

  private func isBlocked(_ e: XCUIElement) -> Bool {
    let label = e.label.lowercased()
    guard !label.isEmpty else { return false }
    return blocked.contains { label.contains($0) }
  }

  /// Sekme çubuğu: ekranın en altındaki düğme kümesi.
  private func tabButtons(_ app: XCUIApplication) -> [XCUIElement] {
    let h = app.frame.height
    return buttons(app).filter { $0.frame.minY > h * 0.86 }
  }

  // MARK: - ilerleme

  /// Arayüz metni: elle yazılmıyor, src/i18n/<dil>.ts'ten okunup ortamla geliyor
  /// (bkz. scripts/ios-flow-screenshots.sh). Boşsa eşleşme denenmez.
  private func label(_ name: String) -> String {
    (env["UI_TEST_L_" + name] ?? "").trimmingCharacters(in: .whitespaces)
  }

  private func button(_ app: XCUIApplication, labeled text: String) -> XCUIElement? {
    guard !text.isEmpty else { return nil }
    return buttons(app).first { $0.label.caseInsensitiveCompare(text) == .orderedSame }
  }

  /// "Devam" düzeni: seçenek varsa ilkini seç, sonra en alttaki düğmeye bas.
  /// `stopAt` etiketli bir düğme göründüğünde durur.
  private func advance(_ app: XCUIApplication, rounds: Int, stopAt: String = "") {
    for _ in 0..<rounds {
      if button(app, labeled: stopAt) != nil { return }
      let bs = buttons(app)
      guard let last = bs.last, last.isHittable else { return }
      if bs.count > 1 {
        bs[0].tap()
        sleep(1)
      }
      guard last.exists, last.isHittable else { return }
      last.tap()
      sleep(dwell)
    }
  }

  /// E-posta ile giriş. Kimlik bilgisi verilmemişse yalnız giriş ekranını
  /// (sağlayıcı listesi + e-posta formu) gösterip döner — o da iki ekran.
  ///
  /// Bu adım konumsal DEĞİL etiketle çalışıyor, çünkü form iki modlu: giriş ve
  /// kayıt. Konumla gidilirse hangi modda olunduğu bilinemez ve kayıt formunun
  /// üç alanından ilkine (ADIN) e-posta yazılır. Etiketler yine elle değil
  /// i18n'den geliyor.
  private func signIn(_ app: XCUIApplication) {
    if let cta = button(app, labeled: label("EMAIL_CTA")), cta.isHittable {
      cta.tap()
      sleep(dwell)
    }
    let email = env["UI_TEST_EMAIL"] ?? ""
    let password = env["UI_TEST_PASSWORD"] ?? ""
    // Teşhis: bir önceki koşuda form doğru ekranda ve doğru modda açıldı ama
    // alanlar boş kaldı, sebebi karelerden anlaşılmadı. Parola BASILMIYOR,
    // yalnız uzunluğu — "secret geldi mi" ile "alan bulundu mu" ayrılabilsin.
    dump(app, "giris oncesi", email: email, passwordLength: password.count)
    guard !email.isEmpty, !password.isEmpty else { return }

    // Mod, alan SAYISINDAN değil düğmenin varlığından anlaşılıyor: sayım
    // kırılgandı ve bir kere sessizce erken döndü. Giriş düğmesi varsa
    // giriş modundayız, kayıt düğmesi varsa moda çevirmek gerekiyor.
    if button(app, labeled: label("SIGNIN")) == nil, button(app, labeled: label("SIGNUP")) != nil {
      if let toggle = buttons(app).last, toggle.isHittable {
        toggle.tap()
        sleep(2)
        dump(app, "mod cevrildi", email: email, passwordLength: password.count)
      }
    }

    let mail = app.textFields.element(boundBy: 0)
    let pass = app.secureTextFields.element(boundBy: 0)
    guard mail.waitForExistence(timeout: 10), pass.waitForExistence(timeout: 10) else {
      print("UITEST: alanlar bulunamadi")
      return
    }
    typeInto(mail, email, verify: true)
    typeInto(pass, password, verify: false) // gizli alan değeri nokta döner, okunamaz
    // Klavye KAPATILIYOR. Açık kaldığında "Giriş yap" düğmesi ağaçta görünüyor
    // ama isHittable false oluyor (klavye örtüyor) — bir koşuda tam olarak bu
    // oldu ve giriş sessizce olmadı. Satır sonu tek satırlık alanda
    // onSubmitEditing tetikleyip klavyeyi kapatıyor.
    pass.typeText("\n")
    sleep(2)
    dump(app, "alanlar dolduruldu", email: email, passwordLength: password.count)

    if let submit = button(app, labeled: label("SIGNIN")), submit.isHittable {
      submit.tap()
    } else {
      // Yedek dal BİLEREK basmıyor. Eskiden en alttaki düğmeye basıyordu ve
      // klavye açıkken o düğme klavyenin bir TUŞU oluyordu — yanlış yere
      // basmaktansa hiç basmamak yeğ, çünkü satır sonu zaten göndermiş olabilir.
      print("UITEST: giris dugmesi dokunulabilir degil, satir sonuna guveniliyor")
    }
    sleep(dwell * 3) // oturum + ilk veri çekimi
    dump(app, "giris sonrasi", email: email, passwordLength: password.count)
  }

  /// Alana yazar ve YAZILANI DOĞRULAR. `tap()`'ten hemen sonra yazmak ilk
  /// karakterleri düşürüyor (klavye/odak henüz yerleşmemiş oluyor): bir koşuda
  /// "sametatila+uitest@..." alana "stila+uitest@..." olarak düştü ve giriş
  /// sessizce yanlış adresle denendi. Kare olmasa fark edilmezdi.
  ///
  /// Gizli alan doğrulanamıyor (değer nokta döner), ama oradaki hata da
  /// görülmüştü: nokta sayısı parola uzunluğuyla tutuyordu.
  private func typeInto(_ field: XCUIElement, _ text: String, verify: Bool) {
    for attempt in 1...3 {
      field.tap()
      sleep(1) // odak ve klavye yerleşsin — asıl düzeltme bu
      field.typeText(text)
      guard verify else { return }
      if (field.value as? String) == text { return }
      print("UITEST: alan yanlis yazildi (deneme \(attempt)), temizlenip yeniden")
      field.tap()
      let silinecek = ((field.value as? String) ?? "").count + 5
      field.typeText(String(repeating: XCUIKeyboardKey.delete.rawValue, count: silinecek))
    }
    print("UITEST: alan uc denemede de dogru yazilamadi")
  }

  /// Ekranın o anki hâlini günlüğe yazar. Kareler "ne göründüğünü" söylüyor,
  /// bu "testin ne gördüğünü" söylüyor — ikisi ayrıştığında sebep buradan çıkar.
  private func dump(_ app: XCUIApplication, _ nerede: String, email: String, passwordLength: Int) {
    let labels = buttons(app).map { $0.label.isEmpty ? "(etiketsiz)" : $0.label }
    print("UITEST: \(nerede) | eposta=\(email.isEmpty ? "YOK" : "var") parola=\(passwordLength) hane " +
          "| metinAlani=\(app.textFields.count) gizliAlan=\(app.secureTextFields.count) " +
          "| dugmeler=\(labels)")
  }

  /// Ara ekranları kapatır: YALNIZ en alttaki düğmeye basar, seçenek seçmez.
  /// advance() burada kullanılamaz çünkü o birden fazla düğme görünce ilkini de
  /// seçiyor; bildirim isteminde ilk düğme "Günlük hatırlatmayı aç" ve sistem
  /// izin diyaloğunu açar. İstenen "Şimdilik geç", yani en alttaki.
  private func dismissInterstitials(_ app: XCUIApplication, times: Int) {
    for _ in 0..<times {
      if !tabButtons(app).isEmpty { return } // sekmelere vardık
      // Hâlâ giriş ekranındaysak giriş TUTMAMIŞ demektir; buradaki en alttaki
      // düğme "Hesabın yok mu? Kayıt ol" ve basmak formu kayda çevirir. Bir
      // koşuda tam olarak bu oldu ve son kare kayıt formunu gösterdi.
      if button(app, labeled: label("SIGNIN")) != nil || button(app, labeled: label("SIGNUP")) != nil {
        print("UITEST: hala giris ekranindayiz, ara ekran kapatma atlandi")
        return
      }
      guard let last = buttons(app).last, last.isHittable else { return }
      last.tap()
      sleep(dwell)
    }
  }

  // MARK: - gezinme

  /// Her sekmeyi açar, girişleri açar, açılan ekranın İÇİNDEKİ girişleri de
  /// açar (iki seviye). Sekme çubuğunun üstündeki her düğme bir giriş sayılıyor.
  private func crawlTabs(_ app: XCUIApplication) {
    guard !tabButtons(app).isEmpty else {
      print("UITEST: sekme yok, tarama atlandi (giris tutmamis olabilir)")
      return
    }
    var acilan = 0
    defer { print("UITEST: tarama bitti, acilan ekran=\(acilan)") }
    let tabCount = tabButtons(app).count
    for i in 0..<tabCount {
      if outOfTime { print("UITEST: butce doldu, tarama kesildi"); return }
      let tabs = tabButtons(app)
      guard i < tabs.count, tabs[i].isHittable else { continue }
      tabs[i].tap()
      sleep(dwell)

      // Önce sekmenin İÇERİĞİNİ baştan sona kaydır. Dokunmadan, yalnız
      // görüntülemek için: ekranların çoğu katlanmanın altında ve XCUITest
      // görünmeyeni `isHittable` saymıyor, yani hem kare çıkmıyor hem de
      // tarama onları giriş olarak hiç görmüyordu. Ölçüldü: kaydırma yokken
      // tarama üç sekmede toplam 6 ekran açabildi.
      scrollThrough(app, steps: 4)
      tabs[i].tap() // başa dön (sekmeye yeniden dokunmak listeyi yukarı alıyor)
      sleep(dwell)

      let count = entries(app).count
      for j in 0..<min(count, 12) {
        if outOfTime { print("UITEST: butce doldu, tarama kesildi"); return }
        let fresh = entries(app)
        guard j < fresh.count, fresh[j].isHittable else { continue }
        fresh[j].tap(); acilan += 1
        sleep(dwell)
        scrollThrough(app, steps: 2) // açılan ekranın altı da görülsün

        // İkinci seviye: açılan ekranın kendi girişleri.
        let subCount = entries(app).count
        for k in 0..<min(subCount, 4) {
          if outOfTime { break }
          let subs = entries(app)
          guard k < subs.count, subs[k].isHittable else { continue }
          subs[k].tap(); acilan += 1
          sleep(dwell)
          goBackOnce(app)
          sleep(1)
        }

        goHome(app)
        sleep(1)
      }
    }
  }

  /// Ekranı aşağı kaydırarak tamamını gösterir. Dokunma yok — amaç yalnız
  /// katlanmanın altındaki içeriğin kareye girmesi. Her adımda bekleniyor ki
  /// dış döngü (2 sn) yakalayabilsin.
  private func scrollThrough(_ app: XCUIApplication, steps: Int) {
    for _ in 0..<steps {
      if outOfTime { return }
      app.swipeUp()
      sleep(dwell)
    }
  }

  /// Ekranın kendi girişleri: sekme çubuğunun ÜSTÜNDE ve sol üstteki GERİ OKU
  /// DEĞİL.
  ///
  /// Geri oku dışlanmazsa alt seviyede ilk giriş o oluyor: dokununca bir üste
  /// çıkılıyor, hemen ardından goBackOnce bir daha çıkarıyor ve tur aynı
  /// ekranları dolaşıp duruyor. Bir koşuda tam olarak bu oldu — tarama 8 dakika
  /// sürdü (öncekilerin iki katı) ve tek yeni kare çıkmadı.
  ///
  /// Sekme ekranlarında sol üstte zaten düğme yok (selamlama metni var, kutu ve
  /// avatar sağ üstte), yani bu eleme orada bir şey kaybettirmiyor.
  private func entries(_ app: XCUIApplication) -> [XCUIElement] {
    let h = app.frame.height, w = app.frame.width
    return buttons(app).filter {
      $0.frame.minY < h * 0.86 && !($0.frame.minY < h * 0.15 && $0.frame.minX < w * 0.25)
    }
  }

  /// Bir seviye geri: kenardan kaydırma, tutmazsa sol üstteki ok. Sekmelere
  /// kadar inmiyor — ikinci seviyeden çıkarken üstteki ekranda kalmak gerekiyor.
  private func goBackOnce(_ app: XCUIApplication) {
    let start = app.coordinate(withNormalizedOffset: CGVector(dx: 0.01, dy: 0.5))
    let end = app.coordinate(withNormalizedOffset: CGVector(dx: 0.9, dy: 0.5))
    start.press(forDuration: 0.05, thenDragTo: end)
    sleep(1)
    if let back = buttons(app).first, back.frame.minY < app.frame.height * 0.2,
       back.frame.minX < app.frame.width * 0.3, back.isHittable {
      back.tap()
      sleep(1)
    }
  }

  /// Sekmelere kadar geri dön. Önce kenardan kaydırma (native-stack
  /// varsayılanı), tutmazsa sol üstteki düğme, o da tutmazsa yeniden başlat.
  ///
  /// Yeniden başlatma bilerek var: alttan açılan bir ekran (modal) kaydırmayla
  /// kapanmayabiliyor ve kapanmazsa sonraki dokunuşlar yanlış ekranda olur —
  /// tur oradan sonra anlamsız kareler üretir. Onboarding ve oturum kalıcı
  /// olduğu için yeniden başlatma bizi sekmelere geri getiriyor.
  private func goHome(_ app: XCUIApplication) {
    if !tabButtons(app).isEmpty { return } // zaten sekmedeyiz

    let start = app.coordinate(withNormalizedOffset: CGVector(dx: 0.01, dy: 0.5))
    let end = app.coordinate(withNormalizedOffset: CGVector(dx: 0.9, dy: 0.5))
    start.press(forDuration: 0.05, thenDragTo: end)
    sleep(2)
    if !tabButtons(app).isEmpty { return }

    // Sol üstteki düğme (AppHeader geri oku).
    if let back = buttons(app).first, back.frame.minY < app.frame.height * 0.2,
       back.frame.minX < app.frame.width * 0.3, back.isHittable {
      back.tap()
      sleep(2)
      if !tabButtons(app).isEmpty { return }
    }

    app.terminate()
    sleep(1)
    app.launch()
    sleep(dwell)
  }
}
