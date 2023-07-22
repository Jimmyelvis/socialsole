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

const Sidebar = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } = useAdminContext();

  const [time, setTime] = useState(false);
  const [menuSet, setmenuSet] = useState(null);
  const [linkActive, setlinkActive] = useState(null);

 
  

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
      href: "/admin/featuredposts",
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
      href: "/admin/featuredsneakers",
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
      href: "/admin/featuredarticles",
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
   * Check what the value is in the menuSet state 
   * depending on what the value is set the activeLinks
   * var to either firstlinks or secondlinks
   * then map over them to render out the set of links
   * 
   */
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
      <div className="admin-sidebar">

            <Link to="/">
              <img src={sneakerLogo} alt="" className="sneaker-logo" />
            </Link>
            
            {renderActiveLinks()}
      </div>

    </>
  );

};

export default Sidebar;
