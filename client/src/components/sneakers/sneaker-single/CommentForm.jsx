import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextAreaFieldGroup from "../../common/TextAreaFieldGroup";
import { addComment } from "../../../actions/sneakerActions";
import { getCurrentProfile } from "../../../actions/profileActions";
import CommentsSection from "../../common/CommentsSection";
import { setAlert } from "../../../actions/alert";

const CommentForm = ({ addComment, handle, auth, profile: { profile }, sneakerId, setAlert }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  const onSubmit = (e) => {
    e.preventDefault();

    const { user } = auth;

    const newComment = {
      text: text,
      name: user.name,
      avatar: user.avatar,
      handle: handle,
    };

    addComment(sneakerId, newComment);
    setText("");
    setAlert("Comment Added", "success");
  };

  const onChange = (e) => {
    setText(e.target.value);
  };

  return <CommentsSection onSubmit={onSubmit} text={text} onChange={onChange} />;
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { addComment, getCurrentProfile, setAlert })(CommentForm);
