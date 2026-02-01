import React from "react";
import { useTheme } from "../context/ThemeContext";
import { Mail, Phone, MapPin, User, Circle } from "lucide-react";

const TeamPage = () => {
    const { isDarkMode } = useTheme();

    const teamMembers = [
        {
            id: 1,
            name: "Rahul Sharma",
            role: "Product Manager",
            email: "rahul.pm@taskflow.in",
            status: "online",
            color: "from-orange-400 to-orange-600",
            initials: "RS"
        },
        {
            id: 2,
            name: "Priya Patel",
            role: "Lead Developer",
            email: "priya.dev@taskflow.in",
            status: "busy",
            color: "from-green-400 to-green-600",
            initials: "PP"
        },
        {
            id: 3,
            name: "Amit Verma",
            role: "UI/UX Designer",
            email: "amit.design@taskflow.in",
            status: "offline",
            color: "from-blue-400 to-blue-600",
            initials: "AV"
        },
        {
            id: 4,
            name: "Sanya Gupta",
            role: "Frontend Engineer",
            email: "sanya.tech@taskflow.in",
            status: "online",
            color: "from-pink-400 to-pink-600",
            initials: "SG"
        },
        {
            id: 5,
            name: "Deepak Yadav",
            role: "Backend Engineer",
            email: "deepak.api@taskflow.in",
            status: "online",
            color: "from-indigo-400 to-indigo-600",
            initials: "DY"
        },
        {
            id: 6,
            name: "Anjali Singh",
            role: "QA Engineer",
            email: "anjali.qa@taskflow.in",
            status: "offline",
            color: "from-teal-400 to-teal-600",
            initials: "AS"
        }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'online': return 'text-green-500';
            case 'busy': return 'text-red-500';
            case 'offline': return 'text-gray-500';
            default: return 'text-gray-500';
        }
    };

    return (
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="mb-8">
                <h2
                    className={`text-3xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-slate-900"}`}
                >
                    Team Members
                </h2>
                <p
                    className={`text-base ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                >
                    Collaborate with your brilliant team members.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamMembers.map((member) => (
                    <div
                        key={member.id}
                        className={`rounded-xl p-6 border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${isDarkMode
                            ? "bg-slate-800/50 border-white/10"
                            : "bg-white border-purple-100 shadow-sm"
                            }`}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${member.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                                {member.initials}
                            </div>
                            <div className={`flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider ${getStatusColor(member.status)}`}>
                                <Circle size={8} fill="currentColor" />
                                {member.status}
                            </div>
                        </div>

                        <h3 className={`text-xl font-bold mb-1 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                            {member.name}
                        </h3>
                        <p className={`text-sm mb-4 ${isDarkMode ? "text-purple-400" : "text-purple-600"}`}>
                            {member.role}
                        </p>

                        <div className="space-y-2 pt-4 border-t border-gray-500/10">
                            <div className={`flex items-center gap-3 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                <Mail size={16} />
                                <span>{member.email}</span>
                            </div>
                            <div className={`flex items-center gap-3 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                <Phone size={16} />
                                <span>+91 98765 43210</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeamPage;
