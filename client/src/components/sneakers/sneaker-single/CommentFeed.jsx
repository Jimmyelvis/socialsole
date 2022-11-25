import React, { Component } from 'react';
import CommentItem from './CommentItem';

const CommentFeed = ({ comments, sneakerId }) => {

  return comments.map(comment => (
    <CommentItem key={comment._id} comment={comment} sneakerId={sneakerId} />
  ));
  
}


export default CommentFeed;