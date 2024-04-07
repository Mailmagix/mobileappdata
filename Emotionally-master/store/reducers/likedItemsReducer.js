import {
  FETCH_LIKED_ITEM_REQUEST,
  FETCH_LIKED_ITEM_SUCCESS,
  FETCH_LIKED_ITEM_FAILURE,
} from '../actions/likedItemsActions';

const initialState = {
  loading: false,
  error: null,
  audios: [],
  videos: [],
  articles: [],
};

const likedItemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LIKED_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_LIKED_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        [action.payload.contentType]: action.payload.contentData,
        error: null,
      };
    case FETCH_LIKED_ITEM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        audios: [],
        videos: [],
        articles: [],
      };
    default:
      return state;
  }
};

export default likedItemsReducer;
