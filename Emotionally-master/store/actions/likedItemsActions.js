import axios from 'axios';
import {userApiServer} from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Action Types
export const FETCH_LIKED_ITEM_REQUEST = 'FETCH_LIKED_ITEM_REQUEST';
export const FETCH_LIKED_ITEM_SUCCESS = 'FETCH_LIKED_ITEM_SUCCESS';
export const FETCH_LIKED_ITEM_FAILURE = 'FETCH_LIKED_ITEM_FAILURE';

// Sync Action Creators
export const fetchLikedItemRequest = () => ({
  type: FETCH_LIKED_ITEM_REQUEST,
});

export const fetchLikedItemSuccess = (contentType, contentData) => ({
  type: FETCH_LIKED_ITEM_SUCCESS,
  payload: {contentType, contentData},
});

export const fetchLikedItemFailure = error => ({
  type: FETCH_LIKED_ITEM_FAILURE,
  payload: {error},
});

// Async Action Creator (Thunk)
export const fetchLikedItem = () => {
  return async (dispatch, getState) => {
    dispatch(fetchLikedItemRequest());
    try {
      const userId = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('token');

      // Define headers with the token for authentication
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(
        `${userApiServer}/users/${userId}/likes`,
        {headers},
      );

      // Extract the specific content data from the response
      const {audios, videos, articles} = response.data;

      // Check if the content exists and dispatch success action for each type
      if (audios) {
        dispatch(fetchLikedItemSuccess('audios', audios));
      }
      if (videos) {
        dispatch(fetchLikedItemSuccess('videos', videos));
      }
      if (articles) {
        dispatch(fetchLikedItemSuccess('articles', articles));
      }
    } catch (error) {
      // If an error occurs during the request, dispatch a failure action
      dispatch(fetchLikedItemFailure(error.message));
      console.log('ERROR :', error.message);
    }
  };
};
