import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { Sectionheading } from 'components/ui/headers/Sectionheading';


export const FeaturedArticles = ({ articles }) => {


    let featuredArticles;

    if (articles) {
      
      featuredArticles = articles
      .sort((a, b) => {
        return a.featured - b.featured;
      }).filter((article) => {
        return article.featured > 0;
      }).slice(0, 3);
  
    } 



 return (
   <React.Fragment>
     <div className="featured-articles ">

      <Sectionheading heading="Featured Articles" />

      {
        featuredArticles.map((article, index) => {
          return (
            <div className="card-ver-overlay-notrans featured-article" key={index}>
              <Link to={`/article/${article._id}`}>
                <img
                  className="cardbg"
                  src={article.articleheaderimage}
                  alt="..."
                />
                <div className="overlay"></div>
              </Link>
              <div className="card-content">
                <h3 className="heading-3">{article.headline}</h3>
              </div>
            </div>
          )
        })
      } 
     </div>
   </React.Fragment>
 );

 
}

export default FeaturedArticles
