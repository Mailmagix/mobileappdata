import axios from 'axios';
import {userApiServer} from '../../config';

export const addUser = (user, navigation) => async dispatch => {
  try {
    const headers = {
      Accept: 'application/json',
      'content-Type': 'application/json',
    };

    const response = await axios.post(`${userApiServer}/users/register`, user, {
      headers,
    });

    // Assuming the response contains any necessary data from the backend
    // Dispatch an action to update the store, or perform any other necessary logic
    dispatch({type: 'ADD_USER_SUCCESS', payload: response.data});
    console.log('User added successfully:', response.data);

    // Navigate to a different screen after successful registration
    navigation.navigate('SignUpOtpCode', {
      userId: response.data._id,
      email: user.email,
    });
  } catch (error) {
    // Handle any errors and dispatch appropriate actions
    dispatch({type: 'ADD_USER_FAILURE', payload: error.response.data});
    console.error('Error adding user:', error.response.data);
  }
};

export const clearError = () => {
  return {
    type: 'CLEAR_ERROR',
  };
};
