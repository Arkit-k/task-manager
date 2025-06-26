'use client';

import React, { useState, useEffect } from 'react';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';
import { useTheme } from '@/contexts/ThemeContext';

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const { theme, toggleTheme, isDark } = useTheme();

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showForm) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [showForm]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
      {/* Main Content - Apply blur when modal is open */}
      <div className={`transition-all duration-300 ${showForm ? 'blur-md filter' : ''}`}>
        {/* Header */}
        <header className={`border-b transition-colors duration-300 ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Tasks</h1>
            </div>
            <div className="flex items-center gap-3">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-md transition-colors duration-300 ${
                  isDark
                    ? 'bg-gray-900 text-yellow-400 hover:bg-gray-800'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              >
                {isDark ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>

              {/* New Task Button */}
              <button
                onClick={() => setShowForm(!showForm)}
                className="btn-primary bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-sm font-medium"
              >
                {showForm ? '✕ Cancel' : '+ New Task'}
              </button>
            </div>
          </div>
        </div>
      </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-6 py-6">
          {/* Task List */}
          <TaskList />
        </main>
      </div>

      {/* Modal Overlay for Task Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Transparent Backdrop - just for click handling */}
          <div
            className="absolute inset-0"
            onClick={() => setShowForm(false)}
          ></div>

          {/* Modal Content */}
          <div className="relative z-10 w-full max-w-md mx-4 modal-content">
            <TaskForm onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
