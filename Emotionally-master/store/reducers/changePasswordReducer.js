import {
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE,
  RESET_CHANGE_PASSWORD_ERROR,
  CHANGE_PASSWORD_REQUEST,
} from '../actions/changePasswordActions';

const initialState = {
  changePasswordError: null,
  changePasswordSuccess: false,
};

const changePasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        changePasswordError: null,
        changePasswordSuccess: false, // Reset on a new request
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        changePasswordSuccess: action.payload,
        changePasswordError: null,
      };
    case CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        changePasswordError: action.payload,
        changePasswordSuccess: false,
      };
    case RESET_CHANGE_PASSWORD_ERROR:
      return {...state, changePasswordError: null};
    default:
      return state;
  }
};

export default changePasswordReducer;
