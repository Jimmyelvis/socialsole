import React from 'react'
import { connect } from "react-redux";
import { Avatar } from 'components/ui/avatar';
import { Button } from 'components/ui/buttons';
import { AiFillCloseCircle } from "react-icons/ai";

 const CommentItem = ({ auth, elementId, comment, deleteComment }) => {


   return (
     <div className="commentBody">
       <div className="commentAvatar">
          <Avatar avatar={comment.avatar} />
         <br />
         <p className="commentName">{comment.name}</p>
       </div>
       <div className="commentText">
         <p>{comment.text}</p>

         {comment.user === auth.user.id ? (

            <AiFillCloseCircle
              className='btn-delete'
              onClick={() => deleteComment(elementId, comment._id)}
            />
         ) : null}
       </div>
     </div>
   );
 };

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(CommentItem);
