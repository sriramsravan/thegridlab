import React, { useContext } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

const ProtectedRoute = ({ component: Component, ...props }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation();
  return isAuthenticated ? (
    <Component {...props} />
  ) : (
    <Navigate
      to={{
        pathname: '/login',
        state: { from: location },
      }}
    />
  );
};

export default ProtectedRoute;
