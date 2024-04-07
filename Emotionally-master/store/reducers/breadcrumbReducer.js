import {
  SET_BREADCRUMB,
  REMOVE_LAST_BREADCRUMB,
  CLEAR_BREADCRUMB,
} from '../actions/breadcrumbActions';

const initialState = {
  breadcrumbs: [],
};

const breadcrumbReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BREADCRUMB:
      return {...state, breadcrumbs: [...state.breadcrumbs, action.payload]};
    case REMOVE_LAST_BREADCRUMB:
      return {
        ...state,
        breadcrumbs: state.breadcrumbs.slice(0, -1),
      };
    case CLEAR_BREADCRUMB:
      return initialState;
    default:
      return state;
  }
};

export default breadcrumbReducer;
