import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PostItem from './PostItem';


class PostFeed extends Component {


  render() {

    const { posts } = this.props;

      // return posts.map(post => <PostItem key={post._id} post={post} />);


      return (
        posts.slice(0, 6).map((post, index) => (<PostItem key={post._id} post={post} />))
      );


  }
}

PostFeed.propTypes = {
  posts: PropTypes.array.isRequired
};

export default PostFeed;
