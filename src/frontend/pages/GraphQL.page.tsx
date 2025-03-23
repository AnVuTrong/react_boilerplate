import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useLanguage } from '../contexts/LanguageContext.context';

// GraphQL queries
const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      title
      description
      completed
      userId
      user {
        id
        name
      }
    }
  }
`;

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
      role
    }
  }
`;

// GraphQL mutations
const CREATE_TODO = gql`
  mutation CreateTodo($input: TodoInput!) {
    createTodo(input: $input) {
      id
      title
      description
      completed
      userId
    }
  }
`;

const TOGGLE_TODO_STATUS = gql`
  mutation ToggleTodoStatus($id: ID!) {
    toggleTodoStatus(id: $id) {
      id
      completed
    }
  }
`;

const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id)
  }
`;

const GraphQLPage: React.FC = () => {
  const { language } = useLanguage();
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newTodoDescription, setNewTodoDescription] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');

  // Queries
  const { loading: loadingTodos, error: todoError, data: todoData, refetch: refetchTodos } = useQuery(GET_TODOS);
  const { loading: loadingUsers, error: userError, data: userData } = useQuery(GET_USERS);

  // Mutations
  const [createTodo] = useMutation(CREATE_TODO, {
    onCompleted: () => {
      refetchTodos();
      setNewTodoTitle('');
      setNewTodoDescription('');
    }
  });

  const [toggleTodoStatus] = useMutation(TOGGLE_TODO_STATUS, {
    onCompleted: () => refetchTodos()
  });

  const [deleteTodo] = useMutation(DELETE_TODO, {
    onCompleted: () => refetchTodos()
  });

  const handleCreateTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoTitle || !selectedUserId) return;

    createTodo({
      variables: {
        input: {
          title: newTodoTitle,
          description: newTodoDescription || undefined,
          userId: selectedUserId,
          completed: false
        }
      }
    });
  };

  const handleToggleStatus = (id: string) => {
    toggleTodoStatus({ variables: { id } });
  };

  const handleDeleteTodo = (id: string) => {
    if (window.confirm(language === 'en' ? 'Are you sure you want to delete this todo?' : 'Bạn có chắc chắn muốn xóa việc này không?')) {
      deleteTodo({ variables: { id } });
    }
  };

  if (loadingTodos || loadingUsers) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );

  if (todoError || userError) return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      {todoError?.message || userError?.message}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-8">
        {language === 'en' ? 'GraphQL Example' : 'Ví dụ GraphQL'}
      </h1>

      {/* Create Todo Form */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {language === 'en' ? 'Create New Todo' : 'Tạo Todo mới'}
        </h2>
        <form onSubmit={handleCreateTodo} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              {language === 'en' ? 'Title' : 'Tiêu đề'}
            </label>
            <input
              type="text"
              id="title"
              value={newTodoTitle}
              onChange={(e) => setNewTodoTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              {language === 'en' ? 'Description' : 'Mô tả'}
            </label>
            <textarea
              id="description"
              value={newTodoDescription}
              onChange={(e) => setNewTodoDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              rows={3}
            />
          </div>
          <div>
            <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-1">
              {language === 'en' ? 'Assign to' : 'Giao cho'}
            </label>
            <select
              id="userId"
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              required
            >
              <option value="">{language === 'en' ? 'Select a user' : 'Chọn người dùng'}</option>
              {userData?.users.map((user: any) => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              {language === 'en' ? 'Create Todo' : 'Tạo Todo'}
            </button>
          </div>
        </form>
      </div>

      {/* Todo List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          {language === 'en' ? 'Todo List' : 'Danh sách Todo'}
        </h2>
        <div className="space-y-4">
          {todoData?.todos.length === 0 ? (
            <p className="text-gray-500">
              {language === 'en' ? 'No todos found' : 'Không tìm thấy todo nào'}
            </p>
          ) : (
            todoData?.todos.map((todo: any) => (
              <div key={todo.id} className="bg-white p-4 rounded-lg shadow border-l-4 border-primary">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <button
                      onClick={() => handleToggleStatus(todo.id)}
                      className={`flex-shrink-0 h-5 w-5 rounded border ${
                        todo.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'
                      }`}
                    >
                      {todo.completed && (
                        <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                    <div>
                      <h3 className={`text-lg font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                        {todo.title}
                      </h3>
                      {todo.description && (
                        <p className={`mt-1 text-sm ${todo.completed ? 'text-gray-400' : 'text-gray-500'}`}>
                          {todo.description}
                        </p>
                      )}
                      <p className="mt-1 text-sm text-gray-500">
                        {language === 'en' ? 'Assigned to:' : 'Được giao cho:'} {todo.user?.name}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteTodo(todo.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default GraphQLPage; 