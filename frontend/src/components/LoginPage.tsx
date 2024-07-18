import { Button } from "@/components/ui/button"

const LoginPage = () => {
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
  )
}

export default LoginPage