import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar/>
      <main className="min-w-0 flex-1">
        {children}
      </main>
    </div>
  );
}