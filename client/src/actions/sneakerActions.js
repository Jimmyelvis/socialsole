import axios from 'axios';
import { setAlert } from "./alert";


import {
  ADD_SNEAKER,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_SNEAKERS,
  GET_SNEAKER,
  DELETE_SNEAKER,
  SNEAKER_LOADING,
  LIKE_SNEAKER,
  GET_SNEAKERS_ADMIN
} from './types';


// Add Sneaker
export const addSneaker = (sneakerData,history) => dispatch => {
  dispatch(clearErrors());

  axios    
  .post('/api/sneakers', sneakerData)
  .then(res =>
    dispatch({
      type: ADD_SNEAKER,
      payload: res.data
    },
      history.push(`/sneaker/${res.data._id}`)
    )
  )
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
}

// Get Sneakers
export const getSneakers = (load = true) => (dispatch) => {
	if (load) dispatch(setSneakerLoading);
	axios
		.get('/api/sneakers')
		.then((res) =>
			dispatch({
				type: GET_SNEAKERS,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_SNEAKERS,
				payload: null
			})
		);
};

/* Get Sneakers - A slightly different version from
  above, this one is used for the admin page, and disables
  caching so that the admin page can see the latest changes
  to the database
*/
export const getSneakersAdmin = (load = true) => (dispatch) => {
	if (load) dispatch(setSneakerLoading);
	axios
    .get('/api/sneakers', {
      headers: {
        'Cache-Control': 'no-cache',
      },
    })
		.then((res) =>
			dispatch({
				type: GET_SNEAKERS_ADMIN,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_SNEAKERS_ADMIN,
				payload: null
			})
		);
};

// Get Top Sneakers By Most Likes
export const getLikedSneakers = (load = true) => (dispatch) => {
	if (load) dispatch(setSneakerLoading);
	axios
		.get('/api/sneakers/mostliked')
		.then((res) =>
			dispatch({
				type: GET_SNEAKERS,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_SNEAKERS,
				payload: null
			})
		);
};

/*
  Get sneakers that are related to currently loaded sneaker
  the parameter that this takes is a csv list of tags
  and on the backend it will search for sneakers that has
  any of the matching tags
*/
export const getRelatedSneakers = (tags) => dispatch => {
  // dispatch(setPostLoading());
  axios    
  .get(`/api/sneakers/tags/${tags}`)
  .then(res =>
    dispatch({
      type: GET_SNEAKERS,
      payload: res.data
    })
  )
  .catch(err =>
    dispatch({
      type: GET_SNEAKERS,
      payload: null
    })
  );
}

// Edit a sneaker
export const editSneaker = (id, sneakerData, history) => dispatch => {
  dispatch(setSneakerLoading());
  axios    
  .post(`/api/sneakers/${id}`, sneakerData)
  .then(res => {
    dispatch({
      type: ADD_SNEAKER,
      payload: res.data
    })
      dispatch(setAlert("Sneaker Info Updated", "success"));
    } 
  )
  .catch(err =>
    dispatch({
      type: GET_SNEAKER,
      payload: null
    })
  );
}


/*
  Gets a list of sneakers that's been posted by a specific user
*/
export const getSneakersByUser = (id) => dispatch => {

  axios
    .get(`/api/sneakers/user/${id}`)
    .then(res =>
      dispatch({
        type: GET_SNEAKERS,
        payload: res.data
      })
     )
     .catch(err =>
      dispatch({
        type: GET_SNEAKERS,
        payload: null
      })
    );

}


// Get Sneakers
export const getSneaker = (id) => dispatch => {
  dispatch(setSneakerLoading());
  axios    
  .get(`/api/sneakers/${id}`)
  .then(res =>
    dispatch({
      type: GET_SNEAKER,
      payload: res.data
      },
    )
  )
  .catch(err =>
    dispatch({
      type: GET_SNEAKER,
      payload: null
    })
  );
}

// Delete Sneaker
export const deleteSneaker = id => dispatch => {

  axios    
  .delete(`/api/sneakers/${id}`)
  .then(res =>
    dispatch({
      type: DELETE_SNEAKER,
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
export const addLike = id => dispatch => {

  axios    
  .post(`/api/sneakers/like/${id}`)
  .then(({ data }) => {
    dispatch({
      type: LIKE_SNEAKER,
      payload: data //pass in updated post
    });
  })
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
}

// Remove Like
export const removeLike = id => dispatch => {
  axios
    .post(`/api/sneakers/unlike/${id}`)
    .then(({ data }) => {
      dispatch({
        type: LIKE_SNEAKER,
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
export const addComment = (sneakerId, commentData) => dispatch => {
  dispatch(clearErrors());

  axios    
  .post(`/api/sneakers/comment/${sneakerId}`, commentData)
  .then(res =>
    dispatch({
      type: GET_SNEAKER,
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

// Delete Comment
export const deleteComment = (sneakerId, commentId) => dispatch => {
  axios
    .delete(`/api/sneakers/comment/${sneakerId}/${commentId}`)
    .then(res =>
      dispatch({
        type: GET_SNEAKER,
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

export const editFeatured = (
  prevPostId, nextPostId, nextPostPosNumber, type
  ) => dispatch => {

  const data = {
    prevPostId,
    nextPostId,
    nextPostPosNumber,
    type
  }

  console.log("data", data);

  axios
    .post(`/api/admin/editfeatureditems`, data)
    .then(res =>
      // dispatch({
      //   type: GET_POSTS,
      //   payload: res.data
      // })
      dispatch(setAlert(res.data.msg, "success"))
    )
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    });
}

// Set loading state
export const setSneakerLoading = () => {
  return {
    type: SNEAKER_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};