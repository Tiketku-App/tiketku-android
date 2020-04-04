const initialState = {
  booking: [],
};

const booking = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_BOOK_PENDING':
      return {
        ...state,
      };
    case 'GET_BOOK_REJECTED':
      return {
        ...state,
      };
    case 'GET_BOOK_FULFILLED':
      return {
        ...state,
        booking: action.payload.data.result,
      };
    default:
      return state;
  }
};

export default booking;
