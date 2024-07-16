import { Link} from "@tanstack/react-router";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

const Navbar = ({ picture }: { picture: string }) => {

  return (
    <header>
      <nav>
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
                <AvatarImage src={picture} alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar