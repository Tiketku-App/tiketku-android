const initialState = {
  booking: [],
};

const booking = (state = initialState, action) => {
  switch (action.type) {
    case 'POST_BOOK':
      return {
        ...state,
        booking: [...state.booking, action.payload.data],
      };
    default:
      return state;
  }
};

export default booking;
