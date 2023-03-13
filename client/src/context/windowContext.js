import React, { createContext, useContext, useState } from "react";

const WindowContext = createContext();


const WindowContextProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState(undefined);

  return(
    <WindowContext.Provider value={{ screenSize, setScreenSize }}>
      {children}
    </WindowContext.Provider>
  )
}

export const useWindowContext = () => useContext(WindowContext);

export { WindowContext, WindowContextProvider };