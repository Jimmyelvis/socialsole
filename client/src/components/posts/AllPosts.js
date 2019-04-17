import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostFeed from "./PostFeed";
import Spinner from "../common/Spinner";
import { getPosts } from "../../actions/postActions";
import Navbar from "../../components/layout/Navbar";

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  
  

 

  render() {
    const { posts, loading } = this.props.post;
    let postContent;

    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <PostFeed posts={posts} />;
    }

    return (
      <div className="allPosts">
        <Navbar />

        <div className="container">
          <div className="row">
            <div className="heading">
              <h1>User Posts</h1>
              <p>All the posts by our users</p>
            </div>
          </div>

       

          <div className="posts">{postContent}</div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
