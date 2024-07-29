import {
  Button
} from "@/components/ui/button";

import { LogOut } from "lucide-react"

const LogoutButton = () => {
  return (
    <a href="/api/logout">
      <Button 
        variant="outline"
        size="icon"
      >
        <LogOut className="h-4 w-4" strokeWidth={2.5} />
      </Button>
    </a>
  )
}

export default LogoutButton