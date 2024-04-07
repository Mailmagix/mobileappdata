import axios from 'axios';
import {userApiServer} from '../../config';

export const CHANGE_PASSWORD_REQUEST = 'CHANGE_PASSWORD_REQUEST';
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_FAILURE = 'CHANGE_PASSWORD_FAILURE';
export const RESET_CHANGE_PASSWORD_ERROR = 'RESET_CHANGE_PASSWORD_ERROR';

export const changePassword = (currentPassword, newPassword) => {
  return async (dispatch, getState) => {
    // Add getState here
    const {
      sessionDetails: {userId, token},
    } = getState(); // Get userId and token from state

    dispatch({type: CHANGE_PASSWORD_REQUEST});
    try {
      await axios.put(
        `${userApiServer}/users/${userId}`,
        {
          currentPassword,
          password: newPassword,
        },
        {
          Accept: 'application/json',
          'content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      );
      dispatch({type: CHANGE_PASSWORD_SUCCESS, payload: true});
      console.log('Password is updated successfully');
    } catch (error) {
      dispatch({
        type: CHANGE_PASSWORD_FAILURE,
        payload: error.response ? error.response.data : 'Could not connect',
      });
    }
  };
};

export const resetChangePasswordError = () => {
  return {
    type: RESET_CHANGE_PASSWORD_ERROR,
  };
};

export const clearError = () => {
  return {
    type: 'CLEAR_ERROR',
  };
};

export default {changePassword, resetChangePasswordError, clearError};
