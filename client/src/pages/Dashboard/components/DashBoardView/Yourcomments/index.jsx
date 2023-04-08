import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "components/common/Spinner";
import { getCurrentProfile, deleteAccount, getYourComments } from "actions/profileActions";
import { YourCommentsCard } from "./components/YourCommentsCard";

export const Your_Comments = ({
  profile: { profile, loading, timeline, yourComments }, 
  user,
  getYourComments
}) => {

  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (profile && profile.user) {
      getYourComments(profile.user._id);
    }
  }, [profile])

  useEffect(() => {
    
    if (yourComments) {
      setComments(yourComments)
    }
  }, [yourComments, comments])
  
  let content;

  if (profile === null || loading) {
    content = <Spinner />
  } else {
    content = (
      comments.map((comment) => {
        return <YourCommentsCard key={comment._id} yourComments={comment} />
      })
    )
  }

  return (
    <div className="your-comments">
      {content}
    </div>
  )
}

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export const YourComments = connect(mapStateToProps, { getYourComments })(Your_Comments);
