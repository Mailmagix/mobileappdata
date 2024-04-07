import axios from 'axios';
import {userApiServer} from '../../config';

export const FETCH_ARTICLES_REQUEST = 'FETCH_ARTICLES_REQUEST';
export const FETCH_ARTICLES_SUCCESS = 'FETCH_ARTICLES_SUCCESS';
export const FETCH_ARTICLES_FAILURE = 'FETCH_ARTICLES_FAILURE';

//Action Creators
export const fetchArticlesRequest = () => ({
  type: FETCH_ARTICLES_REQUEST,
});

export const fetchArticlesSuccess = articles => ({
  type: FETCH_ARTICLES_SUCCESS,
  payload: articles,
});

export const fetchArticlesFailure = error => ({
  type: FETCH_ARTICLES_FAILURE,
  payload: error,
});

// Async action creator using Redux Thunk and Axios
export const fetchArticles = () => {
  return async (dispatch, getState) => {
    dispatch(fetchArticlesRequest());
    try {
      const {
        sessionDetails: {token},
      } = getState(); // Get token from state
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(`${userApiServer}/articles/`, {headers});
      dispatch(fetchArticlesSuccess(response.data));
    } catch (error) {
      dispatch(fetchArticlesFailure(error.message));
    }
  };
};
