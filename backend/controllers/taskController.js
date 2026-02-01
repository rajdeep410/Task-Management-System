const Task = require("../models/Task");

// Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get tasks by status
exports.getTasksByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const tasks = await Task.find({ status }).sort({ order: 1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new task
exports.createTask = async (req, res) => {
  const { title, description, category, priority, dueDate, assignee, status } =
    req.body;

  const task = new Task({
    title,
    description,
    category,
    priority,
    dueDate,
    assignee,
    status: status || "To Do",
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const {
      title,
      description,
      category,
      status,
      priority,
      dueDate,
      assignee,
    } = req.body;

    if (title) task.title = title;
    if (description) task.description = description;
    if (category) task.category = category;
    if (status) task.status = status;
    if (priority) task.priority = priority;
    if (dueDate) task.dueDate = dueDate;
    if (assignee) task.assignee = assignee;

    const updatedTask = await task.save();
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update task order
exports.updateTaskOrder = async (req, res) => {
  try {
    const { tasks } = req.body;

    const updates = tasks.map((task, index) => ({
      updateOne: {
        filter: { _id: task._id },
        update: { order: index },
      },
    }));

    await Task.bulkWrite(updates);

    const updatedTasks = await Task.find().sort({ order: 1 });
    res.status(200).json(updatedTasks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
