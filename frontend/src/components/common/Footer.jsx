import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white/80 backdrop-blur border-t border-blue-100 py-6 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-gray-700 text-sm">
        <div className="mb-2 md:mb-0 text-center md:text-left">
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-semibold text-blue-600">MentiMeter Clone</span>.
          All rights reserved.
        </div>
        <div className="text-center md:text-right">
          <span className="text-gray-500">Created by</span>{" "}
          <span className="font-medium text-blue-500">Alwin</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
