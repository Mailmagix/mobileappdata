const {
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
} = require('../actions/searchActions');

const initialState = {
  data: [],
  error: null,
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null,
      };
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        data: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default searchReducer;
