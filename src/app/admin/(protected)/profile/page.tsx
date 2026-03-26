import { randomUUID } from "node:crypto";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireOwnerSession } from "@/lib/admin-auth";

type AdminProfilePageProps = {
  searchParams: Promise<{
    error?: string;
    success?: string;
  }>;
};

export default async function AdminProfilePage({ searchParams }: AdminProfilePageProps) {
  await requireOwnerSession();
  const params = await searchParams;
  const supabase = await createClient();
  const { data: inviteCodes } = await supabase
    .from("admin_invite_codes")
    .select("code, is_active, created_at")
    .order("created_at", { ascending: false })
    .limit(20);

  async function createInviteCodeAction() {
    "use server";
    await requireOwnerSession();

    const supabaseServer = await createClient();
    const generatedCode = `CSNAP-DAVET-${randomUUID().slice(0, 8).toUpperCase()}`;

    const { error } = await supabaseServer
      .from("admin_invite_codes")
      .insert({
        code: generatedCode,
        is_active: true,
      });

    if (error) {
      redirect("/admin/profile?error=Davet kodu olusturulamadi");
    }

    redirect(`/admin/profile?success=${encodeURIComponent(generatedCode)}`);
  }

  return (
    <main className="min-h-screen bg-neutral-50 px-6 py-12">
      <div className="mx-auto w-full max-w-2xl rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-neutral-900">Davet Kodlari</h1>
        <p className="mt-2 text-sm text-neutral-600">
          Buradan yeni davet kodu olusturup diger kullanicilari sisteme alabilirsiniz.
        </p>

        {params.error ? (
          <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {params.error}
          </div>
        ) : null}

        {params.success ? (
          <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            Yeni davet kodu: <span className="font-semibold">{params.success}</span>
          </div>
        ) : null}

        <form action={createInviteCodeAction} className="mt-6">
          <button type="submit" className="w-full rounded-2xl bg-neutral-900 px-6 py-4 text-white">
            Yeni Davet Kodu Uret
          </button>
        </form>

        <div className="mt-8 rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
          <h2 className="text-sm font-semibold text-neutral-900">Son Kodlar</h2>
          <div className="mt-3 space-y-2 text-sm text-neutral-700">
            {(inviteCodes ?? []).length === 0 ? (
              <p>Henuz davet kodu yok.</p>
            ) : (
              inviteCodes?.map((item) => (
                <div key={item.code} className="flex items-center justify-between rounded-xl bg-white px-3 py-2">
                  <span className="font-medium">{item.code}</span>
                  <span className={item.is_active ? "text-emerald-600" : "text-neutral-500"}>
                    {item.is_active ? "Aktif" : "Pasif"}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
