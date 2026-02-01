import React from "react";
import { Outlet } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import Navbar from "./Navbar";

const Layout = () => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`h-full min-h-screen flex flex-col overflow-hidden transition-colors duration-300 bg-transparent`}
    >
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto flex flex-col items-center w-full pt-16">
        <Outlet />
      </main>

      {/* Global Embedded Styles from Dashboard */}
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Layout;
