import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser, loadUser } from './actions/authActions';
import { clearCurrentProfile, getCurrentProfile } from './actions/profileActions';

import { Provider } from 'react-redux';
import store from './store';
import ScrollToTop from './utils/ScrollToTop'

import PrivateRoute from './components/common/PrivateRoute';
import AuthorRoute from './components/common/AuthorRoute';


import Navbar from './components/ui/Layout/NavBar';
import Footer from './components/layout/Footer';
import { Home } from "pages/Home";
import { Dashboard_Home } from 'pages/Dashboard';
import { Allposts, Create_Post, Post_Single, Edit_Post } from "pages/Posts";
import { AllSneakers, Add_Sneaker, Edit_Sneaker, Sneaker_Detail } from "pages/Sneakers";
// import { AllProfiles, Create_Profile, Edit_Profile, Profile_Detail } from "pages/Profiles";
import { All_Articles, Article_Detail, Create_Article, Edit_Article } from "pages/Articles";
import NotFound from './components/not-found/NotFound';
import Alert from './components/layout/Alerts'

import { LatestNews, LatestSneakers, Ui_Stuff } from "pages/Test";

import { SaveOptionsProvider } from 'context/saveOptions';
import { ModalProvider } from 'context/modalContext';
import { WindowContextProvider } from 'context/windowContext';



import './Styles/sass/App.scss';




const App = () => {

  useEffect(() => {

    // check for token in LS when app first runs
    if (localStorage.jwtToken) {
      // if there is a jwtToken set axios headers for all requests
      setAuthToken(localStorage.jwtToken);
    }

    // try to fetch a user, if no jwtToken or invalid jwtToken we
    // will get a 401 response from our API
    store.dispatch(loadUser());
    store.dispatch(getCurrentProfile())

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.jwtToken) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (
    <WindowContextProvider>
      <ModalProvider>
        <SaveOptionsProvider>
          <Provider store={store}>
            <Router>
              <ScrollToTop>
                <React.Fragment>
                  <Alert />
                  <Navbar />

                  <Route exact path="/" component={Home} />

                  {/* <Route exact path="/profiles" component={AllProfiles} />
                  <Route exact path="/profile/:handle" component={Profile_Detail} />
                  <Switch>
                    <PrivateRoute exact path="/create-profile" component={Create_Profile} />
                  </Switch>
                  <Switch>
                    <PrivateRoute exact path="/edit-profile" component={Edit_Profile} />
                  </Switch> */}

                  <Route exact path="/allposts" component={Allposts} />
                  <Route exact path="/post/:id" component={Post_Single} />
                  <Route exact path="/editpost/:id" component={Edit_Post} />

                  <Route exact path="/allsneakers" component={AllSneakers} />
                  <Route exact path="/sneaker/:id" component={Sneaker_Detail} />
                  <Route exact path="/editsneaker/:id" component={Edit_Sneaker} />

                  <Route exact path="/allarticles/" component={All_Articles} />
                  <Route exact path="/article/:id" component={Article_Detail} />

                  <Switch>
                    <PrivateRoute exact path="/dashboard" component={Dashboard_Home} />
                  </Switch>
                  <Route exact path="/articleedit/:id" component={Edit_Article} />

                  <Switch>
                    <AuthorRoute exact path="/createarticle" component={Create_Article} />
                  </Switch>

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

                  {/**
                   * Test Routes
                   */}

                  <Route exact path="/test/uistuff" component={Ui_Stuff} />
                  <Route exact path="/test/latestnews" component={LatestNews} />
                  <Route exact path="/test/latestsneakers" component={LatestSneakers} />

                  {/* <Footer /> */}
                </React.Fragment>
              </ScrollToTop>
            </Router>
          </Provider>
        </SaveOptionsProvider>
      </ModalProvider>
    </WindowContextProvider>
  );

 
}

export default App;
