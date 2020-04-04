import axios from 'axios';
import {URI} from 'react-native-dotenv';
console.log('URI', URI);
export const getAllHotell = (data) => {
  const name = data.name || '';
  const city = data.city || '';
  const limit = data.limit || 3;
  return {
    type: 'GET_HOTELS',
    payload: axios({
      method: 'GET',
      url: URI + `/v1/hotel?name=${name}&city=${city}&limit=${limit}`,
    }),
  };
};

export const hotelDetail = (id) => {
  return {
    type: 'GET_HOTEL_DETAIL',
    payload: axios({
      method: 'GET',
      url: URI + `/v1/hotel/${id}`,
    }),
  };
};
