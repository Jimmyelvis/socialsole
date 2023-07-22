import React, { useState, useEffect } from "react";
import { useAdminContext } from "context/AdminContextProvider";
import { Avatar } from "components/ui/avatar";
import { AiFillCaretDown } from "react-icons/ai";
import { ImMenu } from "react-icons/im";


const Navbar = ({
  user
}) => {
  const {
    activeMenu,
    setActiveMenu,
    handleClick,
    isClicked,
    setScreenSize,
    screenSize,
    setSideBarVisible
  } = useAdminContext();

  const userInfo = () => {

    return (
      <div className="userDisplay-info">
        <Avatar
         avatar={user?.avatar}
        />

        <div className="name-email">
          <h3>{user?.name}</h3>
          <p>{user?.email}</p>
        </div>

        <AiFillCaretDown 
          className="arrow-down"
          onClick={() => handleClick("UserOptionsPanel")}
        />
      </div>
    )
  }


  return (
    <div className="admin_navbar">

      <ImMenu className="menu-icon" onClick={() => {
        setSideBarVisible(true);
      }}/>

       {
          userInfo()
       }
    </div>
  );
};

export default Navbar;
