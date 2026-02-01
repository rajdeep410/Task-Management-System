import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import {
  Filter,
  Search,
  Calendar,
  Flag,
  X,
  ChevronDown,
  ArrowUpDown,
} from "lucide-react";

const TaskFilterBar = ({ onFilter, onSort, onSearch }) => {
  const { isDarkMode } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearchInput = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handlePriorityFilter = (priority) => {
    setPriorityFilter(priorityFilter === priority ? "" : priority);
    onFilter("priority", priorityFilter === priority ? "" : priority);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(statusFilter === status ? "" : status);
    onFilter("status", statusFilter === status ? "" : status);
  };

  const handleSort = (sortOption) => {
    setSortBy(sortOption);
    onSort(sortOption);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setPriorityFilter("");
    setStatusFilter("");
    setSortBy("date");
    onFilter("priority", "");
    onFilter("status", "");
    onSearch("");
    onSort("date");
  };

  const PriorityButton = ({ priority, label, color }) => (
    <button
      onClick={() => handlePriorityFilter(priority)}
      className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${priorityFilter === priority
        ? `${color} text-white border-2 border-white`
        : `${color} border-2 border-transparent ${isDarkMode ? "text-white/60 hover:text-white" : "text-slate-700 hover:text-slate-900"}`
        }`}
    >
      <Flag className="w-4 h-4 inline mr-1" />
      {label}
    </button>
  );

  const StatusButton = ({ status, label, color }) => (
    <button
      onClick={() => handleStatusFilter(status)}
      className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${statusFilter === status
        ? `${color} text-white border-2 border-white`
        : `${color} border-2 border-transparent ${isDarkMode ? "text-white/60 hover:text-white" : "text-slate-700 hover:text-slate-900"}`
        }`}
    >
      {label}
    </button>
  );

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={handleSearchInput}
          className={`w-full pl-12 pr-4 py-3 rounded-lg border outline-none transition-colors duration-200 ${isDarkMode
            ? "bg-slate-800/50 border-purple-500/30 text-white placeholder-gray-500 focus:border-purple-500"
            : "bg-white border-purple-200 text-slate-900 placeholder-gray-400 focus:border-purple-400 shadow-sm"
            }`}
        />
      </div>

      {/* Filter Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`flex items-center justify-between w-full px-4 py-2 rounded-lg border transition-colors duration-200 ${isDarkMode
          ? "bg-slate-800/50 border-purple-500/30 text-white hover:bg-slate-800"
          : "bg-white border-purple-200 text-slate-700 hover:bg-purple-50 shadow-sm"
          }`}
      >
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-purple-400" />
          <span>Filters</span>
        </div>
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""
            }`}
        />
      </button>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className={`space-y-4 p-4 rounded-lg border animate-slideDown ${isDarkMode
          ? "bg-slate-800/50 border-purple-500/30"
          : "bg-white border-purple-200 shadow-lg"
          }`}>
          {/* Priority Filter */}
          <div>
            <p className={`text-sm font-semibold mb-2 ${isDarkMode ? "text-white" : "text-slate-700"}`}>Priority</p>
            <div className="flex flex-wrap gap-2">
              <PriorityButton
                priority="high"
                label="High"
                color="bg-red-600/20"
              />
              <PriorityButton
                priority="medium"
                label="Medium"
                color="bg-yellow-600/20"
              />
              <PriorityButton
                priority="low"
                label="Low"
                color="bg-green-600/20"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <p className={`text-sm font-semibold mb-2 ${isDarkMode ? "text-white" : "text-slate-700"}`}>Status</p>
            <div className="flex flex-wrap gap-2">
              <StatusButton
                status="todo"
                label="To Do"
                color="bg-blue-600/20"
              />
              <StatusButton
                status="in-progress"
                label="In Progress"
                color="bg-purple-600/20"
              />
              <StatusButton
                status="completed"
                label="Completed"
                color="bg-green-600/20"
              />
              <StatusButton
                status="blocked"
                label="Blocked"
                color="bg-red-600/20"
              />
            </div>
          </div>

          {/* Sort Options */}
          <div>
            <p className={`text-sm font-semibold mb-2 ${isDarkMode ? "text-white" : "text-slate-700"}`}>Sort By</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleSort("date")}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-1 ${sortBy === "date"
                  ? "bg-purple-600 text-white border-2 border-white"
                  : `border-2 border-transparent ${isDarkMode ? "bg-slate-700/50 text-white/60 hover:text-white" : "bg-slate-100 text-slate-600 hover:text-slate-900"}`
                  }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Date</span>
              </button>
              <button
                onClick={() => handleSort("priority")}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-1 ${sortBy === "priority"
                  ? "bg-purple-600 text-white border-2 border-white"
                  : `border-2 border-transparent ${isDarkMode ? "bg-slate-700/50 text-white/60 hover:text-white" : "bg-slate-100 text-slate-600 hover:text-slate-900"}`
                  }`}
              >
                <ArrowUpDown className="w-4 h-4" />
                <span>Priority</span>
              </button>
            </div>
          </div>

          {/* Clear Filters Button */}
          <button
            onClick={clearFilters}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600/30 border border-red-500/30 transition-colors duration-200"
          >
            <X className="w-4 h-4" />
            <span>Clear All Filters</span>
          </button>
        </div>
      )}

      {/* Active Filters Display */}
      {(priorityFilter || statusFilter || searchTerm) && (
        <div className="flex flex-wrap gap-2">
          {priorityFilter && (
            <div className="flex items-center space-x-2 px-3 py-1 rounded-lg bg-red-600/20 text-red-400 border border-red-500/30">
              <span className="text-sm">{priorityFilter}</span>
              <button
                onClick={() => handlePriorityFilter(priorityFilter)}
                className="hover:text-red-300 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
          {statusFilter && (
            <div className="flex items-center space-x-2 px-3 py-1 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30">
              <span className="text-sm">{statusFilter}</span>
              <button
                onClick={() => handleStatusFilter(statusFilter)}
                className="hover:text-blue-300 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
          {searchTerm && (
            <div className="flex items-center space-x-2 px-3 py-1 rounded-lg bg-purple-600/20 text-purple-400 border border-purple-500/30">
              <span className="text-sm">Search: {searchTerm}</span>
              <button
                onClick={() => handleSearchInput({ target: { value: "" } })}
                className="hover:text-purple-300 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskFilterBar;
