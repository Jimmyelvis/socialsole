import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';

import { Provider } from 'react-redux';
import store from './store';
import ScrollToTop from './ScrollToTop'

import PrivateRoute from './components/common/PrivateRoute';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profiles/create-profile/CreateProfile';
import EditProfile from './components/profiles/edit-profile/EditProfile';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profiles/profile/Profile';
import Posts from './components/posts/AllPosts';
import Post from './components/posts/post/Post';
import YourPosts from './components/posts/YourPosts';
import YourSneakers from './components/sneakers/YourSneakers';
import Sneakers from './components/sneakers/AllSneakers';
import Sneaker from './components/sneakers/sneaker/Sneaker';
import NewsItemConcord from './components/frontpage/news/concord';
import NewsItemNasa from './components/frontpage/news/nasa';
import NewsItemTinker from './components/frontpage/news/tinker';
import NewReleaseCNY from './components/frontpage/releases/cnwy';
import NewReleaseAJNine from './components/frontpage/releases/ajnine';
import NewReleaseAJLava from './components/frontpage/releases/lava';
import NotFound from './components/not-found/NotFound';

import './App.css';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
        <ScrollToTop>
          <React.Fragment>
            <Route exact path="/" component={Landing} />
            {/* <Navbar /> */}
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:handle" component={Profile} />
              <Route exact path="/post/:id" component={Post} />
              <Route exact path="/sneaker/:id" component={Sneaker} />
              <Route exact path="/allsneakers" component={Sneakers} />
              <Route exact path="/allposts" component={Posts} />
              <Route exact path="/news/concord" component={NewsItemConcord} />
              <Route exact path="/news/nasa" component={NewsItemNasa} />
              <Route exact path="/news/tinker" component={NewsItemTinker} />
              <Route exact path="/release/cny" component={NewReleaseCNY} />
              <Route exact path="/release/ajnine" component={NewReleaseAJNine} />
              <Route exact path="/release/lava" component={NewReleaseAJLava} />


              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/yourposts"
                  component={YourPosts}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/yoursneakers"
                  component={YourSneakers}
                />
              </Switch>
              <Route exact path="/not-found" component={NotFound} />
            <Footer />
            </React.Fragment>
            </ScrollToTop>
        </Router>
      </Provider>
    );
  }
}

export default App;
