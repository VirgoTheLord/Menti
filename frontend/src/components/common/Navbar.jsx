import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  return (
    <div className="bg-gray-800 text-white">
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <a href="/" className="text-white text-lg font-bold">
            MentiMeter Clone
          </a>
          <div>
            <a href="/" className="text-white px-4">
              Home
            </a>
            {token ? (
              <>
                <a href="/create" className="text-white px-4">
                  Create Quiz
                </a>
                <a href="/join-quiz" className="text-white px-4">
                  Join Quiz
                </a>
                <a href="/">
                  <button
                    onClick={() => {
                      localStorage.removeItem("token");
                      navigate("/");
                    }}
                    className="text-white px-4"
                  >
                    Logout
                  </button>
                </a>
              </>
            ) : (
              <>
                <a href="/login" className="text-white px-4">
                  Login
                </a>
                <a href="/signup" className="text-white px-4">
                  Sign Up
                </a>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
