import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Panel } from "components/ui/Panel";
import { useAdminContext } from "context/AdminContextProvider";
import { ReactComponent as UserIcon } from 'assets/img/single-user-icon.svg';
import { ReactComponent as Lock } from 'assets/img/lock.svg';
import { ReactComponent as LogOut } from 'assets/img/logout.svg';
import useFadeIn from "hooks/useFadin";
import Modal from "components/ui/Modal";
import { useModal } from "context/modalContext";



export const UserOptionsPanel = () => {
  const {  handleClick } = useAdminContext();
  const [style, isVisible , setIsVisible] = useFadeIn(600);

   /*
    This will be used to determine what component called the modal
    this will be passed as a prop to the modal component, and the 
    modal context 
  */
 const { isModalOpen, openModal, openOverlay, isOverlayOpen, closeModal } = useModal();

   /**
     * Piece of state that will be used to determine, what component
     * that wil be rendered in the modal
   */
   const [modalTarget, setModalTarget] = useState(null);

   const compOrigin = `lock-screen`;

      /**
   * Check what is the target state, then determine
   * what component should be rendered in the modal.
   */
  const checkTarget = () => {
    return (
      <Panel className="lock-screen">
        Lock Screen
      </Panel>
    )
    
  }

  useEffect(() => {
    setIsVisible(true);

  }, []);


  return (
    <>

    <Panel className="user-options-panel" style={style}>

      <li className="entry">

        <UserIcon className="user" />

        <h3 className="heading-3">
          My Account
        </h3>

      </li>

      {/* <li className="entry"
          onClick={() => {
            openModal();
            setModalTarget(compOrigin);
          }} 
      >

        <Lock className=" lock" />

        <h3 className="heading-3">
          Lock Screen
        </h3>

      </li> */}

      <li className="entry">


        <LogOut className="logout" />

        <h3 className="heading-3">
          Log Out
        </h3>

      </li>

    </Panel>

    <Modal selector={"#modal"} 
        overlayColor={`rgba(255, 255, 255, 0.7)`}
        modalTarget={modalTarget} 
        modalOrigin={compOrigin}
      >
        {checkTarget()}
    </Modal>
    
    </>
  );
};


