import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Related from "./related/RelatedPosts";
import { Link } from "react-router-dom";
import Icon from "components/icons/Icon";
import { deletePost, addLike, removeLike } from "actions/postActions";
import { PostInfo } from "components/features/postInfo";
import { Tags } from "components/features/tags";
import { Panel } from "components/ui/Panel";
import { Avatar } from "components/ui/avatar";
import { getTimefromNow } from "utils/formatDate";
import parse from "html-react-parser";
import { CommentButton } from "components/ui/buttons/CommentButton";
import { useModal } from "context/modalContext";
import Modal from "components/ui/Modal";
import CommentPanel from "components/ui/Comments/CommentPanel";
import { deleteComment  } from "actions/postActions";
import { addComment } from "actions/postActions";



export const PostItem = ({ post, showActions, auth, deletePost, 
  addLike, removeLike, deleteComment, addComment,
  profile : { profile }
}) => {

  /* Variables */
  const { isAuthenticated, user } = auth;

  const { isModalOpen, openModal, openOverlay, isOverlayOpen, closeModal } = useModal();

  const editbtn = (
    <Link to={`/editpost/${post._id}`} className="editbtn">
      <Icon color="#AADDFF" icon="pencil1" />
    </Link>
  );

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
          comments={post.comments}
          elementId={post._id} 
          deleteComment={deleteComment}
          post={post}
          addComment={addComment}
        />
        );
      } 
    
    };
  
    const openCommentModal = () => { 
      setModalTarget("comments modal");
      openModal(compOrigin);
     }

  return (
    <React.Fragment>

      <Panel className="card-detail-view ">

          <div className="top">

            <div className="authorHeader">
              <Avatar avatar={post.user.avatar} alt="" />

              <div className="name-date">
                <h4 className="heading-4 name">{post.user.name}</h4>
                <h5 className="heading-5 date">
                  {
                    getTimefromNow(post.date)
                  }
                </h5>
              </div>
            </div>


            {
              post.headerimage === "" ? "  " : 
              <img src={post.headerimage} alt="..." className="main-img" />
            }

          </div>

          <div className="bottom">

            <div className="postedit">{isAuthenticated && user._id === post.user._id ? editbtn : ""}</div>

            <h2 className="heading-2">{post.headline}</h2>

            <PostInfo 
              element={post}
              showActions={showActions}
              auth={auth}
              addLike={addLike}
              removeLike={removeLike}
              profile={profile}
              type="post"
            />
          
            <div className="text">
              {parse(post.text)}
            </div>

          </div>

          <Tags element={post} />

      </Panel>

        {/* 
          Sub component for displaying links to posts that are related to the
          currently loaded posts. The related posts are determined by the tags prop
          which is used to query the database for posts that has any of the matching
          tags.
        */}
        
        <Related tags={post.tags} postId={post} />

        <CommentButton
          elementId={post._id}
          likes={post && post.likes && post.likes.length}
          comments={post && post.comments && post.comments.length}
          openComments={() => openCommentModal()}
          likeElement={addLike}
          unlikeElement={removeLike}
          likesArray={post.likes}
          user={user}
          isAuthenticated={auth.isAuthenticated}

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
      
    </React.Fragment>
  );
};

PostItem.defaultProps = {
  showActions: true,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export const View = connect(mapStateToProps, { deletePost, addLike, removeLike,
  deleteComment, addComment })(PostItem);
