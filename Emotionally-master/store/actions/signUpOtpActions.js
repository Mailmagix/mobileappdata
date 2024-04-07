import axios from 'axios';
import {userApiServer} from '../../config';

export const fetchOtp =
  (userId, email, navigation, enteredOtp) => async dispatch => {
    try {
      const headers = {
        'Content-Type': 'application/json',
      };

      const requestBody = {
        email: email,
        otp: Number(enteredOtp),
      };
      const response = await axios.post(
        `${userApiServer}/users/verify-otp/${userId}`,
        requestBody,
        {headers},
      );

      console.log('responsedata', response.data);
      navigation.navigate('Login');
    } catch (error) {
      dispatch({type: 'FETCH_OTP_FAILURE', payload: error.response.data});
    }
  };
