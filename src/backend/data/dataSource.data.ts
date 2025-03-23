import { v4 as uuidv4 } from 'uuid';
import { User, Todo, Project } from './models.data';

// Mock data
let users: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'admin' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'user' },
];

let todos: Todo[] = [
  { id: '1', title: 'Complete project', description: 'Finish the React boilerplate', completed: false, userId: '1' },
  { id: '2', title: 'Review code', description: 'Code review for the team', completed: true, userId: '1' },
  { id: '3', title: 'Meeting notes', description: 'Prepare meeting notes', completed: false, userId: '2' },
];

let projects: Project[] = [
  { id: '1', name: 'React Boilerplate', description: 'A starter template for React applications', todoIds: ['1', '2'] },
  { id: '2', name: 'GraphQL API', description: 'Building a GraphQL API for the application', todoIds: ['3'] },
];

// Data source implementation
export const dataSource = {
  // User methods
  getUsers: () => users,
  getUserById: (id: string) => users.find(user => user.id === id),
  createUser: (userData: Omit<User, 'id'>) => {
    const newUser = { id: uuidv4(), ...userData };
    users.push(newUser);
    return newUser;
  },
  updateUser: (id: string, userData: Partial<User>) => {
    const index = users.findIndex(user => user.id === id);
    if (index === -1) return null;
    
    const updatedUser = { ...users[index], ...userData };
    users[index] = updatedUser;
    return updatedUser;
  },
  deleteUser: (id: string) => {
    const initialLength = users.length;
    users = users.filter(user => user.id !== id);
    return users.length !== initialLength;
  },

  // Todo methods
  getTodos: () => todos,
  getTodoById: (id: string) => todos.find(todo => todo.id === id),
  getTodosByUserId: (userId: string) => todos.filter(todo => todo.userId === userId),
  createTodo: (todoData: Omit<Todo, 'id'>) => {
    const newTodo = { id: uuidv4(), ...todoData, completed: todoData.completed ?? false };
    todos.push(newTodo);
    return newTodo;
  },
  updateTodo: (id: string, todoData: Partial<Todo>) => {
    const index = todos.findIndex(todo => todo.id === id);
    if (index === -1) return null;
    
    const updatedTodo = { ...todos[index], ...todoData };
    todos[index] = updatedTodo;
    return updatedTodo;
  },
  deleteTodo: (id: string) => {
    const initialLength = todos.length;
    todos = todos.filter(todo => todo.id !== id);
    
    // Also remove from any projects
    projects.forEach(project => {
      project.todoIds = project.todoIds.filter(todoId => todoId !== id);
    });
    
    return todos.length !== initialLength;
  },
  toggleTodoStatus: (id: string) => {
    const todo = todos.find(todo => todo.id === id);
    if (!todo) return null;
    
    todo.completed = !todo.completed;
    return todo;
  },

  // Project methods
  getProjects: () => projects,
  getProjectById: (id: string) => projects.find(project => project.id === id),
  getProjectTodos: (projectId: string) => {
    const project = projects.find(project => project.id === projectId);
    if (!project) return [];
    return todos.filter(todo => project.todoIds.includes(todo.id));
  },
  createProject: (projectData: Omit<Project, 'id' | 'todoIds'>) => {
    const newProject = { id: uuidv4(), ...projectData, todoIds: [] };
    projects.push(newProject);
    return newProject;
  },
  updateProject: (id: string, projectData: Partial<Omit<Project, 'todoIds'>>) => {
    const index = projects.findIndex(project => project.id === id);
    if (index === -1) return null;
    
    const updatedProject = { ...projects[index], ...projectData };
    projects[index] = updatedProject;
    return updatedProject;
  },
  deleteProject: (id: string) => {
    const initialLength = projects.length;
    projects = projects.filter(project => project.id !== id);
    return projects.length !== initialLength;
  },
  addTodoToProject: (projectId: string, todoId: string) => {
    const project = projects.find(project => project.id === projectId);
    if (!project) return null;
    
    const todo = todos.find(todo => todo.id === todoId);
    if (!todo) return null;
    
    if (!project.todoIds.includes(todoId)) {
      project.todoIds.push(todoId);
    }
    
    return project;
  },
  removeTodoFromProject: (projectId: string, todoId: string) => {
    const project = projects.find(project => project.id === projectId);
    if (!project) return null;
    
    project.todoIds = project.todoIds.filter(id => id !== todoId);
    return project;
  }
}; 