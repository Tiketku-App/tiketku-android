import axios from 'axios';
import {URI} from 'react-native-dotenv';

export const getUser = hp => {
  const phone_number = hp || '';
  return {
    type: 'GET_USER',
    payload: axios({
      method: 'GET',
      url: `${URI}/v1/user/?hp=${phone_number}`,
    }),
  };
};
