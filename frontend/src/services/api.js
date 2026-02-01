import axios from "axios";
import io from "socket.io-client";

const API_BASE_URL = "http://localhost:5000/api";

// API instance
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Socket.io instance
export const socket = io("http://localhost:5000", {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 5,
});

// Task API calls
export const taskAPI = {
  // Get all tasks
  getAllTasks: async () => {
    try {
      const response = await apiClient.get("/tasks");
      return response.data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  },

  // Get tasks by status
  getTasksByStatus: async (status) => {
    try {
      const response = await apiClient.get(`/tasks/status/${status}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching tasks by status:", error);
      throw error;
    }
  },

  // Create task
  createTask: async (taskData) => {
    try {
      const response = await apiClient.post("/tasks", taskData);
      return response.data;
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  },

  // Update task
  updateTask: async (taskId, taskData) => {
    try {
      const response = await apiClient.put(`/tasks/${taskId}`, taskData);
      return response.data;
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  },

  // Delete task
  deleteTask: async (taskId) => {
    try {
      const response = await apiClient.delete(`/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  },

  // Update task order
  updateTaskOrder: async (tasks) => {
    try {
      const response = await apiClient.patch("/tasks/order/update", { tasks });
      return response.data;
    } catch (error) {
      console.error("Error updating task order:", error);
      throw error;
    }
  },
};

// Socket events
export const setupSocketListeners = (callbacks) => {
  socket.on("task-created", callbacks.onTaskCreated);
  socket.on("task-updated", callbacks.onTaskUpdated);
  socket.on("task-deleted", callbacks.onTaskDeleted);
};

export const emitTaskUpdate = (eventName, data) => {
  socket.emit(eventName, data);
};
