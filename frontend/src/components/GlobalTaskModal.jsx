import React, { useState } from "react";
import {
  X,
  CheckCircle2,
  AlertCircle,
  Calendar,
  User,
  Sparkles,
} from "lucide-react";
import { taskAPI, emitTaskUpdate } from "../services/api";

const GlobalTaskModal = ({ isOpen, onClose, onTaskCreated }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Saas Product",
    priority: "Medium",
    status: "To Do",
    dueDate: "",
    assignee: "",
    tags: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);

    if (!formData.title.trim()) {
      setError("Please enter a task title");
      console.warn("Task title is empty");
      return;
    }

    setLoading(true);
    try {
      console.log("Calling taskAPI.createTask with:", formData);
      const newTask = await taskAPI.createTask(formData);
      console.log("Task created successfully:", newTask);
      emitTaskUpdate("task-created", newTask);
      console.log("Emitted task-created event");
      onTaskCreated(newTask);
      console.log("Called onTaskCreated callback");
      setFormData({
        title: "",
        description: "",
        category: "Saas Product",
        priority: "Medium",
        status: "To Do",
        dueDate: "",
        assignee: "",
        tags: "",
      });
      onClose();
      console.log("Modal closed");
    } catch (error) {
      console.error("Error creating task:", error);
      console.error("Error response:", error.response);
      setError(
        error.response?.data?.message ||
        "Failed to create task. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "text-red-400 bg-red-400/10 border-red-400/30";
      case "Medium":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/30";
      case "Low":
        return "text-green-400 bg-green-400/10 border-green-400/30";
      default:
        return "text-gray-400 bg-gray-400/10 border-gray-400/30";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-gradient-to-b from-slate-800/95 to-slate-900/95 rounded-2xl w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl border border-purple-500/20">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-slate-800 to-slate-900 border-b border-purple-500/20 px-6 sm:px-8 py-6 flex justify-between items-center backdrop-blur">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Create New Task</h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Add a new task to your project
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-all text-gray-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-8 space-y-4 sm:space-y-6">
          {/* Error Alert */}
          {error && (
            <div className="flex items-center space-x-3 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Title Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-2 flex items-center space-x-2">
              <span>Task Title</span>
              <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-slate-700/40 border border-purple-500/30 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition placeholder-gray-500 text-base"
              placeholder="Enter an engaging task title..."
              required
            />
            <p className="text-xs text-gray-400 mt-1.5">
              {formData.title.length}/100
            </p>
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full bg-slate-700/40 border border-purple-500/30 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition placeholder-gray-500 resize-none text-base"
              placeholder="Add detailed description of the task..."
              rows="4"
            />
            <p className="text-xs text-gray-400 mt-1.5">
              {formData.description.length}/500
            </p>
          </div>

          {/* Category, Status & Priority Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-slate-700/40 border border-purple-500/30 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition cursor-pointer"
              >
                <option>Saas Product</option>
                <option>CRM Web App</option>
                <option>Finance Product</option>
                <option>Social Media Plan</option>
                <option>Bugfix</option>
                <option>Feature</option>
                <option>Documentation</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full bg-slate-700/40 border border-purple-500/30 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition cursor-pointer"
              >
                <option>To Do</option>
                <option>In Progress</option>
                <option>Completed</option>
                <option>Blocked</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">
                Priority
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full bg-slate-700/40 border border-purple-500/30 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition cursor-pointer"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
              <div
                className={`mt-2 px-3 py-1.5 rounded-full border inline-block text-xs font-medium ${getPriorityColor(formData.priority)}`}
              >
                Priority: {formData.priority}
              </div>
            </div>
          </div>

          {/* Due Date & Assignee Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2 flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Due Date</span>
              </label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full bg-slate-700/40 border border-purple-500/30 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2 flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>Assignee</span>
              </label>
              <input
                type="text"
                name="assignee"
                value={formData.assignee}
                onChange={handleChange}
                className="w-full bg-slate-700/40 border border-purple-500/30 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition placeholder-gray-500"
                placeholder="Assign team member..."
              />
            </div>
          </div>

          {/* Tags Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-2">
              Tags
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full bg-slate-700/40 border border-purple-500/30 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition placeholder-gray-500"
              placeholder="Add tags separated by commas..."
            />
            <p className="text-xs text-gray-400 mt-1.5">
              Example: frontend, urgent, backend
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-6 border-t border-purple-500/20">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl disabled:shadow-none"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>{loading ? "Creating..." : "Create Task"}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 bg-slate-700/50 hover:bg-slate-600/50 text-white font-semibold py-3 rounded-lg transition-all duration-200 border border-slate-600/50 hover:border-slate-500/50`}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GlobalTaskModal;
