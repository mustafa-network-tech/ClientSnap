import { ReactNode } from "react";
import { requireAdminSession } from "@/lib/admin-auth";

type ProtectedAdminLayoutProps = {
  children: ReactNode;
};

export default async function ProtectedAdminLayout({ children }: ProtectedAdminLayoutProps) {
  await requireAdminSession();
  return <>{children}</>;
}
