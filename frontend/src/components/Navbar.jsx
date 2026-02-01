import React, { useState } from "react";
import { Menu, X, Bell, Settings, LogOut, Home, Moon, Sun } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinkClasses = ({ isActive }) =>
    `transition-colors duration-200 ${isActive
      ? "text-purple-600 dark:text-purple-400 font-bold"
      : isDarkMode
        ? "hover:text-purple-300"
        : "hover:text-purple-600"
    } ${isActive && isDarkMode ? "text-purple-400" : ""}`;

  const mobileNavLinkClasses = ({ isActive }) =>
    `block px-4 py-2 rounded transition-colors duration-200 ${isActive
      ? "bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-300"
      : isDarkMode
        ? "text-gray-300 hover:text-purple-400 hover:bg-purple-600/10"
        : "text-slate-600 hover:text-purple-600 hover:bg-purple-100"
    }`;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 shadow-md border-b backdrop-blur-md transition-all duration-300 ${isDarkMode
        ? "bg-slate-900/80 border-slate-700/50"
        : "bg-white/80 border-slate-200/60"
        }`}
    >
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF8C00] via-[#4db48b] to-[#2d8195] shadow-md border border-white/20">
              <span className="text-white font-bold text-lg">✓</span>
            </div>
            <div className="hidden sm:flex flex-col">
              <h1
                className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}
              >
                TaskFlow
              </h1>
              <p
                className={`text-xs ${isDarkMode ? "text-[#FFD700]" : "text-[#B8860B]"}`}
              >
                Manage with Excellence
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div
            className={`hidden md:flex items-center space-x-8 font-semibold ${isDarkMode ? "text-white" : "text-slate-900"}`}
          >
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center space-x-2 transition-colors duration-200 ${isActive
                  ? "text-purple-600 dark:text-purple-400 font-bold"
                  : isDarkMode
                    ? "hover:text-purple-300"
                    : "hover:text-purple-600"
                } ${isActive && isDarkMode ? "text-purple-400" : ""}`
              }
            >
              <Home size={20} />
              <span>Dashboard</span>
            </NavLink>
            <NavLink to="/tasks" className={navLinkClasses}>
              Tasks
            </NavLink>
            <NavLink to="/analytics" className={navLinkClasses}>
              Analytics
            </NavLink>
            <NavLink to="/team" className={navLinkClasses}>
              Team
            </NavLink>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all duration-200 ${isDarkMode
                ? "text-yellow-300 hover:text-yellow-400 hover:bg-yellow-500/20"
                : "text-blue-600 hover:text-blue-700 hover:bg-blue-100"
                }`}
              title={
                isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
              }
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Notifications */}
            <button
              className={`relative p-2 transition-colors duration-200 group ${isDarkMode
                ? "text-gray-300 hover:text-purple-400"
                : "text-slate-600 hover:text-purple-600"
                }`}
            >
              <Bell size={22} />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
              <div
                className={`absolute right-0 mt-2 w-64 rounded-lg shadow-xl p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ${isDarkMode
                  ? "bg-slate-800"
                  : "bg-white border border-gray-200"
                  }`}
              >
                <h3
                  className={`font-semibold mb-3 ${isDarkMode ? "text-white" : "text-slate-900"}`}
                >
                  Notifications
                </h3>
                <div className="space-y-2">
                  <p
                    className={`text-sm ${isDarkMode ? "text-gray-300" : "text-slate-600"}`}
                  >
                    New task assigned
                  </p>
                  <p
                    className={`text-sm ${isDarkMode ? "text-gray-300" : "text-slate-600"}`}
                  >
                    Task deadline approaching
                  </p>
                  <p
                    className={`text-sm ${isDarkMode ? "text-gray-300" : "text-slate-600"}`}
                  >
                    Team member completed task
                  </p>
                </div>
              </div>
            </button>


            {/* User Profile */}
            <NavLink
              to="/profile"
              className={({ isActive }) => `flex items-center space-x-2 px-2 sm:px-4 py-2 rounded-lg transition-colors duration-200 ${isDarkMode
                ? isActive ? "bg-[#FFFACD]/10 text-white border-white/50" : "bg-gradient-to-r from-[#2d8195]/20 to-[#FF8C00]/20 border border-white/10 hover:border-white/30 text-gray-300 hover:text-white"
                : isActive ? "bg-[#FFFACD] text-[#B8860B] border-[#FFD700]" : "bg-white border-[#FFD700]/30 shadow-sm hover:bg-[#FFFACD]/30 text-slate-600 hover:text-[#B8860B]"
                }`}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2d8195] to-[#FF8C00] flex items-center justify-center text-white font-bold">
                R
              </div>
              <span className="text-sm hidden sm:block">rajdeep410</span>
            </NavLink>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMenu}
              className={`md:hidden p-2 rounded-lg transition-all duration-200 ${isDarkMode
                ? "text-gray-300 hover:text-purple-400"
                : "text-slate-600 hover:text-purple-600"
                }`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div
            className={`md:hidden pb-4 border-t ${isDarkMode ? "border-purple-500/20" : "border-purple-200/50"
              }`}
          >
            <NavLink
              to="/"
              onClick={toggleMenu}
              className={mobileNavLinkClasses}
            >
              <span>Dashboard</span>
            </NavLink>
            <NavLink
              to="/tasks"
              onClick={toggleMenu}
              className={mobileNavLinkClasses}
            >
              Tasks
            </NavLink>
            <NavLink
              to="/analytics"
              onClick={toggleMenu}
              className={mobileNavLinkClasses}
            >
              Analytics
            </NavLink>
            <NavLink
              to="/team"
              onClick={toggleMenu}
              className={mobileNavLinkClasses}
            >
              Team
            </NavLink>
            <NavLink
              to="/profile"
              onClick={toggleMenu}
              className={mobileNavLinkClasses}
            >
              Profile
            </NavLink>
            <button
              className={`w-full flex items-center space-x-2 px-4 py-2 mt-2 ${isDarkMode
                ? "text-gray-300 hover:text-red-400"
                : "text-slate-600 hover:text-red-600"
                }`}
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
