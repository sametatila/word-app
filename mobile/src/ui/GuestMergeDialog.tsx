import React from "react";
import { t } from "../lib/i18n";
import { useAuth } from "../lib/AuthContext";
import { ConfirmDialog } from "./ConfirmDialog";

/**
 * "BU CİHAZDAKİ İLERLEME HESABINA EKLENSİN Mİ?" — kökte, çünkü soru girişin
 * her yolundan (e-posta, Apple, Google, doğrulama bağlantısı, açılış) gelebiliyor.
 *
 * Yalnız var olan ve içinde ilerleme olan bir hesaba girişte soruluyor (bkz.
 * AuthContext `claimPendingGuest`). "Ekleme" misafiri SİLİYOR; bu yüzden
 * geri tuşu ve arka plana dokunmak iptal değil "sonra": karar yanlışlıkla
 * verilmiş sayılmıyor, soru bir sonraki açılışta yeniden geliyor.
 */
export function GuestMergeDialog() {
  const { mergeAsk, answerMergeAsk } = useAuth();
  return (
    <ConfirmDialog
      visible={mergeAsk}
      title={t("guest.merge_title")}
      message={t("guest.merge_body")}
      confirmLabel={t("guest.merge_add")}
      cancelLabel={t("guest.merge_discard")}
      onConfirm={() => answerMergeAsk("merge")}
      onCancel={() => answerMergeAsk("discard")}
      onDismiss={() => answerMergeAsk("later")}
    />
  );
}
