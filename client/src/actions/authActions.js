import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { getCurrentProfile, setProfileLoading, clearCurrentProfile } from "./profileActions";

import { GET_ERRORS, 
  SET_CURRENT_USER,
  USER_LOADED,
  AUTH_ERROR ,
  LOGOUT,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_FAIL,
  GET_ALL_USERS

} from "./types";
import { setAlert } from "./alert";

/**
 * We could possibly create a util function which will
 * be in the utils folder. Import it here. And in that function
 * possibly use the modal context there to close the reg modal.
 * A issue may be that React may not see that as a functional 
 * component thus not allowing us to use it
 */

// Load User
export const loadUser = () => async (dispatch) => {


  if (localStorage.jwtToken) {
    // if there is a jwtToken set axios headers for all requests
    setAuthToken(localStorage.jwtToken);
  }

  try {
    const res = await axios.get('/api/users/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {

    console.log('err loadUser' , err);

    dispatch({
      type: AUTH_ERROR
    });
  }
};


// Register User
export const registerUser = (userData, history) => (dispatch) => {

  axios
    .post("/api/users/register", userData )
    .then(res => {



      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });

      

      dispatch(loadUser());
    })
    .catch((err) => {

      console.log("err", err);

      if (err && err.response && err.response.data) {

        const errors = err.response.data;
        
        
        errors.forEach((error) => {
          dispatch(setAlert(error.msg, "danger"));
          console.log(error.msg);
        });

      }

      console.log('====================================');
      console.log('catch block called');
      console.log('====================================');


      dispatch({
        type: REGISTER_FAIL
      });
    });
};

// Login - Get User Token
export const loginUser = (userData) => (dispatch) => {
  axios
    .post("/api/users/login", userData)
    .then((res) => {


      // Save to localStorage
      const { token } = res.data;
      // Set token to ls
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
      dispatch(getCurrentProfile())

  
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

export const logoutUser = () => (dispatch) => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
  dispatch(clearCurrentProfile());
};

export const changeUserRole = (_id, role) => (dispatch) => {

const userData = {
  _id,
  role
}


  axios
    .post("/api/users/changeuser", userData)
    .then((res) => {

      dispatch(setAlert(res.data.msg, "success"));

      dispatch(getAllUsers());
    })
    .catch((err) => {
      console.log(err);
      dispatch(setAlert(err.response.data.msg, "danger"));
    });
};


export const getAllUsers = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/users/all')
    .then(res =>
      dispatch({
        type: GET_ALL_USERS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ALL_USERS,
        payload: null
      })
    );
};