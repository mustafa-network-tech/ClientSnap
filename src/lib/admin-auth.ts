import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function requireAdminSession() {
  const cookieStore = await cookies();
  const role = cookieStore.get("admin_role")?.value;

  if (!role || (role !== "owner" && role !== "member")) {
    redirect("/admin/login?error=Giris gerekli");
  }

  return { role };
}

export async function requireOwnerSession() {
  const session = await requireAdminSession();

  if (session.role !== "owner") {
    redirect("/create?error=Bu alan sadece yonetici icindir");
  }

  return session;
}
