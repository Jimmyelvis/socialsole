import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "components/common/Spinner";
import { getYourLikes } from "actions/profileActions";
import { TimelineCard } from "../DashBoardView/TimeLine/components/TimelineCard";


const Liked_Content = ({
  getYourLikes,
  profile: { profile, loading, youLiked },
}) => {

  const [yourLikes, setYourLikes] = useState([])


  useEffect(() => {
    getYourLikes();
  }, [getYourLikes]);

  useEffect(() => {
    if (youLiked) {
      setYourLikes(youLiked);
    }
  }, [youLiked]);

  let content;

  if (profile === null || loading) {
    content = <Spinner />
  } else {
    content = (
      <>
        {
          profile && yourLikes && yourLikes.map((liked) => {
            return (
              <TimelineCard 
                _id={liked._id}
                user={liked.user}
                model={liked.model}
                type={liked.type}
                colorway={liked.colorway}
                year={liked.year}
                headline={liked.headline}
                date={liked.date}
                text={liked.text}
                headerimage={liked.headerimage}
                mainimage={liked.mainimage}
              />
            )
          })
        }
      </>
    );
  }

  return (
    <div className="timeline-entries">
      {content}
    </div>
  )
}

const mapStateToProps = (state) => ({
  profile: state.profile,
});


export const LikedContent = connect(mapStateToProps, { getYourLikes })(Liked_Content);