import React from "react";
import {
  Trash2,
  Edit2,
  Calendar,
  User,
  Flag,
  CheckCircle,
  Clock,
} from "lucide-react";
import { Draggable } from "react-beautiful-dnd";
import { useTheme } from "../context/ThemeContext";

const TaskCard = ({ task, index, onEdit, onDelete }) => {
  const { isDarkMode } = useTheme();

  const getPriorityStyle = (priority) => {
    const styles = {
      High: {
        bg: isDarkMode ? "bg-red-600/20" : "bg-red-50",
        text: isDarkMode ? "text-red-400" : "text-red-700",
        border: isDarkMode ? "border-red-500/30" : "border-red-200",
        badge: isDarkMode ? "bg-red-500/30 text-red-300" : "bg-red-100 text-red-700",
      },
      Medium: {
        bg: isDarkMode ? "bg-yellow-600/20" : "bg-yellow-50",
        text: isDarkMode ? "text-yellow-400" : "text-yellow-700",
        border: isDarkMode ? "border-yellow-500/30" : "border-yellow-200",
        badge: isDarkMode ? "bg-yellow-500/30 text-yellow-300" : "bg-yellow-100 text-yellow-700",
      },
      Low: {
        bg: isDarkMode ? "bg-green-600/20" : "bg-green-50",
        text: isDarkMode ? "text-green-400" : "text-green-700",
        border: isDarkMode ? "border-green-500/30" : "border-green-200",
        badge: isDarkMode ? "bg-green-500/30 text-green-300" : "bg-green-100 text-green-700",
      },
    };
    return styles[priority] || styles.Medium;
  };

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const lateHoGaya =
    task.dueDate &&
    new Date(task.dueDate) < new Date() &&
    task.status !== "completed";

  const priorityStyles = getPriorityStyle(task.priority);

  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => onEdit(task)}
          className={`group rounded-xl p-4 mb-3 cursor-pointer transition-all duration-300 border overflow-hidden ${snapshot.isDragging
            ? `shadow-2xl ring-2 ring-purple-500 ${priorityStyles.bg} ${priorityStyles.border} cursor-move`
            : `${priorityStyles.bg} ${priorityStyles.border} hover:${priorityStyles.border} hover:shadow-lg`
            }`}
        >
          {/* Status Indicator */}
          {task.status && task.status.toLowerCase() === "completed" && (
            <div className="absolute top-0 right-0 w-1 h-full bg-green-500 rounded-r-lg"></div>
          )}

          {/* Header - Title & Priority */}
          <div className="flex items-start justify-between mb-3 gap-3">
            <div className="flex-1 min-w-0">
              <h3
                className={`font-bold ${priorityStyles.text} truncate text-base leading-snug`}
              >
                {task.title}
              </h3>
            </div>
            <div className="flex-shrink-0 whitespace-nowrap">
              <span
                className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${priorityStyles.badge}`}
              >
                <Flag size={13} />
                <span>{task.priority}</span>
              </span>
            </div>
          </div>

          {/* Description */}
          {task.description && (
            <p className={`text-xs mb-3 line-clamp-2 opacity-80 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              {task.description}
            </p>
          )}

          {/* Metadata */}
          <div className="space-y-2 mb-4">
            {/* Due Date */}
            {task.dueDate && (
              <div
                className={`flex items-center gap-2 text-xs ${lateHoGaya ? "text-red-400 font-semibold" : "text-gray-400"
                  }`}
              >
                <Calendar size={14} />
                <span>{formatDate(task.dueDate)}</span>
                {lateHoGaya && (
                  <span className="text-red-400 font-bold">• Overdue</span>
                )}
              </div>
            )}

            {/* Assignee */}
            {task.assignee && (
              <div className={`flex items-center gap-2 text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                <User size={14} />
                <span>{task.assignee}</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className={`flex gap-2 pt-3 border-t opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${isDarkMode ? "border-white/10" : "border-gray-200"}`}>
            <button
              onClick={() => onEdit(task)}
              className="flex-1 flex items-center justify-center gap-1 px-2 py-2 rounded bg-blue-600/30 text-blue-400 hover:bg-blue-600/50 transition-colors duration-200 text-xs font-medium"
              title="Edit task"
            >
              <Edit2 size={14} />
              <span>Edit</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(task._id);
              }}
              className="flex-1 flex items-center justify-center gap-1 px-2 py-2 rounded bg-red-600/30 text-red-400 hover:bg-red-600/50 transition-colors duration-200 text-xs font-medium"
              title="Delete task"
            >
              <Trash2 size={14} />
              <span>Delete</span>
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
