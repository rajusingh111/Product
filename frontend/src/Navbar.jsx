import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Home
        </Link>
        <div>
          <Link to="/categories" className="mr-4 hover:underline">
            Categories
          </Link>
          <Link to="/products" className="hover:underline">
            Products
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
