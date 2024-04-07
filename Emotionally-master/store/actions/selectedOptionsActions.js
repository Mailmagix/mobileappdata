import axios from 'axios';
import {userApiServer} from '../../config';

export const STORE_SELECTED_OPTIONS = 'STORE_SELECTED_OPTIONS';
export const CLEAR_SELECTED_OPTIONS = 'CLEAR_SELECTED_OPTIONS';
export const SUBMIT_ANSWERS_SUCCESS = 'SUBMIT_ANSWERS_SUCCESS';
export const SUBMIT_ANSWERS_FAILURE = 'SUBMIT_ANSWERS_FAILURE';

export const storeSelectedOptions = selectedOptions => ({
  type: STORE_SELECTED_OPTIONS,
  payload: selectedOptions,
});

export const clearSelectedOptions = () => ({
  type: CLEAR_SELECTED_OPTIONS,
});

export const submitAnswersToDatabase = (
  selectedOptions,
  currentPage,
  navigation,
) => {
  return async (dispatch, getState) => {
    const {
      auth: {userId, token},
    } = getState(); // Get userId from state
    try {
      console.log('submit function');
      console.log('SElected options :', selectedOptions);
      // Send selectedOptions to your server for storage
      // You can send it as an array of selected options for each question
      // Make an API request to store this data on your server
      console.log('Options token', token);
      const body = {
        questionIndex: currentPage,
        answer: selectedOptions,
      };
      console.log('Body : ', body);
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.put(
        `${userApiServer}/users/${userId}/options`,
        body, // Pass selectedOptions in the request body
        {headers},
      );

      // Return a success status or data if needed
      dispatch({type: SUBMIT_ANSWERS_SUCCESS, payload: response.data});
      return response.data; // You can return data from the server if available
    } catch (error) {
      console.error('Failed to submit answers:', error);
      dispatch({type: SUBMIT_ANSWERS_FAILURE, payload: error});
      throw error; // Throw the error to handle it in the component
    }
  };
};
