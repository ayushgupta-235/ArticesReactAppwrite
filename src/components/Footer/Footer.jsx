import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Left Section - Logo & Copyright */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-xl font-semibold text-white">YourBrand</h2>
          <p className="text-sm text-gray-400 mt-1">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        {/* Center Section - Links */}
        <nav className="flex space-x-6">
          <a href="/" className="hover:text-white transition">
            Home
          </a>
          <a href="/about" className="hover:text-white transition">
            About
          </a>
          <a href="/contact" className="hover:text-white transition">
            Contact
          </a>
          <a href="/privacy" className="hover:text-white transition">
            Privacy
          </a>
        </nav>

        
      </div>
    </footer>
  );
}
