import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

/*
  Private route middleware for restricted access for article 
  creation to those who are logged in and has the role of "author"
*/

const AuthorRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render = { props =>
      auth.isAuthenticated === true && auth.user.role === 'author' ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

AuthorRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(AuthorRoute);