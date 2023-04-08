import React from 'react'
import { Avatar } from 'components/ui/avatar'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';

export const Author = ({ user, model, type, headline, date }) => {
  return (
    <div className='author'>

      <div className="avatar-holder">
        <Avatar avatar={user && user.avatar} />
      </div>

      <div className="info">
        <h3 className="heading-3 title">
          {
            type  === 'post' ? 
            `${headline}`:
            type === 'article' ? `${headline}` :
            `${model}`
          }
        </h3>

        <h3 className="heading-3 name-date">

          <span className="name">
            {user && user.name}
          </span>
       
          <span className="mx-1">  </span>

          <span className="date">
            {dayjs.extend(relativeTime)}
            {dayjs(date).fromNow()}

          </span>
        </h3>
      </div>
    </div>
  )
}
