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
        <div className="row">
          <div className="filteredSearch col-md-6">
            <input
              type="text"
              placeholder="Filter By Headline"
              value={this.state.search}
              onChange={this.updateSearch}
              className="form-control"
            />
          </div>
        </div>

        <br />

        <div className="row">
          {filteredPosts.map(post => {
            return <PostItem key={post._id} post={post} />;
          })}
        </div>
      </React.Fragment>
    );
  }
}

PostFeed.propTypes = {
  posts: PropTypes.array.isRequired
};

export default PostFeed;
