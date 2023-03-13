import React from 'react';
import NavBar from './NavBar';
// import { Footer } from './Footer';
import ScrollToTop from 'utils/ScrollToTop';

export const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <NavBar />

        {children}

        {/* <ScrollToTop /> */}
      {/* <Footer /> */}
    </React.Fragment>
  )
}
