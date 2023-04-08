import React, { useState, useContext, useReducer, useEffect } from "react";

const SaveOptionsContext = React.createContext();

const SaveOptionsProvider = ({ children }) => {
  // /* Determine whether the save menu list is open or closed */
  const [menuOpen, setMenuOpen] = useState(false);

  /* We use the innerMenu state to determine which menu to display. If the innerMenu state is null, we display the default menu. If the innerMenu state is "create-list", we display the create list menu. */
  const [innerMenu, setInnerMenu] = useState(null);

  const [postOptionsMenuClasses, setpostOptionsMenuClasses] = useState("default-list-menu default-list-menu-closed");

  const [activeItem, setActiveItem] = useState(null);


  
  const openMenu = (e) => {
    setMenuOpen(!menuOpen);


    setActiveItem(e);
    setpostOptionsMenuClasses("default-list-menu default-list-menu-open");
    setInnerMenu("default-menu");
  };

  return (
    <SaveOptionsContext.Provider
      value={{
        menuOpen,
        setMenuOpen,
        openMenu,
        innerMenu,
        setInnerMenu,
        postOptionsMenuClasses,
        setpostOptionsMenuClasses,
        activeItem,
      }}
    >
      {children}
    </SaveOptionsContext.Provider>
  );
};

export const useSaveOptions = () => {
  return useContext(SaveOptionsContext);
};

export { SaveOptionsProvider, SaveOptionsContext };
