import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { FullImageHeader } from "components/ui/headers/fullImageHeader";
import sneakerbanner from "assets/img/header.jpg";
import { getSneakers } from "actions/sneakerActions";
import { CardPicOverlay } from "components/ui/cards/CardPicOverlay";
import { Label } from "components/ui/cards/components/Label";
import { Panel } from "components/ui/Panel";
import { All } from "./views/All";
import { Trending } from "./views/Trending";
import { Link } from "react-router-dom";

const Sneakers = ({ sneaker, getSneakers, profile: { profile, loading } }) => {

  const [view, setView] = useState("All");  

  useEffect(() => {
    getSneakers();
  }, [getSneakers]);

  const getFeatured = () => {
    let featured = sneaker.sneakers.filter((sneaker) => sneaker.featured > 0);

    return featured.map((sneaker) => (
      <CardPicOverlay
        // key={sneaker._id}
        imgBg={sneaker.mainimage}
      >
        <Link to={`/sneaker/${sneaker._id}`} className="card-link">
          <Label label="Featured Sneaker" />
          <h3 className="heading-3 model">{sneaker.model}</h3>
          <h4 className="heading-4 colorway">{sneaker.colorway}</h4>
          <h5 className="heading-4 year">{sneaker.year}</h5>
        </Link>

      </CardPicOverlay>
    ));
  };

  return (
    <div className="all-sneakers">
      <FullImageHeader image={sneakerbanner}>
        <div className="header-info">
          <h1 className="heading-1">Sneakers</h1>
        </div>
      </FullImageHeader>


      <div className="featured-sneakers">{getFeatured()}</div>

      
      <Panel className="tabs">
        <li className="tab">
          <h3 className="heading-3" onClick={() => setView("All")}>
            All Posts
          </h3>
        </li>

        <li className="tab">
          <h3 className="heading-3" onClick={() => setView("Trending")}>
            Trends
          </h3>
        </li>
      </Panel>

      {view === "All" ? (
        <All 
          sneaker={sneaker} 
          profile={profile} 
        />
      ) : (
        <Trending
          sneaker={sneaker} 
          profile={profile} 
        />
      )}


    </div>
  );
};

const mapStateToProps = (state) => ({
  sneaker: state.sneaker,
  profile: state.profile,
});

export const AllSneakers = connect(mapStateToProps, { getSneakers })(Sneakers);
