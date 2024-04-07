import {
  FETCH_AUDIOS_REQUEST,
  FETCH_AUDIOS_SUCCESS,
  FETCH_AUDIOS_FAILURE,
} from '../actions/audioActions';

const initialState = {
  audios: [],
  loading: false,
  error: null,
};

const audioReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_AUDIOS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_AUDIOS_SUCCESS:
      return {
        ...state,
        audios: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_AUDIOS_FAILURE:
      return {
        ...state,
        audios: [],
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default audioReducer;
