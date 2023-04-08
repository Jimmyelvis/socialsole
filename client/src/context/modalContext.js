import React, { useState, useContext, useReducer, useEffect } from "react";

const ModalContext = React.createContext();

const ModalProvider = ({ children }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [origin, setOrigin] = useState(null)

   const openModal = (compOrigin) => {
     setIsModalOpen(true);
     setOrigin(compOrigin)
   };

   const closeModal = () => {
     setIsModalOpen(false);
   };


   return (
      <ModalContext.Provider
        value={{
          isModalOpen,
          setIsModalOpen,
          openModal,  
          closeModal,
          origin,     
        }}
      >
        {children}
      </ModalContext.Provider>
    );
};

export const useModal = () => {
  return useContext(ModalContext);
};

export { ModalProvider, ModalContext };
