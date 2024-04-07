import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {userApiServer} from '../../config';

export const DELETE_USER = 'DELETE_USER';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';

export const deleteuser = userId => async dispatch => {
  dispatch({type: DELETE_USER});

  try {
    //Retrieve token and sessionId from AsyncStorage
    const token = await AsyncStorage.getItem('token');
    const sessionId = await AsyncStorage.getItem('sessionId');
    const userSelectedOptions = await AsyncStorage.getItem(
      `selectedOptions_${userId}`,
    );

    const headers = {
      Accept: 'application/json',
      'content-Type': 'application/json',
    };

    const response = await axios.put(
      `${userApiServer}/users/delete/${userId}`,
      {subscriptionStatus: 'Deleted'},
      {headers},
    );

    try {
      // Call API to delete session
      await axios.delete(`${userApiServer}/users/session/${sessionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.error('Failed to delete session', err);
      // Optionally dispatch a failure action or show a message
    }

    // Clear AsyncStorage values related to the session
    await AsyncStorage.multiRemove(['userId', 'token', 'sessionId']);
    if (userSelectedOptions) {
      // Remove selectedOptions for the specific user
      await AsyncStorage.removeItem(`selectedOptions_${userId}`);
    }

    dispatch({type: DELETE_USER_SUCCESS, payload: userId});
    console.log('User and session deleted successfully:', response.data);
  } catch (error) {
    dispatch({type: DELETE_USER_FAILURE, payload: error.response.data});
    console.error('Error deleting user:', error.response.data);
  }
};
