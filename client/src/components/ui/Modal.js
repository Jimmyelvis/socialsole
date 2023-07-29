import React, { useEffect, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { useModal } from "context/modalContext";
import { createPortal } from "react-dom";

const Modal = ({ children, selector, overlayColor, modalTarget, modalOrigin, delay, classes}) => {
  const { isModalOpen, closeModal, origin } = useModal();

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
    if (isModalOpen === true && origin === modalOrigin) {
      if (isModalOpen && hide === true) {
        return `modal-overlay  show-modal hide-modal`;
      }

      return `modal-overlay  show-modal ${classes ? classes : ""}`;
    } else {
      return null;
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

  /**
   * We will not only check to see if the modal is open, but also
   * if the value of the origin prop that is passed in from the modal
   * context, matches the value of the modalOrigin prop that is passed
   * in from the component that called the modal. This is to ensure
   * that the modal is only rendered when the component that called
   * the modal is the one that is currently open.
   */
  return isModalOpen && origin === modalOrigin ? createPortal(modalContent, document.querySelector(selector)) : null;
};

export default Modal;
