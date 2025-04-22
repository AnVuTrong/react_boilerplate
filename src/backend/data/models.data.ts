// User model - represents a person in the system
export interface User {
  id: string;
  name: string;
  email: string;
}

// Todo model - represents a task to be completed
export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  userId: string;
} 