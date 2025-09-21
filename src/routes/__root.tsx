import { createRootRoute, Outlet } from "@tanstack/react-router";
import DesktopHeader from "../components/DesktopHeader";
import MobileHeader from "../components/MobileHeader";

const RootLayout = () => {
  return (
    <>
      <div className="bg-main text-white py-4 h-20 sticky w-full z-1000">
        <DesktopHeader />
        <MobileHeader />
      </div>
      <Outlet />
    </>
  );
};

export const Route = createRootRoute({ component: RootLayout });
