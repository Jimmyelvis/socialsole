import React, { useState, useEffect} from 'react'
import Icon from "components/icons/Icon";
import { ReactComponent as Bookmark } from 'assets/img/bookmark.svg';
import { useSaveOptions } from "context/saveOptions";
import { Panel } from "components/ui/Panel";
import { SaveOptions } from "components/ui/cards/components/SaveOptions";
import Modal from "components/ui/Modal";
import { useModal } from "context/modalContext";




export const PostInfo = ({  
  element, showActions, addLike, 
  removeLike, auth, profile,
  type 
}) => {

  const { isModalOpen, openModal, openOverlay, isOverlayOpen, closeModal } = useModal();
  const { openMenu } = useSaveOptions();

  const findUserLike = (likes) => {
    if (likes.filter((like) => like.user === auth.user?._id || like.user === auth.user?.id).length > 0) {
      return true;
    } else {
      return false;
    }
  };

    /**
 * Piece of state that will be used to determine, what component
 * that wil be rendered in the modal
 */
    const [modalTarget, setModalTarget] = useState(null);


    /*
      This will be used to determine what component called the modal
      this will be passed as a prop to the modal component, and the 
      modal context 
    */
    const [compOrigin, setCompOrigin] = useState(null);
  
    /**
     * Check what is the target state, then determine
     * what component should be rendered in the modal.
     */
  
    const checkTarget = () => {
  
      if (modalTarget === "bookmark modal") {
        return (
          bookmarkPanel()
        );
      } 
    
    };

  const bookmarkPanel = () => {
    return (
      <Panel className="article-bookmark-panel">
        <SaveOptions
          itemId={element._id}
          type={type}
          useSavesList={profile?.lists}
        />
      </Panel>
    );
  };



  /* For loggedin users with a profile */
  const authUsers = () => {
    return (
      <React.Fragment>
        <div className="likes" onClick={() => addLike(element._id)}>

          {
            findUserLike(element.likes) ? 
            <Icon icon="thumbsup" className="thumbs thumb-liked" /> : 
            <Icon icon="thumbsup" className="thumbs thumb-not-liked" />
          }


          <h3 className="heading-3">{element.likes.length}</h3>
        </div>

        <div className="unlikes" onClick={() => removeLike(element._id)}>
          <Icon color="#5D789F" icon="thumbsdown" className="thumbs" />
        </div>

        <div className="commentsnumber">
          <div className="commenticon">
            <Icon  icon="bubbles2" className="bubbles" />
          </div>

          <h3 className="heading-3">{element.comments.length}</h3>
        </div>

        {
            auth?.isAuthenticated && 
            <Bookmark 
              className="icon icon-bookmark"
              onClick={() => {
                const origin = "Bookmark";
                setModalTarget("bookmark modal");
                setCompOrigin(origin);
                openModal(origin);
                openMenu();
              }}
            /> 
          }
        
      </React.Fragment>
    );
  };

  /* For non loggedin users, or users without a profile */
  const nonAuthUsers = () => {
    return (
      <React.Fragment>
        <div className="likes">
          <Icon  icon="thumbsup" className="thumbs" />

          <h3 className="heading-3">{element.likes.length}</h3>
        </div>

        <div className="commentsnumber">
          <div className="commenticon">
            <Icon  icon="bubbles2" className="bubbles" />
          </div>

          <h3 className="heading-3">{element.comments.length}</h3>
        </div>
      </React.Fragment>
    );
  };

  return (
    <div className="actions">
      {/*
        If the showactions prop that is passed in equals true
        this will be rendered in view
      */}

      {showActions ? authUsers() : nonAuthUsers()}

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
  );
}
