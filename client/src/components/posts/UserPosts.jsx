import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostFeed from "./PostFeed";
import { getPostsByUser } from "../../actions/postActions";
import Spinner from "../common/Spinner";

class UserPosts extends Component {
  componentDidMount() {
    const { profile } = this.props.profile;
    const profileUserId = profile.user._id;
    // console.log('=================IN USER POSTS ============');
    // console.log(profileUserId);
    // console.log('====================================');

    this.props.getPostsByUser(profileUserId);
  }

  render() {
    let postContent;

    const { profile } = this.props.profile;
    const { posts, loading } = this.props.post;
    const firstName = profile.user.name.trim().split(" ")[0];

    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <PostFeed posts={posts} />;
    }

    return (
      <div className="container">
        <h3>Your Posts</h3>

          {postContent}
        
      </div>
    );
  }
}

UserPosts.propTypes = {
  getPostsByUser: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPostsByUser }
)(UserPosts);
