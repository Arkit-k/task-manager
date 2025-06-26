'use client';

import React, { useState } from 'react';
import { useTask } from '@/contexts/TaskContext';
import { useTheme } from '@/contexts/ThemeContext';
import { TaskStatus } from '@/types';

interface TaskFormProps {
  onClose?: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onClose }) => {
  const { addTask } = useTask();
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignedTo: '',
    status: 'To Do' as TaskStatus,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.assignedTo.trim()) {
      newErrors.assignedTo = 'Assigned To is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      addTask(formData);
      setFormData({
        title: '',
        description: '',
        assignedTo: '',
        status: 'To Do',
      });
      setErrors({});
      if (onClose) {
        onClose();
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  return (
    <div className={`border rounded-lg p-6 shadow-xl backdrop-blur-sm transition-colors duration-300 ${
      isDark
        ? 'bg-black bg-opacity-95 border-gray-800'
        : 'bg-white bg-opacity-90 border-gray-200'
    }`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-lg font-semibold ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>Create New Task</h2>
        {onClose && (
          <button
            onClick={onClose}
            className={`p-1 rounded-md transition-colors duration-300 ${
              isDark
                ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-900'
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
            }`}
            title="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-0 py-2 text-lg font-medium border-0 border-b-2 bg-transparent focus:outline-none focus:border-blue-500 transition-colors duration-300 ${
              errors.title
                ? 'border-red-500'
                : isDark
                  ? 'border-gray-800 text-white'
                  : 'border-gray-200 text-gray-900'
            }`}
            placeholder="Task title"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        <div>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className={`w-full px-0 py-2 border-0 bg-transparent focus:outline-none resize-none transition-colors duration-300 ${
              errors.description
                ? 'text-red-500'
                : isDark
                  ? 'text-gray-300'
                  : 'text-gray-700'
            }`}
            placeholder="Add a description..."
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              id="assignedTo"
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors duration-300 ${
                errors.assignedTo
                  ? 'border-red-500'
                  : isDark
                    ? 'border-gray-800 bg-gray-900 text-white'
                    : 'border-gray-200 bg-white text-gray-900'
              }`}
              placeholder="Assigned to"
            />
            {errors.assignedTo && <p className="text-red-500 text-xs mt-1">{errors.assignedTo}</p>}
          </div>

          <div className="w-32">
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors duration-300 ${
                isDark
                  ? 'border-gray-800 bg-gray-900 text-white'
                  : 'border-gray-200 bg-white text-gray-900'
              }`}
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="btn-primary w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-sm font-medium"
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
