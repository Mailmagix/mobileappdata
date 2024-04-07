import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {userApiServer} from '../../config';
import {clearSelectedOptions} from './selectedOptionsActions';

export const loginSuccess = user => {
  return {
    type: 'LOGIN_SUCCESS',
    payload: user,
  };
};

export const loginFailure = error => {
  return {
    type: 'LOGIN_FAILURE',
    payload: error,
  };
};

export const logout = navigation => {
  return async dispatch => {
    //Retrieve token and sessionId from AsyncStorage
    const token = await AsyncStorage.getItem('token');
    const sessionId = await AsyncStorage.getItem('sessionId');

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

    // Dispatch logout action to update Redux state
    dispatch({
      type: 'LOGOUT',
    });

    // Navigate the user back to the Login screen
    navigation.navigate('Login');
  };
};

export const login = (credentials, navigation) => {
  // Perform the login logic here, such as making an API request
  return async dispatch => {
    try {
      const headers = {
        Accept: 'application/json',
        'content-Type': 'application/json',
      };

      const requestBodyString = JSON.stringify({
        username: credentials.email,
        password: credentials.password,
      });

      // Simulating an API request
      const response = await axios.post(
        `${userApiServer}/users/login`,
        requestBodyString,
        {headers},
      );

      const userId = response.data.userId;
      const token = response.data.token;

      const sessionId = response.data.sessionId;

      // Store userId, token, and sessionId in AsyncStorage
      await AsyncStorage.multiSet([
        ['userId', userId.toString()],
        ['token', token],
        ['sessionId', sessionId],
      ]);

      dispatch(
        loginSuccess({name: null, email: null, userId, token, sessionId}),
      );
      console.log('Login token', token);

      // Check if the user has logged in before
      const firstTimeLoginKey = `isFirstTimeLogin_${userId}`; // Make the key user-specific
      const isFirstTimeLogin = await AsyncStorage.getItem(firstTimeLoginKey);

      if (isFirstTimeLogin === null) {
        // Explicitly check for null
        // For first-time login, navigate to the "Home" component
        await AsyncStorage.setItem(firstTimeLoginKey, 'true');
        navigation.navigate('Home');
        await AsyncStorage.removeItem(`selectedOptions_${userId}`);
        dispatch(clearSelectedOptions()); // Clear selected options in Redux state
      } else {
        // For subsequent logins, navigate to the "Dashboard" page
        navigation.navigate('Dashboard', {activeTab: 1});
      }
    } catch (error) {
      dispatch(loginFailure(error.response.data));
    }
  };
};

export const clearError = () => {
  return {
    type: 'CLEAR_ERROR',
  };
};
