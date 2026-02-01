import React from "react";
import { useTheme } from "../context/ThemeContext";
import {
    MapPin,
    Mail,
    Calendar,
    Briefcase,
    Award,
    TrendingUp,
    Edit,
    Camera,
} from "lucide-react";

const ProfilePage = () => {
    const { isDarkMode } = useTheme();

    return (
        <div className="w-full h-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
            {/* Cover Image & Profile Header */}
            <div className="relative mb-16">
                <div className="h-48 sm:h-64 rounded-3xl overflow-hidden bg-gradient-to-r from-purple-800 via-indigo-800 to-blue-800 relative">
                    <img
                        src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                        alt="Cover"
                        className="w-full h-full object-cover opacity-60"
                    />
                    <button className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md text-white p-2 rounded-lg hover:bg-black/70 transition-all">
                        <Camera size={20} />
                    </button>
                </div>

                <div className="absolute -bottom-16 left-6 sm:left-10 flex items-end">
                    <div className="relative">
                        <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl border-4 border-slate-900 bg-white p-1 overflow-hidden shadow-2xl">
                            <img
                                src="/mypic2.jpeg"
                                alt="Profile"
                                className="w-full h-full object-cover rounded-2xl bg-gray-200"
                            />
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-lg border-4 border-slate-900 flex items-center justify-center">
                            <span className="w-2 h-2 bg-white rounded-full"></span>
                        </div>
                    </div>
                    <div className="mb-4 ml-4 hidden sm:block">
                        <h1
                            className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-slate-900"
                                }`}
                        >
                            Rajdeep410
                        </h1>
                        <p
                            className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"
                                }`}
                        >
                            Full Stack Developer • Tech Enthusiast
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4 sm:pt-0">
                {/* Left Column: Info & Bio */}
                <div className="space-y-6">
                    {/* Mobile Name Block (visible only on mobile) */}
                    <div className="block sm:hidden text-center">
                        <h1
                            className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-slate-900"
                                }`}
                        >
                            Rajdeep410
                        </h1>
                        <p
                            className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"
                                }`}
                        >
                            Full Stack Developer • Tech Enthusiast
                        </p>
                    </div>

                    <div
                        className={`p-6 rounded-2xl border ${isDarkMode
                            ? "bg-slate-800/40 border-white/5"
                            : "bg-white border-purple-100 shadow-xl"
                            }`}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h3
                                className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-slate-900"
                                    }`}
                            >
                                About Me
                            </h3>
                            <button className="text-purple-500 hover:text-purple-400">
                                <Edit size={18} />
                            </button>
                        </div>
                        <p
                            className={`text-sm leading-relaxed mb-6 ${isDarkMode ? "text-gray-400" : "text-gray-600"
                                }`}
                        >
                            Passionate developer building scalable web applications. I love
                            turning complex problems into simple, beautiful, and intuitive
                            designs. "Code is poetry."
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                                    <Briefcase size={18} />
                                </div>
                                <div>
                                    <p
                                        className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-400"
                                            }`}
                                    >
                                        Role
                                    </p>
                                    <p
                                        className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-slate-900"
                                            }`}
                                    >
                                        Senior Developer
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-green-500/10 text-green-500">
                                    <MapPin size={18} />
                                </div>
                                <div>
                                    <p
                                        className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-400"
                                            }`}
                                    >
                                        Location
                                    </p>
                                    <p
                                        className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-slate-900"
                                            }`}
                                    >
                                        Mumbai, India
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500">
                                    <Mail size={18} />
                                </div>
                                <div>
                                    <p
                                        className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-400"
                                            }`}
                                    >
                                        Email
                                    </p>
                                    <p
                                        className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-slate-900"
                                            }`}
                                    >
                                        rajdeep@example.com
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-pink-500/10 text-pink-500">
                                    <Calendar size={18} />
                                </div>
                                <div>
                                    <p
                                        className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-400"
                                            }`}
                                    >
                                        Joined
                                    </p>
                                    <p
                                        className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-slate-900"
                                            }`}
                                    >
                                        January 2024
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Stats & Achievements */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div
                            className={`p-5 rounded-2xl border border-b-4 transition-all hover:-translate-y-1 ${isDarkMode
                                ? "bg-slate-800/40 border-white/5 border-b-blue-500"
                                : "bg-white border-gray-100 border-b-blue-500 shadow-lg"
                                }`}
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-blue-500/20 text-blue-500 rounded-lg">
                                    <TrendingUp size={20} />
                                </div>
                                <span
                                    className={`text-sm font-bold ${isDarkMode ? "text-gray-400" : "text-gray-500"
                                        }`}
                                >
                                    Karma Points
                                </span>
                            </div>
                            <h3
                                className={`text-3xl font-black ${isDarkMode ? "text-white" : "text-slate-900"
                                    }`}
                            >
                                1,250
                            </h3>
                        </div>

                        <div
                            className={`p-5 rounded-2xl border border-b-4 transition-all hover:-translate-y-1 ${isDarkMode
                                ? "bg-slate-800/40 border-white/5 border-b-green-500"
                                : "bg-white border-gray-100 border-b-green-500 shadow-lg"
                                }`}
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-green-500/20 text-green-500 rounded-lg">
                                    <Award size={20} />
                                </div>
                                <span
                                    className={`text-sm font-bold ${isDarkMode ? "text-gray-400" : "text-gray-500"
                                        }`}
                                >
                                    Tasks Completed
                                </span>
                            </div>
                            <h3
                                className={`text-3xl font-black ${isDarkMode ? "text-white" : "text-slate-900"
                                    }`}
                            >
                                142
                            </h3>
                        </div>

                        <div
                            className={`p-5 rounded-2xl border border-b-4 transition-all hover:-translate-y-1 ${isDarkMode
                                ? "bg-slate-800/40 border-white/5 border-b-purple-500"
                                : "bg-white border-gray-100 border-b-purple-500 shadow-lg"
                                }`}
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-purple-500/20 text-purple-500 rounded-lg">
                                    <Briefcase size={20} />
                                </div>
                                <span
                                    className={`text-sm font-bold ${isDarkMode ? "text-gray-400" : "text-gray-500"
                                        }`}
                                >
                                    Projects
                                </span>
                            </div>
                            <h3
                                className={`text-3xl font-black ${isDarkMode ? "text-white" : "text-slate-900"
                                    }`}
                            >
                                12
                            </h3>
                        </div>
                    </div>

                    {/* Activity / Badges */}
                    <div
                        className={`p-6 rounded-2xl border ${isDarkMode
                            ? "bg-slate-800/40 border-white/5"
                            : "bg-white border-purple-100 shadow-xl"
                            }`}
                    >
                        <h3
                            className={`text-lg font-bold mb-4 ${isDarkMode ? "text-white" : "text-slate-900"
                                }`}
                        >
                            Badges & Achievements
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div
                                className={`flex flex-col items-center justify-center p-4 rounded-xl text-center gap-2 transition-colors ${isDarkMode
                                    ? "bg-white/5 hover:bg-white/10"
                                    : "bg-gray-50 hover:bg-gray-100"
                                    }`}
                            >
                                <div className="w-12 h-12 rounded-full bg-yellow-400/20 text-yellow-400 flex items-center justify-center text-2xl">
                                    🚀
                                </div>
                                <span
                                    className={`text-xs font-bold ${isDarkMode ? "text-gray-300" : "text-gray-600"
                                        }`}
                                >
                                    Early Adopter
                                </span>
                            </div>

                            <div
                                className={`flex flex-col items-center justify-center p-4 rounded-xl text-center gap-2 transition-colors ${isDarkMode
                                    ? "bg-white/5 hover:bg-white/10"
                                    : "bg-gray-50 hover:bg-gray-100"
                                    }`}
                            >
                                <div className="w-12 h-12 rounded-full bg-blue-400/20 text-blue-400 flex items-center justify-center text-2xl">
                                    ⚡
                                </div>
                                <span
                                    className={`text-xs font-bold ${isDarkMode ? "text-gray-300" : "text-gray-600"
                                        }`}
                                >
                                    Fast Finisher
                                </span>
                            </div>

                            <div
                                className={`flex flex-col items-center justify-center p-4 rounded-xl text-center gap-2 transition-colors ${isDarkMode
                                    ? "bg-white/5 hover:bg-white/10"
                                    : "bg-gray-50 hover:bg-gray-100"
                                    }`}
                            >
                                <div className="w-12 h-12 rounded-full bg-green-400/20 text-green-400 flex items-center justify-center text-2xl">
                                    🎯
                                </div>
                                <span
                                    className={`text-xs font-bold ${isDarkMode ? "text-gray-300" : "text-gray-600"
                                        }`}
                                >
                                    Goal Smasher
                                </span>
                            </div>

                            <div
                                className={`flex flex-col items-center justify-center p-4 rounded-xl text-center gap-2 transition-colors ${isDarkMode
                                    ? "bg-white/5 hover:bg-white/10"
                                    : "bg-gray-50 hover:bg-gray-100"
                                    }`}
                            >
                                <div className="w-12 h-12 rounded-full bg-purple-400/20 text-purple-400 flex items-center justify-center text-2xl">
                                    👑
                                </div>
                                <span
                                    className={`text-xs font-bold ${isDarkMode ? "text-gray-300" : "text-gray-600"
                                        }`}
                                >
                                    Team Leader
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
