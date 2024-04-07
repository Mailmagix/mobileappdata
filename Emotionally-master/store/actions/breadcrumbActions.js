export const SET_BREADCRUMB = 'SET_BREADCRUMB';
export const REMOVE_LAST_BREADCRUMB = 'REMOVE_LAST_BREADCRUMB ';
export const CLEAR_BREADCRUMB = 'CLEAR_BREADCRUMB';

export const setBreadcrumb = breadcrumb => ({
  type: SET_BREADCRUMB,
  payload: breadcrumb,
});

export const removeLastBreadcrumb = () => ({
  type: REMOVE_LAST_BREADCRUMB,
});

export const clearBreadcrumb = () => ({
  type: CLEAR_BREADCRUMB,
});
