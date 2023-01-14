import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Related from "./related/RelatedPosts";
import { Link } from "react-router-dom";
import Icon from "components/icons/Icon";
import { deletePost, addLike, removeLike } from "actions/postActions";
import { PostInfo } from "components/features/postInfo";
import { Tags } from "components/features/tags";

export const PostItem = ({ post, showActions, auth, deletePost, addLike, removeLike }) => {

  /* Variables */
  const { isAuthenticated, user } = auth;




  const editbtn = (
    <Link to={`/editpost/${post._id}`} className="editbtn">
      <Icon color="#AADDFF" icon="pencil1" />
    </Link>
  );



  return (
    <React.Fragment>
      <div className="postdetail">
        <div className="card-ver-trad ">
          <div className="top">{post.headerimage === "" ? "  " : <img src={post.headerimage} alt="..." />}</div>

          <div className="bottom contentbody">
            <div className="postedit">{isAuthenticated && user.id === post.user._id ? editbtn : ""}</div>

            <h2 className="heading-2">{post.headline}</h2>

            <div className="authorheader">
              <div className="avatarholder">
                <img src={post.user.avatar} alt="" />
              </div>

              <h4 className="heading-4">By {post.user.name}</h4>
            </div>

            <div id="theText" className="text" dangerouslySetInnerHTML={{ __html: post.text }}></div>

        

            <PostInfo 
                element={post}
                showActions={showActions}
                auth={auth}
                addLike={addLike}
                removeLike={removeLike}
              />
            

            <Tags element={post} />
          </div>
        </div>

        {/* 
          Sub component for displaying links to posts that are related to the
          currently loaded posts. The related posts are determined by the tags prop
          which is used to query the database for posts that has any of the matching
          tags.
        */}
        <Related tags={post.tags} postId={post} />
      </div>
    </React.Fragment>
  );
};

PostItem.defaultProps = {
  showActions: true,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export const View = connect(mapStateToProps, { deletePost, addLike, removeLike })(PostItem);
