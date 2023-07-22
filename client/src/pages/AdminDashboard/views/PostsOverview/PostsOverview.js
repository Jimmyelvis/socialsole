import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { AdminContextProvider } from "context/AdminContextProvider";
import { getPosts } from "actions/postActions";
import { getProfiles } from "actions/profileActions";
import { SmallDataCard } from "../../components/cards/SmallDataCard";
import { Panel } from "components/ui/Panel";
import { CardPicOverlay } from "components/ui/cards/CardPicOverlay";
import { AdminLayout } from '../../components/layout/AdminLayout';
import { getTaggedPosts, getMostCommentedPosts, getLatestPosts, getMostLikedPosts } from "./utils";


const Posts_Overview = ({
  profile: { profile, profiles, loading },
  post: { posts },
  getPosts,
  getProfiles,
}) => {

  useEffect(() => {
    getPosts();
    getProfiles();
  }, []);



  return (
    <AdminContextProvider>
      <AdminLayout>
        <div className="posts-info-cards">
          <Panel className="info-card post-info-card tagged-posts">
            <h3 className="heading-3 title">Most Tagged Posts</h3>

            <ul className="info-card__content">{getTaggedPosts(posts)}</ul>
          </Panel>

          <Panel className="info-card post-info-card commented-posts">
            <h3 className="heading-3 title">Most Commented Posts</h3>

            <ul className="info-card__content">{getMostCommentedPosts(posts)}</ul>
          </Panel>

          <Panel className="info-card post-info-card latest-posts">
            <h3 className="heading-3 title">Latest Posts</h3>

            <ul className="info-card__content">{getLatestPosts(posts)}</ul>
          </Panel>

          <Panel className="info-card post-info-card liked-posts">
            <h3 className="heading-3 title">Most Liked Posts</h3>

            <ul className="info-card__content">{getMostLikedPosts(posts)}</ul>
          </Panel>
        </div>
      </AdminLayout>
    </AdminContextProvider>
  );
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
  post: state.post
});

export const PostsOverview = connect(mapStateToProps, {
  getPosts,
  getProfiles,
}) (Posts_Overview)
