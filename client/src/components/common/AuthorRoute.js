import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "components/common/Spinner";


/*
  Private route middleware for restricted access for article 
  creation to those who are logged in and has the role of "author"
*/

const AuthorRoute = ({ component: Component, 
  auth: { isAuthenticated, loading, user }, 
   ...rest }) => (
    <Route
    {...rest}
      render = { props => {

          if (!isAuthenticated && loading) {
            return <Spinner />;
          } 
          
          else if (isAuthenticated && user.role === 'author') {
            return <Component {...props} />;
          }

          else {
            return <Redirect to="/" />;
          }

      }
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


// render = { props =>
//   {
//     {
//       if (loading) {
//         return <Spinner />;
//       }

//       if (isAuthenticated && user.role === 'author') {
//         return <Component {...props} />;
//       }

//       return <Redirect to="/" />;
//   }
//   }
// }