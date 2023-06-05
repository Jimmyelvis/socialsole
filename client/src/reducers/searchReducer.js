import { GET_RESULTS } from '../actions/types';

const initialState = {
  results: null,
  loading: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_RESULTS:
      return {
        ...state,
        results: payload,
        loading: false,
      };
    default:
      return state;
  }
}
