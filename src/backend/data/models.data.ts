export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
}

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  userId: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  todoIds: string[];
} 