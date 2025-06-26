export type TaskStatus = "To Do" | "In Progress" | "Done";

export interface Task {
  _id: string;
  title: string;
  description: string;
  assignedTo: string;
  status: TaskStatus;
  createdAt: string | Date;
  updatedAt: string | Date;
}

// For backward compatibility
export interface TaskWithId extends Omit<Task, '_id'> {
  id: string;
}

export interface CreateTaskInput {
  title: string;
  description: string;
  assignedTo: string;
  status: TaskStatus;
}

export interface UpdateTaskInput {
  id: string;
  title?: string;
  description?: string;
  assignedTo?: string;
  status?: TaskStatus;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  details?: string[];
  message?: string;
}

export interface TaskFilters {
  status?: TaskStatus;
  assignedTo?: string;
}
