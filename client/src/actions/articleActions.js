import axios from "axios";

import {
    ARTICLE_LOADING,
    GET_ARTICLE,
    GET_ARTICLES,
    ADD_ARTICLE,
    GET_ERRORS,
    CLEAR_ERRORS,
    UNLIKE_ARTICLE,
    LIKE_ARTICLE,
    GET_ARTICLES_ADMIN,
} from './types';

import { setAlert } from "./alert";

// Add Article
export const addArticle = (articleData, history) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .post("/api/articles", articleData)
    .then((res) => {
      dispatch(
        {
          type: ADD_ARTICLE,
          payload: res.data,
        },
        history.push(`/article/${res.data._id}`)
      );
    })
    .catch((err) => {

        const errors = err.response.data;

        if (errors) {
          errors.forEach((error, index) => {
            dispatch(setAlert(error, "danger"));
          });
        }

      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Add Article
export const addNewRelease = (articleData, history) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .post("/api/articles/newrelease", articleData)
    .then((res) => {
      dispatch(
        {
          type: ADD_ARTICLE,
          payload: res.data,
        },
        // history.push(`/article/${res.data._id}`)
        dispatch(setAlert("New Release Created", "success"))
      );
    })
    .catch((err) => {

        const errors = err.response.data;

        if (errors) {
          errors.forEach((error, index) => {
            dispatch(setAlert(error, "danger"));
          });
        }

      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Get Articles
export const getArticles =
  (load = true) =>
  (dispatch) => {
    if (load) dispatch(setArticleLoading);
    axios
      .get("/api/articles")
      .then((res) =>
        dispatch({
          type: GET_ARTICLES,
          payload: res.data,
        })
      )
      .catch((err) =>
        dispatch({
          type: GET_ARTICLES,
          payload: null,
        })
      );
  };

  export const getArticlesAdmin =
  (load = true) =>
  (dispatch) => {
    if (load) dispatch(setArticleLoading);
    axios
      .get("/api/articles", {
        headers: {
          'Cache-Control': 'no-cache',
        },
      })
      .then((res) =>
        dispatch({
          type: GET_ARTICLES_ADMIN,
          payload: res.data,
        })
      )
      .catch((err) =>
        dispatch({
          type: GET_ARTICLES_ADMIN,
          payload: null,
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


// Edit Articles
export const editArticle = (id, articleData, history) => (dispatch) => {
  dispatch(setArticleLoading());
  axios
    .post(`/api/articles/${id}`, articleData)
    .then((res) => {
      dispatch({
        type: ADD_ARTICLE,
        payload: res.data,
      });

      dispatch(setAlert("Article Updated", "success"));
    })
    .catch((err) => {
      const errors = err.response.data;

      if (errors) {
        errors.forEach((error, index) => {
          dispatch(setAlert(error, "danger"));
        });
      }

      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Add Comment
export const addComment = (articleId, commentData) => (dispatch) => {
  dispatch(clearErrors());

  axios
    .post(`/api/articles/comment/${articleId}`, commentData)
    .then((res) =>
      dispatch({
        type: GET_ARTICLE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Delete Comment
export const deleteComment = (articleId, commentId) => (dispatch) => {
  axios.delete(`/api/articles/comment/${articleId}/${commentId}`).then((res) =>
    dispatch({
      type: GET_ARTICLE,
      payload: res.data,
    })
  );
  // .catch(err =>
  //   dispatch({
  //     type: GET_ERRORS,
  //     payload: err.response.data
  //   })
  // );
};

// Get the current article by id
export const getCurrentArticle = (id) => (dispatch) => {
  dispatch(setArticleLoading());
  axios
    .get(`/api/articles/${id}`)
    .then((res) =>
      dispatch({
        type: GET_ARTICLE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ARTICLE,
        payload: null,
      })
    );
};

// Like Version 
export const addLike = id => dispatch => {
  axios
    .post(`/api/articles/like/${id}`)
    .then(({ data }) => {
      dispatch({
        type: LIKE_ARTICLE,
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
    .post(`/api/articles/unlike/${id}`)
    .then(({ data }) => {
      dispatch({
        type: UNLIKE_ARTICLE,
        payload: data //pass in updated post
      });
    })
    .catch(({ response }) => {
      dispatch({
        type: GET_ERRORS,
        payload: response.data
      });
    });
}

/*
  Get articles that are related to currently loaded article
  the parameter that this takes is a csv list of tags
  and on the backend it will search for articles that has
  any of the matching tags
*/
export const getRelatedArticles = (tags) => (dispatch) => {
  // dispatch(setPostLoading());
  axios
    .get(`/api/articles/tags/${tags}`)
    .then((res) =>
      dispatch({
        type: GET_ARTICLES,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ARTICLE,
        payload: null,
      })
    );
};

// Profile loading
export const setArticleLoading = () => {
  return {
    type: ARTICLE_LOADING,
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
