import React from 'react'
import { Panel } from '../Panel'
import { FaComment } from 'react-icons/fa'
import { AiFillLike } from 'react-icons/ai'

export const CommentButton = ({
  likes,
  comments,
  onClick
}) => {
  return (
    <Panel className="comment-btn">
      
      <div className="col likes">
        <AiFillLike />
        <span className="number">{likes}</span>
      </div>

      <div className="col comments">
        <FaComment onClick={
          onClick
        } />
        <span className="number">{comments}</span>
      </div>
    </Panel>
  )
}
