import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../../common/TextAreaFieldGroup';
import { addComment } from '../../../actions/articleActions';
import CommentsSection from '../../common/CommentsSection'


const CommentForm = ({ articleId, addComment, auth, errors, handle }) => {

  const [text, setText] = useState('');
  const [msg, setMsg] = useState("");


 const onSubmit = (e) => {
    e.preventDefault();

    const { user } = auth;

    const newComment = {
      text: text,
      name: user.name,
      avatar: user.avatar,
      handle: handle
    };

    addComment(articleId, newComment);
    setText({ text: ''});
  }

  const onChange = (e) => {
    setText(e.target.value);
  }


  return (
   <CommentsSection  
      onSubmit={onSubmit} 
      text={text}
      onChange={onChange}
  />
  )

}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addComment })(CommentForm);

