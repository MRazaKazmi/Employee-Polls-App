// PrivateRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ authedUser, children }) => {
  const location = useLocation();

  if (!authedUser) {
    // Redirect to sign-in page and save the current location
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
};

const mapStateToProps = ({ authedUser }) => ({
  authedUser,
});

export default connect(mapStateToProps)(PrivateRoute);
