import { v4 as uuidv4 } from 'uuid';
import { Todo } from './models.data';

// Initial mock data
let todos: Todo[] = [
  { id: '1', title: 'Complete project', description: 'Finish the React boilerplate', completed: false, userId: '1' },
  { id: '2', title: 'Review code', description: 'Code review for the team', completed: true, userId: '1' },
  { id: '3', title: 'Meeting notes', description: 'Prepare meeting notes', completed: false, userId: '2' },
];

export class TodoDataSource {
  private todos: Todo[];

  constructor() {
    // Use mock data for simplicity
    this.todos = todos;
  }

  // Get all todos
  getTodos(): Todo[] {
    return this.todos;
  }

  // Get a specific todo by ID
  getTodoById(id: string): Todo | undefined {
    return this.todos.find(todo => todo.id === id);
  }

  // Get todos for a specific user
  getTodosByUserId(userId: string): Todo[] {
    return this.todos.filter(todo => todo.userId === userId);
  }

  // Create a new todo
  createTodo(todoData: Omit<Todo, 'id'>): Todo {
    const newTodo = { 
      id: uuidv4(), 
      ...todoData, 
      completed: todoData.completed ?? false 
    };
    
    this.todos.push(newTodo);
    todos = this.todos; // Update shared mock data
    return newTodo;
  }

  // Update an existing todo
  updateTodo(id: string, todoData: Partial<Omit<Todo, 'id'>>): Todo | null {
    const index = this.todos.findIndex(todo => todo.id === id);
    if (index === -1) return null;

    const updatedTodo = { ...this.todos[index], ...todoData };
    this.todos[index] = updatedTodo;
    todos = this.todos; // Update shared mock data
    return updatedTodo;
  }

  // Delete a todo
  deleteTodo(id: string): boolean {
    const initialLength = this.todos.length;
    this.todos = this.todos.filter(todo => todo.id !== id);
    todos = this.todos; // Update shared mock data
    return this.todos.length !== initialLength;
  }

  // Toggle the completed status of a todo
  toggleTodoStatus(id: string): Todo | null {
    const todo = this.todos.find(todo => todo.id === id);
    if (!todo) return null;

    todo.completed = !todo.completed;
    return todo;
  }
} 