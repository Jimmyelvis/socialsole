import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Related from "./related/RelatedPosts";
import { Link } from "react-router-dom";
import Icon from "components/icons/Icon";
import { deletePost, addLike, removeLike } from "actions/postActions";
import { PostInfo } from "components/features/postInfo";
import { Tags } from "components/features/tags";
import { Panel } from "components/ui/Panel";
import { Avatar } from "components/ui/avatar";
import { getTimefromNow } from "utils/formatDate";
import parse from "html-react-parser";

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

      <Panel className="card-detail-view ">

          <div className="top">

            <div className="authorHeader">
              <Avatar avatar={post.user.avatar} alt="" />

              <div className="name-date">
                <h4 className="heading-4 name">{post.user.name}</h4>
                <h5 className="heading-5 date">
                  {
                    getTimefromNow(post.date)
                  }
                </h5>
              </div>
            </div>


            {
              post.headerimage === "" ? "  " : 
              <img src={post.headerimage} alt="..." className="main-img" />
            }

          </div>

          <div className="bottom">

            <div className="postedit">{isAuthenticated && user._id === post.user._id ? editbtn : ""}</div>

            <h2 className="heading-2">{post.headline}</h2>

            <PostInfo 
              element={post}
              showActions={showActions}
              auth={auth}
              addLike={addLike}
              removeLike={removeLike}
            />
          
            <div className="text">
              {parse(post.text)}
            </div>

          </div>

          <Tags element={post} />

      </Panel>

        {/* 
          Sub component for displaying links to posts that are related to the
          currently loaded posts. The related posts are determined by the tags prop
          which is used to query the database for posts that has any of the matching
          tags.
        */}
        
        <Related tags={post.tags} postId={post} />
      
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
