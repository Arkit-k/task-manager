import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TaskProvider, useTask } from '@/contexts/TaskContext';
import { CreateTaskInput } from '@/types';

// Test component to interact with the context
const TestComponent = () => {
  const { state, addTask, updateTask, deleteTask, getFilteredTasks } = useTask();

  const handleAddTask = () => {
    const newTask: CreateTaskInput = {
      title: 'Test Task',
      description: 'Test Description',
      assignedTo: 'John Doe',
      status: 'To Do',
    };
    addTask(newTask);
  };

  const handleUpdateTask = () => {
    if (state.tasks.length > 0) {
      updateTask({
        id: state.tasks[0].id,
        status: 'In Progress',
      });
    }
  };

  const handleDeleteTask = () => {
    if (state.tasks.length > 0) {
      deleteTask(state.tasks[0].id);
    }
  };

  return (
    <div>
      <div data-testid="task-count">{state.tasks.length}</div>
      <div data-testid="filtered-count">{getFilteredTasks().length}</div>
      <button onClick={handleAddTask} data-testid="add-task">
        Add Task
      </button>
      <button onClick={handleUpdateTask} data-testid="update-task">
        Update Task
      </button>
      <button onClick={handleDeleteTask} data-testid="delete-task">
        Delete Task
      </button>
      {state.tasks.map(task => (
        <div key={task.id} data-testid={`task-${task.id}`}>
          {task.title} - {task.status}
        </div>
      ))}
    </div>
  );
};

const renderWithProvider = (component: React.ReactElement) => {
  return render(
    <TaskProvider>
      {component}
    </TaskProvider>
  );
};

describe('TaskContext', () => {
  test('should add a task', () => {
    renderWithProvider(<TestComponent />);
    
    expect(screen.getByTestId('task-count')).toHaveTextContent('0');
    
    fireEvent.click(screen.getByTestId('add-task'));
    
    expect(screen.getByTestId('task-count')).toHaveTextContent('1');
    expect(screen.getByText('Test Task - To Do')).toBeInTheDocument();
  });

  test('should update a task', () => {
    renderWithProvider(<TestComponent />);
    
    // Add a task first
    fireEvent.click(screen.getByTestId('add-task'));
    expect(screen.getByText('Test Task - To Do')).toBeInTheDocument();
    
    // Update the task
    fireEvent.click(screen.getByTestId('update-task'));
    expect(screen.getByText('Test Task - In Progress')).toBeInTheDocument();
  });

  test('should delete a task', () => {
    renderWithProvider(<TestComponent />);
    
    // Add a task first
    fireEvent.click(screen.getByTestId('add-task'));
    expect(screen.getByTestId('task-count')).toHaveTextContent('1');
    
    // Delete the task
    fireEvent.click(screen.getByTestId('delete-task'));
    expect(screen.getByTestId('task-count')).toHaveTextContent('0');
  });
});
