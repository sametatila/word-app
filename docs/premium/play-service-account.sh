#!/bin/bash
#
# Google Play servis hesabı — RevenueCat için.
#
# BU BETİK BURADA NE ARIYOR: kurulum elle yapılırsa altı ayrı Google Cloud
# ekranında on beş tıklama ve üç ayrı API demek; biri atlanınca RevenueCat
# abonelikleri doğrulayamıyor ve hata "credentials invalid"ten ibaret kalıyor.
# Betik RevenueCat'in kendi dokümanından geliyor (Creating Play Service
# Credentials) ve tek komutta: üç API'yi açıyor, servis hesabını kuruyor, iki
# rolü veriyor, JSON anahtarı üretiyor.
#
# NEREDE ÇALIŞIR: Google Cloud Shell (console.cloud.google.com → sağ üstteki
# terminal ikonu). Yerelde ÇALIŞTIRMA — Cloud Shell'de `gcloud` zaten kurulu ve
# oturum açık.
#
# KULLANIM
#   1. Cloud Shell'i aç, `credentials.sh` diye bir dosya oluştur, bunu yapıştır.
#   2. Aşağıdaki PROJECT_ID'yi kendi proje kimliğinle değiştir.
#      (Google Cloud Console → üstteki proje seçici → "ID" sütunu. Proje ADI
#      değil KİMLİĞİ; genelde sonunda sayı olur.)
#   3. `bash credentials.sh`
#   4. Oluşan `revenuecat-key.json`'ı indir ve RevenueCat'e yükle.
#
# SONRASI (betik YAPMAZ, elle):
#   Play Console → Users and permissions → Invite new users →
#   revenuecat-service-account@<PROJECT_ID>.iam.gserviceaccount.com
#   Dört yetki: View app information · View financial data, orders and
#   cancellation survey responses · Manage orders and subscriptions ·
#   Manage store presence
#
# ⚠️ ÜRETİLEN JSON SIRDIR. Depoya girmez, .env'e girmez, yalnız RevenueCat'e
#    yüklenir. Yükledikten sonra indirdiğin kopyayı sil.
#
# Ayrıntı ve gerekçeler: docs/premium/README.md §3.2

# ── Google Cloud Console → Project Overview → Project ID ─────────────────────
PROJECT_ID="your_google_cloud_project_id"

# Aşağıdaki ikisini değiştirmene gerek yok.
SERVICE_ACCOUNT_NAME="revenuecat-service-account"
KEY_FILE_NAME="revenuecat-key"

# ─────────────────────────────────────────────────────────────────────────────
set -e

echo_info()    { echo -e "\033[1;34m[INFO] $1\033[0m"; }
echo_success() { echo -e "\033[1;32m[TAMAM] $1\033[0m"; }
echo_error()   { echo -e "\033[1;31m[HATA] $1\033[0m"; }

echo_info "RevenueCat için Google Cloud kurulumu başlıyor..."

if [ "$PROJECT_ID" == "your_google_cloud_project_id" ]; then
  echo_error "PROJECT_ID değiştirilmemiş. Google Cloud Console → Project Overview → Project ID."
  exit 1
fi

echo_info "Proje: $PROJECT_ID"
gcloud config set project "$PROJECT_ID"

# Betiğin kendi işi için gereken API'ler.
echo_info "Otomasyon API'leri açılıyor..."
gcloud services enable cloudresourcemanager.googleapis.com
sleep 2
gcloud services enable iam.googleapis.com
sleep 2

# RevenueCat'in ihtiyaç duyduğu ÜÇ API. Üçü de gerekli: androidpublisher satın
# almaları doğruluyor, playdeveloperreporting raporları, pubsub ise Google'ın
# sunucu bildirimlerini (iptal, iade, yenileme) RevenueCat'e taşıyor.
echo_info "RevenueCat API'leri açılıyor..."
gcloud services enable androidpublisher.googleapis.com
sleep 2
gcloud services enable playdeveloperreporting.googleapis.com
sleep 2
gcloud services enable pubsub.googleapis.com
echo_success "API'ler açıldı."

echo_info "Servis hesabı oluşturuluyor: $SERVICE_ACCOUNT_NAME"
gcloud iam service-accounts create "$SERVICE_ACCOUNT_NAME" \
  --description="Service account for RevenueCat integration" \
  --display-name="RevenueCat Service Account"
echo_success "Servis hesabı oluşturuldu."

# Hesabın IAM'de görünür olması birkaç saniye alıyor; beklemeden rol vermek
# "service account does not exist" ile düşüyor.
echo_info "Hesabın yayılması için 30 sn bekleniyor..."
sleep 30

SA_EMAIL="$SERVICE_ACCOUNT_NAME@$PROJECT_ID.iam.gserviceaccount.com"

echo_info "Roller veriliyor..."
gcloud projects add-iam-policy-binding "$PROJECT_ID" \
  --member="serviceAccount:$SA_EMAIL" \
  --role="roles/pubsub.editor"
echo_success "Pub/Sub Editor verildi."

gcloud projects add-iam-policy-binding "$PROJECT_ID" \
  --member="serviceAccount:$SA_EMAIL" \
  --role="roles/monitoring.viewer"
echo_success "Monitoring Viewer verildi."

echo_info "Anahtar üretiliyor..."
gcloud iam service-accounts keys create "$KEY_FILE_NAME.json" --iam-account="$SA_EMAIL"
echo_success "Anahtar hazır: $KEY_FILE_NAME.json"

echo
echo_success "Bitti."
echo "  1) $KEY_FILE_NAME.json dosyasını indir (Cloud Shell → ⋮ → Download)."
echo "     RevenueCat → Apps → Play Store yapılandırması → Service Account Credentials JSON."
echo "  2) Play Console → Users and permissions → Invite new users:"
echo "     $SA_EMAIL"
echo "     Yetkiler: View app information · View financial data, orders and"
echo "     cancellation survey responses · Manage orders and subscriptions ·"
echo "     Manage store presence"
echo "  3) Kimlik bilgilerinin işlemesi 36 SAATE kadar sürebilir."
