import React from 'react'
import { Panel } from 'components/ui/Panel'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';

export const YourCommentsCard = ({ yourComments }) => {

  const { 
    model, 
    author, 
    mainimage,
    date,
    sneakerdate,
    postdate,
    type,
    headline,
    headerimage,
    fullheaderimage,
    text  
  } = yourComments;

  const determineImgSrc = () => { 
    if (headerimage) {
      return headerimage
    } else if (mainimage) {
      return mainimage
    } else {
      return fullheaderimage
    }
   }

   const getHeadline = () => {
      if (headline) {
        return headline
      } else if (model) {
        return model
      } 
  }

  const getDate = () => {
    if (postdate) {
      return postdate
    } else if (sneakerdate) {
      return sneakerdate
    }
  }


  return (
    <Panel className="comments-Card">

      <div className="header-Img">
        <img src={determineImgSrc()} />
      </div>

      <div className="title">
        <h3 className="heading-3 headline">
          {getHeadline()}
        </h3>

        <h4 className="heading-4 author">

         <span className="name">
            { author && author.name }
          </span> 

          <span className="mx-1">  </span>
          <span className="date">
            { dayjs(getDate()).fromNow() }
          </span>
        </h4>
      </div>

      <div className="text">
       { text }
      </div>

      <div className="postedBy">
        <h4 className="heading-4">
          {dayjs.extend(relativeTime)}
          <span className="by-you">Posted by You :</span> 
          <span className="mx-1">  </span>
          <span className="ago">{ dayjs(date).fromNow()}</span>   
        </h4>
      </div>

    </Panel>
  )
}
