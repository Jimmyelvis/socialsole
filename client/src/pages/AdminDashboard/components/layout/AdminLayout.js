import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import SidebarMobile from "./SidebarMobile";
import Navbar from "./Navbar";
import { useAdminContext } from "context/AdminContextProvider";
import ScrollToTop from "components/ui/scroll/ScrollToTop";
import { connect } from "react-redux";
import { UserOptionsPanel } from './UserOptionsPanel';



const Admin_Layout = ({ 
  children,
  profile: { profile, loading },
  auth: { user },
}) => {
  const {

    activeMenu,
    setActiveMenu,
    currentColor,
    themeSettings,
    screenSize,
    setScreenSize,
    isClicked,
  } = useAdminContext();

  /** Determine if we want the admin panel to move to 
      move to the right when activeMenu is set to true
   */
  const [movePanelLeft, setMovePanelLeft] = useState(true);

  /**
   * We use this function dynamically  obtain the screensize
   * at set its value to the `screensize` state variable
   */
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /**
   * When the screensize <= 900 disable the adminpanel moving right
   * when activeMenu is set to true
   */
  useEffect(() => {
    if (screenSize <= 1200) {
      setMovePanelLeft(false);
    } else {
      setMovePanelLeft(true);
    }
  }, [screenSize]);

  /**
   * Determines at what screen size that the sidebar automatically
   * appears.
   */
  useEffect(() => {
    if (screenSize <= 1000) {


      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <React.Fragment>
      <div className="admin_container">

        {/*
          We need to check the screensize to see if it is 1000 or less
          if so then we need to render the sidebar component outside of the
          content-container div. This is so we can apply the css 
          properties that we want correctly.
        */
}
        {
          screenSize <= 1000 && (
            <SidebarMobile /> 
          )
        }

          <div className="content-container">
              {
                screenSize > 1000 && (
                  <Sidebar />
                )
              }

                <Navbar
                  user={user}
                />

                {
                  isClicked.UserOptionsPanel && <UserOptionsPanel />
                }
            
              <div className="admin-bg">
               
                {children}
                {/* <ScrollToTop /> */}
                
              </div>

          </div>
        
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export const AdminLayout = connect(mapStateToProps, {})(Admin_Layout);
