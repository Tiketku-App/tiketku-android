import axios from 'axios';
import {URI} from 'react-native-dotenv';
export const postBook = (data) => {
  return {
    type: 'POST_BOOK',
    payload: axios({
      method: 'POST',
      url: URI + `/v1/booking/`,
      data,
    }),
  };
};
export const getBook = (id) => {
  return {
    type: 'GET_BOOK',
    payload: axios({
      method: 'GET',
      url: URI + `/v1/booking/${id}`,
    }),
  };
};
