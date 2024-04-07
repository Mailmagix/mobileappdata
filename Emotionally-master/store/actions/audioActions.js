import axios from 'axios';
import {userApiServer} from '../../config';

export const FETCH_AUDIOS_REQUEST = 'FETCH_AUDIOS_REQUEST';
export const FETCH_AUDIOS_SUCCESS = 'FETCH_AUDIOS_SUCCESS';
export const FETCH_AUDIOS_FAILURE = 'FETCH_AUDIOS_FAILURE';

//Action Creators
export const fetchAudiosRequest = () => ({
  type: FETCH_AUDIOS_REQUEST,
});

export const fetchAudiosSuccess = audios => ({
  type: FETCH_AUDIOS_SUCCESS,
  payload: audios,
});

export const fetchAudiosFailure = error => ({
  type: FETCH_AUDIOS_FAILURE,
  payload: error,
});

// Async action creator using Redux Thunk and Axios
export const fetchAudios = () => {
  return async (dispatch, getState) => {
    dispatch(fetchAudiosRequest());
    try {
      const {
        sessionDetails: {token},
      } = getState(); // Get token from state
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(`${userApiServer}/audios/`, {headers});
      dispatch(fetchAudiosSuccess(response.data));
    } catch (error) {
      dispatch(fetchAudiosFailure(error.message));
    }
  };
};
