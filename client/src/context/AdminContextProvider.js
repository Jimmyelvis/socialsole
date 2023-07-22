import React, { createContext, useContext, useState } from "react";

const AdminContext = createContext();

const initialState = {
  UserOptionsPanel: false,
  notification: false,
};

const AdminContextProvider = ({ children }) => {
    const [screenSize, setScreenSize] = useState(undefined);
    const [currentColor, setCurrentColor] = useState("#003ad8");
    const [currentMode, setCurrentMode] = useState("Light");
    const [themeSettings, setThemeSettings] = useState(false);
    const [activeMenu, setActiveMenu] = useState(true);
    const [isClicked, setIsClicked] = useState(initialState);
    const [sideBarVisible, setSideBarVisible] = useState(false)

      const setMode = (e) => {
        setCurrentMode(e.target.value);
        localStorage.setItem("themeMode", e.target.value);
      };

      const setColor = (color) => {
        setCurrentColor(color);
        localStorage.setItem("colorMode", color);
      };

      // const handleClick = (clicked) =>
      //   setIsClicked({ ...initialState, [clicked]: true });

      /**
       * Check the isClicked state using the value of
       * "clicked" to determine if it is false
       */
      const handleClick = (clicked) =>{

        if (isClicked[clicked] === false) {
          setIsClicked({ ...initialState, [clicked]: true });
        } else {
          setIsClicked({ ...initialState, [clicked]: false });
        }

      }

    return (
      <AdminContext.Provider
        value={{
          currentColor,
          currentMode,
          activeMenu,
          screenSize,
          setScreenSize,
          handleClick,
          isClicked,
          initialState,
          setIsClicked,
          setActiveMenu,
          setCurrentColor,
          setCurrentMode,
          setMode,
          setColor,
          themeSettings,
          setThemeSettings,
          setSideBarVisible,
          sideBarVisible
        }}
      >
        {children}
      </AdminContext.Provider>
    );
  
};

export const useAdminContext = () => {
  return useContext(AdminContext);
}

export { AdminContext, AdminContextProvider };

