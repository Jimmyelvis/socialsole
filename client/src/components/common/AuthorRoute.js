import React from "react";
import { Route, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "components/common/Spinner";

/*
  Private route middleware for restricted access for article 
  creation to those who are logged in and have the role of "author"
*/



const AuthorRoute = ({
  component: Component,
  auth: { isAuthenticated, loading, user }
}) => {
  if (loading) return <Spinner />;
  if (isAuthenticated && user.role === "author" ||
    isAuthenticated && user.role === "admin"
  ) return <Component />;

  return <Navigate to="/login" />;
};

AuthorRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(AuthorRoute);
