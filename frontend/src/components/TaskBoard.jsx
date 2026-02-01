import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useTheme } from "../context/ThemeContext";
import {
  taskAPI,
  setupSocketListeners,
  emitTaskUpdate,
  socket,
} from "../services/api";
import TaskColumn from "./TaskColumn";
import TaskModal from "./TaskModal";
import GlobalTaskModal from "./GlobalTaskModal";
import EditTaskModal from "./EditTaskModal";
import TaskFilterBar from "./TaskFilterBar";
import StatisticsPanel from "./StatisticsPanel";
import { Loader, AlertCircle, Plus } from "lucide-react";

const TaskBoard = () => {
  const { isDarkMode } = useTheme();
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isGlobalModalOpen, setIsGlobalModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [columnModalStatus, setColumnModalStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    priority: "",
    status: "",
  });
  const [sortBy, setSortBy] = useState("date");
  const [showStats, setShowStats] = useState(true);

  // Fetch all tasks on component mount
  useEffect(() => {
    fetchTasks();
    setupSocketConnections();
  }, []);

  // Apply filters and sorting whenever tasks, filters, or search change
  useEffect(() => {
    let result = [...tasks];

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (task) =>
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (task.description &&
            task.description.toLowerCase().includes(searchTerm.toLowerCase())),
      );
    }

    // Apply priority filter
    if (filters.priority) {
      result = result.filter(
        (task) =>
          task.priority.toLowerCase() === filters.priority.toLowerCase(),
      );
    }

    // Apply status filter
    if (filters.status) {
      result = result.filter(
        (task) => task.status.toLowerCase() === filters.status.toLowerCase(),
      );
    }

    // Apply sorting
    if (sortBy === "priority") {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      result.sort(
        (a, b) =>
          (priorityOrder[a.priority] || 3) - (priorityOrder[b.priority] || 3),
      );
    } else if (sortBy === "date") {
      result.sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
      );
    }

    setFilteredTasks(result);
  }, [tasks, searchTerm, filters, sortBy]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await taskAPI.getAllTasks();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("Failed to load tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const setupSocketConnections = () => {
    setupSocketListeners({
      onTaskCreated: (newTask) => {
        setTasks((prev) => [newTask, ...prev]);
      },
      onTaskUpdated: (updatedTask) => {
        setTasks((prev) =>
          prev.map((task) =>
            task._id === updatedTask._id ? updatedTask : task,
          ),
        );
      },
      onTaskDeleted: (deletedTaskId) => {
        setTasks((prev) => prev.filter((task) => task._id !== deletedTaskId));
      },
    });
  };

  // Organize tasks by status
  const normalizeStatus = (status) => {
    return status.toLowerCase().replace(/\s+/g, "-");
  };

  const getTasksByStatus = (status) => {
    return filteredTasks.filter(
      (task) => normalizeStatus(task.status) === status.toLowerCase(),
    );
  };

  const todoTasks = getTasksByStatus("to-do");
  const inProgressTasks = getTasksByStatus("in-progress");
  const completedTasks = getTasksByStatus("completed");
  const blockedTasks = getTasksByStatus("blocked");

  const handleDragEnd = async (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const task = tasks.find((t) => t._id === draggableId);
    if (!task) return;

    // Convert droppable ID to proper status format
    const statusMap = {
      "to-do": "To Do",
      "in-progress": "In Progress",
      completed: "Completed",
      blocked: "Blocked",
    };

    const newStatus =
      statusMap[destination.droppableId] || destination.droppableId;

    try {
      const updatedTask = await taskAPI.updateTask(task._id, {
        status: newStatus,
      });

      emitTaskUpdate("task-updated", updatedTask);
      setTasks((prev) =>
        prev.map((t) => (t._id === updatedTask._id ? updatedTask : t)),
      );
    } catch (error) {
      console.error("Error updating task status:", error);
      setError("Failed to update task. Please try again.");
      fetchTasks();
    }
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (taskId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this task? This cannot be undone.",
      )
    ) {
      try {
        await taskAPI.deleteTask(taskId);
        emitTaskUpdate("task-deleted", taskId);
        setTasks((prev) => prev.filter((task) => task._id !== taskId));
      } catch (error) {
        console.error("Error deleting task:", error);
        setError("Failed to delete task. Please try again.");
      }
    }
  };

  const handleTaskCreated = (newTask) => {
    console.log("Task created in TaskBoard:", newTask);
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task._id === updatedTask._id ? updatedTask : task)),
    );
    setIsEditModalOpen(false);
  };

  const handleFilter = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleSort = (sortOption) => {
    setSortBy(sortOption);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Loader className={`w-12 h-12 animate-spin mx-auto mb-4 ${isDarkMode ? "text-teal-400" : "text-teal-600"}`} />
          <p className={`font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      {/* Board Header */}
      {/* Error Alert */}
      {error && (
        <div className={`mx-4 mt-4 flex items-center space-x-3 p-4 rounded-lg border ${isDarkMode ? "bg-red-600/20 border-red-500/30 text-red-300" : "bg-red-50 border-red-200 text-red-600"}`}>
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p>{error}</p>
          <button
            onClick={() => setError(null)}
            className={`ml-auto hover:bg-red-500/20 rounded p-1 ${isDarkMode ? "text-red-300 hover:text-red-200" : "text-red-600 hover:text-red-800"}`}
          >
            ✕
          </button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 desi-board-layout">
          {/* Main Board */}
          <div className="lg:col-span-3 flex flex-col overflow-hidden w-full">
            {/* Filter Bar & Create Button */}
            <div className="mb-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              <div className="flex-1">
                <TaskFilterBar
                  onFilter={handleFilter}
                  onSort={handleSort}
                  onSearch={handleSearch}
                />
              </div>
              <button
                onClick={() => setIsGlobalModalOpen(true)}
                className="px-6 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white text-base font-bold tracking-wide rounded-2xl transition-all duration-300 flex items-center space-x-2 shadow-lg active:scale-95 flex-shrink-0 whitespace-nowrap tagada-button"
              >
                <Plus size={22} strokeWidth={2.5} />
                <span>Create Task</span>
              </button>
            </div>

            {/* Task Board Columns */}
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="board" direction="horizontal" type="column" isCombineEnabled={false} ignoreContainerClipping={false}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="flex flex-col lg:grid lg:grid-cols-4 gap-4 flex-1 overflow-x-hidden overflow-y-auto lg:overflow-y-auto pb-4"
                  >
                    <TaskColumn
                      title="To Do"
                      tasks={todoTasks}
                      status="to-do"
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      onAddTask={() => {
                        setColumnModalStatus("To Do");
                        setIsCreateModalOpen(true);
                      }}
                    />
                    <TaskColumn
                      title="In Progress"
                      tasks={inProgressTasks}
                      status="in-progress"
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      onAddTask={() => {
                        setColumnModalStatus("In Progress");
                        setIsCreateModalOpen(true);
                      }}
                    />
                    <TaskColumn
                      title="Completed"
                      tasks={completedTasks}
                      status="completed"
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      onAddTask={() => {
                        setColumnModalStatus("Completed");
                        setIsCreateModalOpen(true);
                      }}
                    />
                    <TaskColumn
                      title="Blocked"
                      tasks={blockedTasks}
                      status="blocked"
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      onAddTask={() => {
                        setColumnModalStatus("Blocked");
                        setIsCreateModalOpen(true);
                      }}
                    />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>

          {/* Statistics Panel */}
          {showStats && (
            <div className="lg:col-span-1 overflow-y-auto">
              <div className="sticky top-0">
                <StatisticsPanel tasks={filteredTasks} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <GlobalTaskModal
        isOpen={isGlobalModalOpen}
        onClose={() => setIsGlobalModalOpen(false)}
        onTaskCreated={handleTaskCreated}
      />

      <TaskModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setColumnModalStatus(null);
        }}
        onTaskCreated={handleTaskCreated}
        columnStatus={columnModalStatus}
      />

      <EditTaskModal
        isOpen={isEditModalOpen}
        task={selectedTask}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedTask(null);
        }}
        onTaskUpdated={handleTaskUpdated}
      />
    </div>
  );
};

export default TaskBoard;
