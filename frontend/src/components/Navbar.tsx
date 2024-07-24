import { Link} from "@tanstack/react-router";

import LogoutButton from "./LogoutButton";

const Navbar = ({ email } : { email: string }) => {
  return (
    <header className="border-b mb-10">
      <nav>
        <div className="py-4 flex justify-between items-center">
          <div className="flex justify-between items-center gap-6">
            <Link to="/" className="flex [&.active]:font-bold [&.active]:text-primary text-gray-500">Home</Link>
            <Link to="/expenses" className="flex [&.active]:font-bold [&.active]:text-primary text-gray-500">Expenses</Link>
            <Link to="/create-expense" className="flex [&.active]:font-bold [&.active]:text-primary text-gray-500">Add</Link>
          </div>
          <div className="flex items-center gap-4 text-sm">
            {email}
            <LogoutButton />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar