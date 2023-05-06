import React, { useEffect, useState } from "react";
import { CardPicOverlay } from "components/ui/cards/CardPicOverlay";
import Spinner from "components/common/Spinner";
import useFadeIn from "hooks/useFadin";
import { AuthorHeader } from "components/ui/headers/authorHeader";
import { Link } from "react-router-dom";
import { IoEllipsisHorizontalSharp } from "react-icons/io5"; 
import { useSaveOptions } from "context/saveOptions";


export const All = ({ 
  sneaker: { sneakers, loading },
  profile
}) => {

  const [search, setSearch] = useState("");
  const [style, isVisible , setIsVisible] = useFadeIn(2000);
  const { openMenu } = useSaveOptions();

  useEffect(() => {
    setIsVisible(true);

  }, []);

 
  /*
    This function is called when an onchange event occurs when the user
    types a search parameter in the search bar component. This sets state of the search term
    which is then used by the (filteredSneakers) variable to filter
    through the sneeakers
  */

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  let sneakerContent;

  if (sneakers) {
    
    let filteredSneakers = sneakers.filter((sneaker) => {
      return sneaker.model.toLowerCase().indexOf(search.toLowerCase()) !== -1 || sneaker.colorway.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });

    if (sneakers === null || loading) {
      /* 
        Checks to see if the sneaker state is null, if so then a loading spinner
        is displayed, this helps undefined error on first render
      */
  
      sneakerContent = <Spinner />;
    } else {
      sneakerContent = (
        <React.Fragment>
          {filteredSneakers.map((sneaker) => {
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

              <Link to={`/sneaker/${sneaker._id}`}>
                <h3 className="heading-3 model">{sneaker.model}</h3>
                <h4 className="heading-4 colorway">{sneaker.colorway}</h4>
                <h5 className="heading-4 year">{sneaker.year}</h5>
              </Link>

            </CardPicOverlay>
            );
          })}
        </React.Fragment>
      );
    }

  }



   return (
     <div className="all" style={style}>

         <div className="pageheading">
           <h2 className="heading-2">Sneakers From The Community</h2>
           <p>All the sneakers from our user's collection</p>
         </div>

         <div className="filteredSearch">
           <input type="text" placeholder="Filter By Model or Colorway" value={search} onChange={updateSearch} className="form-control" />
         </div>

         <div className="sneakeritems">{sneakerContent}</div>
       
     </div>
   );
};


