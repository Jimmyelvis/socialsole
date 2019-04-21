import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../../common/Spinner';
import { getPost } from '../../../actions/postActions';
import PostItem from './PostItem';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';
import Navbar from "../../../components/layout/Navbar";



class Post extends Component {


  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }

  render() {

    const { post, loading } = this.props.post;
    const { user } = this.props.auth;
    let postContent;

    if (post === null || loading || Object.keys(post).length === 0) {
      postContent = <Spinner />;
    } else if (user === null || Object.keys(user).length === 0) {
      postContent = (
        <div>
        <PostItem post={post} showActions={false}/>
        <CommentFeed postId={post._id} comments={post.comments} />
      </div>
      )

    } else {
        postContent = (
          <div>
            <PostItem post={post} showActions={false}/>
            <div className="commentsArea">

              <CommentForm postId={post._id} />
              <CommentFeed postId={post._id} comments={post.comments} />
            
            </div>
          </div>
        );
    }


    return (
      <div className="postSingle">
        <Navbar />

        <div className="container">
          <div className="row">
            <div className="col-md-12">
             
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
    
  }
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth
});

export default connect(mapStateToProps, { getPost })(Post);
