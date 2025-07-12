import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Power } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "../ui/sheet";
import { Button } from "../ui/button";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Create Quiz", path: "/create", protected: true },
  { label: "Join Quiz", path: "/join-quiz", protected: true },
  { label: "Login", path: "/login", protected: false },
  { label: "Sign Up", path: "/signup", protected: false, isButton: true },
];

const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    setOpen(false);
  };

  return (
    <header className="w-full bg-blue-200 text-black shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 font-raleway">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <button
            aria-label="Go to Home"
            onClick={() => navigate("/")}
            className="text-3xl font-black font-barlow-condensed focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 transition-colors duration-150"
          >
            MentiMeter<span className="text-blue-400"> Clone</span>
          </button>
        </div>
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-2">
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
                onClick={handleLogout}
                className="ml-2 px-5 py-2 font-semibold rounded-full text-white bg-blue-400 hover:bg-blue-500 transition-colors duration-150 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavbarLink onClick={() => navigate("/login")} label="Login" />
              <button
                onClick={() => navigate("/signup")}
                className="ml-2 px-5 py-2 font-semibold bg-blue-500 text-white hover:bg-blue-600 hover:text-white rounded-full md:text-sm text-xs cursor-pointer shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
        {/* Mobile Nav */}
        <div className="flex md:hidden items-center gap-2">
          {token ? (
            <Button
              variant="ghost"
              size="icon"
              className="p-2"
              aria-label="Logout"
              onClick={handleLogout}
            >
              <Power className="w-5 h-5 text-blue-700" />
            </Button>
          ) : null}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="p-2"
                aria-label="Open navigation"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-3/5 bg-blue-200 text-black p-6 flex flex-col"
            >
              <SheetTitle className="text-3xl font-black font-barlow-condensed mb-2">
                Menu
              </SheetTitle>
              <SheetDescription className="text-base text-muted-foreground mb-4">
                Navigate through MentiMeter Clone
              </SheetDescription>
              <div className="flex flex-col gap-3 mt-4">
                {/* Nav Links */}
                <SheetClose asChild>
                  <MobileNavLink
                    onClick={() => setOpen(false) || navigate("/")}
                    label="Home"
                  />
                </SheetClose>
                {token ? (
                  <>
                    <SheetClose asChild>
                      <MobileNavLink
                        onClick={() => setOpen(false) || navigate("/create")}
                        label="Create Quiz"
                      />
                    </SheetClose>
                    <SheetClose asChild>
                      <MobileNavLink
                        onClick={() => setOpen(false) || navigate("/join-quiz")}
                        label="Join Quiz"
                      />
                    </SheetClose>
                    <SheetClose asChild>
                      <Button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 bg-blue-400 text-white hover:bg-blue-500 rounded-full font-semibold shadow"
                      >
                        <Power className="w-4 h-4" /> Logout
                      </Button>
                    </SheetClose>
                  </>
                ) : (
                  <>
                    <SheetClose asChild>
                      <MobileNavLink
                        onClick={() => setOpen(false) || navigate("/login")}
                        label="Login"
                      />
                    </SheetClose>
                    <SheetClose asChild>
                      <Button
                        onClick={() => setOpen(false) || navigate("/signup")}
                        className="w-full bg-blue-500 text-white hover:bg-blue-600 rounded-full font-semibold shadow"
                      >
                        Sign Up
                      </Button>
                    </SheetClose>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

const NavbarLink = ({ onClick, label }) => (
  <button
    onClick={onClick}
    className="px-4 py-2 rounded-full font-medium text-black bg-transparent transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 text-sm underline-hover"
  >
    {label}
  </button>
);

const MobileNavLink = ({ onClick, label }) => (
  <button
    onClick={onClick}
    className="w-full text-left py-2 mb-1 rounded-full font-medium text-black bg-transparent hover:bg-blue-300 transition-colors duration-150 text-base"
  >
    {label}
  </button>
);

export default Navbar;
