import React, { Component } from "react";
import { connect } from "react-redux";
import PostFeed from "./profileposts/PostFeed";
import { getPostsByUser } from "../../../../actions/postActions";
import Spinner from "../../../common/Spinner";
import Card from "../../../cards/Card"

export class ProfilePosts extends Component {

  constructor(props) {
    super(props);

    this.state = {
      search: ""
    };
  }

  componentDidMount() {
    const { profile } = this.props.profile;
    const profileUserId = profile.user._id;
    this.props.getPostsByUser(profileUserId);
  }

  updateSearch = e => {
    this.setState({ search: e.target.value });
  };

  render() {
    const { profile } = this.props.profile;
    const { posts, loading } = this.props.post;

    const firstName = profile.user.name.trim().split(" ")[0];

    let postContent;

    let filteredPosts = posts.filter(post => {
      return (
        post.headline.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
        -1
      );
    });

    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = (
        <React.Fragment>
           {filteredPosts.map(post => {
            return <Card key={post._id} post={post} cardtype={'post'} />;
          })}
        </React.Fragment>
      );
    }

    return (
      <div className="profilePosts">
        <div className="container">

          <div className="pageheading">
              <h2 className="heading-2">{firstName}'s Posts</h2>
          </div>

          <div className="filteredSearch">
            <input
              type="text"
              placeholder="Filter By Headline"
              value={this.state.search}
              onChange={this.updateSearch}
              className="form-control"
            />
          </div>

          <div className="posts">
            {postContent}
          </div>
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
