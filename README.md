# Task Manager - Assessment Project

## Objective

This is an assessment project for **Change Network**. The team designed and implemented a simple collaborative task manager using **Next.js** and **MongoDB**. The application allows users to create tasks, assign them to team members, update their status, and view all tasks. The focus is on modular design, clean code, and teamwork.

## 🚀 Features

### Core Features Implemented

✅ **Task Creation**
- Create tasks with title, description, assigned team member, and status
- Modal-based form with glassmorphism design
- Form validation and error handling

✅ **Task Management**
- Update task status ("To Do", "In Progress", "Done")
- Edit task details inline
- Delete tasks with confirmation

✅ **Task Filtering & Search**
- Filter by status (To Do, In Progress, Done)
- Filter by assignee (team member name)
- Real-time search by title and description
- Clear filters functionality

✅ **Modern UI/UX**
- Notion-inspired design with card-based layout
- Dark/Light mode toggle
- Responsive grid layout
- Smooth animations and transitions
- Glassmorphism modal effects

## 🛠 Tech Stack

- **Frontend**: Next.js 15 (React 18)
- **Backend**: Next.js API Routes
- **Database**: MongoDB Atlas
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **State Management**: React Context API

## 📋 Requirements Fulfilled

### 1. Core Features
- [x] **Create Task**: Title, Description, Assigned To, Status
- [x] **Update Status**: Change task status between "To Do", "In Progress", "Done"
- [x] **List Tasks**: Display all tasks with filtering capabilities
- [x] **Filter by Status**: Show only tasks with specific status
- [x] **Filter by Assignee**: Show tasks assigned to specific team members
- [x] **Delete Task**: Remove tasks with confirmation dialog

### 2. Technical Requirements
- [x] **Next.js Framework**: Built with Next.js 15
- [x] **MongoDB Integration**: Full CRUD operations with MongoDB Atlas
- [x] **Modular Design**: Component-based architecture
- [x] **Clean Code**: TypeScript, proper error handling, organized structure
- [x] **Responsive Design**: Works on desktop and mobile devices

## 🏗 Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── tasks/
│   │       ├── route.ts          # GET, POST /api/tasks
│   │       └── [id]/route.ts     # GET, PUT, DELETE /api/tasks/[id]
│   ├── globals.css               # Global styles and dark mode
│   ├── layout.tsx                # Root layout with providers
│   └── page.tsx                  # Main application page
├── components/
│   ├── TaskForm.tsx              # Task creation/editing form
│   ├── TaskItem.tsx              # Individual task card component
│   ├── TaskList.tsx              # Task list with search and filters
│   └── index.ts                  # Component exports
├── contexts/
│   ├── TaskContext.tsx           # Task state management
│   └── ThemeContext.tsx          # Dark/light mode management
├── lib/
│   ├── mongodb.ts                # Database connection utility
│   └── global.d.ts               # Global type definitions
├── models/
│   └── Task.ts                   # Mongoose schema and model
└── types/
    ├── task.ts                   # Task-related TypeScript types
    └── index.ts                  # Type exports
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd assesment/task-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=mongodb+srv://Yourusername:yourpassword@dbname.ueltj.mongodb.net/?retryWrites=true&w=majority&appName=dbname
   MONGODB_DB=taskmanager
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open the application**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Usage

### Creating Tasks
1. Click the "**+ New Task**" button in the header
2. Fill in the modal form with task details:
   - **Title**: Task name (required)
   - **Description**: Task details (required)
   - **Assigned To**: Team member name (required)
   - **Status**: Select from "To Do", "In Progress", or "Done"
3. Click "**Create Task**" to save

### Managing Tasks
- **Edit**: Click the edit icon on any task card
- **Delete**: Click the delete icon and confirm
- **Update Status**: Use the status dropdown on each task card

### Filtering & Search
- **Search**: Use the search bar to find tasks by title or description
- **Filter by Status**: Select status from the dropdown
- **Filter by Assignee**: Select team member from the dropdown
- **Clear Filters**: Click the "✕" button when filters are active

### Dark Mode
- Click the sun/moon icon in the header to toggle between light and dark themes
- Preference is saved in localStorage

## 🎨 Design Features

- **Notion-inspired UI** with clean, minimal design
- **Card-based layout** for better task visualization
- **Glassmorphism effects** on modals and overlays
- **Responsive grid** that adapts to screen size
- **Smooth animations** for better user experience
- **Dark mode** with pure black theme like Notion

## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks with optional filtering |
| POST | `/api/tasks` | Create a new task |
| GET | `/api/tasks/[id]` | Get a specific task |
| PUT | `/api/tasks/[id]` | Update a specific task |
| DELETE | `/api/tasks/[id]` | Delete a specific task |

## 🧪 Testing

The application includes comprehensive error handling and validation:
- Form validation for required fields
- MongoDB connection error handling
- API error responses with proper status codes
- Loading states and user feedback

## 📝 Assessment Criteria Met

✅ **Functionality**: All core features implemented and working
✅ **Code Quality**: Clean, modular TypeScript code with proper structure
✅ **Design**: Modern, responsive UI with excellent user experience
✅ **Database Integration**: Full CRUD operations with MongoDB
✅ **Error Handling**: Comprehensive validation and error management
✅ **Documentation**: Clear README with setup and usage instructions

## 👥 Team Collaboration

This project demonstrates:
- **Modular component architecture** for easy collaboration
- **TypeScript interfaces** for consistent data structures
- **Reusable contexts** for state management
- **Clean separation** of concerns between UI and business logic
- **Consistent coding patterns** throughout the application

---

**Built with ❤️ for Change Network Assessment**
