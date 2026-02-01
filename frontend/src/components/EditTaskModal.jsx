import React, { useState, useEffect } from "react";
import {
  X,
  CheckCircle2,
  AlertCircle,
  Calendar,
  User,
  Edit3,
} from "lucide-react";
import { taskAPI, emitTaskUpdate } from "../services/api";

const EditTaskModal = ({ isOpen, task, onClose, onTaskUpdated }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Saas Product",
    priority: "Medium",
    dueDate: "",
    assignee: "",
    status: "todo",
    tags: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (task) {
      const dueDate = task.dueDate
        ? new Date(task.dueDate).toISOString().split("T")[0]
        : "";

      setFormData({
        title: task.title || "",
        description: task.description || "",
        category: task.category || "Saas Product",
        priority: task.priority || "Medium",
        dueDate,
        assignee: task.assignee || "",
        status: task.status || "todo",
        tags: task.tags || "",
      });
    }
  }, [task]);

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
    if (!formData.title.trim()) {
      setError("Please enter a task title");
      return;
    }

    setLoading(true);
    try {
      const updatedTask = await taskAPI.updateTask(task._id, formData);
      emitTaskUpdate("task-updated", updatedTask);
      onTaskUpdated(updatedTask);
      onClose();
    } catch (error) {
      console.error("Error updating task:", error);
      setError("Failed to update task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !task) return null;

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

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "todo":
        return "text-blue-400 bg-blue-400/10 border-blue-400/30";
      case "in-progress":
        return "text-purple-400 bg-purple-400/10 border-purple-400/30";
      case "completed":
        return "text-green-400 bg-green-400/10 border-green-400/30";
      case "blocked":
        return "text-red-400 bg-red-400/10 border-red-400/30";
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
            <div className="p-2 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-lg">
              <Edit3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Edit Task</h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Update task details and progress
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
              placeholder="Enter task title..."
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
              placeholder="Update task description..."
              rows="4"
            />
            <p className="text-xs text-gray-400 mt-1.5">
              {formData.description.length}/500
            </p>
          </div>

          {/* Category & Status Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="blocked">Blocked</option>
              </select>
              <div
                className={`mt-2 px-3 py-1.5 rounded-full border inline-block text-xs font-medium ${getStatusColor(formData.status)}`}
              >
                Status:{" "}
                {formData.status === "in-progress"
                  ? "In Progress"
                  : formData.status.charAt(0).toUpperCase() +
                  formData.status.slice(1)}
              </div>
            </div>
          </div>

          {/* Priority & Due Date Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          </div>

          {/* Assignee & Tags Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                placeholder="Team member name..."
              />
            </div>

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
                placeholder="Add tags..."
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-6 border-t border-purple-500/20">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl disabled:shadow-none"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>{loading ? "Updating..." : "Update Task"}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-700/50 hover:bg-slate-600/50 text-white font-semibold py-3 rounded-lg transition-all duration-200 border border-slate-600/50 hover:border-slate-500/50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
