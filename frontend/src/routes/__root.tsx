import { createRootRouteWithContext, Link, Outlet } from "@tanstack/react-router";
import { type QueryClient } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner"
// import { TanStackRouterDevtools } from "@tanstack/router-devtools";

interface MyRouteContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouteContext>()({
  component: Root,
});

function Navbar() {
  return (
    <div className="py-6 flex justify-between items-center">
      <div className="text-2xl font-semibold">
        Okane Inai
      </div>
      <div className="flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
        <Link to="/expenses" className="[&.active]:font-bold">
          Expenses
        </Link>
        <Link to="/create-expense" className="[&.active]:font-bold">
          Create Expense
        </Link>
        <Link to="/profile" className="[&.active]:font-bold">
          Profile
        </Link>
      </div>
    </div>
  );
}

function Root() {
  return (
    <>
      <main className="container mx-auto font-plusJakartaSans">
        <Navbar />
        <Outlet />
      </main>
      <Toaster />
      {/* <TanStackRouterDevtools /> */}
    </>
  );
}
