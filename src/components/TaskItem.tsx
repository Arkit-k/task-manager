'use client';

import React, { useState } from 'react';
import { useTask } from '@/contexts/TaskContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Task, TaskStatus } from '@/types';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { updateTask, deleteTask } = useTask();
  const { isDark } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description,
    assignedTo: task.assignedTo,
    status: task.status,
  });

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case 'To Do':
        return 'bg-gray-100 text-gray-700';
      case 'In Progress':
        return 'bg-blue-100 text-blue-700';
      case 'Done':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleStatusChange = (newStatus: TaskStatus) => {
    updateTask({
      id: task._id,
      status: newStatus,
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updateTask({
      id: task._id,
      ...editData,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      title: task.title,
      description: task.description,
      assignedTo: task.assignedTo,
      status: task.status,
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(task._id);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  if (isEditing) {
    return (
      <div className={`border rounded-lg p-4 shadow-sm transition-colors duration-300 ${
        isDark
          ? 'bg-gray-800 border-gray-700'
          : 'bg-white border-gray-200'
      }`}>
        <div className="space-y-3">
          <input
            type="text"
            name="title"
            value={editData.title}
            onChange={handleChange}
            className={`w-full px-0 py-1 text-lg font-medium border-0 border-b bg-transparent focus:outline-none focus:border-blue-500 transition-colors duration-300 ${
              isDark
                ? 'border-gray-600 text-white'
                : 'border-gray-200 text-gray-900'
            }`}
            placeholder="Task title"
          />

          <textarea
            name="description"
            value={editData.description}
            onChange={handleChange}
            rows={2}
            className={`w-full px-0 py-1 border-0 bg-transparent focus:outline-none resize-none transition-colors duration-300 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}
            placeholder="Add description..."
          />

          <div className="flex gap-3 pt-2">
            <input
              type="text"
              name="assignedTo"
              value={editData.assignedTo}
              onChange={handleChange}
              className={`flex-1 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors duration-300 ${
                isDark
                  ? 'border-gray-600 bg-gray-700 text-white'
                  : 'border-gray-200 bg-white text-gray-900'
              }`}
              placeholder="Assigned to"
            />

            <select
              name="status"
              value={editData.status}
              onChange={handleChange}
              className={`px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors duration-300 ${
                isDark
                  ? 'border-gray-600 bg-gray-700 text-white'
                  : 'border-gray-200 bg-white text-gray-900'
              }`}
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={handleSave}
              className="btn-primary bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className={`px-3 py-1 rounded text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
                isDark
                  ? 'bg-gray-700 text-white hover:bg-gray-600 focus:ring-gray-500'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500'
              }`}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`task-item border rounded-lg p-4 hover:shadow-md hover-lift transition-all duration-200 group ${
      isDark
        ? 'bg-black border-gray-800 hover:border-gray-700'
        : 'bg-white border-gray-200 hover:border-gray-300'
    }`}>
      {/* Header with title and actions */}
      <div className="flex justify-between items-start mb-2">
        <h3 className={`text-base font-medium leading-tight transition-colors duration-300 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>{task.title}</h3>
        <div className="flex gap-1">
          <button
            onClick={handleEdit}
            className={`p-1 rounded transition-colors duration-300 ${
              isDark
                ? 'text-gray-500 hover:text-blue-400'
                : 'text-gray-400 hover:text-blue-600'
            }`}
            title="Edit task"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={handleDelete}
            className={`p-1 rounded transition-colors duration-300 ${
              isDark
                ? 'text-gray-500 hover:text-red-400'
                : 'text-gray-400 hover:text-red-600'
            }`}
            title="Delete task"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Description */}
      {task.description && (
        <p className={`text-sm mb-3 leading-relaxed transition-colors duration-300 ${
          isDark ? 'text-gray-300' : 'text-gray-600'
        }`}>{task.description}</p>
      )}

      {/* Footer with assignee and status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-300 ${
            isDark ? 'bg-gray-700' : 'bg-gray-200'
          }`}>
            <span className={`text-xs font-medium transition-colors duration-300 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {task.assignedTo.charAt(0).toUpperCase()}
            </span>
          </div>
          <span className={`text-sm transition-colors duration-300 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>{task.assignedTo}</span>
        </div>

        <select
          value={task.status}
          onChange={(e) => handleStatusChange(e.target.value as TaskStatus)}
          className={`text-xs px-2 py-1 rounded-full border-0 ${getStatusColor(task.status)} focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer`}
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>

      {/* Timestamp */}
      <div className={`text-xs mt-3 pt-2 border-t transition-colors duration-300 ${
        isDark
          ? 'text-gray-500 border-gray-700'
          : 'text-gray-400 border-gray-100'
      }`}>
        Updated {new Date(task.updatedAt).toLocaleDateString()}
      </div>
    </div>
  );
};

export default TaskItem;
