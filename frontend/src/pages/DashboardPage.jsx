import React, { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { taskAPI } from "../services/api";
import {
    CheckCircle2,
    Clock,
    AlertCircle,
    ListTodo,
    ArrowRight,
    TrendingUp,
    Calendar as CalendarIcon
} from "lucide-react";
import { Link } from "react-router-dom";

const MetricCard = ({ label, value, icon: Icon, color, bgGradient }) => {
    const { isDarkMode } = useTheme();
    return (
        <div className={`p-6 rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${isDarkMode ? 'bg-slate-800/40 border-white/5' : 'bg-white border-purple-100 shadow-lg shadow-purple-500/5'}`}>
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${bgGradient} shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`text-xs font-bold px-2 py-1 rounded-full ${isDarkMode ? 'bg-white/5 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>
                    Live
                </div>
            </div>
            <div>
                <h3 className={`text-3xl font-black mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{value}</h3>
                <p className={`text-sm font-semibold uppercase tracking-wider ${color}`}>{label}</p>
            </div>
        </div>
    );
};

const DashboardPage = () => {
    const { isDarkMode } = useTheme();
    const [tasks, setTasks] = useState([]);
    const [stats, setStats] = useState({
        todo: 0,
        inProgress: 0,
        completed: 0,
        urgent: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const allTasks = await taskAPI.getAllTasks();
            setTasks(allTasks);

            // Calculate metrics
            const metrics = {
                todo: allTasks.filter(t => t.status.toLowerCase() === 'to do' || t.status.toLowerCase() === 'to-do').length,
                inProgress: allTasks.filter(t => t.status.toLowerCase() === 'in progress' || t.status.toLowerCase() === 'in-progress').length,
                completed: allTasks.filter(t => t.status.toLowerCase() === 'completed').length,
                urgent: allTasks.filter(t => t.priority.toLowerCase() === 'high').length
            };
            setStats(metrics);
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        } finally {
            setLoading(false);
        }
    };

    const recentTasks = tasks.slice(0, 5);

    const getPriorityColor = (priority) => {
        switch (priority.toLowerCase()) {
            case 'high': return 'text-red-500 bg-red-500/10';
            case 'medium': return 'text-yellow-500 bg-yellow-500/10';
            case 'low': return 'text-green-500 bg-green-500/10';
            default: return 'text-gray-500 bg-gray-500/10';
        }
    };

    return (
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            {/* Hero Section */}
            <div className={`relative overflow-hidden rounded-3xl p-8 mb-8 border ${isDarkMode ? 'bg-slate-800/40 border-white/5' : 'bg-white border-[#FFD700]/20 shadow-2xl shadow-[#FFD700]/5'}`}>
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-gradient-to-br from-[#FF8C00]/20 to-transparent rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-gradient-to-br from-[#2d8195]/20 to-transparent rounded-full blur-3xl"></div>

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#FF8C00] via-white to-[#2d8195] p-1 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                                <img src="mypic2.jpeg" alt="User" className="w-full h-full bg-white rounded-xl object-cover" />
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#FF8C00] rounded-lg border-4 border-slate-900 flex items-center justify-center shadow-lg">
                                <span className="text-white text-[10px] font-bold">ON</span>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase ${isDarkMode ? 'bg-[#FFD700]/20 text-[#FFD700]' : 'bg-[#FFFACD] text-[#B8860B]'}`}>
                                    TaskFlow Bharat Edition
                                </span>
                            </div>
                            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                Namaste, Rajdeep!
                            </h2>
                            <p className={`text-sm sm:text-base md:text-lg flex items-center gap-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                <CalendarIcon size={18} className="text-[#FF8C00]" />
                                It's {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-2 text-center md:text-right">
                        <div className={`p-4 rounded-2xl backdrop-blur-md ${isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-[#FFFACD]/30 border border-[#FFD700]/20'}`}>
                            <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Deep Thought</p>
                            <p className={`text-lg font-bold italic ${isDarkMode ? 'text-[#FFD700]' : 'text-[#B8860B]'}`}>
                                "Kaam hi Pooja Hai" - Focus and Conquer!
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                    label="To Do"
                    value={stats.todo}
                    icon={ListTodo}
                    color="text-blue-500"
                    bgGradient="from-blue-500 to-blue-600"
                />
                <MetricCard
                    label="In Progress"
                    value={stats.inProgress}
                    icon={Clock}
                    color="text-emerald-500"
                    bgGradient="from-emerald-500 to-emerald-600"
                />
                <MetricCard
                    label="Completed"
                    value={stats.completed}
                    icon={CheckCircle2}
                    color="text-green-500"
                    bgGradient="from-green-500 to-green-600"
                />
                <MetricCard
                    label="Urgent"
                    value={stats.urgent}
                    icon={AlertCircle}
                    color="text-red-500"
                    bgGradient="from-red-500 to-red-600"
                />
            </div>

            {/* Bottom Section: Recent Activity & Call to Action */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className={`lg:col-span-2 rounded-3xl p-4 sm:p-8 border ${isDarkMode ? 'bg-slate-800/40 border-white/5' : 'bg-white border-[#FFD700]/20 shadow-xl'}`}>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className={`text-xl font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                            <TrendingUp size={22} className="text-[#FF8C00]" />
                            Recent Activity
                        </h3>
                        <Link to="/tasks" className="text-sm font-bold text-[#FF8C00] hover:text-[#FFD700] flex items-center gap-1 group">
                            View More <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {loading ? (
                        <div className="space-y-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className={`h-16 rounded-xl animate-pulse ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}></div>
                            ))}
                        </div>
                    ) : tasks.length > 0 ? (
                        <div className="space-y-4">
                            {recentTasks.map((task) => (
                                <div key={task._id} className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${isDarkMode ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-gray-50 border-gray-100 hover:bg-gray-100'}`}>
                                    <div className="flex items-center gap-4">
                                        <div className={`w-2 h-10 rounded-full ${task.status.toLowerCase().includes('complete') ? 'bg-teal-500' : 'bg-emerald-500'}`}></div>
                                        <div>
                                            <h4 className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{task.title}</h4>
                                            <p className="text-xs text-gray-500 uppercase font-semibold">{task.status}</p>
                                        </div>
                                    </div>
                                    <span className={`text-[10px] font-black px-2 py-1 rounded uppercase tracking-tighter ${getPriorityColor(task.priority)}`}>
                                        {task.priority}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-500">Koe naya karya nahi mila! Start regular updates now.</p>
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-6">
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FF8C00] to-[#2d8195] p-6 sm:p-8 text-white shadow-2xl flex-1 flex flex-col justify-between">
                        {/* Background Accents */}
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>

                        <div>
                            <h3 className="text-2xl font-black mb-2 leading-tight">Launch a New<br />Task Today!</h3>
                            <p className="text-orange-100 text-sm mb-6 font-medium">Break your goals into tasks and conquer them one by one.</p>
                        </div>
                        <Link to="/tasks" className="w-full py-4 bg-white text-[#FF8C00] font-black rounded-2xl text-center shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
                            Start Mapping Flow
                        </Link>
                    </div>

                    <div className={`rounded-3xl p-6 border flex items-center justify-between ${isDarkMode ? 'bg-slate-800/40 border-white/5 text-white' : 'bg-white border-[#FFD700]/20 shadow-xl text-slate-900'}`}>
                        <div>
                            <p className="text-[10px] font-black uppercase text-gray-500 leading-none mb-1">Weekly Target</p>
                            <p className="font-bold">24 Tasks Left</p>
                        </div>
                        <div className="w-12 h-12 rounded-full border-4 border-[#FF8C00] border-t-transparent animate-spin-slow flex items-center justify-center">
                            <span className="text-[10px] animate-none font-black text-[#FF8C00]">68%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
