const initialState = {
  users: {},
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER_PENDING':
      return {
        ...state,
      };
    case 'GET_USER_REJECTED':
      return {
        ...state,
      };
    case 'GET_USER_FULFILLED':
      console.log('here', action.payload.data.result[0]);
      return {
        users: action.payload.data.result,
      };
    case 'POST_USERS_PENDING':
      return {
        ...state,
      };
    case 'POST_USERS_REJECTED':
      return {
        ...state,
      };
    case 'POST_USERS_FULFILLED':
      console.log(action.payload);
      const newUsers = [...state.users, action.payload.data.result];
      return {
        ...state,
        users: newUsers,
      };
    default:
      return state;
  }
};

export default users;
