import React, { Component } from 'react'
import CommentItem from './CommentItem';


export class CommentFeed extends Component {
 
  render() {

    const { comments, articleId, handle } = this.props;

    return comments.map(comment => (
      <CommentItem key={comment._id} comment={comment} articleId={articleId} />
    ));
   
  }
}

export default CommentFeed
