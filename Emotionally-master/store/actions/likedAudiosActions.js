import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {userApiServer} from '../../config';

// Define action types
export const LIKE_AUDIO = 'LIKE_AUDIO';
export const LIKE_AUDIO_FAILURE = 'LIKE_AUDIO_FAILURE';

// Action creators for likeAudio
export const likeAudioSuccess = audio => ({
  type: LIKE_AUDIO,
  payload: audio,
});

export const likeAudioFailure = error => ({
  type: LIKE_AUDIO_FAILURE,
  payload: error,
});

export const likeAudio = audio => {
  return async dispatch => {
    try {
      const userId = await AsyncStorage.getItem('userId');

      const token = await AsyncStorage.getItem('token');

      const audioId = audio._id;

      // Define headers with the token for authentication
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const body = JSON.stringify({
        userId: userId,
      });

      // Make an API call to like or unlike the audio
      const response = await axios.patch(
        `${userApiServer}/audios/${audioId}/likes`,
        body,
        {headers},
      );

      // Dispatch the success action with the audio data from the API response
      dispatch(likeAudioSuccess(response.data));
      console.log('RESPONSE :', response.data);
    } catch (error) {
      dispatch(likeAudioFailure(error.message));
      console.log('ERROR :', error.message);
    }
  };
};
