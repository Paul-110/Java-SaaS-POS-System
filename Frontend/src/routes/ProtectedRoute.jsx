import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';

const ProtectedRoute = ({ children, roles }) => {
  const { userProfile } = useSelector((state) => state.user);
  const location = useLocation();

  if (!userProfile) {
    // User not logged in, redirect to login
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  const userHasRequiredRole = userProfile && roles.includes(userProfile.role);

  if (!userHasRequiredRole) {
    // User does not have the required role, redirect to a 'not found' or 'unauthorized' page
    // Or redirect to the main landing page as a fallback.
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;