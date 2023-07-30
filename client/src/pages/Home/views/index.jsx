import React, { useState, useEffect } from "react";
import { FeaturedArticles } from "../components/FeaturedArticles";
import { Latestnews } from "../components/Latestnews";
import { connect } from "react-redux";
import { getArticles } from "actions/articleActions";
import { LatestReleases } from "../components/LatestReleases";
import { Newreleases } from "../components/Newreleases";
import Mostliked from "../components/MostLikedSneakers";
import { releases } from '../../../components/homepage/releases/firedenim';

const Home_page = ({
  getArticles,
  article: { articles, loading },
}) => {

 

  useEffect(() => {
    getArticles();
  }, [getArticles]);


  return (
    <React.Fragment>
      <div className="header header-landing">
        <div className="heading">
          <h1 className="heading-1">Social Sole</h1>
          <p>Welcome to Social Sole. A exciting site where you can read about the latest news concerning, sneakers. And post about and share your sneaker collection.</p>
        </div>

        <div className="overlay"></div>
      </div>

      <div className="container container-home">
        {/* After you initially clone this project from github, the links in the <FeaturedArticles />,
        <Latestnews /> components will not work because they will be referencing articles in MY database
        What can simply do is create some articles, and which ever ones you want to feature the components, 
        you can edit the entries in there to match the articles you created. */}

        <FeaturedArticles articles={articles} />
        <Latestnews articles={articles} />

      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  article: state.article,
});

export const Home = connect(mapStateToProps, { getArticles })(Home_page);
