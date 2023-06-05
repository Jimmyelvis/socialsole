import React from 'react'
import { HorizontalCard } from 'components/ui/cards/HorizontalCard'

export const Editorials = ({
  articles
}) => {

  let editorials;

  if (articles) {

    editorials = articles
    .filter((article) => {
      return article.newstype === "editorial";
    }).sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    }).slice(0, 4);

  }

  return (
    

    <div className="editorials">

{editorials.map((article, index) => {
      return (
        <HorizontalCard
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
