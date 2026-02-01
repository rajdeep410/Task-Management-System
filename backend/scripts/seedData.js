/**
 * Sample Data for Task Manager System
 *
 * To use this:
 * 1. Copy this content
 * 2. Create a file: backend/scripts/seedData.js
 * 3. Add a script in backend/package.json: "seed": "node scripts/seedData.js"
 * 4. Run: npm run seed
 *
 * This will populate your database with sample tasks
 */

const mongoose = require("mongoose");
require("dotenv").config();

const Task = require("../models/Task");

const sampleTasks = [
  {
    title: "Design landing page",
    description: "Create a responsive landing page for the new product launch",
    category: "Saas Product",
    status: "In Progress",
    priority: "High",
    dueDate: new Date("2024-02-15"),
    assignee: "Sarah Johnson",
    order: 0,
  },
  {
    title: "Setup database schema",
    description: "Design and implement MongoDB schema for user authentication",
    category: "Saas Product",
    status: "In Progress",
    priority: "High",
    dueDate: new Date("2024-02-10"),
    assignee: "Mike Chen",
    order: 1,
  },
  {
    title: "API documentation",
    description: "Write comprehensive API documentation for developers",
    category: "Saas Product",
    status: "To Do",
    priority: "Medium",
    dueDate: new Date("2024-02-20"),
    assignee: "Alex Rodriguez",
    order: 0,
  },
  {
    title: "Client meeting prep",
    description: "Prepare presentation slides and materials for client demo",
    category: "CRM Web App",
    status: "To Do",
    priority: "High",
    dueDate: new Date("2024-02-08"),
    assignee: "Jessica Lee",
    order: 1,
  },
  {
    title: "Implement payment integration",
    description: "Integrate Stripe for payment processing",
    category: "Finance Product",
    status: "In Progress",
    priority: "High",
    dueDate: new Date("2024-02-12"),
    assignee: "David Kumar",
    order: 2,
  },
  {
    title: "Finish ideation",
    description: "Conclude ideation phase and finalize concept",
    category: "Saas Product",
    status: "Done",
    priority: "Medium",
    dueDate: new Date("2024-02-05"),
    assignee: "Emma Wilson",
    order: 0,
  },
  {
    title: "Social media strategy",
    description: "Create and plan social media marketing strategy for Q1",
    category: "Social Media Plan",
    status: "To Do",
    priority: "Medium",
    dueDate: new Date("2024-02-18"),
    assignee: "Lisa Martinez",
    order: 2,
  },
  {
    title: "Code review",
    description: "Review and approve pull requests from development team",
    category: "CRM Web App",
    status: "In Progress",
    priority: "Medium",
    dueDate: new Date("2024-02-09"),
    assignee: "James Taylor",
    order: 3,
  },
  {
    title: "Security audit",
    description: "Perform comprehensive security audit on application",
    category: "Finance Product",
    status: "To Do",
    priority: "High",
    dueDate: new Date("2024-02-25"),
    assignee: "Robert Singh",
    order: 3,
  },
  {
    title: "UI/UX Testing",
    description: "Conduct user testing sessions for interface improvements",
    category: "Saas Product",
    status: "Done",
    priority: "Medium",
    dueDate: new Date("2024-02-03"),
    assignee: "Amanda Scott",
    order: 1,
  },
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connected");

    // Clear existing tasks
    await Task.deleteMany({});
    console.log("🗑️  Cleared existing tasks");

    // Insert sample data
    const insertedTasks = await Task.insertMany(sampleTasks);
    console.log(`✅ Inserted ${insertedTasks.length} sample tasks`);

    // Display inserted tasks
    console.log("\n📋 Sample Tasks:");
    insertedTasks.forEach((task, index) => {
      console.log(
        `${index + 1}. ${task.title} (${task.status}) - ${task.priority}`,
      );
    });

    // Disconnect
    await mongoose.connection.close();
    console.log("\n✅ Database seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();
