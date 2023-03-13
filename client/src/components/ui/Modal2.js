import React, { useEffect, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { useModal } from "context/modalContext";
import { createPortal } from "react-dom";

const Modal = ({ children, selector, overlayColor, modalTarget}) => {
  const { isModalOpen, closeModal } = useModal();

  /** A piece of state to determine when we add the .hide css class
   * to the modal. So when we close it, it will fade out gradually
   * instead of instantly
   */
  const [hide, setHide] = useState(false);

  Modal.defaultProps = {
    transition: "",
  };

  useEffect(() => {

    if (isModalOpen == true) {
       document.body.classList.add("overflow");
    }

    return () => {
       document.body.classList.remove("overflow");
    }
    
  });

  /**
   * Closes the modal by first, setHide to true, which will
   * apply the .hide class for a gradual fade out. Then set the
   * global context state of closeModal which will unmount any
   * children inside of the root_modal portal. Then setHide back
   * to false
   */
  const closeDown = () => {
    setHide(true);

    setTimeout(() => {
      closeModal();
      setHide(false);
    }, 1000);
  };

  const getClassnames = () => {
    if (isModalOpen === true) {
      if (isModalOpen && hide === true) {
        return `modal-overlay  show-modal hide-modal`;
      }

      return `modal-overlay  show-modal`;
    } else {
      return `modal-overlay`;
    }
  };



  const modalContent = (
    <>
      <div className={`${getClassnames()}`}  
        style={
          { 
            backgroundColor: `${overlayColor}`,
            transform: `${modalTarget === "search_overlay" ? 
            "none" : "scale(1.0)"}`,
          }
       }>
        {children}

        <button 
          className="close-modal-btn " 
          onClick={closeDown}
          style={{ color: `${modalTarget === "search_overlay" ? "#a3a3a3" : "#fa9c50"}` }}
        >
          <IoIosCloseCircle />
        </button>
      </div>
    </>
  );

  return isModalOpen ? createPortal(modalContent, document.querySelector(selector)) : null;
};

export default Modal;
