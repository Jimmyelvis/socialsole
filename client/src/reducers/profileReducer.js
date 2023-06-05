import {
  GET_PROFILE,
  PROFILE_LOADING,
  GET_PROFILES,
  CLEAR_CURRENT_PROFILE,
  GET_TIMELINE,
  GET_YOUR_COMMENTS,
  GET_YOUR_LIKES,
  GET_LIST_ITEMS,
  GET_FRIENDS,
  CREATE_LIST,
  DELETE_LIST,
  SAVE_TO_LIST,
  GET_DISPLAYED_PROFILE
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: [],
  displayedProfile: {},
  loading: false,
  timeline: [],
  yourComments: [],
  youLiked: [],
  currentList: [],
  friends: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case GET_DISPLAYED_PROFILE:
      return {
        ...state,
        displayedProfile: action.payload,
        loading: false
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };
    // case SAVE_TO_LIST:
    //   return {
    //     ...state,
    //     profile: {
    //       ...state.profile,
    //       lists: state.profile.lists.map(list => {
    //         if (list._id === action.payload.listId) {
    //           return {
    //             ...list,
    //             items: [...list.items, action.payload.item]
    //           };
    //         } else {
    //           return list;
    //         }
    //       })
    //     }
    //   };
    case SAVE_TO_LIST:
      return {
        ...state,
        profile: action.payload,
    };
    case CREATE_LIST:
      return {
        ...state,
        profile: action.payload,
      };
    case DELETE_LIST:
      return {
        ...state,
        profile: {
          ...state.profile,
          lists: state.profile.lists.filter(list => list._id !== action.payload)
        }
    };
    case GET_LIST_ITEMS:
      return {
        ...state,
        currentList: action.payload,
        loading: false
      };
    case GET_FRIENDS:
      return {
        ...state,
        friends: action.payload,
        loading: false
      };
    case GET_TIMELINE:
      return {
        ...state,
        timeline: action.payload,
        loading: false
      };
    case GET_YOUR_LIKES:
      return {
        ...state,
        youLiked: action.payload,
        loading: false
      };
    case GET_YOUR_COMMENTS:
      return {
        ...state,
        yourComments: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };
    default:
      return state;
  }
}
