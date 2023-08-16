import React, { useEffect, useState } from 'react'
import { Panel } from '../Panel'
import { Avatar } from '../avatar'
import { connect } from "react-redux";
import CommentItem from "components/features/comments/CommentItem";
import CommentForm from "components/features/comments/CommentForm";




const CommentPanel = ({ comments,  deleteComment, auth: {
  isAuthenticated, user
}, elementId, addComment}) => {

  const [panelClass, setPanelClass] = useState(null)
  const [commentListClass, setCommentListClass] = useState(null)


  useEffect(() => {
    
  let panelTimer =  setTimeout(() => {
      setPanelClass('slideIn')
      
      var commentListTimer = setTimeout(() => {
        setCommentListClass('fadeIn')
      }, 500);

    }, 1500);
  
    return () => {
      
      clearTimeout(panelTimer)
      // clearTimeout(commentListTimer)
      setPanelClass(null)
      setCommentListClass(null)
    }
  }, [])

  const getComments = () => {

    if (comments.length > 0) {
      return comments
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map((comment, index) => {
        return (
          <CommentItem 
            key={comment._id} 
            comment={comment} 
            elementId={elementId} 
            deleteComment={deleteComment}
          />
        );
      })
    } else {
      return (
        <div className="comment">
          <div className="comment-body">
            <p>No comments yet</p>
          </div>
        </div>
      )
    }
  
    
  }
  


  return (
    <div className="comment-overlay-container">
      
      <Panel className={`comment-panel ${panelClass}`}>

        {
          isAuthenticated && <CommentForm elementId={elementId} addComment={addComment} />
        }

        
        
        <div className={`comment-list ${commentListClass}`}>
          {
           getComments() 
          }

       
   
        </div>

      </Panel>

    </div>
  )
}


const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
)(CommentPanel);
