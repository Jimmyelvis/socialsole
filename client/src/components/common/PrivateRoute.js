import React from "react";
import { Route, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "components/common/Spinner";

/*
  Private route middleware for restricted access to 
  those who are logged in"
*/

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading }
}) => {
  if (loading) return <Spinner />;
  if (isAuthenticated) return <Component />;

  return <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
