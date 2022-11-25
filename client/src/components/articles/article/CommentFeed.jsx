import React, { Component } from 'react'
import CommentItem from './CommentItem';


const CommentFeed = ({ comments, articleId }) => {
 
   return comments.map(comment => (
      <CommentItem key={comment._id} comment={comment} articleId={articleId} />
    ));
  }

export default CommentFeed
