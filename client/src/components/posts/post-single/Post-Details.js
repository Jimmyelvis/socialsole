import React, { Component } from "react";
import { connect } from "react-redux";
import Related from "./RelatedPosts"
import { Link } from "react-router-dom";
import { deletePost, addLike, removeLike } from "../../../actions/postActions";
import Icon from "../../icons/Icon"

/*
  Component for displaying the post detail view. It's passed in props
  such as (post) and (showactions). The showaction props is used to 
  determine whether the thumbs up and thumbs down icon will be displayed
  using a boolean variable. If true a logged in user will be able to like
  or dislike a post. If false, a user who is not logged in will not have
  this capability.

*/


export const PostItem = ({ post, showActions, auth, deletePost, addLike, removeLike }) => {
  

 const findUserLike = (likes) => {

    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  const { isAuthenticated, user } = auth;

  const tags = post.tags.map((tag, index) => (
    <li key={index} >
      {tag}
    </li>
  ));

  const editbtn = (
    <Link to={`/editpost/${post._id}`} className="editbtn">
          <Icon color="#AADDFF" icon="pencil1" />
    </Link>
    
  )


  return (
    <React.Fragment>
      <div className="postdetail">

        <div className="card-ver-trad ">

          <div className="top">
            {post.headerimage === "" ? (
              "  "
            ) : (
              <img src={post.headerimage} alt="..." />
            )}
            
          </div>

          <div className="bottom contentbody">

            <div className="postedit">
              {isAuthenticated && user.id === post.user._id
                ? editbtn
                : ""}
            </div>

            <h2 className="heading-2">{post.headline}</h2>

            <div className="authorheader">
              <div className="avatarholder">
                <img src={post.user.avatar} alt="" />
              </div>

              <h4 className="heading-4">By {post.user.name}</h4>
            </div>

            <div
                  id="theText"
                  className="text"
                  dangerouslySetInnerHTML={{ __html: post.text }}
            ></div>


            <div className="actions">
              
              {
                /*
                  If the showactions prop that is passed in equals true
                  this will be rendered in view
                */
              }

              {showActions ? (
                <React.Fragment>
                  <div
                    className="likes"
                    onClick={() => addLike(post._id)}
                  >
                    {findUserLike(post.likes) ? (
                      <Icon
                        color="#AADDFF"
                        icon="thumbsup"
                        className="thumbs"
                      />
                    ) : (
                      <Icon
                        color="#5D789F"
                        icon="thumbsup"
                        className="thumbs"
                      />
                    )}

                    <h3 className="heading-3">{post.likes.length}</h3>
                  </div>

                  <div
                    className="unlikes"
                    onClick={() => removeLike(post._id)}
                  >
                    <Icon
                      color="#5D789F"
                      icon="thumbsdown"
                      className="thumbs"
                    />
                  </div>

                  <div className="commentsnumber">
                    <div className="commenticon">
                      <Icon
                        color="#AADDFF"
                        icon="bubbles2"
                        className="bubbles"
                      />
                    </div>

                    <h3 className="heading-3">{post.comments.length}</h3>
                  </div>
                </React.Fragment>
              ) : null}
            </div>
         
            
            <div className="tags">

              <Icon color="#AADDFF" icon="price-tags" className="tagicon" />
              <ul> { tags } </ul>

            </div>
          </div>
      
        </div>

        {
        /* 
          Sub component for displaying links to posts that are related to the
          currently loaded posts. The related posts are determined by the tags prop
          which is used to query the database for posts that has any of the matching
          tags.
        */
        }
        <Related tags={post.tags} postId={post} />

      </div>

    </React.Fragment>
  );
 
}

PostItem.defaultProps = {
  showActions: true
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deletePost, addLike, removeLike }
)(PostItem);
