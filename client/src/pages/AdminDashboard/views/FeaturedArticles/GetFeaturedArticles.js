import React, { useState, useEffect } from "react";
import { getTimefromNow } from "utils/formatDate";
import { AuthorHeader } from "components/ui/headers/authorHeader";
import { CardFooter } from "components/ui/cards/components/CardFooter";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import Modal from "components/ui/Modal";
import { useModal } from "context/modalContext";
import { OtherArticles } from "./OtherArticles";
import { Button } from "components/ui/buttons";
import { CardPicOverlay } from "components/ui/cards/CardPicOverlay";

export const getFeaturedArticles = (articles) => {
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

const [choosenArticle, setchoosenArticle] = useState("");
const [choosenArticleNumber, setChoosenArticleNumber] = useState("")

// const compOrigin = `${modalTarget ? 'modal__content'-modalTarget : "" }`;
const compOrigin = `article-card`;



    /**
   * Check what is the target state, then determine
   * what component should be rendered in the modal.
   */
    const checkTarget = () => {
      return <OtherArticles
      choosenArticle={choosenArticle}
      choosenArticleNumber={choosenArticleNumber}
      />;
     
    }

  const featuredSneakers = articles
    .filter((article) => article.featured >= 1)
    .slice(0, 5)
    .sort((a, b) => a.featured - b.featured)
    .map((article, i) => {

    let label;

    switch (i) {
      case 0:
        label = "First Article";
        break;
      case 1:
        label = "Second Article";
        break;
      case 2:
        label = "Third Article";
        break;
      case 3:
        label = "Fourth Article";
        break;
      case 4:
        label = "Fifth Article ";
        break;
      default:
        break;
    }

    return (
      <>
        <div className="featured-entry" id={`${article._id} `}>

          <div className="featured-entry__label">
            <h4 className="heading-4">{label}</h4>
          </div>

          <CardPicOverlay className="sneaker-card article-card" 
          imgBg={article.fullheaderimage} 
          contentId={article._id}
          >
            <div className="info">
              { <AuthorHeader author={article.user} />}

              <h2 className="heading-2 headline">
                <Link to={`/article/${article._id}`}>{article.headline}</Link>
              </h2>
              
            </div>

            <Button
              onClick={() => {
                openModal(compOrigin), setModalTarget(article._id);
                setchoosenArticle(article._id);
                setChoosenArticleNumber(i + 1);
              }}
              primary
              rounded
              className="btn-select"
            >
              Select
            </Button>
          </CardPicOverlay>
          
        </div>
      </>
    );
  });

  return (
    <>
       {featuredSneakers}
       
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
