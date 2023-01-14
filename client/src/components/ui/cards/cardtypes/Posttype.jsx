import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { deletePost, addLike, removeLike } from "actions/postActions";
import moment from "moment";
import { defaultimg } from "components/common/defaultimg";
import Icon from "components/icons/Icon";

const PostCard = ({ deletePost, addLike, removeLike, profile: { profile }, auth, post, showActions }) => {
  
  return (
    <div className="card-ver-trad">
      <Link to={`/post/${post._id}`} >

        <div className="top">
          {post.headerimage ? <img src={post.headerimage} alt="..." /> : <img src={defaultimg} alt="..." />}

          <div className="postheadline">
            <h2 className="heading-2">{post.headline}</h2>
          </div>
        </div>

        <div className="bottom contentbody">
          <div className="postAuthor">
            <div className="avatar">
              <img src={post.user.avatar} alt="" />
            </div>

            <div className="authorinfo">
              <h4 className="heading-4">{post.user.name}</h4>

              <p>{moment(post.date).fromNow()}</p>
            </div>
          </div>

          <div id="theText" className="text" dangerouslySetInnerHTML={{ __html: post.text }}></div>

          <div className="commentsnumber">
            <div className="commenticon">
              <Icon color="#AADDFF" icon="bubbles2" className="bubbles" />
            </div>

            <h3 className="heading-3">{post.comments.length}</h3>
          </div>
        </div>

        <div className="back-content">
          {post.user._id === auth.user.id || post.user === auth.user.id ? (
            <button onClick={() => deletePost(post._id)} type="button" className="btn btn-danger">
              <i className="fas fa-times" />
            </button>
          ) : null}

          <div className="avatar">
            <img src={post.user.avatar} alt="" />
          </div>

          <div className="postheadline">
            <h2 className="heading-2">{post.headline}</h2>
          </div>

          <div id="theText" className="text" dangerouslySetInnerHTML={{ __html: post.text }}></div>

       
          <div className="overlay"></div>

          <div className="backgroundimg">{post.headerimage ? <img src={post.headerimage} alt="..." /> : <img src={defaultimg} alt="..." />}</div>
        </div>

      </Link>

    </div>
  );
};

PostCard.defaultProps = {
  showActions: true,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(PostCard);
