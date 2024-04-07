import {LIKE_VIDEO, LIKE_VIDEO_FAILURE} from '../actions/likedVideosActions';

const initialState = {
  likedVideosList: [], // This array will store liked video objects
  likeError: null,
  isLiked: false,
};

const likedVideosReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIKE_VIDEO:
      const videoToToggle = action.payload;
      const videoIsLiked = state.likedVideosList.some(
        video => video._id == videoToToggle._id,
      );
      if (videoIsLiked) {
        // If video is already liked, remove it from the list
        return {
          ...state,
          likedVideosList: state.likedVideosList.filter(
            video => video._id !== videoToToggle._id,
          ),
          isLiked: false, // Set isLiked to false if unliked
          likeError: null, // Reset any previous error
        };
      } else {
        // If video is not liked, add it to the list
        return {
          ...state,
          likedVideosList: [...state.likedVideosList, videoToToggle],
          isLiked: true, // Set isLiked to true if liked
          likeError: null, // Reset any previous error
        };
      }
    case LIKE_VIDEO_FAILURE:
      return {
        ...state,
        likeError: action.payload,
      };
    default:
      return state;
  }
};

export default likedVideosReducer;
