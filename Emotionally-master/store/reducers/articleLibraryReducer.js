import {
  FETCH_ARTICLES_REQUEST,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_FAILURE,
} from '../actions/articleLibraryActions';

const initialState = {
  articles: [],
  loading: false,
  error: null,
};

const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ARTICLES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_ARTICLES_SUCCESS:
      return {
        ...state,
        articles: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_ARTICLES_FAILURE:
      return {
        ...state,
        articles: [],
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default articleReducer;
