import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  console.log('Inside protected route');

  const userid = localStorage.getItem('admin');
  const access = localStorage.getItem('access')
  console.log('userid:', userid);

  if (userid === 'true' && access) {
    return children;
  } else {
    console.log('Navigating to /'); // Debugging
    return <Navigate to='/' />;
  }
};

export default ProtectedRoute;
