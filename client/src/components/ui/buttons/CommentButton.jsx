import React, { useState, useEffect } from 'react';
import { Panel } from '../Panel';
import { FaComment } from 'react-icons/fa';
import { AiFillLike } from 'react-icons/ai';
import { ReactComponent as NotLiked } from 'assets/img/Not-liked-Icon ionic-md-thumbs-up.svg';
import { ReactComponent as Liked } from 'assets/img/Liked-Icon ionic-md-thumbs-up.svg';
import { LikedContent } from 'pages/Dashboard/components/LikedContent';

export const CommentButton = ({
  likes,
  comments,
  openComments,
  likeElement,
  unlikeElement,
  likesArray,
  user,
  elementId,
  isAuthenticated
}) => {
  const [userLiked, setUserLiked] = useState(false);

  const findUserLike = () => {

    return likesArray?.some((like) => like.user === user?._id || like.user === user?.id);
  
  };

  useEffect(() => {
       setUserLiked(findUserLike());
  }, [likesArray, user]);

  const handleLikeClick = () => {
    if (userLiked) {
      unlikeElement(elementId);
      setUserLiked(false);
    } else {
      likeElement(elementId);
      setUserLiked(true);
    }
  };


  return (
    <Panel className="comment-btn">
      <div className="col likes">
        {userLiked ? (
          <Liked onClick={handleLikeClick} />
        ) : (
          <NotLiked onClick={handleLikeClick} />
        )}
        <span className="number">{likes}</span>
      </div>
      <div className="col comments">
        <FaComment onClick={openComments} />
        <span className="number">{comments}</span>
      </div>
    </Panel>
  );
};
