import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import SneakerFeed from "./profilesneakers/SneakerFeed";
import { getSneakersByUser } from "../../../../actions/sneakerActions";
import Spinner from "../../../common/Spinner";
import Card from "../../../cards/Card"


export const ProfileSneakers = ({ profile: { profile }, sneaker: { sneakers, loading }, getSneakersByUser }) => {

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (profile) {
      getSneakersByUser(profile.user._id);
    }
  }, [profile]);
  

   const updateSearch = (e) => {
    setSearch(e.target.value);
  };



    const firstName = profile.user.name.trim().split(" ")[0];

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
              return <Card key={sneaker._id} sneaker={sneaker} cardtype={'sneaker'} />;
          })}
        </React.Fragment>
      )
    }

    return (
      <div className="profileSneakers">
        <div className="container">
           
          <div className="pageheading">
              <h2 className="heading-2">{firstName}'s Sneakers</h2>
          </div>

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
