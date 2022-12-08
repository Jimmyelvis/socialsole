import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import TextAreaFieldGroup from "components/common/TextAreaFieldGroup";
import { addComment } from "actions/postActions";
import { getCurrentProfile } from "actions/profileActions";
import { setAlert } from "actions/alert";
import { Button } from "components/Buttons";

const CommentForm = ({ addComment, auth, profile: { profile }, postId, setAlert }) => {
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
      avatar: profile.user.avatar,
    };

    addComment(postId, newComment);
    setText("");
    setAlert("Comment Added", "success");
  };

  const onChange = (e) => {
    setText(e.target.value);
  };


  return (
    <React.Fragment>
      <div className="commentsheader">Submit a comment...</div>
      <form className="commentForm" onSubmit={onSubmit}>
        <div className="form-group">
          <TextAreaFieldGroup placeholder="Reply to  post" name="text" value={text} onChange={onChange} />
        </div>

        <Button
          primary
        >
          Submit
        </Button>
      </form>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors,
});

export default connect(mapStateToProps, { addComment, getCurrentProfile, setAlert })(CommentForm);
