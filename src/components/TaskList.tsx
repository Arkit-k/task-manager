'use client';

import React, { useState } from 'react';
import { useTask } from '@/contexts/TaskContext';
import { useTheme } from '@/contexts/ThemeContext';
import { TaskStatus } from '@/types';
import TaskItem from './TaskItem';


const TaskList: React.FC = () => {
  const { state, setFilters, clearFilters, getFilteredTasks } = useTask();
  const { isDark } = useTheme();
  const [statusFilter, setStatusFilter] = useState<TaskStatus | ''>('');
  const [assigneeFilter, setAssigneeFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTasks = getFilteredTasks().filter(task => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return task.title.toLowerCase().includes(query) ||
           task.description.toLowerCase().includes(query);
  });

  const handleStatusFilterChange = (status: TaskStatus | '') => {
    setStatusFilter(status);
    const newFilters = {
      ...state.filters,
      status: status || undefined,
    };
    if (!status) {
      delete newFilters.status;
    }
    setFilters(newFilters);
  };

  const handleAssigneeFilterChange = (assignee: string) => {
    setAssigneeFilter(assignee);
    const newFilters = {
      ...state.filters,
      assignedTo: assignee || undefined,
    };
    if (!assignee) {
      delete newFilters.assignedTo;
    }
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setStatusFilter('');
    setAssigneeFilter('');
    setSearchQuery('');
    clearFilters();
  };



  const uniqueAssignees = Array.from(new Set(state.tasks.map(task => task.assignedTo)));

  return (
    <div>
      {/* Search and Filters Bar */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          {/* Search */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors duration-300 ${
                isDark
                  ? 'border-gray-800 bg-black text-white placeholder-gray-400'
                  : 'border-gray-200 bg-white text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => handleStatusFilterChange(e.target.value as TaskStatus | '')}
              className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors duration-300 ${
                isDark
                  ? 'border-gray-800 bg-black text-white'
                  : 'border-gray-200 bg-white text-gray-900'
              }`}
            >
              <option value="">All Status</option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>

            <select
              value={assigneeFilter}
              onChange={(e) => handleAssigneeFilterChange(e.target.value)}
              className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors duration-300 ${
                isDark
                  ? 'border-gray-800 bg-black text-white'
                  : 'border-gray-200 bg-white text-gray-900'
              }`}
            >
              <option value="">All People</option>
              {uniqueAssignees.map(assignee => (
                <option key={assignee} value={assignee}>
                  {assignee}
                </option>
              ))}
            </select>

            {(statusFilter || assigneeFilter || searchQuery) && (
              <button
                onClick={handleClearFilters}
                className={`px-3 py-2 text-sm transition-colors duration-300 ${
                  isDark
                    ? 'text-gray-400 hover:text-gray-200'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                title="Clear filters"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Results count */}
        <div className={`text-sm transition-colors duration-300 ${
          isDark ? 'text-gray-400' : 'text-gray-500'
        }`}>
          {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'}
          {(statusFilter || assigneeFilter || searchQuery) && ` of ${state.tasks.length} total`}
        </div>
      </div>

      {/* Error Message */}
      {state.error && (
        <div className={`mb-4 p-3 border rounded-md text-sm transition-colors duration-300 ${
          isDark
            ? 'bg-red-900 border-red-700 text-red-300'
            : 'bg-red-50 border-red-200 text-red-700'
        }`}>
          {state.error}
        </div>
      )}

      {/* Loading Indicator */}
      {state.loading && (
        <div className="flex items-center justify-center py-12">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span className={`ml-2 text-sm transition-colors duration-300 ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>Loading...</span>
        </div>
      )}

      {/* Task Grid */}
      {!state.loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-500">
              {state.tasks.length === 0 ? (
                <div>
                  <svg className="mx-auto h-12 w-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <p className="text-lg font-medium text-gray-900 mb-1">No tasks yet</p>
                  <p className="text-gray-500">Create your first task to get started</p>
                </div>
              ) : (
                <div>
                  <svg className="mx-auto h-12 w-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <p className="text-lg font-medium text-gray-900 mb-1">No tasks found</p>
                  <p className="text-gray-500">Try adjusting your search or filters</p>
                </div>
              )}
            </div>
          ) : (
            filteredTasks.map(task => (
              <TaskItem key={task._id} task={task} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default TaskList;
