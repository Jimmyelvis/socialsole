import isEmpty from "../validation/is-empty";
import { 
  SET_CURRENT_USER,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS

 } from "../actions/types";

const initialState = {
  isAuthenticated: null,
  token: localStorage.getItem('jwtToken'),
  user: null,
  loading: true,
};

 /**
   * We may need to change this after reviewing Brad Traversy's
   * videos. He uses a different method to handle errors.
   */

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
    localStorage.setItem('jwtToken', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false
    };
    case AUTH_ERROR:
      case LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null
      };
    default:
      return state;
  }
}
