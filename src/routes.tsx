import React, { Suspense, Fragment, lazy } from 'react';
import type { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen';
import AuthGuard from './components/AuthGuard';
import GuestGuard from './components/GuestGuard';

type Routes = {
  exact?: boolean;
  path?: string | string[];
  guard?: FC;
  layout?: FC;
  component?: FC;
  routes?: Routes;
}[];

export const renderRoutes = (routes: Routes = []): JSX.Element => (
  <Suspense fallback={<LoadingScreen />}>
    <Switch>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Component = route.component as React.ElementType;

        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            render={(props) => (
              <Guard>
                <Layout>
                  {route.routes ? (
                    renderRoutes(route.routes)
                  ) : (
                    <Component {...props} />
                  )}
                </Layout>
              </Guard>
            )}
          />
        );
      })}
    </Switch>
  </Suspense>
);

const routes: Routes = [
  {
    exact: true,
    path: '/404',
    component: lazy(() => import('./views/errors/NotFoundView'))
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/login',
    component: lazy(() => import('./views/login'))
  },
  {
    exact: true,
    path: '/contacts',
    guard: AuthGuard,
    component: lazy(() => import('./views/users'))
  },
  {
    path: '/',
    guard: AuthGuard,
    component: lazy(() => import('./views/errors/NotFoundView'))
  }
];

export default routes;
