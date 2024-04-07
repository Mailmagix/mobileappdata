import {
  LIKE_ARTICLE,
  LIKE_ARTICLE_FAILURE,
} from '../actions/likedArticlesActions';

const initialState = {
  likedArticlesList: [], // This array will store liked audio objects
  likeError: null,
  isLiked: false,
};

const likedArticlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIKE_ARTICLE:
      const articleToToggle = action.payload;
      const articleIsLiked = state.likedArticlesList.some(
        article => article._id === articleToToggle._id,
      );
      if (articleIsLiked) {
        // If article is already liked, remove it from the list
        return {
          ...state,
          likedArticlesList: state.likedArticlesList.filter(
            article => article._id !== articleToToggle._id,
          ),
          isLiked: false, // Set isLiked to false if unliked
          likeError: null, // Reset any previous error
        };
      } else {
        // If article is not liked, add it to the list
        return {
          ...state,
          likedArticlesList: [...state.likedArticlesList, articleToToggle],
          isLiked: true, // Set isLiked to true if liked
          likeError: null, // Reset any previous error
        };
      }
    case LIKE_ARTICLE_FAILURE:
      return {
        ...state,
        likeError: action.payload,
      };
    default:
      return state;
  }
};

export default likedArticlesReducer;
