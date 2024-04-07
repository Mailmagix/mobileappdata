import {
  FETCH_TOPDISCUSSIONS_REQUEST,
  FETCH_TOPDISCUSSIONS_SUCCESS,
  FETCH_TOPDISCUSSIONS_FAILURE,
} from '../actions/topDiscussionsActions';

const initialState = {
  discussions: [],
  loading: false,
  error: null,
};

const topDiscussionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TOPDISCUSSIONS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_TOPDISCUSSIONS_SUCCESS:
      return {
        ...state,
        discussions: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_TOPDISCUSSIONS_REQUEST:
      return {
        ...state,
        discussions: [],
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default topDiscussionsReducer;
