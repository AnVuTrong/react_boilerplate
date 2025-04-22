export const typeDefs = `#graphql
  # User type
  type User {
    id: ID!
    name: String!
    email: String!
  }

  # Todo type
  type Todo {
    id: ID!
    title: String!
    description: String
    completed: Boolean!
    userId: ID!
    user: User
  }

  # Input types
  input TodoInput {
    title: String!
    description: String
    userId: ID!
  }

  # Queries
  type Query {
    # Get all users
    users: [User]
    
    # Get all todos
    todos: [Todo]
    
    # Get a specific todo by ID
    todo(id: ID!): Todo
  }

  # Mutations
  type Mutation {
    # Create a new todo
    createTodo(input: TodoInput!): Todo
    
    # Toggle the completed status of a todo
    toggleTodoStatus(id: ID!): Todo
    
    # Delete a todo
    deleteTodo(id: ID!): Boolean
  }
`; 