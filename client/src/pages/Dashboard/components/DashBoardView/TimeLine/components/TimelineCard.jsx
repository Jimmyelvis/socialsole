import React from 'react'
import { Panel } from 'components/ui/Panel'
import { Author } from './Author'
import { CardPicOverlay } from 'components/ui/cards/CardPicOverlay'
import { SneakerCard } from 'components/ui/cards/SneakerCard'
import { ArticleCard } from 'components/ui/cards/ArticleCard'
import parse from 'html-react-parser';
import { Link } from 'react-router-dom'

export const TimelineCard = ({ 
  _id, type, headerimage, mainimage, text, model,
  colorway, year, date, user, headline, fullheaderimage
}) => {
  return (
    <Panel className="time-line-card" key={_id}>
      <Author
        user={user}
        model={model}
        type={type}
        date={date}
        headline={headline}
      />

      <div className="card-content">
        {
          type === 'post' ? 
          (
            <div className="post">
              <div className="header-image">
                <Link to={`/post/${_id}`}>
                  <img src={headerimage} alt="" />
                </Link>
              </div>

              <div className='text'>
                {
                parse(text)
                }
              </div>
            </div>
          ) : type === 'sneaker' ?
          (
            <SneakerCard 
              imgBg={mainimage}
              year={year}
              colorway={colorway}
              model={model}
              author={false}
              contentId={_id}
            />
          ) : (
            <ArticleCard
              imgBg={fullheaderimage}
              headline={headline}
              author={false}
            />
            
          )
        }
      </div>

    </Panel>
  )
}
