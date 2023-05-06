import React, { useState, useEffect } from 'react'
import Spinner from "components/common/Spinner";
import { CardPost } from "components/ui/cards/CardPost";
import useFadeIn from "hooks/useFadin";


export const Trending = ({ 
  post: { posts, loading },
  profile
}) => {
  let mostLiked;
  let mostCommented;

  const [style, isVisible , setIsVisible] = useFadeIn(2000);

 
  useEffect(() => {
    setIsVisible(true);

  }, []);

  if (posts) {
    if (posts === null || loading) {
      <Spinner />;
    } else {
      mostLiked = (
        <React.Fragment>
          {posts
            .sort((a, b) => b.likes.length - a.likes.length)
            .slice(0, 5)
            .map((post) => {
              return (
                <CardPost
                  id={post._id}
                  author={post.user}
                  date={post.date}
                  headline={post.headline}
                  excerpt={post.text}
                  likesNumber={post.likes.length}
                  commentsNumber={post.comments.length}
                  postImage={post.headerimage}
                  useSavesList={profile && profile.lists}
                  contentId={post._id}
                />
              );
            })}
        </React.Fragment>
      );

      mostCommented = (
        <React.Fragment>
          {posts
            .sort((a, b) => b.comments.length - a.comments.length)
            .slice(0, 5)
            .map((post) => {
              return (
                <CardPost
                  id={post._id}
                  author={post.user}
                  date={post.date}
                  headline={post.headline}
                  excerpt={post.text}
                  likesNumber={post.likes.length}
                  commentsNumber={post.comments.length}
                  postImage={post.headerimage}
                  useSavesList={profile && profile.lists}
                  contentId={post._id}
                />
              );
            })}
        </React.Fragment>
      );
    }
  }

  return (
    <div className="trending" style={style} >
      <div className="pageheading">
        <h2 className="heading-2">Trending</h2>
      </div>

        <div className="most-liked">

          <h3 className="heading-3">Most Liked</h3>
          {mostLiked}
        </div>

        <div className="most-commented">
          <h3 className="heading-3">Most Commented</h3>
          {mostCommented}
        </div>
    
    </div>
  );
};
