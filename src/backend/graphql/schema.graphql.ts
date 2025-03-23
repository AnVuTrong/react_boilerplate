export const typeDefs = `#graphql
  # User type
  type User {
    id: ID!
    name: String!
    email: String!
    role: String
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

  # Project type
  type Project {
    id: ID!
    name: String!
    description: String
    todos: [Todo]
  }

  # Input types
  input UserInput {
    name: String!
    email: String!
    role: String
  }

  input TodoInput {
    title: String!
    description: String
    completed: Boolean
    userId: ID!
  }

  input ProjectInput {
    name: String!
    description: String
  }

  # Queries
  type Query {
    # User queries
    users: [User]
    user(id: ID!): User
    
    # Todo queries
    todos: [Todo]
    todo(id: ID!): Todo
    userTodos(userId: ID!): [Todo]
    
    # Project queries
    projects: [Project]
    project(id: ID!): Project
  }

  # Mutations
  type Mutation {
    # User mutations
    createUser(input: UserInput!): User
    updateUser(id: ID!, input: UserInput!): User
    deleteUser(id: ID!): Boolean
    
    # Todo mutations
    createTodo(input: TodoInput!): Todo
    updateTodo(id: ID!, input: TodoInput!): Todo
    deleteTodo(id: ID!): Boolean
    toggleTodoStatus(id: ID!): Todo
    
    # Project mutations
    createProject(input: ProjectInput!): Project
    updateProject(id: ID!, input: ProjectInput!): Project
    deleteProject(id: ID!): Boolean
    addTodoToProject(projectId: ID!, todoId: ID!): Project
    removeTodoFromProject(projectId: ID!, todoId: ID!): Project
  }
`; 