import {
  FETCH_TOPICS_REQUEST,
  FETCH_TOPICS_SUCCESS,
  FETCH_TOPICS_FAILURE,
  FETCH_CATEGORY_TOPICS_REQUEST,
  FETCH_CATEGORY_TOPICS_SUCCESS,
  FETCH_CATEGORY_TOPICS_FAILURE,
  FETCH_MEDIA_REQUEST,
  FETCH_MEDIA_SUCCESS,
  FETCH_MEDIA_FAILURE,
} from '../actions/topicsLibraryActions';

const initialState = {
  topics: [],
  topicTitles: [],
  media: [], // Add this line
  loading: false,
  error: null,
};

const topicsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TOPICS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_TOPICS_SUCCESS:
      return {
        ...state,
        topics: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_TOPICS_FAILURE:
      return {
        ...state,
        topics: [],
        loading: false,
        error: action.payload,
      };
    case FETCH_CATEGORY_TOPICS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_CATEGORY_TOPICS_SUCCESS:
      return {
        ...state,
        topicTitles: action.payload,
        loading: true,
        error: null,
      };
    case FETCH_CATEGORY_TOPICS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_MEDIA_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_MEDIA_SUCCESS:
      return {
        ...state,
        media: action.payload, // Assuming the response structure matches
        loading: false,
        error: null,
      };
    case FETCH_MEDIA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default topicsReducer;
