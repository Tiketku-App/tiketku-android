import axios from 'axios';
import {URI} from 'react-native-dotenv';

export const getAllHotell = () => {
  return {
    type: 'GET_HOTELS',
    payload: axios({
      method: 'GET',
      url: `${URI}/v1/hotel`,
    }),
  };
};

export const hotelDetail = id => {
  return {
    type: 'GET_HOTEL_DETAIL',
    payload: axios({
      method: 'GET',
      url: `${URI}/v1/hotel/${id}`,
    }),
  };
};
