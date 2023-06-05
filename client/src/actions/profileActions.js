import axios from "axios";
import { setAlert } from "./alert";

import {
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_LOADING,
    CLEAR_CURRENT_PROFILE,
    GET_ERRORS,
    SET_CURRENT_USER,
    CLEAR_ERRORS,
    GET_TIMELINE,
    GET_YOUR_COMMENTS,
    GET_YOUR_LIKES,
    GET_LIST_ITEMS,
    GET_FRIENDS,
    CREATE_LIST,
    DELETE_LIST,
    SAVE_TO_LIST,
    GET_DISPLAYED_PROFILE
} from './types';

// Gets the current profile for logged in user
export const getCurrentProfile = () => dispatch => {

  
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

export const getFriends = () => dispatch => {

  axios
    .post("/api/profile/getfriends")
    .then(res =>
      dispatch({
        type: GET_FRIENDS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_FRIENDS,
        payload: {}
      })
    );
};

export const getProfileFriends = ( profile_id ) => dispatch => {
  // dispatch(setProfileLoading());

  axios
    .post("/api/profile/getProfilefriends", profile_id)
    .then(res =>
      dispatch({
        type: GET_FRIENDS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_FRIENDS,
        payload: {}
      })
    );
};


// Get profile by handle
export const getProfileByHandle = (handle) => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/handle/${handle}`)
    .then(res =>
      dispatch({
        type: GET_DISPLAYED_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_DISPLAYED_PROFILE,
        payload: null
      })
    );
};

// Get profile by handle
export const getTimeline = (timeline) => dispatch => {
  // dispatch(setProfileLoading());
  axios
    .post(`/api/profile/timeline`, timeline )
    .then(res =>
      dispatch({
        type: GET_TIMELINE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};

export const getYourLikes = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/youliked`)
    .then(res =>
      dispatch({
        type: GET_YOUR_LIKES,
        payload: res.data
      })
    ) 
    .catch(err =>
      dispatch({
        type: GET_PROFILE,  
        payload: null
      })
    );
};

export const getListItems = (listId) => dispatch => {
  // dispatch(setProfileLoading());

  const body = {
    listId: listId
  }

  axios
    .post(`/api/profile/lists/items`, body)
    .then((res) =>
      dispatch({
        type: GET_LIST_ITEMS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch({
        type: GET_PROFILE,
        payload: null,
      });
    });
};

export const createList = (listData) => dispatch => {
  axios
    .post("/api/profile/createlist", listData)
    .then(res => {
      dispatch({
        type: CREATE_LIST,
        payload: res.data.profile,
      });

      dispatch(setAlert("List Created", "success"));

    })
    .catch((err) => {

    
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data, 
      })}
    );
};

export const saveToList = (listItem) => dispatch => { 

  axios
    .post("/api/profile/addtolist", listItem)
    .then(res => {
      dispatch({
        type: SAVE_TO_LIST,
        payload: res.data.profile,
      });

      dispatch(setAlert(res.data.message, "success"));

    })
    .catch((err) => {

      console.log('=============err=======================')
      console.log(err)
      console.log('====================================')
        
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
      })} 
    );

 }

export const deleteList = (listId) => dispatch => {

  axios
    .delete(`/api/profile/deletelist/${listId}`)
    .then(res => {
      dispatch({
        type: DELETE_LIST,
        payload: listId,
      });

      console.log("List Deleted", "success");
      dispatch(setAlert("List Deleted", "success"));

    })
    .catch((err) => {

    console.log('=============err=======================')
    console.log(err)
    console.log('====================================')
      
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })}
    );
};

// Create Profile
export const createProfile = (profileData, history, edit = false) => dispatch => {
  axios
    .post("/api/profile", profileData)
    .then(res =>{
      dispatch({
        type: CLEAR_ERRORS,
			  payload: {}
      }) 

      dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));

      if (!edit) {
        history.push("/dashboard");
      }
      
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};


// Get all profiles
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile/all')
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};


export const getYourComments = (userData) => dispatch => {
  axios
    .post('/api/profile/yourcomments', userData)
    .then(res =>
      dispatch({
        type: GET_YOUR_COMMENTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};



/*
  Get the (n) of newest members who created a profile 
  (n) is determine on the backend
*/
export const getNewestProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile/newestmembers')
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};



// Delete account & profile
export const deleteAccount = () => dispatch => {

  if (window.confirm('Are you sure? This can NOT be undone!')) {
      axios
      .delete('/api/profile')
        .then(res =>
          dispatch({
            type: SET_CURRENT_USER,
            payload: {}
          })
        )
        .catch(err =>
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          })
        );
  }

}



