import DashboardNav from "@/components/dashboard-nav";
import MainNav from "@/components/main-nav";
import SiteFooter from "@/components/site-footer";
import { dashboardConfig } from "@/config/dashboard";

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto grid items-center gap-10 py-8">
      {children}
    </div>
  );
}
