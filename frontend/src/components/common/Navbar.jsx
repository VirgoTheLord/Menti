import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  return (
    <div className="bg-gray-800 text-white">
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <a
            onClick={() => navigate("/")}
            className="text-white text-lg font-bold"
          >
            MentiMeter Clone
          </a>
          <div>
            <a
              onClick={() => navigate("/")}
              className="text-white px-4 cursor-pointer"
            >
              Home
            </a>
            {token ? (
              <>
                <a
                  onClick={() => navigate("/create")}
                  className="text-white px-4 cursor-pointer"
                >
                  Create Quiz
                </a>
                <a
                  onClick={() => navigate("/join-quiz")}
                  className="text-white px-4 cursor-pointer"
                >
                  Join Quiz
                </a>
                <a>
                  <button
                    onClick={() => {
                      localStorage.removeItem("token");
                      navigate("/");
                    }}
                    className="text-white px-4 cursor-pointer"
                  >
                    Logout
                  </button>
                </a>
              </>
            ) : (
              <>
                <a
                  onClick={() => navigate("/login")}
                  className="text-white px-4 cursor-pointer"
                >
                  Login
                </a>
                <a
                  onClick={() => navigate("/signup")}
                  className="text-white px-4 cursor-pointer"
                >
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
