import axios from 'axios';
import {userApiServer} from '../../config';

export const FETCH_TOPDISCUSSIONS_REQUEST = 'FETCH_TOPDISCUSSIONS_REQUEST';
export const FETCH_TOPDISCUSSIONS_SUCCESS = 'FETCH_TOPDISCUSSIONS_SUCCESS';
export const FETCH_TOPDISCUSSIONS_FAILURE = 'FETCH_TOPDISCUSSIONS_FAILURE';

//Action Creators
export const fetchTopDiscussionsRequest = () => ({
  type: FETCH_TOPDISCUSSIONS_REQUEST,
});

export const fetchTopDiscussionsSuccess = discussions => ({
  type: FETCH_TOPDISCUSSIONS_SUCCESS,
  payload: discussions,
});

export const fetchTopDiscussionsFailure = error => ({
  type: FETCH_TOPDISCUSSIONS_FAILURE,
  payload: error,
});

// Async action creator using Redux Thunk and Axios
export const fetchTopDiscussions = () => {
  return async (dispatch, getState) => {
    dispatch(fetchTopDiscussionsRequest());
    try {
      const {
        sessionDetails: {token},
      } = getState(); // Get token from state
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(`${userApiServer}/discussions/`, {
        headers,
      });
      dispatch(fetchTopDiscussionsSuccess(response.data));
    } catch (error) {
      dispatch(fetchTopDiscussionsFailure(error.message));
    }
  };
};
