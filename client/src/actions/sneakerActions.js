import axios from 'axios';


import {
  ADD_SNEAKER,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_SNEAKERS,
  GET_SNEAKER,
  DELETE_SNEAKER,
  SNEAKER_LOADING,
  LIKE_SNEAKER
} from './types';


// Add Sneaker
export const addSneaker = sneakerData => dispatch => {
  dispatch(clearErrors());

  axios    
  .post('/api/sneakers', sneakerData)
  .then(res =>
    dispatch({
      type: ADD_SNEAKER,
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

// export const getSneakers = () => dispatch => {
//   dispatch(setSneakerLoading());
//   axios    
//   .get('/api/sneakers')
//   .then(res =>
//     dispatch({
//       type: GET_SNEAKERS,
//       payload: res.data
//     })
//   )
//   .catch(err =>
//     dispatch({
//       type: GET_SNEAKERS,
//       payload: null
//     })
//   );
// }

// Get Sneakers

export const getSneaker = (id) => dispatch => {
  dispatch(setSneakerLoading());
  axios    
  .get(`/api/sneakers/${id}`)
  .then(res =>
    dispatch({
      type: GET_SNEAKER,
      payload: res.data
    })
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