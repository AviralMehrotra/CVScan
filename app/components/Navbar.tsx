import { Link } from "react-router";
import { usePuterStore } from "~/lib/puter";

const Navbar = () => {
  const { auth } = usePuterStore();

  return (
    <nav className="navbar">
      <Link to="/" className="flex items-center gap-2 group">
        <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform">
          C
        </div>
        <p className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
          CV<span className="text-orange-500">Scan</span>
        </p>
      </Link>
      <div className="flex items-center gap-2 sm:gap-6">
        {auth.isAuthenticated && (
          <Link
            to="/dashboard"
            className="text-gray-600 hover:text-orange-500 font-medium transition-colors max-sm:text-sm"
          >
            Dashboard
          </Link>
        )}
        <Link
          className="w-fit font-semibold max-sm:text-xs bg-orange-500 hover:bg-orange-600 sm:py-2 sm:px-4 py-1.5 px-3 text-white rounded-full"
          to="/upload"
        >
          <span className="max-sm:hidden ">Upload Resume</span>
          <span className="sm:hidden">Upload</span>
        </Link>
        {auth.isAuthenticated && (
          <button
            className="sm:py-2 sm:px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full font-semibold transition-all duration-200 text-xs sm:text-sm"
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
