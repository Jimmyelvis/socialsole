import React, { useState, useEffect } from "react";
import { getTimefromNow } from "utils/formatDate";
import { AuthorHeader } from "components/ui/headers/authorHeader";
import { CardFooter } from "components/ui/cards/components/CardFooter";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import Modal from "components/ui/Modal";
import { useModal } from "context/modalContext";
import { OtherSneakers } from "./OtherSneakers";
import { Button } from "components/ui/buttons";
import { CardPicOverlay } from "components/ui/cards/CardPicOverlay";

export const getFeaturedSneakers = (sneakers) => {
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

const [choosenSneaker, setchoosenSneaker] = useState("");
const [choosenSneakerNumber, setChoosenSneakerNumber] = useState("")

// const compOrigin = `${modalTarget ? 'modal__content'-modalTarget : "" }`;
const compOrigin = `sneaker-card`;



    /**
   * Check what is the target state, then determine
   * what component should be rendered in the modal.
   */
    const checkTarget = () => {
      return <OtherSneakers
        choosenSneaker={choosenSneaker}
        choosenSneakerNumber={choosenSneakerNumber}
      />;
     
    }

  const featuredSneakers = sneakers
    .filter((sneaker) => sneaker.featured >= 1)
    .slice(0, 5)
    .sort((a, b) => a.featured - b.featured)
    .map((sneaker, i) => {

    let label;

    switch (i) {
      case 0:
        label = "First Sneaker";
        break;
      case 1:
        label = "Second Sneaker";
        break;
      case 2:
        label = "Third Sneaker";
        break;
      case 3:
        label = "Fourth Sneaker";
        break;
      case 4:
        label = "Fifth Sneaker ";
        break;
      default:
        break;
    }

    return (
      <>
        <div className="featured-entry" id={`${sneaker._id} `}>

          <div className="featured-entry__label">
            <h4 className="heading-4">{label}</h4>
          </div>

          <CardPicOverlay className="sneaker-card" 
          imgBg={sneaker.mainimage} 
          contentId={sneaker._id}
          >
            <div className="info">
              { <AuthorHeader author={sneaker.user} />}

              <h2 className="heading-2 model">
                <Link to={`/sneaker/${sneaker._id}`}>{sneaker.model}</Link>
              </h2>
              <h3 className="heading-3 colorway">{sneaker.colorway}</h3>
              <h4 className="heading-4 year">{sneaker.year}</h4>
            </div>

            <Button
              onClick={() => {
                openModal(compOrigin), setModalTarget(sneaker._id);
                setchoosenSneaker(sneaker._id);
                setChoosenSneakerNumber(i + 1);
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
