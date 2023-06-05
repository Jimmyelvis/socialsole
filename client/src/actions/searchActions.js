import axios from 'axios';
import { setAlert } from "./alert";
import { GET_RESULTS } from './types';



export const getResults = (query) => (dispatch) => {

  axios
    .get(`/api/search/query/search?search=${query}`)
    .then((res) =>
      dispatch({
        type: GET_RESULTS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_RESULTS,
        payload: null,
      })
    );
};