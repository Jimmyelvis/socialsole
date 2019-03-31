import axios from 'axios';


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
export const addPost = postData => dispatch => {
  dispatch(clearErrors());

  axios    
  .post('/api/posts', postData)
  .then(res =>
    dispatch({
      type: ADD_POST,
      payload: res.data
    },
    console.log(res.data)
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

// Get Posts

// export const getPosts = () => dispatch => {
//   dispatch(setPostLoading());
//   axios    
//   .get('/api/posts')
//   .then(res =>
//     dispatch({
//       type: GET_POSTS,
//       payload: res.data
//     })
//   )
//   .catch(err =>
//     dispatch({
//       type: GET_POSTS,
//       payload: null
//     })
//   );
// }

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

// Add Like
// export const addLike = id => dispatch => {

//   axios    
//   .post(`/api/posts/like/${id}`)
//   .then(res => dispatch(getPosts()))
//   .catch(err =>
//     dispatch({
//       type: GET_ERRORS,
//       payload: err.response.data
//     })
//   );
// }

//Add Like Version 2
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
// export const removeLike = id => dispatch => {
//   axios
//     .post(`/api/posts/unlike/${id}`)
//     .then(res => dispatch(getPosts()))
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//     );
// };

//Remove Like Version 2
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