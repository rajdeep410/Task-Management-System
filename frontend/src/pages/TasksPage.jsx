import React from "react";
import TaskBoard from "../components/TaskBoard";
import { useTheme } from "../context/ThemeContext";

const TasksPage = () => {
    const { isDarkMode } = useTheme();

    return (
        <div className="w-full h-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col">
            <div className="mb-6">
                <h2
                    className={`text-3xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-slate-900"}`}
                >
                    Task Management
                </h2>
                <p
                    className={`text-base ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                >
                    Organize and track all your project tasks.
                </p>
            </div>

            <div
                className={`flex-1 rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col min-h-[600px] transition-colors duration-300 border ${isDarkMode
                        ? "bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-purple-500/20"
                        : "bg-gradient-to-br from-white/80 to-purple-50/50 border-purple-200/50"
                    }`}
            >
                <TaskBoard />
            </div>
        </div>
    );
};

export default TasksPage;
