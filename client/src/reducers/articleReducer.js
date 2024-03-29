import {
  GET_ARTICLE,
  GET_ARTICLES,
  ADD_ARTICLE,
  ARTICLE_LOADING,
  ADD_COMMENT,
  LIKE_ARTICLE,
  UNLIKE_ARTICLE,
  GET_ARTICLES_ADMIN
} from "../actions/types";

const initialState = {
  article: {},
  articles: [],
  loading: false,
};

export default function (state = initialState, action) {

  switch (action.type) {
    case ARTICLE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_ARTICLE:
      return {
        ...state,
        article: action.payload,
        loading: false
      };
    case GET_ARTICLES:
      return {
        ...state,
        articles: action.payload,
        loading: false
      };
    case GET_ARTICLES_ADMIN:
      return {
        ...state,
        articles: action.payload,
        loading: false
      };
    case ADD_ARTICLE:
        return {
          ...state,
          articles: [action.payload, ...state.articles ]
      };
    case ADD_COMMENT:
      return {
        ...state,
        article: action.payload,
        loading: false,
    };
    case LIKE_ARTICLE:
      return {
        ...state,
        article: action.payload,
        loading: false
    }
    case UNLIKE_ARTICLE:
      return {
        ...state,
        article: action.payload,
        loading: false
    }
    default:
      return state;
  }

}