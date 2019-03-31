import React, { Component } from "react";
import { connect } from "react-redux";
// import PostFeed from "./PostFeed";
import { getPostsByUser, addLike, removeLike } from "../../actions/postActions";
import Moment from 'react-moment';

// import Spinner from "../common/Spinner";

export class UserPosts extends Component {

 
  componentDidMount() {

    const { profile } = this.props.profile;
    const profileUserId = profile.user._id;
    console.log('=================IN USER POSTS ============');
    console.log(profileUserId);
    console.log('====================================');
    
    this.props.getPostsByUser(profileUserId);

  }

  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  onLikeClick(id) {
    this.props.addLike(id);
  }

  onUnlikeClick(id) {
    this.props.removeLike(id);
  }

  findUserLike(likes) {
    const { auth } = this.props;

    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  renderPosts(){

    const { posts, loading } = this.props.post;
    const { profile } = this.props.profile;


    console.log('=========POSTS================');
    console.log(posts);
    console.log('====================================');

    return posts.map(post => {

      return(

            <div className="post-card ">

              { post.headerimage === "" ? (
                   '  '  
              ) : ( <img
                src={post.headerimage}
                className="card-img-top"
                alt="..."
              />
            ) }

             
              <div className="card-body">
                <h3 className="card-title">{post.headline}</h3>
                By <h4>{profile.user.name}</h4>
                <p className="card-text">
                  {post.text}
                </p>
                {/* <a href="#" className="btn btn-primary">
                  Go somewhere
                </a> */}

                Posted <h6><Moment format="MM/DD/YYYY">{post.date}</Moment> </h6>
              </div>
            </div>
      )
      
    })
  }


  render() {


    const { profile } = this.props.profile;

    const firstName = profile.user.name.trim().split(" ")[0];
   
    return (
      <div className="container">

      <h3 className="text-center text-info">{firstName}'s Posts</h3>


        <div className="row">
          { this.renderPosts()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  post: state.post
});

export default connect(mapStateToProps, { getPostsByUser }) (UserPosts);
