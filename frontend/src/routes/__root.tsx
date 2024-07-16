import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { type QueryClient } from "@tanstack/react-query";

import { Toaster } from "@/components/ui/sonner"

interface MyRouteContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouteContext>()({
  component: Root,
});

function Root() {
  return (
    <>
      <main className="container mx-auto font-inter text-[#040404]">
        <Outlet />
      </main>
      <Toaster />
    </>
  );
}
