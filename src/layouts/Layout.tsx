import { Sidebar } from "@/components/ui";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="h-screen flex flex-col lg:flex-row overflow-hidden">
      <Sidebar />
      <main className="flex-1 min-h-0 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
