import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {userApiServer} from '../../config';

// Define action types
export const LIKE_VIDEO = 'LIKE_VIDEO';
export const LIKE_VIDEO_FAILURE = 'LIKE_VIDEO_FAILURE';

// Action creators for likeAudio
export const likeVideoSuccess = video => ({
  type: LIKE_VIDEO,
  payload: video,
});

export const likeVideoFailure = error => ({
  type: LIKE_VIDEO_FAILURE,
  payload: error,
});

export const likeVideo = video => {
  return async dispatch => {
    try {
      const userId = await AsyncStorage.getItem('userId');

      const token = await AsyncStorage.getItem('token');

      const videoId = video._id;

      // Define headers with the token for authentication
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const body = JSON.stringify({
        userId: userId,
      });

      // Make an API call to like or unlike the video
      const response = await axios.patch(
        `${userApiServer}/videos/${videoId}/likes`,
        body,
        {headers},
      );

      // Dispatch the success action with the video data from the API response
      dispatch(likeVideoSuccess(response.data));
    } catch (error) {
      dispatch(likeVideoFailure(error.message));
    }
  };
};
