import { createFileRoute, Outlet } from "@tanstack/react-router";

import { userQueryOptions } from "@/lib/api";
import Navbar from "@/components/Navbar";
import LoginPage from "@/components/LoginPage";

const AuthenticatedComponent = () => {
  const { user } = Route.useRouteContext();

  if (!user) {
    return <LoginPage />;
  }

  return (
    <>
      <Navbar email={user.email} />
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
