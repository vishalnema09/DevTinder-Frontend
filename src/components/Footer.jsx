import React from "react";

const Footer = () => {
  return (
    <footer className="bg-amber-50 text-[#B22166] px-6 py-4 flex flex-col md:flex-row justify-between items-center shadow-inner border-t border-gray-200">
      {/* Left Side */}
      <div className="flex items-center gap-2">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-[#B22166]"
        >
          <path d="..." /> {/* Put your actual SVG path here */}
        </svg>
        <p className="text-sm font-medium">
          © {new Date().getFullYear()} DevTinder. All rights reserved.
        </p>
      </div>

      {/* Right Side - Social Icons */}
      <div className="flex space-x-4 mt-3 md:mt-0">
        <a href="#" className="hover:text-[#007AFF] transition-colors duration-200">
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="..." />
          </svg>
        </a>
        <a href="#" className="hover:text-[#007AFF] transition-colors duration-200">
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="..." />
          </svg>
        </a>
        <a href="#" className="hover:text-[#007AFF] transition-colors duration-200">
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="..." />
          </svg>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
