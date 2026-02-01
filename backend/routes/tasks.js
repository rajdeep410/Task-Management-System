const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

// Get all tasks
router.get("/", taskController.getAllTasks);

// Get tasks by status
router.get("/status/:status", taskController.getTasksByStatus);

// Create a new task
router.post("/", taskController.createTask);

// Update task
router.put("/:id", taskController.updateTask);

// Delete task
router.delete("/:id", taskController.deleteTask);

// Update task order
router.patch("/order/update", taskController.updateTaskOrder);

module.exports = router;
