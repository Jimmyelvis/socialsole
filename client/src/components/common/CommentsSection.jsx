import React from 'react'
import TextAreaFieldGroup from './TextAreaFieldGroup'

const CommentsSection = ({errors, onSubmit, text, onChange}) => {
  return (
    <React.Fragment>
      <div className="commentsheader">Make a comment...</div>
      <form className="commentForm" onSubmit={onSubmit}>
        <div className="form-group">
          <TextAreaFieldGroup
            placeholder="Reply to  post"
            name="text"
            value={text}
            onChange={onChange}
            error={errors.text}
          />
        </div>
  
        <button type="submit" className="btn btn-lightblue ">
          Submit
        </button>
      </form>
    </React.Fragment>
  );
}

export default CommentsSection;