import {
  SET_USER_SESSION,
  CLEAR_USER_SESSION,
} from '../actions/sessionStorageActions';

const initialState = {
  isLoggedIn: false,
  userId: null,
  token: null,
  sessionId: null,
  user: {
    name: null,
    email: null,
  },
  popups: [],
};

const sessionStorageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_SESSION:
      return {
        ...state,
        isLoggedIn: true,
        userId: action.payload.userId,
        token: action.payload.token,
        sessionId: action.payload.sessionId,
        user: {
          name: action.payload.name,
          email: action.payload.email,
        },
        popups: action.payload.popups, // Add popups to the state
      };

    case CLEAR_USER_SESSION:
      return {
        ...initialState,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default sessionStorageReducer;
