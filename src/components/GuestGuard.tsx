import React from 'react';
import type { FC, ReactNode } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import useAuth from '../hooks/useAuth';

interface GuestGuardProps {
  children?: ReactNode;
}

const GuestGuard: FC<GuestGuardProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const lastVisitUrl = localStorage.getItem('last_visit_url') || '/contacts';

  if (!isAuthenticated) {
    return <>{children}</>;
  }

  return <Redirect to={lastVisitUrl} />;
};

GuestGuard.propTypes = {
  children: PropTypes.node
};

export default GuestGuard;
