import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Related from "./RelatedArticles";
import Icon from "components/icons/Icon";
import { FullImageHeader } from "components/ui/headers/fullImageHeader";
import { UserHeader } from "components/ui/headers/userHeader";
import { Avatar } from "components/ui/avatar";
import { Panel } from "components/ui/Panel";
import { getTimefromNow } from "utils/formatDate";
import parse from "html-react-parser";
import { ReactComponent as FaceBook } from 'assets/img/Facebook.svg';
import { ReactComponent as Twitter } from 'assets/img/Twitter.svg';
import { ReactComponent as Like } from 'assets/img/Liked.svg';
import { ReactComponent as NotLiked } from 'assets/img/not-liked.svg';
import { ReactComponent as Bookmark } from 'assets/img/bookmark.svg';
import { ReactComponent as Calender } from 'assets/img/calander.svg';
import { ReactComponent as Tag } from 'assets/img/price-tag.svg';
import { ReactComponent as Sneaker } from 'assets/img/sneaker.svg';
import { CommentButton } from "components/ui/buttons/CommentButton";
import Modal from "components/ui/Modal";
import { useModal } from "context/modalContext";
import CommentPanel from "components/ui/Comments/CommentPanel";
import { addComment, deleteComment } from "actions/articleActions";
import { getFormattedDate } from "utils/formatDate";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import isEmpty from "utils/is-empty";
import { deletePost, addLike, removeLike } from "actions/articleActions";
import { SaveOptions } from "components/ui/cards/components/SaveOptions";
import { useRef } from "react";
import { useSaveOptions } from "context/saveOptions";





/*
  Component for displaying the article detail view 
*/

