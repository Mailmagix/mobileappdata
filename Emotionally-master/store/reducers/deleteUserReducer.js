import {
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
} from '../actions/deleteUserActions';

export const RESET_USER_DELETION_STATE = 'RESET_USER_DELETION_STATE';

const initialState = {
  users: [],
  loading: false,
  error: null,
  userDeleted: false,
};

const deleteUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_USER:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: state.users.filter(user => user.id != action.payload),
        userDeleted: true,
      };
    case DELETE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case RESET_USER_DELETION_STATE:
      return {
        ...state,
        userDeleted: false,
        error: null,
      };
    default:
      return state;
  }
};

export default deleteUserReducer;
