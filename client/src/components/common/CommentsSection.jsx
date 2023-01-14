import React from 'react'
import TextAreaFieldGroup from '../ui/Forms/TextAreaFieldGroup'

const CommentsSection = ({onSubmit, text, onChange}) => {
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