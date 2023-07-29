import React from 'react'
import { ArticleCard } from "components/ui/cards/ArticleCard";


export const Featured = ({
  articles
}) => {

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
  <div className="featured-articles">
    {featuredArticles.map((article, index) => {
      return (
        <ArticleCard
          key={article._id}
          author={article.user}
          headline={article.headline}
          excerpt={article.text}
          imgBg={article.fullheaderimage}
          contentId={article._id}
          index={index}
        />
      )
      })}
  </div>
  )
}
