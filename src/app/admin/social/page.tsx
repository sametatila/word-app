import { redirect } from "next/navigation";

/** Sosyal medya takvimi stüdyoya taşındı (2026-10-09): /studio (editör de oradan girer). */
export default function AdminSocialRedirect() {
  redirect("/studio");
}
