import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import KittyTerminal from "@/components/KittyTerminal";
import MobileNav from "@/components/MobileNav";

export default function PortfolioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div id="app-shell" className="flex h-screen w-screen overflow-hidden">
      <Sidebar />
      <main id="main-content" className="flex-1 bg-gray-50 p-4 md:p-6 overflow-y-auto pb-20 md:pb-6">
        <Topbar />
        {children}
        <KittyTerminal />
      </main>
      <MobileNav />
    </div>
  );
}
