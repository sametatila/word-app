import UIKit
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
  var window: UIWindow?

  var reactNativeDelegate: ReactNativeDelegate?
  var reactNativeFactory: RCTReactNativeFactory?

  func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
  ) -> Bool {
    let delegate = ReactNativeDelegate()
    let factory = RCTReactNativeFactory(delegate: delegate)
    delegate.dependencyProvider = RCTAppDependencyProvider()

    reactNativeDelegate = delegate
    reactNativeFactory = factory

    window = UIWindow(frame: UIScreen.main.bounds)
    // Açılış ekranı kapandıktan sonra JS ilk kareyi çizene kadar pencere görünür kalır;
    // varsayılanı sistem zemini (koyu temada siyah, açıkta beyaz) olduğu için tema
    // renginin dışında bir flaş çakıyor. Android'de bunu AppTheme yapıyor
    // (values/styles.xml → android:windowBackground = @color/window_bg); aynı iki değer
    // Images.xcassets/WindowBackground.colorset içinde (açık #FBF7F2 / koyu #17120E).
    window?.backgroundColor = UIColor(named: "WindowBackground") ?? .systemBackground

    factory.startReactNative(
      withModuleName: "Lernomi",
      in: window,
      launchOptions: launchOptions
    )

    return true
  }
}

class ReactNativeDelegate: RCTDefaultReactNativeFactoryDelegate {
  /// React Native kök görünümü zeminini kendi `systemBackgroundColor`'una ayarlıyor
  /// (RCTRootViewFactory.mm). Pencereyi boyamak tek başına yetmiyor: kök görünüm onu
  /// örtüyor. RN'in bunun için ayırdığı geçersiz kılma noktası burası.
  override func customizeRootView(_ rootView: RCTRootView) {
    rootView.backgroundColor = UIColor(named: "WindowBackground") ?? rootView.backgroundColor
  }

  override func sourceURL(for bridge: RCTBridge) -> URL? {
    self.bundleURL()
  }

  override func bundleURL() -> URL? {
#if DEBUG
    RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
#else
    Bundle.main.url(forResource: "main", withExtension: "jsbundle")
#endif
  }
}
