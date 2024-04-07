const initialState = {
  validationError: '',
};

const signUpOtpReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_OTP_SUCCESS':
      return {...state, validationError: ''};
    case 'FETCH_OTP_FAILURE':
      return {...state, validationError: action.payload};
    default:
      return state;
  }
};

export default signUpOtpReducer;
