import { createFileRoute, Outlet } from "@tanstack/react-router";

import { Button } from "@/components/ui/button"

import { useQuery } from "@tanstack/react-query";
import { userQueryOptions } from "@/lib/api";
import Navbar from "@/components/Navbar";

const UnauthorizedPage = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col items-center shadow-lg rounded-md">
        <div className="px-8 py-[50px]">
          <h1 className="text-2xl mb-2 font-semibold">Unauthorized</h1>
          <p className="mb-5 text-zinc-500">Please sign in to access this page</p>
          <Button className="w-full" variant="default" asChild>
            <a href="/api/login">Sign in</a>
          </Button>
        </div>
      </div>
    </div>
  );
}

const AuthenticatedComponent = () => {
  const { data } = useQuery(userQueryOptions);
  const { user } = Route.useRouteContext();

  if (!user) {
    return <UnauthorizedPage />;
  }

  return (
    <>
      <Navbar picture={data?.user.picture || "https://github.com/shadcn.png"} />
      <Outlet />
    </>
  );
}

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({context }) => {
    const queryClient = context.queryClient

    try {
      const data = await queryClient.fetchQuery(userQueryOptions)
      return data
    } catch (e) {
      return { user: null }
    }
  },
  component: AuthenticatedComponent
})
