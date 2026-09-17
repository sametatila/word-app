import type { Metadata } from "next";
import { adminGate } from "@/lib/admin";
import { AdminDenied } from "../_ui/ui";
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
  if (!gate.ok) return <AdminDenied title="Haftalık quiz" email={gate.email} />;

  const data = await quizAdminData();
  return <QuizAdmin data={data} />;
}
