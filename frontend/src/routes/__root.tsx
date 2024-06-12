import { createRootRouteWithContext, Link, Outlet } from "@tanstack/react-router";
import { type QueryClient } from "@tanstack/react-query";

import { Toaster } from "@/components/ui/sonner"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { ArrowUpRight, Plus } from "lucide-react"

// import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import { useQuery } from "@tanstack/react-query";
import { userQueryOptions } from "@/lib/api";

interface MyRouteContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouteContext>()({
  component: Root,
});

function Navbar() {
  const { data } = useQuery(userQueryOptions);

  return (
    <div className="py-4 flex justify-between items-center">
      <div>
        <Link to="/">
        Okane Inai
        </Link>
      </div>
      <div className="flex justify-between items-center gap-6">
        <Link to="/expenses" className="flex [&.active]:font-bold">
          Expenses
        </Link>
        <Link to="/create-expense" className="[&.active]:font-bold">
          Create
        </Link>
      </div>
      <div className="flex items-center gap-6">
        <Link to="/profile" className="[&.active]:font-bold">
          <Avatar>
            <AvatarImage src={data?.user.picture || "https://github.com/shadcn.png"} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </div>
  );
}

function Root() {
  return (
    <>
      <main className="container mx-auto font-inter text-[#040404]">
        <Navbar/>
        <Outlet />
      </main>
      <Toaster />
      {/* <TanStackRouterDevtools /> */}
    </>
  );
}
