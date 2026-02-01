# 📋 Task Management System

A professional, full-stack task management application built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js). Featuring real-time updates via Socket.io, a modern dark-themed interactive UI with Tailwind CSS, and seamless drag-and-drop task organization.

---

## 🎯 Key Features

- ✅ **Full CRUD Operations** - Create, read, update, and delete tasks with ease.
- 🎨 **Modern Dark UI** - Premium dashboard design using Tailwind CSS and Lucide icons.
- 🚀 **Interactive Drag & Drop** - Fluid task movement between "To Do", "In Progress", and "Done" columns.
- 📊 **Real-time Synchronization** - Instant updates across all connected clients using Socket.io.
- 🏷️ **Advanced Categorization** - Organize tasks by category, priority (High/Medium/Low), and assignee.
- ⏰ **Deadline Tracking** - Smart due date management with visual indicators.
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop viewing.
- 📈 **Statistics Dashboard** - Visual breakdown of task completion rates and priority distribution.

---

## 🛠️ Tech Stack

### Frontend
- **React.js (v19)** - UI library
- **Vite** - Modern build tool
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Icon library
- **react-beautiful-dnd** - Drag and drop functionality
- **Axios** - HTTP client for API communication
- **Socket.io-client** - Real-time communication

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Socket.io** - Real-time WebSocket server
- **dotenv** - Environment variable management

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (Local instance or Atlas)
- npm or yarn

### 1. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` folder:
```text
MONGODB_URI=mongodb://localhost:27017/task-manager
PORT=5000
NODE_ENV=development
```
Start the server:
```bash
npm run dev
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📁 Project Structure

```text
Task Management System/
├── backend/
│   ├── models/Task.js            # MongoDB Schema
│   ├── controllers/              # Business Logic
│   ├── routes/tasks.js           # API Endpoints
│   └── server.js                 # Server Entry Point
├── frontend/
│   ├── src/
│   │   ├── components/           # UI Components (TaskBoard, TaskCard, etc.)
│   │   ├── services/api.js       # API & Socket Services
│   │   └── App.jsx               # Main Application
│   ├── tailwind.config.js        # Design System Config
│   └── vite.config.js            # Build Config
└── README.md                     # Documentation
```

---

## 📖 API Reference

### Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/tasks` | Get all tasks |
| `POST` | `/tasks` | Create a new task |
| `PUT` | `/tasks/:id` | Update task details |
| `DELETE` | `/tasks/:id` | Delete a task |
| `PATCH` | `/tasks/order/update` | Update task display order |

### Real-time Events (Socket.io)
- `task-created`: Emitted when a new task is added.
- `task-updated`: Emitted when a task is moved or edited.
- `task-deleted`: Emitted when a task is removed.

---

## 🚀 Deployment

### Backend (Production)
1. Set `NODE_ENV=production` in environment variables.
2. Update `MONGODB_URI` to point to a production database (e.g., MongoDB Atlas).
3. Use a process manager like **PM2**: `pm2 start server.js`.

### Frontend (Production)
1. Update `API_BASE_URL` in `frontend/src/services/api.js`.
2. Build the app: `npm run build`.
3. Deploy the `dist` folder to static hosting (Vercel, Netlify, or AWS S3).

---

## 🔧 Troubleshooting

- **MongoDB Connection**: Ensure `mongod` is running or your Atlas connection string is correct.
- **Port Conflict**: If port 5000 or 5173 is busy, update the config in `.env` or `vite.config.js`.
- **CORS Issues**: Check the `CORS` configuration in `backend/server.js` to ensure your frontend domain is allowed.

---

**Built with ❤️ using the MERN Stack**
