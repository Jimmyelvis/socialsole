import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { Sectionheading } from 'components/ui/headers/Sectionheading';


export const FeaturedArticles = ({ articles }) => {

  /*
    To get these articles to display properly you will need to edit
    the details below, such as the link address headings and text, and image
     to match the articles you created.
  */

 return (
   <React.Fragment>
     <div className="featured-articles ">

      <Sectionheading heading="Featured Articles" />

      {
        articles.map((article, index) => {
          return (
            <div className="card-ver-overlay-notrans featured-article" key={index}>
              <Link to={`/article/${article.id}`}>
                <img
                  className="cardbg"
                  src={article.image}
                  alt="..."
                />
                <div className="overlay"></div>
              </Link>
              <div className="card-content">
                <h3 className="heading-3">{article.title}</h3>
                <p>{article.text}</p>
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
