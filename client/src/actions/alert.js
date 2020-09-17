import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';


/*
  Set Alert component for showing alerts , for situations such
  as showing a message when a user successfully submits a comment,
  or when a first time registration was successful 
*/

export const setAlert = (msg, alertType, timeout = 3000) => dispatch => {
  const id = uuidv4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};