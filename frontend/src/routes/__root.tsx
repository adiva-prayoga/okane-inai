import { createRootRouteWithContext, Link, Outlet } from "@tanstack/react-router";
import { type QueryClient } from "@tanstack/react-query";
// import { TanStackRouterDevtools } from "@tanstack/router-devtools";

interface MyRouteContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouteContext>()({
  component: Root,
});

function Navbar() {
  return (
    <div className="p-6 flex gap-4">
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
  );
}

function Root() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto">
        <Outlet />
      </main>
      {/* <TanStackRouterDevtools /> */}
    </>
  );
}
