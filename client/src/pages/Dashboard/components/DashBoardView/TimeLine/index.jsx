import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "components/common/Spinner";
import { getCurrentProfile, deleteAccount, getTimeline } from "actions/profileActions";
import { TimelineCard } from "./components/TimelineCard";

/*
  We also need to make sure that the profile is not null, and that the profile is not loading before we try to set the timelineInfo state that will eventually be passed to the getTimeline function.

  We then need to make sure that the timelineInfo state has been set, and that the profile is not null, and that the profile is not loading before we try to call the getTimeline function.
*/

const Time_Line = ({getTimeline, profile: { profile, loading, timeline }, user}) => {

  const [timelineInfo, setTimelineInfo] = useState([]);


  /**
   * Check to see if profile exists, then set the timelineInfo state
   * with the friends array from the profile state
   */
  useEffect(() => {

    if (profile && profile.friends) {

      /**loop through profile.friends add to new array then add the profile object to that array */
      let newData = profile.friends.map((friend) => {
        return friend;
      });

      newData.push(profile);
  

      setTimelineInfo(newData);

    }
  }, [profile]);


  /**
   * If the timelineInfo state has been set, and the profile is not null, and the profile is not loading, then call the getTimeline action, to get the timeline for the user
   */
  useEffect(() => {
    if (timelineInfo && profile ) {
      getTimeline(timelineInfo);  
    }
  }, [getTimeline, timelineInfo]);



  let content;

  if (profile === null || loading) {
    content = <Spinner />
  } else {
    content = (
      <>
        {
          profile && timeline && timeline.map((timeline) => {
            return (
              <TimelineCard 
                _id={timeline._id}
                user={timeline.user}
                model={timeline.model}
                type={timeline.type}
                colorway={timeline.colorway}
                year={timeline.year}
                headline={timeline.headline}
                date={timeline.date}
                text={timeline.text}
                headerimage={timeline.headerimage}
                mainimage={timeline.mainimage}
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
  );
 
  
}

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export const TimeLine = connect(mapStateToProps, { getTimeline, getCurrentProfile })(Time_Line);