const ArticleItem = ({ 
  article, 
  auth: { isAuthenticated, user }, 
  profile: { profile },
  addComment, deleteComment, 
  addLike, removeLike 
}) => {

  const { isModalOpen, openModal, openOverlay, isOverlayOpen, closeModal } = useModal();
  const { openMenu } = useSaveOptions();


  
   

  /**
 * Piece of state that will be used to determine, what component
 * that wil be rendered in the modal
 */
  const [modalTarget, setModalTarget] = useState(null);


  /*
    This will be used to determine what component called the modal
    this will be passed as a prop to the modal component, and the 
    modal context 
  */
  const [compOrigin, setCompOrigin] = useState(null);

  /**
   * Check what is the target state, then determine
   * what component should be rendered in the modal.
   */

  const checkTarget = () => {

    if (modalTarget === "comments modal") {
      return (
      <CommentPanel 
        comments={article.comments}
        elementId={article._id} 
        deleteComment={deleteComment}
        post={article}
        addComment={addComment}
      />
      );
    } else {
      return bookmarkPanel();
    }
  
  };

  const bookmarkPanel = () => {
    return (
      <Panel className="article-bookmark-panel">
        <SaveOptions
          itemId={article._id}
          type="article"
          useSavesList={profile?.lists}
        />
      </Panel>
    );
  };


  const openCommentModal = () => {
    const origin = "CommentButton";
    setModalTarget("comments modal");
    setCompOrigin(origin);
    openModal(origin);
  };


  const editbtn = (
    <Link to={`/articleedit/${article._id}`} className="editbtn">
      <Icon  icon="pencil1" className="icon icon-edit-article"/>
    </Link>
  );

  const findUserLike = (likes) => {

    if (likes.filter((like) => like.user === user?._id || like.user === user?.id).length > 0) {
      return true;
    } else {
      return false;
    }
  };
  

  return (
    <React.Fragment>
      <div className="article-grid">
        <Panel className="article-panel">
          <FullImageHeader image={article.fullheaderimage}>
            <div className="header-info">
              <h2 className="heading-2">{article.headline}</h2>

              <div className="author-info">
                <Avatar avatar={article.user && article.user.avatar} />

                <h3 className="heading-3">{article.user && article.user.name}</h3>

                <h4 className="heading-4">{getTimefromNow(article.date)}</h4>
              </div>
            </div>

            <div className="h4 heading-4">type: {article.newstype}</div>

          </FullImageHeader>

          <div className="content-body">
            <div className="articleedit">
              {
              (isAuthenticated && (user?._id || user.id)) === article?.user?._id ? 
              editbtn : ""
              }
            </div>

            <ul className="side-bar">
              {/* <li>
                <FaceBook className="icon-sidebar" />
              </li>

              <li>
                <Twitter className="icon-sidebar" />
              </li> */}

              <li>
                {
                  findUserLike(article?.likes) ? 
                  <Like className="icon-sidebar" 
                    onClick={() => removeLike(article._id)} 
                  />
                  : <NotLiked className="icon-sidebar" 
                      onClick={() => addLike(article._id)} 
                    />
                }
              </li>

              <li>
                {
                isAuthenticated && <Bookmark 
                    className="icon-sidebar"
                    onClick={() => {
                      const origin = "Bookmark";
                      setModalTarget("bookmark modal");
                      setCompOrigin(origin);
                      openModal(origin);
                      openMenu();
                    }}
                  /> 
                }
              </li>
            </ul>

            <div className="article-content">
              <div className="article-header-img">
                <img src={article.articleheaderimage} alt="" />
              </div>

              <div className="text">{parse(article.text)}</div>
            </div>

            {article.newstype === "release" ? (
              <ul className="release-details">
                <li>
                  <Calender className="icon icon-calender" />
                  <span className="heading-4">Release Date: </span>
                  {getFormattedDate(article.releaseDate)}
                </li>

                <li>
                  <Tag className="icon icon-tag" />
                  <span className="heading-4">Price: </span> ${article.price}
                </li>

                <li>
                  <Sneaker className="icon icon-sneaker" />
                  <span className="heading-4">Sizes: </span>
                  {article.sizeRun.map((size, index) => size + " ")}
                </li>
              </ul>
            ) : (
              ""
            )}

            <div className="article-tags">
              {article.tags.map((tag, index) => (
                <div className="tag">{tag}</div>
              ))}
            </div>

            <div className="author-details">
              <div className="left">
                <Avatar avatar={article.user && article.user.avatar} />
              </div>

              <div className="right">
                <h3 className="heading-3">{article.user && article.user.name}</h3>
                <h4 className="heading-4 job-title">Staff Writer</h4>
                <p className="text">
                  Location: <span className="location">{article.user?.profile?.location}</span>
                </p>

                <div className="bio">{parse(article.user?.profile?.bio)}</div>

                <div className="socials">
                  {isEmpty(article.user?.profile?.social?.facebook) ? null : (
                    <a href={`https://` + article.user?.profile?.social?.facebook} target="_blank">
                      <FaFacebook className="icon icon-list" style={{ fill: `url(#blue-gradient-${article.user?._id})` }} />

                      <svg width="0" height="0">
                        <linearGradient id={`blue-gradient-${article.user?._id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop stopColor="#9ED7FF" offset="0%" />
                          <stop stopColor="#3592D4" offset="100%" />
                        </linearGradient>
                      </svg>
                    </a>
                  )}

                  {isEmpty(article.user?.profile?.social?.twitter) ? null : (
                    <a href={`https://` + article.user?.profile?.social?.twitter} target="_blank">
                      <FaTwitter className="icon icon-list" style={{ fill: `url(#blue-gradient-${article.user?._id})` }} />

                      <svg width="0" height="0">
                        <linearGradient id={`blue-gradient-${article.user?._id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop stopColor="#9ED7FF" offset="0%" />
                          <stop stopColor="#3592D4" offset="100%" />
                        </linearGradient>
                      </svg>
                    </a>
                  )}

                  {isEmpty(article.user?.profile?.social?.instagram) ? null : (
                    <a href={`https://` + article.user?.profile?.social?.instagram} target="_blank">
                      <FaInstagram className="icon icon-list" style={{ fill: `url(#blue-gradient-${article.user?._id})` }} />

                      <svg width="0" height="0">
                        <linearGradient id={`blue-gradient-${article.user?._id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop stopColor="#9ED7FF" offset="0%" />
                          <stop stopColor="#3592D4" offset="100%" />
                        </linearGradient>
                      </svg>
                    </a>
                  )}

                  {isEmpty(article.user?.profile?.social?.youtube) ? null : (
                    <a href={`https://` + article.user?.profile?.social?.youtube} target="_blank">
                      <FaYoutube className="icon icon-list" style={{ fill: `url(#blue-gradient-${article.user?._id})` }} />

                      <svg width="0" height="0">
                        <linearGradient id={`blue-gradient-${article.user?._id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop stopColor="#9ED7FF" offset="0%" />
                          <stop stopColor="#3592D4" offset="100%" />
                        </linearGradient>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="related">
              <Related tags={article.tags} articleId={article} />
            </div>
          </div>
        </Panel>

        <CommentButton 
          elementId={article._id} 
          comments={article.comments.length} 
          likes={article.likes.length} 
          openComments={() => openCommentModal()}
          likeElement={addLike}
          unlikeElement={removeLike}
          likesArray={article.likes}
          user={user}
          isAuthenticated={isAuthenticated}
        />

        <Modal
          selector={"#modal"}
          overlayColor={`
        ${modalTarget === "search_overlay" ? "rgba(255, 255, 255, 0.95)" : "rgba(0,0,0,0.7)"}`}
          modalTarget={modalTarget}
          modalOrigin={compOrigin}
          delay={2000}
          noCloseBtn={true}
        >
          {checkTarget()}
        </Modal>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export const View = connect(mapStateToProps, { addComment, deleteComment, addLike, removeLike} )(ArticleItem);
