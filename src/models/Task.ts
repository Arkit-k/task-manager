import mongoose, { Document, Model, Schema } from 'mongoose';
import { TaskStatus } from '@/types';

export interface ITask extends Document {
  _id: string;
  title: string;
  description: string;
  assignedTo: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema: Schema<ITask> = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [500, 'Description cannot be more than 500 characters'],
    },
    assignedTo: {
      type: String,
      required: [true, 'Assigned To is required'],
      trim: true,
      maxlength: [50, 'Assigned To cannot be more than 50 characters'],
    },
    status: {
      type: String,
      required: [true, 'Status is required'],
      enum: {
        values: ['To Do', 'In Progress', 'Done'],
        message: 'Status must be either To Do, In Progress, or Done',
      },
      default: 'To Do',
    },
  },
  {
    timestamps: true,
  }
);

// Add indexes for better query performance
TaskSchema.index({ status: 1 });
TaskSchema.index({ assignedTo: 1 });
TaskSchema.index({ createdAt: -1 });

// Prevent model re-compilation during development
const Task: Model<ITask> = mongoose.models.Task || mongoose.model<ITask>('Task', TaskSchema);

export default Task;
