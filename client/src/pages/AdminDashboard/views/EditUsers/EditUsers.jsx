import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { AdminContextProvider } from "context/AdminContextProvider";
import { Panel } from "components/ui/Panel";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { useModal } from "context/modalContext";
import { getAllUsers } from "actions/authActions";
import { Avatar } from "components/ui/avatar";
import EditUserBtn from 'assets/img/Edit_btn.svg';
import Modal from "components/ui/Modal";
import { UserMoreInfo } from "./components/UserMoreInfo";


const Edit_Users = ({
  profile: { profile, profiles, loading },
  auth: { users },
  getAllUsers
}) => {

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
  const [currentUser, setcurrentUser] = useState(null)

  const compOrigin = `user-card`;


   /**
   * Check what is the target state, then determine
   * what component should be rendered in the modal.
   */
   const checkTarget = () => {
   return (
    <UserMoreInfo
      user={currentUser}
    />
   )
   
  }

  useEffect(() => {
    getAllUsers();
  }, []);


  const getUsers = () => { 

    return users.map((user) => {

      return (
        <Panel className="user-card" key={user._id}>

          <img 
            src={EditUserBtn} 
            alt="edit user" 
            className="edit-user-btn" 
            onClick={() => {
              // setModalTarget(user._id);
              openModal(compOrigin);
              setcurrentUser(user)
            }}
          />

          <Avatar
            className="avatar"
            avatar={user.avatar}
          />
            
            
          <h2 className="heading-2 users-name">{user.name}</h2>

          <h4 className="heading-4 user-role">{user.role}</h4>
      </Panel>
      );
    });
   }


  return (
    <AdminContextProvider>
      <AdminLayout>
        <div className="users-list">
          {
            getUsers()
          }
        </div>

        <Modal selector={"#modal"} 
        overlayColor={`rgba(0, 0, 0, 0.7)`}
        modalTarget={modalTarget} 
        modalOrigin={compOrigin}
      >
        {checkTarget()}
      </Modal>
      </AdminLayout>

    </AdminContextProvider>
  )
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export const EditUsers = connect(mapStateToProps, {
 getAllUsers
})(Edit_Users);
