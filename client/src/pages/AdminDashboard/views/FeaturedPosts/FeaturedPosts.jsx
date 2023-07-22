import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { AdminContextProvider } from "context/AdminContextProvider";
import { getPosts } from "actions/postActions";
import { Panel } from "components/ui/Panel";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { getFeaturedPosts } from "./GetFeaturedPosts";
import { useModal } from "context/modalContext";



const Featured_Posts = ({ profile: { profile, profiles, loading }, post: { posts }, auth: { user }, getPosts }) => {


  const { isModalOpen, openModal, openOverlay, isOverlayOpen, closeModal } = useModal();
  const [renderedPosts, setRenderedPosts] = useState([])

  useEffect(() => {
    getPosts();
    console.log("called");
  }, [isModalOpen]);

  useEffect(() => {
    setRenderedPosts(posts)
  }, [posts]);



  return (
    <AdminContextProvider>
      <AdminLayout>
        <div className="featured-posts">{getFeaturedPosts(renderedPosts)}</div>
      </AdminLayout>

    </AdminContextProvider>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
  post: state.post,
});

export const FeaturedPosts = connect(mapStateToProps, {
  getPosts,
})(Featured_Posts);
