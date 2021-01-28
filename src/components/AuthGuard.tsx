import React from 'react';
import type { FC, ReactNode } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import useAuth from '../hooks/useAuth';

const guardPath = ['/contacts', '/companies', '/deals', '/dashboard'];

interface AuthGuardProps {
  children?: ReactNode;
}

const AuthGuard: FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const { pathname } = useLocation();

  if (pathname === '/') {
    return <Redirect to="/login" />;
  }

  if (guardPath.includes(pathname)) {
    window.localStorage.setItem('last_visit_url', pathname);
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return <Redirect to="/login" />;
};

AuthGuard.propTypes = {
  children: PropTypes.node
};

export default AuthGuard;
