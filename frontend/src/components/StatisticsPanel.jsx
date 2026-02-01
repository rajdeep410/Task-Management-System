import React, { useState, useEffect } from "react";
import { PieChart, BarChart, Calendar } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const StatisticsPanel = ({ tasks = [] }) => {
  const { isDarkMode } = useTheme();
  const [chartData, setChartData] = useState({
    byStatus: {},
    byPriority: {},
    completionRate: 0,
  });

  useEffect(() => {
    if (tasks.length > 0) {
      calculateStats();
    }
  }, [tasks]);

  const calculateStats = () => {
    const byStatus = {};
    const byPriority = {};
    let completed = 0;

    tasks.forEach((task) => {
      // Count by status
      byStatus[task.status] = (byStatus[task.status] || 0) + 1;

      // Count by priority
      byPriority[task.priority] = (byPriority[task.priority] || 0) + 1;

      // Count completed
      if (task.status && task.status.toLowerCase() === "completed") {
        completed++;
      }
    });

    const completionRate =
      tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0;

    setChartData({
      byStatus,
      byPriority,
      completionRate,
    });
  };

  const PriorityBadge = ({ priority, count }) => {
    const colors = {
      high: isDarkMode ? "bg-red-500/20 text-red-400 border-red-500/30" : "bg-red-100 text-red-700 border-red-200",
      medium: isDarkMode ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" : "bg-yellow-100 text-yellow-700 border-yellow-200",
      low: isDarkMode ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-green-100 text-green-700 border-green-200",
    };

    return (
      <div
        className={`flex items-center justify-between px-4 py-2 rounded-lg border ${colors[priority] || (isDarkMode ? "bg-gray-500/20 text-gray-400 border-gray-500/30" : "bg-gray-100 text-gray-600 border-gray-200")
          }`}
      >
        <span className="capitalize font-medium">{priority} Priority</span>
        <span className={`ml-2 px-2 py-1 rounded font-bold ${isDarkMode ? "bg-white/10" : "bg-white"}`}>
          {count}
        </span>
      </div>
    );
  };

  const normalizeStatus = (status) => {
    return status.toLowerCase().replace(/\s+/g, "-");
  };

  const StatusBadge = ({ status, count }) => {
    const normalizedStatus = normalizeStatus(status);
    const colors = {
      "to-do": isDarkMode ? "bg-teal-500/20 text-teal-400 border-teal-500/30" : "bg-teal-100 text-teal-700 border-teal-200",
      "in-progress": isDarkMode ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : "bg-emerald-100 text-emerald-700 border-emerald-200",
      completed: isDarkMode ? "bg-lime-500/20 text-lime-400 border-lime-500/30" : "bg-lime-100 text-lime-700 border-lime-200",
      blocked: isDarkMode ? "bg-red-500/20 text-red-400 border-red-500/30" : "bg-red-100 text-red-700 border-red-200",
    };

    return (
      <div
        className={`flex items-center justify-between px-4 py-2 rounded-lg border ${colors[normalizedStatus] ||
          (isDarkMode ? "bg-gray-500/20 text-gray-400 border-gray-500/30" : "bg-gray-100 text-gray-600 border-gray-200")
          }`}
      >
        <span className="capitalize font-medium">{status}</span>
        <span className={`ml-2 px-2 py-1 rounded font-bold ${isDarkMode ? "bg-white/10" : "bg-white"}`}>
          {count}
        </span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Completion Rate */}
      <div className={`rounded-xl p-6 border ${isDarkMode ? "bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-[#FFD700]/10" : "bg-white border-[#FFD700]/20 shadow-md"}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}>Completion Rate</h3>
          <PieChart className="w-6 h-6 text-[#FF8C00]" />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
          <div className="relative w-32 h-32">
            <svg className="transform -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="rgba(107, 114, 128, 0.2)"
                strokeWidth="8"
              />
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="8"
                strokeDasharray={`${3.39 * chartData.completionRate} 339`}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient
                  id="gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#FF8C00" />
                  <stop offset="100%" stopColor="#2d8195" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                {chartData.completionRate}%
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600 font-medium"}`}>
              Great job! Your productivity is soaring! 🚀
            </p>
            <div className="flex items-center space-x-2 text-[#FF8C00] font-bold">
              <span>✓ Tasks completed this week</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks by Priority */}
      <div className={`rounded-xl p-6 border ${isDarkMode ? "bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-[#FFD700]/10" : "bg-white border-[#FFD700]/20 shadow-md"}`}>
        <h3 className={`text-xl font-bold mb-4 flex items-center ${isDarkMode ? "text-white" : "text-slate-900"}`}>
          <BarChart className="w-5 h-5 mr-2 text-orange-400" />
          Tasks by Priority
        </h3>
        <div className="space-y-3">
          {Object.entries(chartData.byPriority).map(([priority, count]) => (
            <PriorityBadge
              key={priority}
              priority={priority.toLowerCase()}
              count={count}
            />
          ))}
          {Object.keys(chartData.byPriority).length === 0 && (
            <p className="text-gray-400 text-center py-4">No tasks yet</p>
          )}
        </div>
      </div>

      {/* Tasks by Status */}
      <div className={`rounded-xl p-6 border ${isDarkMode ? "bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-[#FFD700]/10" : "bg-white border-[#FFD700]/20 shadow-md"}`}>
        <h3 className={`text-xl font-bold mb-4 flex items-center ${isDarkMode ? "text-white" : "text-slate-900"}`}>
          <Calendar className="w-5 h-5 mr-2 text-blue-400" />
          Tasks by Status
        </h3>
        <div className="space-y-3">
          {Object.entries(chartData.byStatus).map(([status, count]) => (
            <StatusBadge key={status} status={status} count={count} />
          ))}
          {Object.keys(chartData.byStatus).length === 0 && (
            <p className="text-gray-400 text-center py-4">No tasks yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatisticsPanel;
