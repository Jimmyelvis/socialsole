import React from 'react'
import { NewRelease } from "components/ui/cards/NewRelease";
import { Label } from '../../../../../components/ui/cards/components/Label';

export const NewReleases = ({
  articles
}) => {


  let newReleases;

  if (articles) {
      
      newReleases = articles
      .filter((article) => {
        return article.newstype === "release";
      }).sort((a, b) => {
        return new Date(a.releaseDate) - new Date(b.releaseDate);
      }).slice(0, 4);
  
  }

  return (
    <div className='new-releases'>
      {newReleases.map((article, index) => {
        return (
          <NewRelease
            key={article._id}
            sneaker={article.headline}
            price={article.price}
            date={article.releaseDate}
            sizeRun={article.sizeRun}
            colors={article.color}
            imgBg={article.fullheaderimage}
            index={index}
            contentId={article._id}
            label={false}
          />
        )
        })}
    </div>
  )
}
