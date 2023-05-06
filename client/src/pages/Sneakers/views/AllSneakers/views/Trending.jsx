import React, { useEffect, useState } from "react";
import { CardPicOverlay } from "components/ui/cards/CardPicOverlay";
import Spinner from "components/common/Spinner";
import useFadeIn from "hooks/useFadin";
import { AuthorHeader } from "components/ui/headers/authorHeader";
import { Link } from "react-router-dom";
import { IoEllipsisHorizontalSharp } from "react-icons/io5"; 
import { useSaveOptions } from "context/saveOptions";
import { CardFooter } from "components/ui/cards/components/CardFooter";

export const Trending = ({
  sneaker: { sneakers, loading },
  profile
}) => {
  
  let mostLiked;
  let mostCommented;
  let latestSneakers;
  
  const [style, isVisible , setIsVisible] = useFadeIn(2000);
  const { openMenu } = useSaveOptions();

  useEffect(() => {
    setIsVisible(true);

  }, []);

  if (sneakers) {
    
    if (sneakers === null || loading) {
      /* 
        Checks to see if the sneaker state is null, if so then a loading spinner
        is displayed, this helps undefined error on first render
      */
  
      <Spinner />;
    } else {
      {
        mostLiked = (
          <React.Fragment>
              {
                 sneakers
                 .sort((a, b) => b.likes.length - a.likes.length)
                 .slice(0, 5)
                 .map((sneaker, index) => {
                   return (
                     <CardPicOverlay
                       key={sneaker._id}
                       imgBg={sneaker.mainimage}
                       contentId={sneaker._id}
                       profile={profile}
                       sneaker={sneaker}
                       index={index}
                     >
                     <AuthorHeader
                       author={sneaker.user}
                     />
       
       
                     {profile && (Object.keys(profile).length !== 0) && (
                       <IoEllipsisHorizontalSharp className="icon icon-ellipsis open-menu" id={sneaker._id} 
                       onClick={(e) =>  {
                         openMenu(e.currentTarget.parentElement.parentElement.id)
                         }
                       } 
                       />
                     )}
       
                     <Link to={`/sneakers/${sneaker._id}`}>
                       <h3 className="heading-3 model">{sneaker.model}</h3>
                       <h4 className="heading-4 colorway">{sneaker.colorway}</h4>
                       <h5 className="heading-4 year">{sneaker.year}</h5>
                     </Link>

                     <CardFooter
                      likesNumber={sneaker.likes.length}
                      commentsNumber={sneaker.comments.length}
                      dark
                    />
       
                   </CardPicOverlay>
                   )
                 })
              }

          </React.Fragment>
        )
      }

      {
        mostCommented = (
          <React.Fragment>
              {
                 sneakers
                 .sort((a, b) => b.comments.length - a.comments.length)
                 .slice(0, 5)
                 .map((sneaker, index) => {
                   return (
                     <CardPicOverlay
                       key={sneaker._id}
                       imgBg={sneaker.mainimage}
                       contentId={sneaker._id}
                       profile={profile}
                       sneaker={sneaker}
                       index={index}
                     >
                     <AuthorHeader
                       author={sneaker.user}
                     />
       
       
                     {profile && (Object.keys(profile).length !== 0) && (
                       <IoEllipsisHorizontalSharp className="icon icon-ellipsis open-menu" id={sneaker._id} 
                       onClick={(e) =>  {
                         openMenu(e.currentTarget.parentElement.parentElement.id)
                         }
                       } 
                       />
                     )}
       
                     <Link to={`/sneakers/${sneaker._id}`}>
                       <h3 className="heading-3 model">{sneaker.model}</h3>
                       <h4 className="heading-4 colorway">{sneaker.colorway}</h4>
                       <h5 className="heading-4 year">{sneaker.year}</h5>
                     </Link>

                     <CardFooter
                      likesNumber={sneaker.likes.length}
                      commentsNumber={sneaker.comments.length}
                      dark
                    />
       
                   </CardPicOverlay>
                   )
                 })
              }

          </React.Fragment>
        )
      }

      {
        latestSneakers = (
          <React.Fragment>
            {
              sneakers
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .slice(0, 4)
              .map((sneaker, index) => {
                return (
                  <CardPicOverlay
                    key={sneaker._id}
                    imgBg={sneaker.mainimage}
                    contentId={sneaker._id}
                    profile={profile}
                    sneaker={sneaker}
                  >
                  <AuthorHeader
                    author={sneaker.user}
                  />
    
    
                  {profile && (Object.keys(profile).length !== 0) && (
                    <IoEllipsisHorizontalSharp className="icon icon-ellipsis open-menu" id={sneaker._id} 
                    onClick={(e) =>  {
                      openMenu(e.currentTarget.parentElement.parentElement.id)
                      }
                    } 
                    />
                  )}
    
                  <Link to={`/sneakers/${sneaker._id}`}>
                    <h3 className="heading-3 model">{sneaker.model}</h3>
                    <h4 className="heading-4 colorway">{sneaker.colorway}</h4>
                    <h5 className="heading-4 year">{sneaker.year}</h5>
                  </Link>

                 </CardPicOverlay>
                )
              })
            }

          </React.Fragment>
        )
      }
    }
  }

  
  return (
    <div className="trending" style={style}>
      <div className="pageheading">
        <h2 className="heading-2">Trending</h2>
      </div>

      <div className="latest">
        <h3 className="heading-3">Latest Sneakers</h3>
        {latestSneakers}
      </div>

      <div className="most-liked">
        <h3 className="heading-3">Most Liked</h3>
        {mostLiked}
      </div>

      <div className="most-commented">
        <h3 className="heading-3">Most Commented</h3>
        {mostCommented}
      </div>
    </div>
  );
}
