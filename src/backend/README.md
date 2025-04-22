# Simple GraphQL Todo App

This is a simple Todo application that uses GraphQL to manage users and their todos.

## GraphQL Structure

### Data Models

We have two main data models:

1. **User** - Represents a person in the system:
   - `id`: Unique identifier
   - `name`: User's name
   - `email`: User's email address

2. **Todo** - Represents a task to be completed:
   - `id`: Unique identifier
   - `title`: Task title
   - `description`: Optional task description
   - `completed`: Boolean indicating if the task is completed
   - `userId`: References the user assigned to this task

### GraphQL Components

#### 1. Schema (`schema.graphql.ts`)

The schema defines the types, queries, and mutations available in our API. It's like a contract for what data is available and how it can be accessed or modified.

#### 2. Resolvers (`resolvers.graphql.ts`)

Resolvers are functions that handle the actual data fetching and manipulation when GraphQL operations are requested. They connect the schema to our data sources.

#### 3. Data Sources (`User.dataSource.ts` and `Todo.dataSource.ts`)

These classes handle the actual data operations like fetching, creating, updating, and deleting records. In a real application, they would connect to a database.

#### 4. Apollo Server (`server.ts`)

The Apollo Server sets up our GraphQL API, combining the schema and resolvers, and making them available via HTTP.

#### 5. Apollo Client (`client.apollo.ts`)

The client connects our frontend application to the GraphQL API, handling requests and caching responses.

## Available GraphQL Operations

### Queries

- `users`: Get all users
- `todos`: Get all todos
- `todo(id)`: Get a specific todo by ID

### Mutations

- `createTodo(input)`: Create a new todo
- `toggleTodoStatus(id)`: Toggle the completed status of a todo
- `deleteTodo(id)`: Delete a todo

## Running the Application

1. Start the backend server:
   ```
   yarn start:server
   ```

2. Start the frontend application:
   ```
   yarn start
   ```

3. Visit the GraphQL playground at http://localhost:4000/graphql to explore the API.

4. Access the frontend application at http://localhost:3000 