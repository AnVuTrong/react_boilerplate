import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

// GraphQL query to get all todos
const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      title
      description
      completed
      user {
        id
        name
      }
    }
  }
`;

// GraphQL query to get all users
const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`;

// GraphQL mutation to create a new todo
const CREATE_TODO = gql`
  mutation CreateTodo($input: TodoInput!) {
    createTodo(input: $input) {
      id
      title
      description
      completed
    }
  }
`;

// GraphQL mutation to toggle todo completion status
const TOGGLE_TODO_STATUS = gql`
  mutation ToggleTodoStatus($id: ID!) {
    toggleTodoStatus(id: $id) {
      id
      completed
    }
  }
`;

// GraphQL mutation to delete a todo
const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id)
  }
`;

const GraphQLPage: React.FC = () => {
  // State for form inputs
  const [todoTitle, setTodoTitle] = useState('');
  const [todoDescription, setTodoDescription] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');

  // Execute the GraphQL queries
  const { loading: loadingTodos, data: todoData, refetch: refetchTodos } = useQuery(GET_TODOS);
  const { loading: loadingUsers, data: userData } = useQuery(GET_USERS);

  // Set up GraphQL mutations
  const [createTodo] = useMutation(CREATE_TODO, {
    onCompleted: () => {
      // Reset form and refresh data after creating a todo
      refetchTodos();
      setTodoTitle('');
      setTodoDescription('');
      setSelectedUserId('');
    }
  });

  const [toggleTodoStatus] = useMutation(TOGGLE_TODO_STATUS, {
    onCompleted: () => refetchTodos()
  });

  const [deleteTodo] = useMutation(DELETE_TODO, {
    onCompleted: () => refetchTodos()
  });

  // Handle form submission to create a new todo
  const handleCreateTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!todoTitle || !selectedUserId) return;

    createTodo({
      variables: {
        input: {
          title: todoTitle,
          description: todoDescription || undefined,
          userId: selectedUserId
        }
      }
    });
  };

  // Handle toggling a todo's completed status
  const handleToggleStatus = (id: string) => {
    toggleTodoStatus({ variables: { id } });
  };

  // Handle deleting a todo
  const handleDeleteTodo = (id: string) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      deleteTodo({ variables: { id } });
    }
  };

  // Show loading state
  if (loadingTodos || loadingUsers) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">GraphQL Todo App</h1>

      {/* Create Todo Form */}
      <div className="bg-gray-50 p-4 rounded shadow mb-6">
        <h2 className="text-xl mb-4">Create New Todo</h2>
        <form onSubmit={handleCreateTodo} className="space-y-3">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              id="title"
              value={todoTitle}
              onChange={(e) => setTodoTitle(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
            <textarea
              id="description"
              value={todoDescription}
              onChange={(e) => setTodoDescription(e.target.value)}
              className="w-full p-2 border rounded"
              rows={2}
            />
          </div>
          
          <div>
            <label htmlFor="userId" className="block text-sm font-medium mb-1">Assign to</label>
            <select
              id="userId"
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select a user</option>
              {userData?.users.map((user: any) => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
          </div>
          
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create Todo
          </button>
        </form>
      </div>

      {/* Todo List */}
      <div>
        <h2 className="text-xl mb-4">Todo List</h2>
        {todoData?.todos.length === 0 ? (
          <p>No todos found</p>
        ) : (
          <div className="space-y-3">
            {todoData?.todos.map((todo: any) => (
              <div key={todo.id} className="bg-white p-3 rounded shadow border-l-4 border-blue-500">
                <div className="flex justify-between">
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => handleToggleStatus(todo.id)}
                      className={`h-5 w-5 rounded border ${
                        todo.completed ? 'bg-green-500 border-green-500' : 'border-gray-400'
                      }`}
                    >
                      {todo.completed && (
                        <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                    <div>
                      <h3 className={`font-medium ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                        {todo.title}
                      </h3>
                      {todo.description && (
                        <p className="text-sm text-gray-600">{todo.description}</p>
                      )}
                      <p className="text-xs text-gray-500">
                        Assigned to: {todo.user?.name}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteTodo(todo.id)}
                    className="text-red-500"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GraphQLPage; 