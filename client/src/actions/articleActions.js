import axios from "axios";

import {
  ARTICLE_LOADING,
  GET_ARTICLE,
  GET_ARTICLES,
  ADD_ARTICLE,
  GET_ERRORS,
  CLEAR_ERRORS,
} from "./types";


// Add Post
export const addArticle = (articleData, history) => dispatch => {
  dispatch(clearErrors());
  axios    
  .post('/api/articles', articleData)
  .then(res =>{
      dispatch({
        type: ADD_ARTICLE,
        payload: res.data
      },
      history.push(`/article/${res.data._id}`)
    )
  })
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
}

// Get Articles
export const getArticles = (load = true) => (dispatch) => {
	if (load) dispatch(setArticleLoading);
	axios
		.get('/api/articles')
		.then((res) =>
			dispatch({
				type: GET_ARTICLES,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_ARTICLES,
				payload: null
			})
		);
};

// Edit Articles
export const editArticle = (id, articleData, history) => dispatch => {
  dispatch(setArticleLoading());
  axios    
  .post(`/api/articles/${id}`, articleData)
  .then(res =>
    dispatch({
      type: ADD_ARTICLE,
      payload: res.data
    },
    history.push(`/article/${id}`)
    )
  )
  .catch(err =>
    dispatch({
      type: GET_ARTICLE,
      payload: null
    })
  );
}

// Add Comment
export const addComment = (articleId, commentData) => dispatch => {
  dispatch(clearErrors());

  axios    
  .post(`/api/articles/comment/${articleId}`, commentData)
  .then(res =>
    dispatch({
      type: GET_ARTICLE,
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
export const deleteComment = (articleId, commentId) => dispatch => {
  axios
    .delete(`/api/articles/comment/${articleId}/${commentId}`)
    .then(res =>
      dispatch({
        type: GET_ARTICLE,
        payload: res.data
      })
    )
    // .catch(err =>
    //   dispatch({
    //     type: GET_ERRORS,
    //     payload: err.response.data
    //   })
    // );
};

// Get the current article by id
export const getCurrentArticle = (id) => dispatch => {
  dispatch(setArticleLoading());
  axios
    .get(`/api/articles/${id}`)
    .then(res =>
      dispatch({
        type: GET_ARTICLE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ARTICLE,
        payload: null
      })
    );
};


/*
  Get articles that are related to currently loaded article
  the parameter that this takes is a csv list of tags
  and on the backend it will search for articles that has
  any of the matching tags
*/
export const getRelatedArticles = (tags) => dispatch => {
  // dispatch(setPostLoading());
  axios    
  .get(`/api/articles/tags/${tags}`)
  .then(res =>
    dispatch({
      type: GET_ARTICLES,
      payload: res.data
    })
  )
  .catch(err =>
    dispatch({
      type: GET_ARTICLE,
      payload: null
    })
  );
}


// Profile loading
export const setArticleLoading = () => {
  return {
    type: ARTICLE_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};