import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Task from '@/models/Task';
import { CreateTaskInput } from '@/types';

// GET /api/tasks - Get all tasks with optional filtering
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const assignedTo = searchParams.get('assignedTo');

    // Build filter object
    const filter: Record<string, unknown> = {};
    if (status) {
      filter.status = status;
    }
    if (assignedTo) {
      filter.assignedTo = { $regex: assignedTo, $options: 'i' };
    }

    const tasks = await Task.find(filter).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch tasks',
      },
      { status: 500 }
    );
  }
}

// POST /api/tasks - Create a new task
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body: CreateTaskInput = await request.json();
    const { title, description, assignedTo, status } = body;

    // Validate required fields
    if (!title || !description || !assignedTo) {
      return NextResponse.json(
        {
          success: false,
          error: 'Title, description, and assignedTo are required',
        },
        { status: 400 }
      );
    }

    const task = await Task.create({
      title,
      description,
      assignedTo,
      status: status || 'To Do',
    });

    return NextResponse.json(
      {
        success: true,
        data: task,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error('Error creating task:', error);

    // Handle validation errors
    if (error && typeof error === 'object' && 'name' in error && error.name === 'ValidationError' && 'errors' in error) {
      const validationErrors = Object.values((error as unknown as { errors: Record<string, { message: string }> }).errors).map((err) => err.message);
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: validationErrors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create task',
      },
      { status: 500 }
    );
  }
}
