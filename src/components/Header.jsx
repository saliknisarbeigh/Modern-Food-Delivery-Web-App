import { LOGO_URL } from "../utils/constants";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useOnlineStatus from "../utils/useOnlineStatus";

const Header = () => {
  const [button, setButton] = useState("login");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const onlineStatus = useOnlineStatus();
  const { totalItems } = useSelector((state) => state.cart);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="flex items-center"
              onClick={closeMobileMenu}
            >
              <img
                className="h-14 w-auto rounded-full"
                src={LOGO_URL}
                alt="Swiggy Clone Logo"
              />
            </Link>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-orange-600 transition-colors duration-200 font-medium"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-orange-600 transition-colors duration-200 font-medium"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-orange-600 transition-colors duration-200 font-medium"
            >
              Contact
            </Link>
            <Link
              to="/grocery"
              className="text-gray-700 hover:text-orange-600 transition-colors duration-200 font-medium"
            >
              Grocery
            </Link>
          </nav>

          {/* Right Side - Cart, Online Status, Login */}
          <div className="flex items-center space-x-4">
            {/* Online Status */}
            <div className="hidden sm:flex items-center text-sm">
              <span className="mr-2 text-gray-600">Status:</span>
              <span
                className={`flex items-center ${
                  onlineStatus ? "text-green-600" : "text-red-600"
                }`}
              >
                {onlineStatus ? (
                  <>
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                    Online
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-1"></div>
                    Offline
                  </>
                )}
              </span>
            </div>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-700 hover:text-orange-600 transition-colors duration-200"
              aria-label="View cart"
              onClick={closeMobileMenu}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </Link>

            {/* Login Button */}
            <button
              className="px-4 py-2 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors duration-200 shadow-md"
              onClick={() => setButton(button === "login" ? "logout" : "login")}
              aria-label={button === "login" ? "Login" : "Logout"}
            >
              {button}
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-700 hover:text-orange-600 transition-colors duration-200"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-64 opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-200 bg-white">
            <Link
              to="/"
              className="block px-3 py-2 text-gray-700 hover:text-orange-600 transition-colors duration-200 rounded-md hover:bg-gray-50"
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 text-gray-700 hover:text-orange-600 transition-colors duration-200 rounded-md hover:bg-gray-50"
              onClick={closeMobileMenu}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 text-gray-700 hover:text-orange-600 transition-colors duration-200 rounded-md hover:bg-gray-50"
              onClick={closeMobileMenu}
            >
              Contact
            </Link>
            <Link
              to="/grocery"
              className="block px-3 py-2 text-gray-700 hover:text-orange-600 transition-colors duration-200 rounded-md hover:bg-gray-50"
              onClick={closeMobileMenu}
            >
              Grocery
            </Link>

            {/* Mobile Online Status */}
            <div className="px-3 py-2 text-sm">
              <span className="text-gray-600">Status: </span>
              <span
                className={`flex items-center ${
                  onlineStatus ? "text-green-600" : "text-red-600"
                }`}
              >
                {onlineStatus ? (
                  <>
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                    Online
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-1"></div>
                    Offline
                  </>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
