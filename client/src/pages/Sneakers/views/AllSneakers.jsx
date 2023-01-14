import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Card from "components/ui/cards/Card";
import Spinner from "components/common/Spinner";
import { getSneakers } from "actions/sneakerActions";

export const Sneakers = ({ sneaker: { sneakers, loading }, getSneakers }) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    getSneakers();
  }, [getSneakers]);

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
          return <Card key={sneaker._id} sneaker={sneaker} cardtype={"sneaker"} />;
        })}
      </React.Fragment>
    );
  }

   return (
     <div className="communitysneakers">

       <div className="container">
         <div className="pageheading">
           <h2 className="heading-2">Sneakers From The Community</h2>
           <p>All the sneakers from our user's collection</p>
         </div>

         <div className="filteredSearch">
           <input type="text" placeholder="Filter By Model or Colorway" value={search} onChange={updateSearch} className="form-control" />
         </div>

         <div className="sneakeritems">{sneakerContent}</div>
       </div>
     </div>
   );
};

const mapStateToProps = (state) => ({
  sneaker: state.sneaker,
});

export const AllSneakers = connect(mapStateToProps, { getSneakers })(Sneakers);
