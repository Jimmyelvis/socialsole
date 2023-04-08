import React from 'react'
import { Panel } from 'components/ui/Panel'
import { Author } from './Author'
import { CardPicOverlay } from 'components/ui/cards/CardPicOverlay'
import { SneakerCard } from 'components/ui/cards/SneakerCard'
import { ArticleCard } from 'components/ui/cards/ArticleCard'
import parse from 'html-react-parser';

export const SavedItemsCard = ({
  _id, type, headerimage, mainimage, text, model,
  colorway, year, date, user, headline, fullheaderimage
}) => {

  const getAuthor = () => {
    return (
      <Author
        user={user}
        model={model}
        type={type}
        date={date}
        headline={headline}
      />
    )
  }

  
  const getCardInfo = () => { 
    
    let cardInfo;

    if (type === 'post') {
      cardInfo = (
        <>
          {
            getAuthor()
          }
        
          <div className='card-content post-content'>

            <div className="post">
              <div className="header-image">
                <img src={headerimage} alt="" />
              </div>

              <div className='text'>
                {
                  parse(text)
                }
              </div>
            </div>

          </div>

        </>
      )
    } else if (type === 'sneaker') {
      cardInfo = (
        <>
          {getAuthor()}

          <div className="card-content sneaker-content">
            <SneakerCard 
              imgBg={mainimage} 
              year={year} 
              colorway={colorway} 
              model={model} 
              author={false} 
            />
          </div>
        </>
      );
    } else {
      cardInfo = (

        <div className='card-content article-content'>
        {
          getAuthor()
        }

        <ArticleCard
          imgBg={fullheaderimage}
          headline={headline}
          author={false}
          excerpt={text}
        />
      </div>
       
      )
    }

    return cardInfo;

   }

  return (
    <Panel className="saved-items-card">
      {getCardInfo()}
    </Panel>
  )
}
