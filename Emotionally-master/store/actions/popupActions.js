import axios from 'axios';
import {userApiServer} from '../../config';

export const SET_MODAL_VISIBILITY = 'SET_MODAL_VISIBILITY';
export const SET_POPUPS = 'SET_POPUPS';
export const SET_CURRENT_POPUP = 'SET_CURRENT_POPUP';
export const UPDATE_POPUP_RESPONSE = 'UPDATE_POPUP_RESPONSE';

// Action Creators
export const fetchPopups = () => {
  return async (dispatch, getState) => {
    const currentDate = new Date().toDateString();

    try {
      // // Check the last date when popups were shown
      // const lastPopupDate = await AsyncStorage.getItem('lastPopupDate');

      // if (lastPopupDate === currentDate) {
      //   // If popups were already shown today, do nothing
      //   return;
      // }

      const response = await axios.get(`${userApiServer}/popups`);
      let allPopups = response.data;

      // Retrieve popups from the session state
      const userPopups = getState().sessionDetails.popups || [];
      console.log('userPopups IDs:', userPopups);

      // Filter out popups that are already in userPopups
      const filteredPopups = allPopups.filter(
        popup => !userPopups.some(userPopup => userPopup.popupId === popup._id),
      );

      console.log('filteredPopups:', filteredPopups);

      // Dispatch action to set popups
      dispatch({type: SET_POPUPS, payload: filteredPopups});
      // Save the current date as the last popup date
      // await AsyncStorage.setItem('lastPopupDate', currentDate);
    } catch (error) {
      console.error('Error fetching popups:', error.message);
    }
  };
};

// Action Creator for updating popup response
export const updatePopupResponse = (popupId, userId, answer, submit) => {
  return async dispatch => {
    try {
      const apiUrl = `${userApiServer}/popups/${popupId}`;
      const response = await axios.put(apiUrl, {
        userId,
        answer,
        submit: submit,
      });

      // Assuming the API response contains a 'success' property
      dispatch({
        type: UPDATE_POPUP_RESPONSE,
        payload: response.data.message,
      });
      console.log('Popup updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating popup response:', error);
    }
  };
};

export const setModalVisibility = visible => {
  return {
    type: SET_MODAL_VISIBILITY,
    payload: visible,
  };
};

export const setCurrentPopup = index => {
  return {
    type: SET_CURRENT_POPUP,
    payload: index,
  };
};
