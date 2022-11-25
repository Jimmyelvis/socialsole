import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../../common/TextAreaFieldGroup';
import { addComment } from '../../../actions/postActions';
import { getCurrentProfile } from '../../../actions/profileActions';
import { setAlert } from '../../../actions/alert';
import CommentsSection from "../../common/CommentsSection";






const CommentForm = ({ addComment, auth, profile: { profile }, postId, errors, setAlert }) => {

  const [text, setText] = useState('');

  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

 

  const onSubmit = (e) => {
    e.preventDefault();

    const { user } = auth;


    const newComment = {
      text: text,
      name: user.name,
      avatar: profile.user.avatar
    };

    addComment(postId, newComment);
    setText('');
    setAlert('Comment Added', 'success');
  }

  const onChange = (e) => {

    setText(e.target.value);
  }


  return <CommentsSection onSubmit={onSubmit} text={text} onChange={onChange} />;
  
 
}


const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { addComment, getCurrentProfile, setAlert })(CommentForm);
