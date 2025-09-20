import { createRootRoute, Outlet } from "@tanstack/react-router";
import DesktopHeader from "../components/DesktopHeader";
import MobileHeader from "../components/MobileHeader";

const RootLayout = () => {
  return (
    <>
      <div className="bg-[#160f2e] text-white py-4">
        <DesktopHeader />
        <MobileHeader />
      </div>
      <Outlet />
    </>
  );
};

export const Route = createRootRoute({ component: RootLayout });
