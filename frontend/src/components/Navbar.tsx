import { Link} from "@tanstack/react-router";

const Navbar = () => {
  return (
    <header className="border-b mb-10">
      <nav>
        <div className="py-4 flex justify-between items-center">
          <div className="flex justify-between items-center gap-6">
            <Link to="/" className="flex [&.active]:font-bold [&.active]:text-primary text-gray-500">Home</Link>
            <Link to="/expenses" className="flex [&.active]:font-bold [&.active]:text-primary text-gray-500">List</Link>
            <Link to="/create-expense" className="flex [&.active]:font-bold [&.active]:text-primary text-gray-500">Create</Link>
          </div>
          <div className="flex items-center gap-6 text-gray-500">
            <a href="/api/logout">Logout</a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar