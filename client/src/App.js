import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser, loadUser } from "./actions/authActions";
import { clearCurrentProfile, getCurrentProfile } from "./actions/profileActions";

import { Provider } from "react-redux";
import store from "./store";
import ScrollToTop from "./utils/ScrollToTop";
import { ScrollBtn } from "components/ui/scroll/ScrollBtn";

import PrivateRoute from "./components/common/PrivateRoute";
import AuthorRoute from "./components/common/AuthorRoute";

import Navbar from "./components/ui/Layout/NavBar";
import Footer from "./components/ui/Footer";
import { Home } from "pages/Home";
import { Dashboard_Home } from "pages/Dashboard";
import { Allposts, Create_Post, Post_Single, Edit_Post } from "pages/Posts";
import { AllSneakers, Add_Sneaker, Edit_Sneaker, Sneaker_Detail } from "pages/Sneakers";
import { AllProfiles, Create_Profile, Edit_Profile, Profile_Detail } from "pages/Profiles";
import { All_Articles, Article_Detail, Create_Article, Edit_Article, ArticlesHome } from "pages/Articles";
import { AdminDashboardHome, PostsOverview, SneakersOverview, ArticlesOverview, FeaturedPosts, FeaturedSneakers, FeaturedArticles, EditUsers } from "pages/AdminDashboard";
import { NotFound } from "pages/NotFound";
import Alert from "./components/ui/Alerts";

import { LatestNews, LatestSneakers, Ui_Stuff } from "pages/Test";

import { SaveOptionsProvider } from "context/saveOptions";
import { ModalProvider } from "context/modalContext";
import { WindowContextProvider } from "context/windowContext";

import "./Styles/sass/App.scss";

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
    store.dispatch(getCurrentProfile());

    // log user out from all tabs if they log out in one tab
    window.addEventListener("storage", () => {
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

                  <Routes>
                    <Route path="/" element={<Home />} />

                    <Route path="/profiles" element={<AllProfiles />} />
                    <Route path="/profile/:handle" element={<Profile_Detail />} />
                    <Route path="/create-profile" element={<PrivateRoute component={Create_Profile} />} />
                    <Route path="/edit-profile" element={<PrivateRoute component={Edit_Profile} />} />

                    <Route path="/allposts" element={<Allposts />} />
                    <Route path="/post/:id" element={<Post_Single />} />
                    <Route path="/editpost/:id" element={<Edit_Post />} />

                    <Route path="/allsneakers" element={<AllSneakers />} />
                    <Route path="/sneaker/:id" element={<Sneaker_Detail />} />
                    <Route path="/editsneaker/:id" element={<Edit_Sneaker />} />

                    <Route path="/articles" element={<ArticlesHome />} />
                    <Route path="/allarticles/" element={<All_Articles />} />
                    <Route path="/article/:id" element={<Article_Detail />} />
                    <Route path="/admin" element={<AdminDashboardHome />} />
                    <Route path="/admin/postsoverview" element={<PostsOverview />} />
                    <Route path="/admin/sneakersoverview" element={<SneakersOverview />} />
                    <Route path="/admin/articlesoverview" element={<ArticlesOverview />} />
                    <Route path="/admin/featuredposts" element={<FeaturedPosts />} />
                    <Route path="/admin/featuredsneakers" element={<FeaturedSneakers />} />
                    <Route path="/admin/featuredarticles" element={<FeaturedArticles />} />
                    <Route path="/admin/editusers" element={<EditUsers />} />

                    <Route path="/dashboard" element={<PrivateRoute component={Dashboard_Home} />} />
                    <Route path="/articleedit/:id" element={<Edit_Article />} />
                    <Route path="/createarticle" element={<AuthorRoute component={Create_Article} />} />
                    <Route path="/createpost" element={<PrivateRoute component={Create_Post} />} />
                    <Route path="/addsneaker" element={<PrivateRoute component={Add_Sneaker} />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>

                  <Footer />
                </React.Fragment>
                <ScrollBtn />
              </ScrollToTop>
            </Router>
          </Provider>
        </SaveOptionsProvider>
      </ModalProvider>
    </WindowContextProvider>
  );
};

export default App;
