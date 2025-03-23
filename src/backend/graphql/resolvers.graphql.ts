export const resolvers = {
  Query: {
    // User queries
    users: (_: any, __: any, { dataSources }: any) => {
      return dataSources.dataSource.getUsers();
    },
    user: (_: any, { id }: { id: string }, { dataSources }: any) => {
      return dataSources.dataSource.getUserById(id);
    },

    // Todo queries
    todos: (_: any, __: any, { dataSources }: any) => {
      return dataSources.dataSource.getTodos();
    },
    todo: (_: any, { id }: { id: string }, { dataSources }: any) => {
      return dataSources.dataSource.getTodoById(id);
    },
    userTodos: (_: any, { userId }: { userId: string }, { dataSources }: any) => {
      return dataSources.dataSource.getTodosByUserId(userId);
    },

    // Project queries
    projects: (_: any, __: any, { dataSources }: any) => {
      return dataSources.dataSource.getProjects();
    },
    project: (_: any, { id }: { id: string }, { dataSources }: any) => {
      return dataSources.dataSource.getProjectById(id);
    },
  },

  Mutation: {
    // User mutations
    createUser: (_: any, { input }: any, { dataSources }: any) => {
      return dataSources.dataSource.createUser(input);
    },
    updateUser: (_: any, { id, input }: any, { dataSources }: any) => {
      return dataSources.dataSource.updateUser(id, input);
    },
    deleteUser: (_: any, { id }: { id: string }, { dataSources }: any) => {
      return dataSources.dataSource.deleteUser(id);
    },

    // Todo mutations
    createTodo: (_: any, { input }: any, { dataSources }: any) => {
      return dataSources.dataSource.createTodo(input);
    },
    updateTodo: (_: any, { id, input }: any, { dataSources }: any) => {
      return dataSources.dataSource.updateTodo(id, input);
    },
    deleteTodo: (_: any, { id }: { id: string }, { dataSources }: any) => {
      return dataSources.dataSource.deleteTodo(id);
    },
    toggleTodoStatus: (_: any, { id }: { id: string }, { dataSources }: any) => {
      return dataSources.dataSource.toggleTodoStatus(id);
    },

    // Project mutations
    createProject: (_: any, { input }: any, { dataSources }: any) => {
      return dataSources.dataSource.createProject(input);
    },
    updateProject: (_: any, { id, input }: any, { dataSources }: any) => {
      return dataSources.dataSource.updateProject(id, input);
    },
    deleteProject: (_: any, { id }: { id: string }, { dataSources }: any) => {
      return dataSources.dataSource.deleteProject(id);
    },
    addTodoToProject: (_: any, { projectId, todoId }: any, { dataSources }: any) => {
      return dataSources.dataSource.addTodoToProject(projectId, todoId);
    },
    removeTodoFromProject: (_: any, { projectId, todoId }: any, { dataSources }: any) => {
      return dataSources.dataSource.removeTodoFromProject(projectId, todoId);
    },
  },

  // Type resolvers
  Todo: {
    user: (parent: any, _: any, { dataSources }: any) => {
      return dataSources.dataSource.getUserById(parent.userId);
    },
  },

  Project: {
    todos: (parent: any, _: any, { dataSources }: any) => {
      return dataSources.dataSource.getProjectTodos(parent.id);
    },
  },
}; 