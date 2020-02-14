import { combineReducers } from 'redux';

import login from './app/features/Login/Login';
import user from './app/features/User/User';
import hour from './app/features/Hours/Hours';



export default combineReducers({
    login: login,
    user: user,
    hour: hour,
})