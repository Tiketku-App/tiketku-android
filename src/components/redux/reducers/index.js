import {combineReducers} from 'redux';

import hotels from './hotel';
import users from './user';
import booking from './booking';

export default combineReducers({
  hotels,
  users,
  booking,
});
