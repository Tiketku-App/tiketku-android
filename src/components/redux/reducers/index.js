import {combineReducers} from 'redux';

import hotels from './hotel';
import users from './user';

export default combineReducers({
  hotels,
  users,
});
