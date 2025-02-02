"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState({ name: "", email: "", profilePicture: "" });

  useEffect(() => {
    // Retrieve user data from localStorage
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      setUser(userInfo);
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = isMenuOpen ? "unset" : "hidden";
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = "unset";
  };

  const navItems = [
    { href: "/register", label: "Register" },
    { href: "/login", label: "Login" }
  ];

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Navbar */}
      <div className="container mx-auto px-4 py-4 shadow-lg border-b border-gray-800">
        <div className="flex items-center h-16 lg:h-20">
          <button
            onClick={toggleMenu}
            className={`rounded-lg text-gray-400 transition duration-200 ${
              isMenuOpen ? "hover:text-white bg-transparent" : "hover:text-white hover:bg-transparent"
            } focus:outline-none focus:ring-2`}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-6 h-6" />}
          </button>
          <div className="flex-1 flex justify-center lg:justify-start lg:ml-8">
            <Link href="/" className="flex items-center space-x-1">
              <span className="text-2xl font-bold tracking-tight">Logo</span>
            </Link>
          </div>
          <nav className="hidden lg:flex items-center justify-end">
            <ul className="flex space-x-6">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="px-4 py-2 font-extrabold text-[20px] hover:text-gray-300 hover:bg-gray-800 rounded-lg transition duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* User Profile Display */}
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="bg-white p-8 rounded-xl shadow-lg w-80 text-center">
          <img
            src={user.profilePicture}
            alt={`${user.name}'s profile`}
            className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-black"
          />
          <h1 className="text-xl font-semibold text-black mb-2">{user.name}</h1>
          <p className="text-sm text-black mb-4">{user.email}</p>
          <button className="bg-black text-white py-2 fs-bold px-6 rounded-full mt-4 hover:bg-gray-800 transition">
            Edit Profile
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" onClick={closeMenu}>
          <div
            className="absolute inset-y-0 left-0 w-72 bg-gray-900 transform transition-transform duration-300 ease-in-out"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="flex-1 py-6 space-y-1 ml-5 mt-10">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-5 py-2 text-base font-bold text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition duration-200"
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}

export default Nav;
