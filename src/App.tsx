import React from 'react';
import type { FC } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import routes, { renderRoutes } from './routes';
import './App.scss';

const history = createBrowserHistory();

const App: FC = () => (
  <Router history={history}>
    {renderRoutes(routes)}
  </Router>
);

export default App;
