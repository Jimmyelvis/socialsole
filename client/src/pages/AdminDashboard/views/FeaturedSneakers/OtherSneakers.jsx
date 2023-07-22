import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getSneakers, editFeatured } from "actions/sneakerActions";
import { AuthorHeader } from "components/ui/headers/authorHeader";
import { CardFooter } from "components/ui/cards/components/CardFooter";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import { Button } from "components/ui/buttons";
import { ReactComponent as CheckCircle } from 'assets/img/check-circle-v2.svg';
import { useModal } from "context/modalContext";
import { CardPicOverlay } from "components/ui/cards/CardPicOverlay";




export const Other_Sneakers = ({ 
  profile: { profile, profiles, loading }, 
  sneaker: { sneakers }, 
  auth: { user }, 
  getPosts, editFeatured,
  choosenSneaker,
  choosenSneakerNumber
}) => {

 const {  closeModal } = useModal();


  const [newPost, setnewPost] = useState("")
  const [changes, setChanges] = useState({
    prevPostId: "",
    nextPostId: "",
    nextPostPosNumber: "",
  });

  const { prevPostId, nextPostId, nextPostPosNumber } = changes;

  const [activeItem, setActiveItem] = useState("");

  useEffect(() => {
    getSneakers();
  }, []);

  /* map through sneakers and return sneakers that are not featured */
  const getOtherSneakers = () => {
    const otherPosts = sneakers.filter((sneaker) => sneaker.featured < 1);

    return otherPosts.map((sneaker) => {
      return (
        <>
          {/* <div className="card-post" key={sneaker._id}>
            <div className="top">
              <div className="card-header">
                <AuthorHeader author={sneaker.user} date={sneaker.date} />
              </div>

              <div className="headline">
                <h3 className="heading-3">
                  <Link to={`/sneaker/${sneaker._id}`}>{sneaker.model}</Link>
                </h3>
              </div>

              <div className="post-image">
                <img src={sneaker.mainimage} alt="sneaker" />
              </div>
              
              {
                activeItem === sneaker._id ? 
                (
                  <div className="overlay">

                    <CheckCircle className="check-circle" />

                    <h3 className="heading-3">
                      Click submit to save your changes
                    </h3>
                    
                  </div>
                ) : ( "" )
              }
            </div>

            <div className="bottom">

              <div className="button-group">

                  <Button
                    onClick={() => {
                      setChanges({
                        prevPostId: choosenSneaker,
                        nextPostId: sneaker._id,
                        nextPostPosNumber: choosenSneakerNumber,
                      });
                      setActiveItem(sneaker._id);
                    }}
                    primary
                    rounded
                    className="btn btn-change"
                  >
                    Change
                  </Button>


                  {
                    activeItem === sneaker._id ? 
                    (
                      <Button
                        onClick={() => {
                          editFeatured(prevPostId, nextPostId, nextPostPosNumber, "Sneaker")
                          closeModal()
                        }}
                        rounded
                        primaryDarker
                        className="btn btn-submit"
                      >
                        Submit
                      </Button>
                    ) 
                      : 
                    ( "" )
                  }
                
              </div>


              <CardFooter likesNumber={sneaker.likes.length} commentsNumber={sneaker.comments.length} />
            </div>
          </div> */}

          <CardPicOverlay
            imgBg={sneaker.mainimage}
            contentId={sneaker._id}
            className="sneaker-card"
          >
            <div className="info">
              { <AuthorHeader author={sneaker.user} />}

              <h2 className="heading-2 model">
                <Link to={`/sneaker/${sneaker._id}`}>{sneaker.model}</Link>
              </h2>
              <h3 className="heading-3 colorway">{sneaker.colorway}</h3>
              <h4 className="heading-4 year">{sneaker.year}</h4>
            </div>


            {
                activeItem === sneaker._id ? 
                (
                  <div className="overlay">

                    <CheckCircle className="check-circle" />

                    <h3 className="heading-3">
                      Click submit to save your changes
                    </h3>
                    
                  </div>
                ) : ( "" )
              }

            <div className="button-group">

              <Button
                onClick={() => {
                  setChanges({
                    prevPostId: choosenSneaker,
                    nextPostId: sneaker._id,
                    nextPostPosNumber: choosenSneakerNumber,
                  });
                  setActiveItem(sneaker._id);
                }}
                primary
                rounded
                className="btn btn-change"
              >
                Change
              </Button>


              {
                activeItem === sneaker._id ? 
                (
                  <Button
                    onClick={() => {
                      editFeatured(prevPostId, nextPostId, nextPostPosNumber, "Sneaker")
                      closeModal()
                    }}
                    rounded
                    primaryDarker
                    className="btn btn-submit"
                  >
                    Submit
                  </Button>
                ) 
                  : 
                ( "" )
              }

            </div>

          </CardPicOverlay>
        
        </>


      );
    });
  };

  return (
    <div className="other-sneakers">

     { getOtherSneakers() }
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
  sneaker: state.sneaker,
});

export const OtherSneakers = connect(mapStateToProps, {
  getSneakers, editFeatured
})(Other_Sneakers);
