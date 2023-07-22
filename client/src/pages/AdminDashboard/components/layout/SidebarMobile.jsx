import React, { useState, useEffect } from "react";
import { useAdminContext } from "context/AdminContextProvider";
import  { Button } from "components/ui/buttons/Button";
import { Link } from "react-router-dom";
import { FaEllipsisH } from "react-icons/fa";
import dashboardIcon from 'assets/img/dashboard-icon.svg';
import notepad  from 'assets/img/notepad.png';
import sneaker from 'assets/img/sneaker-v2.svg';
import users from 'assets/img/users.png';
import sneakerLogo from 'assets/img/Sneaker-logo.png';
import { AiFillCloseCircle } from "react-icons/ai";

const SidebarMobile = () => {
  const {sideBarVisible, setSideBarVisible } = useAdminContext();

  const [time, setTime] = useState(false);
  const [menuSet, setmenuSet] = useState(null);
  const [linkActive, setlinkActive] = useState(null);

  const [closingSideBar, setClosingSideBar] = useState(false)

  const sidebarLinks = [
    {
      href: "/admin",
      img: dashboardIcon,
      text: "Dashboard",
    },
    {
      href: "/admin/postsoverview",
      img: notepad,
      text: "Posts Overview",
    },
    {
      href: "/admin/adjustfeaturedposts",
      img: notepad,
      text: "Adjust Featured Posts",
    },
    {
      href: "/admin/sneakersoverview",
      img: sneaker,
      text: "Sneakers Overview",
      className: "sneaker",
    },
    {
      href: "/admin/adjustfeaturedsneakers",
      img: sneaker,
      text: "Adjust Featured Sneakers",
      className: "sneaker",
    },
    {
      href: "/admin/articlesoverview",
      img: notepad,
      text: "Articles Overview",
    },
    {
      href: "/admin/adjustfeaturedarticles",
      img: notepad,
      text: "Adjust Featured Articles",
    },
    {
      href: "/admin/editusers",
      img: users,
      text: "Edit Users",
    },

  ];


  /**
   * Todo: For screen that have smaller heights we will need to come up with solution for this. We could do what we did with MassNow website. In addition, we can find a way to determine the active height (probably window.innerHeight) just like we do with the screensize function and if the height is above a number when we render the links we can combine then into one array and then render them together. We may need a combo of an useEffect and useState, and keep track of the height in the state.
   */

  useEffect(() => {
    setClosingSideBar(false);
  }, [])
  


    /**
   *  Gives a slight delay to when the menu items
   * will appear after activeMenu is set to true
   */
    useEffect(() => {
      let timeOut = setTimeout(() => {
        if (sideBarVisible) {
          setTime(true);
        } else {
          setTime(false);
        }
      }, 800);
  
      return () => {
        clearTimeout(timeOut);
      };
    }, [sideBarVisible]);

 
  const renderSideBar = () => {
    
    return (`admin-sidebar ${sideBarVisible ? "admin-sidebar-visible" : ""}` )
  }

  


  const renderActiveLinks = () => {


    return sidebarLinks.map((link) => {
       if (link.href) {
        return (
          <li 
            className="link"
            key={link.text}
          >
            <Link to={`${link.href}`}>
                <img 
                  src={link.img} alt=""
                  className={link.className ? link.className : ""}
                />
                <h4 className="link-text">{link.text}</h4>
            
            </Link>
          </li>
        );
      } else {
        return (
          <li className="link menu_change" key={link.text}>
            <div className="elipsiss">{link.img}</div>
            <h4>{link.text}</h4>
          </li>
        );
      }
    });
  };

  return (
    <>
      <div className={renderSideBar()}>
        {sideBarVisible &&
          time && (
            <>
              <AiFillCloseCircle
                className="close-icon"
                onClick={() => {
                  setSideBarVisible(false);
                  setClosingSideBar(true);
                  console.log("closing side bar");
                }}
              />

              <img src={sneakerLogo} alt="" className="sneaker-logo" />
              {renderActiveLinks()}
            </>
          )}
      </div>
    </>
  );

};

export default SidebarMobile;
