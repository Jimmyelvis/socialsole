import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { AdminContextProvider } from "context/AdminContextProvider";
import { getSneakers } from "actions/sneakerActions";
import { getProfiles } from "actions/profileActions";
import { Panel } from "components/ui/Panel";
import { AdminLayout } from '../../components/layout/AdminLayout';
import { getLatestSneakers, getMostCommentedSneakers, getMostLikedSneakers,
  getTaggedSneakers
} from "./utils";


const Sneakers_Overview = ({
  profile: { profile, profiles, loading },
  sneaker: { sneakers },
  getSneakers,
  getProfiles,
}) => {

  useEffect(() => {
    getSneakers();
    getProfiles();
  }, []);



  return (
    <AdminContextProvider>
      <AdminLayout>
        <div className="sneakers-info-cards">
          <Panel className="info-card sneaker-info-card tagged-sneakers">
            <h3 className="heading-3 title">Most Tagged Sneakers</h3>

            <ul className="info-card__content">{getTaggedSneakers(sneakers)}</ul>
          </Panel>

          <Panel className="info-card sneaker-info-card commented-sneakers">
            <h3 className="heading-3 title">Most Commented Sneakers</h3>

            <ul className="info-card__content">{getMostCommentedSneakers(sneakers)}</ul>
          </Panel>

          <Panel className="info-card sneaker-info-card latest-sneakers">
            <h3 className="heading-3 title">Latest Sneakers</h3>

            <ul className="info-card__content">{getLatestSneakers(sneakers)}</ul>
          </Panel>

          <Panel className="info-card sneaker-info-card liked-sneakers">
            <h3 className="heading-3 title">Most Liked Sneakers</h3>

            <ul className="info-card__content">{getMostLikedSneakers(sneakers)}</ul>
          </Panel>
        </div>
      </AdminLayout>
    </AdminContextProvider>
  );
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
  sneaker: state.sneaker
});

export const SneakersOverview = connect(mapStateToProps, {
  getSneakers,
  getProfiles,
}) (Sneakers_Overview)
