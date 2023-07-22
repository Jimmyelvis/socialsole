import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { AdminContextProvider } from "context/AdminContextProvider";
import { getArticles } from "actions/articleActions";
import { getProfiles } from "actions/profileActions";
import { Panel } from "components/ui/Panel";
import { AdminLayout } from '../../components/layout/AdminLayout';
import { getTaggedArticles, getLatestArticles, getMostCommentedArticles
  , getMostLikedArticles
} from "./utils";



const Articles_Overview = ({
  profile: { profile, profiles, loading },
  article: { articles },
  getArticles,
  getProfiles,
}) => {

  useEffect(() => {
    getArticles();
    getProfiles();
  }, []);



  return (
    <AdminContextProvider>
      <AdminLayout>
        <div className="articles-info-cards">
          <Panel className="info-card sneaker-info-card tagged-articles">
            <h3 className="heading-3 title">Most Tagged Articles</h3>

            <ul className="info-card__content">{getTaggedArticles(articles)}</ul>
          </Panel>

          <Panel className="info-card sneaker-info-card commented-articles">
            <h3 className="heading-3 title">Most Commented Articles</h3>

            <ul className="info-card__content">{getMostCommentedArticles(articles)}</ul>
          </Panel>

          <Panel className="info-card sneaker-info-card latest-articles">
            <h3 className="heading-3 title">Latest Articles</h3>

            <ul className="info-card__content">{getLatestArticles(articles)}</ul>
          </Panel>

          <Panel className="info-card sneaker-info-card liked-articles">
            <h3 className="heading-3 title">Most Liked Articles</h3>

            <ul className="info-card__content">{getMostLikedArticles(articles)}</ul>
          </Panel>
        </div>
      </AdminLayout>
    </AdminContextProvider>
  );
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
  article: state.article
});

export const ArticlesOverview = connect(mapStateToProps, {
  getArticles,
  getProfiles,
}) (Articles_Overview)
