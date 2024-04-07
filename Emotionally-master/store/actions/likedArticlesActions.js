import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {userApiServer} from '../../config';

// Define action types
export const LIKE_ARTICLE = 'LIKE_ARTICLE';
export const LIKE_ARTICLE_FAILURE = 'LIKE_ARTICLE_FAILURE';

// Action creators for likeAudio
export const likeArticleSuccess = article => ({
  type: LIKE_ARTICLE,
  payload: article,
});

export const likeArticleFailure = error => ({
  type: LIKE_ARTICLE_FAILURE,
  payload: error,
});

export const likeArticle = article => {
  return async dispatch => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      console.log('UserId : ', userId);
      const token = await AsyncStorage.getItem('token');
      console.log('Token : ', token);

      const articleId = article._id;

      // Define headers with the token for authentication
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const body = JSON.stringify({
        userId: userId,
      });

      // Make an API call to like or unlike the article
      const response = await axios.patch(
        `${userApiServer}/articles/${articleId}/likes`,
        body,
        {headers},
      );

      // Dispatch the success action with the article data from the API response
      dispatch(likeArticleSuccess(response.data));
      console.log('RESPONSE :', response.data);
    } catch (error) {
      dispatch(likeArticleFailure(error.message));
      console.log('ERROR :', error.message);
    }
  };
};
