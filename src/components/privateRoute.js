import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ authedUser }) => {
  const location = useLocation();

  return authedUser ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" replace state={{ from: location }} />
  );
};

const mapStateToProps = (state) => ({
  authedUser: state.authedUser,
});

export default connect(mapStateToProps)(PrivateRoute);
