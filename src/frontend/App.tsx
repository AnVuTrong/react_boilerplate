import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from '../backend/apollo/client.apollo';
import MainLayout from './layouts/MainLayout.layout';
import HomePage from './pages/Home.page';
import AboutPage from './pages/About.page';
import GraphQLPage from './pages/GraphQL.page';
import NotFoundPage from './pages/NotFound.page';

const AppLayout = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="graphql" element={<GraphQLPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

function App() {
  return (
    <ApolloProvider client={client}>
      <AppLayout />
    </ApolloProvider>
  );
}

export default App;
