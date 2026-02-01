import React from "react";
import { TrendingUp } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const StatCard = ({ title, value, icon: Icon, gradient, delay }) => {
    const { isDarkMode } = useTheme();

    return (
        <div
            className="transform hover:scale-105 transition-all duration-300"
            style={{ animation: `slideUp 0.6s ease-out ${delay}s backwards` }}
        >
            <div
                className={`bg-gradient-to-br ${gradient} rounded-xl p-6 shadow-lg border transition-all duration-300 hover:shadow-2xl ${isDarkMode
                        ? "border-white/10 hover:border-white/20"
                        : "border-gray-200/50 hover:border-gray-300/50"
                    }`}
            >
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        <p
                            className={`text-sm font-semibold mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
                        >
                            {title}
                        </p>
                        <h3
                            className={`text-4xl font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}
                        >
                            {value}
                        </h3>
                    </div>
                    <div
                        className={`p-3 rounded-lg ml-4 ${isDarkMode ? "bg-white/10" : "bg-white/30"}`}
                    >
                        <Icon className="w-8 h-8 text-white" />
                    </div>
                </div>
                <div
                    className={`mt-4 flex items-center text-xs ${isDarkMode ? "text-green-400" : "text-green-600"}`}
                >
                    <TrendingUp className="w-3 h-3 mr-1" />
                    <span>+12% from last week</span>
                </div>
            </div>
        </div>
    );
};

export default StatCard;
