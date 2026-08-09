import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import KittyTerminal from "@/components/KittyTerminal";

export default function PortfolioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div id="app-shell" className="flex h-screen w-screen overflow-hidden">
      <Sidebar />
      <main id="main-content" className="flex-1 bg-gray-50 p-6 overflow-y-auto">
        <Topbar />
        {children}
        <KittyTerminal />
      </main>
    </div>
  );
}
