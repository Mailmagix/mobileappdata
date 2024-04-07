import {LIKE_AUDIO, LIKE_AUDIO_FAILURE} from '../actions/likedAudiosActions';

const initialState = {
  likedAudiosList: [], // This array will store liked audio objects
  likeError: null, // To track liking errors
  isLiked: false,
};

const likedAudiosReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIKE_AUDIO:
      const audioToToggle = action.payload;
      const audioIsLiked = state.likedAudiosList.some(
        audio => audio._id === audioToToggle._id,
      );
      if (audioIsLiked) {
        // If audio is already liked, remove it from the list
        return {
          ...state,
          likedAudiosList: state.likedAudiosList.filter(
            audio => audio._id !== audioToToggle._id,
          ),
          isLiked: false, // Set isLiked to false if unliked
          likeError: null, // Reset any previous error
        };
      } else {
        // If audio is not liked, add it to the list
        return {
          ...state,
          likedAudiosList: [...state.likedAudiosList, audioToToggle],
          isLiked: true, // Set isLiked to true if liked
          likeError: null, // Reset any previous error
        };
      }
    case LIKE_AUDIO_FAILURE:
      return {
        ...state,
        likeError: action.payload,
      };
    default:
      return state;
  }
};

export default likedAudiosReducer;
