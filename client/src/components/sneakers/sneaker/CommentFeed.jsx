import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';

class CommentFeed extends Component {
  render() {
    const { comments, sneakerId } = this.props;

    return comments.reverse().map(comment => (
      <CommentItem key={comment._id} comment={comment} sneakerId={sneakerId} />
    ));
  }
}

CommentFeed.propTypes = {
  comments: PropTypes.array.isRequired,
  sneakerId: PropTypes.string.isRequired
};

export default CommentFeed;