import {
  STORE_SELECTED_OPTIONS,
  CLEAR_SELECTED_OPTIONS,
  SUBMIT_ANSWERS_SUCCESS,
  SUBMIT_ANSWERS_FAILURE,
} from '../actions/selectedOptionsActions';

const initialState = {
  selectedOptions: [],
  submitSuccess: false,
  submitFailure: false,
  error: null,
};

const selectedOptionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_SELECTED_OPTIONS:
      return {
        ...state,
        selectedOptions: action.payload,
      };
    case CLEAR_SELECTED_OPTIONS:
      return {
        ...state,
        selectedOptions: [],
      };
    case SUBMIT_ANSWERS_SUCCESS:
      return {
        ...state,
        submitSuccess: true,
        submitFailure: false,
      };
    case SUBMIT_ANSWERS_FAILURE:
      return {
        ...state,
        submitSuccess: false,
        submitFailure: true,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default selectedOptionsReducer;
