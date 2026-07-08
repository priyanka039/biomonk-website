import { AdminNav } from "./AdminNav";
import { ToastProvider } from "./Toast";

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <div className="flex min-h-screen bg-forest text-cream">
        <AdminNav />
        <main className="flex-1 overflow-auto p-6 sm:p-8">{children}</main>
      </div>
    </ToastProvider>
  );
}
