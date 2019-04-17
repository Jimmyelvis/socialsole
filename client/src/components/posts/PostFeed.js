import React, { Component } from "react";
import PropTypes from "prop-types";
import PostItem from "./PostItem";

class PostFeed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: ""
    };
  }

  updateSearch = e => {
    this.setState({ search: e.target.value });
    console.log(this.state.search);
  };

  render() {
    const { posts } = this.props;

    let filteredPosts = posts.filter(post => {
      return (
        post.headline.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
        -1
      );
    });

    return (
      <React.Fragment>
        <input
          type="text"
          placeholder="Search"
          value={this.state.search}
          onChange={this.updateSearch}
        />

        {filteredPosts.map(post => {
          return <PostItem key={post._id} post={post} />;
        })}
      </React.Fragment>
    );
  }
}

PostFeed.propTypes = {
  posts: PropTypes.array.isRequired
};

export default PostFeed;
