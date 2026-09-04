#!/usr/bin/env ruby
# frozen_string_literal: true
#
# LernomiUITests hedefini Xcode projesine ekler (yoksa). Fikirsiz ve tekrarlanabilir:
# hedef zaten varsa hiçbir şey yapmaz.
#
# Neden CI'da koşuyor, neden pbxproj'a elle yazılmadı: geliştirme makinesi Linux ve
# orada Ruby yok, yani `xcodeproj` gem'i yerelde çalıştırılamıyor. Elle yazmak ise
# on kadar nesne türü ve elle uydurulmuş UUID'ler demek; her denemesi bir CI turu
# (~15 dk) yakardı. Gem geçerli pbxproj üretiyor ve CocoaPods'la birlikte runner'da
# zaten kurulu geliyor. Betik depoda, çıktısı da `check-ios.py` bütünlük denetiminden
# geçiyor.
#
# Kullanım: ruby mobile/scripts/ios-add-uitest-target.rb

require 'xcodeproj'

ROOT = File.expand_path('..', __dir__)
PROJECT_PATH = File.join(ROOT, 'ios', 'Lernomi.xcodeproj')
APP_TARGET = 'Lernomi'
TEST_TARGET = 'LernomiUITests'
TEST_DIR = 'LernomiUITests'

project = Xcodeproj::Project.open(PROJECT_PATH)

if project.targets.any? { |t| t.name == TEST_TARGET }
  puts "#{TEST_TARGET} zaten var — dokunulmadı."
  exit 0
end

app = project.targets.find { |t| t.name == APP_TARGET }
abort "#{APP_TARGET} hedefi bulunamadı." if app.nil?

# Dağıtım hedefi uygulamayla AYNI olmalı: test paketi daha yeni bir iOS isterse
# aynı simülatörde koşamaz.
deployment = app.build_configurations.first.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] || '15.1'

target = project.new_target(:ui_test_bundle, TEST_TARGET, :ios, deployment)

group = project.main_group.find_subpath(TEST_DIR, true)
group.set_source_tree('SOURCE_ROOT')
group.set_path(TEST_DIR)
file_ref = group.new_file('LernomiUITests.swift')
target.add_file_references([file_ref])

# Hangi uygulamayı sürdüğünü söyleyen bağ. TEST_TARGET_NAME olmadan XCUIApplication
# neyi başlatacağını bilmiyor.
target.add_dependency(app)

target.build_configurations.each do |config|
  s = config.build_settings
  # PRODUCT_NAME AÇIKÇA yazılıyor. Yazılmadığı ilk denemede boş kaldı ve
  # xcodebuild "Multiple commands produce '.../-Runner.app/PlugIns/.xctest'"
  # ile düştü: koşucu uygulamanın adı $(PRODUCT_NAME)-Runner.app, test paketininki
  # $(PRODUCT_NAME).xctest — ad boşken ikisi de adsız yollara çakışıyor.
  s['PRODUCT_NAME'] = TEST_TARGET
  s['PRODUCT_MODULE_NAME'] = TEST_TARGET
  s['TEST_TARGET_NAME'] = APP_TARGET
  s['PRODUCT_BUNDLE_IDENTIFIER'] = 'app.lernomi.ios.uitests'
  s['SWIFT_VERSION'] = '5.0'
  s['GENERATE_INFOPLIST_FILE'] = 'YES'
  s['IPHONEOS_DEPLOYMENT_TARGET'] = deployment
  s['TARGETED_DEVICE_FAMILY'] = '1,2'
  # İmza yok ve gerekmiyor: simülatörde koşuyor (bkz. ios-build.yml).
  s['CODE_SIGNING_ALLOWED'] = 'NO'
  s['CODE_SIGN_IDENTITY'] = ''
end

project.save
puts "#{TEST_TARGET} eklendi (dağıtım hedefi #{deployment})."

# Teşhis: bir sonraki hata tahminle değil günlükle çözülsün.
target.build_configurations.each do |config|
  s = config.build_settings
  puts "  [#{config.name}] PRODUCT_NAME=#{s['PRODUCT_NAME'].inspect} " \
       "TEST_TARGET_NAME=#{s['TEST_TARGET_NAME'].inspect} " \
       "bundle=#{s['PRODUCT_BUNDLE_IDENTIFIER'].inspect}"
end
puts "  proje hedefleri: #{project.targets.map(&:name).join(', ')}"

# Şemaya TestAction: bu olmadan `xcodebuild test -scheme Lernomi` testi görmez.
scheme_path = File.join(PROJECT_PATH, 'xcshareddata', 'xcschemes', "#{APP_TARGET}.xcscheme")
scheme = File.exist?(scheme_path) ? Xcodeproj::XCScheme.new(scheme_path) : Xcodeproj::XCScheme.new
scheme.add_test_target(target)
scheme.save_as(PROJECT_PATH, APP_TARGET, true)
puts "Şemaya test hedefi eklendi: #{scheme_path}"
