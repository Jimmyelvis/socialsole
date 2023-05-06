import React from "react";
import { connect } from "react-redux";
import { Avatar } from "components/ui/avatar";
import { Button } from "components/ui/buttons";
import { getTimefromNow } from "utils/formatDate";
import { AiFillCloseCircle } from "react-icons/ai";

const CommentItem = ({ auth, elementId, comment, deleteComment }) => {
  return (
    <div className="commentBody" key={comment._id}>
      <Avatar avatar={comment.avatar} />

      <div className="name-date">
        <p className="commentName">{comment.name}</p>
        <p className="commentDate">{getTimefromNow(comment.date)}</p>
      </div>

      <div className="commentText">
        <p>{comment.text}</p>
      </div>

      {
        comment?.user === auth?.user?._id 
        ? 
        <AiFillCloseCircle 
          className="btn-delete-comment" 
          onClick={() => deleteComment(elementId, comment._id)} 
        /> 
        : 
        (
         ""
        )
      }
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(CommentItem);
