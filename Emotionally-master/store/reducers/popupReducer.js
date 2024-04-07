import {
  SET_CURRENT_POPUP,
  SET_MODAL_VISIBILITY,
  SET_POPUPS,
  UPDATE_POPUP_RESPONSE,
} from '../actions/popupActions';

const initialState = {
  isModalVisible: true,
  popups: [],
  currentPopupIndex: 0,
};

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MODAL_VISIBILITY:
      return {
        ...state,
        isModalVisible: action.payload,
      };
    case SET_POPUPS:
      return {
        ...state,
        popups: action.payload,
        currentPopupIndex: 0, // Reset index when new popups are loaded
      };
    case SET_CURRENT_POPUP:
      return {
        ...state,
        currentPopupIndex: action.payload,
      };
    case UPDATE_POPUP_RESPONSE:
      // Implement state updates if needed
      return {
        ...state,
        // ... update state based on action.payload if needed
      };
    default:
      return state;
  }
};
