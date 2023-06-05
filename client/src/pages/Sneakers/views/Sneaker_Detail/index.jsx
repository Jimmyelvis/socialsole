import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import Spinner from "components/common/Spinner";
import { getCurrentProfile } from "actions/profileActions";
import { View } from "./components/view";
import CommentForm from "components/features/comments/CommentForm";
import { getParams } from "utils/getParams";
import CommentItem from "components/features/comments/CommentItem";
import { deleteComment, addComment, addLike, removeLike, getSneaker } from "actions/sneakerActions";
import { CommentButton } from 'components/ui/buttons/CommentButton';
import Modal from "components/ui/Modal";
import { useModal } from "context/modalContext";
import CommentPanel from "components/ui/Comments/CommentPanel";


export const Sneaker = ({ 
  getSneaker, getCurrentProfile, 
  deleteComment, addComment, 
  addLike, removeLike,
  sneaker: { sneaker, loading }, match, 
  auth, profile: { profile } 
}) => {

  /*Variables */
  const { user } = auth;
  let sneakerContent;

  getParams(match.params.id, getSneaker, getCurrentProfile);

  const { isModalOpen, openModal, openOverlay, isOverlayOpen, closeModal } = useModal();

    /*
    This will be used to determine what component called the modal
    this will be passed as a prop to the modal component, and the 
    modal context 
  */
    const compOrigin = "CommentButton";

  /**
 * Piece of state that will be used to determine, what component
 * that wil be rendered in the modal
 */
  const [modalTarget, setModalTarget] = useState(null);

  /**
   * Check what is the target state, then determine
   * what component should be rendered in the modal.
   */

  const checkTarget = () => {

    if (modalTarget === "comments modal") {
      return (
      <CommentPanel 
        comments={sneaker.comments}
        elementId={sneaker._id} 
        deleteComment={deleteComment}
        addComment={addComment}
      />
      );
    } 
  
  };

  const openCommentModal = () => { 
    setModalTarget("comments modal");
    openModal(compOrigin);
   }


  /* renderCommentList() is a function that maps through the comments array and returns a CommentItem component for each comment. */

  const renderCommentList = () => {
    const { comments } = sneaker;

    if (comments.length > 0) {
      return comments.map((comment) => {
        return <CommentItem key={comment._id} comment={comment} elementId={sneaker._id} deleteComment={deleteComment} />;
      });
    }
  };

  /** Loading State */
  if (sneaker === null || loading || Object.keys(sneaker).length === 0) {
    sneakerContent = <Spinner />;
  } 
  
  /** If the user is not logged in, then they can only view the post, but not comment on it. */
  else if (user === null || Object.keys(user).length === 0) {
    sneakerContent = (
      <React.Fragment>
        <View sneaker={sneaker} showActions={false} />
{/* 
          {sneaker.comments.length > 0 ? <div className="commentsarea contentbody">
          {renderCommentList()}</div> : ""} */}
       
      </React.Fragment>
    );
  } 
  
  else {

    /** If the user is logged in, but does not have a profile, so they can only view the post but not comment */
    if (profile === null || Object.keys(profile).length === 0) {
      sneakerContent = (
        <React.Fragment>
          <View sneaker={sneaker} showActions={true} />

        {/* {sneaker.comments.length > 0 ? <div className="commentsarea contentbody">
          {renderCommentList()}</div> : ""} */}
      </React.Fragment>
      );
    } 
    
    else {
      sneakerContent = (
        <React.Fragment>
          <View sneaker={sneaker} showActions={true} />

          <div className="container">

            {/* <div className="commentsarea postView contentbody">
              <CommentForm elementId={sneaker._id} addComment={addComment} />
              {renderCommentList()}

            </div> */}

          </div>
        </React.Fragment>
      );
    }
  }

  return(
    <div className="sneakerdetail">
      {sneakerContent}

      <CommentButton
        likes={sneaker && sneaker.likes && sneaker.likes.length}
        comments={sneaker && sneaker.comments && sneaker.comments.length}
        openComments={() => openCommentModal()}
        likeElement={addLike}
        unlikeElement={removeLike}
        likesArray={sneaker.likes}
        user={user}
        isAuthenticated={auth.isAuthenticated}
        elementId={sneaker._id}
      />

      <Modal
        selector={"#modal"}
        overlayColor={`
        ${modalTarget === "search_overlay" ? "rgba(255, 255, 255, 0.95)" : "rgba(0,0,0,0.7)"}`}
        modalTarget={modalTarget}
        modalOrigin={compOrigin}
        delay={2000}
        noCloseBtn={true}
      >
        {checkTarget()}
      </Modal>

    </div>
  )
}

const mapStateToProps = (state) => ({
  sneaker: state.sneaker,
  auth: state.auth,
  profile: state.profile,
});

export const Sneaker_Detail = connect(mapStateToProps, { getSneaker, getCurrentProfile, deleteComment, addComment, addLike, removeLike })(Sneaker);