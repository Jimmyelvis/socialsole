import React, { useState, useEffect } from "react";
import { getTimefromNow } from "utils/formatDate";
import { AuthorHeader } from "components/ui/headers/authorHeader";
import { CardFooter } from "components/ui/cards/components/CardFooter";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import Modal from "components/ui/Modal";
import { useModal } from "context/modalContext";
import { OtherPosts } from "./OtherPosts";
import { Button } from "components/ui/buttons";


export const getFeaturedPosts = (posts) => {
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

const [choosenPost, setchoosenPost] = useState("");
const [choosenPosNumber, setChoosenPosNumber] = useState("")

const compOrigin = `post-card`;


    /**
   * Check what is the target state, then determine
   * what component should be rendered in the modal.
   */
    const checkTarget = () => {
      return <OtherPosts
        choosenPost={choosenPost}
        choosenPosNumber={choosenPosNumber}
      />;
     
    }

  const featuredPosts = posts
    .filter((post) => post.featured >= 1)
    .slice(0, 4)
    .sort((a, b) => a.featured - b.featured)
    .map((post, i) => {

    let label;

    switch (i) {
      case 0:
        label = "First Post";
        break;
      case 1:
        label = "Second Post";
        break;
      case 2:
        label = "Third Post";
        break;
      case 3:
        label = "Fourth Post";
        break;
      case 4:
        label = "Fifth Post";
        break;
      default:
        break;
    }

    return (
      <>
        <div className="featured-entry" id={`${post._id} `}>
          <div className="featured-entry__label">
            <h4 className="heading-4">{label}</h4>
          </div>

          <div className="card-post"  key={post._id}>
            <div className="top">
              <div className="card-header">
                <AuthorHeader author={post.user} date={post.date} />
              </div>

              <div className="headline">
                <h3 className="heading-3">
                  <Link to={`/post/${post._id}`}>{post.headline}</Link>
                </h3>
              </div>

              <div className="post-image">
                <img src={post.headerimage} alt="post" />
              </div>
            </div>

            <div className="bottom">
              {/* <div className="excerpt">{post.text && parse(post.text)}</div> */}

              <Button
                onClick={() => {
                  openModal(compOrigin), setModalTarget(post._id);
                  setchoosenPost(post._id);
                  setChoosenPosNumber(i + 1);
                }}
                primary
                rounded
                className="btn-select"
              >
                Select
              </Button>

              <CardFooter likesNumber={post.likes.length} commentsNumber={post.comments.length} />
            </div>
          </div>
        </div>

      
      </>
    );
  });

  return (
    <>
       {featuredPosts}
       
       <Modal selector={"#modal"} 
        overlayColor={`rgba(255, 255, 255, 0.9)`}
        modalTarget={modalTarget} 
        modalOrigin={compOrigin}
      >
        {checkTarget()}
      </Modal>
    </>
  )
  
};
