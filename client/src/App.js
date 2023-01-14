import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';

import { Provider } from 'react-redux';
import store from './store';
import ScrollToTop from './utils/ScrollToTop'

import PrivateRoute from './components/common/PrivateRoute';
import AuthorRoute from './components/common/AuthorRoute';


import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
// import Home from './pages/Home';
import Community from './components/layout/Community';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';

import HomeContainer from "pages/Home";
import { Dashboard_Home } from 'pages/Dashboard';
import { Allposts, Create_Post, Post_Single, Edit_Post } from "pages/Posts";
import { AllSneakers, Add_Sneaker, Edit_Sneaker, Sneaker_Detail } from "pages/Sneakers";
import { AllProfiles, Create_Profile, Edit_Profile, Profile_Detail } from "pages/Profiles";
// import CreateProfile from './components/profiles/create-profile/CreateProfile';
// import EditProfile from './components/profiles/edit-profile/EditProfile';
// import Profiles from './components/profiles/AllProfiles';
// import Profile from './components/profiles/profile/Profile';
import Article from './components/articles/article/Article';
// import ArticleEdit from './components/articles/article/ArticleEdit';
import CreateArticle from './components/articles/article/CreateArticle';
// import Posts from './components/posts/all-users-posts/AllPosts';
// import Post from './components/posts/post-single/Post';
// import CreatePost from './components/posts/post-creation/CreatePost';
import EditPost from './components/posts/post-creation/EditPost';
import CreateSneaker from './components/sneakers/sneaker-creation/CreateSneaker';
// import EditSneaker from './components/sneakers/sneaker-creation/EditSneaker';
// import Sneakers from './components/sneakers/all-users-sneakers/AllSneakers';
// import Sneaker from './components/sneakers/sneaker-single/Sneaker';
// import NewsItemConcord from './components/frontpage/news/concord';
// import NewsItemNasa from './components/frontpage/news/nasa';
// import NewsItemTinker from './components/frontpage/news/tinker';
// import NewReleaseAJIndigo from './components/homepage/releases/indigo';
// import NewReleaseAJFireDenim from './components/homepage/releases/firedenim';
// import NewReleaseQuestion from './components/homepage/releases/questionmid';
// import AllArticles from './components/articles/Allarticles';
import NotFound from './components/not-found/NotFound';
import Alert from './components/layout/Alerts'


import './Styles/sass/App.scss';



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
    // Redirect to home
    window.location.href = '/';
  }
}

const App = () => {

  return (
    <Provider store={store}>
      <Router>
        <ScrollToTop>
          <React.Fragment>
            <Alert />
            <Navbar />
            {/* 
            <Route exact path="/community" component={Community} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/allsneakers" component={Sneakers} />
            <Route exact path="/allposts" component={Allposts} />
            <Route exact path="/news/concord" component={NewsItemConcord} />
            <Route exact path="/news/nasa" component={NewsItemNasa} />
            <Route exact path="/news/tinker" component={NewsItemTinker} />
            <Route exact path="/release/indigo" component={NewReleaseAJIndigo} />
            <Route exact path="/release/firedenim" component={NewReleaseAJFireDenim} />
            <Route exact path="/release/questionmid" component={NewReleaseQuestion} />
            <Route exact path="/articleedit/:id" component={ArticleEdit} />
            <Route exact path="/editpost/:id" component={EditPost} />
            <Route exact path="/allarticles/" component={AllArticles} /> 
          */}

            <Route exact path="/" component={HomeContainer} />
            <Route exact path="/profiles" component={AllProfiles} />
            <Route exact path="/profile/:handle" component={Profile_Detail} />

            <Switch>
              <PrivateRoute exact path="/create-profile" component={Create_Profile} />
            </Switch>

            <Switch>
              <PrivateRoute exact path="/edit-profile" component={Edit_Profile} />
            </Switch>

            <Route exact path="/allposts" component={Allposts} />
            <Route exact path="/post/:id" component={Post_Single} />
            <Route exact path="/editpost/:id" component={Edit_Post} />

            <Route exact path="/allsneakers" component={AllSneakers} />
            <Route exact path="/sneaker/:id" component={Sneaker_Detail} />
            <Route exact path="/editsneaker/:id" component={Edit_Sneaker} />

            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard_Home} />
            </Switch>

            <Route exact path="/article/:id" component={Article} />

            {/* 
          
            */}
            <Switch>
              <PrivateRoute exact path="/createpost" component={Create_Post} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/addsneaker" component={Add_Sneaker} />
            </Switch>
            {/* <Switch>
              <AuthorRoute exact path="/createarticle" component={CreateArticle} />
            </Switch> */}
            <Route exact path="/not-found" component={NotFound} />
            <Footer />
          </React.Fragment>
        </ScrollToTop>
      </Router>
    </Provider>
  );

 
}

export default App;
