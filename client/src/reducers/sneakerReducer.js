import {
  ADD_SNEAKER,
  GET_SNEAKER,
  GET_SNEAKERS,
  DELETE_SNEAKER,
  SNEAKER_LOADING,
  LIKE_SNEAKER
 } from "../actions/types";

 const initialState = {
  sneakers: [],
  sneaker: {},
  loading: false
};

export default function (state = initialState, action) {

  switch (action.type) {
    case SNEAKER_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_SNEAKERS:
      return {
        ...state,
        sneakers: action.payload,
        loading: false
      };
    case GET_SNEAKER:
      return {
        ...state,
        sneaker: action.payload,
        loading: false
    };
    case ADD_SNEAKER:
      return {
        ...state,
        sneakers: [action.payload, ...state.sneakers]
    };
    case DELETE_SNEAKER:
      return {
        ...state,
        sneakers: state.sneakers.filter(sneaker => sneaker._id !== action.payload)
      };
    case LIKE_SNEAKER:
      return {
        ...state,
        sneakers: state.sneakers.map(sneaker => {
          if (sneaker._id === action.payload._id) {
            return {
              ...sneaker,
              ...action.payload
            };
          } else {
            return sneaker;
          }
        })
      };
    default:
      return state;
  }

  
}