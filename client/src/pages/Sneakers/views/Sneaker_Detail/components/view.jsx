import React, { Component } from "react";
import { connect } from "react-redux";
import Related from "./RelatedSneakers";
import { Link } from "react-router-dom";
import { deleteSneaker, addLike, removeLike } from "actions/sneakerActions";
import { getCurrentProfile } from "actions/profileActions";
import moment from "moment";
import Icon from "components/icons/Icon";
import { PostInfo } from "components/features/postInfo";
import { Tags } from "components/features/tags";
import { Panel } from "components/ui/Panel";
import { Avatar } from "components/ui/avatar";
import parse from 'html-react-parser';




/*
  Component for displaying the sneaker detail view. It's passed in props
  such as (sneaker) and (showactions). The showaction props is used to 
  determine whether the thumbs up and thumbs down icon will be displayed
  using a boolean variable. If true a logged in user will be able to like
  or dislike a post. If false, a user who is not logged in will not have
  this capability.

*/

const SneakerItem = ({ sneaker, showActions, auth, deleteSneaker, addLike, removeLike }) => {
  const findUserLike = (likes) => {
    if (likes.filter((like) => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const { isAuthenticated, user } = auth;

  const tags = sneaker.tags.map((tag, index) => (
    <div key={index} className="p-3">
      <i className="fa fa-check" /> {tag}
    </div>
  ));

  const editbtn = (
    <Link to={`/editsneaker/${sneaker._id}`} className="editbtn">
      <Icon color="#AADDFF" icon="pencil1" />
    </Link>
  );

  return (
    <React.Fragment>

      <div className="fullimageheader">
        <img src={sneaker.mainimage} alt="" />
      </div>

      <Panel className="userheader" frosted>

        <div className="left">
            <Avatar avatar={sneaker.user.avatar} />
          
        </div>

        <div className="middle">
          <h2 className="heading-2 sneaker-model">{sneaker.model}</h2>
          <h3 className="heading-3 sneaker-colorway">{sneaker.colorway}</h3>
          <h4 className="heading-4 sneaker-year">{sneaker.year}</h4>
        </div>

        <div className="right">
          <h2 className="heading-2 created-by">Created By</h2>
          <h3 className="heading-3 user-name">{sneaker.user.name}</h3>
          <h4 className="heading-4 posted-date">Posted {moment(sneaker.date).fromNow()}</h4>

          <div className="sneakeredit">{isAuthenticated && user.id === sneaker.user._id ? editbtn : ""}</div>
        </div>
      </Panel>

      <div className="pictures">
        {sneaker.subimage_1 ? (
          <div className="imgholder">
            <a data-fancybox="gallery" href={sneaker.subimage_1}>
              <img src={sneaker.subimage_1} alt="" />
            </a>
          </div>
        ) : (
          ""
        )}

        {sneaker.subimage_2 ? (
          <div className="imgholder">
            <a data-fancybox="gallery" href={sneaker.subimage_2}>
              <img src={sneaker.subimage_2} alt="" />
            </a>
          </div>
        ) : (
          ""
        )}

        {sneaker.subimage_3 ? (
          <div className="imgholder">
            <a data-fancybox="gallery" href={sneaker.subimage_3}>
              <img src={sneaker.subimage_3} alt="" />
            </a>
          </div>
        ) : (
          ""
        )}

        {sneaker.subimage_4 ? (
          <div className="imgholder">
            <a data-fancybox="gallery" href={sneaker.subimage_4}>
              <img src={sneaker.subimage_4} alt="" />
            </a>
          </div>
        ) : (
          ""
        )}

        {sneaker.subimage_5 ? (
          <div className="imgholder">
            <a data-fancybox="gallery" href={sneaker.subimage_5}>
              <img src={sneaker.subimage_5} alt="" />
            </a>
          </div>
        ) : (
          ""
        )}

        {sneaker.subimage_6 ? (
          <div className="imgholder">
            <a data-fancybox="gallery" href={sneaker.subimage_6}>
              <img src={sneaker.subimage_6} alt="" />
            </a>
          </div>
        ) : (
          ""
        )}
      </div>


      <Panel className="sneakerinfo">
        <div className="infoicon">
          <Icon color="#AADDFF" icon="info" />
        </div>

        <div id="theText" 
          className="sneakertext" 
        >
          {parse(sneaker.text)}
        </div>

          <PostInfo element={sneaker} showActions={showActions} auth={auth} addLike={addLike} removeLike={removeLike} />
       
        <Tags element={sneaker} />
      </Panel>



      {/* 
            Sub component for displaying links to sneakers that are related to the
            currently loaded posts. The related posts are determined by the tags prop
            which is used to query the database for posts that has any of the matching
            tags.
          */}

      <Panel className="related">
        <Related tags={sneaker.tags} sneakerId={sneaker} />
      </Panel>

    </React.Fragment>
  );
};

SneakerItem.defaultProps = {
  showActions: true,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export const View = connect(mapStateToProps, { deleteSneaker, addLike, removeLike, getCurrentProfile})(SneakerItem);