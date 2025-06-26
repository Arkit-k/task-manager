'use client';

import React, { createContext, useContext, useReducer, useEffect, useCallback, ReactNode } from 'react';
import { Task, CreateTaskInput, UpdateTaskInput, TaskFilters, ApiResponse } from '@/types';

interface TaskState {
  tasks: Task[];
  filters: TaskFilters;
  loading: boolean;
  error: string | null;
}

type TaskAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_TASKS'; payload: Task[] }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'SET_FILTERS'; payload: TaskFilters }
  | { type: 'CLEAR_FILTERS' };

interface TaskContextType {
  state: TaskState;
  addTask: (task: CreateTaskInput) => Promise<void>;
  updateTask: (task: UpdateTaskInput) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  setFilters: (filters: TaskFilters) => void;
  clearFilters: () => void;
  getFilteredTasks: () => Task[];
  fetchTasks: () => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case 'SET_TASKS':
      return {
        ...state,
        tasks: action.payload,
        loading: false,
        error: null,
      };
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
        loading: false,
        error: null,
      };
    case 'UPDATE_TASK': {
      const updatedTasks = state.tasks.map(task =>
        task._id === action.payload._id ? action.payload : task
      );
      return {
        ...state,
        tasks: updatedTasks,
        loading: false,
        error: null,
      };
    }
    case 'DELETE_TASK': {
      const filteredTasks = state.tasks.filter(task => task._id !== action.payload);
      return {
        ...state,
        tasks: filteredTasks,
        loading: false,
        error: null,
      };
    }
    case 'SET_FILTERS': {
      return {
        ...state,
        filters: action.payload,
      };
    }
    case 'CLEAR_FILTERS': {
      return {
        ...state,
        filters: {},
      };
    }
    default:
      return state;
  }
};

const initialState: TaskState = {
  tasks: [],
  filters: {},
  loading: false,
  error: null,
};

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Fetch tasks from API
  const fetchTasks = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      const params = new URLSearchParams();
      if (state.filters.status) {
        params.append('status', state.filters.status);
      }
      if (state.filters.assignedTo) {
        params.append('assignedTo', state.filters.assignedTo);
      }

      const response = await fetch(`/api/tasks?${params.toString()}`);
      const result: ApiResponse<Task[]> = await response.json();

      if (result.success && result.data) {
        dispatch({ type: 'SET_TASKS', payload: result.data });
      } else {
        dispatch({ type: 'SET_ERROR', payload: result.error || 'Failed to fetch tasks' });
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Network error occurred' });
    }
  }, [state.filters]);

  // Add task via API
  const addTask = async (task: CreateTaskInput) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });

      const result: ApiResponse<Task> = await response.json();

      if (result.success && result.data) {
        dispatch({ type: 'ADD_TASK', payload: result.data });
      } else {
        dispatch({ type: 'SET_ERROR', payload: result.error || 'Failed to create task' });
      }
    } catch (error) {
      console.error('Error creating task:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Network error occurred' });
    }
  };

  // Update task via API
  const updateTask = async (task: UpdateTaskInput) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      const { id, ...updateData } = task;
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      const result: ApiResponse<Task> = await response.json();

      if (result.success && result.data) {
        dispatch({ type: 'UPDATE_TASK', payload: result.data });
      } else {
        dispatch({ type: 'SET_ERROR', payload: result.error || 'Failed to update task' });
      }
    } catch (error) {
      console.error('Error updating task:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Network error occurred' });
    }
  };

  // Delete task via API
  const deleteTask = async (id: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      });

      const result: ApiResponse<Task> = await response.json();

      if (result.success) {
        dispatch({ type: 'DELETE_TASK', payload: id });
      } else {
        dispatch({ type: 'SET_ERROR', payload: result.error || 'Failed to delete task' });
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Network error occurred' });
    }
  };

  const setFilters = (filters: TaskFilters) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  };

  const clearFilters = () => {
    dispatch({ type: 'CLEAR_FILTERS' });
  };

  const getFilteredTasks = (): Task[] => {
    // Since we're filtering on the server side now, just return all tasks
    return state.tasks;
  };

  // Fetch tasks on mount and when filters change
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const value: TaskContextType = {
    state,
    addTask,
    updateTask,
    deleteTask,
    setFilters,
    clearFilters,
    getFilteredTasks,
    fetchTasks,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTask = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};
