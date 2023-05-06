import React, { useEffect } from 'react'
import { connect } from "react-redux";
import { getRelatedSneakers } from "actions/sneakerActions";
import { Link } from "react-router-dom";
import { CardPicOverlay } from 'components/ui/cards/CardPicOverlay';

export const RelatedSneakers = ({ sneakerId, getRelatedSneakers, tags, sneaker: { sneakers } }) => {

  useEffect(() => {
    getRelatedSneakers(tags);

  }, [tags]);



  /*
    Before we map through the sneaker filter out the currently loaded sneaker 
    from the related sneakers state
  */
 let related = sneakers.filter((sneaker) => {
  return sneaker._id !== sneakerId._id;
});

return (
    
  <React.Fragment>

    <h3 className="heading-3">You May Also Like</h3>

    <ul>
      {related.map((sneaker) => {
        return (
          <CardPicOverlay
            key={sneaker._id}
            imgBg={sneaker.mainimage}
            contentId={sneaker._id}
          >
            <Link to={`/sneaker/${sneaker._id}`}>

                  <h3 className="heading-3">{sneaker.model}</h3>
                  <h4 className="heading-4">{sneaker.colorway}</h4>
                
            </Link>
          </CardPicOverlay>
        );
      })}
    </ul>

  </React.Fragment>

);
  
}

const mapStateToProps = (state) => ({
  sneaker: state.sneaker,
  auth: state.auth,
});

export default connect(mapStateToProps, { getRelatedSneakers })(RelatedSneakers);
