import React, { useState, useContext, useReducer, useEffect } from "react";

const ModalContext = React.createContext();

const ModalProvider = ({ children }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

   const openModal = () => {
     setIsModalOpen(true);
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
