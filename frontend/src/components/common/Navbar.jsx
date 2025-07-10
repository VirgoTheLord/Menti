import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  return (
    <header className="bg-white/80 backdrop-blur sticky top-0 z-50 shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
        <button
          aria-label="Go to Home"
          onClick={() => navigate("/")}
          className="text-2xl font-extrabold text-blue-600 hover:text-blue-800 tracking-tight transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
        >
          MentiMeter<span className="text-blue-400"> Clone</span>
        </button>

        <div className="flex items-center gap-2 sm:gap-1 md:gap-2">
          <NavbarLink onClick={() => navigate("/")} label="Home" />
          {token ? (
            <>
              <NavbarLink
                onClick={() => navigate("/create")}
                label="Create Quiz"
              />
              <NavbarLink
                onClick={() => navigate("/join-quiz")}
                label="Join Quiz"
              />
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/");
                }}
                className="ml-2 px-5 py-2 font-semibold rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors duration-150 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavbarLink onClick={() => navigate("/login")} label="Login" />
              <button
                onClick={() => navigate("/signup")}
                className="ml-2 px-5 py-2 font-semibold rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-150 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

const NavbarLink = ({ onClick, label }) => (
  <button
    onClick={onClick}
    className="px-4 py-2 rounded-full font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
  >
    {label}
  </button>
);

export default Navbar;
