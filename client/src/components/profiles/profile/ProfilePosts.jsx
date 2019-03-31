import React, { Component } from "react";
// import PropTypes from 'prop-types'
import { connect } from "react-redux";
import PostFeed from "./profileposts/PostFeed";
import { getPostsByUser } from "../../../actions/postActions";
import Spinner from "../../common/Spinner";

export class ProfilePosts extends Component {
  componentDidMount() {
    const { profile } = this.props.profile;

    const profileUserId = profile.user._id;

    console.log(profileUserId);

    this.props.getPostsByUser(profileUserId);
  }

  render() {
    const { profile } = this.props.profile;
    const { posts, loading } = this.props.post;

    const firstName = profile.user.name.trim().split(" ")[0];

    let postContent;

    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <PostFeed posts={posts} />;
    }

    return (
      <div className="profilePosts">
        <div className="container">
          <div className="row">
            <h3> {firstName}'s Latest Posts </h3>
          </div>

          <div className="row">{postContent}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPostsByUser }
)(ProfilePosts);

// export default ProfilePosts;
