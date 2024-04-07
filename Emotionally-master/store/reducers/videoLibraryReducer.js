import {
  FETCH_VIDEOS_FAILURE,
  FETCH_VIDEOS_REQUEST,
  FETCH_VIDEOS_SUCCESS,
} from '../actions/videoLibraryActions';

const initialState = {
  videos: [],
  loading: false,
  error: null,
};

const videoReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VIDEOS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_VIDEOS_SUCCESS:
      return {
        ...state,
        videos: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_VIDEOS_FAILURE:
      return {
        ...state,
        videos: [],
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default videoReducer;
