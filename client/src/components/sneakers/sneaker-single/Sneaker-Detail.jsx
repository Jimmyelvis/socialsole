import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import PropTypes from "prop-types";
import Related from "./RelatedSneakers";
import { Link } from "react-router-dom";
import { deleteSneaker, addLike, removeLike } from "../../../actions/sneakerActions";
import Moment from "react-moment";
import { getCurrentProfile } from "../../../actions/profileActions";
import Icon from "../../icons/Icon"

/*
  Component for displaying the sneaker detail view. It's passed in props
  such as (sneaker) and (showactions). The showaction props is used to 
  determine whether the thumbs up and thumbs down icon will be displayed
  using a boolean variable. If true a logged in user will be able to like
  or dislike a post. If false, a user who is not logged in will not have
  this capability.

*/

class SneakerItem extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick(id) {
    this.props.deleteSneaker(id);
  }

  onLikeClick(id) {
    this.props.addLike(id);
  }

  onUnlikeClick(id) {
    this.props.removeLike(id);
  }

  findUserLike(likes) {
    const { auth } = this.props;


    if (likes.filter((like) => like.user === auth.user.id).length > 0) {
    
      return true;
    } else {

      return false;
    }

    
  }

  render() {
    const { profile } = this.props.profile;
    const { isAuthenticated, user } = this.props.auth;
    const { sneaker, auth, showActions } = this.props;

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

    if (!profile) {
      return null;
    }

    return (
      <React.Fragment>
        <div className="sneakerdetail">
          <div className="fullimageheader">
            <img src={sneaker.mainimage} alt="" />
            <div className="overlay"></div>

            <div className="heading">
              <h1 className="heading-1">{sneaker.model}</h1>
              <h2 className="heading-2">{sneaker.colorway}</h2>
              <h3 className="heading-3">{sneaker.year}</h3>

              <div className="btn btn-lightblue">Read More</div>
            </div>
          </div>

          <div className="container">
            <div className="sneakerinfo contentbody">
              <div className="infoicon">
                <Icon color="#AADDFF" icon="info" />
              </div>

              <div
                  id="theText"
                  className="sneakertext"
                  dangerouslySetInnerHTML={{ __html: sneaker.text }}
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
                      onClick={this.onLikeClick.bind(this, sneaker._id)}
                    >
                      {
                        this.findUserLike(sneaker.likes) ? 
                        (
                            <Icon color="#AADDFF" icon="thumbsup" className="thumbs" />
                        ) : 
                        (
                            <Icon color="#5D789F" icon="thumbsup" className="thumbs"  />
                        )
                      }

                      <h3 className="heading-3">{sneaker.likes.length}</h3>

                    </div>

                    <div 
                      className="unlikes"
                      onClick={this.onUnlikeClick.bind(this, sneaker._id)}
                    >
                        <Icon color="#5D789F" icon="thumbsdown" className="thumbs" />

                    </div>

                    <div className="commentsnumber">

                      <div className="commenticon">
                        <Icon color="#AADDFF" icon="bubbles2" className="bubbles" />
                      </div>

                      <h3 className="heading-3">{sneaker.comments.length}</h3>

                    </div>
            
                 
                                      
                  </React.Fragment>
                ) : null}
              </div>

            </div>

            <div className="pictures">

              {
                sneaker.subimage_1 ? (
                  <div className="imgholder">
                    <a data-fancybox="gallery" href={sneaker.subimage_1}>
                      <img src={sneaker.subimage_1} alt="" />
                    </a>
                  </div>
                ) : ("")
              }

              {
                sneaker.subimage_2 ? (
                  <div className="imgholder">
                    <a data-fancybox="gallery" href={sneaker.subimage_2}>
                      <img src={sneaker.subimage_2} alt="" />
                    </a>
                  </div>
                ) : ("")
              }

              {
                sneaker.subimage_3 ? (
                  <div className="imgholder">
                    <a data-fancybox="gallery" href={sneaker.subimage_3}>
                      <img src={sneaker.subimage_3} alt="" />
                    </a>
                  </div>
                ) : ("")
              }

              {
                sneaker.subimage_4 ? (
                  <div className="imgholder">
                    <a data-fancybox="gallery" href={sneaker.subimage_4}>
                      <img src={sneaker.subimage_4} alt="" />
                    </a>
                  </div>
                ) : ("")
              }


              {
                sneaker.subimage_5 ? (
                  <div className="imgholder">
                    <a data-fancybox="gallery" href={sneaker.subimage_5}>
                      <img src={sneaker.subimage_5} alt="" />
                    </a>
                  </div>
                ) : ("")
              }

              {
                sneaker.subimage_6 ? (
                  <div className="imgholder">
                    <a data-fancybox="gallery" href={sneaker.subimage_6}>
                      <img src={sneaker.subimage_6} alt="" />
                    </a>
                  </div>
                ) : ("")
              }

              
            </div>

            <div className="userheader contentbody">

              <div className="left">
                <div className="imgholder">
                  <img
                    src={ sneaker.user.avatar }
                    alt=""
                  />
                </div>
              </div>

              <div className="right">
                <h4 className="heading-4">Created By</h4>
                <h3 className="heading-3">{ sneaker.user.name }</h3>
                <h5 className="heading-5">
                  Posted <Moment format="MM/DD/YYYY">{sneaker.date}</Moment>
                </h5>

                <div className="sneakeredit">
                  {isAuthenticated && user.id === sneaker.user._id
                    ? editbtn
                    : ""}
                </div>
              </div>

             

            </div>

            {
          /* 
            Sub component for displaying links to sneakers that are related to the
            currently loaded posts. The related posts are determined by the tags prop
            which is used to query the database for posts that has any of the matching
            tags.
          */
          }

            <div className="related contentbody">
              <Related tags={sneaker.tags} sneakerId={sneaker} />
            </div>

          </div>

        </div>
        
      </React.Fragment>
    );
  }
}

SneakerItem.defaultProps = {
  showActions: true,
};

SneakerItem.propTypes = {
  deleteSneaker: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  sneaker: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  deleteSneaker,
  addLike,
  removeLike,
  getCurrentProfile,
})(SneakerItem);
