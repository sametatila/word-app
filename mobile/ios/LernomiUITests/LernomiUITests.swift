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
  private let dwell: UInt32 = 4
  private var blocked: [String] = []
  private let env = ProcessInfo.processInfo.environment

  override func setUpWithError() throws {
    continueAfterFailure = true // bir adım tutmasa da kalan ekranlar görülsün
    blocked = (env["UI_TEST_BLOCK"] ?? "")
      .split(separator: "|")
      .map { $0.trimmingCharacters(in: .whitespaces).lowercased() }
      .filter { !$0.isEmpty }
  }

  func testFullTour() throws {
    let app = launchApp()

    // 1) Onboarding + ilk kelimeler: ekranın en altındaki düğmeye basarak ilerle.
    advance(app, rounds: 16)

    // 2) Giriş duvarı. Kimlik bilgisi yoksa burada duruluyor — ki bu da bir ekran.
    signIn(app)

    // 3) Sekmelerin altındaki ekranlar.
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

  /// "Devam" düzeni: seçenek varsa ilkini seç, sonra en alttaki düğmeye bas.
  private func advance(_ app: XCUIApplication, rounds: Int) {
    for _ in 0..<rounds {
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
  private func signIn(_ app: XCUIApplication) {
    // "E-posta ile devam et" formu açsın: giriş ekranında en alttaki düğme o.
    if let open = buttons(app).last, open.isHittable {
      open.tap()
      sleep(dwell)
    }
    guard let email = env["UI_TEST_EMAIL"], let password = env["UI_TEST_PASSWORD"],
          !email.isEmpty, !password.isEmpty else { return }

    let fields = app.textFields.allElementsBoundByIndex.filter { $0.exists && $0.isHittable }
    let secure = app.secureTextFields.allElementsBoundByIndex.filter { $0.exists && $0.isHittable }
    guard let mail = fields.first, let pass = secure.first else { return }

    mail.tap(); mail.typeText(email)
    pass.tap(); pass.typeText(password)
    // Klavye açıkken "gönder" düğmesi kaymış olabilir; en alttakini yeniden bul.
    if let submit = buttons(app).last, submit.isHittable {
      submit.tap()
    }
    sleep(dwell * 2) // oturum + ilk veri çekimi
  }

  // MARK: - gezinme

  /// Her sekmeyi açar, o sekmedeki girişleri tek tek açıp geri döner.
  private func crawlTabs(_ app: XCUIApplication) {
    let tabs = tabButtons(app)
    guard !tabs.isEmpty else { return } // giriş yapılmadıysa sekme yok

    for i in 0..<tabs.count {
      // Her turda yeniden bul: eleman referansları ekran değişince eskiyor.
      let current = tabButtons(app)
      guard i < current.count else { break }
      current[i].tap()
      sleep(dwell)

      let entries = buttons(app).filter { $0.frame.minY < app.frame.height * 0.86 }
      // Üst sınır: bir sekmenin altında onlarca giriş olabilir; tur uzamasın.
      for j in 0..<min(entries.count, 8) {
        let fresh = buttons(app).filter { $0.frame.minY < app.frame.height * 0.86 }
        guard j < fresh.count, fresh[j].isHittable else { continue }
        fresh[j].tap()
        sleep(dwell)
        goBack(app)
        sleep(2)
      }
    }
  }

  /// Geri dön. Önce kenardan kaydırma (native-stack varsayılanı), tutmazsa
  /// sol üstteki düğme, o da tutmazsa uygulamayı yeniden başlat.
  ///
  /// Yeniden başlatma bilerek var: alttan açılan bir ekran (modal) kaydırmayla
  /// kapanmayabiliyor ve kapanmazsa sonraki dokunuşlar yanlış ekranda olur —
  /// tur oradan sonra anlamsız kareler üretir. Onboarding ve oturum kalıcı
  /// olduğu için yeniden başlatma bizi sekmelere geri getiriyor.
  private func goBack(_ app: XCUIApplication) {
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
