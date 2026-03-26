import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

export async function requireAdminSession() {
  const cookieStore = await cookies();
  const accountId = cookieStore.get("admin_account_id")?.value;

  if (!accountId) {
    redirect("/admin/login?error=Giris gerekli");
  }

  const supabase = await createClient();
  const { data } = await supabase
    .from("admin_accounts")
    .select("id, user_pin")
    .eq("id", accountId)
    .maybeSingle();

  if (!data || !data.user_pin) {
    redirect("/admin/login?error=Oturum gecersiz");
  }

  return data;
}
