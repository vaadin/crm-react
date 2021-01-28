import React, { Suspense, Fragment, lazy } from 'react';
import type { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
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

const routes: Routes = [
  {
    exact: true,
    guard: GuestGuard,
    path: '/login',
    component: lazy(() => import('./views/login'))
  },
  {
    exact: true,
    guard: AuthGuard,
    layout: AdminLayout,
    path: '/contacts',
    component: lazy(() => import('./views/contacts'))
  },
  {
    exact: true,
    guard: AuthGuard,
    layout: AdminLayout,
    path: '/companies',
    component: lazy(() => import('./views/companies'))
  },
  {
    exact: true,
    guard: AuthGuard,
    layout: AdminLayout,
    path: '/deals',
    component: lazy(() => import('./views/deals'))
  },
  {
    exact: true,
    guard: AuthGuard,
    layout: AdminLayout,
    path: '/dashboard',
    component: lazy(() => import('./views/dashboard'))
  },
  {
    exact: true,
    path: '/',
    guard: AuthGuard,
    component: lazy(() => import('./views/errors/NotFoundView'))
  },
  {
    path: '*',
    component: lazy(() => import('./views/errors/NotFoundView'))
  }
];

export const renderRoutes = (routes_: Routes = []): JSX.Element => (
  <Suspense fallback={<LoadingScreen />}>
    <Switch>
      {routes_.map((route, i) => {
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

export default routes;
