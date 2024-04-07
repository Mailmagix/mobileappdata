import axios from 'axios';
import {userApiServer} from '../../config';

export const FETCH_TOPICS_REQUEST = 'FETCH_TOPICS_REQUEST';
export const FETCH_TOPICS_SUCCESS = 'FETCH_TOPICS_SUCCESS';
export const FETCH_TOPICS_FAILURE = 'FETCH_TOPICS_FAILURE';

//Action Creators
export const fetchTopicsRequest = () => ({
  type: FETCH_TOPICS_REQUEST,
});

export const fetchTopicsSuccess = topics => ({
  type: FETCH_TOPICS_SUCCESS,
  payload: topics,
});

export const fetchTopicsFailure = error => ({
  type: FETCH_TOPICS_FAILURE,
  payload: error,
});

// Async action creator using Redux Thunk and Axios
export const fetchTopics = () => {
  console.log('fetch topics');
  return async (dispatch, getState) => {
    dispatch(fetchTopicsRequest());
    try {
      const response = await axios.get(`${userApiServer}/search/allCategories`);

      dispatch(fetchTopicsSuccess(response.data));
    } catch (error) {
      dispatch(fetchTopicsFailure(error.message));
    }
  };
};

export const FETCH_CATEGORY_TOPICS_REQUEST = 'FETCH_CATEGORY_TOPICS_REQUEST';
export const FETCH_CATEGORY_TOPICS_SUCCESS = 'FETCH_CATEGORY_TOPICS_SUCCESS';
export const FETCH_CATEGORY_TOPICS_FAILURE = 'FETCH_CATEGORY_TOPICS_FAILURE';

export const fetchCategoryTopicsRequest = () => ({
  type: FETCH_CATEGORY_TOPICS_REQUEST,
});

export const fetchCategoryTopicsSuccess = response => ({
  type: FETCH_CATEGORY_TOPICS_SUCCESS,
  payload: response.topics,
});

export const fetchCategoryTopicsFailure = error => ({
  type: FETCH_CATEGORY_TOPICS_FAILURE,
  payload: error,
});

export const fetchCategoryTopics = category => {
  console.log('fetch topic titles');
  console.log('category : ', category);
  return async dispatch => {
    dispatch(fetchCategoryTopicsRequest());
    try {
      const response = await axios.post(`${userApiServer}/search/category`, {
        category, // Changed to use query params
      });
      dispatch(fetchCategoryTopicsSuccess(response.data));
      console.log('Topic Titles :', response.data);
    } catch (error) {
      dispatch(fetchCategoryTopicsFailure(error.message));
    }
  };
};

export const FETCH_MEDIA_REQUEST = 'FETCH_MEDIA_REQUEST';
export const FETCH_MEDIA_SUCCESS = 'FETCH_MEDIA_SUCCESS';
export const FETCH_MEDIA_FAILURE = 'FETCH_MEDIA_FAILURE';

export const fetchMediaRequest = () => ({
  type: FETCH_MEDIA_REQUEST,
});

export const fetchMediaSuccess = media => ({
  type: FETCH_MEDIA_SUCCESS,
  payload: media,
});

export const fetchMediaFailure = error => ({
  type: FETCH_MEDIA_FAILURE,
  payload: error,
});

export const fetchMedia = (topic, category) => {
  console.log('fetch medias');
  return async dispatch => {
    dispatch(fetchMediaRequest());
    try {
      const response = await axios.post(`${userApiServer}/search/topic`, {
        topic,
        category,
      });
      dispatch(fetchMediaSuccess(response.data));
    } catch (error) {
      dispatch(fetchMediaFailure(error.message));
    }
  };
};
