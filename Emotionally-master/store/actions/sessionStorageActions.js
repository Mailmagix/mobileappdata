import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {userApiServer} from '../../config';

// Action types
export const SET_USER_SESSION = 'SET_USER_SESSION';
export const CLEAR_USER_SESSION = 'CLEAR_USER_SESSION';

// Action creators
export const setUserSession = userDetails => ({
  type: SET_USER_SESSION,
  payload: userDetails,
});

export const clearUserSession = () => ({
  type: CLEAR_USER_SESSION,
});

// Thunk action to load user session from AsyncStorage
export const loadUserSession = () => {
  return async dispatch => {
    try {
      // Retrieve user session data from AsyncStorage
      const userId = await AsyncStorage.getItem('userId');
      console.log('UserId : ', userId);
      const token = await AsyncStorage.getItem('token');
      console.log('Session Token : ', token);
      const sessionId = await AsyncStorage.getItem('sessionId');
      console.log('SessionId : ', sessionId);

      if (userId && token && sessionId) {
        // Make an API request to fetch user details if needed
        const response = await axios.get(`${userApiServer}/users/${userId}`, {
          headers: {
            Accept: 'application/json',
            'content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        // Extract user details from the response
        const userName = response.data.name;
        const userEmail = response.data.email;
        const userPopups = response.data.popups || []; // Default to empty array if not present

        // Dispatch the user session data to the Redux store
        dispatch(
          setUserSession({
            userId,
            token,
            sessionId,
            name: userName,
            email: userEmail,
            popups: userPopups,
          }),
        );
      } else {
        // Dispatch the clear user session action if any of the session data is missing
        dispatch(clearUserSession());
      }
    } catch (error) {
      // Handle errors, e.g., network issues or invalid session
      console.error('Error loading user session:', error);
    }
  };
};
