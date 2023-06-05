import React from 'react'
import { CardPicOverlay } from 'components/ui/cards/CardPicOverlay'
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';

export const MostPopular = ({
  articles
}) => {

  let mostPopular;

  if (articles) {

    mostPopular = articles
    .sort((a, b) => {
      return b.comments.length - a.comments.length;
    }).filter((article) => {
      return article.comments.length > 0;
    }).slice(0, 4);

  }


  return (
    <div className='most-popular'>

      <div className="most-popular_articles">

        {mostPopular.map((article, index) => {
          return (
            <CardPicOverlay key={article._id} imgBg={article.fullheaderimage} contentId={article._id} index={index}>
              <h2 className="heading-2 headline">
                <Link to={`/article/${article._id}`}>{article.headline}</Link>
              </h2>

              <div className="excerpt">{parse(article.text)}</div>
            </CardPicOverlay>
          );
        })}
      </div>

    </div>
  )
}
