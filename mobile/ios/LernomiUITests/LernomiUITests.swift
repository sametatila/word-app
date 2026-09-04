import XCTest

/// Uygulamayı açar ve onboarding'i baştan sona TIKLAYARAK geçer.
///
/// Neden var: `simctl` dokunma yapamıyor, dolayısıyla ekran görüntüsü betiği
/// uygulamanın açıldığı ilk ekranda kalıyordu. Buradaki dokunuşlarla onboarding'in
/// beş adımı ve sonrasındaki giriş duvarı da görülebiliyor.
///
/// Kareleri BU TEST ALMIYOR: dışarıdan `simctl io screenshot` döngüsü çekiyor
/// (bkz. scripts/ios-screenshots.sh). Sebep, xcresult'tan ek çıkarmanın Xcode
/// sürümüne göre değişmesi; simctl'in çalıştığı ise kanıtlı. Test bunun için her
/// ekranda bilerek bekliyor — döngü o aralıkta kareyi yakalıyor.
///
/// Dokunuşlar METİNLE DEĞİL KONUMLA seçiliyor. Aynı test üç dilde koşuyor
/// ("Devam et" / "Continue" / "Weiter"), o yüzden etiketle eşleşmek kırılgan
/// olurdu. Kural sabit: ekranın en altındaki düğme "devam", üstündekiler seçenek.
/// Ham koordinat da kullanılmıyor — düğmeler erişilebilirlik ağacından geliyor
/// (PressableScale `accessibilityRole="button"` veriyor), yani düzen değişse de
/// test kırılmıyor. Kırılması gereken tek durum düğmenin gerçekten kaybolması.
final class LernomiUITests: XCTestCase {

  /// Her ekranda bu kadar duruluyor ki dış döngü kareyi yakalayabilsin.
  private let dwell: UInt32 = 5

  override func setUpWithError() throws {
    continueAfterFailure = true // bir adım tutmasa da kalan ekranlar görülsün
  }

  func testOnboardingFlow() throws {
    let app = XCUIApplication()
    // Dil dışarıdan veriliyor: aynı akış tr/en/de için ayrı ayrı koşuyor.
    if let lang = ProcessInfo.processInfo.environment["UI_TEST_LANG"] {
      app.launchArguments += ["-AppleLanguages", "(\(lang))", "-AppleLocale", "\(lang)_\(lang.uppercased())"]
    }
    app.launch()
    sleep(dwell)

    // Onboarding beş adım; altıncı tur giriş duvarına düşmeyi bekliyor.
    for _ in 0..<6 {
      let buttons = visibleButtons(app)
      guard let advance = buttons.last else { break }

      // Seçenek varsa ilkini seç (dil, kurs, seviye, günlük hedef). En alttaki
      // düğme "devam" olduğu için seçenekler ondan öncekiler.
      if buttons.count > 1 {
        buttons[0].tap()
        sleep(2)
      }

      guard advance.isHittable else { break }
      advance.tap()
      sleep(dwell)
    }

    // Son ekran da yakalansın.
    sleep(dwell)
  }

  /// Görünür düğmeler, ekranda yukarıdan aşağıya sıralı.
  private func visibleButtons(_ app: XCUIApplication) -> [XCUIElement] {
    app.buttons.allElementsBoundByIndex
      .filter { $0.exists && $0.isHittable && $0.frame.height > 1 }
      .sorted { $0.frame.minY < $1.frame.minY }
  }
}
