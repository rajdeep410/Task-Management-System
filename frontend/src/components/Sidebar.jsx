import React, { useState } from "react";
import { Menu, X, Search, Clock, Tag, Archive, Trash2 } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Team");
  const { isDarkMode } = useTheme();

  const projects = [
    { name: "Monicca - Saas Product", count: 9 },
    { name: "BCA - CRM Web App", count: 11 },
    { name: "Mandiri - Landing Page", count: 0 },
    { name: "People Hours - Company Profile", count: 0 },
    { name: "Bandai - Social Media Plan", count: 8 },
  ];

  const categories = [
    { name: "Saas Product", count: 2 },
    { name: "Finance Product", count: 14 },
    { name: "CRM Web App", count: 4 },
  ];

  return (
    <div
      className={`${
        isOpen ? "w-72" : "w-20"
      } transition-all duration-300 h-screen flex flex-col overflow-hidden shadow-xl ${
        isDarkMode
          ? "bg-gradient-to-b from-slate-900 to-slate-950 border-r border-slate-700/50"
          : "bg-gradient-to-b from-white to-gray-50 border-r border-gray-200"
      }`}
    >
      {/* Header */}
      <div
        className={`${
          isDarkMode
            ? "bg-slate-800/50 border-b border-slate-700/50"
            : "bg-white border-b border-gray-200"
        } p-4 flex items-center justify-between flex-shrink-0`}
      >
        {isOpen && (
          <h1
            className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}
          >
            Projects
          </h1>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`p-2 rounded-lg transition ${
            isDarkMode
              ? "hover:bg-slate-700 text-gray-400 hover:text-white"
              : "hover:bg-gray-200 text-gray-600 hover:text-slate-900"
          }`}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Tabs */}
      {isOpen && (
        <div
          className={`flex gap-2 px-4 py-3 ${
            isDarkMode ? "bg-slate-800/30" : "bg-gray-50"
          } border-b ${isDarkMode ? "border-slate-700/30" : "border-gray-200"}`}
        >
          <button
            onClick={() => setActiveTab("Team")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === "Team"
                ? isDarkMode
                  ? "bg-purple-600 text-white"
                  : "bg-purple-100 text-purple-900"
                : isDarkMode
                ? "text-gray-400 hover:text-white"
                : "text-gray-600 hover:text-slate-900"
            }`}
          >
            Team
          </button>
          <button
            onClick={() => setActiveTab("Personal")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === "Personal"
                ? isDarkMode
                  ? "bg-purple-600 text-white"
                  : "bg-purple-100 text-purple-900"
                : isDarkMode
                ? "text-gray-400 hover:text-white"
                : "text-gray-600 hover:text-slate-900"
            }`}
          >
            Personal
          </button>
        </div>
      )}

      {/* Search */}
      {isOpen && (
        <div
          className={`px-4 py-3 ${isDarkMode ? "bg-slate-800/20" : "bg-gray-50"} border-b ${
            isDarkMode ? "border-slate-700/30" : "border-gray-200"
          } flex-shrink-0`}
        >
          <div
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
              isDarkMode
                ? "bg-slate-700/40 border border-slate-600/50"
                : "bg-white border border-gray-300"
            }`}
          >
            <Search size={16} className={isDarkMode ? "text-gray-500" : "text-gray-400"} />
            <input
              type="text"
              placeholder="Search..."
              className={`flex-1 text-sm outline-none ${
                isDarkMode
                  ? "bg-transparent text-white placeholder-gray-500"
                  : "bg-white text-slate-900 placeholder-gray-400"
              }`}
            />
          </div>
        </div>
      )}

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Recent Projects */}
        {isOpen && (
          <div
            className={`p-4 border-b ${isDarkMode ? "border-slate-700/30" : "border-gray-200"}`}
          >
            <div
              className={`flex items-center space-x-2 text-sm font-semibold mb-3 ${
                isDarkMode ? "text-gray-300" : "text-slate-600"
              }`}
            >
              <Clock size={16} />
              <span>Recent</span>
            </div>
            <div className="space-y-2">
              {projects.map((project, idx) => (
                <button
                  key={idx}
                  className={`w-full text-left px-3 py-2 rounded-lg transition flex items-center justify-between ${
                    isDarkMode
                      ? "hover:bg-slate-700/50 text-gray-300 hover:text-white"
                      : "hover:bg-gray-200 text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <span className="text-xs font-medium truncate">
                    # {project.name}
                  </span>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      isDarkMode
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {project.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Categories */}
        {isOpen && (
          <div
            className={`p-4 border-b ${isDarkMode ? "border-slate-700/30" : "border-gray-200"}`}
          >
            <div
              className={`flex items-center space-x-2 text-sm font-semibold mb-3 ${
                isDarkMode ? "text-gray-300" : "text-slate-600"
              }`}
            >
              <Tag size={16} />
              <span>Categories</span>
            </div>
            <div className="space-y-2">
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  className={`w-full text-left px-3 py-2 rounded-lg transition flex items-center justify-between ${
                    isDarkMode
                      ? "hover:bg-slate-700/50 text-gray-300 hover:text-white"
                      : "hover:bg-gray-200 text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <span className="text-xs font-medium truncate">
                    # {cat.name}
                  </span>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      isDarkMode
                        ? "bg-red-500/20 text-red-400"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      {isOpen && (
        <div
          className={`p-4 border-t ${isDarkMode ? "border-slate-700/30" : "border-gray-200"} space-y-2 flex-shrink-0`}
        >
          <button
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition text-sm font-medium ${
              isDarkMode
                ? "text-gray-300 hover:bg-slate-700/50 hover:text-white"
                : "text-slate-600 hover:bg-gray-200 hover:text-slate-900"
            }`}
          >
            <Archive size={16} />
            <span>Archive</span>
          </button>
          <button
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition text-sm font-medium ${
              isDarkMode
                ? "text-gray-300 hover:bg-red-500/10 hover:text-red-400"
                : "text-slate-600 hover:bg-red-100 hover:text-red-700"
            }`}
          >
            <Trash2 size={16} />
            <span>Delete</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
