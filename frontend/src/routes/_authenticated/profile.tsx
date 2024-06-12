import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { userQueryOptions } from "@/lib/api";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export const Route = createFileRoute("/_authenticated/profile")({
  component: Profile,
});

function Profile() {
  const { isPending, error, data } = useQuery(userQueryOptions);

  if (isPending) return "loading"
  if (error) return "not logged in"

  return (
    <div>
      <div className="flex justify-start items-center mb-4">
        <Avatar>
          <AvatarImage src={data.user.picture || "https://github.com/shadcn.png"} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col ml-2">
          <div className="flex justify-start items-center">
            <p className="text-[18px]">{data.user.given_name}</p>
            <p className="text-[18px] lowercase">{data.user.family_name}</p>
          </div>
          <p className="text-[14px]">{data.user.email}</p>
        </div>
      </div>
      <Button variant="default" asChild>
        <a href="/api/logout">Logout</a>
      </Button>
    </div>
  )
}
