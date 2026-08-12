import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * RoleGuard wraps a route and ensures only users with the specified role can access it.
 * If the user's role doesn't match, they are redirected to their role-appropriate home.
 */
export default function RoleGuard({ allowedRole, children }) {
  const { user } = useAuth();
  const location = useLocation();

  // If not authenticated at all, send to login
  if (!user?.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const userRole = user?.role?.toLowerCase();

  // If role doesn't match, redirect to their own portal
  if (userRole !== allowedRole) {
    if (userRole === 'auditor') return <Navigate to="/auditor" replace />;
    if (userRole === 'admin') return <Navigate to="/admin" replace />;
    return <Navigate to="/" replace />;
  }

  return children;
}
