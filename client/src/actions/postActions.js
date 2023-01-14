import axios from 'axios';
import { setAlert } from "./alert";



import {
  ADD_POST,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_POSTS,
  GET_POST,
  POST_LOADING,
  DELETE_POST,
  LIKE_POST
} from './types';


// Add Post
export const addPost = (postData, history) => dispatch => {
  dispatch(clearErrors());

  axios    
  .post('/api/posts', postData)
  .then(res =>
    dispatch({
      type: ADD_POST,
      payload: res.data
    },
    history.push(`/post/${res.data._id}`)
  )
  )
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
}

// Get Posts
export const getPosts = (load = true) => (dispatch) => {
	if (load) dispatch(setPostLoading);
	axios
		.get('/api/posts')
		.then((res) =>
			dispatch({
				type: GET_POSTS,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_POSTS,
				payload: null
			})
		);
};

/*
  Get posts that are related to currently loaded post
  the parameter that this takes is a csv list of tags
  and on the backend it will search for posts that has
  any of the matching tags
*/

export const getRelatedPosts = (tags) => dispatch => {
  // dispatch(setPostLoading());
  axios    
  .get(`/api/posts/tags/${tags}`)
  .then(res =>
    dispatch({
      type: GET_POSTS,
      payload: res.data
    })
  )
  .catch(err =>
    dispatch({
      type: GET_POST,
      payload: null
    })
  );
}


// Get Posts
export const getPost = (id) => dispatch => {
  dispatch(setPostLoading());
  axios    
  .get(`/api/posts/${id}`)
  .then(res => 
    dispatch({
      type: GET_POST,
      payload: res.data
    })
  )
  .catch(err =>
    dispatch({
      type: GET_POST,
      payload: null
    })
  );
}

// Edit Posts
export const editPost = (id, postData, history) => dispatch => {
  dispatch(setPostLoading());
  axios    
  .post(`/api/posts/${id}`, postData)
  .then(res => {
    dispatch({
      type: ADD_POST,
      payload: res.data
    })

    dispatch(setAlert("Post Updated", "success"));
    
  }
  )
  .catch(err =>
    dispatch({
      type: GET_POST,
      payload: null
    })
  );
}

/*
  Get a list of posts that has been posted a specific person
  using the user id 
*/
export const getPostsByUser = (id) => dispatch => {
  axios
    .get(`/api/posts/user/${id}`)
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
     )
     .catch(err =>
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    );

}

// Delete Post
export const deletePost = id => dispatch => {
  axios    
  .delete(`/api/posts/${id}`)
  .then(res =>
    dispatch({
      type: DELETE_POST,
      payload: id
    })
  )
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );

}


// Like Version 
export const addLike = id => dispatch => {
  axios
    .post(`/api/posts/like/${id}`)
    .then(({ data }) => {
      dispatch({
        type: LIKE_POST,
        payload: data //pass in updated post
      });
    })
    .catch(({ response }) => {
      dispatch({
        type: GET_ERRORS,
        payload: response.data
      });
    });
};



// Remove Like 
export const removeLike = id => dispatch => {
  axios
    .post(`/api/posts/unlike/${id}`)
    .then(({ data }) => {
      dispatch({
        type: LIKE_POST,
        payload: data //pass in updated post
      });
    })
    .catch(({ response }) => {
      dispatch({
        type: GET_ERRORS,
        payload: response.data
      });
    });
};

// Add Comment
export const addComment = (postId, commentData) => dispatch => {
  dispatch(clearErrors());

  axios    
  .post(`/api/posts/comment/${postId}`, commentData)
  .then(res =>
    dispatch({
      type: GET_POST,
      payload: res.data
    })
  )
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
}

// Delete Comment
export const deleteComment = (postId, commentId) => dispatch => {
  axios
    .delete(`/api/posts/comment/${postId}/${commentId}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set loading state
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};