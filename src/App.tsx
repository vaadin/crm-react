import React from 'react';
import type { FC } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { AuthProvider } from './contexts/AuthContext';
import routes, { renderRoutes } from './routes';
import './App.scss';

const history = createBrowserHistory();

const App: FC = () => (
  <Router history={history}>
    <AuthProvider>{renderRoutes(routes)}</AuthProvider>
  </Router>
);

export default App;
