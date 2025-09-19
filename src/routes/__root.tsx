import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { useMapStore } from "../stores/ui";

const RootLayout = () => {
  const toggleMap = useMapStore((s) => s.toggleMap);

  return (
    <>
      <div className="p-2 flex gap-2 items-center justify-between mx-2 px-2">
        <div className="flex gap-2">
          <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>
          <Link to="/about" className="[&.active]:font-bold">
            About
          </Link>
        </div>
        <button onClick={toggleMap}>Show map</button>
      </div>

      <Outlet />
    </>
  );
};

export const Route = createRootRoute({ component: RootLayout });
