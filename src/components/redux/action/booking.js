export const postBook = data => {
  return {
    type: 'POST_BOOK',
    payload: {data},
  };
};
