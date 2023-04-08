import React, { useState, useEffect } from "react";
import { Panel } from "components/ui/Panel";
import { Link } from "react-router-dom";
import { ReactComponent as ExtraMenu } from "assets/img/extra-menu-items.svg";
import { useWindowContext } from "context/windowContext";

export const Dashboardtabs = ({ setCurrentView }) => {

  const { screenSize, setScreenSize } = useWindowContext();

  /* State Variables */
  const [menuSet, setmenuSet] = useState("firstSet");
  const [marker, setMarker] = useState(3)

  const [firstSet, setFirstSet] = useState([])
  const [secondSet, setSecondSet] = useState([])
  const [thirdSet, setThirdSet] = useState([])
  const [activeLink, setActiveLink] = useState("Timeline")

  const originalSet = [
    {
      name: "Timeline",
      onClick: () => {
        setCurrentView("timeline");
        setActiveLink("Timeline")
      },
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
      name: "Your Comments",
      onClick: () => {
        setCurrentView("your-comments");
        setActiveLink("Your Comments")
      },
    },
    {
      name: "You Liked",
      onClick: () => {
        setCurrentView("you-liked");
        setActiveLink("You Liked")
      },
    },
    {
      name: "Saved Content",
      onClick: () => {
        setCurrentView("saved-content");
        setActiveLink("Saved Content")
      },
    },
    // {
    //   name: "View Notifications",
    //   onClick: () => {
    //     setCurrentView("view-notifications");
    //     setActiveLink("View Notifications")
    //   },
    // },

  ];


  const firstIcon = {
    icon: <ExtraMenu
      className="extra-menu-icon"
      onClick={() => changeMenuSet("secondSet")}
    />,
  }

  const secondIcon = {
    icon: <ExtraMenu
      className="extra-menu-icon"
      onClick={() => changeMenuSet("firstSet")}
    />,
  }

  const thirdIcon = {   
    icon: <ExtraMenu
      className="extra-menu-icon"
      onClick={() => changeMenuSet("thirdSet")}
    />,
  }


  /* Functions */


  /**
 * When the extra menu icon (ellipsis) is clicked
 * change the menuSet state to the parameter that 
 * is passed in
 */
  const changeMenuSet = (linkSet) => {
  setmenuSet(linkSet);
};

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

  useEffect(() => {
    setMenuLinks();
  }, [marker]);

  // useEffect(() => {

 
  //   if (screenSize >  800) {
  //     setMarker(3);
  //   }

  // }, [screenSize]);

  useEffect(() => {
    renderTabLinks();
  }, [firstSet, secondSet])
  

  const setMenuLinks = () => { 

   setFirstSet([]);
    setSecondSet([]);
    setThirdSet([]);
    
    let firstIconAdded = false;
    let secondIconAdded = false;
    let thirdIconAdded = false;

    originalSet.forEach((item, index) => {


      if (index < marker) {
        setFirstSet(firstSet => [...firstSet, item]);
        
      } 
      
      else if (index <  marker + marker -1) {

        if(!firstIconAdded) {
          setFirstSet(firstSet => [...firstSet, firstIcon]);
          firstIconAdded = true;
        }

        if(!secondIconAdded){
          setSecondSet(secondSet => [...secondSet, secondIcon]);
          secondIconAdded = true;
        }
          setSecondSet(secondSet => [...secondSet, item]);
      }
      
      else {

        if(!firstIconAdded) {
          setFirstSet(firstSet => [...firstSet, firstIcon]);
          firstIconAdded = true;
        }

        if(!secondIconAdded){
          setSecondSet(secondSet => [...secondSet, secondIcon]);
          secondIconAdded = true;
        }

        if(!thirdIconAdded){
          setSecondSet(secondSet => [...secondSet, thirdIcon]);
          thirdIconAdded = true;
          setThirdSet(thirdSet => [...thirdSet, firstIcon]);
        }

       

        setThirdSet(thirdSet => [...thirdSet, item]);
      }

    })

   }


  const getActiveLink = (link) => { 
    return activeLink === link ? "active" : "";
   }


  const renderTabLinks = () => {

    if (menuSet === "firstSet") {

      return firstSet.map((item, index) => {
          if (item.link) {
  
  
            return (
              <li className={`link ${getActiveLink(item.name)}`} key={index}>
                <Link to={item.link} key={index}>
                  {item.name}
                </Link>
              </li>
            );
          } else {
  
            return (
              <li className={`link ${getActiveLink(item.name)}`} key={index} onClick={item.onClick}>
                {item.name}
                {item.icon}
              </li>
            );
          }
        });

      }
      else if (menuSet === "secondSet") {
        return secondSet.map((item, index) => {
          if (item.link) {
  
  
            return (
              <li className={`link ${getActiveLink(item.name)}`} key={index}>
                <Link to={item.link} key={index}>
                  {item.name}
                </Link>
              </li>
            );
          } else {
  
            return (
              <li className={`link ${getActiveLink(item.name)}`} key={index} onClick={item.onClick}>
                {item.name}
                {item.icon}
              </li>
            );
          }
        } );
      }

      else if (menuSet === "thirdSet") {
        return thirdSet.map((item, index) => {
          if (item.link) {
  
  
            return (
              <li className={`link ${getActiveLink(item.name)}`} key={index}>
                <Link to={item.link} key={index}>
                  {item.name}
                </Link>
              </li>
            );
          } else {
  
            return (
              <li className={`link ${getActiveLink(item.name)}`} key={index} onClick={item.onClick}>
                {item.name}
                {item.icon}
              </li>
            );
          }
        } );
      }
      

  }

  return (
    <Panel className="dashboard-tabs">
     { renderTabLinks()}
    </Panel>
  );
};
