import {
  Button
} from "@/components/ui/button";

import { LogOut } from "lucide-react"

const LogoutButton = () => {
  return (
    <a href="/api/logout">
      <Button 
        variant="destructive"
        size="icon"
      >
        <LogOut className="h-4 w-4" strokeWidth={3} />
      </Button>
    </a>
  )
}

export default LogoutButton