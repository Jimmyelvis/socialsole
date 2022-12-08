import React from 'react'

export const index = ({ findUserLike, element, showActions, addLike, removeLike }) => {

  /* For loggedin users with a profile */
  const authUsers = () => {
    return (
      <React.Fragment>
        <div className="likes" onClick={() => addLike(element._id)}>
          {findUserLike(element.likes) ? <Icon color="#AADDFF" icon="thumbsup" className="thumbs" /> : <Icon color="#5D789F" icon="thumbsup" className="thumbs" />}

          <h3 className="heading-3">{element.likes.length}</h3>
        </div>

        <div className="unlikes" onClick={() => removeLike(element._id)}>
          <Icon color="#5D789F" icon="thumbsdown" className="thumbs" />
        </div>

        <div className="commentsnumber">
          <div className="commenticon">
            <Icon color="#AADDFF" icon="bubbles2" className="bubbles" />
          </div>

          <h3 className="heading-3">{element.comments.length}</h3>
        </div>
      </React.Fragment>
    );
  };

  /* For non loggedin users, or users without a profile */
  const nonAuthUsers = () => {
    return (
      <React.Fragment>
        <div className="likes">
          <Icon color="#5D789F" icon="thumbsup" className="thumbs" />

          <h3 className="heading-3">{element.likes.length}</h3>
        </div>

        <div className="commentsnumber">
          <div className="commenticon">
            <Icon color="#AADDFF" icon="bubbles2" className="bubbles" />
          </div>

          <h3 className="heading-3">{element.comments.length}</h3>
        </div>
      </React.Fragment>
    );
  };

  return (
    <div className="actions">
      {/*
        If the showactions prop that is passed in equals true
        this will be rendered in view
      */}

      {showActions ? authUsers() : nonAuthUsers()}
    </div>
  );
}
