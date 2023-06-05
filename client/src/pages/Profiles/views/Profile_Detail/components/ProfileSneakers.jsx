import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import SneakerFeed from "./profilesneakers/SneakerFeed";
import { getSneakersByUser } from "actions/sneakerActions";
import Spinner from "components/common/Spinner";
import Card from "components/ui/cards/Card";
import { SneakerCard } from "components/ui/cards/SneakerCard";



export const ProfileSneakers = ({ 
  displayedProfile , 
  profile: { profile }, 
  sneaker: { sneakers, loading }, 
  getSneakersByUser 
}) => {

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (displayedProfile) {
      getSneakersByUser(displayedProfile.user._id);
    }
  }, [displayedProfile]);
  

   const updateSearch = (e) => {
    setSearch(e.target.value);
  };


    let sneakerContent;

    let filteredSneakers = sneakers.filter(sneaker => {
      return (
        sneaker.model.toLowerCase().indexOf(search.toLowerCase()) !==
        -1 || sneaker.colorway.toLowerCase().indexOf(search.toLowerCase()) !==
        -1
      );
    });

    if (sneakers === null || loading) {
      sneakerContent = <Spinner />;
    } else {
      sneakerContent = (
        <React.Fragment>
          {filteredSneakers.map(sneaker => {
              return (
              <SneakerCard
                author={sneaker.user}
                model={sneaker.model}
                colorway={sneaker.colorway}
                imgBg={sneaker.mainimage}
                contentId={sneaker._id}
                year={sneaker.year}
                useSavesList={profile?.lists}
                profile={profile}
              />
            );
          })}
        </React.Fragment>
      )
    }

    return (
      <div className="profileSneakers">
           

          <div className="filteredSearch">
            <input
              type="text"
              placeholder="Filter By Headline"
              value={search}
              onChange={updateSearch}
              className="form-control"
            />
          </div>

            <div className="sneakers">
              {sneakerContent}
            </div>
            
        
      </div>
    );
  
}

const mapStateToProps = state => ({
  profile: state.profile,
  sneaker: state.sneaker
});

export default connect(
  mapStateToProps,
  { getSneakersByUser }
)(ProfileSneakers);
