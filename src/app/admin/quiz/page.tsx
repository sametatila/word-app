import type { Metadata } from "next";
import { adminGate } from "@/lib/admin";
import { quizAdminData } from "@/lib/weekly-quiz/admin";
import { QuizAdmin } from "./quiz-admin";

export const metadata: Metadata = { title: "Haftalık quiz" };
export const dynamic = "force-dynamic";

/**
 * lernomi.app/admin/quiz — haftalık quiz'in durumu.
 *
 * NEDEN AYRI SAYFA. Quiz'in yönetimi ayar değil GÖZLEM: burada değiştirilecek
 * bir sayı yok, bakılacak bir sinyal var. Premium panelinde sınırlar
 * ayarlanıyor; burada içeriğin gerçekte nasıl çalıştığı okunuyor — özellikle
 * hangi maddenin bozuk olduğu. İkisini aynı sayfaya koymak, "değiştir"
 * ile "izle" fiillerini karıştırmak olurdu.
 */
export default async function AdminQuizPage() {
  const gate = await adminGate();
  if (!gate.ok) {
    return (
      <div className="mx-auto max-w-lg px-6 py-16 text-center">
        <h1 className="text-h1">Haftalık quiz</h1>
        <p className="mt-3 text-body" style={{ color: "var(--text-muted)" }}>
          {gate.email ? `Bu hesap (${gate.email}) yönetim yetkisine sahip değil.` : "Önce admin e-postasıyla giriş yap."}
        </p>
      </div>
    );
  }

  const data = await quizAdminData();
  return <QuizAdmin data={data} />;
}
