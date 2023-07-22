import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { AdminContextProvider } from "context/AdminContextProvider";
import { getArticlesAdmin } from "actions/articleActions";
import { Panel } from "components/ui/Panel";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { getFeaturedArticles } from "./GetFeaturedArticles";
import { useModal } from "context/modalContext";



const Featured_Articles = ({ 
  profile: { profile, profiles, loading }, 
  article: { articles }, 
  auth: { user }, getSneakers, getArticlesAdmin 
}) => {


  const { isModalOpen, openModal, openOverlay, isOverlayOpen, closeModal } = useModal();
  const [renderedSneakers, setRenderedSneakers] = useState([])

  useEffect(() => {
    getArticlesAdmin();
    console.log("called");
  }, [isModalOpen]);

  useEffect(() => {
    setRenderedSneakers(articles)
  }, [articles]);



  return (
    <AdminContextProvider>
      <AdminLayout>
        <div className="featured-articles-admin">{getFeaturedArticles(renderedSneakers)}</div>
      </AdminLayout>

    </AdminContextProvider>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
  article: state.article,
});

export const FeaturedArticles = connect(mapStateToProps, {
 getArticlesAdmin
})(Featured_Articles);
