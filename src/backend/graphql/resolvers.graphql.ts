import { MyContext } from '../server'; // Import the context type

export const resolvers = {
  Query: {
    // Get all users
    users: (_: any, __: any, { dataSources }: MyContext) => {
      return dataSources.userDataSource.getUsers();
    },

    // Get all todos
    todos: (_: any, __: any, { dataSources }: MyContext) => {
      return dataSources.todoDataSource.getTodos();
    },
    
    // Get a specific todo by ID
    todo: (_: any, { id }: { id: string }, { dataSources }: MyContext) => {
      return dataSources.todoDataSource.getTodoById(id);
    },
  },

  Mutation: {
    // Create a new todo
    createTodo: (_: any, { input }: any, { dataSources }: MyContext) => {
      return dataSources.todoDataSource.createTodo(input);
    },
    
    // Toggle todo completed status
    toggleTodoStatus: (_: any, { id }: { id: string }, { dataSources }: MyContext) => {
      return dataSources.todoDataSource.toggleTodoStatus(id);
    },
    
    // Delete a todo
    deleteTodo: (_: any, { id }: { id: string }, { dataSources }: MyContext) => {
      return dataSources.todoDataSource.deleteTodo(id);
    },
  },

  // Resolve relationships
  Todo: {
    // Get the user associated with a todo
    user: (parent: any, _: any, { dataSources }: MyContext) => {
      return dataSources.userDataSource.getUserById(parent.userId);
    },
  },
}; 