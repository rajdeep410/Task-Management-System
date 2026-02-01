import React, { useState } from "react";
import { Plus, ChevronDown } from "lucide-react";
import { Droppable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import { useTheme } from "../context/ThemeContext";

const TaskColumn = ({ title, tasks, onEdit, onDelete, onAddTask, status }) => {
  const { isDarkMode } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const getColumnStyle = (status) => {
    const styles = {
      "to-do": "from-teal-600/10 to-teal-700/10 border-teal-500/20",
      "in-progress": "from-emerald-600/10 to-emerald-700/10 border-emerald-500/20",
      completed: "from-lime-600/10 to-lime-700/10 border-lime-500/20",
      blocked: "from-red-600/10 to-red-700/10 border-red-500/20",
    };
    return styles[status] || styles["to-do"];
  };

  const getHeaderColor = (status) => {
    const colors = {
      "to-do": "text-teal-400",
      "in-progress": "text-emerald-400",
      completed: "text-lime-400",
      blocked: "text-red-400",
    };
    return colors[status] || "text-blue-400";
  };

  const columnStyle = getColumnStyle(status);
  const headerColor = getHeaderColor(status);

  return (
    <div
      className={`bg-gradient-to-b ${columnStyle} rounded-xl p-3 w-full lg:w-auto flex flex-col border transition-all duration-300 hover:shadow-lg`}
    >
      {/* Column Header */}
      <div className={`flex items-center justify-between mb-3 pb-2 border-b ${isDarkMode ? "border-white/10" : "border-gray-200"}`}>
        <div className="flex items-center space-x-2 flex-1 min-w-0">
          <h2 className={`text-base font-bold truncate ${isDarkMode ? "text-white" : "text-slate-900"}`}>
            {title}
          </h2>
          <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold border flex-shrink-0 ${isDarkMode
            ? "bg-white/10 text-gray-300 border-white/20"
            : "bg-gray-100 text-gray-600 border-gray-200"
            }`}>
            {tasks.length}
          </span>
        </div>

        <div className="flex items-center space-x-1 flex-shrink-0">
          <button
            onClick={onAddTask}
            className={`p-1.5 rounded-lg transition-all duration-200 ${title === "to-do"
              ? "bg-teal-600/30 text-teal-400 hover:bg-teal-600/50"
              : title === "in-progress"
                ? "bg-emerald-600/30 text-emerald-400 hover:bg-emerald-600/50"
                : title === "completed"
                  ? "bg-lime-600/30 text-lime-400 hover:bg-lime-600/50"
                  : "bg-red-600/30 text-red-400 hover:bg-red-600/50"
              }`}
            title="Add new task"
          >
            <Plus size={16} />
          </button>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`p-1.5 rounded-lg transition-all duration-200 flex-shrink-0 ${isCollapsed ? "rotate-180" : ""
              } ${isDarkMode
                ? "bg-white/10 text-gray-400 hover:text-white"
                : "bg-gray-100 text-gray-500 hover:text-slate-900"
              }`}
            title={isCollapsed ? "Expand column" : "Collapse column"}
          >
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      {/* Tasks Container */}
      {!isCollapsed && (
        <div className="flex-1 overflow-y-auto pr-1">
          <Droppable droppableId={title} isDropDisabled={false} isCombineEnabled={false} ignoreContainerClipping={false}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`space-y-2 min-h-32 transition-all duration-200 rounded-lg p-1 ${snapshot.isDraggingOver ? "bg-white/10" : "bg-transparent"
                  }`}
              >
                {tasks.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-6 text-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${isDarkMode ? "bg-white/10" : "bg-gray-100"}`}>
                      <span className="text-lg">📋</span>
                    </div>
                    <p className="text-gray-500 text-xs font-medium">
                      No tasks
                    </p>
                  </div>
                ) : (
                  tasks.map((task, index) => (
                    <TaskCard
                      key={task._id}
                      task={task}
                      index={index}
                      onEdit={onEdit}
                      onDelete={onDelete}
                    />
                  ))
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}

      {/* Collapsed State */}
      {isCollapsed && (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500 text-xs font-medium">
            {tasks.length} tasks
          </p>
        </div>
      )}
    </div>
  );
};

export default TaskColumn;
