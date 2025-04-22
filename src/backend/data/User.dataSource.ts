import { v4 as uuidv4 } from 'uuid';
import { User } from './models.data';

// Initial mock data for users
let users: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com' },
];

export class UserDataSource {
  private users: User[];

  constructor() {
    // Initialize with mock data
    this.users = users;
  }

  // Get all users
  getUsers(): User[] {
    return this.users;
  }

  // Get a specific user by ID
  getUserById(id: string): User | undefined {
    return this.users.find(user => user.id === id);
  }

  // Create a new user
  createUser(userData: Omit<User, 'id'>): User {
    // Generate a new ID and create user object
    const newUser = { id: uuidv4(), ...userData };
    
    // Add to collection
    this.users.push(newUser);
    
    // Update shared mock data (in a real app, this would be a database write)
    users = this.users;
    
    return newUser;
  }

  // Update an existing user
  updateUser(id: string, userData: Partial<Omit<User, 'id'>>): User | null {
    // Find the user index
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) return null;

    // Update the user with new data
    const updatedUser = { ...this.users[index], ...userData };
    this.users[index] = updatedUser;
    
    // Update shared mock data
    users = this.users;
    
    return updatedUser;
  }

  // Delete a user
  deleteUser(id: string): boolean {
    const initialLength = this.users.length;
    this.users = this.users.filter(user => user.id !== id);
    
    // Update shared mock data
    users = this.users;
    
    // Return true if a user was deleted
    return this.users.length !== initialLength;
  }
} 