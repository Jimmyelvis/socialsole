import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getArticles } from "actions/articleActions";
import { Featured } from "./Components/Featured";
import { NewReleases } from "./Components/NewReleases";
import { Editorials } from "./Components/Editorials";
import { MostPopular } from "./Components/MostPopular";

const Articles_Home = ({ getArticles, article : {
  articles,
  loading
} }) => {


  useEffect(() => {
    getArticles();
  }, [getArticles]);


  return (
    <div className="articles">

      <Featured articles={articles} />

      <div className="pageheading pageheading-release">
        <h2 className="heading-2">New Releases</h2>
      </div>

      <div className="pageheading pageheading-mostpopular">
        <h2 className="heading-2">Most Popular</h2>
      </div>

      <NewReleases articles={articles} />


      <MostPopular articles={articles} />

      <div className="pageheading pageheading-editorials">
        <h2 className="heading-2">Editorials</h2>
      </div>


      <Editorials articles={articles} />
     
    </div>
  )
}

const mapStateToProps = (state) => ({
  article: state.article,
});

export const  ArticlesHome = connect(mapStateToProps, { getArticles })(Articles_Home);