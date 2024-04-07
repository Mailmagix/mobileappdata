import axios from 'axios';
import {userApiServer} from '../../config';

export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';

export const fetchData = searchKeyword => {
  return async dispatch => {
    try {
      // Make an API request here to fetch data based on searchKeyword
      const response = await axios.get(
        `${userApiServer}/search/search?keyword=${searchKeyword}`,
      );

      dispatch({
        type: FETCH_DATA_SUCCESS,
        payload: response.data,
      });

      // console.log('Search data :', response.data);
    } catch (error) {
      dispatch({
        type: FETCH_DATA_FAILURE,
        payload: error.message,
      });
    }
  };
};
