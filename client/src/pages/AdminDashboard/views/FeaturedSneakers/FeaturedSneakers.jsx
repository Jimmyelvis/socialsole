import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { AdminContextProvider } from "context/AdminContextProvider";
import { getSneakers, getSneakersAdmin } from "actions/sneakerActions";
import { Panel } from "components/ui/Panel";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { getFeaturedSneakers } from "./GetFeaturedSneakers";
import { useModal } from "context/modalContext";



const Featured_Sneakers = ({ profile: { profile, profiles, loading }, sneaker: { sneakers }, auth: { user }, getSneakers, getSneakersAdmin }) => {


  const { isModalOpen, openModal, openOverlay, isOverlayOpen, closeModal } = useModal();
  const [renderedSneakers, setRenderedSneakers] = useState([])

  useEffect(() => {
    getSneakersAdmin();
    console.log("called");
  }, [isModalOpen]);

  useEffect(() => {
    setRenderedSneakers(sneakers)
  }, [sneakers]);



  return (
    <AdminContextProvider>
      <AdminLayout>
        <div className="featured-sneakers">{getFeaturedSneakers(renderedSneakers)}</div>
      </AdminLayout>

    </AdminContextProvider>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
  sneaker: state.sneaker,
});

export const FeaturedSneakers = connect(mapStateToProps, {
  getSneakers, getSneakersAdmin
})(Featured_Sneakers);
