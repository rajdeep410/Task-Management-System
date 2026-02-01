import React, { useEffect, useState } from "react";
import StatisticsPanel from "../components/StatisticsPanel";
import { useTheme } from "../context/ThemeContext";
import { taskAPI } from "../services/api"; // Ensure this path is correct
import { Loader, AlertCircle } from "lucide-react";

const AnalyticsPage = () => {
    const { isDarkMode } = useTheme();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const data = await taskAPI.getAllTasks();
            setTasks(data);
        } catch (error) {
            console.error("Error fetching tasks for analytics:", error);
            setError("Failed to load analytics data.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="mb-8">
                <h2
                    className={`text-3xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-slate-900"}`}
                >
                    Analytics Overview
                </h2>
                <p
                    className={`text-base ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                >
                    Detailed insights into project performance and task distribution.
                </p>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader className={`w-12 h-12 animate-spin ${isDarkMode ? "text-teal-400" : "text-teal-600"}`} />
                </div>
            ) : error ? (
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 flex items-center gap-2">
                    <AlertCircle size={20} />
                    {error}
                </div>
            ) : (
                <div className="max-w-4xl mx-auto">
                    <StatisticsPanel tasks={tasks} />
                </div>
            )}
        </div>
    );
};

export default AnalyticsPage;
