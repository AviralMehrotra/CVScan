import { Link } from "react-router";
import { usePuterStore } from "~/lib/puter";

const Navbar = () => {
  const { auth } = usePuterStore();

  return (
    <nav className="navbar">
      <Link to="/">
        <p className="text-lg sm:text-xl font-bold text-gradient">CVScan</p>
      </Link>
      <div className="flex items-center gap-2 sm:gap-4">
        <Link className="primary-button w-fit font-semibold max-sm:text-xs" to="/upload">
          <span className="max-sm:hidden">Upload Resume</span>
          <span className="sm:hidden">Upload</span>
        </Link>
        {auth.isAuthenticated && (
          <button
            className="py-1.5 px-3 sm:py-2 sm:px-4 bg-gradient-to-r from-red-400 to-red-600 text-white rounded-full font-semibold hover:from-red-500 hover:to-red-700 transition-all duration-200 text-xs sm:text-sm"
            onClick={auth.signOut}
          >
            <span className="max-sm:hidden">Log Out</span>
            <span className="sm:hidden">Logout</span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
