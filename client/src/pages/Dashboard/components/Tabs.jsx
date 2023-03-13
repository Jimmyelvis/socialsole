import React, { useState, useEffect } from "react";
import { Panel } from "components/ui/Panel";
import { Link } from "react-router-dom";
import { ReactComponent as ExtraMenu } from "assets/img/extra-menu-items.svg";

export const Dashboardtabs = () => {

  const [menuSet, setmenuSet] = useState("firstSet");

  const changeView = () => {
    console.log("clicked");
  };

   /**
   * When the extra menu icon (ellipsis) is clicked
   * change the menuSet state to the parameter that 
   * is passed in
   */
   const changeMenuSet = (linkSet) => {
    setmenuSet(linkSet);
  };

  const firstSet = [
    {
      name: "Timeline",
      onClick: () => changeView(),
    },
    {
      name: "Edit Profile",
      link: "/edit-profile",
    },
    {
      name: "Create Post",
      link: "/createpost",
    },
    {
      name: "Create Sneaker",
      link: "/addsneaker",
    },
    {
      onClick: () => changeView(),
      icon: <ExtraMenu 
              className="extra-menu-icon" 
              onClick={() => changeMenuSet("secondSet")}
            />,
    },
  ];

  const secondSet = [
    {
      onClick: () => changeView(),
      icon: <ExtraMenu 
              className="extra-menu-icon"
              onClick={() => changeMenuSet("firstSet")}
            />,
    },
    {
      name: "Your Comments",
      onClick: () => changeView(),
    },
    {
      name: "Liked Content",
      onClick: () => changeView(),
    },
    {
      name: "Saved Content",
      onClick: () => changeView(),
    },
  ]

  const renderTabLinks = () => {
    
    if (menuSet === "firstSet") {
      return firstSet.map((item, index) => {
        if (item.link) {
          return (
            <li className="link" key={index}>
              <Link to={item.link} key={index}>
                {item.name}
              </Link>
            </li>
          );
        } else {
          return (
            <li className="link" key={index} onClick={item.onClick}>
              {item.name}
              {item.icon}
            </li>
          );
        }
      });
      
    } else if (menuSet === "secondSet") {
      return secondSet.map((item, index) => {
        if (item.link) {
          return (
            <li className="link" key={index}>
              <Link to={item.link} key={index}>
                {item.name}
              </Link>
            </li>
          );
        } else {
          return (
            <li className="link" key={index} onClick={item.onClick}>
              {item.name}
              {item.icon}
            </li>
          );
        }
      });
    }
  }


  return (
    <Panel className="dashboard-tabs">
      {renderTabLinks()}
    </Panel>
  );
};
