import axios from 'axios';
import {userApiServer} from '../../config';

export const FETCH_VIDEOS_REQUEST = 'FETCH_VIDEOS_REQUEST';
export const FETCH_VIDEOS_SUCCESS = 'FETCH_VIDEOS_SUCCESS';
export const FETCH_VIDEOS_FAILURE = 'FETCH_VIDEOS_FAILURE';

//Action Creators
export const fetchVideosRequest = () => ({
  type: FETCH_VIDEOS_REQUEST,
});

export const fetchVideosSuccess = videos => ({
  type: FETCH_VIDEOS_SUCCESS,
  payload: videos,
});

export const fetchVideosFailure = error => ({
  type: FETCH_VIDEOS_FAILURE,
  payload: error,
});

// Async action creator using Redux Thunk and Axios
export const fetchVideos = () => {
  return async (dispatch, getState) => {
    dispatch(fetchVideosRequest());
    try {
      const {
        sessionDetails: {token},
      } = getState(); // Get token from state

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(`${userApiServer}/videos/`, {headers});
      dispatch(fetchVideosSuccess(response.data));
    } catch (error) {
      dispatch(fetchVideosFailure(error.message));
      console.log('Error fetching videos:', error.message);
    }
  };
};
