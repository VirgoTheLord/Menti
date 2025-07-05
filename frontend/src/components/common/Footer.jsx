import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>
            &copy; {new Date().getFullYear()} MentiMeter Clone. All rights
            reserved.
          </p>
          <p>Created by Alwin</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
